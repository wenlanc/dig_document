const {
	Post,
	User,
	PostReply,
	PostReplyLikes,
	Like,
	City,
	State,
} = require('../models/db');

/**
 * Retreives all posts
 * @returns {Promise<Array<Post>>}
 */
exports.getAll = async (body) => {
	try {
		const posts = await Post.find(
			{ status: { $ne: 'DELETED' }, removed: { $ne: true } },
			'title slug',
			{ lean: true }
		);
		return posts;
	} catch (e) {
		return [];
	}
};

/**
 * Creates new post
 * ------REQUIRED PARAMS------
 * @param {String} body.author
 * @param {String} body.title
 * @param {String} body.content
 * SUCCESS
 * @returns {Post}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */
exports.createPost = async (body) => {
	try {
		if (!body.author || !body.title || !body.content || !body.category)
			return { error: 'invalid params' };

		const post = { ...body };
		post.status = 'CREATED';
		const hasLocation = body.state || body.city;

		if (hasLocation) {
			if (body.state) {
				// if state exists, assign it to post
				const state = await State.findOne({ name: body.state });

				if (state !== null) {
					post.state = state;
				}
			}

			if (body.city) {
				// if city exists, assign it to post
				const city = await City.findOne({ name: body.city });

				if (city !== null) {
					post.city = city;
				}
			}
		}

		const newPost = await Post.create(post);

		return newPost;
	} catch (e) {
		return { error: 'unknown', message: `createPost ${e}` };
	}
};

/**
 * Send post
 * ------REQUIRED PARAMS------
 * @param {String} body.postId
 * SUCCESS
 * @returns {Post}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */

exports.getPost = async (postId, user) => {
	try {
		if (!postId) {
			throw Error('invalid postId');
		}

		return _getPost(postId, user);
	} catch (err) {
		console.error(`Error in getting post: ${err}`);
	}
};

async function _getPost(postId, user) {
	const post = await Post.findOne({
		slug: postId,
		status: { $ne: 'DELETED' },
		removed: { $ne: true },
	})
		.populate('author', 'first last profilePicUrl')
		.populate('state')
		.populate('city')
		.populate({
			path: 'replies',
			select: 'author content likes createdAt updatedAt post',
			match: { status: { $ne: 'DELETED' }, removed: { $ne: true } },
			populate: {
				path: 'author',
				select: 'first last profilePicUrl  displayUsername username',
			},
		})
		.lean();

	if (post === null) {
		return null;
	}

	if (user) {
		// get whether user liked the post
		post.likeId = await getPostLikeId(user, post._id);
	}

	return post;
}

async function getPostLikeId(user, postId) {
	const like = await Like.findOne({ user: user.id, post: postId });

	if (like) {
		return like._id;
	} else {
		return null;
	}
}

