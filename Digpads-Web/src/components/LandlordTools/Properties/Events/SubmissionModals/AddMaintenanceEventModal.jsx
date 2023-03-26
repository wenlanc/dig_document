import React, { useEffect, useCallback, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Rating,
	styled,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
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
import { useDispatch } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import CustomLabel from '../../Utils/DateLabel';
import SuiInput from 'components/SuiInput';
import { nwc, nwoc } from 'utils/NumberUtils';
import { LandlordTextButton, LandlordButton } from 'components/styled/Button';
import { useSelector } from 'react-redux';
import colors from 'assets/theme/base/colors';
import './MaintenanceEventStyles.css';
import ScheduleFields from './ScheduleFields';
import {
	StyledMUIModal,
	ModalPaper,
	ModalBox,
} from 'components/MuiStyled/Global';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import AttachmentButton from '../../Utils/AttachmentButton';

const AddMaintenanceEventModal = ({
	title,
	open,
	handleClose,
	classes,
	styles,
	selectedData,
	property,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState();
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [pullDataModal, setPullDataModal] = useState(false);
	const [warningModal, setWarningModal] = useState(false);
	const [bidEvents, setBidEvents] = useState([]);
	const [selectedBid, setSelectedBid] = useState(null);
	const { data: eventList } = useSelector((state) => state.EventList);
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();
	const filter = createFilterOptions();

	useEffect(() => {
		console.log('selected got ', selectedData);
		setData({
			...data,
			model: selectedData?.type === 'Bid' ? 'Fixed Amount' : null,
		});
		if (selectedData?.type === 'Service') {
			const _bidEvents = eventList.filter(
				(event) => event.eventData?.maintenanceEventType === 'Bid'
			);
			console.log('_bid events ', _bidEvents);
			setBidEvents(_bidEvents);
			setPullDataModal(true);
		}
	}, [selectedData]);

	useEffect(() => {
		setData({
			...data,
			images,
		});
		//eslint-disable-next-line
	}, [images]);

	useEffect(() => {
		if (data?.images) setImages([...data.images]);
		setSelectedBid(null);
		//eslint-disable-next-line
	}, [open]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			property: property?._id,
			location:
				selectedData?.parent === 'None' ? 'Property' : selectedData?.parent,
			parentName: selectedData?.type,
			parentData: selectedData?.data,
			eventTag: 'Action',
			eventAction: data?.completed === 'true',
			eventType: selectedData.event,
			eventNature: nature,
			secondaryType: 'Maintenance',
			eventData: {
				...data,
				maintenanceEventType: selectedData?.type,
				images,
				attachments: docs,
			},
		};
		console.log(body);
		await dispatch(NewEvent(title, body));
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

	useEffect(() => {
		console.log('selected bid changed \n', selectedBid);
		if (selectedBid?.eventData?.name === 'None') {
			setData({});
			return;
		} else {
			setData({
				...selectedBid?.eventData,
				condition: selectedData?.data?.condition,
			});
		}
	}, [selectedBid]);

	const renderForm = () => {
		let form;
		if (pullDataModal) return;
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
							{data?.name && <CustomLabel label={'Job Name'} />}
						</Grid>
						<Grid item xs={12} md={4}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									style={{
										width: '100% !important',
									}}
									placeholder='Date Bid Received'
									onChange={(value) => {
										setData({
											...data,
											receivedDate: String(value),
										});
									}}
									value={data?.receivedDate}
									renderInput={(params) => (
										<TextField
											fullWidth
											style={{
												width: '100% !important',
											}}
											{...params}
										/>
									)}
								/>
							</LocalizationProvider>
							<CustomLabel label={'Date Bid Received'} />
						</Grid>
						<Grid item xs={12} md={4}>
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
									renderInput={(params) => <TextField fullWidth {...params} />}
								/>
							</LocalizationProvider>
							<CustomLabel label={'Proposed Start Date'} />
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								name='contractor'
								onChange={handleChange}
								placeholder='Contractor Name'
								fullWidth
								value={data?.contractor}
								required
							/>
							{data?.contractor && <CustomLabel label={'Contractor Name'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='bonded-autocomplete'
								options={['Yes', 'No']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, bonded, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												bonded,
										  })
										: setData({
												...data,
												bonded: '',
										  })
								}
								value={data?.bonded}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.bonded}
											placeholder='Bonded'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.bonded && <CustomLabel label={'Bonded'} />}
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
							<SuiInput
								name='insuredAmount'
								onChange={handleChange}
								placeholder='Insured Amount'
								fullWidth
								variant='outlined'
								value={nwc(data?.insuredAmount)}
								icon={{
									component: <AttachMoneyIcon />,
									direction: 'left',
								}}
							/>

							{data?.insuredAmount && <CustomLabel label={'Insured Amount'} />}
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
							{data?.name && <CustomLabel label={'Job Name'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								{/* <DatePicker
									placeholder='Date New/Remodeled'
									onChange={(value) => {
										setData({
											...data,
											remodelDate: String(value),
										});
									}}
									value={data?.remodelDate}
									
									renderInput={(params) => (
										<TextField {...params} fullWidth />
									)}
								/> */}
								<DatePicker
									placeholder='Date Bid Received'
									onChange={(value) => {
										setData({
											...data,
											receivedDate: String(value),
										});
									}}
									value={data?.receivedDate}
									renderInput={(params) => <TextField fullWidth {...params} />}
								/>
							</LocalizationProvider>
							<CustomLabel label={'Date New/Remodeled'} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='condition-autocomplete'
								options={['New', 'Very Good', 'Good', 'Fair', 'Poor']}
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
								value={data?.condition}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.condition}
											placeholder='Condition'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.condition && <CustomLabel label={'Condition'} />}
						</Grid>

						<Grid item xs={12} md={6}>
							<Box display={'flex'} flexDirection={'column'}>
								<TextField
									name='contractor'
									onChange={handleChange}
									placeholder='Contractor'
									variant='outlined'
									fullWidth
									value={data?.contractor}
									required
								/>
								<Box ml={1.5} mt={0.3}>
									<FormControlLabel
										control={
											<Checkbox
												checked={data?.contractor === 'DIY'}
												onChange={(e, val) => {
													if (val) {
														setData({
															...data,
															contractor: 'DIY',
														});
													} else {
														setData({
															...data,
															contractor: '',
														});
													}
												}}
											/>
										}
										label={
											<Typography
												variant={'small'}
												component={'small'}
												color={colors?.primary?.main}
												fontWeight={'bold'}
												fontSize={13.3}
											>
												{'Did it Myself'}
											</Typography>
										}
									/>
								</Box>
							</Box>
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
							<Autocomplete
								id='reason-autocomplete'
								options={[
									'Scheduled',
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
											value={data?.reason}
											placeholder='Maintenance Reason'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.reason && <CustomLabel label={'Maintenance Reason'} />}
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
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='paid-autocomplete'
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
						)}
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
						</Grid>
						{/* <Grid item xs={12} md={6}>
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
						</Grid> */}
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
				<ModalBox
				// className={classes.modal}
				// sx={styles}
				// style={{ height: '100%' }}
				>
					<ModalPaper sx={{ minWidth: 700 }}>
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
								<Grid container columnSpacing={2} rowSpacing={1.5}>
									{renderForm()}
									<Grid item xs={12} md={12}>
										<Typography
											component={'h3'}
											variant={'h6'}
											fontWeight={'bold'}
										>
											Bid Rating
										</Typography>
									</Grid>
									<BidRating
										data={data}
										setData={setData}
										handleChange={handleChange}
										setAttachmentModal={setAttachmentModal}
										selectedData={selectedData}
										images={images}
										docs={docs}
										setImages={setImages}
										setDocs={setDocs}
									/>

									<ScheduleFields
										data={data}
										setData={setData}
										nature={nature}
									/>
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
											type='submit'
											// onClick={handleSubmit}
											// disabled={Object.values(data).length <= 11}
										>
											Save
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

			<Dialog
				open={pullDataModal}
				onClose={() => setPullDataModal(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle
					id='alert-dialog-title'
					sx={{
						p: 3,
					}}
				>
					<Typography component={'h1'} variant={'h4'} fontWeight={'bold'}>
						{'Pull Data from Bid'}
					</Typography>
				</DialogTitle>
				<DialogContent
					sx={{
						p: 3,
						pt: 1,
					}}
				>
					<DialogContentText
						id='alert-dialog-description'
						sx={{
							pb: 3,
						}}
					>
						Would you like to record a service from a previously saved Bid?
					</DialogContentText>
					<Box>
						<Autocomplete
							id='old-bids-autocomplete'
							options={[
								...bidEvents,

								{
									eventData: {
										name: 'None',
									},
								},
							]}
							getOptionLabel={(option) => `${option?.eventData?.name}`}
							onChange={(e, bid, reason) =>
								reason === 'selectOption'
									? setSelectedBid(bid)
									: setSelectedBid(bid)
							}
							value={selectedBid}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										value={selectedBid}
										placeholder='Select a previously recorded Bid'
										variant='outlined'
										required
									/>
								);
							}}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<LandlordTextButton
						onClick={() => setPullDataModal(false)}
						autoFocus
						color={'primary'}
					>
						Close
					</LandlordTextButton>
					<LandlordTextButton
						onClick={() => setPullDataModal(false)}
						autoFocus
						color={'primary'}
					>
						Continue
					</LandlordTextButton>
				</DialogActions>
			</Dialog>

			<ImageDocumentModal
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
				images={images}
				docs={docs}
				setImages={setImages}
				setDocs={setDocs}
			/>
		</>
	);
};

