import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextareaAutosize,
	Paper,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { Close, Add } from '@mui/icons-material';
import SuiInput from 'components/SuiInput';
import AttachementModal from './AttachmentModal';
import SuiDatePicker from 'components/SuiDatePicker';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import { LandlordButton } from 'components/styled/Button';
import { LandlordOutlineButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import RenderAddForm from './RenderAddForm';
import AddRoomModal from '../../Rooms/AddRoomModal';
import ScheduleFields from './ScheduleFields';
import AttachmentButton from '../../Utils/AttachmentButton';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { StyledMUIModal } from 'components/MuiStyled/Global';

const AddDamageModal = ({
	title,
	open,
	handleClose,
	classes,
	property,
	styles,
	selectedData,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [parent, setParent] = useState(null);
	const [parentData, setParentData] = useState([]);
	const [room, setRoom] = useState(null);
	const [addModal, setAddModal] = useState(false);
	const [addRoomModal, setAddRoomModal] = useState(false);
	const [selectedParentData, setSelectedParentData] = useState(null);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [formStep, setFormStep] = useState(1);

	const { data: systems } = useSelector((state) => state.SystemList);
	const { data: properties } = useSelector((state) => state.PropertiesList);
	const { data: rooms } = useSelector((state) => state.RoomList);
	const { data: fixtures } = useSelector((state) => state.FixtureList);
	const { data: physicalProperties } = useSelector(
		(state) => state.PhysicalList
	);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();
	const filter = createFilterOptions();

	useEffect(() => {
		getParentData();
	}, [parent, room, properties, systems, rooms, fixtures, physicalProperties]);

	useEffect(() => {
		setData({
			...data,
			images,
		});
		//eslint-disable-next-line
	}, [images]);

	useEffect(() => {
		if (data?.images) setImages([...data.images]);
		setParent(null);
		setSelectedParentData(null);
		setFormStep(1);
		setAddModal(false);

		//eslint-disable-next-line
	}, [open, property]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: property?._id,
			location: parent,
			room: room,
			parentName: parent,
			parentData: selectedParentData,
			eventTag: 'Action',
			eventStatus: true,
			eventType: selectedData?.event,
			eventNature: nature,
			eventData: {
				...data,
				damageType: selectedData?.type,
				cause: selectedData?.type,
				images: images,
				attachments: docs,
			},
		};
		await dispatch(NewEvent(title, body));
		setData({});
		setLoading(false);
		closeParentModals();
		// handleClose();
	};

	const formBuilder = () => {
		return (
			<Box component={'form'} onSubmit={handleSubmit}>
				<Box display='flex' justifyContent='space-between'>
					<Typography variant='h4' component='h2' fontWeight='bold'>
						{title} {parent}
					</Typography>
					<div onClick={handleClose}>
						<Close style={{ cursor: 'pointer' }} />
					</div>
				</Box>
				<Box sx={{ mt: 2 }}>
					<Grid spacing={2}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<SuiDatePicker
									input={{
										placeholder: 'Date of Damange',
									}}
									onChange={(date) =>
										setData({
											...data,
											damageDate: date[0],
										})
									}
								/>

								{/* <LocalizationProvider
												dateAdapter={AdapterDateFns}
											>
												<DatePicker
													placeholder='Date of damage'
													onChange={(value) => {
														setData({
															...data,
															damageDate:
																String(value),
														});
													}}
													value={data?.damageDate}
													renderInput={(params) => (
														<TextField
															{...params}
														/>
													)}
													
												/>
											</LocalizationProvider>
											<DateLabel
												placeholder={'Date of Damage '}
											/> */}
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									name='estimatedTime'
									onChange={handleChange}
									placeholder='Estimated Time of Damage'
									variant='outlined'
									fullWidth
									value={data?.estimatedTime}
									required
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextField
									sx={{
										cursor: 'not-allowed !important',
									}}
									name='type'
									onChange={handleChange}
									placeholder='Cause of Damage'
									variant='outlined'
									fullWidth
									value={selectedData?.type}
									disabled
									required
								/>
							</Grid>

							<Grid item xs={12} md={4}>
								<Autocomplete
									id='request-autocomplete'
									options={['New', 'Very Good', 'Good', 'Fair', 'Poor']}
									getOptionLabel={(option) => `${option}`}
									onChange={(e, conditionChange, reason) =>
										reason === 'selectOption'
											? setData({
													...data,
													conditionChange,
											  })
											: setData({
													...data,
													conditionChange: '',
											  })
									}
									value={data?.conditionChange}
									renderInput={(params) => {
										return (
											<TextField
												{...params}
												value={data?.conditionChange}
												placeholder='Condition Change'
												variant='outlined'
												required
											/>
										);
									}}
								/>
							</Grid>
							<Grid item md={4}></Grid>
							<Grid item xs={12} md={4}>
								<Autocomplete
									id='request-autocomplete'
									options={[
										'Landlord',
										'Tenant',
										'Neighbor',
										'Contractor',
										'Other',
									]}
									getOptionLabel={(option) => `${option}`}
									onChange={(e, reporter, reason) =>
										reason === 'selectOption'
											? setData({
													...data,
													reporter,
											  })
											: setData({
													...data,
													reporter: '',
											  })
									}
									value={data?.reporter}
									renderInput={(params) => {
										return (
											<TextField
												{...params}
												value={data?.reporter}
												placeholder='Who Reported Damage'
												variant='outlined'
												required
											/>
										);
									}}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Autocomplete
									placeholder={'Type Witnesses here'}
									multiple
									style={{ marginBottom: 16 }}
									id='material-types-autocomplete'
									options={[]}
									value={data?.witnesses}
									fullWidth
									onChange={(event, witnesses) => {
										// console.log(event, type);

										if (typeof witnesses === 'string') {
											setData({
												...data,
												witnesses,
											});
										} else if (witnesses && witnesses.inputValue) {
											// Create a new value from the user input

											setData({
												...data,
												type: witnesses.inputValue,
											});
										} else {
											console.log('the else');
											setData({
												...data,
												witnesses,
											});
										}
									}}
									filterOptions={(types, params) => {
										const filtered = filter(types, params);

										const inputValue = params.inputValue;
										const isExisting = types.some(
											(type) => inputValue === type
										);

										if (inputValue !== '' && !isExisting) {
											filtered.push(inputValue);
										}

										return filtered;
									}}
									selectOnFocus
									clearOnBlur
									handleHomeEndKeys
									getOptionLabel={(option) => {
										if (typeof option === 'string') {
											return option;
										}
										if (option.inputValue) {
											return option.inputValue;
										}
										return option;
									}}
									renderOption={(props, option) => <li {...props}>{option}</li>}
									renderInput={(params) => (
										<>
											<TextField
												{...params}
												placeholder='Type Witnesses here'
												variant='outlined'
												value={data?.witnesses}
											/>
											<small>You can type multiple names here</small>
										</>
									)}
								/>

								{/* <TextField
												name='witnesses'
												onChange={handleChange}
												placeholder='Witnesses'
												variant='outlined'
												fullWidth
												value={selectedData?.witnesses}
											/> */}
							</Grid>
							<Grid item xs={12} md={6}>
								<AttachmentButton
									docs={docs}
									images={images}
									uploadHandler={(_) => setAttachmentModal(true)}
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
						</Grid>
						<Box
							mt={2}
							display={'flex'}
							alignItems={'center'}
							justifyContent={'center'}
						>
							<LandlordButton
								sx={{
									minWidth: 100,
								}}
								variant='contained'
								color='success'
								type='submit'
							>
								{!loading ? 'Save' : <LandlordLoading />}
							</LandlordButton>
						</Box>
					</Grid>
				</Box>
			</Box>
		);
	};

	const roomSelector = () => {
		if (parent !== 'Property')
			return (
				<Box display={'flex'} flexDirection={'column'}>
					<Box my={1}>
						<Typography component={'h2'} variant={'h6'}>
							Select Room
						</Typography>
					</Box>
					<Box width={'100%'}>
						<Grid container spacing={2}>
							<Grid item md={10}>
								<Autocomplete
									fullWidth
									key={data?.property}
									placeholder='Room'
									style={{ marginBottom: 16 }}
									id='room-autocomplete'
									options={rooms?.filter(
										(room) => room?.property?._id === property?._id
									)}
									getOptionLabel={(room) => `${room.name}`}
									onChange={(e, room, reason) => {
										reason === 'selectOption' ? setRoom(room) : setRoom(null);
										if (parent === 'Room') {
											setSelectedParentData(room);
										}
									}}
									value={data?.room}
									renderInput={(params) => {
										return (
											<TextField
												{...params}
												fullWidth
												value={data?.room?.name}
												placeholder='Room'
												variant='outlined'
												required
											/>
										);
									}}
								/>
							</Grid>
							<Grid item md={2}>
								<LandlordButton
									onClick={() => setAddRoomModal(true)}
									variant={'contained'}
									color={'success'}
									style={{
										minHeight: 40,
									}}
									fullWidth
								>
									<Add
										sx={{
											transform: 'scale(1.5)',
										}}
									/>
								</LandlordButton>
							</Grid>
						</Grid>
					</Box>
				</Box>
			);
	};

	const parentForm = () => {
		return (
			<>
				<Box>
					{roomSelector()}
					{parent !== 'Property' && parent !== 'Room' && room && (
						<React.Fragment>
							<Box my={1} display='flex' justifyContent='space-between'>
								<Typography variant='h6' component='h2'>
									Select {parent}
								</Typography>
							</Box>
							<Box spacing={2}>
								<Grid container spacing={2}>
									<Grid item xs={10} md={10}>
										<Autocomplete
											// key={selectedRoom?._id || selectedProperty?._id}
											style={{ marginBottom: 16 }}
											id='data-autocomplete'
											options={parentData}
											getOptionLabel={(r) => `${r?.name}`}
											onChange={(e, selectData, reason) => {
												reason === 'selectOption'
													? setSelectedParentData(selectData)
													: setSelectedParentData(null);
											}}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={selectedParentData?.name}
														placeholder={parent}
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={2} md={2}>
										<LandlordButton
											onClick={() => setAddModal(true)}
											variant={'contained'}
											color={'success'}
											style={{
												minHeight: 40,
											}}
											fullWidth
										>
											<Add
												sx={{
													transform: 'scale(1.5)',
												}}
											/>
											{/* Add {parent} */}
										</LandlordButton>
									</Grid>
								</Grid>
							</Box>
						</React.Fragment>
					)}
					{selectedParentData && (
						<Box
							display={'flex'}
							justifyContent={'flex-end'}
							width={'100%'}
							alignItems={'center'}
							mt={2}
						>
							<LandlordButton
								sx={{
									minWidth: 150,
									minHeight: 40,
								}}
								variant='contained'
								color={'primary'}
								onClick={() => setFormStep(2)}
							>
								Next
							</LandlordButton>
						</Box>
					)}
				</Box>
			</>
		);
	};

	const getParentData = () => {
		console.log('got parent', parent);
		if (parent !== 'Room') setSelectedParentData(null);
		switch (parent) {
			case 'Property':
				console.log('got property', property);
				setSelectedParentData(property);
				break;
			case 'Room':
				setParentData(rooms);
				break;
			case 'Fixture':
				setParentData(fixtures?.filter((f) => f.room?._id === room?._id));
				break;
			case 'Systems':
				console.log('all systems', systems);
				setParentData(
					systems?.filter(
						(s) =>
							s?.property?._id === property?._id &&
							(s?.room?._id === null ||
								s?.room === null ||
								s.room?._id === room?._id)
					)
				);
				break;
			case 'Physical Property':
				setParentData(
					physicalProperties?.filter((pp) => pp?.room?._id === room?._id)
				);
				break;
			default:
				setParentData([]);
				break;
		}
	};

	const parentBuilder = () => {
		return (
			<Box display={'flex'} flexDirection={'column'} minWidth={'500px'}>
				<Box my={1}>
					<Typography fontWeight={'bold'} component={'h1'} variant={'h5'}>
						Record Damage to
					</Typography>
				</Box>
				<Box width={'100%'}>
					<Autocomplete
						id='parent-type-autocomplete'
						options={[
							'Property',
							'Room',
							'Fixture',
							'System',
							'Physical Property',
						]}
						getOptionLabel={(option) => `${option}`}
						onChange={(e, type, reason) => {
							console.log('setting parent', type);
							reason === 'selectOption' ? setParent(type) : setParent(null);
						}}
						value={data?.parent}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									value={parent}
									placeholder='Record Damage to'
									variant='outlined'
									required
								/>
							);
						}}
					/>
				</Box>
				{parent && (
					<Box display={'flex'} flexDirection={'column'}>
						{parentForm()}
					</Box>
				)}
			</Box>
		);
	};

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						{formStep === 1 ? parentBuilder() : formBuilder()}
						<ScheduleFields data={data} setData={setData} nature={nature} />
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>

			{addModal && (
				<RenderAddForm
					open={addModal}
					setOpen={setAddModal}
					name={parent}
					properties={properties}
					rooms={rooms}
					handleClose={() => {
						setAddModal(false);
					}}
				/>
			)}

			<AddRoomModal
				title={'Add'}
				handleClose={() => {
					setAddRoomModal(false);
				}}
				onClose={() => {
					setAddRoomModal(false);
				}}
				open={addRoomModal}
				properties={properties}
			/>

			<ImageDocumentModal
				images={images}
				setImages={setImages}
				docs={docs}
				setDocs={setDocs}
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
			/>
		</>
	);
};

export default AddDamageModal;
