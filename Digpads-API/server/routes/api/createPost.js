const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { createPost } = require('../../controllers/posts');

// Schema validator
const schema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	category: Joi.string().required(),
	state: Joi.string().allow('').optional(),
	city: Joi.string().allow('').optional(),
	images: Joi.array().optional(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {Post}
 * Fail
 * @returns {res.error} [406] ['', '']
 */
const ctr = async (req, res, next) => {
	try {
		req.body.author = req.user.id;
		let data = await createPost(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
