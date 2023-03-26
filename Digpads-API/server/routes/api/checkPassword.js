const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { checkPassword, authenticate } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns true
 * Fail
 * @returns {res.error} 
 */
const ctr = async (req, res, next) => {
	try {
		let data = await checkPassword(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else {
			res.status(200).json({data});
		}
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
