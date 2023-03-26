import React from 'react';
import Box from '@mui/material/Box';

export default function VideoListItem(props) {
	return (
		<Box
			className='videoList-item'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				cursor: 'pointer',
				'& video': {
					maxWidth: '100%',
					width: '100%',
					height: '100%',
					display: 'flex',
				},
				...(props.sx ? props.sx : {}),
			}}
		>
			{props.children}
		</Box>
	);
}
