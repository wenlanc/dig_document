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

export const EventListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'EVENT_LIST_LOADING':
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
		case 'EVENT_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				data: action.payload,
				errorMessage: '',
				response: {
					status: true,
					message: 'Loaded successfully',
					variant: 'success',
				},
			};
		case 'EVENT_NEW_SUCCESS':
			console.log('EVENT_NEW_SUCCESS');
			console.log('adding', action.payload);
			console.log('to', state.data);
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

		case 'EVENT_CHANGED_SUCCESS':
			console.log('EVENT_CHANGED_SUCCESS');
			return {
				...state,
				loading: false,
				data: [
					...state.data.map((_d) => {
						if (action.payload.event._id === _d._id) {
							console.log('edit this one');
							console.log('return', action.payload.event);
							return action.payload.event;
						} else return _d;
					}),
				],
				response: {
					status: true,
					message: 'Event Recored Successfully!',
					variant: 'success',
				},
			};
		case 'EVENT_LIST_FAIL':
			console.log('EVENT_LIST_FAIL');
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading events',
				response: {
					status: true,
					message: 'Error Occured while loading Events',
					variant: 'error',
				},
			};
		case 'EVENT_DELETE_SUCCESS':
			console.log('EVENT_DELETE_SUCCESS');
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
		case 'EVENT_RESPONSE_MESSAGE':
			console.log('EVENT_RESPONSE_MESSAGE');
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
