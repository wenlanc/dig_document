import React, { useRef } from 'react';
import { TextField } from '@mui/material';

export default function ForumSearch({ onSubmit }) {
	const textFieldRef = useRef(null);
	const timeoutRef = useRef(null);

	function handleChange(evt) {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => onSubmit(evt.target.value), 500);
	}

	return (
		<TextField
			label='Search'
			variant='outlined'
			inputRef={textFieldRef}
			onChange={handleChange}
			style={{
				width: '100%',
			}}
		/>
	);
}
