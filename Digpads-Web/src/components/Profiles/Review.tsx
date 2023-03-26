import React from 'react';
import { formatDistance } from 'date-fns';
import { Rating, Stack, Box } from '@mui/material';
import ReviewResponse from './ReviewResponse';

import SuiTypography from 'components/SuiTypography';
import SuiBox from 'components/SuiBox';

export default function Review({ starRating, createdAt, content, responses }) {
	const timestamp = createdAt ? new Date(createdAt) : new Date();
	const createdDateString = formatDistance(timestamp, Date.now(), {
		addSuffix: true,
	});

	return (
		<SuiBox shadow='md' p={2}>
			<Stack direction='row' spacing={2} alignItems='center'>
				<SuiTypography sx={{ color: '#faaf00', fontWeight: '700' }}>
					{starRating}
				</SuiTypography>

				<Rating value={starRating} readOnly />

				<SuiTypography
					component='span'
					sx={{ color: '#b5b3b3' }}
					variant='subtitle2'
				>
					{createdDateString}
				</SuiTypography>
			</Stack>

			<SuiTypography paragraph>{content}</SuiTypography>

			{responses?.map((response, i) => (
				<ReviewResponse
					key={i}
					content={response.content}
					createdAt={response.createdAt}
					userName={`${response.author?.first} ${response.author?.last}`}
				/>
			))}
		</SuiBox>
	);
}
