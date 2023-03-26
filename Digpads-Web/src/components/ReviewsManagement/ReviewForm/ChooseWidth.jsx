import React from 'react';
import { StyledButton } from '../../styled/ReviewsManagement';
import { Box } from '@mui/material';

export default function ChooseWidth({ width, onChange }) {
	return (
		<Box sx={{ position: 'relative' }}>
			<StyledButton
				component='label'
				sx={{
					display: 'flex',
					alignItems: 'center',
					'&:hover': { backgroundColor: '#007272' },
				}}
				color='cyan'
				squared={true}
			>
				Choose Width
				<Box
					component='input'
					type='checkbox'
					sx={{
						position: 'absolute',
						visibility: 'hidden',
						left: '0',
						top: '0',
						'&:checked + input': {
							visibility: 'visible',
						},
					}}
				/>
				<Box
					component='input'
					value={width}
					onChange={(evt) => onChange(evt.target.value)}
					type='number'
					min='0'
					max='2000'
					placeholder='width'
					sx={{
						position: 'absolute',
						visibility: 'hidden',
						left: '0',
						top: '0',
					}}
				/>
			</StyledButton>
		</Box>
	);
}
