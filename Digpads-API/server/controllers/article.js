const { Article, User, Comment, Category } = require('../models/db');
// const striptags = require('striptags');

/**
 * @returns {Promise<Array<Article>>}
 */
async function getAll(options) {
	const {
		category,
		limit,
		limitPerCategory,
		fields,
		searchBy,
		query,
	} = options;
	let articles = [];

	// prepare mongo query arguments
	let filter = {};
	if (searchBy === 'title') {
		filter.title = query;
	}
	if (category) {
		filter.category = await Category.findOne({ categoryName: category });
	}
	let projection = fields;
	let queryOptions = {
		lean: true,
		limit: limit,
	};

	// load only <limitPerCategory> number of articles per each category
	if (limitPerCategory) {
		const categories = await Category.find({
			...(category ? { categoryName: category } : {}),
		});

		articles = await Promise.all(
			categories.map((category) =>
				Article.find({ category: category }, projection, {
					limit: limitPerCategory,
					lean: true,
				})
					.sort({ views: -1 })
					.populate('category', 'categoryName')
					.populate('subcategory', 'categoryName')
			)
		);

		// Put articles from each category into a single array
		articles = articles.reduce((acc, _articles) => acc.concat(_articles));
	} else {
		articles = await Article.find(filter, projection, queryOptions)
			.populate('category', 'categoryName')
			.populate('subcategory', 'categoryName');
	}
	await loadAllSubcategories(articles);

	return articles;
}

exports.getAllArticles = async () => {
	let articles = await Article.find();
	if (!articles) {
		return { error: 'None articles found' };
	}
	return articles;
};

async function loadAllSubcategories(articles) {
	// var subcategories = new Set(
	// 	articles.map((article) => article.subcategory.categoryName)
	// );
	const _articles = await Article.find({}, 'subcategory', {
		lean: true,
	}).populate('subcategory', 'categoryName');

	var subcategories = new Set(
		_articles.map((a) => a.subcategory?.categoryName)
	);
	articles.forEach((article) => {
		article.subcategories = Array.from(subcategories);
	});
}

/**
 * Send the article
 * ------REQUIRED PARAMS------
 * @param {String} body.articleId
 * SUCCESS
 * @returns {Article}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */
exports.sendArticle = async (body) => {
	try {
		if (!body.slug) return { error: 'invalid params' };

		var slug = body.slug;
		var regex = new RegExp(['^', slug, '$'].join(''), 'i');

		const article = await Article.findOne({ urlSlug: regex })
			.populate('metas', 'name content')
			.populate('comments', 'author content createdAt', {
				status: { $ne: 'DELETED' },
				removed: { $ne: true }
			})
			.populate('created_by', 'first last profilePicUrl')
			.populate('updated_by', 'first last')
			.populate('category', 'categoryName published_at');

		if (!article) {
			return { error: 'article not found' };
		}

		await User.populate(article.comments, {
			path: 'author',
			select: 'name profilePicUrl first last',
		});

		return article;
	} catch (e) {
		console.log(e);
		return { error: 'internal server error' };
	}
};

/**
 * @param {String} articleSlug - article to which to add the comment
 * @param {String} author - author of the comment
 * @param {String} content - comment message
 * @return {Promise<Comment | null>} added comment
 */
exports.addComment = async (articleSlug, author, message, status) => {
	const article = await Article.findOne({ urlSlug: articleSlug });

	if (!article) {
		return null;
	}

	const comment = await Comment.create({
		author: author,
		content: message,
		status: status,
		article: article._id,
	});

	await comment.execPopulate('author', 'profilePicUrl first last name');

	const commentAdded = await Article.findOneAndUpdate(
		{ _id: article._id },
		{
			$addToSet: {
				comments: comment,
			},
		}
	);

	if (!commentAdded) {
		return null;
	}

	return comment;
};

/* Send article
 * ------REQUIRED PARAMS------
 * SUCCESS
 * @returns {Post}
 * FAIL
 * @returns {Object.error} invalid params
 * @returns {Object.error} unknown
 * @returns {Error}
 */

exports.sendArticles = async () => {
	try {
		let articles = await Article.find({ category: { $ne: null } })
			.populate({
				path: 'category',
				select: 'categoryName',
			})
			.select('title image urlSlug')
			.lean();
		if (!articles) {
			return { error: 'article not found' };
		}
		let groups = {};
		for (let i = 0; i < articles.length; i++) {
			let categoryName = articles[i].category.categoryName;
			articles[i].href = `article/${articles[i].urlSlug}`;
			if (!groups[categoryName]) {
				groups[categoryName] = [];
			}
			groups[categoryName].push(articles[i]);
		}
		myArray = [];
		for (let categoryName in groups) {
			myArray.push({
				categoryName: categoryName,
				categoryData: groups[categoryName],
			});
		}
		return myArray;
	} catch (err) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.getRelatedArticles = async (categoryName, limit) => {
	try {
		const category = await Category.findOne({
			categoryName: categoryName,
		});

		if (!category) {
			return [];
		}

		const articles = await Article.find(
			{
				category: category,
			},
			'title image published_at updatedAt urlSlug'
		)
			.limit(limit)
			.exec();
		return articles;
	} catch (error) {
		console.log(error);
	}
};

exports.fiveMostRecentArticles = async () => {
	try {
		let mostRecentArticles = await Article.find()
			.populate({
				path: 'category',
				select: 'categoryName',
			})
			.sort({ updatedAt: -1 })
			.limit(5);
		if (!mostRecentArticles) {
			return { error: 'articles not found' };
		}
		return mostRecentArticles;
	} catch (error) {
		console.log(error);
		return { error: 'internal server error' };
	}
};

module.exports.getAll = getAll;
