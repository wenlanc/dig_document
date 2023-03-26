import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const selectedSignatureSlice = createSlice({
	name: 'selectedSignature',
	initialState: {
		field: {},
	},
	reducers: {
		selectField: (state, action) => {
			state.field = action.payload;
		},
		updateSelectedField: (state, action) => {
			state.field =  { ...state.field, ...action.payload };
		},
		removeSelectedField: (state, action) => {
			state.field = {};
		},
	},
});

// Selectors
export const getSelectedField = (state) => state.selectedSignature.field;

export const { 
	selectField,
	updateSelectedField,
	removeSelectedField,
} = selectedSignatureSlice.actions;
export default selectedSignatureSlice.reducer;
