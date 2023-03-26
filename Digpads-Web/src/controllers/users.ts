import { instance as axios } from './axios';
import { getCSRF } from 'controllers/axios';
import { uploadImage } from 'controllers/cloudinary';
import { User } from 'types';

/**
 * @param {Object} criteria
 * @returns {Array<Objects>} users
 */
export const fetchUsers = (criteria) =>
	axios
		.get(`/users?${criteria.key}${criteria.value ? `=${criteria.value}` : ''}`)
		.then((res) => {
			if (res.status === 200) {
				if (res.data) {
					return res.data;
				} else {
					throw 'no user data';
				}
			}
		})
		.catch((reason) => console.log(reason));

export async function fetchSubscribers() {
	try {
		const response = await axios.get('getSubscribers');
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		return Promise.reject('Error fetching subscribers');
	}
}

export async function updateProfilePhoto(userId: string, photo: File) {
	const response = await uploadImage(photo);
	const { secure_url } = response;

	try {
		await getCSRF();
		const response = await axios.patch(`users/${userId}/profilePicture`, {
			profilePicture: secure_url,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		return Promise.reject('Error fetching subscribers');
	}
}

export async function updateUser(userId: string | null, update: Partial<User>) {
	try {
		let url = 'users';
		if (userId !== null) {
			url += `/${userId}`;
		}

		await getCSRF();
		const response = await axios.patch(url, update);
		return response.data;
	} catch (error) {
		return Promise.reject(error.message);
	}
}
