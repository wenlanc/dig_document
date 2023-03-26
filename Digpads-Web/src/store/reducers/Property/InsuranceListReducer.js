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

export const InsuranceListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'INSURANCE_LIST_LOADING':
			return {
				...state,
				loading: true,
				errorMessage: '',
				response: {
					status: true,
					message: 'Loading',
					variant: 'info',
				},
			};
		case 'INSURANCE_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.payload.data,
				events: action.payload.events,
				errorMessage: '',
				response: {
					status: true,
					message: 'Loaded successfully',
					variant: 'success',
				},
			};
		case 'INSURANCE_NEW_SUCCESS':
			return {
				...state,
				data: [...state.data, action.payload],
				loading: false,
				errorMessage: '',
				response: {
					status: true,
					message: 'Added Successfully',
					variant: 'success',
				},
			};
		case 'INSURANCE_EDIT_SUCCESS':
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
					message: 'Edited Successfully',
					variant: 'success',
				},
			};
		case 'INSURANCE_LIST_FAIL':
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading insurance data',
			};
		case 'INSURANCE_DELETE_SUCCESS':
			return {
				...state,
				loading: false,
				data: [
					...state.data.filter((u) => u._id !== action.payload.id),
				],
				response: {
					status: true,
					message: 'Deleted Successfully',
					variant: 'success',
				},
			};
		case 'INSURANCE_RESPONSE_MESSAGE':
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
