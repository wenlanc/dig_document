import { instance, getCSRF } from 'controllers/axios';

export async function updateCampaign(campaign) {
	try {
		const updatedCampaign = await instance.patch(
			'/reviewCollectionCampaigns',
			campaign
		);

		return updatedCampaign.data;
	} catch (error) {
		console.error(`Error updating campaign ${error}`);
	}
}

export async function fetchDefaultCampaign(userId) {
	try {
		const campaign = await instance.get(
			`/reviewCollectionCampaigns/default/?user=${userId}`
		);

		return campaign.data;
	} catch (error) {
		console.error(`Error fetching campaign ${error}`);
	}
}

export async function fetchUserCampaigns(userId) {
	try {
		const response = await instance.get(
			`/reviewCollectionCampaigns/?user=${userId}`
		);
		return response.data;
	} catch (error) {
		console.error(`${error}`);
		return Promise.reject(`Error fetching campaigns`);
	}
}

export async function endCampaign(campaignId) {
	try {
		await getCSRF();
		const response = await instance.patch(
			`/reviewCollectionCampaigns/${campaignId}`,
			{ deleted: true }
		);
		return response.data;
	} catch (error) {
		console.error(`${error}`);
		return Promise.reject(
			`Error trying to end a campaign with id: ${campaignId}`
		);
	}
}
