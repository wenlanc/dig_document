import React from 'react';
import { Box, Typography } from '@mui/material';

import { ReviewDetailsContet } from '../styled/ReviewsManagement';

export default function ReviewDetails(props) {
	const {
		reviewerInteractionDate = 'Nov 15 2020',
		reviewerName = 'Carl',
		reviewerDesiresResolution = 'Yes',
		reviewerContactPreferences = 'Phone',
	} = props.details;

	return (
		<Box display='grid' gap='0.8em' className='review-details'>
			<Box display='flex' justifyContent='space-between' width='90%'>
				<Typography variant='caption' style={{ fontWeight: 'bold' }}>
					Reviewer Interaction Date:
				</Typography>

				<ReviewDetailsContet>
					{reviewerInteractionDate}
				</ReviewDetailsContet>
			</Box>

			<Box display='flex' justifyContent='space-between' width='90%'>
				<Typography variant='caption' style={{ fontWeight: 'bold' }}>
					Reviewer Name:
				</Typography>

				<ReviewDetailsContet>{reviewerName}</ReviewDetailsContet>
			</Box>

			<Box display='flex' justifyContent='space-between' width='90%'>
				<Typography variant='caption' style={{ fontWeight: 'bold' }}>
					Reviewer Desires Resolution?:
				</Typography>

				<ReviewDetailsContet>
					{reviewerDesiresResolution}
				</ReviewDetailsContet>
			</Box>

			<Box display='flex' justifyContent='space-between' width='90%'>
				<Typography variant='caption' style={{ fontWeight: 'bold' }}>
					Reviewer Contact Preferences:
				</Typography>

				<ReviewDetailsContet>
					{reviewerContactPreferences}
				</ReviewDetailsContet>
			</Box>
		</Box>
	);
}
