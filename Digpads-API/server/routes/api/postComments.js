const express = require('express');
const router = express.Router();
const { getIsUserAdmin } = require('../../controllers/users');

const { updatePostComment } = require('../../controllers/postComments');

router.patch('/:id', async (req, res) => {
	try {
		const commentId = req.params.id;

		const response = await updatePostComment(commentId, req.body);
		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(500).send(`Server error: ${e.message}`);
	}
});

module.exports = router;
