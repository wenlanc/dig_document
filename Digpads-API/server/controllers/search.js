const { elasticSearch } = require('../services/elasticsearch');
const { Article, Comment } = require('../models/db');
const MarketplaceProfile = require('../models/MarketplaceProfile');
const Post = require('../models/Post');
const { findPosts } = require('./posts');
const { findComments, findPostReplies } = require('./comments');

/**
 * @param {String} query - search query
 * @returns {Promise<Array>} a array of marketplace profiles
 */
async function findMarketplaceProfiles(query) {
	let profiles = await MarketplaceProfile.find({}).populate({
		path: 'user',
		select: 'type',
	});

	if (query) {
		profiles = profiles.filter((p) => {
			const areasServedString = p.areasServed
				?.map((a) => a.city + ' ' + a.state)
				?.join();
			const businessDetailsString =
				p.businessDetails?.yearFounded +
				' ' +
				p.businessDetails?.numEmployees +
				' ' +
				p.businessDetails?.licenses +
				' ' +
				p.businessDetails?.headquarters +
				' ' +
				p.businessDetails?.ownership +
				' ' +
				p.businessDetails?.trainingEducation;

			return (
				p.contactInfo?.name?.toLowerCase()?.includes(query) ||
				p.aboutYou?.toLowerCase()?.includes(query) ||
				areasServedString?.toLowerCase()?.includes(query) ||
				businessDetailsString?.toLowerCase()?.includes(query)
			);
		});
	}

	return profiles;
}

/**
 * @param {String} query - search query
 * @returns {Promise<Array>} a array of articles
 */
async function findArticles(query) {
	// Find IDs of articles that match the query
	const { body } = await elasticSearch.search({
		index: 'articles',
		body: {
			_source: ['id'],
			query: {
				multi_match: {
					query: query,
					fields: ['title', 'content'],
				},
			},
		},
	});

	const hits = body.hits.hits;

	// Extract IDs from response
	const articleIds = [];

	hits.forEach((hit) => {
		articleIds.push(hit._source.id);
	});

	const articles = await findArticlesByIds(articleIds);

	return articles;
}

/**
 * @param {Array<string>} IDs - IDs of articles to look for
 * @returns {Promise<Array>} articles
 */
async function findArticlesByIds(IDs) {
	const articles = [];

	for (let i = 0; i < IDs.length; i++) {
		let article = await Article.findById(IDs[i], '-content', { lean: true });

		if (article === null) {
			console.warn('no corresponding article found');
			continue;
		}

		const opts = [
			{
				path: 'created_by',
				select: ['first', 'last', 'name', 'profilePicUrl'],
			},
			{
				path: 'category',
				select: ['categoryName'],
			},
			{
				path: 'subcategory',
				select: ['categoryName'],
			},
		];

		article = await Article.populate(article, opts);
		article.published_at = article.published_at.toDateString();

		articles.push(article);
	}

	return articles;
}

async function findContent(query) {
	// search article comments
	let articleComments = await findComments(query);
	articleComments = articleComments.map((comment) => ({
		...comment,
		type: 'Article Comment',
	}));

	// search for forum posts
	let forumPosts = await Post.find({
		content: { $regex: query, $options: 'i' },
		status: { $ne: 'DELETED' },
	})
		.sort('-createdAt')
		.populate('author', 'first last profilePicUrl')
		.lean();

	forumPosts = forumPosts.map((post) => ({ ...post, type: 'Original Post' }));

	// search for forum post replies
	let forumPostReplies = await findPostReplies(query);
	forumPostReplies = forumPostReplies.map((reply) => ({
		...reply,
		type: 'Post Comment',
	}));

	const content = [...articleComments, ...forumPosts, ...forumPostReplies];

	return content;
}

module.exports = {
	findArticles,
	findContent,
	findMarketplaceProfiles,
};
