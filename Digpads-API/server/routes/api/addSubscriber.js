const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { addSubscriber } = require('../../controllers/Subscribers');

// Schema validator
const schema = Joi.object({
	email: Joi.string().email().required(),
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
		req.body.author = req.user ? req.user.id : null;
		let data = await addSubscriber(JSON.parse(JSON.stringify(req.body)));
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
