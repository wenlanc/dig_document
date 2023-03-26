const DefaultState = {
	loading: true,
	data: [],
	events: [],
	errorMessage: '',
	response: {
		status: false,
		message: '',
		variant: '',
	},
};

export const RoomListReducer = (state = DefaultState, action) => {
	switch (action.type) {
		case 'ROOM_LIST_LOADING':
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
		case 'ALL_ROOM_LIST_SUCCESS':
			return {
				...state,
				loading: false,
				data: [...action.payload.data],
				events: [...action.payload.events],
				errorMessage: '',
				response: {
					status: true,
					message: 'Loaded successfully',
					variant: 'success',
				},
			};
		case 'NEW_ROOM_SUCCESS':
			return {
				...state,
				loading: false,
				data: [...state.data, action.payload],
				response: {
					status: true,
					message: 'Room Added Successfully',
					variant: 'success',
				},
			};
		case 'ROOM_EDIT_SUCCESS':
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
					message: 'Room Edited Successfully',
					variant: 'success',
				},
			};
		case 'ROOM_LIST_FAIL':
			return {
				...state,
				loading: false,
				errorMessage: 'Error loading rooms',
			};
		case 'ROOM_DELETE_SUCCESS':
			return {
				...state,
				loading: false,
				data: [
					...state.data.filter((u) => u._id !== action.payload.id),
				],
				response: {
					status: true,
					message: 'Room Deleted Successfully',
					variant: 'success',
				},
			};
		case 'ROOM_RESPONSE_MESSAGE':
			return {
				...state,
				loading: false,
				response: action.payload,
			};
		default:
			return state;
	}
};
