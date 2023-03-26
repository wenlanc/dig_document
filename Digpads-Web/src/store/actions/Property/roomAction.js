import { getCSRF, instance } from '../../../controllers/axios';

export const GetAllRooms = () => async (dispatch) => {
	try {
		dispatch({
			type: 'ROOM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.post('rooms/getAllRooms');
		const data = res.data;
		dispatch({
			type: 'ALL_ROOM_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'ROOM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewRoom = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'ROOM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const response = await instance.post('/rooms/addRoom', data);
		dispatch({
			type: 'NEW_ROOM_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: 'ROOM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const EditRoom = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'ROOM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const response = await instance.post('/rooms/editRoom', data);
		dispatch({
			type: 'ROOM_EDIT_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: 'ROOM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const DeleteRoom = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'ROOM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const response = await instance.post('/rooms/deleteRoom', data);
		dispatch({
			type: 'ROOM_DELETE_SUCCESS',
			payload: { id: response.data._id },
		});
	} catch (e) {
		dispatch({
			type: 'ROOM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};
