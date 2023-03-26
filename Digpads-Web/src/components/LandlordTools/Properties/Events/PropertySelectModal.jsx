import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Autocomplete,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Divider,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { GetUtilityList } from 'store/actions/Property/utilityAction';
import { GetPropertiesList } from 'store/actions/Property/propertiesAction';
import { GetMaintenanceList } from 'store/actions/Property/maintenanceAction';
import { GetTaxList } from 'store/actions/Property/taxAction';
import { GetRepairList } from 'store/actions/Property/repairAction';
import { GetInsuranceList } from 'store/actions/Property/insuranceAction';
import { GetPhysicalList } from 'store/actions/Property/physicalPropertyAction';
import { GetOtherCostList } from 'store/actions/Property/otherCostAction';
import { GetAllFixtures } from 'store/actions/Property/fixtureAction';
import { GetSystemList } from 'store/actions/Property/systemAction';
import { GetAllRooms } from 'store/actions/Property/roomAction';
import { GetEventList } from 'store/actions/Property/eventAction';
import InvoicePaymentModal from './SubmissionModals/InvoicePaymentModal';
import AddServiceModal from './SubmissionModals/AddServiceModal';
import AddDamageModal from './SubmissionModals/AddDamageModal';
import AddTaxAssessmentModal from './SubmissionModals/AddTaxAssessmentModal';
import AddInsuranceClaimModal from './SubmissionModals/AddInsuranceClaimModal';
import AddMaintenanceEventModal from './SubmissionModals/AddMaintenanceEventModal';
import AddRemodelRepairModal from './SubmissionModals/AddRemodelRepairEvent';
import AddCondtionChangeEventModal from './SubmissionModals/AddConditionChangeModal';
import AddRoomModal from '../Rooms/AddRoomModal';
import RenderAddForm from './SubmissionModals/RenderAddForm';
import AddTaxBillModal from './SubmissionModals/AddTaxBillModal';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard';
import { LandlordButton } from 'components/styled/Button';
import { modalBoxStyles } from 'components/styled/Modal';
import { LandlordTextButton } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const PropertySelectModal = ({
	nature,
	open,
	handleClose,
	// styles,
	classes,
	eventType,
	selectionType,
	parent,
	dialogData,
	closeParentModals,
	onInsuranceClaim,
	header,
}) => {
	const [properties, setProperties] = useState([]);
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [addRoomModal, setAddRoomModal] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [selectedData, setSelectedData] = useState(null);
	const [title, setTitle] = useState([]);
	const [allowDataFields, setAllowDataFields] = useState(false);
	const [allowMultiFields, setAllowMultiFields] = useState(false);
	const [dataType, setDataType] = useState(false);
	const [addModal, setAddModal] = useState(false);

	// Modal hanlders
	const [invoicePaymentModal, setInvoicePaymentModal] = useState(false);
	const [addServiceModal, setAddServiceModal] = useState(false);
	const [addDamageModal, setAddDamageModal] = useState(false);
	const [addTaxAssessmentModal, setAddTaxAssessmentModal] = useState(false);
	const [addTaxBillModal, setAddTaxBillModal] = useState(false);
	const [addInsuranceClaimModal, setAddInsuranceClaimModal] = useState(false);

	const [addConditionEventModal, setAddConditionEventModal] = useState(false);
	const [addMaintenanceEventModal, setAddMaintenanceEventModal] =
		useState(false);
	const [addRemodelRepairEventModal, setAddRemodelRepairEventModal] =
		useState(false);
	const [askInsuranceClaim, setAskInsuranceClaim] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log('property changed', selectedProperty);
	}, [selectedProperty]);

	useEffect(() => {
		console.log('room changed', selectedRoom);
	}, [selectedRoom]);

	useEffect(() => {
		console.log('data type changed', dataType);
	}, [dataType]);

	const dataForm = () => {
		return (
			<>
				<Box display='flex' justifyContent='space-between' my={2}>
					<Typography variant='h6' component='h2' fontWeight='bold'>
						Select {parent}
					</Typography>
				</Box>
				<Box spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={10}>
							<Autocomplete
								// key={selectedRoom?._id || selectedProperty?._id}

								id='data-autocomplete'
								value={selectedData}
								options={filteredData}
								noOptionsText={"You don't have any " + parent}
								getOptionLabel={(r) => `${r?.name}`}
								onChange={(e, selectData, reason) =>
									reason === 'selectOption'
										? setSelectedData(selectData)
										: setSelectedData(null)
								}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={selectedData?.name}
											placeholder={selectionType}
											variant='outlined'
											required
										/>
									);
								}}
							/>
						</Grid>
						<Grid md={0.5}></Grid>

						<Grid item xs={12} md={1}>
							<LandlordButton
								onClick={() => setAddModal(true)}
								variant={'contained'}
								color={'success'}
								// style={{
								// 	height: '80%',
								// }}
								fullWidth
							>
								<Add
									sx={{
										transform: 'scale(1.9)',
									}}
								/>
								{/* Add {parent} */}
							</LandlordButton>
						</Grid>

						<Grid item xs={12} md={12} mb={2}>
							<DataCard data={selectedData} />
						</Grid>
					</Grid>
				</Box>
			</>
		);
	};

	const roomForm = () => {
		return (
			<>
				<Box display='flex' justifyContent='space-between' my={2}>
					<Typography variant='h6' component='h2' fontWeight='bold'>
						Select Room
					</Typography>
				</Box>
				<Grid spacing={2}>
					<Grid container spacing={2}>
						<Grid item md={10}>
							<Autocomplete
								// key={selectedProperty?._id}

								id='rooms-autocomplete'
								options={rooms}
								noOptionsText={'Select a Property '}
								getOptionLabel={(i) => `${i.name}`}
								onChange={(e, item, reason) => {
									setSelectedData(null);
									setDataType(null);
									console.log('changed from room');
									reason === 'selectOption'
										? setSelectedRoom(item)
										: setSelectedRoom(null);
								}}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											value={selectedRoom?.name}
											placeholder={'Room'}
											variant='outlined'
											required
										/>
									);
								}}
							/>
						</Grid>
						<Grid md={0.5}></Grid>
						<Grid item md={1}>
							<LandlordButton
								onClick={() => setAddRoomModal(true)}
								variant={'contained'}
								color={'success'}
							>
								<Add
									sx={{
										transform: 'scale(1.9)',
									}}
								/>
							</LandlordButton>
							{/* <LandlordButton
								onClick={() => setAddRoomModal(true)}
								variant={'contained'}
								color={'success'}
								style={{
									height: '80%',
								}}
								fullWidth
							>
								Add Room
							</LandlordButton> */}
						</Grid>
					</Grid>
				</Grid>
			</>
		);
	};

	const multiForm = () => {
		return (
			<>
				{roomForm()}
				{selectedRoom && (
					<React.Fragment>
						<Grid spacing={2}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={12} mt={2}>
									<Autocomplete
										// key={selectedRoom?._id}

										id='data-type-autocomplete'
										options={[
											'None',
											'Fixture',
											'System',
											'Physical Property',
										]}
										getOptionLabel={(type) => `${type}`}
										noOptionsText={
											'Select a Property & Room'
										}
										value={dataType}
										onChange={(e, type, reason) => {
											// if (type === 'None') {
											// 	setDataType(null);
											// } else {
											setSelectedData(null);
											reason === 'selectOption'
												? setDataType(type)
												: setDataType(null);
											getMultiDataOptions(type);
											// }
										}}
										renderInput={(params) => {
											return (
												<TextField
													{...params}
													value={dataType}
													placeholder={
														'Select Additional Type'
													}
													variant='outlined'
													required
												/>
											);
										}}
									/>
								</Grid>
								{dataType && dataType !== 'None' && (
									<React.Fragment>
										<Grid item md={10}>
											<Autocomplete
												// key={dataType}

												id='data-autocomplete'
												noOptionsText={
													filterData?.length < 1
														? `No ${dataType} found`
														: 'Select a Data Type'
												}
												options={filteredData}
												getOptionLabel={(r) =>
													`${r?.name}`
												}
												value={selectedData}
												onChange={(
													e,
													newData,
													reason
												) => {
													reason === 'selectOption'
														? setSelectedData(
																newData
														  )
														: setSelectedData(null);
												}}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={selectedData}
															placeholder={`Select ${dataType}`}
															variant='outlined'
															required
														/>
													);
												}}
											/>
										</Grid>
										<Grid md={0.5}></Grid>
										<Grid item md={1}>
											<LandlordButton
												onClick={() =>
													setAddModal(true)
												}
												variant={'contained'}
												color={'success'}
												fullWidth
											>
												<Add
													sx={{
														transform: 'scale(1.9)',
													}}
												/>
												{/* Add {dataType} */}
											</LandlordButton>
										</Grid>
										<Grid item xs={12} md={12} mb={2}>
											<DataCard
												data={selectedData}
												name={dataType}
											/>
										</Grid>
									</React.Fragment>
								)}
							</Grid>
						</Grid>
					</React.Fragment>
				)}
			</>
		);
	};

	const getMultiDataOptions = (type) => {
		switch (type || dataType) {
			case 'Fixture':
				console.log('Fixture', fixtureData.data);
				setData(fixtureData.data);
				// previous filtering
				// filterData();
				// getPopertyRooms();
				break;
			case 'Physical Property':
				console.log('PP', physicalData.data);
				setData(physicalData.data);
				// filterData();
				// getPopertyRooms();
				break;
			case 'Systems':
				console.log('ss', systemData?.data);
				setData(systemData?.data);
				break;
			default:
				setData([]);
				console.log('unknown data type', dataType);
				break;
		}
	};

	const getSingularTitle = () => {
		switch (selectionType) {
			case 'Utilities':
				return 'Utility';
			case 'Taxes':
				return 'Tax';
			case 'General Expenses':
				return 'General Expense';
			default:
				return selectionType;
		}
	};

	const propertiesData = useSelector((state) => state.PropertiesList);
	const roomList = useSelector((state) => state.RoomList);

	const getPopertyRooms = () => {
		let pRooms = roomList?.data?.filter(
			(r) => r?.property?._id === selectedProperty?._id
		);
		setRooms(pRooms);
	};

	useEffect(() => {
		setProperties(propertiesData.data);
	}, [propertiesData.data]);

	useEffect(() => {
		setSelectedData(null);
		getPopertyRooms();
		//eslint-disable-next-line
	}, [selectedProperty, data, roomList?.data]);

	const utilitiesData = useSelector((state) => state.UtilityList);
	const costData = useSelector((state) => state.OtherCostList);
	const maintenanceData = useSelector((state) => state.MaintenanceList);
	const taxData = useSelector((state) => state.TaxList);
	const repairData = useSelector((state) => state.RepairList);
	const insuranceData = useSelector((state) => state.InsuranceList);
	const physicalData = useSelector((state) => state.PhysicalList);
	const fixtureData = useSelector((state) => state.FixtureList);
	const systemData = useSelector((state) => state.SystemList);

	useEffect(() => {
		filterData();
		//eslint-disable-next-line
	}, [
		data,
		selectedRoom,
		selectedProperty,
		utilitiesData?.data,
		costData?.data,
		maintenanceData?.data,
		taxData?.data,
		repairData?.data,
		insuranceData?.data,
		physicalData?.data,
		fixtureData?.data,
		systemData?.data,
	]);

	useEffect(() => {
		console.log('data changed', data);
	}, [data]);
	const filterData = () => {
		const allData = data;
		let propertyData = [];
		switch (parent) {
			case 'Utilities':
			case 'Physical Property':
			case 'Maintenance':
			case 'Repair and Remodels':
			case 'Fixture':
			case 'Condition Change':
			case 'Systems':
				console.log('here');
				console.log(`all data for ${parent}`, allData);
				propertyData = allData?.filter(
					(_d) =>
						_d?.property?._id === selectedProperty?._id &&
						_d?.room?._id === selectedRoom?._id
				);
				break;
			default:
				// console.log('default parent ==> ', parent);
				if (eventType === 'Repair & Remodel') {
					propertyData = allData?.filter(
						(_d) =>
							_d?.property?._id === selectedProperty?._id &&
							_d?.room?._id === selectedRoom?._id
					);
				} else {
					console.log('landed here');
					propertyData = allData?.filter(
						(_d) =>
							_d?.property?._id === selectedProperty?._id &&
							_d?.room?._id === selectedRoom?._id
					);
				}
				break;
		}
		setFilteredData(propertyData);
	};

	const roomFields = () => {
		let show;
		console.log('parent got -> ', parent);
		switch (parent) {
			case 'Fixture':
			case 'Physical Property':
			case 'Utilities':
			case 'Maintenance':
			case 'Repair & Remodel':
			case 'Systems':
			case 'Tenant':
			case 'Weather':
			case 'No Fault':
			case 'Unknown':
				show = true;
				break;
			default:
				show = false;
		}
		return show;
	};
	// Show or hide bottom form
	useEffect(() => {
		if (open === false) {
			setData([]);
			setFilteredData([]);
			setSelectedData({});
			setSelectedProperty(null);
			setSelectedRoom(null);
			setAllowDataFields(false);
			setAllowMultiFields(false);
		} else {
			console.log('eventType', eventType);
			// Show/Hide Extra Fields
			switch (eventType) {
				case 'Maintenance':
				case 'Repair & Remodel':
					// case 'Damage':
					setAllowMultiFields(true);
					break;
				case 'Invoice/Expense':
				case 'Payment':
				case 'Service':
				case 'Tax Assessment':
				case 'Insurance Claim':
				case 'Condition Change':
				case 'Tax Bill':
					console.log('show');
					setAllowDataFields(true);
					break;
				default:
					console.log('don`t show');
					setAllowDataFields(false);
					break;
			}
			// Autocomplete Data
			console.log('we got the parent for', parent);
			console.log('changing data now');
			switch (parent) {
				case 'Utilities':
					setData(utilitiesData.data);
					break;
				case 'General Expenses':
					setData(costData.data);
					break;
				case 'Physical Property':
					setData(physicalData.data);
					break;
				case 'Taxes':
					setData(taxData.data);
					break;
				case 'Insurance':
					setData(insuranceData.data);
					break;
				case 'Maintenance':
					setData(maintenanceData.data);
					break;
				case 'Fixture':
					setData(fixtureData.data);
					break;
				case 'Repair & Remodel':
					setData(repairData.data);
					break;
				case 'Systems':
					setData(systemData?.data);
					break;
				default:
					console.log('got nothing...');
					// setData([]);
					// setFilteredData([]);
					getMultiDataOptions();
					filterData();
					break;
			}
		}
	}, [
		open,
		parent,
		eventType,
		selectionType,
		fixtureData.data,
		costData.data,
		insuranceData.data,
		maintenanceData.data,
		physicalData.data,
		repairData.data,
		taxData.data,
		utilitiesData.data,
		systemData?.data,
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSelectedData({
			data: { ...selectedData },
			type: selectionType,
			event: eventType,
			parent,
		});
		switch (eventType) {
			case 'Invoice/Expense':
				setInvoicePaymentModal(true);
				console.log('setting title for invoice');
				setTitle(`${nature} a ${getSingularTitle()} Invoice`);
				break;
			case 'Payment':
				setTitle(`${nature} a ${getSingularTitle()} Payment`);
				setInvoicePaymentModal(true);
				break;
			case 'Service':
				setTitle(`${nature} a ${dialogData}`);
				setAddServiceModal(true);
				break;
			case 'Damage':
				setTitle(`${nature} a ${getSingularTitle()} Damage to `);
				console.log('data sending', selectedData);
				setAddDamageModal(true);
				break;
			case 'Insurance Claim':
				setTitle(`${nature} ${selectionType}`);
				setAddInsuranceClaimModal(true);
				break;
			case 'Tax Assessment':
				setTitle(`Add a ${getSingularTitle()}`);
				setAddTaxAssessmentModal(true);
				break;
			case 'Tax Bill':
				setTitle(`${nature} a Tax Bill ${selectionType}`);
				setAddTaxBillModal(true);
				break;
			case 'Maintenance':
				setTitle(`${nature} a ${eventType} ${selectionType} Event`);
				setSelectedData({
					data: { ...selectedData },
					type: selectionType,
					event: eventType,
					parent: dataType,
					room: selectedRoom,
				});
				setAddMaintenanceEventModal(true);
				break;
			case 'Repair & Remodel':
				setTitle(`${nature} a ${eventType} ${selectionType} Event`);
				setAddRemodelRepairEventModal(true);
				break;
			case 'Condition Change':
				setSelectedData({
					data: { ...selectedData },
					type: dialogData,
					event: eventType,
					room: selectedRoom,
					parent,
				});
				setTitle(`${nature} a ${dialogData} ${selectionType} Event`);
				setAddConditionEventModal(true);
				break;
			default:
				console.log('unkown selection type', selectionType);
				break;
		}
	};

	const finalClose = () => {
		console.log(selectedData?.parent);
		switch (selectedData?.parent) {
			case 'Utilities':
				dispatch(GetUtilityList());
				break;
			case 'General Expenses':
				dispatch(GetOtherCostList());
				break;
			case 'Taxes':
				dispatch(GetTaxList());
				break;
			case 'Maintenance':
				dispatch(GetMaintenanceList());
				break;
			case 'Repair & Remodel':
				dispatch(GetRepairList());
				break;
			case 'Insurance':
				dispatch(GetInsuranceList());
				break;
			case 'Fixture':
				dispatch(GetAllFixtures());
				break;
			case 'Physical Property':
				dispatch(GetPhysicalList());
				break;
			case 'Systems':
				dispatch(GetSystemList());
			default:
				console.log('default');
				dispatch(GetPropertiesList());
				break;
		}
		closeParentModals();
	};

	const checkButtonVisibility = () => {
		if (dataType === 'None' || selectedData) {
			return true;
		}
		if (eventType === 'Damage' && selectedRoom) {
			return true;
		} else return false;
	};

	return !open ? (
		<></>
	) : (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper sx={{ pb: 2 }}>
						<TitleBox>
							<Typography
								component={'h2'}
								variant={'h4'}
								fontWeight={'bold'}
							>
								{header}
							</Typography>
							<CloseBox>
								<Close
									style={{ cursor: 'pointer' }}
									onClick={handleClose}
								/>
							</CloseBox>
						</TitleBox>
						<Divider />
						<Box
							component={'form'}
							onSubmit={handleSubmit}
							// key={addRoomModal || addModal}
						>
							<Box display='flex' justifyContent='space-between'>
								<Typography
									variant='h6'
									component='h2'
									fontWeight='bold'
									mb={1}
								>
									Choose Property
								</Typography>
							</Box>
							<Box mb={2}>
								<Grid spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={12}>
											<Autocomplete
												id='property-autocomplete'
												options={properties}
												getOptionLabel={(property) =>
													`${property.propertyName}`
												}
												value={selectedProperty}
												onChange={(
													e,
													property,
													reason
												) => {
													setSelectedRoom(null);
													setSelectedData(null);
													setDataType(null);
													console.log(
														'changed from property'
													);
													reason === 'selectOption'
														? setSelectedProperty(
																property
														  )
														: setSelectedProperty(
																null
														  );
												}}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																selectedProperty?.propertyName ||
																''
															}
															placeholder='Property'
															variant='outlined'
															required
														/>
													);
												}}
											/>
										</Grid>
										<Grid item xs={12} md={12}>
											<PropertyCard
												property={selectedProperty}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Box>
							{selectedProperty !== null && (
								<React.Fragment>
									<React.Fragment>
										{roomFields() && roomForm()}
										{allowDataFields && dataForm()}

										{allowMultiFields && multiForm()}

										{checkButtonVisibility() && (
											<LandlordButton
												fullWidth
												color={'primary'}
												variant='contained'
												style={{
													marginTop: 16,
													marginBottom: 16,
													paddingLeft: 16,
													paddingRight: 16,
													minWidth: 160,
													textAlign: 'center',
												}}
												type='submit'
											>
												Submit
											</LandlordButton>
										)}
									</React.Fragment>
								</React.Fragment>
							)}
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			{addModal && (
				<RenderAddForm
					open={addModal}
					setOpen={setAddModal}
					name={allowMultiFields ? dataType : parent}
					properties={properties}
					rooms={roomList?.data}
					handleClose={(data) => {
						console.log('got data from close', data);
						setAddModal(false);
						setSelectedData(null);
						if (data) {
							setSelectedProperty(data?.property);
							console.log('property set');
							filterData();
							console.log('filterd data');
							setSelectedData(data);
						}
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
			<InvoicePaymentModal
				open={invoicePaymentModal}
				handleClose={() => {
					handleClose();
					setInvoicePaymentModal(false);
				}}
				closeParentModals={() => {
					finalClose();
				}}
				title={title}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				eventType={eventType}
				room={selectedRoom}
				selectedData={selectedData}
			/>
			<AddServiceModal
				open={addServiceModal}
				handleClose={() => {
					handleClose();
					setAddServiceModal(false);
				}}
				closeParentModals={() => {
					finalClose();
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				title={title}
				selectedData={selectedData}
				dialogData={dialogData}
				eventType={eventType}
				property={selectedProperty}
				room={selectedRoom}
			/>
			{/* TODO: Make the dialog or modal work after closing the
			AddDamageModal */}
			<AddDamageModal
				open={addDamageModal}
				handleClose={() => {
					handleClose();
					setAddDamageModal(false);
					// setAskInsuranceClaim();
				}}
				closeParentModals={() => {
					// finalClose();
					setAddDamageModal(false);
					setAskInsuranceClaim(true);
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				title={title}
				selectedData={selectedData}
				property={selectedProperty}
				eventType={eventType}
				room={selectedRoom}
			/>
			<AddTaxBillModal
				open={addTaxBillModal}
				handleClose={() => {
					setAddTaxBillModal(false);
					console.log('close it');
					handleClose();
				}}
				closeParentModals={() => {
					finalClose();

					handleClose();
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				title={title}
				selectedData={selectedData}
				property={selectedProperty}
				eventType={eventType}
			/>
			<AddTaxAssessmentModal
				open={addTaxAssessmentModal}
				handleClose={() => {
					setAddTaxAssessmentModal(false);
					handleClose();
				}}
				closeParentModals={() => {
					finalClose();

					handleClose();
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				title={title}
				selectedData={selectedData}
				eventType={eventType}
				room={selectedRoom}
			/>
			<AddInsuranceClaimModal
				open={addInsuranceClaimModal}
				handleClose={() => {
					handleClose();
					setAddInsuranceClaimModal(false);
				}}
				closeParentModals={() => {
					finalClose();
					handleClose();
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				selectedData={selectedData}
				eventType={eventType}
				fixtureData={fixtureData?.data}
				physicalData={physicalData?.data}
				property={selectedProperty}
				room={selectedRoom}
			/>
			<AddMaintenanceEventModal
				open={addMaintenanceEventModal}
				handleClose={() => {
					handleClose();
					setAddMaintenanceEventModal(false);
				}}
				closeParentModals={() => {
					finalClose();

					handleClose();
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				title={title}
				selectedData={selectedData}
				eventType={eventType}
				property={selectedProperty}
				room={selectedRoom}
			/>
			<AddRemodelRepairModal
				open={addRemodelRepairEventModal}
				handleClose={() => {
					handleClose();
					setAddRemodelRepairEventModal(false);
				}}
				closeParentModals={() => {
					finalClose();

					handleClose();
				}}
				classes={classes}
				nature={nature}
				styles={modalBoxStyles}
				title={title}
				property={selectedProperty}
				selectedData={selectedData}
				eventType={eventType}
				room={selectedRoom}
				dialogData={dialogData}
			/>
			<AddCondtionChangeEventModal
				open={addConditionEventModal}
				handleClose={() => {
					handleClose();
					setAddConditionEventModal(false);
				}}
				closeParentModals={() => {
					finalClose();
					handleClose();
				}}
				classes={classes}
				styles={modalBoxStyles}
				title={title}
				selectedData={selectedData}
				dialogData={dialogData}
				properties={properties}
				eventType={eventType}
				rooms={roomList?.data}
				room={selectedRoom}
			/>
			<Dialog
				open={askInsuranceClaim}
				onClose={setAskInsuranceClaim}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Insurance Claim?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{'Would you like to file an Insurance Claim?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordTextButton
						variant='text'
						color={'error'}
						onClick={() => {
							handleClose();
							setAskInsuranceClaim(false);
							closeParentModals();
						}}
					>
						No
					</LandlordTextButton>
					<LandlordTextButton
						variant={'text'}
						color={'primary'}
						onClick={() => {
							setAskInsuranceClaim(false);
							onInsuranceClaim();
						}}
						autoFocus
					>
						Yes
					</LandlordTextButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default PropertySelectModal;
