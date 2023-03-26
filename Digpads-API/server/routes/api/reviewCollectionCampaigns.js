const express = require('express');
const router = express.Router();

const {
	createNewCampaign,
	updateCampaign,
	getAll,
	validate,
	getDefault,
} = require('../../controllers/reviewCollectionCampaign');
const { getIsUserAdmin } = require('../../controllers/users');

router.get('/', async (req, res) => {
	const user = req.user;

	if (!user) return res.status(401).send('User must be signed in');

	try {
		const campaigns = await getAll(user.id);
		res.status(200).send(campaigns);
	} catch (e) {
		console.error(e);
		res.status(500).send('Error retrieving campaigns');
	}
});

router.get('/default', async (req, res) => {
	const userId = req.query.user;

	if (!userId) return res.status(401).send('User parameter is required');

	try {
		const campaign = await getDefault(userId);
		res.status(200).send(campaign);
	} catch (e) {
		console.error(e);
		res.status(500).send('Error retrieving default campaign');
	}
});

router.post('/', validate('createNewCampaign'), async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.status(401).send();
		}

		req.body.user = user.id;
		const response = await createNewCampaign(req.body);
		res.status(201).send(response);
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
});

router.patch('/', async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.status(401).send();
		}

		req.body.user = user.id;
		const campaign = await updateCampaign(req.body);

		res.status(200).send(campaign);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const user = req.user;
		const isAdmin = await getIsUserAdmin(user.id);

		if (!isAdmin) {
			return res.status(403).send();
		}

		const campaignId = req.params.id;
		req.body._id = campaignId;
		const campaign = await updateCampaign(req.body);

		res.status(200).send(campaign);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

module.exports = router;
