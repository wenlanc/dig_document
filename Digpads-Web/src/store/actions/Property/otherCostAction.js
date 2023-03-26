import { getCSRF, instance } from '../../../controllers/axios';

export const GetOtherCostList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'OTHER_COST_LIST_LOADING',
		});
		await getCSRF().catch((err) => {
			throw err;
		});
		const res = await instance.get('/otherCosts/getCosts');
		const data = res.data;
		dispatch({
			type: 'OTHER_COST_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: 'OTHER_COST_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
		dispatch({
			type: 'OTHER_COST_LIST_FAIL',
		});
	}
};

export const NewOtherCost = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'OTHER_COST_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		if (title === 'Add') {
			const response = await instance.post('/otherCosts/addCost', {
				...data,
			});
			dispatch({
				type: 'OTHER_COST_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post('/otherCosts/editCost', {
				...data,
			});
			dispatch({
				type: 'OTHER_COST_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		console.log('Error while adding/editing OTHER_COST');
		dispatch({
			type: 'OTHER_COST_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occrred, please try again!',
			},
		});
		console.log(error);
		dispatch({
			type: 'OTHER_COST_LIST_FAIL',
		});
	}
};
export const DeleteOtherCost = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'OTHER_COST_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		instance.post('utilities/deleteUtility', {
			...data,
		});
		dispatch({
			type: 'OTHER_COST_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		console.log('error while deleting');
		dispatch({
			type: 'OTHER_COST_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred while deleting, please try again!',
			},
		});
		console.log(e);
		dispatch({
			type: 'OTHER_COST_LIST_FAIL',
		});
	}
};
