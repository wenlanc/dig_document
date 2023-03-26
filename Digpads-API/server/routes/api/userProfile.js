const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getUserProfile } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
});
const validate = validator.query(schema);

/**
 * Succcess
 * @returns {User}
 * Fail
 * @returns {res.error} [406] ['user not found', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
        let data = await getUserProfile(JSON.parse(JSON.stringify(req.user)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
