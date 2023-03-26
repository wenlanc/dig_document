import React from 'react';
import { useLocation } from 'react-router-dom';

import ReviewFormEmbed from '../ReviewFormEmbed';
import {
	fetchReviewsDisplayForm,
	getOverallStarRating,
} from 'controllers/reviews';

export default function ReviewsDisplayForm() {
	const search = useLocation().search;
	const searchParams = new URLSearchParams(search);
	const userId = searchParams.get('user');
	const campaignId = searchParams.get('campaign');
	const [overallStarRating, setOverallStarRating] = React.useState(0);

	const [reviewFormEmbedProps, setReviewFormEmbedProps] = React.useState(null);

	React.useEffect(() => {
		fetchReviewsDisplayForm(userId).then((data) => {
			setReviewFormEmbedProps(data);
		});

		getOverallStarRating(userId).then((starRating) => {
			setOverallStarRating(starRating);
		});
	}, []);

	return (
		<div
			style={{
				margin: '0 auto',
				width: reviewFormEmbedProps?.styles?.width + 'px',
			}}
		>
			<ReviewFormEmbed
				{...reviewFormEmbedProps}
				overallRating={overallStarRating}
			/>
		</div>
	);
}
