import React, { useState } from 'react';
import { Box, Typography, Grid, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import UploadImages from '../../../../../Views/posts/UploadImages';
import { modalStyles } from '../../../../styled/Modal';
export default function AttachementModal({
	title = null,
	open,
	onClose,
	thumbnailImages = [],
}) {
	const [previewImages, setPreviewImages] = useState([...thumbnailImages]);

	const useStyles = makeStyles((theme) => ({
		modal: {
			overflowY: 'auto',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				height: 'auto',
			},
		},
	}));
	const classes = useStyles();

	return (
		<Modal open={open}>
			<Box className={classes.modal} sx={modalStyles}>
				<Box display='flex' justifyContent='flex-end'>
					{title && (
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							{title}
						</Typography>
					)}
					<div onClick={() => onClose(previewImages)}>
						<Close style={{ cursor: 'pointer' }} />
					</div>
				</Box>
				<Box sx={{ mt: 2 }}>
					<Grid container spacing={2}>
						<UploadImages
							origin='node'
							onUpload={(uploads) =>
								setPreviewImages((prevImages) =>
									prevImages.concat(uploads)
								)
							}
							previewImages={previewImages}
						/>
					</Grid>
				</Box>
			</Box>
		</Modal>
	);
}
// origin={'node'}
