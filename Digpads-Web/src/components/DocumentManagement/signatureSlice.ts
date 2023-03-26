import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance, getCSRF } from '../../controllers/axios';

const signatureSlice = createSlice({
	name: 'signature',
	initialState: {
		fields: [],
	},
	reducers: {
		addField: (state, action) => {
			action.payload.id = state.fields.length;
			state.fields.push(action.payload);
		},
		updateField: (state, action) => {
			let fieldId = action.payload.id;
			state.fields[fieldId].left = action.payload.left;
			state.fields[fieldId].top = action.payload.top;
			state.fields[fieldId].width = action.payload.width;
			state.fields[fieldId].height = action.payload.height;
		},
		appendField: (state, action) => {
			state.fields.push(action.payload);
		},
		updateFieldProperty: (state, action) => {
			if (state.fields[action.payload.id])
				state.fields[action.payload.id].property = {
					...state.fields[action.payload.id].property,
					...action.payload.property,
				};
		},
		removeField: (state, action) => {
			state.fields[action.payload.id] = null;
		},
		removeAllField: (state, action) => {
			state.fields = [];
		},
		saveSignature: (state, action) => {
			let request = instance.post(`/edocument/saveSignature`, {
				title: 'my_signature',
				fields: JSON.stringify(state.fields[action.payload.id]),
			});
			request
				.then((res) => {
					if (res.status === 200) {
						console.log(res);
						// Go to list of documents
					}
				})
				.catch((e) => {
					console.log(e);
				});
		},
		saveCustomField: (state, action) => {
			let request = instance.post(`/edocument/saveCustomField`, {
				title: action.payload.newCustomFieldName,
				fields: JSON.stringify(state.fields[action.payload.id]),
			});
			request
				.then((res) => {
					if (res.status === 200) {
						console.log(res);
						// Go to list of documents
					}
				})
				.catch((e) => {
					console.log(e);
				});
		},
		saveWebform: (state, action) => {
			let request = instance.post(`/edocument/saveWebForm`, action.payload);
			request
				.then((res) => {
					if (res.status === 200) {
						console.log(res);
						// Go to list of documents
					}
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
});

// Selectors
export const selectSignatures = (state) => state.signature.fields;

export const {
	addField,
	updateField,
	appendField,
	updateFieldProperty,
	removeField,
	removeAllField,
	saveSignature,
	saveCustomField,
	saveWebform,
} = signatureSlice.actions;

export default signatureSlice.reducer;
