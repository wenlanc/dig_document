import React from 'react';
import { Box, Typography } from '@mui/material';
import ChallengedReviewsTable from './ChallengedReviewsTable';

import SearchBar from 'components/ReviewsManagement/UseReviews/SearchBar';

import {
	StyledLabel,
	UnderlinedReviewDetails,
} from 'components/styled/ReviewsManagement';

export default function ChallengedReviews({ reviews }) {
	const challengedReviews = reviews?.filter(
		(review) => typeof review?.challenge !== undefined || false
	);
	const [filterText, setFilterText] = React.useState('');

	const handleFilterTextChange = (filterText) => {
		setFilterText(filterText);
	};

	return (
		<div>
			<StyledLabel underlined={true}>Challenged Reviews</StyledLabel>

			<SearchBar
				filterText={filterText}
				onFilterTextChange={handleFilterTextChange}
			/>

			<Box position='relative' sx={{ overflowX: 'scroll' }}>
				<Box
					component={Typography}
					variant='caption'
					style={{
						fontWeight: '800',
						position: 'absolute',
						top: '-28px',
						right: '103px',
						fontSize: '12px',
					}}
				>
					<UnderlinedReviewDetails>
						Review Challenge Detailed
					</UnderlinedReviewDetails>
				</Box>

				<ChallengedReviewsTable
					reviews={challengedReviews}
					filterText={filterText}
				/>
			</Box>
		</div>
	);
}
