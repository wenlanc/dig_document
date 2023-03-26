const express = require('express');
const router = express.Router();
const {
	getUsers,
	update,
	updateProfilePicture,
	getUser,
	getStats,
	updateMyProfile
} = require('../../controllers/users');
const { getProfile } = require('../../controllers/marketplaceProfile');
const { getPostsByUser } = require('../../controllers/posts');
const { getCommentsByUser } = require('../../controllers/comments');

const {
	getNotifications,
	markNotificationsAsRead,
} = require('../../controllers/notifications');

router.get('/', async (req, res) => {
	const query = req.query;
	const response = await getUsers(query);

	if (response.status === 'ok') {
		res.status(200).send(response.users);
	} else {
		res.status(500).send(response.message);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		if (req.params.id === 'stats') {
			return next();
		}
		const user = await getUser(req.params.id);
		res.status(200).send(user);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.get('/:id/notifications', async (req, res, next) => {
	try {
		const userId = req.params.id;
		const notifications = await getNotifications(userId);

		res.status(200).send({ notifications });
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.get('/:id/marketplaceProfile', async (req, res, next) => {
	try {
		const userId = req.params.id;
		const response = await getProfile({ id: userId});

		res.status(200).send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.get('/:id/posts', async (req, res, next) => {
	try {
		const userId = req.params.id;
		const response = await getPostsByUser(userId);

		res.status(200).send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.get('/:id/comments', async (req, res, next) => {
	try {
		const userId = req.params.id;
		const response = await getCommentsByUser(userId);

		res.status(200).send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

router.get('/stats', async (req, res) => {
	try {
		const stats = await getStats();
		res.status(200).send(stats);
	} catch (e) {
		console.error(e);
		res.status(500).send('Server error');
	}
});

router.patch('/', async (req, res) => {
	const userId = req.user.id;
	const update = req.body;

	try {
		const response = await updateMyProfile(userId, update);
		res.status(200).send(response);
	} catch (error) {
		res.status(500).send(error.message);
	}
})

router.patch('/:id', async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await update(
			userId,
			req.body.data.action,
			req.body.data.duration,
			req.body.data.reason
		);

		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.patch('/:id/notifications', async (req, res) => {
	const userId = req.params.id;
	const notifications = req.body;

	try {
		await markNotificationsAsRead(userId, notifications);
		res.status(200).send();
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/:id/profilePicture', async (req, res) => {
	const userId = req.user.id;
	const profilePicture = req.body.profilePicture;

	console.log(`updating user ${userId} with ${profilePicture}`);

	try {
		const result = await updateProfilePicture(userId, profilePicture);

		if (!result) {
			res.status(500).send('Failed to updated profile picture');
		}

		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
