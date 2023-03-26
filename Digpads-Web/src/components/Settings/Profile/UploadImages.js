import React from 'react';
import Box from '@mui/material/Box';

export default function UploadImages({ onUploadImage }) {
	return (
		<Box
			component='label'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				border: '1px solid black',
				fontSize: '24px',
				mb: '0.5em',
				cursor: 'pointer',
				'& input[type="file"]': { display: 'none' },
			}}
		>
			<span>Upload Images</span>

			<Box
				display='none'
				component='input'
				onChange={onUploadImage}
				id='portfolio-image-input'
				type='file'
				multiple
				accept='image/*'
			/>
		</Box>
	);
}
