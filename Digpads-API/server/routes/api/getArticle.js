const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { sendArticle } = require('../../controllers/article');

// Schema validator
const schema = Joi.object({
	slug: Joi.string().required(),
});
const validate = validator.query(schema);

/**
 * Succcess
 * @returns {Article}
 * Fail
 * @returns {res.error} [406] ['article not found', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
		let data = await sendArticle(JSON.parse(JSON.stringify(req.query)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
