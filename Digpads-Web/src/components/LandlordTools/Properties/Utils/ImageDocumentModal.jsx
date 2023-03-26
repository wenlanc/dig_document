import React, { Fragment, useState, useEffect } from 'react';
import { Modal, Paper, Typography, Box, Button } from '@mui/material';
import DocumentUploadModal from './DocumentUploadModal';
import { LandlordOutlineButton } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import UploadImages from 'Views/posts/UploadImages';

export default function ImageDocumentModal({
	open,
	handleClose,
	images,
	docs,
	setImages,
	setDocs,
}) {
	return (
		<StyledMUIModal
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			fullWidth
		>
			<ModalPaper>
				<Box
					sx={{
						width: '100%',
					}}
				>
					<Box
						sx={(theme) => ({
							width: '100%',
						})}
					>
						<Typography
							sx={(theme) => ({
								textAlign: 'center',
								fontWeight: 'bold',
								fontSize: 14,
								mb: 1,
								[theme.breakpoints.up('xl')]: {
									fontSize: 16,
								},
							})}
						>
							Attach Document/Image
						</Typography>
						<Box
							sx={(theme) => ({
								width: 500,
							})}
						>
							<UploadImages
								onUpload={(uploads) => {
									let _imagesArray = uploads.filter(
										(u) => u?.fileType === 'image'
									);
									const _docsArray = uploads?.filter(
										(u) => u?.fileType !== 'image'
									);

									const _images = _imagesArray?.map(
										(e) => e?.data.url
									);
									const _docs = _docsArray?.map(
										(e) => e?.data
									);

									setImages((prevImages) =>
										prevImages.concat(_images)
									);
									setDocs((prevDocs) =>
										prevDocs?.concat(_docs)
									);
									console.log('docs', _docs);
								}}
								parent={parent}
								removeImage={(image) =>
									setImages(images.filter((i) => i !== image))
								}
								previewImages={images}
								previewDocs={docs}
								allowAll={true}
							/>
						</Box>
						<Box
							sx={(theme) => ({
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								mt: 1,
							})}
						>
							<LandlordOutlineButton
								variant={'outline'}
								color={'error'}
								onClick={handleClose}
							>
								Close
							</LandlordOutlineButton>
						</Box>
					</Box>
				</Box>
			</ModalPaper>
		</StyledMUIModal>
	);
}
