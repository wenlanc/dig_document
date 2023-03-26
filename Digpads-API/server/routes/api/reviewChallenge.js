const express = require('express');
const router = express.Router();
const { challengeReview, patchReviewChallenge, requestMoreInformation, addAttachments } = require('../../controllers/reviews');

router.post('/', async (req, res) => {
	try {
		challengeReview(req.body);

		res.status(201).send('Review challenge has been created');
	} catch (e) {
        res.status(500).send('Server error');
	}
})

// Endpoint for admin to request more information
router.post('/:id', async (req, res) => {
	try {
		if ('action' in req.query) {
			if (req.query.action === 'request-info') {
				const reviewChallenge = req.params.id;
				await requestMoreInformation(reviewChallenge, req.body);
				res.status(200).send('More information has been requested');
			} else {
				res.status(200).send('unknown action')
			}
		}
	} catch (e) {
		console.error(e);
        res.status(500).send('Server error');
	}
})

// Endpoint for user to provide requested information
router.post('/:id/attachments', async (req, res) => {
	const attachments = req.body;
	const reviewChallengeId = req.params.id;
	try {
		await addAttachments(reviewChallengeId, attachments);
		res.status(200).send();
	} catch (e) {
		console.error(e);
        res.status(500).send('Server error');
	}
})

router.patch('/:id', async (req, res) => {
	try {
		const reviewChallenge = req.params.id;
		await patchReviewChallenge(reviewChallenge, req.body);
		res.status(200).send();
	} catch (e) {
        res.status(500).send('Server error');
	}
})

module.exports = router;