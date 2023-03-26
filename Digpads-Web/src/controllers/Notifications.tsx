import { instance } from 'controllers/axios';
import { Notification } from 'types';
import { getCSRF } from 'controllers/axios';

export async function fetchNotifications(user) {
	try {
		const response = await instance.get(`/users/${user}/notifications`);

		let { notifications } = response.data;
		notifications = notifications || [];

		return notifications;
	} catch (error) {
		return Promise.reject(`Error fetching notifications: ${error}`);
	}
}

export async function markNotificationsAsRead(
	user: string,
	notifications: Notification[]
) {
	try {
		const readNotifications = notifications.map((n) => n._id);

		await getCSRF();
		const response = await instance.patch(
			`/users/${user}/notifications`,
			readNotifications
		);

		if (response.status === 200) {
			return notifications.map((n) => ({ ...n, isRead: true }));
		}
	} catch (error) {
		return Promise.reject(`Error fetching notifications: ${error}`);
	}
}
