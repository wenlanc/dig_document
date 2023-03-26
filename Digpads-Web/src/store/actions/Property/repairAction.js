import { getCSRF, instance } from '../../../controllers/axios';

export const GetRepairList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'REPAIR_LIST_LOADING',
		});
		await getCSRF().catch((err) => {
			throw err;
		});
		const res = await instance.get('/rnr/getRepairAndRemodels');
		const data = res.data;
		dispatch({
			type: 'REPAIR_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'REPAIR_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewRepair = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'REPAIR_LIST_LOADING',
		});
		await getCSRF().catch((err) => {
			throw err;
		});
		console.log(title, data);

		if (title === 'Add') {
			const response = await instance.post('/rnr/addRepairAndRemodel', {
				...data,
			});
			dispatch({
				type: 'REPAIR_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post('rnr/editRepairAndRemodels', {
				...data,
			});
			dispatch({
				type: 'REPAIR_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		console.log('Error while adding/editing REPAIR');
		dispatch({
			type: 'REPAIR_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while adding, please try again!',
			},
		});
		// console.log(error);
		// dispatch({
		// 	type: 'REPAIR_LIST_FAIL',
		// });
	}
};

export const DeleteRepair = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'REPAIR_LIST_LOADING',
		});
		await getCSRF().catch((err) => {
			throw err;
		});
		console.log(data);
		instance.post('/rnr/deleteRepairAndRemodels', {
			...data,
		});
		dispatch({
			type: 'REPAIR_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		console.log('error while deleting');
		console.log(e);
		dispatch({
			type: 'REPAIR_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		dispatch({
			type: 'REPAIR_LIST_FAIL',
		});
	}
};
