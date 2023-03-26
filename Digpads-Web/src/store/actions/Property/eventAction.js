import { getCSRF, instance } from '../../../controllers/axios';

export const GetEventList = () => async (dispatch) => {
	try {
		dispatch({
			type: 'EVENT_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.get('/events/getAllEvents');
		const { data } = res.data;
		dispatch({
			type: 'EVENT_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: 'EVENT_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
		dispatch({
			type: 'EVENT_LIST_FAIL',
		});
	}
};

export const ConvertToRecorded = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'EVENT_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});

		// if (title === 'Add') {
		const response = await instance.post('/events/convertToRecorded', {
			...data,
		});
		dispatch({
			type: 'EVENT_CHANGED_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: 'EVENT_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		console.log('Error while adding/editing EVENT');
		console.log(error);
		dispatch({
			type: 'EVENT_LIST_FAIL',
		});
	}
};
export const ArchiveEvent = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'EVENT_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		// if (title === 'Add') {
		const response = await instance.post('/events/archiveEvent', {
			...data,
		});
		dispatch({
			type: 'EVENT_CHANGED_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: 'EVENT_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		console.log('Error while adding/editing EVENT');
		console.log(error);
		dispatch({
			type: 'EVENT_LIST_FAIL',
		});
	}
};

export const NewEvent = (title, data) => async (dispatch) => {
	try {
		dispatch({
			type: 'EVENT_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});

		// if (title === 'Add') {
		const response = await instance.post('/events/recordEvent', {
			...data,
		});
		dispatch({
			type: 'EVENT_NEW_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: 'EVENT_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		console.log('Error while adding/editing EVENT');
		console.log(error);
		dispatch({
			type: 'EVENT_LIST_FAIL',
		});
	}
};
export const NewCondtionChangeEvent = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'EVENT_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});

		// if (title === 'Add') {
		const response = await instance.post(
			'/events/recordConditionChangeEvent',
			{
				...data,
			}
		);
		dispatch({
			type: 'EVENT_NEW_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: 'EVENT_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
		console.log('Error while adding/editing EVENT');
		console.log(error);
		dispatch({
			type: 'EVENT_LIST_FAIL',
		});
	}
};
