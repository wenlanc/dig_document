import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'controllers/axios';
import { Post } from 'types';

const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostsByUser.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPostsByUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.posts = state.posts.concat(action.payload);
			})
			.addCase(fetchPostsByUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const fetchPostsByUser = createAsyncThunk(
	'posts/fetchPostsByUser',
	async (userId: string) => {
		const response = await instance.get(`/users/${userId}/posts`);
		return response.data;
	}
);

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectPostsByUser = (userId, state): Post[] =>
	state.posts.posts.filter((post) => post.author === userId);

// export const {} = postsSlice.actions;
export default postsSlice.reducer;
