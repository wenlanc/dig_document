const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getRelatedArticles } = require('../../controllers/article');

// Schema validator
const schema = Joi.object({
	category: Joi.string().required(),
	limit: Joi.number().min(1).max(30).required(),
});
const validate = validator.query(schema);

const ctr = async (req, res, next) => {
	try {
		const relatedArticles = await getRelatedArticles(
			req.query.category,
			req.query.limit
		);

		if (relatedArticles.length > 0) {
			res.status(200).send(relatedArticles);
		} else {
			res.status(404).send();
		}
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
