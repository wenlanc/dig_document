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

export const SystemListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'SYSTEM_LIST_LOADING':
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
		case 'SYSTEM_LIST_SUCCESS':
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
		case 'SYSTEM_NEW_SUCCESS':
			console.log('SYSTEM_NEW_SUCCESS');
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
		case 'SYSTEM_EDIT_SUCCESS':
			console.log('SYSTEM_EDIT_SUCCESS');
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
		case 'SYSTEM_LIST_FAIL':
			console.log('SYSTEM_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading utilities',
			};
		case 'SYSTEM_DELETE_SUCCESS':
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
		case 'SYSTEM_RESPONSE_MESSAGE':
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
