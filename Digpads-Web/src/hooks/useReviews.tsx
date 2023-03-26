import React from 'react';
import { useAppSelector, useAppDispatch } from 'hooks';

import { useAuth } from 'contexts/AuthContext';
import {
	fetchReviews as getReviews,
	selectReviews,
	reviewsOptionSelected,
} from 'components/ReviewsManagement/reviewsSlice';

import { IReview, ReviewOption } from 'types';

export default function useReviews() {
	const { auth } = useAuth();
	const dispatch = useAppDispatch();
	const reviews: IReview[] = useAppSelector(selectReviews);

	const fetchReviews = (userId?: string) => {
		let id;

		if (userId) {
			id = userId;
		} else {
			id = auth.data?._id;
		}

		dispatch(getReviews(id));
	};

	/**
	 *
	 * @returns total overall star rating for all reviews
	 */
	const getOverallStarRating = () => {
		if (reviews.length > 0) {
			const overallRatings = reviews.map((r) => r.ratings.overall);
			const overallTotalRating =
				overallRatings.reduce((acc, rating) => acc + rating) / reviews.length;

			return overallTotalRating;
		} else {
			return 0;
		}
	};

	const setReviewsOption = (option: ReviewOption) => {
		dispatch(reviewsOptionSelected(option));
	};

	return { fetchReviews, reviews, getOverallStarRating, setReviewsOption };
}
