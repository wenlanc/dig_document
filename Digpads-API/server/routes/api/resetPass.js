const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { resetPass } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	psw: Joi.string().required(),
	pToken: Joi.string().required(),
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
		let data = await resetPass(req.body);
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json();
		return next();
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

module.exports = { ctr, validate };
