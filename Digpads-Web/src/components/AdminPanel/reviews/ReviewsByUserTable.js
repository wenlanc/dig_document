import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

export default function ReviewsByUserTable({
	reviews,
	filter = '',
	onSelectReview,
}) {
	// filter reviews if filter is provided
	const _reviews = filter === '' ? reviews : filterReviews(reviews, filter);
	let data = formatReviews(_reviews);

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				onRowClick={(params) => {
					onSelectReview(params.row.id);
				}}
				rows={data.rows}
				columns={data.columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
		</div>
	);
}

/**
 * Filter reviews by review title
 * @param {*} reviews reviews to filter
 * @param {*} filter filter text
 * @returns filtered reviews
 */
function filterReviews(reviews, filter) {
	const filteredReviews = reviews.filter((review) =>
		review.title?.toLowerCase()?.includes(filter)
	);
	return filteredReviews;
}

/**
 * Format reviews for displaying in a table
 * @param {Array} reviews
 * @returns Object with rows and columns
 */
function formatReviews(reviews) {
	const columns = [
		{ field: 'reviewTitle', headerName: 'Review title', width: 310 },
		{ field: 'source', headerName: 'Source', width: 100 },
		{ field: 'reviewerEmail', headerName: 'Reviewer email', width: 140 },
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
