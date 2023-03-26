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

export const UtilityListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'UTILITY_LIST_LOADING':
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
		case 'UTILITY_LIST_SUCCESS':
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
		case 'UTILITY_NEW_SUCCESS':
			console.log('UTILITY_NEW_SUCCESS');
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
		case 'UTILITY_EDIT_SUCCESS':
			console.log('UTILITY_EDIT_SUCCESS');
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
					message: 'Edited Successfully',
					variant: 'success',
				},
			};
		case 'UTILITY_LIST_FAIL':
			console.log('UTILITY_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading utilities',
			};
		case 'UTILITY_DELETE_SUCCESS':
			console.log('UTILITY_DELETE_SUCCESS');
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
		case 'UTILITY_RESPONSE_MESSAGE':
			console.log('UTILITY_RESPONSE_MESSAGE');
			console.log(action.payload);
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
