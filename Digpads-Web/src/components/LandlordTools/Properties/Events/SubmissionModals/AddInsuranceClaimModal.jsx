import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Autocomplete,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import { NewEvent } from 'store/actions/Property/eventAction';
import {
	Close,
	PriceCheck as PriceCheckIcon,
	Paid as PaidIcon,
	AttachMoney as AttachMoneyIcon,
	Foundation as MaterialIcon,
	Construction as LaborIcon,
	PriceCheck as TotalIcon,
	MiscellaneousServices as MiscIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { nwc, nwoc } from 'utils/NumberUtils';
import CustomLabel from '../../Utils/DateLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AttachementModal from './AttachmentModal';
import colors from 'assets/theme/base/colors';
import SuiInput from 'components/SuiInput';
import moment from 'moment';
import { LandlordTextButton } from 'components/styled/Button';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import ScheduleFields from './ScheduleFields';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import AttachmentButton from '../../Utils/AttachmentButton';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';

const AddInsuranceClaimModal = ({
	title,
	open,
	handleClose,
	classes,
	styles,
	selectedData,
	physicalData,
	fixtureData,
	property,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [items, setItems] = useState([]);
	const [damageReports, setDamageReports] = useState([]);
	const [pullDataModal, setPullDataModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const { data: events } = useSelector((state) => state.EventList);

	const icon = <CheckBoxOutlineBlank fontSize='small' />;
	const checkedIcon = <CheckBox fontSize='small' />;

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();

	useEffect(() => {
		setData({
			...data,
			images,
		});
		//eslint-disable-next-line
	}, [images]);

	const getInsuranceEvents = () => {
		console.log('all events', events);
		const _events = events?.filter((e) => e?.eventLocation === 'Insurance');
		console.log('ins events => ', _events);
		return [..._events];
	};
	useEffect(() => getInsuranceEvents(), [open]);

	useEffect(() => {
		setSelectedEvent(null);
		setData(null);
		// const items = [...physicalData, ...fixtureData];
		const _damageReports = events?.filter(
			(e) =>
				e?.eventType?.toLowerCase() === 'damage' &&
				e?.property?._id === property?._id
		);
		console.log('damageReports', _damageReports);
		console.log('property', property?._id);
		setDamageReports(_damageReports);
		const _phyicalPropertyies = [];
		const _fixturesData = [];
		physicalData?.forEach((p) => {
			p.itemType = 'Physical Property';
			if (p.property?._id === property?._id) {
				_phyicalPropertyies.push(p);
			}
		});
		fixtureData?.forEach((f) => {
			f.itemType = 'Fixture';
			if (f.property?._id === property?._id) {
				_fixturesData.push(f);
			}
		});
		console.log('pps =>>> ', _phyicalPropertyies);
		setItems([..._phyicalPropertyies, ..._fixturesData]);
		// conditionData.data.forEach((c) => {
		// 	c?.items?.forEach((item) => items.push(item));
		// });
		// setItems(items);
		if (data?.images) setImages([...data.images]);
		//eslint-disable-next-line
	}, [open, events]);

	const handleAgreement = (images) => {
		setAttachmentModal(false);
		setImages(images);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: property?._id,
			location: selectedData?.parent,
			parentData: selectedData?.data,
			eventTag: 'Bill',
			eventAction: true,
			eventStatus: true,
			eventType: selectedData.event,
			eventNature: nature,
			eventData: {
				...data,
				insuranceClaimType: selectedData?.type,
				deductiblePaid: nwoc(data?.deductiblePaid),
				amountPaid: nwoc(data?.amountPaid),
				totalEstimate: nwoc(data?.totalEstimate),
				materialEstimate: nwoc(data?.materialEstimate),
				laborEstimate: nwoc(data?.laborEstimate),
				otherEstimate: nwoc(data?.otherEstimate),
				deductibleAmount: nwoc(data?.deductibleAmount),
				attachments: docs,
				images,
			},
		};
		console.log(body);
		await dispatch(NewEvent(title, body));
		setLoading(false);
		setData({});
		closeParentModals();
		handleClose();
	};
	const renderExtraFields = () => {
		let fields;
		switch (selectedData?.type) {
			case 'Adjuster Review':
				fields = (
					<>
						<Grid item xs={12} md={6}>
							{/* <TextField
								name='totalEstimate'
								onChange={handleChange}
								placeholder='Total Estimate'
								variant='outlined'
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								type={'number'}
								required
							/> */}
							<SuiInput
								name='totalEstimate'
								placeholder='Total Estimate'
								fullWidth
								onChange={handleChange}
								variant='outlined'
								value={nwc(data?.totalEstimate)}
								icon={{
									component: <TotalIcon />,
									direction: 'left',
								}}
								InputProps={{
									readOnly: true,
								}}
							/>
							{data?.totalEstimate && <CustomLabel label={'Total Estimate'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							{/* <TextField
								name='materialEstimate'
								onChange={handleChange}
								placeholder='Material Estimate'
								variant='outlined'
								fullWidth
								type={'number'}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={data?.type}
								required
							/> */}
							<SuiInput
								name='materialEstimate'
								onChange={handleChange}
								placeholder='Material Estimate'
								fullWidth
								variant='outlined'
								value={nwc(data?.materialEstimate)}
								icon={{
									component: <MaterialIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.materialEstimate && (
								<CustomLabel label={'Material Estimate'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							{/* <TextField
								name='laborEstimate'
								onChange={handleChange}
								placeholder='Labor Estimate'
								variant='outlined'
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								type={'number'}
								value={data?.laborEstimate}
								required
							/> */}
							<SuiInput
								name='laborEstimate'
								onChange={handleChange}
								placeholder='Labor Estimate'
								fullWidth
								variant='outlined'
								value={nwc(data?.laborEstimate)}
								icon={{
									component: <LaborIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.laborEstimate && <CustomLabel label={'Labor Estimate'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							{/* <TextField
								name='otherEstimate'
								onChange={handleChange}
								placeholder='Other Estimate'
								variant='outlined'
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								type={'number'}
								value={data?.otherEstimate}
								required
								
							/> */}
							<SuiInput
								name='otherEstimate'
								onChange={handleChange}
								placeholder='Other Estimate'
								fullWidth
								variant='outlined'
								value={nwc(data?.otherEstimate)}
								icon={{
									component: <MiscIcon />,
									direction: 'left',
								}}
								required
							/>

							{data?.otherEstimate && <CustomLabel label={'Other Estimate'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='deductible-autocomplete'
								options={['Yes', 'No']}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, deductible, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												deductible,
										  })
										: setData({
												...data,
												deductible: '',
										  })
								}
								value={data?.deductible}
								// disabled={stateCities.length === 0}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.deductible}
											placeholder='Deductible'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.deductible && <CustomLabel label={'Deductible ?'} />}
						</Grid>
						{data?.deductible === 'Yes' && (
							<Grid item xs={12} md={6}>
								<SuiInput
									name='deductibleAmount'
									placeholder='Deductible Amount'
									fullWidth
									onChange={handleChange}
									variant='outlined'
									value={nwc(data?.deductibleAmount)}
									icon={{
										component: <AttachMoneyIcon />,
										direction: 'left',
									}}
									InputProps={{
										readOnly: true,
									}}
								/>
								{data?.deductibleAmount && (
									<CustomLabel label={'Deductible Amount'} />
								)}
							</Grid>
						)}
					</>
				);
				break;
			case 'Claim Paid':
				fields = (
					<>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='amountPaid'
								placeholder='Amount Paid'
								fullWidth
								onChange={handleChange}
								variant='outlined'
								value={nwc(data?.amountPaid)}
								icon={{
									component: <PriceCheckIcon />,
									direction: 'left',
								}}
								InputProps={{
									readOnly: true,
								}}
							/>
							{data?.amountPaid && <CustomLabel label={'Amount Paid'} />}
							{/* <TextField
								name='amountPaid'
								onChange={handleChange}
								placeholder='Amount Paid'
								variant='outlined'
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								type={'number'}
								value={selectedData?.amountPaid}
								required
							/> */}
						</Grid>
						<Grid item xs={12} md={6}>
							<SuiInput
								name='deductiblePaid'
								onChange={handleChange}
								placeholder='Deductible Paid'
								fullWidth
								variant='outlined'
								value={nwc(data?.deductiblePaid)}
								icon={{
									component: <PaidIcon />,
									direction: 'left',
								}}
							/>

							{data?.deductiblePaid && (
								<CustomLabel label={'Deductible Paid'} />
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id='paid-to-autocomplete'
								options={[
									'Landlord',
									'Tenant',
									'Neighbor',
									'Contractor',
									'Other',
								]}
								getOptionLabel={(option) => `${option}`}
								onChange={(e, paidTo, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												paidTo,
										  })
										: setData({
												...data,
												paidTo: '',
										  })
								}
								value={data?.paidTo}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={data?.paidTo}
											placeholder='Paid To'
											variant='outlined'
											required
										/>
									);
								}}
							/>
							{data?.paidTo && <CustomLabel label={'Paid To'} />}
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name='paidToName'
								onChange={handleChange}
								placeholder='Paid to Name'
								variant='outlined'
								fullWidth
								value={data?.paidToName}
								required
							/>
							{data?.paidToName && <CustomLabel label={'Paid To Name'} />}
						</Grid>
					</>
				);
				break;
			default:
				break;
		}
		return fields;
	};

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<TitleBox>
									<Box>
										<Typography variant='h4' component='h2' fontWeight='bold'>
											{`Record ${selectedData?.type}`}
										</Typography>
										<Typography
											variant={'small'}
											component={'small'}
											sx={{
												textAlign: 'left',
												width: '100%',
												cursor: 'pointer',
												textDecoration: 'underline',
											}}
											onClick={() => setPullDataModal(true)}
										>
											Pull Data ?
										</Typography>
									</Box>
									<CloseBox onClick={handleClose} sx={{ top: 0 }}>
										<Close style={{ cursor: 'pointer' }} />
									</CloseBox>
								</TitleBox>
							</Box>
							{
								<Box px={2} py={1} border={'1px solid #c4c4c4'}>
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
							}
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Date Claim Filed'
												onChange={(value) => {
													setData({
														...data,
														dateClaimFiled: String(value),
													});
												}}
												value={data?.dateClaimFiled}
												renderInput={(params) => (
													<TextField fullWidth {...params} />
												)}
											/>
										</LocalizationProvider>
										<CustomLabel label={'Date Claim Filed'} />
									</Grid>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Date of Claimed Incident'
												onChange={(value) => {
													setData({
														...data,
														dateClaimedIncident: String(value),
													});
												}}
												value={data?.dateClaimedIncident}
												renderInput={(params) => (
													<TextField fullWidth {...params} />
												)}
											/>
										</LocalizationProvider>
										<CustomLabel label={'Date of Claimed Incident'} />
									</Grid>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Date of Adjuster Review'
												onChange={(value) => {
													setData({
														...data,
														dateAdjusterReview: String(value),
													});
												}}
												value={data?.dateAdjusterReview}
												renderInput={(params) => (
													<TextField fullWidth {...params} />
												)}
											/>
										</LocalizationProvider>
										<CustomLabel label={'Date of Adjuster Review'} />
									</Grid>
									<Grid item xs={12} md={12}>
										<Autocomplete
											multiple
											fullWidth
											options={items}
											disableCloseOnSelect
											getOptionLabel={(option) =>
												`${option?.name} - ${option?.itemType}`
											}
											onChange={(e, items, reason) => {
												switch (reason) {
													case 'selectOption':
													case 'removeOption':
														setData({
															...data,
															items,
														});
														break;
													default:
														setData({
															...data,
															items: [],
														});
														break;
												}
											}}
											value={data?.items || []}
											renderOption={(props, option, { selected }) => (
												<li {...props}>
													<Checkbox
														icon={icon}
														checkedIcon={checkedIcon}
														style={{
															marginRight: 8,
														}}
														checked={selected}
													/>
													{`${option.name} - ${option?.itemType}`}
												</li>
											)}
											renderInput={(params) => (
												<TextField
													fullWidth
													value={data?.items || []}
													{...params}
													placeholder='Impacted Items'
												/>
											)}
										/>
										{/* {data?.items?.length > 0 && (
											<CustomLabel
												label={'Impacted Items'}
											/>
										)} */}
									</Grid>
									<Grid item xs={12} md={12}>
										<Autocomplete
											multiple
											fullWidth
											options={damageReports}
											disableCloseOnSelect
											getOptionLabel={(option) =>
												`${option?.parentName} - ${moment(
													option?.eventData?.damageDate
												).format('DD/MMM/YYYY')}`
											}
											value={data?.damageReports || []}
											onChange={(e, damageReports, reason) => {
												switch (reason) {
													case 'selectOption':
													case 'removeOption':
														setData({
															...data,
															damageReports,
														});
														break;
													default:
														setData({
															...data,
															damageReports: [],
														});
														break;
												}
											}}
											renderOption={(props, option, { selected }) => (
												<li {...props}>
													<Checkbox
														icon={icon}
														checkedIcon={checkedIcon}
														style={{
															marginRight: 8,
														}}
														checked={selected}
													/>
													{`${option?.parentName + ' - '}
													 ${option?.eventData?.damageType}	
														- ${moment(option?.eventData?.damageDate).format('DD MMM, YYYY')}`}
												</li>
											)}
											renderInput={(params) => (
												<TextField
													fullWidth
													value={data?.damageReports || []}
													{...params}
													placeholder='Damage Report'
												/>
											)}
										/>
										{/* {data?.items?.length > 0 && (
											<CustomLabel
												label={'Damage Report'}
											/>
										)} */}
									</Grid>
									{renderExtraFields()}
									<Grid item xs={12} md={12}>
										<AttachmentButton
											uploadHandler={(_) => setAttachmentModal(true)}
											docs={docs}
											images={images}
										/>
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
									<ScheduleFields
										data={data}
										setData={setData}
										nature={nature}
									/>
									<Grid container justifyContent={'space-around'}>
										<LandlordButton
											sx={{ my: 2 }}
											variant='contained'
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
						{'Pull Data'}
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
						Would you like to record a Claim Paid from a previously saved
						Insurance Claim?
					</DialogContentText>
					<Box>
						<Autocomplete
							id='old-insurance-claims-autocomplete'
							options={getInsuranceEvents()}
							getOptionLabel={(option) =>
								`${option?.parentName} - ${option?.eventType} on ${moment(
									option?.eventRecordedOn
								).format('DD MMM, YYYY')} `
							}
							onChange={(e, event, reason) => {
								if (event?.eventData?.name === 'None') {
									setSelectedEvent(null);
									setData(null);
									return;
								}
								if (reason === 'selectOption') {
									console.log('event got froooo', event);
									setData(event?.eventData);
									setSelectedEvent(event);
								} else setData(null);
							}}
							value={selectedEvent}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										value={selectedEvent}
										placeholder='Select A Previously Recorded Insurance Claim'
										variant='outlined'
										required
									/>
								);
							}}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					{/* <LandlordTextButton
						onClick={() => setPullDataModal(false)}
						autoFocus
						color={'primary'}
					>
						Close
					</LandlordTextButton> */}
					<LandlordTextButton
						onClick={() => {
							setPullDataModal(false);
						}}
						autoFocus
						color={'primary'}
					>
						Continue
					</LandlordTextButton>
				</DialogActions>
			</Dialog>

			<ImageDocumentModal
				docs={docs}
				setDocs={setDocs}
				images={images}
				setImages={setImages}
				handleClose={(_) => setAttachmentModal(false)}
				open={attachmentModal}
			/>
		</>
	);
};

export default AddInsuranceClaimModal;
