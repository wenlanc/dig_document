const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getDocuments } = require('../../controllers/edocuments');

// Schema validator
const schema = Joi.object({});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {message : success}
 * Fail
 * @returns {res.error}
 */
const ctr = async (req, res, next) => {
	try {
		req.body.user = req.user;
		req.body.page = req.query.page ? Number(req.query.page) : 1;
		req.body.limit = req.query.limit ? Number(req.query.limit) : 10;
		req.body.filter = req.query.filter ? req.query.filter:"";
		let data = await getDocuments(JSON.parse(JSON.stringify(req.body)));
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
