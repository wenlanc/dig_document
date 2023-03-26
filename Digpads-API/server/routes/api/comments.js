const express = require('express');
const router = express.Router({ mergeParams: true });

const { getIsUserAdmin } = require('../../controllers/users');
const { updateComment } = require('../../controllers/comments');

router.patch('/:id', async (req, res) => {
	if (!req.user) {
		return res.status(403).send();
	}

	const user = req.user;
	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	const commentId = req.params.id;

	try {
		const response = await updateComment(commentId, req.body);
		res.status(200).send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

module.exports = router;
