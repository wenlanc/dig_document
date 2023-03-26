import React from 'react';
import { Stack, Box } from '@mui/material';
import SuiTypography from 'components/SuiTypography';

export default function AvailabilityLevel({
	availability,
}: {
	availability: string;
}) {
	return (
		<Stack spacing={3} direction='row' alignItems='flex-end'>
			<SuiTypography color='secondary'>
				Level of Availability:{' '}
				<Box component='span' sx={{ fontWeight: '700', color: '#7c7878' }}>
					{availability}
				</Box>
			</SuiTypography>
		</Stack>
	);
}
