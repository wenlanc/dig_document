const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const PostReply = mongoose.model('PostReply');
const Article = mongoose.model('Article');

const findComments = async (query) => {
	try {
		const comments = await Comment.find(
			{ content: { $regex: query, $options: 'i' } },
			'article content createdAt removed',
			{ lean: true }
		);

		const promises = comments.map((c) =>
			Article.findById(c.article, 'urlSlug')
		);

		const articles = await Promise.all(promises);

		comments.forEach((c) => {
			c.article = articles.find(
				(a) => a._id.toString() === c.article.toString()
			);
		});

		return comments;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const findPostReplies = async (query) => {
	try {
		const replies = await PostReply.find(
			{ content: { $regex: query, $options: 'i' } },
			null,
			{ lean: true }
		).populate('post', 'slug');

		return replies;
	} catch (error) {
		console.log(error);
		return [];
	}
};

/**
 * @param {String} id - comment id
 * @param {String} message - new message
 */
const editComment = async (id, message, status) => {
	try {
		const comment = await Comment.findOneAndUpdate(
			{ _id: id },
			{
				content: message,
				status: status,
			}
		);

		return comment === null ? false : true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const deleteComment = async (id, status) => {
	try {
		const comment = await Comment.findOneAndUpdate(
			{ _id: id },
			{ status: status }
		);

		return comment === null ? false : true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const commentBelongsToUser = async (commentId, userId) => {
	try {
		const comment = await Comment.findById(commentId, 'author');

		if (comment === null || comment.author.toString() !== userId) {
			return false;
		}

		return true;
	} catch (error) {
		console.log(error);
	}
};

const duplicateComment = async (commentId, status) => {
	const commentToCopy = await Comment.findById(commentId);
	const { author, content, article } = commentToCopy;

	const comment = await Comment.create({
		author: author,
		content: content,
		status: status,
		article: article,
	});

	await comment.execPopulate('author', 'profilePicUrl first last name');

	return comment;
};

const getCommentsMadeByUser = async (user) => {
	try {
		const articleComments = await Comment.find({ author: user }, null, {
			lean: true,
		});

		// populate related article title
		const promises = articleComments.map((c) =>
			Article.findById(c.article, 'title')
		);
		const articles = await Promise.all(promises);
		articleComments.forEach((c) => {
			c.article = articles.find(
				(a) => a._id.toString() === c.article.toString()
			);
		});

		let postReplies = await PostReply.find({ author: user }, null, {
			lean: true,
		}).populate('replies', 'content');

		const allComments = [...articleComments, ...postReplies];

		return allComments;
	} catch (error) {
		console.log(error);
		return [];
	}
};

const updateComment = async (commentId, update) => {
	const comment = await Comment.findByIdAndUpdate(commentId, update, {
		new: true,
		lean: true,
	});

	return comment;
};

const getCommentsByUser = async (userId) => {
	const comments = await Comment.find({
		author: userId,
		status: { $ne: 'DELETED' },
		removed: { $ne: true },
	}, null, { lean: true });

	const promises = comments.map(async (c) => {
		const article = await Article.findById(c.article, 'title urlSlug');
		return {...c, article };
	})

	let _comments = await Promise.all(promises);
	_comments.flat();
	
	return _comments;
};

module.exports = {
	editComment,
	deleteComment,
	commentBelongsToUser,
	duplicateComment,
	findComments,
	findPostReplies,
	updateComment,
	getCommentsMadeByUser,
	getCommentsByUser,
};
