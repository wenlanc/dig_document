import { getCSRF, instance } from '../../../controllers/axios';

export const GetMaintenanceList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'MAINTENANCE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.get('/maintenance/getMaintenances');
		const data = res.data;
		dispatch({
			type: 'MAINTENANCE_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: 'MAINTENANCE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewMaintenance = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'MAINTENANCE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		console.log(title, data);

		if (title === 'Add') {
			const response = await instance.post('maintenance/addMaintenance', {
				...data,
			});
			dispatch({
				type: 'MAINTENANCE_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post(
				'maintenance/editMaintenance',
				{
					...data,
				}
			);
			dispatch({
				type: 'MAINTENANCE_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		console.log('Error while adding/editing MAINTENANCE');
		dispatch({
			type: 'MAINTENANCE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const DeleteMaintenance = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'MAINTENANCE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		console.log(data);
		instance.post('maintenance/deleteMaintenance', {
			...data,
		});
		dispatch({
			type: 'MAINTENANCE_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		console.log('error while deleting');
		dispatch({
			type: 'MAINTENANCE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred while deleting, please try again!',
			},
		});
	}
};
