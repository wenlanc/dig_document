const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const commentsController = require('../../controllers/comments');
const usersController = require('../../controllers/users');

// Schema validator
const schema = Joi.object({
	id: Joi.string().required(),
    message: Joi.string().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {Article}
 * Fail
 * @returns {res.error} [406] ['article not found', 'unknown']
 */
const ctr = async (req, res, next) => {
	req.body.status = 'EDITED'
	const copyStatus = 'DELETED'
	const { message, id, status } = req.body;
	if (!message || message.length === 0) {
		return res.status(400).send('invalid comment message');
	}

	if (!req.user) {
		return res.status(403).send();
	}

	const isAuthor = await commentsController.commentBelongsToUser(id, req.user.id);
    const isAdmin = await usersController.getIsUserAdmin(req.user.id);

	if (!isAuthor && !isAdmin) {
        return res.status(403).send();
    }

	try {
		const comment = await commentsController.duplicateComment(
			id,
			copyStatus
		);
		const success = await commentsController.editComment(id, message, status);

		if (success && comment) {
			res.status(200).send();
		} else {
			res.status(500).send();
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = { ctr, validate };