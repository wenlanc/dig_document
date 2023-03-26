import React from 'react';
import { Box, Typography } from '@mui/material';

function DateLabel({ label, align }) {
	return (
		<Box width={'100%'} display={'flex'}>
			<Typography
				component={'small'}
				variant={'small'}
				textAlign={align || 'left'}
				sx={{
					textAlign: align || 'left',
					m: align === 'center' ? 'auto' : 0,
					mt: '1px',
					textTransform: 'capitalize',
				}}
				color={'#c4c4c4'}
			>
				{label}
			</Typography>
		</Box>
	);
}

export default DateLabel;
