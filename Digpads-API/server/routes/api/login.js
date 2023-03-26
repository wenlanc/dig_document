const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { login, authenticate } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	email: Joi.string().required(),
	psw: Joi.string().required(),
	rememberMe: Joi.number().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {Token}
 * Fail
 * @returns {res.error} [406] ['no email found', 'wrong password', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
		let data = await login(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else {
			res.cookie('ACT', data.token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * req.body.rememberMe, //14 days
				sameSite: 'None',
				secure: true,
				path: '/',
			});
			let userInfo = await authenticate(data.id);
			res.status(200).json({ userInfo, token:data.token });
		}
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
