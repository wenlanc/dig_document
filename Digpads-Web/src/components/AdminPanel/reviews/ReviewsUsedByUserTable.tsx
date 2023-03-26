import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IReview } from 'types';

type IProps = {
	reviews: IReview[];
	filter?: string;
	selectedCampaign: string | undefined;
};

export default function ReviewsUsedByUserTable({
	reviews,
	filter = '',
	selectedCampaign,
}: IProps) {
	// filter reviews if text filter is provided
	let _reviews = filter === '' ? reviews : filterReviews(reviews, filter);
	_reviews = filterByCampaign(_reviews, selectedCampaign);

	let data = formatReviews(_reviews);

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={data.rows}
				columns={data.columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
		</div>
	);
}

/**
 * Format reviews for displaying in a table
 * @param {Array} reviews
 * @returns Object with rows and columns
 */
function formatReviews(reviews) {
	const columns = [
		{ field: 'reviewTitle', headerName: 'Review title', width: 300 },
		{ field: 'source', headerName: 'Source', width: 100 },
		{ field: 'reviewerEmail', headerName: 'Reviewer email', width: 150 },
		{ field: 'createdAt', headerName: 'Date Collected', width: 130 },
	];

	return {
		columns: columns,
		rows: reviews.map(formatReview),
	};
}

function formatReview(review) {
	return {
		id: review._id,
		reviewTitle: review.title,
		source: review.source,
		reviewerEmail: review.reviewer?.email,
		createdAt: review.createdAt
			? new Date(review.createdAt).toLocaleDateString()
			: 'unknown',
	};
}

function filterReviews(reviews: IReview[], filter: string): IReview[] {
	const filteredReviews = reviews.filter(
		(review) =>
			review.title?.toLowerCase()?.includes(filter) ||
			review.reviewer?.email?.includes(filter)
	);
	return filteredReviews;
}

function filterByCampaign(reviews: IReview[], campaign: string | undefined) {
	if (!campaign) {
		return reviews;
	}

	return reviews.filter((r) => r.campaign.name === campaign);
}
