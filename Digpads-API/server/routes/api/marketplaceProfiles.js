const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getProfile,
	getProfiles,
	searchProfiles,
	updateProfile,
	deleteProfile,
	createProfile,
	createCustomTag,
} = require('../../controllers/marketplaceProfile');

const { getIsUserAdmin } = require('../../controllers/users');

router.get('/', async (req, res) => {	
	try {
		const filter = ({
			state,
			city,
			zip,
			areasServed,
			rentalsAvailable,
			starRating,
			numReviews,
			unclaimed,
			name,
		} = req.query);

		const query = req.query.q;

		const fields = req.query.fields;
		const profiles = await getProfiles(filter, fields, query);

		res.status(200).send(profiles);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.get('/search', async (req, res) => {
	try {
		const filter = ({
			state,
			city,
			zip,
			areasServed,
			rentalsAvailable,
			starRating,
			numReviews,
			yearsInBusiness,
			photosVideos,
			categories,
		} = req.query);

		const query = req.query.q;
		delete req.query.q;

		const profiles = await searchProfiles(filter, query);

		res.status(200).send(profiles);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});


router.get('/:user', async (req, res) => {
	const user = req.params.user;
	const profileUser = { id: user };

	try {
		const profile = await getProfile(profileUser, req.query?.fields);
		if (profile === null) {
			res.status(404).send('Profile not found or deleted');
		}
		res.status(200).send(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
});

router.post('/', async (req, res) => {
	const user = req.user;
	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	try {
		const response = await createProfile(req.body);
		res.status(200).send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}

	res.status(404).send();
});

router.post('/:field', async (req, res) => {
	if (req.params.field === 'tags') {
		const user = req.user;

		if (!user) {
			return res.status(401).send();
		}

		try {
			const response = await createCustomTag(req.body);
			res.status(200).send(response);
		} catch (error) {
			console.error(error);
			res.status(500).send();
		}
	}

	res.status(404).send();
});

router.patch('/', async (req, res) => {
	const user = req.user;

	if (!user) {
		return res.status(401).send();
	}

	try {
		const profile = await updateProfile(user, req.body);
		res.status(200).send(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
});

router.patch('/:user', async (req, res) => {
	const user = req.user; // must be Admin
	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	const profileUser = { id: req.params.user };

	try {
		const profile = await updateProfile(profileUser, req.body);
		res.status(200).send(profile);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.patch('/delete/:user', async (req, res) => {
	const user = req.user; // must be Admin
	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	const profileUser = { id: req.params.user };

	try {
		await deleteProfile(profileUser);
		res.status(200).send();
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

module.exports = router;
