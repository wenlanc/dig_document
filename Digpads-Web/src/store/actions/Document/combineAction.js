import { getCSRF, instance } from '../../../controllers/axios';

export const PostCombineDocuments = ( data ) => async (dispatch) => {
	try {
		const response = await instance.post('/edocument/combine', {
			data,
		});
	} catch (error) {
		console.log(error);
	}
};
