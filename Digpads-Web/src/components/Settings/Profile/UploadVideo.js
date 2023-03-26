import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function UploadVideo({ onUploadVideos }) {
	function readVideo(event) {
		if (event.target.files?.length) {
			onUploadVideos(event.target.files);
		}
	}

	return (
		<Box
			component='label'
			htmlFor='portfolio-video-input'
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
			Upload Videos
			<input
				id='portfolio-video-input'
				onChange={readVideo}
				type='file'
				multiple
				accept='video/*'
			/>
		</Box>
	);
}

UploadVideo.propTypes = {
	onUploadVideos: PropTypes.func,
};
