const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const contactController = require('../../controllers/contact');
const statusCodes = require('http').STATUS_CODES;

// Schema validator
const schema = Joi.object({
	inquiryType: Joi.string(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	company: Joi.string(),
	title: Joi.string(),
	phoneNumber: Joi.string(),
	emailAddress: Joi.string().required(),
	subjectLineFill: Joi.string(),
	textFill: Joi.string(),
});
const validate = validator.query(schema);

const ctr = async (req, res) => {
	const success = await contactController.contactUs(req.body);

	if (success) {
		res.status(200).send();
	} else {
		res.status(500).send();
	}
};

module.exports = { ctr, validate };
