import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Icon } from '@mui/material';
// import {
// 	getCloudinarySignature,
// 	instance,
// 	getCSRF,
// } from '../../controllers/axios';
// import { upload } from '../../controllers/cloudinary';
import Spinner from 'components/Spinner';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { instance, getCloudinarySignature } from 'controllers/axios';
import { upload } from 'controllers/cloudinary';
import { generatePDF } from 'controllers/pdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SuiBadge from 'components/SuiBadge';

// const ImagePreview = styled.div`
// 	display: grid;
// 	gap: 0.5em;
// 	grid-template-columns: 1fr 1fr 1fr;

// 	img {
// 		width: 115px;
// 		height: 110px;
// 		object-fit: cover;
// 	}
// `;

export default function UploadImages({
	onUpload,
	previewImages,
	previewDocs,
	parentId,
	parentLocation,
	isDisabled = false,
	origin = 'cloudinary',
	removeImage,
	onClose,
	allowAll = false,
}) {
	const [loading, setLoading] = useState(false);
	// const [previewImages, setPreviewImages] = useState([
	// 	'https://i.ibb.co/k6jKSzQ/1651807283483priscilla-du-preez-M1-G2l-Ww9j3-U-unsplash-jpg29sgi.jpg',
	// 	'https://i.ibb.co/ZhYGRN5/1651807283485priscilla-du-preez-K8-XYGbw4-Ahg-unsplash-jpgqrxh3.jpg',
	// ]);
	const [currentMedia, setCurrentMedia] = useState(0);

	useEffect(async () => {
		setCurrentMedia(previewImages[0]);
	}, [previewImages]);

	async function onUploadImages(e) {
		setLoading(true);
		const files = Array.from(e.target.files);
		Promise.all(
			files.map(async (file) => {
				console.log('mime type', file.type);

				let fileType = file.type?.includes('image') ? 'image' : 'document';

				if (fileType === 'image') {
					// TODO: Move to env variables
					const imgbbKey = '02cdd87bbafc774c86073d5592ebf40b';
					let body = new FormData();
					body.set('key', imgbbKey);
					body.append('image', file);
					// body.append(
					// 	'name',
					// 	Date.now() +
					// 		file.name +
					// 		(Math.random() + 1).toString(36).substring(7)
					// );
					// New Instance as ImgBB doesn't allow authorization header
					const instance = axios.create({
						baseURL: process.env.REACT_APP_API_URL,
					});
					const response = await instance.post(
						`http://api.imgbb.com/1/upload`,
						body
						// {
						// 	headers: {
						// 		'Access-Control-Allow-Origin':
						// 			'http://localhost:3000',
						// 	},
						// }
					);
					return { fileType, data: { url: response.data.data.url } };
				} else {
					try {
						const dataForm = new FormData();
						dataForm.append('bulkSenderData', 'true');
						dataForm.append('landlordDocument', 'true');
						dataForm.append('parent', parentId);
						dataForm.append('parentModel', parent);
						dataForm.append('file', file);
						let res = await instance.post(`/edocument/saveRequest`, dataForm);
						console.log('response', res);
						const { document } = res?.data;
						return {
							fileType,
							data: {
								...document,
							},
						};
					} catch (e) {
						console.log('error in document upload', e);
					}
				}
			})
		).then((results) => {
			console.log('results == ');
			console.log(results);
			onUpload(results);
			setLoading(false);
		});
	}

	useEffect(async () => {
		buttonFix();
	}, [loading]);

	const buttonFix = () => {
		const buttonNext = document.querySelector('.awssld__next');
		const buttonPrev = document.querySelector('.awssld__prev');
		console.log('btnnext', buttonNext);
		buttonNext?.setAttribute('type', 'button');
		buttonPrev?.setAttribute('type', 'button');
	};

	const handleDelete = () => {
		removeImage(currentMedia);
		buttonFix();
	};

	return (
		<Box>
			{!loading && previewImages?.length > 0 && (
				<Box pb={2} borderBottom={0} borderRadius={1} position={'relative'}>
					<Box
						display={'flex'}
						justifyContent={'center'}
						margin={'auto'}
						position={'absolute'}
						borderRadius={'50%'}
						backgroundColor={'#fff'}
						zIndex={100}
						width={45}
						height={45}
						bottom={10}
						right={-8}
						sx={{
							transition: 'all ease-in-out 200ms',
							cursor: 'pointer',

							':hover': {
								width: 50,
								height: 50,
							},
						}}
						onClick={() => handleDelete()}
					>
						<DeleteIcon
							fontSize='medium'
							style={{
								color: 'red',
								margin: 'auto',
							}}
						/>
					</Box>

					<AwesomeSlider
						style={{
							'--slider-height-percentage': '60%',
							'--slider-transition-duration': '575ms',
							'--organic-arrow-thickness': '3px',
							'--organic-arrow-border-radius': '0px',
							'--organic-arrow-height': '13px',
							'--organic-arrow-color': '#1459c0',
							'--control-button-width': '11%',
							'--control-button-height': '26%',
							'--control-button-background': 'rgba(255, 255, 255, 0.19)',
							'--control-bullet-color': '#2d5182',
							'--control-bullet-active-color': '#31A8CE',
							'--loader-bar-color': '#fff',
							'--loader-bar-height': '6px',
						}}
						bullets={false}
						onTransitionStart={(args) => {
							setCurrentMedia(args.nextMedia.source);
							buttonFix();
						}}
						selected={currentMedia}
					>
						{previewImages.map((image, i) => (
							<div data-src={image} key={i} />
						))}
					</AwesomeSlider>
				</Box>
			)}
			{!loading && (
				<>
					<input
						accept={!allowAll && 'image/*'}
						style={{ display: 'none' }}
						id='images-input'
						onChange={onUploadImages}
						multiple
						type='file'
						name={() => Date.now()}
					/>

					<label htmlFor='images-input' style={{ display: 'block' }}>
						<LandlordButton
							variant={'contained'}
							size={'medium'}
							color={'primary'}
							disabled={isDisabled}
							component='span'
							style={{
								display: 'flex',
								width: '100%',
							}}
						>
							{loading ? (
								<LandlordLoading />
							) : allowAll ? (
								'Browse'
							) : (
								'Upload Images'
							)}
						</LandlordButton>
					</label>
				</>
			)}

			{loading && (
				<Box
					width={'100%'}
					display={'flex'}
					textAlign={'center'}
					alignItems={'center'}
					flexDirection={'column'}
					justifyContent={'center'}
				>
					<Spinner type='circular' size={'2rem'} />
					<br />
					<small
						style={{
							color: 'red',
						}}
					>
						Please wait for the attachments to upload before saving
					</small>
				</Box>
			)}
			{!loading && previewDocs?.length > 0 && (
				<Box>
					Documents:
					<Grid
						container
						spacing={1}
						// sx={(theme) => ({
						// 	display: 'flex',
						// 	justifyContent: 'flex-start',
						// 	columnGap: 2,
						// 	alignItems: 'center',
						// })}
					>
						{previewDocs?.map((doc) => (
							<Grid item md={4}>
								<Box
									sx={(theme) => ({
										display: 'flex',
										justifyContent: 'flex-start',
										alignItems: 'center',
										columnGap: 0.5,
										width: 'max-content',
										px: 1,
										borderRadius: 2,
										border: '1px solid #c4c4c4',
										cursor: 'pointer',
										transition: '150ms ease-in-out',
										':hover': {
											bgcolor: '#0063c8',
											color: '#fff',
										},
									})}
									onClick={(_) => window?.open(doc?.documentUrl)}
								>
									<InsertDriveFileIcon />
									{doc?.title}
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Box>
	);
}

// const toBase64 = (file) =>
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});
