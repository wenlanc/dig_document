import { getCSRF, instance } from '../../../controllers/axios';

export const GetUtilityList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'UTILITY_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.get('/utilities/getUtilities');
		const data = res.data;
		dispatch({
			type: 'UTILITY_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'UTILITY_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewUtility = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'UTILITY_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});

		if (title === 'Add') {
			const response = await instance.post('utilities/addUtility', {
				...data,
			});
			dispatch({
				type: 'UTILITY_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post('utilities/editUtility', {
				...data,
			});
			dispatch({
				type: 'UTILITY_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		dispatch({
			type: 'UTILITY_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const DeleteUtility = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'UTILITY_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		await instance.post('utilities/deleteUtility', {
			...data,
		});
		dispatch({
			type: 'UTILITY_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		dispatch({
			type: 'UTILITY_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred while deleting, please try again!',
			},
		});
	}
};
