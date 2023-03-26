import React, { useEffect, useState } from 'react';
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
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch } from 'react-redux';
import AttachementModal from './AttachementModal';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
	DeleteInsurance,
	NewInsurance,
} from '../../../../store/actions/Property/insuranceAction';
import { modalBoxStyles } from '../../../styled/Modal';
import SuiInput from 'components/SuiInput';
import {
	LandlordButton,
	LandlordOutlineButton,
	LandlordLoading,
} from 'components/styled/Button';
import CustomLabel from 'components/LandlordTools/Properties/Utils/DateLabel';
import { nwc, nwoc } from 'utils/NumberUtils';
import SuiDatePicker from 'components/SuiDatePicker';
import DateLabel from '../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import ImageDocumentModal from '../Utils/ImageDocumentModal';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const filter = createFilterOptions();

const AddInsurance = ({
	propData,
	setPropData,
	title = 'Info',
	open,
	onClose,
	handleClose,
	properties,
}) => {
	const [cData, setCData] = useState({});
	const [deleteModal, setDeleteModal] = useState(false);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(false);

	let data, setData;

	if (title === 'Add') {
		data = cData;
		setData = setCData;
	} else {
		data = propData;
		setData = setPropData;
	}

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		setLoading(true);

		const _data = {
			...data,
			deductible: nwoc(data?.deductible),
			policyCost: nwoc(data?.policyCost),
			liabilityCoverage: nwoc(data?.liabilityCoverage),
			propertyCoverage: nwoc(data?.propertyCoverage),
			administrationFee: nwoc(data?.administrationFee),
			endData: data?.onGoing ? null : data?.endData,
			images,
			attachments: docs,
		};
		e.preventDefault();
		const insurance = await dispatch(NewInsurance(title, _data));
		console.log('insruacne from dispatch', insurance);
		setLoading(false);
		setData({});
		handleClose(insurance);
	};
	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteInsurance(data));
		setLoading(false);
		handleClose();
		setDeleteModal(false);
	};

	const handleAgreement = (images) => {
		setAttachmentModal(false);
		setImages(images);
	};

	useEffect(() => {
		setData({
			...data,
			agreementImages: images,
		});
	}, [images]);

	useEffect(() => {
		if (data?.images) setImages([...data.agreementImages]);
		if (data?.attachments) setDocs([...data?.attachments]);
	}, [open]);

	const typeOptions = [
		'Fire',
		'Flood',
		'Renters',
		'Landlord',
		'Earthquake',
		'Supplemental',
		'Other',
	];
	return (
		<>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox>
								<Typography variant='h6' component='h2' fontWeight='bold'>
									{title} Insurance
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
											placeholder='Insurance Name'
											variant='outlined'
											fullWidth
											value={data?.name}
											required
										/>
										{data?.name && <CustomLabel label={'Insurance Name'} />}
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											id='type-autocomplete'
											options={typeOptions}
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

												// const { inputValue } = params;
												const inputValue = params.inputValue;
												// Suggest the creation of a new value
												const isExisting = types.some(
													(type) => inputValue === type
												);

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
													placeholder='Insurance Type'
													variant='outlined'
													required
												/>
											)}
										/>
										{data?.type && <CustomLabel label={'Insurance Type'} />}
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
														placeholder='Payor'
														variant='outlined'
														value={data?.payor}
														required
													/>
												);
											}}
										/>
										{data?.payor && <CustomLabel label={'Payor'} />}
									</Grid>

									<Grid item xs={12} md={6}>
										<SuiInput
											name='policyCost'
											onChange={handleChange}
											placeholder='Policy Cost'
											fullWidth
											variant='outlined'
											value={nwc(data?.policyCost)}
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											required
										/>
										{data?.policyCost && <CustomLabel label={'Policy Cost'} />}
									</Grid>

									<Grid item xs={12} md={6}>
										<SuiInput
											name='deductible'
											onChange={handleChange}
											placeholder='Deductible'
											fullWidth
											variant='outlined'
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											value={nwc(data?.deductible)}
											required
										/>
										{data?.deductible && <CustomLabel label={'Deductible'} />}
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											id='payment-timing-autocomplete'
											options={['Lump Sum', 'Monthly']}
											getOptionLabel={(paymentTiming) => `${paymentTiming}`}
											onChange={(e, paymentTiming, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															paymentTiming,
													  })
													: setData({
															...data,
															paymentTiming: '',
													  })
											}
											value={data?.paymentTiming}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														placeholder='Payment Timing'
														variant='outlined'
														value={data?.paymentTiming}
														required
													/>
												);
											}}
										/>
										{data?.paymentTiming && (
											<CustomLabel label={'Payment Timing'} />
										)}
									</Grid>

									{data?.paymentTiming === 'Monthly' && (
										<Grid item xs={12} md={6}>
											<SuiInput
												name='administrationFee'
												onChange={handleChange}
												placeholder='Administration Fee'
												fullWidth
												variant='outlined'
												value={nwc(data?.administrationFee)}
												icon={{
													component: <AttachMoneyIcon />,
													direction: 'left',
												}}
											/>
											{data?.administrationFee && (
												<CustomLabel label={'Administration Fee'} />
											)}
										</Grid>
									)}

									<Grid item xs={12} md={6}>
										<SuiInput
											name='liabilityCoverage'
											onChange={handleChange}
											placeholder='Liability Coverage'
											fullWidth
											variant='outlined'
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											value={nwc(data?.liabilityCoverage)}
											required
										/>
										{data?.liabilityCoverage && (
											<CustomLabel label={'Liability Coverage'} />
										)}
									</Grid>

									<Grid item xs={12} md={6}>
										<SuiInput
											name='propertyCoverage'
											onChange={handleChange}
											placeholder='Property Coverage'
											fullWidth
											variant='outlined'
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											value={nwc(data?.propertyCoverage)}
											required
										/>
										{data?.propertyCoverage && (
											<CustomLabel label={'Property Coverage'} />
										)}
									</Grid>
									<Grid item xs={12} md={6}>
										<SuiInput
											name='additionalCoverage'
											onChange={handleChange}
											placeholder='Additional Coverage'
											fullWidth
											variant='outlined'
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											value={nwc(data?.additionalCoverage)}
										/>
										{data?.additionalCoverage && (
											<CustomLabel label={'Additional Coverage (See Notes) '} />
										)}
									</Grid>
									<Grid item xs={12} md={12}>
										<LandlordOutlineButton
											style={{
												textAlign: 'center',
												minHeight: 40,
											}}
											color={'primary'}
											fullWidth
											disabled={!data?.name}
											onClick={() => setAttachmentModal(true)}
										>
											Attach Agreement
										</LandlordOutlineButton>
										<CustomLabel
											label={
												<>
													<div>
														{images?.length > 0 && 'Images: ' + images?.length}
													</div>
													<div>
														{docs?.length > 0 && 'Documents: ' + docs?.length}
													</div>
												</>
											}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<Autocomplete
											key={data?.property}
											id='property-autocomplete'
											options={properties}
											getOptionLabel={(property) => `${property.propertyName}`}
											onChange={(e, property, reason) => {
												setData({
													...data,
													room: '',
												});
												reason === 'selectOption'
													? setData({
															...data,
															property: property?._id,
															propertyName: property?.propertyName,
													  })
													: setData({
															...data,
															property: '',
															propertyName: '',
													  });
											}}
											// disabled={stateCities.length === 0}
											renderInput={(params) => {
												const param = {
													...params,
													inputProps: {
														...params.inputProps,
														value:
															data.property?.propertyName !== undefined
																? data.property.propertyName
																: data.propertyName,
													},
												};

												return (
													<TextField
														{...param}
														placeholder='Property'
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.property && <CustomLabel label={'Property'} />}
									</Grid>

									<Grid item md={12}>
										<Box display={'flex'} columnGap={2} width={'100%'}>
											{/* <Box
													display={'flex'}
													flexDirection={'column'}
													width={'100%'}
												>
													<SuiDatePicker
														input={{
															id: 'incurred-date',
															placeholder:
																'Date Incurred (One Time)',
															value: data?.date,
														}}
														onChange={([date]) => {
															setData({
																...data,
																date,
															});
														}}
													/>
													{data?.incurredDate !==
														undefined && (
														<DateLabel
															label={
																'Date Incurred (One Time)'
															}
														/>
													)}
												</Box>
												<Box
													display={'flex'}
													flexDirection={'column'}
													width={'100%'}
												>
													<SuiDatePicker
														input={{
															id: 'contract-start-date',
															placeholder:
																'Contract Start Date',
															onChange:
																handleDate,
														}}
													/>
													{data?.startDate !==
														undefined && (
														<DateLabel
															label={
																'Contract Start Date'
															}
														/>
													)}
												</Box>
												<Box
													display={'flex'}
													flexDirection={'column'}
													width={'100%'}
												>
													<SuiDatePicker
														input={{
															id: 'contract-end-date',
															placeholder:
																'Contract End Date',
														}}
														onChange={(
															array,
															endDate
														) => {
															handleDate(
																'endDate',
																endDate
															);
														}}
													/>
													{data?.endDate !==
														undefined &&
														data?.endDate ===
															'' && (
															<DateLabel
																label={
																	'Contract End Date'
																}
															/>
														)}
												</Box> */}
											{/* <Box
													display={'flex'}
													flexDirection={'column'}
												>
													<LocalizationProvider
														dateAdapter={
															AdapterDateFns
														}
													>
														<DatePicker
															placeholder='Date Incurred (One Time)'
															onChange={(
																value
															) => {
																setData({
																	...data,
																	incurredDate:
																		String(
																			value
																		),
																});
															}}
															value={
																data?.incurredDate
															}
															renderInput={(
																params
															) => (
																<TextField
																	fullWidth
																	{...params}
																	required
																/>
															)}
														/>
													</LocalizationProvider>
													<DateLabel
														label={
															'Date Incurred (One Time)'
														}
													/>
												</Box> */}

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
														renderInput={(params) => (
															<TextField fullWidth {...params} />
														)}
													/>
												</LocalizationProvider>
												<DateLabel label={'Contract Start Date'} />
											</Box>
											<Box
												display={'flex'}
												flexDirection={'column'}
												width={'100%'}
											></Box>
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
														key={data?.onGoing}
														disabled={data?.onGoing}
														renderInput={(params) => (
															<TextField fullWidth {...params} />
														)}
													/>
												</LocalizationProvider>
												<DateLabel label={'Contract End Date'} />
												<Box
													display={'flex'}
													alignItems={'center'}
													justifyContent={'flex-end'}
												>
													<FormGroup>
														<FormControlLabel
															control={
																<Checkbox
																	checked={data?.onGoing === true}
																	onChange={(e, val) => {
																		if (val) {
																			setData({
																				...data,
																				onGoing: true,
																			});
																		} else {
																			setData({
																				...data,
																				onGoing: false,
																			});
																		}
																	}}
																/>
															}
															label={
																<Box
																	display={'flex'}
																	alignItems={'center'}
																	variant={'span'}
																>
																	<Typography
																		variant={'span'}
																		fontWeight={'normal'}
																	>
																		{'On Going'}
																	</Typography>
																</Box>
															}
														/>
													</FormGroup>
												</Box>
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
											style={{
												width: '100%',
												marginTop: '-5px',
											}}
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
			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Remove Insurance Item'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Insurance item. You acknowledge and
						understand that once deleted, the data tied to this item will be
						gone forever. This will affect the Properties and your overall
						portfolio's financials as well.
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
			{/* <AttachementModal
				open={attachementModal}
				onClose={(images) => handleAgreement(images)}
				insuranceName={data?.name}
				thumbnailImages={data?.agreementImages}
			/> */}
			<ImageDocumentModal
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
				setImages={setImages}
				setDocs={setDocs}
				images={images}
				docs={docs}
				parent={'Insurance'}
			/>
		</>
	);
};

export default AddInsurance;
