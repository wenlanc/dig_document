const express = require('express');
const router = express.Router();
const BusinessTag = require('../../models/BusinessTag');
const {
	getBusinessTags,
	updateBusinessTags,
	deleteBusinessTag,
} = require('../../controllers/businessTag');
const { getIsUserAdmin } = require('../../controllers/users');

router.get('/', async (req, res) => {
	try {
		const userType = req.query.userType;

		const tags = await getBusinessTags(userType);
		res.status(200).send(tags);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error');
	}
});

router.post('/', async (req, res) => {
	const tag = req.body;

	try {
		const response = await BusinessTag.create(tag);

		res.status(200).send(response);
	} catch (error) {
		console.error(`Error creating new business tag: ${error}`);
		res.status(500).send('Server error');
	}
});

router.put('/', async (req, res) => {
	try {
		const tag = req.body;
		const response = await BusinessTag.update({ name: tag.name }, tag);

		res.status(200).send(response);
	} catch (error) {
		console.error(`Error updating business tag: ${error}`);
		res.status(500).send('Server error');
	}
});

router.patch('/', async (req, res) => {
	const user = req.user;

	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	try {
		const tags = req.body;
		const newTags = await updateBusinessTags(tags);

		res.status(200).send(newTags);
	} catch (error) {
		console.error(`Error updating business tags: ${error}`);
		res.status(500).send('Server error');
	}
});

router.delete('/:id', async (req, res) => {
	const user = req.user;
	const isAdmin = await getIsUserAdmin(user.id);

	if (!isAdmin) {
		return res.status(403).send();
	}

	try {
		const tag = req.params.id;
		const response = await deleteBusinessTag(tag);

		res.status(200).send(response);
	} catch (error) {
		console.error(`Error deleting business tag: ${error}`);
		res.status(500).send('Server error');
	}
});

module.exports = router;
