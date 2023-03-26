import React from 'react';
import { formatDistance } from 'date-fns';
import { Box, Stack } from '@mui/material';
import SuiTypography from 'components/SuiTypography';

type ReviewResponseProps = {
	content: string;
	createdAt: Date;
	userName: string;
};

export default function ReviewResponse({
	content,
	createdAt,
	userName,
}: ReviewResponseProps) {
	const timestamp = createdAt ? new Date(createdAt) : new Date();
	const createdDateString = formatDistance(timestamp, Date.now(), {
		addSuffix: true,
	});

	return (
		<>
			<Box p='0.5em 1em 0' sx={{ borderLeft: '2px solid #cfcece', ml: '6em' }}>
				<Stack direction='row' spacing={2} alignItems='center'>
					<SuiTypography sx={{ fontWeight: '700' }}>Response</SuiTypography>
					<SuiTypography
						variant='subtitle2'
						component='span'
						sx={{ color: '#b5b3b3' }}
					>
						{createdDateString}
					</SuiTypography>
				</Stack>
				<SuiTypography paragraph>{content}</SuiTypography>
			</Box>
			<SuiTypography align='right'>{userName}</SuiTypography>
		</>
	);
}
