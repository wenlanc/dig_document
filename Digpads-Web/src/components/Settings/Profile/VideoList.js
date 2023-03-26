import React from 'react';
import Box from '@mui/material/Box';

export default function VideoList({ children, ...props }) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',
				gap: '0.5em',
				mb: '0.5em',
				...(props.sx ? props.sx : {}),
			}}
		>
			{children}
		</Box>
	);
}
