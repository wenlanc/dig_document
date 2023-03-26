const {
	deletePostComment,
	postBelongsToUser,
} = require('../../controllers/posts');

const ctr = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.status(403).send();
		}

		const isAuthor = await postBelongsToUser(req.params.id, req.user.id);

		if (!isAuthor) {
			return res.status(403).send();
		}

		const success = await deletePostComment(req.params.id, req.body);

		if (success) {
			res.status(200).send();
		} else {
			res.status(500).send();
		}
	} catch (e) {
		return next(e);
	}
};

module.exports = { ctr };
