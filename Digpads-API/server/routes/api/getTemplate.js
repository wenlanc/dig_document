const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getTemplate } = require('../../controllers/templates');

// Schema validator
const schema = Joi.object({
	templateId: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {message : success}
 * Fail
 * @returns {res.error}
 */
const ctr = async (req, res, next) => {
	try {
		req.body.user = req.user;
		let data = await getTemplate(JSON.parse(JSON.stringify(req.body)));
		console.log(data);
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json(data);
		return next();
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

module.exports = { ctr, validate };
