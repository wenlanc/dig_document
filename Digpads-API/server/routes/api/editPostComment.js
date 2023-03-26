const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { editPostComment, postBelongsToUser, duplicatePostComment } = require('../../controllers/posts');
const usersController = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	content: Joi.string().required(),
	post: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {success}
 * Fail
 * @returns {res.error} [406] ['error in uploading', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
		if (!req.user) {
			res.status(403).send();
		}

		const isAuthor = await postBelongsToUser(req.body.post, req.user.id);
		const isAdmin = await usersController.getIsUserAdmin(req.user.id);

		if (!isAuthor && !isAdmin) {
			return res.status(403).send();
		}


		const reply = await duplicatePostComment(req.body.post)
		const success = await editPostComment(req.body.post, req.body);

		if (success && reply) {
			res.status(200).send();
		} else {
			res.status(406).send();
		}
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
