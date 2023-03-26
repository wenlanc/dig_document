import { instance } from '../controllers/axios';

async function getFeedPosts() {
	try {
		let res = await instance.get(`/getFeedPosts`);
		return res.data.data;
	} catch (e) {
		if (!e.response) {
			return {
				error: {
					name: 'Internal Server Error',
					message: 'Please try again later',
				},
			};
		} else {
			return { error: e.response.data };
		}
	}
}
async function DeletePost(postId) {
	try {
		let res = await instance.patch(`/deletePost/${postId}`);
		return res.data.data;
	} catch (e) {
		if (!e.response) {
			return {
				error: {
					name: 'Internal Server Error',
					message: 'Please try again later',
				},
			};
		} else {
			return { error: e.response.data };
		}
	}
}

async function getMostRecentArticles() {
	try {
		let res = await instance.get(`/mostRecentArticles`);

		return res.data.data;
	} catch (e) {
		if (!e.response) {
			return {
				error: {
					name: 'Internal Server Error',
					message: 'Please try again later',
				},
			};
		} else {
			return { error: e.response.data };
		}
	}
}
export { getFeedPosts, getMostRecentArticles, DeletePost };
