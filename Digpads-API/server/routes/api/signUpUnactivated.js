const Joi = require('joi');
const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const { createUnactivatedUser } = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	first: Joi.string().required(),
	last: Joi.string().required(),
	middle: Joi.string().required(),
	email: Joi.string().email({ tlds: { allow: false } }),
});
const validate = validator.body(schema);

const ctr = async (req, res, next) => {
	try {
        req.body.isActive = false;

		var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		req.body.lastIpAddress = ip;

		const userId = await createUnactivatedUser(req.body);
		res.status(201).send(userId);
	} catch (error) {
		console.error(error);
		res.status(500).json('Error creating unactivated user');
	}
};

module.exports = { ctr, validate };
