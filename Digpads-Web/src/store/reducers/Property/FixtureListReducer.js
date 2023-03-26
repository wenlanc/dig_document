const DefaultState = {
	loading: true,
	data: [],
	errorMessage: '',
	response: {
		status: false,
		message: '',
		variant: '',
	},
};

export const FixtureListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'FIXTURE_LIST_LOADING':
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
		case 'ALL_FIXTURE_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				errorMessage: '',
				data: action.payload.data,
				response: {
					status: true,
					message: 'Loaded Successfully!',
					variant: 'success',
				},
			};

		case 'FIXTURE_SUCCESS':
			console.log('FIXTURE_SUCCESS');
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
					message: 'Action Done Successfully',
					variant: 'success',
				},
			};
		case 'NEW_FIXTURE_SUCCESS':
			console.log('NEW_FIXTURE_SUCCESS', action.payload);
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
		case 'FIXTURE_EDIT_SUCCESS':
			console.log('FIXTURE_EDIT_SUCCESS');
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
		case 'FIXTURE_DELETE_SUCCESS':
			console.log('FIXTURE_DELETE_SUCCESS');
			return {
				...state,
				loading: false,
				data: [
					...state.data.filter((f) => f._id !== action.payload._id),
				],
				response: {
					status: true,
					message: 'Deleted Successfully',
					variant: 'success',
				},
			};
		case 'FIXTURE_LIST_FAIL':
			console.log('FIXTURE_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading condition data',
			};
		case 'FIXTURE_RESPONSE_MESSAGE':
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
