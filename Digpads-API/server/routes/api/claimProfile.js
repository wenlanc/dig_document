const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	claimProfile,
} = require('../../controllers/marketplaceProfile');

router.post('/', async (req, res) => {
	const { profileId, ...userData } = req.body;

	try {
		await claimProfile(profileId, userData);
		res.status(200).send();
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

module.exports = router;