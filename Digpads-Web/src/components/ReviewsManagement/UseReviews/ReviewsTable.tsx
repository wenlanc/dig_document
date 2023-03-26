import React from 'react';
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { StyledTable } from 'components/styled/ReviewsManagement';
import { IReview } from 'types';

type ReviewsTableProps = {
	reviews: IReview[];
	filterText: string;
	onSelectReview: (review: IReview, selected: boolean) => void;
	starRatingFilter: Array<number>;
	dateRangeFilter: {
		exactDate: Date | null;
		startDate: Date | null;
		endDate: Date | null;
	};
};

export default function ReviewsTable({
	reviews,
	filterText,
	onSelectReview,
	starRatingFilter,
	dateRangeFilter,
}: ReviewsTableProps) {
	const between = (review: IReview) => {
		const rating = review.ratings.overall;
		const floor = Math.floor(rating);

		if (starRatingFilter.includes(floor)) {
			return true;
		} else {
			return false;
		}
	};

	let filteredReviews = reviews.filter(
		(review) => review.title.includes(filterText) && between(review)
	);

	// filter reviews based on exact date or date range
	if (dateRangeFilter.exactDate) {
		const exactDate = dateRangeFilter.exactDate;
		filteredReviews = filteredReviews.filter((r) => {
			const createdAtDate = new Date(r.createdAt);
			return createdAtDate.getTime() === exactDate.getTime();
		});
	} else {
		const { startDate, endDate } = dateRangeFilter;
		filteredReviews = filteredReviews.filter((r) => {
			const createdAtDate = new Date(r.createdAt);
			return isBetweenDates(startDate, endDate, createdAtDate);
		});
	}

	return (
		<StyledTable style={{ minWidth: 500 }} aria-label='reviews table'>
			<TableHead sx={{ display: 'table-header-group' }}>
				<TableRow>
					<TableCell align='center'>Reviewer Name</TableCell>
					<TableCell align='center'>Date Left</TableCell>
					<TableCell align='center'>Star Rating</TableCell>
					<TableCell align='center'>Read Review</TableCell>
					<TableCell align='center'>Campaign</TableCell>
					<TableCell align='center'>Include</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{filteredReviews.map((review) => (
					<TableRow
						key={review._id}
						sx={{
							'&:last-child td, &:last-child th': {
								border: 0,
							},
						}}
					>
						<TableCell component='th' scope='row'>
							{`${review.reviewer.first} ${review.reviewer.last}`}
						</TableCell>

						<TableCell align='right'>
							{format(new Date(review.createdAt), 'MMM-dd')}
						</TableCell>

						<TableCell align='right'>{review.ratings.overall}</TableCell>

						<TableCell align='right'>{review.content}</TableCell>

						<TableCell align='right'>{review.campaign.name}</TableCell>

						<TableCell align='right'>
							<Checkbox
								checked={review.isSelected}
								onChange={(evt) => onSelectReview(review, evt.target.checked)}
								value={review}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</StyledTable>
	);
}

function isBetweenDates(dateStart, dateEnd, date) {
	return date > dateStart && date < dateEnd;
}
