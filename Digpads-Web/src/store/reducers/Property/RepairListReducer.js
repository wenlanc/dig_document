const DefaultState = {
	loading: false,
	data: [],
	events: [],
	errorMessage: '',
	response: {
		status: false,
		message: '',
		variant: '',
	},
};

export const RepairListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'REPAIR_LIST_LOADING':
			return {
				...state,
				loading: true,
				errorMessage: '',
			};
		case 'REPAIR_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.payload.data,
				events: action.payload.events,
				errorMessage: '',
				response: {
					status: true,
					message: 'Loaded Successfully!',
					variant: 'success',
				},
			};
		case 'REPAIR_NEW_SUCCESS':
			console.log('REPAIR_NEW_SUCCESS');
			return {
				...state,
				data: [...state.data, action.payload],
				loading: false,
				errorMessage: '',
				response: {
					status: true,
					message: 'Added Successfully!',
					variant: 'success',
				},
			};
		case 'REPAIR_EDIT_SUCCESS':
			console.log('REPAIR_EDIT_SUCCESS');
			console.log('payload data =>', action.payload);
			return {
				...state,
				loading: false,
				data: [
					...state.data.map((_d) => {
						if (action.payload._id === _d._id) {
							return action.payload;
						} else return _d;
					}),
				],
				response: {
					status: true,
					message: 'Edited Successfully!',
					variant: 'success',
				},
			};
		case 'REPAIR_LIST_FAIL':
			console.log('REPAIR_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading repair and remodels data',
			};
		case 'REPAIR_DELETE_SUCCESS':
			console.log('REPAIR_DELETE_SUCCESS');
			return {
				...state,
				loading: false,
				data: [
					...state.data.filter((u) => u._id !== action.payload.id),
				],
				response: {
					status: true,
					message: 'Deleted Successfully!',
					variant: 'success',
				},
			};
		case 'REPAIR_RESPONSE_MESSAGE':
			console.log('REPAIR_RESPONSE_MESSAGE');
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
