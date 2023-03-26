const { deletePost } = require('../../controllers/posts');

/**
 * Succcess
 * @returns {success message}
 * Fail
 * @returns {res.error} [406] ['', '']
 */
const deleteSinglePost = async (req, res, next) => {
	try {
		const postId = req.params.postId;
		let data = await deletePost(postId);
		if ((typeof data == 'object' && 'error' in data) || !data)
			res.status(406).json(data);
		else res.status(200).json({ data });
		return next();
	} catch (e) {
		return next(e);
	}
};

module.exports = { deleteSinglePost };
