import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Paper,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import DateLabel from 'components/LandlordTools/Properties/Utils/DateLabel';
import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {
	DeleteSystem,
	NewSystem,
} from '../../../../store/actions/Property/systemAction';
import { useDispatch } from 'react-redux';

import { modalBoxStyles, modalStyles } from '../../../styled/Modal';
import SuiInput from 'components/SuiInput';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import { nwc, nwoc } from 'utils/NumberUtils';
import UploadImages from 'Views/posts/UploadImages';
import AddRoomButton from '../Utils/AddRoomButton';
import { LandlordOutlineButton } from 'components/styled/Button';
import CustomLabel from '../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const PREFIX = 'AddSystemModal';

const classes = {
	modal: `${PREFIX}-modal`,
};
const filter = createFilterOptions();

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

const AddSystemModal = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	properties,
	rooms,
}) => {
	const [cData, setCData] = useState({});
	const [imagesModal, setImagesModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [propertyRooms, setPropertyRooms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);

	const dispatch = useDispatch();

	const getPopertyRooms = () => {
		let pRooms = rooms?.filter(
			(r) => r?.property?._id === (data?.property?._id || data?.property)
		);
		setPropertyRooms(pRooms);
	};
	let data,
		setData = {};

	if (title === 'Add') {
		data = cData;

		setData = setCData;
	} else {
		data = propData;
		setData = setPropData;
	}

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, [data?.property, rooms]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, []);
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setData({
			...data,
			images,
			attachments: docs,
		});
		//eslint-disable-next-line
	}, [images, docs]);

	useEffect(() => {
		console.log('attachments', data?.attachments);
		if (data?.images) setImages([...data.images]);
		if (data?.attachments) setDocs([...data?.attachments]);
		//eslint-disable-next-line
	}, [open]);

	const handleSubmit = async (e) => {
		// setLoading(true);
		e.preventDefault();
		const _data = {
			...data,
			attachments: docs,
			estimatedValue: nwoc(data?.estimatedValue),
		};
		await dispatch(NewSystem(title, _data));
		setData({});
		setLoading(false);
		handleClose();
	};

	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteSystem(data));
		setLoading(false);
		setDeleteModal(false);
		handleClose();
	};

	const typeOptions = [
		'Water',
		'Sewer',
		'Plumbing',
		'Electrical',
		'HVAC',
		'Foundation',
		'Roofing',
		'Gutters',
		'Siding',
		'Security System',
		'Sprinkler',
		'Pool',
	];

	return (
		<Root>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox>
								<Typography
									variant='h6'
									component='h2'
									fontWeight='bold'
									textAlign={'center'}
									width={'100%'}
								>
									{title} System Item
								</Typography>
								<CloseBox>
									<Close
										onClick={onClose}
										sx={{
											width: '100%',
											cursor: 'pointer',
										}}
									/>
								</CloseBox>
							</TitleBox>
							<Box sx={{ mt: 2 }}>
								<Box>
									<Grid
										container
										rowSpacing={1.5}
										columnSpacing={2}
									>
										<Grid item xs={12} md={6}>
											<TextField
												required
												name='name'
												onChange={handleChange}
												placeholder='System Name'
												variant='outlined'
												fullWidth
												value={data?.name}
											/>
											{data?.name && (
												<CustomLabel
													label={'System Name'}
												/>
											)}
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Type'
												id='type-autocomplete'
												options={typeOptions}
												value={data?.type}
												fullWidth
												onChange={(event, type) => {
													if (
														typeof type === 'string'
													) {
														setData({
															...data,
															type,
														});
													} else if (
														type &&
														type.inputValue
													) {
														// Create a new value from the user input
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
												filterOptions={(
													types,
													params
												) => {
													const filtered = filter(
														types,
														params
													);

													// const { inputValue } = params;
													const inputValue =
														params.inputValue;
													// Suggest the creation of a new value
													const isExisting =
														types.some(
															(type) =>
																inputValue ===
																type
														);

													if (
														inputValue !== '' &&
														!isExisting
													) {
														// filtered.push({
														// 	inputValue,
														// 	type: `Add "${inputValue}"`,
														// });
														filtered.push(
															inputValue
														);
													}

													return filtered;
												}}
												selectOnFocus
												clearOnBlur
												handleHomeEndKeys
												getOptionLabel={(option) => {
													// Value selected with enter, right from the input
													if (
														typeof option ===
														'string'
													) {
														return option;
													}
													// Add "xxx" option created dynamically
													if (option.inputValue) {
														return option.inputValue;
													}
													// Regular option
													return option;
												}}
												renderOption={(
													props,
													option
												) => (
													<li {...props}>{option}</li>
												)}
												renderInput={(params) => (
													// <TextField
													// 	{...params}
													// 	placeholder='Free solo with text demo'
													// />

													<TextField
														{...params}
														placeholder='Type'
														variant='outlined'
														required
														value={data?.type}
													/>
												)}
											/>
											{data?.type && (
												<CustomLabel label={'Type'} />
											)}
										</Grid>

										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Property'
												id='property-autocomplete'
												options={properties}
												getOptionLabel={(property) =>
													`${property.propertyName}`
												}
												onChange={(
													e,
													property,
													reason
												) => {
													reason === 'selectOption'
														? setData({
																...data,
																property:
																	property,
																room: {
																	name: 'Whole House',
																	_id: null,
																},
														  })
														: setData({
																...data,
																property: null,
																room: {
																	name: 'Whole House',
																	_id: null,
																},
														  });

													console.log(
														'data now',
														data
													);
												}}
												value={data?.property}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																data?.property
																	?.propertyName
															}
															placeholder='Property'
															variant='outlined'
															required
														/>
													);
												}}
											/>
											{data?.property && (
												<CustomLabel
													label={'property'}
												/>
											)}
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={data?.property}
												placeholder='Room'
												id='room-autocomplete'
												defaultValue={{
													name: 'Whole House',
													_id: null,
												}}
												options={[
													{
														name: 'Whole House',
														_id: null,
													},
													...propertyRooms,
												]}
												getOptionLabel={(room) =>
													`${room.name}`
												}
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

													console.log(
														'current data after room',
														data
													);
												}}
												value={data?.room}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																data?.room?.name
															}
															placeholder='Room'
															variant='outlined'
														/>
													);
												}}
											/>
											<AddRoomButton />
										</Grid>
										<Grid item xs={12} md={6}>
											<SuiInput
												// size={'small'}
												// type={'number'}
												value={nwc(
													data?.estimatedValue
												)}
												name={'estimatedValue'}
												onChange={handleChange}
												placeholder='Estimated Value'
												icon={{
													component: (
														<AttachMoneyIcon />
													),
													direction: 'left',
												}}
												required
											/>
											{data?.estimatedValue && (
												<CustomLabel
													label={'Estimated Value'}
												/>
											)}
										</Grid>
										<Grid item md={6}>
											<LocalizationProvider
												dateAdapter={AdapterDateFns}
												style={{ width: '100%' }}
											>
												<DatePicker
													placeholder='Month/Year Updated'
													views={['year', 'month']}
													onChange={(value) => {
														setData({
															...data,
															lastUpdated:
																String(value),
														});
													}}
													style={{
														width: '100%',
													}}
													value={
														data?.lastUpdated ||
														Date.now()
													}
													renderInput={(params) => (
														<TextField
															{...params}
															required
															fullWidth
														/>
													)}
												/>
											</LocalizationProvider>
											<DateLabel
												label={'Month/Year Updated'}
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												required
												name='location'
												onChange={handleChange}
												placeholder='Location'
												variant='outlined'
												fullWidth
												value={data?.location}
											/>
											{data?.location && (
												<CustomLabel
													label={'location'}
												/>
											)}
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												required
												name='condition'
												onChange={handleChange}
												placeholder='Condition'
												variant='outlined'
												fullWidth
												value={data?.condition}
											/>
											{data?.condition && (
												<CustomLabel
													label={'condition'}
												/>
											)}
										</Grid>
										<Grid item md={12}>
											<LandlordOutlineButton
												variant={'outline'}
												color={'primary'}
												sx={{
													width: '100%',
												}}
												onClick={() =>
													setImagesModal(true)
												}
											>
												Attach Document/Image
											</LandlordOutlineButton>
											<CustomLabel
												label={
													<Box
														sx={{
															display: 'flex',
															columnGap: 1.5,
														}}
													>
														<div>
															{images?.length >
																0 &&
																'Images: ' +
																	images?.length}
														</div>
														<div>
															{docs?.length > 0 &&
																'Documents: ' +
																	docs?.length}
														</div>
													</Box>
												}
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
								</Box>
							</Box>
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
										{loading ? (
											<LandlordLoading />
										) : (
											'Delete'
										)}
									</LandlordButton>
								) : null}
							</Grid>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>

			<Dialog
				open={imagesModal}
				onClose={() => setImagesModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				fullWidth
			>
				<DialogTitle id='alert-dialog-title'>
					{'Attach Document/Image'}
				</DialogTitle>
				<DialogContent>
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
							const _docs = _docsArray?.map((e) => e?.data);

							setImages((prevImages) =>
								prevImages.concat(_images)
							);
							setDocs((prevDocs) => prevDocs?.concat(_docs));
							console.log('docs', _docs);
						}}
						parentId={data?._id}
						parent={'System'}
						origin='imgBB'
						removeImage={(image) =>
							setImages(images.filter((i) => i !== image))
						}
						previewImages={images}
						previewDocs={docs}
						allowAll={true}
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

			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Remove System'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this System item. You
						acknowledge and understandthat once deleted, the data
						tied to this item will be gone forever.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordButton
						onClick={() => setDeleteModal(false)}
						variant={'contained'}
						size={'medium'}
						color={'primary'}
					>
						{loading ? <LandlordLoading /> : 'Close'}
					</LandlordButton>
					<LandlordButton
						onClick={handleDelete}
						variant={'contained'}
						size={'medium'}
						color={'error'}
						autoFocus
					>
						{loading ? <LandlordLoading /> : 'Confirm'}
					</LandlordButton>
				</DialogActions>
			</Dialog>
		</Root>
	);
};

export default AddSystemModal;
