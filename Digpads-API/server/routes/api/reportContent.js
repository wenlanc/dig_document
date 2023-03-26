const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// TODO import Email function
const { sendReportContent } = require('../../services/emails');

// Schema validator
const schema = Joi.object({
	content: Joi.string().required(),
	contentURL: Joi.string().required(),
});

const validate = validator.body(schema);

const ctr = async (req, res, next) => {
	try {
		const data = { content: req.body.content, contentUrl: req.body.contentUrl };

		const success = await sendReportContent(data);

		if (success) {
			res.status(200).send();
		} else {
			res.status(406).send();
		}
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
