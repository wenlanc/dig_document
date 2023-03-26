import { getCSRF, instance } from '../../../controllers/axios';

export const GetAllFixtures = () => async (dispatch) => {
	try {
		dispatch({
			type: 'FIXUTE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const res = await instance.post('fixture/getAllFixtures');
		const data = res.data;
		dispatch({
			type: 'ALL_FIXTURE_LIST_SUCCESS',
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: 'FIXTURE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error while loading, please try again!',
			},
		});
	}
};

export const NewFixture = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'FIXTURE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const response = await instance.post('/fixture/addFixture', data);

		dispatch({
			type: 'NEW_FIXTURE_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		console.log('Error while adding fixture');
		dispatch({
			type: 'FIXTURE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const EditFixture = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'FIXTURE_LIST_LOADING',
		});

		await getCSRF().catch((e) => {
			throw e;
		});

		const response = await instance.post('/fixture/editFixture', data);
		dispatch({
			type: 'FIXTURE_EDIT_SUCCESS',
			payload: response.data,
		});
	} catch (error) {
		console.log('Error while editing fixture');
		dispatch({
			type: 'FIXTURE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};

export const DeleteFixture = (data) => async (dispatch) => {
	try {
		dispatch({
			type: 'FIXTURE_LIST_LOADING',
		});
		await getCSRF().catch((e) => {
			throw e;
		});
		const response = await instance.post('/fixture/deleteFixture', data);
		dispatch({
			type: 'FIXTURE_DELETE_SUCCESS',
			payload: { _id: response?.data?._id },
		});
	} catch (error) {
		console.log('Error while deleting fixture');
		console.log(error);
		dispatch({
			type: 'FIXTURE_RESPONSE_MESSAGE',
			payload: {
				status: true,
				variant: 'error',
				message: 'Error occurred, please try again!',
			},
		});
	}
};
