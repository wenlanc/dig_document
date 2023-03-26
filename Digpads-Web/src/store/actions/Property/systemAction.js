import { getCSRF, instance } from '../../../controllers/axios';

export const GetSystemList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'SYSTEM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.get('/systems/getSystems');
		const data = res.data;
		dispatch({
			type: 'SYSTEM_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'SYSTEM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewSystem = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'SYSTEM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});

		if (title === 'Add') {
			const response = await instance.post('systems/addSystem', {
				...data,
			});
			dispatch({
				type: 'SYSTEM_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post('systems/editSystem', {
				...data,
			});
			dispatch({
				type: 'SYSTEM_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		dispatch({
			type: 'SYSTEM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const DeleteSystem = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'SYSTEM_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		await instance.post('systems/deleteSystem', {
			...data,
		});
		dispatch({
			type: 'SYSTEM_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		dispatch({
			type: 'SYSTEM_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred while deleting, please try again!',
			},
		});
	}
};
