import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	TextareaAutosize,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Paper,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import UploadImages from '../../../../Views/posts/UploadImages';
import { modalBoxStyles } from 'components/styled/Modal';

const PREFIX = 'AttachementModal';

const classes = {
	modal: `${PREFIX}-modal`,
};

const StyledModal = styled(Modal)(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			height: 'auto',
		},
	},
}));

export default function AttachementModal({
	open,
	onClose,
	insuranceName,
	thumbnailImages = [],
}) {
	const [previewImages, setPreviewImages] = useState([]);
	const styles = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: 800,
		width: '100%',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		overflowY: 'auto',
		height: '100%',
	};
	useEffect(() => {
		console.log('thumbnails => ', thumbnailImages);
		setPreviewImages(thumbnailImages);
	}, [open]);

	return (
		<Modal open={open} onClose={() => onClose(previewImages)}>
			<Box sx={modalBoxStyles}>
				<Paper sx={{ p: 4 }}>
					<Box display='flex' justifyContent='space-between'>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							Insurance Images for {insuranceName}
						</Typography>
						<div onClick={() => onClose(previewImages)}>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>
					<Box sx={{ mt: 2 }}>
						<Grid spacing={2}>
							<UploadImages
								key={open}
								origin='node'
								onUpload={
									(uploads) => {
										console.log('uploads got', uploads);
										setPreviewImages([
											...previewImages,
											...uploads,
										]);
									}
									// (uploads) =>
									// setPreviewImages((prevImages) =>
									// 	prevImages.concat(uploads)
									// )
								}
								removeImage={(image) =>
									setPreviewImages(
										previewImages.filter((i) => i !== image)
									)
								}
								previewImages={previewImages}
							/>
						</Grid>
					</Box>
				</Paper>
			</Box>
		</Modal>
	);
}
// origin={'node'}
