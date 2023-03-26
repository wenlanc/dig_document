import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import UploadImages from '../../../../Views/posts/UploadImages';
import { useDispatch } from 'react-redux';
import { NewPhysical } from '../../../../store/actions/Property/physicalPropertyAction';
import { modalBoxStyles } from '../../../styled/Modal';
import AddRoomButton from '../Utils/AddRoomButton';

import { LandlordOutlineButton } from 'components/styled/Button';
import SuiInput from 'components/SuiInput';
import { nwc } from 'utils/NumberUtils';
import { nwoc } from 'utils/NumberUtils';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import CustomLabel from '../Utils/DateLabel';
import DeleteModal from '../DeleteModal';

const PREFIX = 'AddPhysicalPropertyModal';

const classes = {
	modal: `${PREFIX}-modal`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			height: 'auto',
		},
	},
}));

const filter = createFilterOptions();

const AddPhysicalPropertyModal = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	properties,
	rooms,
}) => {
	const [data, setData] = useState(propData);
	const [roomModal, setRoomModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [imagesModal, setImagesModal] = useState(false);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [propertyRooms, setPropertyRooms] = useState([]);

	// let data, setData;
	// if (title === 'Add') {
	// 	data = cData;
	// 	setData = setCData;
	// } else {
	// 	console.log(propData);
	// 	data = propData;
	// 	setData = setPropData;
	// }

	useEffect(() => {
		setData(propData);
	}, [open, propData]);

	const getPopertyRooms = () => {
		let pRooms = rooms?.filter((r) => r?.property?._id === data?.property?._id);

		setPropertyRooms(pRooms);
	};
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		if (roomModal) return setLoading(false);
		console.log('no room modal, submitting...');
		const _data = {
			...data,
			estimatedValue: nwoc(data?.estimatedValue),
			images,
		};
		await dispatch(NewPhysical(title, _data));
		setData({});
		setLoading(false);
		handleClose();
	};

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, [data?.property, rooms]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		// setData({
		// 	...data,
		// 	images: data?.images,
		// });
		setImages([]);
		const oldImages = data?.images;
		if (oldImages) {
			setImages([...oldImages]);
		}
		//eslint-disable-next-line
	}, [open]);

	const removeImage = (imageToRemove) => {
		console.log(imageToRemove);
		console.log('allimages', images);
		const filteredImages = images.filter((i) => i !== imageToRemove);
		setImages(filteredImages);
	};

	return (
		<Root>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ p: 4 }}>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title} Physical Property
								</Typography>
								<div onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</div>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={4}>
											<TextField
												name='name'
												onChange={handleChange}
												placeholder='Name of Physical Property'
												variant='outlined'
												fullWidth
												value={data?.name}
												style={{ marginBottom: 16 }}
												required
											/>
											{data?.name && (
												<CustomLabel label={'Name of Physical Property'} />
											)}
										</Grid>

										<Grid item xs={12} md={4}>
											<Autocomplete
												placeholder='Type'
												style={{ marginBottom: 16 }}
												id='type-autocomplete'
												options={[
													'Art',
													'Rug',
													'Plant',
													'Trash Can',
													'Appliance',
													'Electronics',
													'Painting/Picture',
													'Inside Furniture',
													'Outside Furniture',
													'Exercies Equipment',
													'Other',
												]}
												value={data?.type}
												fullWidth
												onChange={(event, type) => {
													if (typeof type === 'string') {
														setData({
															...data,
															type,
														});
													} else if (type && type.inputValue) {
														setData({
															...data,
															type: type.inputValue,
														});
													} else {
														setData({
															...data,
															type,
														});
													}
												}}
												filterOptions={(types, params) => {
													const filtered = filter(types, params);

													const inputValue = params.inputValue;
													const isExisting = types.some(
														(type) => inputValue === type
													);
													console.log(isExisting);

													if (inputValue !== '' && !isExisting) {
														filtered.push(inputValue);
													}

													return filtered;
												}}
												selectOnFocus
												clearOnBlur
												handleHomeEndKeys
												getOptionLabel={(option) => {
													if (typeof option === 'string') {
														return option;
													}
													if (option.inputValue) {
														return option.inputValue;
													}
													return option;
												}}
												renderOption={(props, option) => (
													<li {...props}>{option}</li>
												)}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder='Type'
														variant='outlined'
														required
													/>
												)}
											/>
											{data?.type && <CustomLabel label={'Type'} />}
										</Grid>
										<Grid item xs={12} md={4}>
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													placeholder='Month/Year Acquired'
													minDate={new Date('1800-01-01')}
													onChange={(value) => {
														setData({
															...data,
															dateAcquired: String(value),
														});
													}}
													value={data?.dateAcquired || Date.now()}
													renderInput={(params) => (
														<TextField
															placeholder='Month/Year Acquired'
															fullWidth
															{...params}
														/>
													)}
												/>
											</LocalizationProvider>
											<CustomLabel label={'Month/Year Acquired'} />
											{/* <LocalizationProvider
												dateAdapter={AdapterDateFns}
											>
												<DatePicker
													placeholder='Month/Year Acquired'
													views={['year', 'month']}
													minDate={
														new Date('1800-01-01')
													}
													onChange={(value) => {
														setData({
															...data,
															// dateAcquired: String(
															value,
															// ),
														});
													}}
													value={data?.dateAcquired}
													renderInput={(params) => (
														<TextField
															{...params}
															required
														/>
													)}
													style={{ marginBottom: 16 }}
												/>
											</LocalizationProvider> */}
										</Grid>
										<Grid item xs={12} md={4}>
											<Autocomplete
												style={{ marginBottom: 16 }}
												id='condition-autocomplete'
												options={['New', 'Very Good', 'Good', 'Fair', 'Poor']}
												value={data?.condition}
												getOptionLabel={(condition) => `${condition}`}
												onChange={(e, condition, reason) =>
													reason === 'selectOption'
														? setData({
																...data,
																condition,
														  })
														: setData({
																...data,
																condition: '',
														  })
												}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={data?.condition}
															placeholder='Condition'
															variant='outlined'
														/>
													);
												}}
											/>
											{data?.condition && <CustomLabel label={'Condition'} />}
										</Grid>
										{/* <Grid item xs={12} md={4}>
											<UploadImages
												onUpload={(uploads) =>
													setImages((prevImages) =>
														prevImages.concat(
															uploads
														)
													)
												}
												removeImage={removeImage}
												previewImages={images}
											/>
										</Grid> */}
										<Grid item xs={12} md={4}>
											<SuiInput
												// type={'number'}
												value={nwc(data?.estimatedValue)}
												name={'estimatedValue'}
												onChange={handleChange}
												placeholder='Estimated Value'
												icon={{
													component: <AttachMoneyIcon />,
													direction: 'left',
												}}
												required
											/>
											{data?.estimatedValue && (
												<CustomLabel label={'Estimated Value'} />
											)}
											{/* <TextField
												name='estimatedValue'
												onChange={handleChange}
												placeholder='Estimated Value'
												fullWidth
												type='number'
												variant='outlined'
												value={Number(
													data?.estimatedValue
												)}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															$
														</InputAdornment>
													),
												}}
												style={{ marginBottom: 16 }}
												required
											/> */}
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												name='modelIdentifier'
												onChange={handleChange}
												placeholder='Model Identifier'
												fullWidth
												variant='outlined'
												value={data?.modelIdentifier}
												style={{ marginBottom: 16 }}
											/>
											{data?.modelIdentifier && (
												<CustomLabel label={'Model Identifier'} />
											)}
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												name='location'
												onChange={handleChange}
												placeholder='Location'
												fullWidth
												variant='outlined'
												value={data?.location}
												style={{ marginBottom: 16 }}
												required
											/>
											{data?.location && <CustomLabel label={'location'} />}
										</Grid>
										<Grid item md={6} xs={12}>
											<LandlordOutlineButton
												variant={'outline'}
												color={'primary'}
												sx={{ width: '100%' }}
												onClick={() => setImagesModal(true)}
											>
												Upload Images
											</LandlordOutlineButton>
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Property'
												style={{ marginBottom: 16 }}
												id='property-autocomplete'
												options={properties}
												getOptionLabel={(property) =>
													`${property.propertyName}`
												}
												onChange={(e, property, reason) => {
													reason === 'selectOption'
														? setData({
																...data,
																property: property,
																room: null,
														  })
														: setData({
																...data,
																property: null,
																room: null,
														  });

													console.log('data now', data);
												}}
												value={data?.property}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={data?.property?.propertyName}
															placeholder='Property'
															variant='outlined'
															required
														/>
													);
												}}
											/>
											{data?.property && <CustomLabel label={'property'} />}
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={data?.property}
												placeholder='Room'
												style={{ marginBottom: 16 }}
												id='room-autocomplete'
												options={propertyRooms}
												getOptionLabel={(room) => `${room.name}`}
												onChange={(e, room, reason) => {
													reason === 'selectOption'
														? setData({
																...data,
																room: room,
														  })
														: setData({
																...data,
																room: null,
														  });

													console.log('current data after room', data);
												}}
												value={data?.room}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={data?.room?.name}
															placeholder='Room'
															variant='outlined'
															required
														/>
													);
												}}
											/>

											<AddRoomButton
												onOpen={() => setRoomModal(true)}
												onClose={() => setRoomModal(false)}
											/>
										</Grid>

										<Grid item xs={12} md={12}>
											<SuiInput
												multiline
												rows={5}
												name='notes'
												onChange={handleChange}
												aria-placeholder='notes'
												placeholder='Notes'
												value={data?.notes}
												style={{ width: '100%' }}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid container justifyContent={'space-around'}>
									<LandlordButton
										variant={'contained'}
										size={'medium'}
										color={'success'}
										type={'submit'}
										sx={{
											minWidth: 160,
											my: 2,
											mx: 5,
										}}
										disabled={loading}
									>
										{loading ? <LandlordLoading /> : 'Save'}
									</LandlordButton>
									{title === 'Edit' ? (
										<LandlordButton
											variant={'contained'}
											size={'medium'}
											color={'error'}
											sx={{
												minWidth: 160,
												my: 2,
												mx: 5,
											}}
											disabled={loading}
											onClick={() => setDeleteModal(true)}
										>
											{loading ? <LandlordLoading /> : 'Delete'}
										</LandlordButton>
									) : null}
								</Grid>
							</Box>
							{/* <Typography variant='body1'>
					The above is the bare minimum information required to Add a
					Property on digpads. Adding thebelow information will help
					you better manage your rental properties on the digpads
					platform, but it is optional and may be added later if
					desired as well.
				</Typography> */}
						</Box>
					</Paper>
				</Box>
			</Modal>

			<Dialog
				open={imagesModal}
				onClose={() => setImagesModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				fullWidth
			>
				<DialogTitle id='alert-dialog-title'>{'Upload Images'}</DialogTitle>
				<DialogContent>
					<UploadImages
						onUpload={(uploads) =>
							setImages((prevImages) => prevImages.concat(uploads))
						}
						removeImage={removeImage}
						previewImages={images}
					/>
				</DialogContent>
				<DialogActions>
					<LandlordOutlineButton
						variant={'outline'}
						color={'error'}
						onClick={() => setImagesModal(false)}
					>
						Close
					</LandlordOutlineButton>
				</DialogActions>
			</Dialog>

			<DeleteModal
				id={propData?._id}
				onClose={() => setDeleteModal(false)}
				handleDelete={() => {
					setDeleteModal(false);
					onClose();
				}}
				open={deleteModal}
				dataType={'physical-property'}
			/>

			{/* <Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Remove Other Cost Item'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Other Costs item. You
						acknowledge and understand that once deleted, the data
						tied to this item will be gone forever. This will affect
						the Properties and your overall portfolio’s financials
						as well.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setDeleteModal(false)}
						color='info'
						variant='contained'
					>
						Close
					</Button>
					<Button
						onClick={handleDelete}
						autoFocus
						color='error'
						variant='contained'
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog> */}
		</Root>
	);
};

export default AddPhysicalPropertyModal;
