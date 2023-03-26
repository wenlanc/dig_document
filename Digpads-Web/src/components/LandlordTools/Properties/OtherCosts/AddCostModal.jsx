import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import {
	DeleteOtherCost,
	NewOtherCost,
} from 'store/actions/Property/otherCostAction';
import { instance } from 'controllers/axios';
import SuiInput from 'components/SuiInput';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
	LandlordButton,
	LandlordLoading,
	LandlordOutlineButton,
} from '../../../styled/Button';
import AddRoomButton from 'components/LandlordTools/Properties/Utils/AddRoomButton';
import CustomLabel from '../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import ImageDocumentModal from '../Utils/ImageDocumentModal';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import { nwc } from 'utils/NumberUtils';
import { nwoc } from 'utils/NumberUtils';

const filter = createFilterOptions();

const AddCostModal = ({
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
	const [propertyRooms, setPropertyRooms] = useState([]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [roomModal, setRoomModal] = useState(false);
	const [typeOptions, setTypeOptions] = useState([
		'Landscaping',
		'Termite Treatment',
		'Plumbing',
		'Electrical',
		'Handyman',
		'Administrative',
		'Other',
	]);

	let data, setData;
	if (title === 'Add') {
		data = cData;
		setData = setCData;
	} else {
		data = propData;
		setData = setPropData;
	}

	const getPopertyRooms = () => {
		let pRooms = rooms?.filter(
			(r) => r?.property?._id === (data?.property?._id || data?.property)
		);

		setPropertyRooms(pRooms);
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => console.log(data), [data]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, [data?.property, rooms]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, []);

	const dispatch = useDispatch();
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
		console.log(_data);
		await dispatch(NewOtherCost(title, _data));
		setData({});
		setLoading(false);
		handleClose();
	};
	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteOtherCost(data));
		setLoading(false);
		handleClose();
		setDeleteModal(false);
	};
	useEffect(() => {
		if (data?.images) setImages([...data?.images]);
		if (data?.attachments) setDocs([...data?.attachments]);

		if (open)
			instance.get('userProfile').then((res) => {
				console.log('got profile', res.data.data.data);
				const options = res.data.data.data.customOptions?.generalExpenses;
				console.log('ops', options);
				if (options?.length > 0) setTypeOptions([...typeOptions, ...options]);
			});

		//eslint-disable-next-line
	}, [open]);

	useEffect(() => console.log('open ===', open), [open]);

	return (
		<>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox component={'form'} onSubmit={handleSubmit}>
					<ModalPaper>
						<TitleBox display='flex' justifyContent='space-between'>
							<Typography
								variant='h6'
								component='h2'
								fontWeight='bold'
								textAlign={'center'}
								width={'100%'}
							>
								{title} General Expense
							</Typography>
							<CloseBox onClick={onClose}>
								<Close style={{ cursor: 'pointer' }} />
							</CloseBox>
						</TitleBox>
						<Box sx={{ mt: 2 }}>
							<Grid container rowSpacing={1.5} columnSpacing={2}>
								<Grid item xs={12} md={6}>
									<TextField
										name='name'
										onChange={handleChange}
										placeholder='General Expense Name'
										variant='outlined'
										fullWidth
										value={data?.name}
										required
									/>
									{data?.name && <CustomLabel label={'name'} />}
								</Grid>
								<Grid item xs={12} md={6}>
									<Autocomplete
										key={typeOptions}
										placeholder='General Expense Type'
										id='type-autocomplete'
										options={typeOptions}
										value={data?.type}
										fullWidth
										onChange={(event, type) => {
											if (typeof type === 'string') {
												const isExisting = typeOptions.some(
													(_type) => type === _type
												);

												if (!isExisting)
													setData({
														...data,
														type,
														newType: type,
													});
												// } else if (
												// 	type &&
												// 	type.inputValue
												// ) {
												// 	// Create a new value from the user input
												// 	setData({
												// 		...data,
												// 		type: type.inputValue,
												// 	});
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
												// filtered.push({
												// 	inputValue,
												// 	type: `Add "${inputValue}"`,
												// });

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
											// <TextField
											// 	{...params}
											// 	placeholder='Free solo with text demo'
											// />

											<TextField
												{...params}
												placeholder='General Expense Type'
												variant='outlined'
												required
												value={data?.type}
											/>
										)}
									/>
									{data?.type && <CustomLabel label={'general expense type'} />}
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
													value={data?.payor}
													placeholder='Payor'
													variant='outlined'
													required
												/>
											);
										}}
									/>
									{data?.payor && <CustomLabel label={'payor'} />}
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
										// disabled={stateCities.length === 0}
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
										value={nwc(data?.amount)}
										name={'amount'}
										onChange={handleChange}
										placeholder='Amount'
										required
										icon={{
											component: <AttachMoneyIcon />,
											direction: 'left',
										}}
									/>
									{data?.amount && <CustomLabel label={'amount'} />}
								</Grid>
								<Grid item xs={12} md={6}>
									<Autocomplete
										placeholder='Frequency'
										id='frequency-autocomplete'
										options={['Once', 'Daily', 'Weekly', 'Monthly', 'Anually']}
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
										// disabled={stateCities.length === 0}
										renderInput={(params) => {
											return (
												<TextField
													{...params}
													value={data?.frequency}
													placeholder='Frequency'
													variant='outlined'
													required
												/>
											);
										}}
									/>
									{data?.frequency && <CustomLabel label={'frequency'} />}
								</Grid>

								<Grid item xs={12} md={6}>
									<Autocomplete
										placeholder='Property'
										id='property-autocomplete'
										options={properties}
										getOptionLabel={(property) => `${property.propertyName}`}
										value={data?.property}
										onChange={(e, property, reason) =>
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
												  })
										}
										// disabled={stateCities.length === 0}
										renderInput={(params) => {
											// const param = {
											// 	...params,
											// 	inputProps: {
											// 		...params.inputProps,
											// 		value:
											// 			data.property
											// 				?.propertyName !==
											// 			undefined
											// 				? data.property
											// 						.propertyName
											// 				: data.propertyName,
											// 	},
											// };

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
								<Grid item xs={12} md={6} mb={3}>
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
										onOpen={(_) => setRoomModal(true)}
										onClose={(_) => setRoomModal(false)}
									/>
								</Grid>
								<Grid item md={6}>
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
								<Grid md={12}>
									<Box display={'flex'} columnGap={2} width={'100%'} px={2}>
										<Box
											width={'100%'}
											display={'flex'}
											flexDirection={'column'}
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
													renderInput={(params) => <TextField {...params} />}
												/>
											</LocalizationProvider>
											<CustomLabel label='Incurred Date' />
										</Box>

										<Box
											width={'100%'}
											display={'flex'}
											flexDirection={'column'}
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
													renderInput={(params) => <TextField {...params} />}
												/>
											</LocalizationProvider>
											<CustomLabel label='Contract Start Date' />
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
													renderInput={(params) => <TextField {...params} />}
												/>
											</LocalizationProvider>
											<CustomLabel label='Contract End Date' />
										</Box>
									</Box>
								</Grid>

								<Grid item xs={12} md={12}>
									<SuiInput
										multiline
										name='notes'
										minRows={5}
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
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>

			<ImageDocumentModal
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
				setImages={setImages}
				setDocs={setDocs}
				images={images}
				docs={docs}
				parent={'General Expense'}
			/>
			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Remove General Expense Item'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this General Expenses item. You
						acknowledge and understand that once deleted, the data tied to this
						item will be gone forever. This will affect the Properties and your
						overall portfolio's financials as well.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordButton
						onClick={() => setDeleteModal(false)}
						color='info'
						variant='contained'
					>
						{loading ? <LandlordLoading /> : 'Close'}
					</LandlordButton>
					<LandlordButton
						onClick={handleDelete}
						autoFocus
						color='error'
						variant='contained'
					>
						{loading ? <LandlordLoading /> : 'Confirm'}
					</LandlordButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddCostModal;
