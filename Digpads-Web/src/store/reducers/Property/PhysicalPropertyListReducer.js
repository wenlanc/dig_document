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

export const PhysicalPropertyListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'PHYSICAL_LIST_LOADING':
			return {
				...state,
				loading: true,
				errorMessage: '',
			};
		case 'PHYSICAL_LIST_SUCCESS':
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
		case 'PHYSICAL_NEW_SUCCESS':
			console.log('PHYSICAL_NEW_SUCCESS');
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
		case 'PHYSICAL_EDIT_SUCCESS':
			console.log('PHYSICAL_EDIT_SUCCESS');
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
		case 'PHYSICAL_LIST_FAIL':
			console.log('PHYSICAL_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Error Occured, please try again',
			};
		case 'PHYSICAL_DELETE_SUCCESS':
			console.log('PHYSICAL_DELETE_SUCCESS');
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

		case 'PHYSICAL_RESPONSE_MESSAGE':
			console.log('PHYSICAL_RESPONSE_MESSAGE');
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
