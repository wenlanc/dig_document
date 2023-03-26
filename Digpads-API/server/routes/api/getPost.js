const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { getPost } = require('../../controllers/posts');

// Schema validator
const schema = Joi.object({
	postId: Joi.string().required(),
});
const validate = validator.query(schema);

const ctr = async (req, res, next) => {
	try {
		const postId = req.query.postId;
		const user = req.user;

		const post = await getPost(postId, user);
		if (post === null) {
			return res.status(404).send();
		}
		
		res.status(200).json(post);
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr, validate };
