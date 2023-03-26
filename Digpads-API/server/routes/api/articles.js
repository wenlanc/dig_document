const express = require('express');
const router = express.Router();

const { getAll, addComment } = require('../../controllers/article');


router.get('/', async (req, res) => {
	const options = {
		fields: req.query.fields?.replace(/,/g, ' '),
		limit: Number.parseInt(req.query.limit) || null,
		limitPerCategory: Number.parseInt(req.query.limitPerCategory) || null,
		category: req.query.category,
		searchBy: req.query.searchBy,
		query: req.query.q,
	};

	const articles = await getAll(options);

	res.status(200).send(articles);
});

router.post('/:id/comments', async (req, res) => {
	req.body.status = 'CREATED'
	
	const { message, status } = req.body;

	if (!message || message.length === 0) {
		return res.status(400).send('invalid comment message');
	}

	if (!req.params.id) {
		return res.status(400).send('invalid article id');
	}

	const comment = await addComment(
		req.params.id,
		req.user.id,
		message,
		status
	);

	if (!comment) {
		return res.status(500).send();
	}

	res.status(200).send(comment);
});

module.exports = router;
