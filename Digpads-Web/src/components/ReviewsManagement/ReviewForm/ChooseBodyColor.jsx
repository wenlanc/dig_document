import React from 'react';
import { StyledButton } from '../../styled/ReviewsManagement';
import { Box } from '@mui/material';

export default function ChooseBodyColor({ bodyColor, onChange }) {
	return (
		<Box sx={{ position: 'relative' }}>
			<StyledButton
				component='label'
				sx={{
					display: 'block',
					'&:hover': { backgroundColor: '#1423a5' },
				}}
				color='blue'
				squared={true}
			>
				Choose Body Color
				<Box
					component='input'
					value={bodyColor}
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
