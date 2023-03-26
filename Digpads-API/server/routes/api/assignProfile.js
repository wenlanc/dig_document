const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	assignProfile,
} = require('../../controllers/marketplaceProfile');
const { getIsUserAdmin } = require('../../controllers/users');

router.post('/:profile', async (req, res) => {
	const user = req.user;
	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	const profileId = req.params.profile;
	const email = req.body.email;

	try {
		const profile = await assignProfile(profileId, email);
		res.status(200).send(profile);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

module.exports = router;
