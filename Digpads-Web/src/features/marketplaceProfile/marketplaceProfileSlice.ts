import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchProfiles as _searchProfiles } from 'controllers/marketplaceProfile';
import { instance } from 'controllers/axios';
import { MarketplaceProfile } from 'types';

const marketplaceProfilesSlice = createSlice({
	name: 'marketplaceProfiles',
	initialState: {
		profiles: [],
		selectedProfile: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		profileSelected: (state, action) => {
			state.selectedProfile = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchProfiles.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(searchProfiles.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profiles = action.payload;
			})
			.addCase(searchProfiles.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})

			.addCase(fetchUserProfile.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.profiles.push(action.payload);
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const searchProfiles = createAsyncThunk(
	'marketplaceProfiles/fetchProfiles',
	async (url: string) => {
		return _searchProfiles(url);
	}
);

export const fetchUserProfile = createAsyncThunk(
	'marketplaceProfiles/fetchUserProfile',
	async (user: string) => {
		const response = await instance.get(`/users/${user}/marketplaceProfile`);
		return response.data;
	}
);

// Selectors
export const selectProfiles = (state) => state.marketplaceProfiles.profiles;
export const selectSelectedProfile = (state): MarketplaceProfile | null =>
	state.marketplaceProfiles.selectedProfile;
export const selectUserProfile = (userId, state) =>
	state.marketplaceProfiles.profiles.find(
		(profile) => profile.user._id === userId
	);

export const { profileSelected } = marketplaceProfilesSlice.actions;
export default marketplaceProfilesSlice.reducer;
