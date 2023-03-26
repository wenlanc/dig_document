const express = require('express');
const router = express.Router();

const communitiesController = require('../../controllers/communities');

router.get('/', async (req, res) => {
	const user = req.user;

	if (!user) {
		return res.status(401).send();
	}

	let favCommunities;

	try {
		favCommunities = await communitiesController.getFavoriteCommunities(
			user.id
		);
		return res.status(200).send(favCommunities);
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}


});

router.post(
	'/',
	communitiesController.validate('addFavoriteCommunity'),
	async (req, res) => {
		const user = req.user;
		const { community } = req.body;

		if (!user) {
			return res.status(401).send();
		}

		if (!community || !community.state) {
			return res.status(400).send('invalid community');
		}

		try {
			const newCommunity = await communitiesController.addFavoriteCommunity(
				user.id,
				community
			);

			return res.status(200).send(newCommunity);
		} catch (error) {
			console.log(error);
			return res.status(500).send();
		}
	}
);

router.patch(
	'/',
	communitiesController.validate('updateFavoriteCommunity'),
	async (req, res) => {
		const user = req.user;
		const { community } = req.body;

		if (!user) {
			return res.status(401).send('user must be logged in');
		}

		if (!community) {
			return res.status(400).send('invalid community');
		}

		try {
			const isUpdated = await communitiesController.updateFavoriteCommunity(
				community
			);

			if (!isUpdated) {
				res.status(500).send();
			}
		} catch (error) {
			console.log(error);
			return res.status(500).send();
		}

		res.status(200).send();
	}
);

router.delete(
	'/:id',
	communitiesController.validate('deleteFavoriteCommunity'),
	async (req, res) => {
		const user = req.user;
		const communityId = req.params.id;

		if (!user) {
			return res.status(401).send('user must be logged in');
		}

		if (!communityId) {
			return res.status(400).send('invalid community id');
		}

		try {
			await communitiesController.deleteFavoriteCommunity(communityId);
		} catch (error) {
			console.log(error);
			return res.status(500).send();
		}

		return res.status(200).send();
	}
);

module.exports = router;
