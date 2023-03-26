const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { sendResetMail } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	email: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {True}
 * Fail
 * @returns {res.error} [406] ['no email found']
 */
const ctr = async (req, res, next) => {
	try {
		let data = await sendResetMail(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json();
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
