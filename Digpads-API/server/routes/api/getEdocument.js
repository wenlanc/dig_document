const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getDocument } = require('../../controllers/edocuments');

// Schema validator
const schema = Joi.object({
	documentId: Joi.string().required(),
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
		//req.body.user = req.user;
		let data = await getDocument(JSON.parse(JSON.stringify(req.body)));
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
