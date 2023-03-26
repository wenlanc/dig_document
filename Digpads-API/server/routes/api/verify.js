const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { verifyUser } = require('../../controllers/users');
// Schema validator
const schema = Joi.object({
	vToken: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {200}
 * Fail
 * @returns {res.error} [406] ['not found']
 */
const ctr = async (req, res, next) => {
	try {
		let data = await verifyUser(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			return res.status(406).json(data);
		else res.status(200).json(data);
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
