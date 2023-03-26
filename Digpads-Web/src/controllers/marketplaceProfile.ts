import { instance, getCSRF } from './axios';

const isProduction = process.env.NODE_ENV === 'production';

const basePath = 'marketplaceProfiles';

export function searchProfiles(url) {
	try {
		return searchMarketplaceProfiles(url);
	} catch (error) {
		console.error(`Error searching marketplace profiles: ${error}`);
	}
}

async function searchMarketplaceProfiles(url) {
	let response;

	response = await instance.get(url);

	const profiles = response.data || [];
	return profiles;
}

export async function fetchBusinessTags() {
	try {
		return instance.get('businessTags').then((response) => response.data);
	} catch (error) {
		console.error(`Error fetching business categories: ${error}`);
	}
}

export async function fetchUnclaimedProfiles() {
	try {
		const response = await instance.get('marketplaceProfiles/?unclaimed=true');
		return response.data;
	} catch (error) {
		console.error(`Error fetching unclaimed profiles: ${error}`);
	}
}

export async function fetchMarketplaceProfile(user) {
	let url = `${basePath}`;
	if (user) {
		url += `/${user}`;
	} else {
		url = 'getMyMarketplaceProfile';
	}

	try {
		const response = await instance.get(url);

		const profile = response.data;
		return profile;
	} catch (error) {
		return Promise.reject('Profile not found or deleted');
	}
}

export async function deleteUserProfile(user) {
	try {
		await getCSRF();
		const response = await instance.patch(`${basePath}/delete/${user}`);

		if (response.ok) {
			return true;
		}
	} catch (error) {
		return Promise.reject(`Error deleting user profile ${error}`);
	}
}

export async function updateProfile(data, setData, user) {
	await getCSRF();

	try {
		instance
			.patch(`${basePath}${user ? '/' + user : ''}`, data)
			.then((response) => {
				if (response.status === 200) {
					setData(response.data);
				}
			});
	} catch (error) {
		alert('Error updating profile data');
	}
}

export async function createCustomTag(tag) {
	tag.custom = true;

	try {
		return instance
			.post(`${basePath}/tags`, tag)
			.then((response) => response.data);
	} catch (error) {
		console.error(`Error creating custom tag: ${error}`);
	}
}

export async function updateBusinessTag(tag) {
	try {
		return instance.put('businessTags', tag).then((response) => response.data);
	} catch (error) {
		console.error(`Error updating business tag: ${error}`);
	}
}

export async function deleteBusinessTag(tag) {
	try {
		return instance
			.delete(`businessTags/${tag._id}`)
			.then((response) => response.data);
	} catch (error) {
		console.error(`Error deleting business tag: ${error}`);
	}
}

export async function createProfile(user) {
	try {
		await getCSRF();
		return instance
			.post(`${basePath}/`, user)
			.then((response) => response.data);
	} catch (error) {
		Promise.reject(`Error creating profile for user: ${user}, eror: ${error}`);
	}
}

export async function assignUnclaimedProfile(profileId, email) {
	try {
		await getCSRF();
		return instance
			.post(`/assign-profile/${profileId}`, { email })
			.then((response) => response.data);
	} catch (error) {
		Promise.reject(
			`Error assigning unclaimed profile with id: ${profileId} to email: ${email}. Eror: ${error}`
		);
	}
}

export async function claimUnclaimedProfile(userData, profileId) {
	try {
		await getCSRF();
		const response = await instance.post(`/claim-profile`, {
			...userData,
			profileId,
		});

		if (response.status === 200) {
			return true;
		}

		return false;
	} catch (error) {
		Promise.reject(
			`Error claiming a profile with id: ${profileId}. Data: ${userData}. Eror: ${error}`
		);
	}
}

export function transformProfiles(profiles) {
	return profiles?.map((profile) => ({
		user: profile.user,
		starRating: profile.starRating,
		name: profile.contactInfo?.name,
		areasServed: profile.areasServed?.map(
			(area) => area.state + ', ' + area.city
		),
		numProperties: 4,
		desiredRental: profile.desiredRental,
		city: profile.contactInfo?.city,
		state: profile.contactInfo?.state,
		zip: profile.contactInfo?.zip,
	}));
}
