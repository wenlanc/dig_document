import React from 'react';
import { StyledButton } from '../../styled/ReviewsManagement';
import { Box } from '@mui/material';

export default function ChooseBorderColor({ borderColor, onChange }) {
	return (
		<Box sx={{ position: 'relative' }}>
			<StyledButton
				component='label'
				sx={{
					display: 'block',
					'&:hover': { backgroundColor: '#877a03' },
				}}
				color='yellow'
				squared={true}
			>
				Choose Border Color
				<Box
					component='input'
					value={borderColor}
					onChange={(evt) => onChange(evt.target.value)}
					type='color'
					sx={{
						position: 'absolute',
						left: '0',
						top: '0',
						zIndex: '-1',
					}}
				/>
			</StyledButton>
		</Box>
	);
}
