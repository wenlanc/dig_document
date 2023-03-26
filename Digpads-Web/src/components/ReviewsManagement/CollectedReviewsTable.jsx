import React from 'react';
import { format } from 'date-fns';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// Soft UI Dashboard PRO React example components
import DataTableBodyCell from 'components/DataTable/DataTableBodyCell';

import { StyledTable } from 'components/styled/ReviewsManagement';

export default function CollectedReviewsTable({
	reviews,
	selectedReview,
	onSelectReview,
	filterText,
}) {
	const filteredReviews = reviews.filter(
		(review) =>
			review.campaign?.name?.includes(filterText) ||
			review.content?.includes(filterText)
	);
	return (
		<StyledTable
			style={{ minWidth: 500 }}
			sx={{ mb: 4, display: 'block', maxHeight: '500px', overflowY: 'auto' }}
			aria-label='reviews table'
		>
			<TableHead sx={{ display: 'table-header-group' }}>
				<TableRow>
					<TableCell align='left'>
						Reviewer<br></br>Name
					</TableCell>

					<TableCell align='left'>
						Date<br></br>Left
					</TableCell>

					<TableCell align='left'>
						Star<br></br>Rating
					</TableCell>

					<TableCell align='left'>
						Read<br></br>Review
					</TableCell>

					<TableCell align='left'>Campaign</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{filteredReviews?.map((review, i) => (
					<TableRow
						key={i}
						onClick={() => onSelectReview(review)}
						sx={{
							backgroundColor:
								review === selectedReview ? 'rgb(199 203 245)' : 'transparent',
						}}
					>
						<DataTableBodyCell align='center'>
							{`${review.reviewer.first} ${review.reviewer.last} `}
						</DataTableBodyCell>

						<DataTableBodyCell align='center'>
							{format(new Date(review?.createdAt || new Date()), 'MMM-dd')}
						</DataTableBodyCell>

						<DataTableBodyCell align='center'>
							{review.ratings.overall}
						</DataTableBodyCell>

						<DataTableBodyCell align='center'>
							{review.content}
						</DataTableBodyCell>

						<DataTableBodyCell align='center'>
							{review.campaign.name}
						</DataTableBodyCell>
					</TableRow>
				))}
			</TableBody>
		</StyledTable>
	);
}
