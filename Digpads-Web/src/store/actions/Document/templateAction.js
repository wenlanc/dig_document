import { getCSRF, instance } from '../../../controllers/axios';

export const SaveAsTemplate = ( data ) => async (dispatch) => {
	try {
		
		const response = await instance.post('/template/saveRequest', {
			...data,
		});

	} catch (error) {
		console.log(error);
	}
};
