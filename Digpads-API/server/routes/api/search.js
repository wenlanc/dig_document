const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { findArticles, findContent, findMarketplaceProfiles } = require('../../controllers/search');
const { findPosts } = require('../../controllers/posts');

const schema = Joi.object({
	q: Joi.string().allow('').optional(),
	entity: Joi.string().allow('').optional(),
});
const validate = validator.query(schema);

/**
 * @returns {Array<Article || Post>} articles
 */
const ctr = async (req, res, next) => {
	let entity = req.query.entity;
	let articles = [];
	let posts = [];
	let profiles = [];

	try {
		if (entity.includes('content')) {
			const content = await findContent(req.query.q);
			res.status(200).send(content);
		} else {
			if (entity.includes('articles')) {
				articles = await findArticles(req.query.q);
			} 
			if (entity.includes('posts')) {
				posts = await findPosts(req.query.q);
			}
			if (entity.includes('profiles')) {
				profiles = await findMarketplaceProfiles(req.query.q);
			}
			if (entity.includes('all')) {
				articles = await findArticles(req.query.q);
				posts = await findPosts(req.query.q);
				profiles = await findMarketplaceProfiles(req.query.q);
			}
	
			res.status(200).send({ articles, posts, profiles });
		}


	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