export default AddMaintenanceEventModal;
const BidRating = ({
	data,
	setData,
	handleChange,
	setAttachmentModal,
	selectedData,
	images,
	setImages,
	docs,
	setDocs,
}) => {
	const ratings = ['communication', 'delivery', 'quality', 'value'];

	return (
		<React.Fragment>
			<Grid item md={6}>
				<LandlordButton variant={'contained'} color={'success'} fullWidth>
					Keep
				</LandlordButton>
			</Grid>
			<Grid item md={6}>
				<LandlordButton variant={'contained'} color={'error'} fullWidth>
					Archive
				</LandlordButton>
			</Grid>
			<Grid item md={6}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography fontWeight={'bold'} fontSize={'medium'}>
						Leave Rating
					</Typography>
					<Rating
						value={data?.rating}
						onChange={(_, rating) => {
							setData({ ...data, rating });
						}}
						sx={{
							fontSize: '40px',
						}}
					/>
				</Box>
			</Grid>
			<Grid item md={6}>
				<LandlordButton variant={'contained'} color={'primary'} fullWidth>
					Accept Bid
				</LandlordButton>
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
			<Grid item xs={12} md={12}>
				<AttachmentButton
					images={images}
					setImages={setImages}
					setDocs={setDocs}
					docs={docs}
					uploadHandler={(_) => setAttachmentModal(true)}
				/>
			</Grid>
			<Grid item md={12}>
				<Typography fontWeight={'bold'}>
					Contractor Ratings &#38; Review
				</Typography>
			</Grid>
			<Grid item md={12}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography>Overall Rating</Typography>
					<Rating
						value={data?.rating}
						onChange={(_, rating) => {
							setData({ ...data, rating });
						}}
						sx={{
							fontSize: '45px',
						}}
					/>
				</Box>
			</Grid>
			<Grid item md={12}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						px: 5,
					}}
				>
					{ratings?.map((rating) => (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Typography textTransform={'capitalize'}>{rating}</Typography>
							<Rating
								size={'large'}
								value={data[rating + 'Rating']}
								onChange={(_, rating) => {
									setData({
										...data,
										[rating + 'Rating']: rating,
									});
								}}
							/>
						</Box>
					))}
				</Box>
			</Grid>
			{selectedData?.type === 'Bid' ? (
				<Grid item md={12}>
					<Typography sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
						Reviews
					</Typography>
					<Box px={4} mb={2}>
						<Box
							sx={{
								height: '200px',
								bgcolor: '#C4C4C4',
								border: '1px solid #000',
							}}
						></Box>
					</Box>
				</Grid>
			) : (
				<Grid item md={12}>
					<SuiInput
						multiline
						rows={7}
						name='review'
						onChange={handleChange}
						aria-placeholder='Add Written Review Here'
						placeholder='Add Written Review Here'
						value={data?.review}
						style={{ width: '100%', marginBottom: '10px' }}
					/>
				</Grid>
			)}
		</React.Fragment>
	);
};