exports.sendFeedPost = async (body) => {
	try {
		let posts = await Post.find({
			status: { $ne: 'DELETED' },
			removed: { $ne: true },
		})
			.sort('-createdAt')
			.limit(8)
			.populate('author', 'first last profilePicUrl')
			.populate('state')
			.populate('city')
			.lean();
		if (body.user) {
			for (let i = 0; i < posts.length; i++) {
				let like = await Like.findOne({
					user: body.user.id,
					post: posts[i]._id,
				});
				if (like) {
					posts[i].liked = like._id;
				}
			}
		}
		return posts;
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

/**
 * add post reply
 * ------REQUIRED PARAMS------
 * @param {String} body.postId
 * @param {String} body.userId
 * @param {String} body.content
 * SUCCESS
 * @returns {reply}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */

exports.addPostComment = async (body) => {
	try {
		body.status = 'CREATED';
		if (!body.post || !body.author || !body.content) {
			return { error: 'invalid params' };
		}
		let post = await Post.findById(body.post);
		if (!post) {
			return { error: 'Post not found' };
		}

		let reply = await PostReply.create(body);
		await reply.populate('author', 'first last profilePicUrl').execPopulate();

		const user = await User.findById(
			body.author,
			'dateFirstComment blockedFromCommenting blockedFromCommentingExpirationDate onProbation onProbationExpirationDate'
		);

		// Record date if this is the first ever comment made by User
		if (typeof user.dateFirstComment === 'undefined') {
			user.dateFirstComment = new Date();
		}

		user.dateLastComment = new Date();

		// Is user blocked from commenting
		if (user.blockedFromCommenting) {
			const now = new Date();

			if (now > user.blockedFromCommentingExpirationDate) {
				user.blockedFromCommenting = false; // block expired
			} else {
				// user is still blocked
				return {
					status: 'forbidden',
					message: `User is not allowed to comment until ${user.blockedFromCommentingExpirationDate}`,
				};
			}
		}

		// Is user on probation
		if (user.onProbation) {
			const now = new Date();

			if (now > user.onProbationExpirationDate) {
				user.onProbation = false; // probation expired
			} else {
				// user is still on probation
				return {
					status: 'forbidden',
					message: `User is not allowed to comment until ${user.onProbationExpirationDate}`,
				};
			}
		}

		user.save();

		post.replies.push(reply);
		await post.save();

		return { reply: reply };
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

/**
 * Likes and reactions
 * ------REQUIRED PARAMS------
 * @param {String}
 * @param {String}
 * @param {String}
 * SUCCESS
 * @returns {success}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */

exports.toogleLikesAndReactions = async (body) => {
	try {
		if (body.type === 'post') {
			let post = await Post.findOne({ slug: body.id });

			if (!post) {
				return { error: 'post not found' };
			}

			if (!body.increment) {
				let like = await Like.findByIdAndDelete(body.likeId);

				if (like) {
					await post.likes.pull({ _id: like._id });
					await post.save();
				}

				return { success: true };
			} else {
				let like = await Like.findOne({ user: body.user.id, post: post._id });

				if (like) {
					let like = await Like.findByIdAndDelete(body.likeId);

					if (like) {
						await post.likes.pull({ _id: like._id });
						await post.save();
					}

					return { success: true };
				}

				like = await Like.create({
					likeType: 'heart',
					user: body.user.id,
					post: post._id,
				});

				await post.likes.push(like);
				await post.save();

				if (like) {
					return { success: true, likeId: like._id };
				}
			}
		}
		return { success: true };
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};
/**
 * Likes and reactions
 * ------REQUIRED PARAMS------
 * @param {String}
 * @param {String}
 * @param {String}
 * SUCCESS
 * @returns {success}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */

exports.PostReplyToggleLikesAndReactions = async (body) => {
	try {
		if (body.type === 'postReply') {
			const postReply = await PostReply.findById(body.id);

			if (!postReply) {
				return { error: 'post not found' };
			}

			if (!body.increment) {
				let like = await PostReplyLikes.findByIdAndDelete(body.likeId);

				if (like) {
					await postReply.likes.pull({ _id: like._id });
					await postReply.save();
				}

				return { success: true };
			} else {
				let like = await PostReplyLikes.findOne({
					user: body.user.id,
					reply: postReply._id,
				});

				if (like) {
					let like = await PostReplyLikes.findByIdAndDelete(body.likeId);

					if (like) {
						await postReply.likes.pull({ _id: like._id });
						await postReply.save();
					}

					return { success: true };
				}

				like = await PostReplyLikes.create({
					likeType: 'heart',
					user: body.user.id,
					reply: postReply._id,
				});
				await postReply.likes.push(like);
				await postReply.save();

				if (like) {
					return { success: true, likeId: like._id };
				}
			}
		}
		return { success: true };
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

//currently using recent post instead of popular
exports.popularPosts = async (body) => {
	try {
		const recentPosts = await Post.find({
			status: { $ne: 'DELETED' },
			removed: { $ne: true },
		})
			.sort('-createdAt')
			.limit(5)
			.select('title content author')
			.populate('author', 'first last profilePicUrl')
			.exec();
		return recentPosts;
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.findPosts = async (query) => {
	try {
		let posts = await Post.find({
			content: { $regex: query, $options: 'i' },
			status: { $ne: 'DELETED' },
			removed: { $ne: true },
		})
			.sort('-createdAt')
			.populate('author', 'first last profilePicUrl')
			.lean();
		return posts;
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.findByLocation = async (state, city) => {
	try {
		const filter = {};
		let posts;
		filter.status = { $ne: 'DELETED' };
		filter.removed = { $ne: true };
		if (state) {
			const _state = await State.findOne({ name: state });

			if (_state === null) {
				return [];
			}

			filter.state = _state;
		}

		if (city) {
			const _city = await City.findOne({ name: city, state: filter.state });

			if (city !== null) {
				filter.city = _city;
			}
		}

		posts = await Post.find(filter)
			.sort('-createdAt')
			.populate('author', 'first last profilePicUrl')
			.populate('state')
			.populate('city')
			.lean();

		return posts;
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.deletePost = async (postId) => {
	try {
		let post = await Post.find({ _id: postId });
		const body = { status: 'DELETED' };
		if (post) {
			//await Post.deleteOne({ _id: postId });
			const resp = await Post.findByIdAndUpdate(postId, body, {
				new: true,
			});

			return { message: 'Post deleted successfully' };
		}
		return { error: 'Post not found' };
	} catch (error) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.editPostComment = async (post, body) => {
	try {
		body.status = 'EDITED';
		const comment = await PostReply.findByIdAndUpdate(post, body, {
			new: true,
			runValidators: true,
		});

		return comment === null ? false : true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

exports.deletePostComment = async (id, body) => {
	try {
		body.status = 'DELETED';
		const comment = await PostReply.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

		return comment === null ? false : true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

exports.postBelongsToUser = async (postId, userId) => {
	try {
		const reply = await PostReply.findById(postId, 'author', {
			status: { $ne: 'DELETED' },
		});

		if (reply === null || reply.author.toString() !== userId) {
			return false;
		}

		return true;
	} catch (error) {
		console.log(error);
	}
};

exports.incrementPageViews = async (postId) => {
	const post = await Post.findById(postId);

	if (!post) {
		throw 'post not found';
	}

	const res = await Post.updateOne(
		{ _id: post._id },
		{ views: post.views + 1 }
	);

	if (res.nModified !== 1) {
		throw 'error updating post';
	}
};

exports.updatePost = async (postId, update) => {
	const post = await Post.find({ postId });

	if (post === null) {
		throw new Error('Post not found');
	}

	const updatedPost = await Post.findByIdAndUpdate(postId, update, {
		new: true,
	});

	return updatedPost;
};

exports.addCommentReply = async (body) => {
	try {
		if (!body.post || !body.author || !body.content || !body.parent) {
			return { error: 'invalid params' };
		}

		let post = await Post.findById(body.post);

		if (!post) {
			return { error: 'Post not found' };
		}

		body.status = 'CREATED';
		let reply = await PostReply.create(body);
		post.replies.push(reply);

		const user = await User.findById(
			body.author,
			'dateFirstComment blockedFromCommenting blockedFromCommentingExpirationDate onProbation onProbationExpirationDate'
		);

		// Is user blocked from commenting
		if (user.blockedFromCommenting) {
			const now = new Date();

			if (now > user.blockedFromCommentingExpirationDate) {
				user.blockedFromCommenting = false; // block expired
			} else {
				// user is still blocked
				return {
					status: 'forbidden',
					message: `User is not allowed to comment until ${user.blockedFromCommentingExpirationDate}`,
				};
			}
		}

		// Is user on probation
		if (user.onProbation) {
			const now = new Date();

			if (now > user.onProbationExpirationDate) {
				user.onProbation = false; // probation expired
			} else {
				// user is still on probation
				return {
					status: 'forbidden',
					message: `User is not allowed to comment until ${user.onProbationExpirationDate}`,
				};
			}
		}

		// Record date if this is the first ever comment made by User
		if (typeof user.dateFirstComment === 'undefined') {
			user.dateFirstComment = new Date();
		}

		user.dateLastComment = new Date();

		user.save();

		await reply.populate('author', 'first last profilePicUrl').execPopulate();

		//post.replies.push(reply);
		await post.save();
		return { reply: reply };
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.getCommentReply = async (body) => {
	try {
		const replies = await PostReply.find({
			parent: body.parent,
			status: { $ne: 'DELETED' },
			removed: { $ne: true },
		}).populate('author', 'first last profilePicUrl');
		return replies;
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.duplicatePost = async (postId) => {
	try {
		const post = await Post.findById(postId).lean();

		if (!post) {
			return { error: 'Post not found' };
		}
		delete post._id;
		post.status = 'DELETED';
		const copiedPost = await Post.create(post);
		return copiedPost;
	} catch (e) {
		return { error: 'unknown', message: `duplicatePost ${e}` };
	}
};

exports.duplicatePostComment = async (postId) => {
	try {
		const postReply = await PostReply.findById(postId).lean();
		if (!postReply) {
			return { error: 'Comment not found' };
		}
		delete postReply._id;
		postReply.status = 'DELETED';
		let copiedReply = await PostReply.create(postReply);
		await copiedReply
			.populate('author', 'first last profilePicUrl')
			.execPopulate();

		return { copiedReply };
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.getPostsByUser = async (userId) => {
	const posts = await Post.find({
		author: userId,
		status: { $ne: 'DELETED' },
		removed: { $ne: true },
	});
	return posts;
};
