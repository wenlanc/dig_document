import React, { useState } from 'react';
import {
	CircularProgress,
	IconButton,
	Grid,
	ImageList,
	ImageListItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

import UploadVideo from './UploadVideo';
import UploadImages from './UploadImages';
import { VideoList, VideoListItem } from '.';

import SuiTypography from 'components/SuiTypography';

const MAX_NUMBER_OF_IMAGE_UPLOADS = 10;
const MAX_NUMBER_OF_VIDEO_UPLOADS = 3;

export default function Portfolio({
	videos = [],
	onUploadVideos,
	onDeleteVideo,
	images = [],
	onUploadImages,
	onDeleteImage,
}) {
	const onImageChange = (event) => {
		// Limit max number of images user can upload
		const targetLength = event.target.files?.length + images.length;
		if (reachedMaxUploads('images', targetLength)) {
			const msg = `You are allowed to upload a maximum
                         of ${MAX_NUMBER_OF_IMAGE_UPLOADS} images`;
			alert(msg);
		} else {
			onUploadImages(event.target?.files || []);
		}
	};

	const [previewModalOpen, setPreviewModalOpen] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState(null);

	return (
		<>
			<SuiTypography variant='h2' gutterBottom>
				Projects, Photos &amp; Videos
			</SuiTypography>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					{videos.length < MAX_NUMBER_OF_VIDEO_UPLOADS && (
						<UploadVideo onUploadVideos={onUploadVideos} />
					)}

					<VideoList>
						{videos.map((video, i) => (
							<VideoListItem key={i}>
								{video.isUploading ? (
									<CircularProgress
										sx={{ width: '76px', height: '43px' }}
										color='primary'
									/>
								) : (
									<video
										src={typeof video === 'object' ? video.src : video}
										onClick={() => {
											setSelectedVideo(i);
											setPreviewModalOpen(true);
										}}
									>
										Sorry, your browser doesn't support embedded videos
									</video>
								)}
							</VideoListItem>
						))}
					</VideoList>
				</Grid>

				<Grid item xs={12} sm={6}>
					{images?.length < MAX_NUMBER_OF_IMAGE_UPLOADS && (
						<UploadImages onUploadImage={onImageChange} />
					)}

					<ImageList cols={4} sx={{ m: 0, overflow: 'visible' }}>
						{images.map((image, i) => (
							<ImageListItem
								key={i}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									'& .delete-item': {
										display: 'none',
									},
									'&:hover .delete-item': {
										display: 'block',
									},
								}}
							>
								{image.isUploading ? (
									<CircularProgress
										sx={{ width: '76px', height: '43px' }}
										color='primary'
									/>
								) : (
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<IconButton
											className='delete-item'
											sx={{
												position: 'absolute',
												color: '#fff',
											}}
											onClick={() => onDeleteImage(i)}
										>
											<DeleteIcon />
										</IconButton>
										<img
											src={`${typeof image === 'object' ? image.src : image}`}
											alt='portfolio image'
											loading='lazy'
										/>
									</Box>
								)}
							</ImageListItem>
						))}
					</ImageList>
				</Grid>
			</Grid>
			<Modal open={previewModalOpen} onClose={() => setPreviewModalOpen(false)}>
				<Box
					sx={{
						width: '80%',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						margin: '0 auto',
						backgroundColor: 'black',
						padding: '1em',
						video: {
							maxWidth: '100%',
						},
					}}
				>
					<video
						src={
							typeof videos[selectedVideo] === 'object'
								? videos[selectedVideo].src
								: videos[selectedVideo]
						}
						controls
					>
						Sorry, your browser doesn't support embedded videos
					</video>

					<IconButton
						className='delete-item'
						title='delete video'
						sx={{
							color: '#fff',
							display: 'block',
							margin: '0 auto',
						}}
						onClick={() => {
							onDeleteVideo(selectedVideo);
							setPreviewModalOpen(false);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Modal>
		</>
	);
}

const reachedMaxUploads = (type, length) => {
	if (type === 'images') {
		return length > MAX_NUMBER_OF_IMAGE_UPLOADS;
	} else if (type === 'videos') {
		return length > MAX_NUMBER_OF_VIDEO_UPLOADS;
	}
};
