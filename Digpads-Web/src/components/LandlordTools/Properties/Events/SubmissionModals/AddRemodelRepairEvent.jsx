import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	InputAdornment,
	TextareaAutosize,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CustomLabel from '../../Utils/DateLabel';

import {
	Close,
	AttachMoney as AttachMoneyIcon,
	Timelapse as HoursIcon,
	DateRange as DaysIcon,
	Foundation as MaterialIcon,
	Construction as LaborIcon,
	ReceiptLong as PermitIcon,
	HourglassEmpty as HourGlassIcon,
	Paid as TotalIcon,
} from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AttachementModal from './AttachmentModal';
import { useDispatch } from 'react-redux';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import ScheduleFields from './ScheduleFields';
import SuiInput from 'components/SuiInput';
import { nwc, nwoc } from 'utils/NumberUtils';
import { LandlordTextButton } from 'components/styled/Button';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import colors from 'assets/theme/base/colors';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import AttachmentButton from '../../Utils/AttachmentButton';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';

// import {
// 	DeleteInsurance,
// 	NewInsurance,
// } from '../../../../store/actions/Property/insuranceAction';

const AddRemodelRepairEvent = ({
	title,
	open,
	handleClose,
	classes,
	styles,
	selectedData,
	room,
	dialogData,
	property,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [warningModal, setWarningModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	// const dispatch = useDispatch();
	const filter = createFilterOptions();
	const dispatch = useDispatch();

	useEffect(() => {
		setData({
			...data,
			images,
		});
		//eslint-disable-next-line
	}, [images]);

	useEffect(() => {
		if (data?.images) setImages([...data.images]);
		//eslint-disable-next-line
	}, [open]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const _data = {
			...data,
			images,
			attachments: docs,
		};
		const body = {
			property: property?._id,
			location: selectedData?.parent,
			parentData: selectedData?.data,
			room,
			eventTag: 'Action',
			eventAction: data?.completed === 'true',
			eventType: selectedData?.event,
			eventNature: nature,
			eventData: {
				newData: { ..._data },
				repairRemodelType: dialogData,
				oldData: selectedData?.data,
				..._data,
			},
		};
		console.log(body);
		// closeParentModals();
		// handleClose();
		// await dispatch(NewInsurance(title, data));
		// setData({});
		// handleClose();
		await dispatch(NewEvent(title, body));
		setLoading(false);
		setData({});
		closeParentModals();
		handleClose();
	};

	const calculateTotalCost = () => {
		let total = 0,
			laborCosts = 0;
		switch (selectedData?.type) {
			case 'Bid':
				console.log('calculating total for bid');
				switch (data?.model) {
					case 'Fixed Amount':
						total =
							Number(nwoc(data?.materialCosts) || 0) +
							Number(nwoc(data?.laborCosts) || 0) +
							Number(nwoc(data?.permitCosts) || 0);
						console.log('total', total);
						setData({
							...data,
							totalCosts: total,
						});
						break;
					case 'Hourly Bid':
						laborCosts =
							Number(nwoc(data?.hourlyRate) || 0) *
							Number(nwoc(data?.hoursToComplete) || 0);
						total =
							Number(nwoc(data?.materialCosts) || 0) +
							(laborCosts || 0) +
							Number(nwoc(data?.permitCosts) || 0);
						console.log('total', total);
						setData({
							...data,
							totalCosts: total,
							laborCosts,
						});
				}
				break;
			case 'Service':
				console.log('calculating total for service');
				break;
			default:
				console.log(
					'wrong typ recieved for calculating total... ->',
					selectedData?.type
				);
		}
	};

	useEffect(() => {
		calculateTotalCost();
	}, [
		data?.permitCosts,
		data?.materialCosts,
		data?.laborCosts,
		data?.model,
		data?.hoursToComplete,
		data?.hourlyRate,
	]);

	const checkWarning = () => {
		if (data?.model === 'Hourly Bid') {
			if (data?.hourlyRate === 0 || !data?.hourlyRate) {
				setWarningModal(true);
			}
		}
	};

	useEffect(() => {
		checkWarning();
	}, [data?.model]);

	const renderForm = () => {
		let form;
		switch (selectedData?.type) {
			case 'Bid':
				form = (
					<>
						<Grid item xs={12} md={12}>
							<TextField
								name='name'
								onChange={handleChange}
								placeholder='Job Name'
								variant='outlined'
								fullWidth
								value={data?.name}
								required
							/>
							{data?.name && <CustomLabel label={'Name'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									placeholder='Date Bid Received'
									onChange={(value) => {
										setData({
											...data,
											bidDate: String(value),
										});
									}}
									value={data?.bidDate}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</LocalizationProvider>
							<CustomLabel label={'Date Bid Received'} />
						</Grid>
						<Grid item xs={12} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									placeholder='Proposed Start Date'
									onChange={(value) => {
										setData({
											...data,
											startDate: String(value),
										});
									}}
									value={data?.startDate}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</LocalizationProvider>
							<CustomLabel label={'Proposed Start Date'} />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name='contractor'
								onChange={handleChange}
								placeholder='Contractor'
								variant='outlined'
								fullWidth
								value={data?.contractor}
								required
							/>
							{data?.contractor && <CustomLabel label={'Contractor'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='bounded-autocomplete'
								options={['Yes', 'No']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, bounded, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												bounded,
										  })
										: setData({
												...data,
												bounded: '',
										  })
								}
								value={data?.bounded}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.bounded}
											placeholder='Bounded'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.bounded && <CustomLabel label={'Bounded'} />}
						</Grid>

						<Grid item xs={12} md={6}>
							<Autocomplete
								id='licensed-autocomplete'
								options={['Yes', 'No']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, licensed, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												licensed,
										  })
										: setData({
												...data,
												licensed: '',
										  })
								}
								value={data?.licensed}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.licensed}
											placeholder='Licensed'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.licensed && <CustomLabel label={'Licensed'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='insured-autocomplete'
								options={['Yes', 'No']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, insured, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												insured,
										  })
										: setData({
												...data,
												insured: '',
										  })
								}
								value={data?.insured}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.insured}
											placeholder='Insured'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.insured && <CustomLabel label={'Insured'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='daysToComplete'
								onChange={handleChange}
								placeholder='Days To Complete'
								fullWidth
								variant='outlined'
								value={nwc(data?.daysToComplete)}
								icon={{
									component: <DaysIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.daysToComplete && (
								<CustomLabel label={'Days To Complete'} />
							)}
						</Grid>

						<Grid item xs={12} md={6}>
							<SuiInput
								name='materialCosts'
								onChange={handleChange}
								placeholder='Material Cost'
								fullWidth
								variant='outlined'
								value={nwc(data?.materialCosts)}
								icon={{
									component: <MaterialIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.materialCosts && <CustomLabel label={'Material Cost'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='laborCosts'
								onChange={(e) => {
									if (data?.model === 'Hourly Bid') {
										return;
									} else {
										handleChange(e);
									}
								}}
								placeholder='Labor Costs'
								fullWidth
								variant='outlined'
								value={nwc(data?.laborCosts)}
								icon={{
									component: <LaborIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.laborCosts !== null && data?.laborCosts !== 0 && (
								<CustomLabel label={'Labor Costs'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='permitCosts'
								onChange={handleChange}
								placeholder='Permit &#38; Other Costs'
								fullWidth
								variant='outlined'
								value={nwc(data?.permitCosts)}
								icon={{
									component: <PermitIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.permitCosts && (
								<CustomLabel label={'Permit & Other Costs'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='model-autocomplete'
								options={['Fixed Amount', 'Hourly Bid']}
								getOptionLabel={(option) => `${option}`}
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
											placeholder='Fixed Amount/Hourly Bid'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.model && <CustomLabel label={'Fixed Amount/Hourly Bid'} />}
						</Grid>

						{data?.model === 'Hourly Bid' && (
							<React.Fragment>
								<Grid item xs={12} md={6}>
									<SuiInput
										name='hourlyRate'
										onChange={handleChange}
										placeholder='Hourly Rate'
										fullWidth
										variant='outlined'
										value={nwc(data?.hourlyRate)}
										icon={{
											component: <HourGlassIcon />,
											direction: 'left',
										}}
										required
									/>
									{data?.hourlyRate && <CustomLabel label={'Hourly Rate'} />}
								</Grid>
								<Grid item xs={12} md={6}>
									<SuiInput
										name='hoursToComplete'
										onChange={handleChange}
										placeholder='Hours To Complete'
										fullWidth
										variant='outlined'
										value={nwc(data?.hoursToComplete)}
										icon={{
											component: <HoursIcon />,
											direction: 'left',
										}}
										required
									/>

									{data?.hoursToComplete && (
										<CustomLabel label={'Hours To Complete'} />
									)}
								</Grid>
							</React.Fragment>
						)}

						<Grid item xs={12} md={6}>
							<SuiInput
								name='totalCosts'
								placeholder='Total Costs'
								fullWidth
								variant='outlined'
								value={nwc(data?.totalCosts) || 0}
								icon={{
									component: <TotalIcon />,
									direction: 'left',
								}}
								InputProps={{
									readOnly: true,
								}}
							/>

							<CustomLabel label={'Total Costs'} />
						</Grid>
						<Grid item xs={12}>
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
					</>
				);
				break;
			case 'Service':
				form = (
					<>
						<Grid item xs={12} md={12}>
							<TextField
								name='name'
								onChange={handleChange}
								placeholder='Job Name'
								variant='outlined'
								fullWidth
								value={data?.name}
								required
							/>
							{data?.name && <CustomLabel label={'Name'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									placeholder='Date New/Remodeled'
									onChange={(value) => {
										setData({
											...data,
											remodelDate: String(value),
										});
									}}
									value={data?.remodelDate}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</LocalizationProvider>
							<CustomLabel label={'Date New/Remodeled'} />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name='condition'
								onChange={handleChange}
								placeholder='Condition'
								variant='outlined'
								fullWidth
								value={data?.condition}
								required
							/>

							{data?.condition && <CustomLabel label={'Condition'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name='supplier'
								onChange={handleChange}
								placeholder='Manufacturer/Supplier'
								variant='outlined'
								fullWidth
								value={data?.supplier}
								required
							/>
							{data?.supplier && (
								<CustomLabel label={'Manufacturer/Supplier'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									placeholder='Purchased At'
									onChange={(value) => {
										setData({
											...data,
											purchasedAt: String(value),
										});
									}}
									value={data?.purchasedAt}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</LocalizationProvider>
							{data?.purchasedAt && <CustomLabel label={'Purchased At'} />}
						</Grid>

						<Grid item xs={12} md={6}>
							<TextField
								name='contractor'
								onChange={handleChange}
								placeholder='Contractor'
								variant='outlined'
								fullWidth
								value={data?.contractor}
								required
							/>
							{data?.contractor && <CustomLabel label={'Contractor'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='reason-autocomplete'
								options={[
									'Age/Wear Tear',
									'Tenant Damage',
									'Weather',
									'No Fault Damage',
									'Unknown',
									'Other',
								]}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, reason, selectAction) =>
									selectAction === 'selectOption'
										? setData({
												...data,
												reason,
										  })
										: setData({
												...data,
												reason: '',
										  })
								}
								value={data?.reason}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.deductible}
											placeholder='Replacement Reason'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.reason && <CustomLabel label={'Replacement Reason'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='daysToComplete'
								onChange={handleChange}
								placeholder='Days To Complete'
								fullWidth
								variant='outlined'
								value={nwc(data?.daysToComplete)}
								icon={{
									component: <DaysIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.daysToComplete && (
								<CustomLabel label={'Days To Complete'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name='hoursToComplete'
								onChange={handleChange}
								placeholder='Hours to Complete'
								variant='outlined'
								fullWidth
								type={'number'}
								value={data?.hoursToComplete}
								required
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='materialCosts'
								onChange={handleChange}
								placeholder='Material Cost'
								fullWidth
								variant='outlined'
								value={nwc(data?.materialCosts)}
								icon={{
									component: <MaterialIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.materialCosts && <CustomLabel label={'Material Cost'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='laborCosts'
								onChange={(e) => {
									if (data?.model === 'Hourly Bid') {
										return;
									} else {
										handleChange(e);
									}
								}}
								placeholder='Labor Costs'
								fullWidth
								variant='outlined'
								value={nwc(data?.laborCosts)}
								icon={{
									component: <LaborIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.laborCosts !== null && data?.laborCosts !== 0 && (
								<CustomLabel label={'Labor Costs'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='permitCosts'
								onChange={handleChange}
								placeholder='Permit &#38; Other Costs'
								fullWidth
								variant='outlined'
								value={nwc(data?.permitCosts)}
								icon={{
									component: <PermitIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.permitCosts && (
								<CustomLabel label={'Permit & Other Costs'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='model-autocomplete'
								options={['Fixed Amount', 'Hourly Bid']}
								getOptionLabel={(option) => `${option}`}
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
											placeholder='Fixed Amount/Hourly Bid'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.model && <CustomLabel label={'Fixed Amount/Hourly Bid'} />}
						</Grid>

						{data?.model === 'Hourly Bid' && (
							<React.Fragment>
								<Grid item xs={12} md={6}>
									<SuiInput
										name='hourlyRate'
										onChange={handleChange}
										placeholder='Hourly Rate'
										fullWidth
										variant='outlined'
										value={nwc(data?.hourlyRate)}
										icon={{
											component: <HourGlassIcon />,
											direction: 'left',
										}}
										required
									/>
									{data?.hourlyRate && <CustomLabel label={'Hourly Rate'} />}
								</Grid>
								<Grid item xs={12} md={6}>
									<SuiInput
										name='hoursToComplete'
										onChange={handleChange}
										placeholder='Hours To Complete'
										fullWidth
										variant='outlined'
										value={nwc(data?.hoursToComplete)}
										icon={{
											component: <HoursIcon />,
											direction: 'left',
										}}
										required
									/>

									{data?.hoursToComplete && (
										<CustomLabel label={'Hours To Complete'} />
									)}
								</Grid>
							</React.Fragment>
						)}

						<Grid item xs={12} md={6}>
							<SuiInput
								name='totalCosts'
								placeholder='Total Costs'
								fullWidth
								variant='outlined'
								value={nwc(data?.totalCosts) || 0}
								icon={{
									component: <TotalIcon />,
									direction: 'left',
								}}
								InputProps={{
									readOnly: true,
								}}
							/>

							<CustomLabel label={'Total Costs'} />
						</Grid>

						<Grid item xs={12} md={6}>
							<Autocomplete
								placeholder={'Type Material Types here'}
								multiple
								id='material-types-autocomplete'
								options={[]}
								value={data?.materialTypes}
								fullWidth
								noOptionsText={'Type to add material types.'}
								onChange={(event, materialTypes) => {
									// console.log(event, type);
									if (typeof materialTypes === 'string') {
										console.log('string');
										setData({
											...data,
											materialTypes,
										});
									} else if (materialTypes && materialTypes.inputValue) {
										// Create a new value from the user input
										console.log('input value');
										setData({
											...data,
											type: materialTypes.inputValue,
										});
									} else {
										console.log('the else');
										setData({
											...data,
											materialTypes,
										});
									}
								}}
								filterOptions={(types, params) => {
									const filtered = filter(types, params);
									// const { inputValue } = params;
									const inputValue = params.inputValue;
									// Suggest the creation of a new value
									const isExisting = types.some((type) => inputValue === type);
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
								renderOption={(props, option) => <li {...props}>{option}</li>}
								renderInput={(params) => (
									// <TextField
									// 	{...params}
									// 	label='Free solo with text demo'
									// />
									<>
										<TextField
											{...params}
											placeholder='Type Material Types here'
											variant='outlined'
											value={data?.materialTypes}
										/>
										<Typography
											component={'small'}
											variant={'small'}
											fontSize={11}
										>
											You can type custom multiple material types here.
										</Typography>
									</>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								placeholder={'Type Tools Required here'}
								multiple
								id='tools-required-autocomplete'
								options={[]}
								value={data?.toolsRequired}
								fullWidth
								noOptionsText={'Type to add required tools.'}
								onChange={(event, toolsRequired) => {
									// console.log(event, type);
									if (typeof toolsRequired === 'string') {
										console.log('string');
										setData({
											...data,
											toolsRequired,
										});
									} else if (toolsRequired && toolsRequired.inputValue) {
										// Create a new value from the user input
										console.log('input value');
										setData({
											...data,
											type: toolsRequired.inputValue,
										});
									} else {
										console.log('the else');
										setData({
											...data,
											toolsRequired,
										});
									}
								}}
								filterOptions={(types, params) => {
									const filtered = filter(types, params);
									// const { inputValue } = params;
									const inputValue = params.inputValue;
									// Suggest the creation of a new value
									const isExisting = types.some((type) => inputValue === type);
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
								renderOption={(props, option) => <li {...props}>{option}</li>}
								renderInput={(params) => (
									// <TextField
									// 	{...params}
									// 	label='Free solo with text demo'
									// />
									<>
										<TextField
											{...params}
											placeholder={'Type Tools Required here'}
											variant='outlined'
											value={data?.toolsRequired}
										/>
										<Typography
											component={'small'}
											variant={'small'}
											fontSize={11}
										>
											You can type custom multiple tools required here.
										</Typography>
									</>
								)}
							/>
						</Grid>
						{/* <Grid item xs={12} md={6}>
							<Autocomplete
								
								id='paid-model-autocomplete'
								options={['One Time', 'Recurring']}
								getOptionLabel={(option) => `${option}`}
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
											placeholder='One Time/Recurring'
											variant='outlined'
											required
										/>
									);
								}}
							/>
						</Grid>
						{data?.model === 'Recurring' && (
							<Grid item xs={12} md={6}>
								<Autocomplete
									
									id='recurring-autocomplete'
									options={[
										'Fist Day of Month',
										'Last Day of Month',
										'On Day of Month',
										'Once a Week Day',
										'Quarterly on Day',
										'Bi-Annually on Day',
										'Annually on Day',
									]}
									getOptionLabel={(option) => `${option}`}
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
												value={data?.frequency}
												placeholder='Recurring Frequency'
												variant='outlined'
												required
											/>
										);
									}}
								/>
							</Grid>
						)} */}
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='status-autocomplete'
								options={['Paid', 'Un-Paid']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, status, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												status,
										  })
										: setData({
												...data,
												status: '',
										  })
								}
								value={data?.status}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.status}
											placeholder='Status'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.status && <CustomLabel label={'Status'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='cost-accounting-autocomplete'
								options={['Incur Cost Now', 'Amortize Cost Over Time']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, costAccounting, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												costAccounting,
										  })
										: setData({
												...data,
												costAccounting: '',
										  })
								}
								value={data?.costAccounting}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.costAccounting}
											placeholder='Cost Accounting'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.costAccounting && (
								<CustomLabel label={'Cost Accounting'} />
							)}
						</Grid>
						<Grid item xs={12}>
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
					</>
				);
				break;
			default:
				form = null;
				break;
		}
		return form;
	};

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='h4' component='h2' fontWeight='bold'>
									{title}
								</Typography>
								<div onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</div>
							</Box>
							{selectedData?.parent !== 'None' && (
								<Box p={2} border={'1px solid #ccc'}>
									<Typography variant={'h5'} component={'h2'} fontWeight='bold'>
										{selectedData?.data?.name}
									</Typography>
									<Typography
										variant={'h6'}
										component={'h3'}
										color={colors?.primary?.main}
										fontWeight={'bold'}
									>
										{selectedData?.parent}
									</Typography>
								</Box>
							)}
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									{renderForm()}
									<Grid item xs={12} md={12} mb={3}>
										<AttachmentButton
											docs={docs}
											images={images}
											uploadHandler={(_) => setAttachmentModal(true)}
										/>
									</Grid>
									<ScheduleFields
										data={data}
										setData={setData}
										nature={nature}
									/>
									{/* <Grid item xs={12} md={12}>
										<Typography
											component={'h3'}
											variant={'h6'}
											fontWeight={'bold'}
										>
											Bid Rating
										</Typography>
									</Grid> */}
									<Grid container justifyContent={'space-around'}>
										<LandlordButton
											variant='contained'
											style={{
												marginBottom: 16,
												paddingLeft: 16,
												paddingRight: 16,
												minWidth: 160,
												textAlign: 'center',
											}}
											color='success'
											// onClick={handleSubmit}
											type='submit'
											// disabled={Object.values(data).length <= 11}
										>
											{loading ? <LandlordLoading /> : 'Save'}
										</LandlordButton>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<Dialog
				open={warningModal}
				onClose={() => setWarningModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Missing Hourly Rate'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please add an Hourly Rate or to choose Fixed Bid and enter a Fixed
						Labor Costs amount to proceed.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordTextButton
						onClick={() => setWarningModal(false)}
						autoFocus
						color={'primary'}
					>
						Continue
					</LandlordTextButton>
				</DialogActions>
			</Dialog>

			<ImageDocumentModal
				images={images}
				docs={docs}
				setImages={setImages}
				setDocs={setDocs}
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
			/>
		</>
	);
};

export default AddRemodelRepairEvent;
