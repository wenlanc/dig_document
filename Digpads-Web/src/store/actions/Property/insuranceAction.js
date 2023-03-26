import { getCSRF, instance } from '../../../controllers/axios';

export const GetInsuranceList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'INSURANCE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.get('/insurance/getInsurances');
		const data = res.data;
		dispatch({
			type: 'INSURANCE_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: 'INSURANCE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
		dispatch({
			type: 'INSURANCE_LIST_FAIL',
		});
	}
};

export const NewInsurance = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'INSURANCE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});

		if (title === 'Add') {
			const response = await instance.post('/insurance/addInsurance', {
				...data,
			});
			dispatch({
				type: 'INSURANCE_NEW_SUCCESS',
				payload: response.data,
			});
			return response.data;
		} else {
			const response = await instance.post('/insurance/editInsurance', {
				...data,
			});
			dispatch({
				type: 'INSURANCE_EDIT_SUCCESS',
				payload: response.data,
			});
			return response.data;
		}
		// const res = await instance.post();
	} catch (error) {
		dispatch({
			type: 'INSURANCE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		console.log('Error while adding/editing INSURANCE');
		console.log(error);
		dispatch({
			type: 'INSURANCE_LIST_FAIL',
		});
	}
};

export const DeleteInsurance = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'INSURANCE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		console.log(data);
		await instance.post('/insurance/deleteInsurance', {
			...data,
		});
		dispatch({
			type: 'INSURANCE_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		dispatch({
			type: 'INSURANCE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred while deleting, please try again!',
			},
		});
		console.log('error while deleting');
		console.log(e);
		dispatch({
			type: 'INSURANCE_LIST_FAIL',
		});
	}
};
