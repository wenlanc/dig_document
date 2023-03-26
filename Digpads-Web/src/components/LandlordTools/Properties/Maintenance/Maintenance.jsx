import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';
import AddMaintenance from './AddMaintenance.jsx';
import MaintenanceSearchModal from './MaintenanceSearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import { LandlordButton } from '../../../styled/Button';
import { useSelector } from 'react-redux';
import { Alert as MuiAlert } from '@mui/material';
import CustomSnackbar from '../../../Utils/CustomSnackbar.jsx';
import colors from '../../../../assets/theme/base/colors';
import EventActions from '../Events/Utils/EventActions.jsx';
import DataTable from 'components/DataTable/index.js';
import moment from 'moment';
import { nwc } from '../../../../utils/NumberUtils';
import EventSecondaryActions from '../Events/Utils/EventSecondaryActions.jsx';
import ArchivedEventsModal from '../Utils/ArchivedEventsModal.jsx';
import {
	ConvertToRecorded,
	ArchiveEvent,
} from 'store/actions/Property/eventAction.js';
import { useDispatch } from 'react-redux';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function Maintenance() {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});
	const [maintenances, setMaintenances] = useState([]);
	const [filteredMaintenances, setFilteredMaintenances] =
		useState(maintenances);
	const [populatedEvents, setPopulatedEvents] = useState([]);

	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [rooms, setRooms] = useState([]);

	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});
	// const [data, setData] = useState([]);

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	// // Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);

	const [id, setId] = useState('');
	const [row, setRow] = useState({});

	const propertiesData = useSelector((state) => state.PropertiesList);
	const maintenanceData = useSelector((state) => state.MaintenanceList);
	const roomList = useSelector((state) => state.RoomList);

	const fetchData = async () => {
		setProperties([...propertiesData.data]);
		setMaintenances([...maintenanceData.data]);
		setRooms([...roomList.data]);
		setFilteredMaintenances([...maintenanceData.data]);
		setPropertyFilter(null);
	};

	useEffect(() => {
		setProperties([...propertiesData.data]);
		setMaintenances([...maintenanceData.data]);
		setRooms([...roomList.data]);
	}, [propertiesData.data, maintenanceData.data, roomList.data]);

	const filterMaintenanceData = () => {
		const filtered = [];
		maintenanceData?.data?.forEach((maintenance) => {
			maintenance.dateIncured = moment(maintenance?.dateIncured).format(
				'DD/MM/YYYY'
			);
			if (propertyFilter) {
				if (maintenance?.property?._id === propertyFilter?._id)
					filtered?.push(maintenance);
			} else {
				filtered?.push(maintenance);
			}
		});
		setFilteredMaintenances(filtered);
		handlePopulateEvents();
	};

	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];

		maintenanceData?.events?.forEach((event) => {
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			event.amount = event?.parent?.amount
				? `$ ${nwc(event?.parent?.amount)}`
				: '-';
			if (
				event?.eventNature === 'Schedule' &&
				moment(event?.scheduleDate).isBefore(moment().toDate())
			) {
				event.isOverdue = true;
			} else {
				event.isOverdue = false;
			}

			event.room = event.room ? event.room : { name: 'No Room' };

			event.status = event.eventStatus ? (
				'Done'
			) : event?.isOverdue ? (
				<>
					{'Pending'}{' '}
					<Typography
						component={'span'}
						variant={'small'}
						color={'red'}
					>
						!
					</Typography>{' '}
				</>
			) : (
				'Pending'
			);

			if (
				(event?.eventNature === 'Record' &&
					!moment(event?.eventRecordedOn).isBefore(
						moment().add(2, 'weeks').toDate()
					)) ||
				event?.archived
			) {
				_archivedEvents.push(event);
				return;
			}
			if (propertyFilter) {
				if (propertyFilter?._id === event?.property?._id) {
					events.push(event);
				}
			} else {
				events.push(event);
			}
		});
		if (overDueOnly)
			events = events?.filter((event) => event.isOverdue === true);
		setArchivedEvents([..._archivedEvents]);
		setPopulatedEvents([...events]);
	};

	useEffect(() => {
		fetchData();
		filterMaintenanceData();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterMaintenanceData();
		//eslint-disable-next-line
	}, [maintenances]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterMaintenanceData();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(maintenanceData.response);
	}, [maintenanceData.response]);

	useEffect(() => {
		handlePopulateEvents();
	}, [maintenanceData?.data, overDueOnly]);

	const columns = [
		{
			Header: 'status',
			accessor: 'status',
		},
		{
			Header: 'property name',
			accessor: 'property.propertyName',
		},
		{
			Header: 'Room',
			accessor: 'room.name',
		},
		{
			Header: 'Type',
			accessor: 'eventType',
		},
		{
			Header: 'Event Date',
			accessor: 'date',
		},
	]; // EVENTS CONTEXT MENU
	const [contextMenu, setContextMenu] = React.useState(null);
	const [selectedRow, setSelectedRow] = React.useState(null);
	const dispatch = useDispatch();

	const handleEventRow = (event, row) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
				  }
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
				  // Other native context menus might behave different.
				  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
				  null
		);
		setSelectedRow(row);
	};

	const handleClose = () => {
		setContextMenu(null);
		setSelectedRow(null);
	};

	const handleConvertEvent = () => {
		dispatch(
			ConvertToRecorded({
				_id: selectedRow?._id,
			})
		);
		setSelectedRow(null);
		setContextMenu(null);
	};
	const handleArchiveEvent = () => {
		dispatch(
			ArchiveEvent({
				_id: selectedRow?._id,
			})
		);
		setSelectedRow(null);
		setContextMenu(null);
	};

	return (
		<>
			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
			<Box py={2}>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
				>
					<Box width={'100%'}>
						<Heading variant='h2' component='h2' textAlign='center'>
							{' '}
							Properties
						</Heading>
						<Heading
							color={colors.primary.main}
							variant='h3'
							component='h3'
							textAlign={'center'}
							mb={4}
						>
							{' '}
							Maintenance
						</Heading>
					</Box>
				</Box>
				<Box display={'flex'} flexDirection={'column'} rowGap={6}>
					<Paper sx={{ pt: 4, borderRadius: 3 }}>
						{/* Event Actions */}
						<Box
							display='flex'
							flexDirection='row'
							justifyContent='space-between'
							px={4}
						>
							<Box
								display='flex'
								flexDirection='column'
								justifyContent={'center'}
								alignItems={'flex-start'}
								width={'75%'}
							>
								<Heading
									sx={{
										fontSize: 22,
									}}
								>
									Maintenance Events
									{propertyFilter !== null ? (
										<Typography
											style={{
												cursor: 'pointer',
											}}
											onClick={() =>
												setPropertyFilter(null)
											}
											fontSize={14}
										>
											<span
												style={{
													color: 'red',
												}}
											>
												X
											</span>{' '}
											Stop Filtering
										</Typography>
									) : null}
								</Heading>
							</Box>
							<EventActions />
						</Box>
						<EventSecondaryActions
							setArchivedEventsModal={setArchivedEventsModal}
							setOverDueOnly={setOverDueOnly}
						/>
						{/* Events Table */}
						<Box
							my={1}
							style={{
								position: 'relative',
							}}
						>
							<DataTable
								canSearch={true}
								filter={{
									handler: () => setPropertyFilterModal(true),
								}}
								loading={maintenanceData?.loading}
								pagination={{
									color: 'primary',
									variant: 'primary',
								}}
								table={{
									columns: columns,
									rows: populatedEvents,
								}}
								rowClickHandler={handleEventRow}
								title={'Maintenance Events'}
							/>
							<Menu
								open={contextMenu !== null}
								onClose={handleClose}
								anchorReference='anchorPosition'
								anchorPosition={
									contextMenu !== null
										? {
												top: contextMenu.mouseY,
												left: contextMenu.mouseX,
										  }
										: undefined
								}
							>
								{selectedRow?.eventNature !== 'Record' && (
									<MenuItem onClick={handleConvertEvent}>
										Convert to Recorded Event
									</MenuItem>
								)}
								<MenuItem onClick={handleArchiveEvent}>
									Archive Event
								</MenuItem>
								<MenuItem onClick={handleClose}>Close</MenuItem>
							</Menu>
						</Box>
					</Paper>
					<Paper sx={{ pt: 4, borderRadius: 3 }}>
						<Box>
							<Box
								display='flex'
								flexDirection='row'
								justifyContent='space-between'
								px={4}
							>
								<Box
									display='flex'
									flexDirection='column'
									justifyContent={'center'}
									alignItems={'center'}
								>
									<Heading
										sx={{
											fontSize: 22,
										}}
									>
										Maintenance Items
									</Heading>
									{propertyFilter !== null ? (
										<Typography
											style={{
												cursor: 'pointer',
											}}
											onClick={() =>
												setPropertyFilter(null)
											}
											fontSize={14}
										>
											<span
												style={{
													color: 'red',
												}}
											>
												X
											</span>{' '}
											Stop Filtering
										</Typography>
									) : null}
								</Box>
								<Box
									display={'flex'}
									justifyContent={'space-between'}
									columnGap={4}
								>
									<LandlordButton
										variant={'contained'}
										size={'medium'}
										color={'success'}
										onClick={() => {
											setOpenAdd(true);
										}}
									>
										Add Maintenance
									</LandlordButton>
									<LandlordButton
										size={'medium'}
										variant='contained'
										color={'warning'}
										onClick={() => {
											setSearchModal(true);
										}}
									>
										Edit/Remove Maintenance
									</LandlordButton>
								</Box>
							</Box>
							<Box
								my={1}
								style={{
									position: 'relative',
								}}
							>
								<DataTable
									canSearch={true}
									filter={{
										handler: () =>
											setPropertyFilterModal(true),
									}}
									loading={maintenanceData?.loading}
									pagination={{
										color: 'primary',
									}}
									table={{
										columns: [
											{
												Header: 'property name',
												accessor:
													'property.propertyName',
											},
											{
												Header: 'maintenance name',
												accessor: 'name',
											},
											{
												Header: 'maintenance type',
												accessor: 'type',
											},
											{
												Header: 'company',
												accessor: 'company',
											},
											{
												Header: 'room',
												accessor: 'room.name',
											},
											{
												Header: 'date incurred',
												accessor: 'dateIncured',
											},
										],
										rows: filteredMaintenances,
									}}
									title={'Maintenance Items'}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>

				<AddMaintenance
					title='Add'
					propData={row}
					setPropData={setRow}
					rooms={rooms}
					open={openAdd}
					properties={properties}
					onClose={() => {
						setOpenAdd(false);
					}}
					handleClose={() => {
						setOpenAdd(false);
					}}
				/>
				<MaintenanceSearchModal
					open={searchModal}
					title='Add'
					data={row}
					setData={setRow}
					rooms={rooms}
					properties={properties}
					maintenances={maintenances}
					// updateUtility={updateUtility}
					onClose={() => {
						setSearchModal(false);
					}}
					handleClose={() => {
						setSearchModal(false);
					}}
				/>

				<PropertyFilter
					open={propertyFilterModal}
					title='Add'
					data={maintenances}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterMaintenanceData}
				/>
			</Box>
			<ArchivedEventsModal
				open={archivedEventsModal}
				onClose={() => setArchivedEventsModal(false)}
				rows={archivedEvents}
				columns={columns}
				title={'Archived Events for Maintenance'}
			/>
		</>
	);
}
const headCells = [
	{
		id: 'property',
		numeric: false,
		disablePadding: true,
		label: 'Property Name',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Maintenance Name',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: true,
		label: 'Maintenance Type',
	},
	{
		id: 'room',
		numeric: false,
		disablePadding: true,
		label: 'Room',
	},
	{
		id: 'payor',
		numeric: false,
		disablePadding: false,
		label: 'Payor',
	},
	{
		id: 'company',
		numeric: false,
		disablePadding: false,
		label: 'Company',
	},
	{
		id: 'amount',
		numeric: true,
		disablePadding: true,
		label: 'Amount',
	},

	{
		id: 'startDate',
		numeric: true,
		disablePadding: false,
		label: 'Start Date',
	},
	{
		id: 'endDate',
		numeric: true,
		disablePadding: false,
		label: 'End Date',
	},
	{
		id: 'incurredDate',
		numeric: true,
		disablePadding: false,
		label: 'Incurred Date',
	},
	{
		id: 'enteredDate',
		numeric: true,
		disablePadding: false,
		label: 'Entered Date',
	},
	// {
	// 	id: 'actions',
	// 	numeric: true,
	// 	disablePadding: false,
	// 	label: 'Actions',
	// },
];

const eventHeadCells = [
	{
		id: 'property',
		numeric: false,
		disablePadding: true,
		label: 'Property',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Maintenance Name',
	},
	{
		id: 'company',
		numeric: false,
		disablePadding: true,
		label: 'Company',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: true,
		label: 'Type',
	},
	{
		id: 'eventType',
		numeric: false,
		disablePadding: true,
		label: 'Event Type',
	},
	{
		id: 'eventDate',
		numeric: true,
		disablePadding: true,
		label: 'Event Date',
	},
	{
		id: 'eventNotes',
		numeric: false,
		disablePadding: false,
		label: 'Event Notes',
	},
	{
		id: 'eventAttachments',
		numeric: false,
		disablePadding: false,
		label: 'Event Attachments',
	},
	{
		id: 'actions',
		numeric: true,
		disablePadding: false,
		label: 'Actions',
	},
];
