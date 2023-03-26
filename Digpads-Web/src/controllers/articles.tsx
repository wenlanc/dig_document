import { instance, getCSRF } from 'controllers/axios';
import { Comment } from 'types';

export async function updateArticleComment(
	commentId: string,
	update: Partial<Comment>
) {
	try {
		await getCSRF();
		const response = await instance.patch(`comments/${commentId}`, update);

		return response.data;
	} catch (error) {
		return Promise.reject(
			`Error trying to remove comment with id: ${commentId}: ${error}`
		);
	}
}

export async function deleteArticleComment(commentId: string) {
	try {
		await getCSRF();
		const response = await instance.delete(`comments/${commentId}`);

		return response.data;
	} catch (error) {
		return Promise.reject(
			`Error trying to delete comment with id: ${commentId}: ${error}`
		);
	}
}
