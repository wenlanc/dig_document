import { getCSRF, instance } from '../../../controllers/axios';

export const AppendField = ( data ) => async (dispatch) => {
	try {
		dispatch({
			type: 'APPEND_FIELD',
			...data
		});
	} catch (error) {
		console.log(error);
	}
};
