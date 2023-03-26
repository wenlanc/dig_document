const Joi = require('joi');
const uuid = require("uuid").v4;
const path = require("path");

const validator = require('express-joi-validation').createValidator({});
const { updateDocument } = require('../../controllers/edocuments');
  
// Schema validator
const schema = Joi.object({
	title: Joi.string().required(),
	documentUrl: Joi.string().required(),
	recievers: Joi.array().required(),
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

		req.body.user = req.user;
		
		let data = await updateDocument(JSON.parse(JSON.stringify(req.body)));
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
