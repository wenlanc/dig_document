import { instance } from './axios';

const getCommentReplies = async (commentId) => {
	try {
		let res = await instance.get(`getCommentReply`, {
			params: { commentID: commentId },
		});

		if (res.status === 200) {
			const commentReply = res.data.data;

			return commentReply;
		}
	} catch (e) {
		console.log(e.response);
	}
};

export { getCommentReplies };
