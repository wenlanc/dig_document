const DefaultState = {
	loading: false,
	data: [],
	errorMessage: '',
	response: {
		status: false,
		message: '',
		variant: '',
	},
};

export const PropertiesListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'PROPERTY_LIST_LOADING':
			return {
				...state,
				loading: true,
				errorMessage: '',
			};
		case 'PROPERTY_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.payload,
				errorMessage: '',
				response: {
					status: true,
					message: 'Loaded Successfully!',
					variant: 'success',
				},
			};
		case 'PROPERTY_NEW_SUCCESS':
			console.log('PROPERTY_NEW_SUCCESS');
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
		case 'PROPERTY_EDIT_SUCCESS':
			console.log('PROPERTY_EDIT_SUCCESS');
			return {
				...state,
				data: [
					...state.data.map((_d) => {
						if (action.payload._id === _d._id) {
							return action.payload;
						} else return _d;
					}),
				],
				loading: false,
				response: {
					status: true,
					message: 'Edided Successfully!',
					variant: 'success',
				},
			};
		case 'PROPERTY_LIST_FAIL':
			console.log('PROPERTY_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Unable to get properties',
				response: {
					status: true,
					message: 'Error Occurred, try again!',
					variant: 'error',
				},
			};
		case 'PROPERTY_DELETE_SUCCESS':
			console.log('PROPERTY_DELETE_SUCCESS');
			return {
				...state,
				loading: false,
				data: [
					...state.data.filter((p) => p._id !== action.payload.id),
				],
				response: {
					status: true,
					message: 'Deleted Successfully!',
					variant: 'success',
				},
			};
		default:
			return state;
	}
};
