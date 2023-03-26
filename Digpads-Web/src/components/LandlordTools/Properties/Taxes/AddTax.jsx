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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SuiInput from 'components/SuiInput';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { nwc, nwoc } from 'utils/NumberUtils';
import { useDispatch } from 'react-redux';
// import LateFeesModal from './LateFeesModal';
import {
	DeleteTax,
	NewTax,
} from '../../../../store/actions/Property/taxAction';
import { modalBoxStyles } from '../../../styled/Modal';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import CustomLabel from '../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { LandlordOutlineButton } from 'components/styled/Button';
import ImageDocumentModal from '../Utils/ImageDocumentModal';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const PREFIX = 'AddTax';

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

const AddTax = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	properties,
}) => {
	const [cData, setCData] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [feeData, setFeeData] = useState({});
	const dispatch = useDispatch();

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

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const _data = {
			...data,
			amount: nwoc(data?.amount),
			images,
			attachments: docs,
		};
		console.log(_data);
		await dispatch(NewTax(title, _data));
		setData({});
		setLoading(false);
		handleClose();
	};
	const handleDelete = async () => {
		setLoading(true);
		dispatch(DeleteTax(data));
		handleClose();
		setLoading(false);
		setDeleteModal(false);
	};

	useEffect(() => {
		if (data?.images) setImages([...data?.images]);
		if (data?.attachments) setDocs([...data?.attachments]);
		//eslint-disable-next-line
	}, [open]);

	const typeOptions = ['Federal', 'State', 'Local', 'Property', 'Other'];

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
								>
									{title} Tax
								</Typography>
								<CloseBox onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Box sx={{ mt: 2 }}>
								<Grid
									container
									rowSpacing={1.5}
									columnSpacing={2}
								>
									<Grid item xs={12} md={6}>
										<TextField
											name='name'
											onChange={handleChange}
											placeholder='Tax Name'
											variant='outlined'
											fullWidth
											value={data?.name}
											required
										/>
										{data?.name && (
											<CustomLabel label={'Tax Name'} />
										)}
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											placeholder='Tax Type'
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
											filterOptions={(types, params) => {
												const filtered = filter(
													types,
													params
												);

												// const { inputValue } = params;
												const inputValue =
													params.inputValue;
												// Suggest the creation of a new value
												const isExisting = types.some(
													(type) =>
														inputValue === type
												);

												if (
													inputValue !== '' &&
													!isExisting
												) {
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
												if (
													typeof option === 'string'
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
													placeholder='Tax Type'
													variant='outlined'
													required
													value={data?.type}
												/>
											)}
										/>
										{data?.type && (
											<CustomLabel label={'Tax Type'} />
										)}
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name='entity'
											onChange={handleChange}
											placeholder='Enitity Owed To'
											variant='outlined'
											fullWidth
											value={data?.entity}
											required
										/>
										{data?.entity && (
											<CustomLabel
												label={'Enitity Owed To'}
											/>
										)}
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
										{data?.amount && (
											<CustomLabel label={'Amount'} />
										)}
									</Grid>
									{/* <Grid item xs={12} md={6}>
											<Button
												variant='text'
												style={{
													paddingLeft: 16,
													paddingRight: 16,

													textAlign: 'center',
												}}
												fullWidth
												disabled={
													data?.name === undefined ||
													data?.name === null
												}
												onClick={() =>
													setLateFeeModal(true)
												}
											>
												Late Fees
											</Button>
										</Grid> */}
									<Grid item xs={12} md={6}>
										<Autocomplete
											placeholder='Timing of Payment'
											id='timing-of-payment-autocomplete'
											options={[
												'Due Date',
												'Monthly with Mortgage',
											]}
											getOptionLabel={(option) =>
												`${option}`
											}
											value={data?.timingOfPayment}
											onChange={(
												e,
												timingOfPayment,
												reason
											) =>
												reason === 'selectOption'
													? setData({
															...data,
															timingOfPayment,
													  })
													: setData({
															...data,
															timingOfPayment: '',
													  })
											}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={
															data?.timingOfPayment
														}
														placeholder='Timing Of Payment'
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.timingOfPayment && (
											<CustomLabel
												label={'Timing of Payment'}
											/>
										)}
									</Grid>
									<Grid item xs={12} md={3}>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												views={['year']}
												placeholder='Tax Year'
												value={data?.year}
												onChange={(value) => {
													setData({
														...data,
														year: String(value),
													});
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														helperText={null}
														required
														value={data?.year}
													/>
												)}
												style={{
													width: '100%',
												}}
											/>
										</LocalizationProvider>
										<CustomLabel label={'Tax Year'} />
									</Grid>
									<Grid item xs={12} md={3}>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												placeholder='Due Date'
												onChange={(value) => {
													setData({
														...data,
														incurredDate:
															String(value),
													});
												}}
												value={data?.dueDate}
												renderInput={(params) => (
													<TextField
														fullWidth
														{...params}
														required
													/>
												)}
											/>
										</LocalizationProvider>
										<CustomLabel label={'Due Date'} />
									</Grid>
									<Grid item xs={12} md={12}>
										<Autocomplete
											placeholder='Property'
											id='property-autocomplete'
											options={properties}
											getOptionLabel={(property) =>
												`${property.propertyName}`
											}
											value={data?.property}
											onChange={(e, property, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															property,
													  })
													: setData({
															...data,
															property: null,
													  })
											}
											// disabled={stateCities.length === 0}
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
											<CustomLabel label={'Property'} />
										)}
									</Grid>
									<Grid item xs={12} md={12}>
										<LandlordOutlineButton
											variant={'outline'}
											color={'primary'}
											sx={{
												width: '100%',
											}}
											onClick={() =>
												setAttachmentModal(true)
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
														{images?.length > 0 &&
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
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Remove Tax Item'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Tax item. You acknowledge
						and understand that once deleted, the data tied to this
						item will be gone forever. This will affect the
						Properties and your overall portfolio's financials as
						well.
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
			{/* <LateFeesModal
				open={lateFeeModal}
				onClose={() => setLateFeeModal(false)}
				feeData={feeData}
				setFeeData={setFeeData}
				onSave={(lateFees) => {
					setData({ ...data, lateFees });
					setLateFeeModal(false);
				}}
			/> */}

			<ImageDocumentModal
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
				docs={docs}
				images={images}
				setDocs={setDocs}
				setImages={setImages}
			/>
		</Root>
	);
};

export default AddTax;
