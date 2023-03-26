const express = require('express');
const router = express.Router();
const { createReviewsDisplayForm, getReviewsDisplayForm } = require('../../controllers/reviewsDisplay');

router.get('/', async (req, res) => {
	try {
		const user = req.query.user;
		if (!user) {
			return res.status(404).send('user not found');
		}

        const response = await getReviewsDisplayForm(user);
		console.log(response);
		return res.status(200).send(response);
	} catch (error) {
		console.error(error);
        res.status(500).send('Server error');
	}
});

router.post('/', async (req, res) => {
	try {
		const data = req.body;
        const response = await createReviewsDisplayForm({...data, user: req.user.id});
		return res.status(200).send(response);
	} catch (error) {
		console.error(error);
        res.status(500).send('Server error');
	}
});

module.exports = router;
