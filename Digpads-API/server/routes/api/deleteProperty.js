const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { deleteProperty } = require('../../controllers/property');

/**
 * Succcess
 * @returns {success}
 * Fail
 * @returns {res.error} [406] ['error in uploading', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
		req.body.author = req.user.id;
		let data = await deleteProperty(req);

		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
	} catch (e) {
		console.log(e);
		// return next(e);
	}
};

module.exports = { ctr };
