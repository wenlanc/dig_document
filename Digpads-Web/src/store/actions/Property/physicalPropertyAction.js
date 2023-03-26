import { getCSRF, instance } from '../../../controllers/axios';

export const GetPhysicalList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'PHYSICAL_LIST_LOADING',
		});
		await getCSRF().catch((err) => {
			throw err;
		});
		const res = await instance.get('/physicalProperty/getPhysicalProperty');
		const data = res.data;
		dispatch({
			type: 'PHYSICAL_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'PHYSICAL_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
		dispatch({
			type: 'PHYSICAL_LIST_FAIL',
		});
		console.log(e.response);
	}
};

export const NewPhysical = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'PHYSICAL_LIST_LOADING',
		});
		await getCSRF();
		if (title === 'Add') {
			const response = await instance.post(
				'/physicalProperty/addPhysicalProperty',
				{
					...data,
				}
			);
			dispatch({
				type: 'PHYSICAL_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post(
				'/physicalProperty/editPhysicalProperty',
				{
					...data,
				}
			);
			dispatch({
				type: 'PHYSICAL_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		console.log('Error while adding/editing PHYSICAL');
		dispatch({
			type: 'PHYSICAL_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while adding, please try again!',
			},
		});
		// dispatch({
		// 	type: 'PHYSICAL_LIST_FAIL',
		// });
	}
};

export const DeletePhysical = (id, reason) => async (dispatch) => {
	try {
		dispatch({
			type: 'PHYSICAL_LIST_LOADING',
		});
		await getCSRF;
		instance.post('/physicalProperty/deletePhysicalProperty', {
			id,
			reason,
		});
		dispatch({
			type: 'PHYSICAL_DELETE_SUCCESS',
			payload: { id, reason },
		});
	} catch (e) {
		console.log('error while deleting');
		console.log(e);
		dispatch({
			type: 'PHYSICAL_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		dispatch({
			type: 'PHYSICAL_LIST_FAIL',
		});
	}
};
