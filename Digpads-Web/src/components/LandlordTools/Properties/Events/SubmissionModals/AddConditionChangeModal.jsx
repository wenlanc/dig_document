import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	InputAdornment,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextareaAutosize,
	Paper,
	Divider,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import attachmentModal from './AttachmentModal';
import { NewCondtionChangeEvent } from '../../../../../store/actions/Property/eventAction';
import { LandlordButton } from 'components/styled/Button';
import ScheduleFields from './ScheduleFields';
import colors from 'assets/theme/base/colors';
import { LandlordLoading } from 'components/styled/Button';
import { nwc, nwoc } from 'utils/NumberUtils';
import SuiInput from 'components/SuiInput';
import CustomLabel from '../../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import AttachmentButton from '../../Utils/AttachmentButton';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
// import {
// 	DeleteInsurance,
// 	NewInsurance,
// } from '../../../../store/actions/Property/insuranceAction';

const AddConditionEventModal = ({
	title,
	open,
	handleClose,
	selectedData,
	properties,
	dialogData,
	rooms,
	room,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [propertyRooms, setPropertyRooms] = useState([]);
	const [loading, setLoading] = useState(false);

	const getPopertyRooms = () => {
		// const property = title === 'Add' ? data?.property : data?.property?._id;
		let pRooms = rooms?.filter(
			(r) => r?.property?._id === (data?.property?._id || data?.property)
		);
		setPropertyRooms(pRooms);
	};
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

	useEffect(() => {
		if (data?.images) setImages([...data.images]);
		//eslint-disable-next-line
	}, [open]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, [data?.property]);

	const handleAgreement = (images) => {
		setAttachmentModal(false);
		setImages(images);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: data?.property?._id,
			location: selectedData?.parent,
			parentData: selectedData?.data,
			room,
			eventNature: nature,
			eventTag: 'Action',
			eventAction: data?.completed === 'true',
			eventType: selectedData?.event,
			eventData: {
				newData: {
					...data,
					cost: nwoc(data?.cost),
					estimatedValue: nwoc(data?.estimatedValue),
					attachments: docs,
					images,
				},
				condtionChangeType: dialogData,
				oldData: selectedData?.data,
				...data,
				attachments: docs,
				images,
			},
		};
		console.log(body);
		await dispatch(NewCondtionChangeEvent(body));
		setLoading(false);
		setData({});
		handleClose();
		closeParentModals();
	};

	const renderForm = () => {
		let form;
		switch (selectedData?.type) {
			case 'Destroyed':
				form = (
					<>
						<Grid item xs={12} md={12} display={'flex'}>
							<RadioGroup
								aria-labelledby='demo-radio-buttons-group-label'
								name='radio-buttons-group'
								defaultValue={false}
								onChange={(e) => {
									console.log('replacement ,', e.target.value);
									setData({
										...data,
										replacement: e?.target?.value,
									});
								}}
							>
								<FormControlLabel
									value={false}
									control={<Radio />}
									name='no'
									label='No Replacement'
								/>
								<FormControlLabel
									value={true}
									control={<Radio />}
									name='yes'
									label='Replacement'
								/>
							</RadioGroup>
						</Grid>
						{data?.replacement === 'true' && (form = forms())}
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
			case 'Replaced':
				form = forms();
				break;
			default:
				form = null;
				break;
		}
		return form;
	};

	const forms = () => {
		if (selectedData?.parent === 'Physical Property') {
			return (
				<>
					<Grid item xs={6} md={6}>
						<Typography
							fontWeight={'bold'}
							textAlign={'center'}
							component={'h4'}
							variant={'h4'}
						>
							Current
						</Typography>
					</Grid>
					<Grid item xs={6} md={6}>
						<Typography
							fontWeight={'bold'}
							textAlign={'center'}
							component={'h4'}
							variant={'h4'}
						>
							New
						</Typography>
					</Grid>
					<Grid item xs={6} md={6}>
						<TextField
							name='oldName'
							placeholder='Job Name'
							variant='outlined'
							fullWidth
							disabled
							value={selectedData?.data?.name}
						/>

						<CustomLabel label={'Job Name'} />
					</Grid>
					<Grid item xs={6} md={6}>
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
					<Grid item xs={6} md={6}>
						<TextField
							name='property'
							placeholder='Rental Property'
							variant='outlined'
							fullWidth
							disabled
							value={selectedData?.data?.property?.propertyName}
						/>
						<CustomLabel label={'Rental Property'} />

						{/* <Autocomplete
									disableClearable
									
									id='property-autocomplete'
									options={properties}
									getOptionLabel={(property) =>
										`${property.propertyName}`
									}
									onChange={(e, property, reason) =>
										reason === 'selectOption'
											? setData({
													...data,
													property,
											  })
											: setData({
													...data,
													property: '',
											  })
									}
									value={selectedData?.data?.property}
									renderInput={(params) => {
										return (
											<TextField
												{...params}
												value={
													selectedData?.data?.property
														.proeprtyName
												}
												label='Rental Property'
												variant='outlined'
												required
											/>
										);
									}}
								/> */}
					</Grid>
					<Grid item xs={6} md={6}>
						<Autocomplete
							disableClearable
							id='property-autocomplete'
							options={properties}
							getOptionLabel={(property) => `${property.propertyName}`}
							value={data?.property}
							onChange={(e, property, reason) =>
								reason === 'selectOption'
									? setData({
											...data,
											property,
									  })
									: setData({
											...data,
											property: '',
									  })
							}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										value={data?.property?.propertyName}
										placeholder='Rental Property'
										variant='outlined'
										required
									/>
								);
							}}
						/>
						{data?.property && <CustomLabel label={'Job Name'} />}
					</Grid>

					<Grid item xs={6} md={6}>
						<TextField
							name='room'
							placeholder='Room'
							variant='outlined'
							fullWidth
							disabled
							value={selectedData?.data?.room?.name}
						/>
						<CustomLabel label={'Room'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Autocomplete
							placeholder='Room'
							id='room-autocomplete'
							options={propertyRooms}
							getOptionLabel={(room) => `${room.name}`}
							onChange={(e, room, reason) =>
								reason === 'selectOption'
									? setData({
											...data,
											room: room,
									  })
									: setData({
											...data,
											room: '',
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
						{data?.room && <CustomLabel label={'Room'} />}
					</Grid>

					<Grid item xs={12} md={6}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								placeholder='Month/Year Acquired'
								views={['year', 'month']}
								disabled
								value={selectedData?.data?.dateAcquired}
								renderInput={(params) => <TextField fullWidth {...params} />}
							/>
						</LocalizationProvider>
						<CustomLabel label={'Month/Year Acquired'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								placeholder='Month/Year Acquired'
								views={['year', 'month']}
								onChange={(value) => {
									setData({
										...data,
										dateAcquired: value,
									});
								}}
								value={data?.dateAcquired}
								renderInput={(params) => <TextField fullWidth {...params} />}
							/>
						</LocalizationProvider>
						<CustomLabel label={'Month/Year Acquired'} />
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							name='location'
							placeholder='Location At Property'
							variant='outlined'
							fullWidth
							value={selectedData?.data?.room?.name}
							disabled
						/>
						<CustomLabel label={'Location At Property'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='location'
							onChange={handleChange}
							placeholder='Location At Property'
							variant='outlined'
							fullWidth
							value={data?.location}
							required
						/>
						{data?.location && <CustomLabel label={'Location At Property'} />}
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='condition'
							placeholder='Condition'
							variant='outlined'
							fullWidth
							value={selectedData?.data?.condition}
							disabled
						/>

						<CustomLabel label={'Condition'} />

						{/* <Autocomplete
									
									id='condition-autocomplete'
									options={[
										'New',
										'Very Good',
										'Good',
										'Fair',
										'Poor',
									]}
									getOptionLabel={(condition) =>
										`${condition}`
									}
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
										// const param = {
										// 	...params,
										// 	inputProps: {
										// 		...params.inputProps,
										// 		value: data?.condition,
										// 	},
										// };

										return (
											<TextField
												{...params}
												value={
													selectedData?.data
														?.condition
												}
												placeholder='Condition'
												variant='outlined'
											/>
										);
									}}
								/> */}
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
							renderInput={(params) => {
								// const param = {
								// 	...params,
								// 	inputProps: {
								// 		...params.inputProps,
								// 		value: data?.condition,
								// 	},
								// };

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
					<Grid item xs={12} md={6}>
						<SuiInput
							name='estimatedValue'
							// onChange={handleChange}
							disabled
							placeholder='Estimated Value'
							fullWidth
							variant='outlined'
							value={nwc(selectedData?.data?.estimatedValue)}
							icon={{
								component: <AttachMoneyIcon />,
								direction: 'left',
							}}
						/>

						{data?.estimatedValue && <CustomLabel label={'Estimated Value'} />}
						{/* <TextField
									name='estimatedValue'
									placeholder='Estimated Value'
									fullWidth
									type='number'
									variant='outlined'
									value={Number(
										selectedData?.data?.estimatedValue
									)}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												$
											</InputAdornment>
										),
									}}
									
									disabled
								/> */}
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <TextField
									name='estimatedValue'
									onChange={handleChange}
									placeholder='Estimated Value'
									fullWidth
									type='number'
									variant='outlined'
									value={Number(data?.estimatedValue)}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												$
											</InputAdornment>
										),
									}}
									
									required
								/> */}
						<SuiInput
							name='estimatedValue'
							onChange={handleChange}
							placeholder='Estimated Value'
							fullWidth
							variant='outlined'
							value={nwc(data?.estimatedValue)}
							icon={{
								component: <AttachMoneyIcon />,
								direction: 'left',
							}}
						/>

						{data?.estimatedValue && <CustomLabel label={'Estimated Value'} />}
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='modelIdentifier'
							placeholder='Model Identifier'
							fullWidth
							variant='outlined'
							value={selectedData?.data?.modelIdentifier}
							disabled
						/>
						<CustomLabel label={'Model Identifier'} />
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							name='modelIdentifier'
							onChange={handleChange}
							placeholder='Model Identifier'
							fullWidth
							variant='outlined'
							value={data?.modelIdentifier}
							required
						/>
						{data?.modelIdentifier && (
							<CustomLabel label={'Model Identifier'} />
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
		} else {
			return (
				<>
					<Grid item xs={6} md={6}>
						<Typography
							fontWeight={'bold'}
							textAlign={'center'}
							component={'h4'}
							variant={'h4'}
						>
							Current
						</Typography>
					</Grid>
					<Grid item xs={6} md={6}>
						<Typography
							fontWeight={'bold'}
							textAlign={'center'}
							component={'h4'}
							variant={'h4'}
						>
							New
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='name'
							onChange={handleChange}
							placeholder='Fixture Name'
							variant='outlined'
							fullWidth
							value={selectedData?.data?.name}
							disabled
						/>
						<CustomLabel label={'Fixture Name'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='name'
							onChange={handleChange}
							placeholder='Fixture Name'
							variant='outlined'
							fullWidth
							value={data?.name}
							required
						/>
						{data?.name && <CustomLabel label={'Fixture Name'} />}
					</Grid>
					<Grid item xs={6} md={6}>
						<TextField
							name='property'
							placeholder='Rental Property'
							variant='outlined'
							fullWidth
							disabled
							value={selectedData?.data?.property?.propertyName}
						/>
						<CustomLabel label={'Rental Property'} />

						{/* <Autocomplete
									disableClearable
									
									id='property-autocomplete'
									options={properties}
									getOptionLabel={(property) =>
										`${property.propertyName}`
									}
									onChange={(e, property, reason) =>
										reason === 'selectOption'
											? setData({
													...data,
													property,
											  })
											: setData({
													...data,
													property: '',
											  })
									}
									value={selectedData?.data?.property}
									renderInput={(params) => {
										return (
											<TextField
												{...params}
												value={
													selectedData?.data?.property
														.proeprtyName
												}
												placeholder='Rental Property'
												variant='outlined'
												required
											/>
										);
									}}
								/> */}
					</Grid>
					<Grid item xs={6} md={6}>
						<Autocomplete
							disableClearable
							id='property-autocomplete'
							options={properties}
							getOptionLabel={(property) => `${property.propertyName}`}
							onChange={(e, property, reason) =>
								reason === 'selectOption'
									? setData({
											...data,
											property,
									  })
									: setData({
											...data,
											property: '',
									  })
							}
							value={data?.property}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										value={data?.property?.propertyName}
										placeholder='Rental Property'
										variant='outlined'
										required
									/>
								);
							}}
						/>
						{data?.property && <CustomLabel label={'Rental Property'} />}
					</Grid>

					<Grid item xs={6} md={6}>
						<TextField
							name='room'
							placeholder='Room'
							variant='outlined'
							fullWidth
							disabled
							value={selectedData?.data?.room?.name}
						/>
						<CustomLabel label={'Room'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<Autocomplete
							placeholder='Room'
							id='room-autocomplete'
							options={propertyRooms}
							getOptionLabel={(room) => `${room.name}`}
							onChange={(e, room, reason) =>
								reason === 'selectOption'
									? setData({
											...data,
											room: room?._id,
											roomName: room?.name,
									  })
									: setData({
											...data,
											room: '',
											roomName: '',
									  })
							}
							value={data?.room?._id || data?.room}
							renderInput={(params) => {
								const param = {
									...params,
									inputProps: {
										...params.inputProps,
										value:
											data.room?.name !== undefined
												? data.room.name
												: data.roomName,
									},
								};

								return (
									<TextField
										{...param}
										placeholder='Room'
										variant='outlined'
										required
									/>
								);
							}}
						/>
						{data?.room && <CustomLabel label={'Room'} />}
					</Grid>
					<Grid item xs={12} md={6}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								placeholder='Date New/Remodeled'
								minDate={new Date('1800-01-01')}
								onChange={(value) => {
									setData({
										...data,
										date: value,
									});
								}}
								value={selectedData?.data?.date}
								renderInput={(params) => (
									<TextField
										{...params}
										disabled
										value={selectedData?.data?.date}
									/>
								)}
							/>
						</LocalizationProvider>
						<CustomLabel label={'Date New/Remodeled'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								placeholder='Date New/Remodeled'
								minDate={new Date('1800-01-01')}
								onChange={(value) => {
									setData({
										...data,
										date: value,
									});
								}}
								value={data?.date}
								renderInput={(params) => (
									<TextField {...params} required value={data?.date} />
								)}
							/>
						</LocalizationProvider>
						<CustomLabel label={'Date New/Remodeled'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='condition'
							onChange={handleChange}
							placeholder='Condtion'
							variant='outlined'
							fullWidth
							value={selectedData?.data?.condtion}
							disabled
						/>
						{selectedData?.data?.condition && (
							<CustomLabel label={'Condition'} />
						)}
						{/* <Autocomplete
									
									id='condition-autocomplete'
									options={[
										'New',
										'Very Good',
										'Good',
										'Fair',
										'Poor',
									]}
									getOptionLabel={(condition) =>
										`${condition}`
									}
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
										const param = {
											...params,
											inputProps: {
												...params.inputProps,
												value: data?.condition,
											},
										};

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
								/> */}
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
						<TextField
							name='manufacturer'
							onChange={handleChange}
							placeholder='Manufacturer/Supplier'
							variant='outlined'
							fullWidth
							value={selectedData?.data?.manufacturer}
							disabled
						/>
						<CustomLabel label={'Manufacturer/Supplier'} />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='manufacturer'
							onChange={handleChange}
							placeholder='Manufacturer/Supplier'
							variant='outlined'
							fullWidth
							value={data?.manufacturer}
							required
						/>
						{data?.manufacturer && (
							<CustomLabel label={'Manufacturer/Supplier'} />
						)}
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name='contractor'
							placeholder='Contractor'
							variant='outlined'
							fullWidth
							value={selectedData?.data?.contractor}
							disabled
						/>
						<CustomLabel label={'Contractor'} />
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
						<SuiInput
							name='cost'
							// onChange={handleChange}
							disabled
							placeholder='Cost'
							fullWidth
							variant='outlined'
							value={nwc(selectedData?.data?.cost)}
							icon={{
								component: <AttachMoneyIcon />,
								direction: 'left',
							}}
						/>

						<CustomLabel label={'Cost'} />
						{/* <TextField
									name='cost'
									onChange={handleChange}
									placeholder='Cost'
									variant='outlined'
									fullWidth
									type={'number'}
									value={selectedData?.data?.cost}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												$
											</InputAdornment>
										),
									}}
									
									disabled
								/> */}
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <TextField
									name='cost'
									onChange={handleChange}
									placeholder='Cost'
									variant='outlined'
									fullWidth
									type={'number'}
									value={data?.cost}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												$
											</InputAdornment>
										),
									}}
									
									required
								/> */}
						<SuiInput
							name='cost'
							onChange={handleChange}
							placeholder='Cost'
							fullWidth
							variant='outlined'
							value={nwc(data?.cost)}
							icon={{
								component: <AttachMoneyIcon />,
								direction: 'left',
							}}
						/>
						{data?.cost && <CustomLabel label={'Cost'} />}
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
				</>
			);
		}
	};

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox display='flex' justifyContent='space-between'>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title}
								</Typography>
								<CloseBox onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Divider />
							{selectedData?.parent !== 'None' && (
								<Box px={2} py={1} border={'1px solid #ccc'}>
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
											images={images}
											docs={docs}
											uploadHandler={(_) => setAttachmentModal(true)}
										/>
									</Grid>
								</Grid>
								<ScheduleFields data={data} setData={setData} nature={nature} />
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
							</Box>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<ImageDocumentModal
				docs={docs}
				images={images}
				handleClose={(_) => setAttachmentModal(false)}
				open={attachmentModal}
				setImages={setImages}
				setDocs={setDocs}
			/>
		</>
	);
};

export default AddConditionEventModal;
