const { getCommentsMadeByUser } = require('../../controllers/comments');

const ctr = async (req, res, next) => {
	try {
		const comments = await getCommentsMadeByUser(req.query.user);

		res.status(200).send(comments);
	} catch (e) {
		return next(e);
	}
};

module.exports = ctr;
