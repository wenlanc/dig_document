import { getCSRF, instance } from '../../../controllers/axios';

export const GetTaxList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'TAX_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.get('/tax/getTaxes');
		const data = res?.data;
		dispatch({
			type: 'TAX_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: 'TAX_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewTax = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'TAX_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		console.log(title, data);

		if (title === 'Add') {
			const response = await instance.post('/tax/addTax', {
				...data,
			});
			dispatch({
				type: 'TAX_NEW_SUCCESS',
				payload: response.data,
			});
		} else {
			const response = await instance.post('/tax/editTax', {
				...data,
			});
			dispatch({
				type: 'TAX_EDIT_SUCCESS',
				payload: response.data,
			});
		}
		// const res = await instance.post();
	} catch (error) {
		console.log('Error while adding/editing TAX');
		console.log(error);
		dispatch({
			type: 'TAX_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const DeleteTax = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'TAX_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		console.log(data);
		instance.post('/tax/deleteTax', {
			...data,
		});
		dispatch({
			type: 'TAX_DELETE_SUCCESS',
			payload: { id: data._id },
		});
	} catch (e) {
		console.log('error while deleting');
		dispatch({
			type: 'TAX_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred while deleting, please try again!',
			},
		});
	}
};
