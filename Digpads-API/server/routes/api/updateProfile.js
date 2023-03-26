const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { updateProfile } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {success}
 * Fail
 * @returns {res.error} [406] ['error in uploading', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
        req.body.user = req.user;
        let data = await updateProfile(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			return res.status(406).json(data);
		else return res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
