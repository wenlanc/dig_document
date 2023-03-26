import { instance, getCSRF } from 'controllers/axios';
import { Post } from 'types';

export async function updatePost(postId: string, update: Partial<Post>) {
	try {
		await getCSRF();
		const response = await instance.patch(`posts/${postId}`, update);

		return response.data;
	} catch (error) {
		return Promise.reject(
			`Error trying to update post with id: ${postId}: ${error}`
		);
	}
}

export async function updatePostComment(postId: string, update: Partial<Post>) {
	try {
		await getCSRF();
		const response = await instance.patch(`postComments/${postId}`, update);

		return response.data;
	} catch (error) {
		return Promise.reject(
			`Error trying to update post with id: ${postId}: ${error}`
		);
	}
}

export async function deletePostComment(commentId: string) {
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

export async function deletePost(postId: string) {
	try {
		await getCSRF();
		const response = await instance.delete(`posts/${postId}`);

		return response.data;
	} catch (error) {
		return Promise.reject(
			`Error trying to delete post with id: ${postId}: ${error}`
		);
	}
}
