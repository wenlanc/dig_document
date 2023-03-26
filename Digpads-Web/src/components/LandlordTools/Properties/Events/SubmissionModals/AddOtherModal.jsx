import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	Autocomplete,
	TextareaAutosize,
} from '@mui/material';
import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AttachementModal from './AttachmentModal';
import { useDispatch, useSelector } from 'react-redux';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import ScheduleFields from './ScheduleFields';
import SuiInput from 'components/SuiInput';
import CustomLabel from '../../Utils/DateLabel';
import { nwc, nwoc } from 'utils/NumberUtils';
import { LandlordOutlineButton } from 'components/styled/Button';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';

const AddOtherModal = ({
	open,
	handleClose,
	classes,
	styles,
	nature,
	// selectedData,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [imagesModal, setImagesModal] = useState(false);
	const [properties, setProperties] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [propertyRooms, setPropertyRooms] = useState([]);
	const [showRooms, setShowRooms] = useState(false);
	const [docs, setDocs] = useState([]);

	const getPopertyRooms = () => {
		let pRooms = rooms?.filter(
			(r) => r?.property?._id === (data?.property?._id || data?.property)
		);

		setPropertyRooms(pRooms);
	};

	const propertiesData = useSelector((state) => state.PropertiesList);
	const roomData = useSelector((state) => state.RoomList);
	useEffect(() => {
		setProperties(propertiesData.data);
		setRooms(roomData.data);
	}, [propertiesData.data, roomData.data]);

	useEffect(() => {
		if (showRooms) {
			getPopertyRooms();
		}
		//eslint-disable-next-line
	}, [data?.property]);

	useEffect(() => {
		switch (data?.location) {
			case 'General Expenses':
			case 'Utilities':
			case 'Taxes':
			case 'Insurance':
				setShowRooms(false);
				setData({
					...data,
					room: '',
				});
				break;
			default:
				setShowRooms(true);
		}
		//eslint-disable-next-line
	}, [data?.location]);

	const [attachementModal, setAttachementModal] = useState(false);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();

	useEffect(() => {
		setData({
			...data,
			images,
		});
		// eslint-disable-next-line
	}, [images]);

	useEffect(() => {
		if (data?.images) setImages([...data.images]);
		// eslint-disable-next-line
	}, [open]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: data?.property,
			location: data?.location,
			secondaryType: data?.location,
			parentName: data?.eventName,
			room: data?.room,
			eventTag: 'Action',
			eventNature: nature,
			eventStatus: data?.actionStatus === 'Completed',
			eventType: data?.eventType,
			eventData: {
				...data,
				amountDue: nwoc(data?.amountDue),
			},
		};
		console.log('room =>', data?.room);
		console.log('body =>', body);
		await dispatch(NewEvent('title', body));
		setLoading(false);
		setData({});
		handleClose();
	};

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						<Box
							component={'form'}
							onSubmit={handleSubmit}
							key={data?.location}
						>
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='h4' component='h2' fontWeight='bold'>
									Record an Other Event
								</Typography>
								<div onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</div>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<TextField
											name='eventName'
											onChange={handleChange}
											placeholder='Event Name'
											variant='outlined'
											fullWidth
											value={data?.eventName}
											required
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											id='location-autocomplete'
											options={[
												'All Events',
												'Utilities',
												'General Expenses',
												'Physical Property',
												'Taxes',
												'Insurance',
												'Maintenance',
												'Fixture Condition',
												'Reparis & Redmodels',
											]}
											getOptionLabel={(option) => `${option}`}
											onChange={(e, location, reason) => {
												reason === 'selectOption'
													? setData({
															...data,
															location,
															room: '',
															roomName: '',
													  })
													: setData({
															...data,
															location: '',
															room: '',
															roomName: '',
													  });
											}}
											value={data?.location}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.location}
														placeholder='Location'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Event Date'
												onChange={(value) => {
													setData({
														...data,
														eventDate: String(value),
													});
												}}
												value={data?.eventDate}
												renderInput={(params) => (
													<TextField {...params} fullWidth />
												)}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											id='property-autocomplete'
											options={properties}
											getOptionLabel={(property) => `${property.propertyName}`}
											onChange={(e, property, reason) =>
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
													  })
											}
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
									</Grid>
									{showRooms && (
										<Grid item xs={12} md={6}>
											<Autocomplete
												id='property-autocomplete'
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
												// disabled={stateCities.length === 0}
												renderInput={(params) => {
													const param = {
														...params,
														inputProps: {
															...params.inputProps,
															value:
																data?.room?.name !== undefined
																	? data?.room?.name
																	: data?.roomName,
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
										</Grid>
									)}
									<Grid item xs={12} md={6}>
										<Autocomplete
											id='person-company-autocomplete'
											options={['Person', 'Company']}
											getOptionLabel={(option) => `${option}`}
											onChange={(e, personCompany, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															personCompany,
													  })
													: setData({
															...data,
															personCompany: '',
													  })
											}
											value={data?.personCompany}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.personCompany}
														placeholder='Person/Company'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name='type'
											onChange={handleChange}
											placeholder='Type'
											variant='outlined'
											fullWidth
											value={data?.type}
											required
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<TextField
											name='eventType'
											onChange={handleChange}
											placeholder='Event Type'
											variant='outlined'
											fullWidth
											value={data?.eventType}
											required
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<SuiInput
											name='amountDue'
											value={nwc(data?.amountDue)}
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
											id='bill-status-autocomplete'
											options={['Unpaid', 'Paid']}
											getOptionLabel={(option) => `${option}`}
											onChange={(e, billStatus, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															billStatus,
													  })
													: setData({
															...data,
															billStatus: '',
													  })
											}
											value={data?.billStatus}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.billStatus}
														placeholder='Bill Status'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											id='action-status-autocomplete'
											options={['Incomplete', 'Completed']}
											getOptionLabel={(option) => `${option}`}
											onChange={(e, actionStatus, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															actionStatus,
													  })
													: setData({
															...data,
															actionStatus: '',
													  })
											}
											value={data?.actionStatus}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.actionStatus}
														placeholder='Action Status'
														variant='outlined'
														required
													/>
												);
											}}
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
									<Grid item xs={12} md={12} mb={3}>
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
														{images?.length > 0 && 'Images: ' + images?.length}
													</div>
													<div>
														{docs?.length > 0 && 'Documents: ' + docs?.length}
													</div>
												</Box>
											}
										/>
									</Grid>
									<ScheduleFields
										data={data}
										setData={setData}
										nature={nature}
									/>
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
									</Grid>
								</Grid>
							</Box>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<ImageDocumentModal
				open={imagesModal}
				handleClose={(_) => setImagesModal(false)}
				setImages={setImages}
				setDocs={setDocs}
				images={images}
				docs={docs}
				parent={'Utility'}
			/>
		</>
	);
};

export default AddOtherModal;
