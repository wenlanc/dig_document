import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'controllers/axios';
import { Campaign } from 'types';

const campaignsSlice = createSlice({
	name: 'campaigns',
	initialState: {
		campaigns: [],
	},
	reducers: {
		campaignAdded: (state, action) => {
			state.campaigns.push(action.payload);
		},
		campaignUpdated: (state, action) => {
			const campaign = action.payload;

			const oldCampaign = state.campaigns.find((c) => c._id == campaign._id);

			if (oldCampaign) {
				oldCampaign.name = campaign.name;
				oldCampaign.description = campaign.description;
				oldCampaign.state = campaign.state;
				oldCampaign.city = campaign.city;
			} else {
				throw Error('campaign not found');
			}
		},
		selectedCampaignAdded: (state, action) => {
			const id = action.payload;

			const campaign = state.campaigns.find((c) => c._id == id);

			if (campaign) {
				campaign.isSelected = true;
			} else {
				throw 'Attempt to select a non existent campaign';
			}
		},
		selectedCampaignRemoved: (state, action) => {
			const id = action.payload;

			const campaign = state.campaigns.find((c) => c._id == id);

			if (campaign) {
				campaign.isSelected = false;
			} else {
				throw 'Attempt to deselect a non existent campaign';
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCampaigns.fulfilled, (state, action) => {
			const campaigns = action.payload;

			campaigns.forEach((c) => {
				c.isSelected = true;
			});

			state.campaigns = campaigns;
		});
	},
});

export const fetchCampaigns = createAsyncThunk(
	'reviewsManagement/fetchCampaigns',
	async () => {
		const response = await instance.get('reviewCollectionCampaigns');
		return response.data;
	}
);

// Selectors
export const selectCampaigns = (state): Campaign[] => state.campaigns.campaigns;

export const {
	campaignAdded,
	campaignUpdated,
	selectedCampaignAdded,
	selectedCampaignRemoved,
} = campaignsSlice.actions;
export default campaignsSlice.reducer;
