import React from 'react';
import { StyledButton } from '../../styled/ReviewsManagement';
import { Box } from '@mui/material';

export default function ChooseHeight({ height, onChange }) {
	return (
		<Box sx={{ position: 'relative' }}>
			<StyledButton
				component='label'
				sx={{
					display: 'flex',
					alignItems: 'center',
					'&:hover': { backgroundColor: '#89038d' },
				}}
				color='pink'
				squared={true}
			>
				Choose Height
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
					value={height}
					onChange={(evt) => onChange(evt.target.value)}
					type='number'
					min='0'
					max='2000'
					placeholder='height'
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
