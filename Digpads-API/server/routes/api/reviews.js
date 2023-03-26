const express = require('express');
const router = express.Router();
const { getIsUserAdmin } = require('../../controllers/users');

const {
	getReviews,
	addReview,
	updateReview,
	getStats,
	getChallengedReviews,
	getChallengedReviewsByUser,
	challengeReview,
	editReview,
	respondToReview,
	validate,
} = require('../../controllers/reviews');

router.get('/', async (req, res) => {
	try {
		let reviews;
		const filter = {};
		
		if ('user' in req.query) {
			filter.user = req.query.user;
		}

		if ('used' in req.query) {
			console.log(filter);
			filter.used = true;
		}

		if ('rejected' in req.query) {
			filter.rejected = true;
		}

		reviews = await getReviews(filter);
		return res.status(200).json({ reviews });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: { message: error.message } });
	}
});

router.get('/stats', async (req, res) => {
	try {
		const stats = await getStats();
		res.status(200).json({ stats });
	} catch (e) {
		console.error(e);
		res.status(500).send('Server error');
	}
});

router.get('/challenged', async (req, res) => {
	try {
		let reviews = [];

		if (req.query.user) {
			console.log('user');
			reviews = await getChallengedReviewsByUser(req.query.user);
		} else {
			console.log('no user');
			reviews = await getChallengedReviews();
		}

		res.status(200).json({reviews});
	} catch (e) {
		console.error(e);
		res.status(500).send('Server error');
	}
});

router.post('/', validate('addReview'), async (req, res) => {
	try {
		const reviewerIpAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		await addReview(req.body, reviewerIpAddress);
		res.status(201).send();
	} catch (e) {
		console.log(e);
		res.status(500).send('Server error');
	}
});

router.post('/challenge/:id', async (req, res) => {
	try {
		const reviewId = req.params.id;
		const challengeData = req.body;
		const userId = req.user.id;

		await challengeReview(reviewId, userId, challengeData);
		res.status(200).send();
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

router.post('/respond/:id', async (req, res) => {
	try {
		const reviewId = req.params.id;
		const responseData = req.body;
		const userId = req.user.id;

		await respondToReview(reviewId, userId, responseData);
		res.status(200).send();
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const user = req.user;
		const isAdmin = await getIsUserAdmin(user.id);

		if (!isAdmin) {
			return res.status(403).send();
		}

		const review = req.params.id;
		const response = await editReview(review, req.body);

		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(500).send('Server error');
	}
});

router.patch('/:id/remove', async (req, res) => {
	try {
		const user = req.user;
		const isAdmin = await getIsUserAdmin(user.id);

		if (!isAdmin) {
			return res.status(403).send();
		}

		const reviewId = req.params.id;
		const response = await updateReview(reviewId, { rejected: true, rejectedReason: 'admin action' });
		res.status(200).send(response);
	} catch (e) {
		console.error(e);
		res.status(500).send('Server error');
	}
});

module.exports = router;
