import { getCSRF, instance } from '../../../controllers/axios';

export const GetPropertiesList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'PROPERTY_LIST_LOADING',
		});
		await getCSRF();
		const res = await instance.get('getProperty');
		const data = res.data;

		dispatch({
			type: 'PROPERTY_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'PROPERTY_LIST_FAIL',
		});
	}
};

export const NewProperty = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'PROPERTY_LIST_LOADING',
		});
		await getCSRF();

		if (title === 'Add') {
			const response = await instance.post('addProperty', {
				...data,
			});
			dispatch({
				type: 'PROPERTY_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post('editProperty', {
				...data,
			});
			dispatch({
				type: 'PROPERTY_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		dispatch({
			type: 'PROPERTY_LIST_FAIL',
		});
	}
};

export const DeleteProperty = (id, reason) => async (dispatch) => {
	try {
		dispatch({
			type: 'PROPERTY_LIST_LOADING',
		});

		await getCSRF;
		instance.post('deleteProperty', {
			id,
			reason,
		});

		dispatch({
			type: 'PROPERTY_DELETE_SUCCESS',
			payload: { id, reason },
		});
	} catch (e) {
		dispatch({
			type: 'PROPERTY_LIST_FAIL',
		});
	}
};
