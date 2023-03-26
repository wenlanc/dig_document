const { updatePost, duplicatePost } = require('../../controllers/posts');

/**
 * Succcess
 * @returns {success message}
 * Fail
 * @returns {res.error} [406] ['', '']
 */
const updateSinglePost = async (req, res, next) => {
	try {
		const postId = req.params.postId;
		const post = await duplicatePost(postId);
		const response = await updatePost(postId, req.body);
		res.status(200).send(response);
	} catch (e) {
		return next(e);
	}
};

module.exports = { updateSinglePost };
