import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReviews } from 'controllers/reviews';
import { IReview, ReviewOption } from 'types';

const reviewsSlice = createSlice({
	name: 'reviews',
	initialState: {
		reviews: [],
		status: 'idle',
		error: null,
	},
	reducers: {
		toggledReviewSelected: (state, action) => {
			const reviewId = action.payload;
			const review = state.reviews.find((r) => r._id == reviewId);

			if (review) {
				review.isSelected = !review.isSelected;
			} else {
				throw 'Review not found';
			}
		},
		reviewsOptionSelected: (state, action) => {
			const option: ReviewOption = action.payload;

			switch (option) {
				case ReviewOption.allReviews:
					state.reviews.forEach((review) => {
						review.isSelected = true;
					});
					break;
				case ReviewOption.selectReviews:
					// deselect reviews so that user can select the ones they want
					state.reviews.forEach((review) => {
						review.isSelected = false;
					});
					break;
			}
		},
		selectAllReviewsClicked: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReviews.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchReviews.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const reviews = action.payload;

				// all reviews are selected by default
				reviews.forEach((review) => {
					review.isSelected = true;
				});

				state.reviews = reviews;
			})
			.addCase(fetchReviews.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const fetchReviews = createAsyncThunk(
	'reviews/fetchReviews',
	async (user: string) => {
		return getReviews(user);
	}
);

// Selectors
export const selectReviews = (state): IReview[] => state.reviews.reviews;

export const { reviewsOptionSelected, toggledReviewSelected } =
	reviewsSlice.actions;
export default reviewsSlice.reducer;
