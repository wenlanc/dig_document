const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { addProperty } = require('../../controllers/property');

/**
 * Succcess
 * @returns {success}
 * Fail
 * @returns {res.error} [406] ['error in uploading', 'unknown']
 */
const ctr = async (req, res, next) => {
	// console.log('executed');

	try {
		req.body.author = req.user.id;
		let data = await addProperty(req);
		if ((typeof data == 'object' && 'error' in data) || !data)
			return res.status(406).json(data);
		else return res.status(200).send(data);
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Error occurred, try again!',
			error,
		});
		// return next(e);
	}
};

module.exports = { ctr };
