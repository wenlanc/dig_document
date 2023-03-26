import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'controllers/axios';

const initialState = [];

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchCommentsByUser.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const fetchCommentsByUser = createAsyncThunk(
	'comments/fetchCommentsByUser',
	async (userId: string) => {
		const response = await instance.get(`/users/${userId}/comments`);
		return response.data;
	}
);

export const selectAllComments = (state) => state.comments;
export const selectCommentsByUser = (state, userId) =>
	state.comments.filter((comment) => comment.author === userId);

export default commentsSlice.reducer;
