const express = require('express');
const router = express.Router();
const { updatePost } = require('../../controllers/posts');

const postsController = require('../../controllers/posts');

router.get('/', (req, res) => {
	postsController
		.findByLocation(req.query.state, req.query.city)
		.then((response) => {
			if (response.error) {
				return res.status(500).send();
			}

			res.status(200).send(response);
		});
});

router.patch('/:id', async (req, res) => {
	try {
		const postId = req.params.id;
		const update = req.body;

		const response = await updatePost(postId, update);
		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(500).send(`Server error: ${e.message}`);
	}
});

module.exports = router;
