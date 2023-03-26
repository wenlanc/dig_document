const Notification = require('../models/Notification');

async function getNotifications(user) {
	try {
		return Notification.find({ user }, 'message to isRead');
	} catch (error) {
		console.error(error);
		return Promise.reject(`Error retreiving notifications`);
	}
}

async function notifyUser(user, notification) {
	try {
		await Notification.create({
			user,
			message: notification.message,
			to: notification.to,
		});

		console.log(`created notification ${notification} for user: ${user}`);
	} catch (error) {
		console.error(error);
		return Promise.reject(`Error attempting to notify user`);
	}
}

async function markNotificationsAsRead(user, notifications) {
	try {
		await Notification.updateMany({ _id: { $in: notifications } }, { $set: { isRead: true } })
		return true;
	} catch (error) {
		console.error(error);
		return Promise.reject(`Error attempting to notify user`);
	}
}

module.exports = {
	getNotifications,
	notifyUser,
	markNotificationsAsRead,
};
