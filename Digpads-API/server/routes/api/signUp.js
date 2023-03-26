const Joi = require('joi');
const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const { createUser } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	first: Joi.string().required(),
	last: Joi.string().required(),
	email: Joi.string().required(),
	psw: Joi.string().required(),
	username: Joi.string(),
	type: Joi.string(),
	accountType: Joi.string().optional(),
	companyAccount: Joi.boolean().optional(),
	companyName: Joi.string().optional(),
	profile_name: Joi.string(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {200}
 * Fail
 * @returns {res.error} [406] ['email used', 'not verified']
 */
const ctr = async (req, res, next) => {
	try {
		let data = await createUser(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json(data);
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
