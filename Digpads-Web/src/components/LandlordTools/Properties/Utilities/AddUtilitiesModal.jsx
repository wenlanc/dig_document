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
	useTheme,
	useMediaQuery,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {
	DeleteUtility,
	NewUtility,
} from '../../../../store/actions/Property/utilityAction';
import { useDispatch } from 'react-redux';

import { modalBoxStyles } from '../../../styled/Modal';
import SuiInput from 'components/SuiInput';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import { nwc, nwoc } from 'utils/NumberUtils';
import AddRoomButton from '../Utils/AddRoomButton';
import CustomLabel from '../Utils/DateLabel';
import { ModalPaper } from 'components/MuiStyled/Global';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import UploadImages from 'Views/posts/UploadImages';
import { LandlordOutlineButton } from 'components/styled/Button';
import ImageDocumentModal from '../Utils/ImageDocumentModal';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const PREFIX = 'AddUtilitiesModal';

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

const AddUtilitiesModal = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	properties,
	rooms,
}) => {
	const [roomModal, setRoomModal] = useState(false);
	const [imagesModal, setImagesModal] = useState(false);
	const [data, setData] = useState(propData);
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

	useEffect(() => {
		setData(propData);
	}, [open, propData]);

	useEffect(() => {
		console.log('rooms/property changed...');
		getPopertyRooms();
		//eslint-disable-next-line
	}, [data?.property, rooms]);

	useEffect(() => {
		console.log('attachments', data?.attachments);
		if (data?.images) setImages([...data.images]);
		if (data?.attachments) setDocs([...data?.attachments]);
		//eslint-disable-next-line
	}, [open]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, []);
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
			images,
			attachments: docs,
			amount: nwoc(data?.amount),
		};
		await dispatch(NewUtility(title, _data));
		setData({});
		setLoading(false);
		handleClose();
	};

	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteUtility(data));
		setLoading(false);
		setDeleteModal(false);
		handleClose();
	};

	return (
		<Root>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox className={'nbs'}>
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
									{title} Utility
								</Typography>
								<CloseBox onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Box sx={{ mt: 2 }}>
								<Box spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<TextField
												required
												name='name'
												onChange={handleChange}
												placeholder='Utility Name'
												variant='outlined'
												fullWidth
												value={data?.name}
											/>
											{data?.name && <CustomLabel label={'Utility Name'} />}
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Utility Type'
												id='type-autocomplete'
												options={[
													'Natural Gas',
													'Heating Oil',
													'Electric',
													'Water',
													'Sewer',
													'Trash',
													'Security',
													'Cable',
													'Streaming App',
													'Other',
												]}
												getOptionLabel={(type) => `${type}`}
												onChange={(e, type, reason) =>
													reason === 'selectOption'
														? setData({
																...data,
																type,
														  })
														: setData({
																...data,
																type: '',
														  })
												}
												value={data?.type}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={data?.type}
															placeholder='Utility'
															variant='outlined'
															required
														/>
													);
												}}
											/>
											{data?.type && <CustomLabel label={'Utility Type'} />}
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField
												name='company'
												onChange={handleChange}
												placeholder='Company'
												variant='outlined'
												fullWidth
												value={data?.company}
												required
											/>
											{data?.company && <CustomLabel label={'Company'} />}
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Payor'
												id='payor-autocomplete'
												options={['Landlord', 'Tenant', 'Other']}
												getOptionLabel={(payor) => `${payor}`}
												onChange={(e, payor, reason) =>
													reason === 'selectOption'
														? setData({
																...data,
																payor,
														  })
														: setData({
																...data,
																payor: '',
														  })
												}
												value={data?.payor}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															required
															value={data?.payor}
															placeholder='Payor'
															variant='outlined'
														/>
													);
												}}
											/>
											{data?.payor && <CustomLabel label={'Payor'} />}
										</Grid>
										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Cost'
												id='model-autocomplete'
												options={['One Time Cost', 'Recurring Cost']}
												getOptionLabel={(model) => `${model}`}
												onChange={(e, model, reason) =>
													reason === 'selectOption'
														? setData({
																...data,
																model,
														  })
														: setData({
																...data,
																model: '',
														  })
												}
												value={data?.model}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={data?.model}
															placeholder='Cost'
															variant='outlined'
															required
														/>
													);
												}}
											/>
											{data?.model && <CustomLabel label={'Cost'} />}
										</Grid>
										<Grid item xs={12} md={6}>
											<SuiInput
												// type={'number'}
												value={nwc(data?.amount)}
												name={'amount'}
												onChange={handleChange}
												placeholder='Amount'
												icon={{
													component: <AttachMoneyIcon />,
													direction: 'left',
												}}
												required
												// size={isXL ? 'medium' : 'small'}
											/>
											{data?.amount && <CustomLabel label={'amount'} />}
										</Grid>

										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Property'
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
										<Grid
											item
											xs={12}
											md={6}
											sx={{ mt: !data?.property && -3 }}
										>
											<Autocomplete
												placeholder='Frequency'
												id='frequency-autocomplete'
												options={[
													'Once',
													'Daily',
													'Weekly',
													'Monthly',
													'Annually',
												]}
												getOptionLabel={(frequency) => `${frequency}`}
												onChange={(e, frequency, reason) =>
													reason === 'selectOption'
														? setData({
																...data,
																frequency,
														  })
														: setData({
																...data,
																frequency: '',
														  })
												}
												value={data?.frequency}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															placeholder='Frequency'
															variant='outlined'
															value={data?.frequency}
															required
														/>
													);
												}}
											/>
											{data?.frequency && <CustomLabel label={'frequency'} />}
										</Grid>
										<Grid item md={12}>
											<LandlordOutlineButton
												variant={'outline'}
												color={'primary'}
												sx={{
													width: '100%',
												}}
												onClick={() => setImagesModal(true)}
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
															{images?.length > 0 &&
																'Images: ' + images?.length}
														</div>
														<div>
															{docs?.length > 0 && 'Documents: ' + docs?.length}
														</div>
													</Box>
												}
											/>
										</Grid>
										<Grid item md={12}>
											<Box display={'flex'} columnGap={2} width={'100%'}>
												<Box
													display={'flex'}
													flexDirection={'column'}
													width={'100%'}
												>
													<LocalizationProvider dateAdapter={AdapterDateFns}>
														<DatePicker
															placeholder='Date Incurred (One Time)'
															onChange={(value) => {
																setData({
																	...data,
																	incurredDate: String(value),
																});
															}}
															value={data?.incurredDate}
															renderInput={(params) => (
																<TextField fullWidth {...params} required />
															)}
														/>
													</LocalizationProvider>
													<CustomLabel label={'Date Incurred (One Time)'} />
												</Box>
												<Box
													display={'flex'}
													flexDirection={'column'}
													width='100%'
												>
													<LocalizationProvider dateAdapter={AdapterDateFns}>
														<DatePicker
															placeholder='Contract Start Date'
															onChange={(value) => {
																setData({
																	...data,
																	startDate: String(value),
																});
															}}
															value={data?.startDate}
															renderInput={(params) => (
																<TextField fullWidth {...params} />
															)}
														/>
													</LocalizationProvider>
													<CustomLabel label={'Contract Start Date'} />
												</Box>
												<Box
													width={'100%'}
													display={'flex'}
													flexDirection={'column'}
												>
													<LocalizationProvider dateAdapter={AdapterDateFns}>
														<DatePicker
															placeholder='Contract End Date'
															onChange={(value) => {
																setData({
																	...data,
																	endDate: String(value),
																});
															}}
															value={data?.endDate}
															renderInput={(params) => (
																<TextField fullWidth {...params} />
															)}
														/>
													</LocalizationProvider>
													<CustomLabel label={'Contract End Date'} />
												</Box>
											</Box>
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
										{loading ? <LandlordLoading /> : 'Delete'}
									</LandlordButton>
								) : null}
							</Grid>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>

			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Remove Utility'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Utility item. You acknowledge and
						understandthat once deleted, the data tied to this item will be gone
						forever.
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

			<ImageDocumentModal
				open={imagesModal}
				handleClose={(_) => setImagesModal(false)}
				setImages={setImages}
				setDocs={setDocs}
				images={images}
				docs={docs}
				parent={'Utility'}
			/>
		</Root>
	);
};

export default AddUtilitiesModal;
