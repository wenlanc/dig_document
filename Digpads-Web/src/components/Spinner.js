import React from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';

export default function ProgressBar(props) {
	if (props.type === 'circular') {
		return (
			<CircularProgress
				size={props.size}
				color={props.color}
				{...props}
			/>
		);
	} else {
		// linear
		return <LinearProgress color={props.color} {...props} />;
	}
}
