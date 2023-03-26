const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {
	toogleLikesAndReactions,
	PostReplyToggleLikesAndReactions,
} = require('../../controllers/posts');
// Schema validator
const schema = Joi.object({
	type: Joi.string().required(),
	id: Joi.string().required(),
	increment: Joi.boolean().required(),
	likeId: Joi.string().allow(null, ''),
});
const postReplySchema = Joi.object({
	type: Joi.string().required(),
	id: Joi.string().required(),
	increment: Joi.boolean().required(),
	likeId: Joi.string().allow(null, ''),
});
const validate = validator.body(schema);
const validatePostReply = validator.body(postReplySchema);

/**
 * Succcess
 * @returns {Post}
 * Fail
 * @returns {res.error} [406] ['article not found', 'unknown']
 */
const ctr = async (req, res, next) => {
	try {
		req.body.user = req.user;
		let data = await toogleLikesAndReactions(
			JSON.parse(JSON.stringify(req.body))
		);
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};
/**
 * Succcess
 * @returns {Post}
 * Fail
 * @returns {res.error} [406] ['article not found', 'unknown']
 */
const PostReplyCtr = async (req, res, next) => {
	try {
		req.body.user = req.user;
		let data = await PostReplyToggleLikesAndReactions(
			JSON.parse(JSON.stringify(req.body))
		);
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, PostReplyCtr,validatePostReply, validate };
