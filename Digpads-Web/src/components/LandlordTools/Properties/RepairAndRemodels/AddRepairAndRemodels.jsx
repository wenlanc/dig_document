import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Paper,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch } from 'react-redux';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
	DeleteRepair,
	NewRepair,
} from '../../../../store/actions/Property/repairAction';
import { modalBoxStyles } from '../../../styled/Modal';
import SuiInput from 'components/SuiInput';
import { nwc, nwoc } from 'utils/NumberUtils';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import AddRoomButton from '../Utils/AddRoomButton';
import CustomLabel from '../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import ImageDocumentModal from '../Utils/ImageDocumentModal';
import { LandlordOutlineButton } from 'components/styled/Button';

const PREFIX = 'AddRepairAndRemodels';

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

const AddRepairAndRemodels = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	properties,
	rooms,
}) => {
	const [cData, setCData] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [propertyRooms, setPropertyRooms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [roomModal, setRoomModal] = useState(false);
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);

	let data, setData;
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

	useEffect(() => {
		if (data?.images) setImages([...data?.images]);
		if (data?.attachments) setDocs([...data?.attachments]);
		return () => {
			setImages([]);
			setDocs([]);
		};
	}, [open]);

	const dispatch = useDispatch();

	const getPopertyRooms = () => {
		let pRooms = rooms?.filter(
			(r) => r?.property?._id === (data?.property?._id || data?.property)
		);

		setPropertyRooms(pRooms);
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (roomModal) return;
		setLoading(true);
		const _data = {
			...data,
			images,
			attachments: docs,
			amount: nwoc(data?.amount),
		};
		await dispatch(NewRepair(title, _data));
		setLoading(false);

		setData({});
		handleClose();
	};
	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteRepair(data));
		setLoading(false);
		setDeleteModal(false);
		handleClose();
	};

	const typeOptions = [
		'Termite',
		'Yard Work',
		'Tree Work',
		'Gutters',
		'Siding',
		'Deck/Porch',
		'Fireplace',
		'Roof',
		'HVAC',
		'Water Heater',
		'Appliance',
		'Electrical',
		'Plumbing',
		'Basement',
		'Smoke Alarms',
		'Garage Door',
		'Spetic Tank',
		'Pool',
		'Other',
	];

	return (
		<Root>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox display='flex' justifyContent='space-between'>
								<Typography variant='h6' component='h2' fontWeight='bold'>
									{title} Remodel/Repair
								</Typography>
								<CloseBox onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Box sx={{ mt: 2 }}>
								<Grid container columnSpacing={2} rowSpacing={1.5}>
									<Grid item xs={12} md={6}>
										<TextField
											name='name'
											onChange={handleChange}
											placeholder='Maintenance Name'
											variant='outlined'
											fullWidth
											value={data?.name}
											required
										/>
										{data?.name && <CustomLabel label={'Maintenance Name'} />}
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											placeholder='Maintenance Type'
											id='type-autocomplete'
											options={typeOptions}
											value={data?.type}
											fullWidth
											onChange={(event, type) => {
												// console.log(event, type);

												if (typeof type === 'string') {
													setData({
														...data,
														type,
													});
												} else if (type && type.inputValue) {
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
											filterOptions={(types, params) => {
												const filtered = filter(types, params);

												// const { inputValue } = params;
												const inputValue = params.inputValue;
												// Suggest the creation of a new value
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
												// Value selected with enter, right from the input
												if (typeof option === 'string') {
													return option;
												}
												// Add "xxx" option created dynamically
												if (option.inputValue) {
													return option.inputValue;
												}
												// Regular option
												return option;
											}}
											renderOption={(props, option) => (
												<li {...props}>{option}</li>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder='Maintenance Type'
													variant='outlined'
													required
													value={data?.type}
												/>
											)}
										/>
										{data?.type && <CustomLabel label={'Maintenance Type'} />}
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
										{data?.company && <CustomLabel label={'company'} />}
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
											// disabled={stateCities.length === 0}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														placeholder='Payor'
														value={data?.payor}
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.payor && <CustomLabel label={'payor'} />}
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
										/>
										{data?.amount && <CustomLabel label={'amount'} />}
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											placeholder='Property'
											id='property-autocomplete'
											options={properties}
											getOptionLabel={(property) => `${property.propertyName}`}
											onChange={(e, property, reason) => {
												setData({
													...data,
													room: '',
													roomName: '',
												});
												reason === 'selectOption'
													? setData({
															...data,
															property,
													  })
													: setData({
															...data,
															property: null,
													  });
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
											onChange={(e, room, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															room,
													  })
													: setData({
															...data,
															room: null,
													  })
											}
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
											onOpen={(_) => setRoomModal(true)}
											onClose={(_) => setRoomModal(false)}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<LandlordOutlineButton
											variant={'outline'}
											color={'primary'}
											sx={{
												width: '100%',
											}}
											onClick={() => setAttachmentModal(true)}
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
														{images?.length > 0 && 'Images: ' + images?.length}
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
												width={'100%'}
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
												display={'flex'}
												flexDirection={'column'}
												width={'100%'}
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

			<ImageDocumentModal
				docs={docs}
				setDocs={setDocs}
				images={images}
				setImages={setImages}
				handleClose={(_) => setAttachmentModal(false)}
				open={attachmentModal}
			/>

			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Remove Repair And Remodel Item'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Repair and Remodel item. You
						acknowledge and understand that once deleted, the data tied to this
						item will be gone forever. This will affect the Properties and your
						overall portfolio’s financials as well.
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

export default AddRepairAndRemodels;
