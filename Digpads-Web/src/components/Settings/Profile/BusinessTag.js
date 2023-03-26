import React from 'react';
import Chip from '@mui/material/Chip';

export default function BusinessTag({ name, onDelete }) {
	return (
		<Chip
			label={name}
			onDelete={onDelete}
			sx={{
				borderRadius: '100px !important',
				borderLeft: '1px solid rgba(0, 0, 0, 0.12) !important',
				fontSize: '13px !important',
				padding: '7px',
			}}
		/>
	);
}
