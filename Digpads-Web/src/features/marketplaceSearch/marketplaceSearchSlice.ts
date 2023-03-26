import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchProfiles as _searchProfiles } from 'controllers/marketplaceProfile';

const marketplaceSearchSlice = createSlice({
	name: 'marketplaceSearch',
	initialState: {
		filterText: '',
		filters: {
			areasServed: {
				label: 'Areas Served',
				options: [
					{ label: 'option1', value: 'option1' },
					{ label: 'option2', value: 'option2' },
				],
			},
		},
		status: 'idle',
		error: null,
	},
	reducers: {},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(searchProfiles.pending, (state, action) => {
	// 			state.status = 'loading';
	// 		})
	// 		.addCase(searchProfiles.fulfilled, (state, action) => {
	// 			state.status = 'succeeded';
	// 			state.profiles = action.payload;
	// 		})
	// 		.addCase(searchProfiles.rejected, (state, action) => {
	// 			state.status = 'failed';
	// 			state.error = action.error.message;
	// 		});
	// },
});

// export const searchProfiles = createAsyncThunk(
// 	'marketplaceSearch/fetchProfiles',
// 	async (url: string) => {
// 		return _searchProfiles(url);
// 	}
// );

// Selectors
// export const selectProfiles = (state) => state.marketplaceSearch.profiles;

// export const {} = marketplaceSearchSlice.actions;
// export default marketplaceSearchSlice.reducer;
