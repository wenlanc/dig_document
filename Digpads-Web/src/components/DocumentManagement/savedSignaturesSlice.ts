import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const savedSignaturesSlice = createSlice({
	name: 'savedSignatures',
	initialState: {
		items: [],
	},
	reducers: {
		updateSavedSignatures: (state, action) => {
			state.items = action.payload;
		},
	},
});

// Selectors
export const listSavedSignatures = (state) => state.savedSignatures.items;

export const { 
	updateSavedSignatures,
} = savedSignaturesSlice.actions;
export default savedSignaturesSlice.reducer;
