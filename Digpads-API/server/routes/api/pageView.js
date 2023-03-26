const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { incrementPageViews } = require('../../controllers/page');

const schema = Joi.object({
	id: Joi.string().alphanum().required(),
	entity: Joi.string().alphanum().required(),
});
const validate = validator.body(schema);

const ctr = async (req, res) => {
	const { id, entity } = req.body;

	try {
		await incrementPageViews(entity, id);
		res.status(200).send();
	} catch (e) {
		console.log(e);
		return res.status(500).send(e);
	}
};

module.exports = { ctr, validate };
