import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { LandlordButton, StyledButton } from '../../../styled/Button';
import PropertyFilter from '../PropertyFIlter.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Alert as MuiAlert } from '@mui/material';
import AddRoomModal from './AddRoomModal';
import RoomSearchModal from './RoomSearchModal';
import CustomSnackbar from '../../../Utils/CustomSnackbar';
import colors from 'assets/theme/base/colors';
import DataTable from 'components/DataTable';
import EventActions from '../Events/Utils/EventActions';
import moment from 'moment';
import EventSecondaryActions from '../Events/Utils/EventSecondaryActions';
import ArchivedEventsModal from '../Utils/ArchivedEventsModal';
import { ArchiveEvent } from 'store/actions/Property/eventAction';
import { ConvertToRecorded } from 'store/actions/Property/eventAction';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function Rooms() {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});
	const [rooms, setRooms] = useState([]);
	const [filteredRooms, setFilteredRooms] = useState(rooms);
	const [populatedEvents, setPopulatedEvents] = useState([]);
	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	// Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);

	const [row, setRow] = useState({});

	const propertiesData = useSelector((state) => state.PropertiesList);
	const roomData = useSelector((state) => state.RoomList);

	const fetchData = () => {
		setProperties([...propertiesData.data]);
		setRooms([...roomData.data]);
		setFilteredRooms([...roomData.data]);
		setPropertyFilter(null);
	};

	const filterRooms = () => {
		if (propertyFilter !== null) {
			const allRooms = rooms;
			const filtered = allRooms.filter(
				(room) => room.property._id === propertyFilter._id
			);
			setFilteredRooms(filtered);
		} else {
			setFilteredRooms(rooms);
		}
		handlePopulateEvents();
	};

	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];
		roomData?.events?.forEach((event) => {
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			// event.amount = event?.parent?.amount
			// 	? `$ ${nwc(event?.parent?.amount)}`
			// 	: '-';
			if (
				event?.eventNature === 'Schedule' &&
				moment(event?.scheduleDate).isBefore(moment().toDate())
			) {
				event.isOverdue = true;
			} else {
				event.isOverdue = false;
			}
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
				event?.archived ||
				(event?.eventNature === 'Record' &&
					!moment(event?.eventRecordedOn).isAfter(
						moment().subtract(2, 'weeks').toDate()
					))
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
		setPopulatedEvents([...events]);
		setArchivedEvents([..._archivedEvents]);
	};

	useEffect(() => {
		setProperties([...propertiesData.data]);
		setRooms([...roomData.data]);
	}, [roomData.data, propertiesData.data]);

	useEffect(() => {
		fetchData();
		filterRooms();
		// filterUtilities();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		// setFilteredRooms(rooms);
		filterRooms();
		//eslint-disable-next-line
	}, [rooms]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterRooms();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(roomData.response);
	}, [roomData.response]);

	useEffect(() => {
		handlePopulateEvents();
	}, [roomData?.events, overDueOnly]);

	// ARCHIVE EVENT LOGIC
	const [contextId, setContextId] = React.useState(null);
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
		setContextId(row?._id);
		console.log('selected');
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
							Rooms
						</Heading>
					</Box>
				</Box>
				<Box display={'flex'} flexDirection={'column'} rowGap={15}>
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
									Room Events
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
						{/* Events Table */}
						<EventSecondaryActions
							setArchivedEventsModal={setArchivedEventsModal}
							setOverDueOnly={setOverDueOnly}
						/>
						<Box
							my={1}
							style={{
								position: 'relative',
								cursor: 'context-menu',
							}}
						>
							<DataTable
								canSearch={true}
								filter={{
									handler: () => setPropertyFilterModal(true),
								}}
								loading={roomData?.loading}
								pagination={{
									color: 'primary',
									variant: 'primary',
								}}
								rowClickHandler={handleEventRow}
								table={{
									columns: [
										{
											Header: 'status',
											accessor: 'status',
										},
										{
											Header: 'Event Type',
											accessor: 'eventType',
										},
										{
											Header: 'Event Date',
											accessor: 'date',
										},
										{
											Header: 'property name',
											accessor: 'property.propertyName',
										},
										{
											Header: 'room name',
											accessor: 'room.name',
										},
										{
											Header: 'event of',
											accessor: 'eventLocation',
										},
										{
											Header: 'name',
											accessor: 'parentName',
										},
									],
									rows: populatedEvents,
								}}
								title={'Room Events'}
							/>
							<Menu
								open={
									contextMenu !== null &&
									contextId === selectedRow?._id
								}
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
										Room Items
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
										Add Room
									</LandlordButton>
									<LandlordButton
										size={'medium'}
										variant='contained'
										color={'warning'}
										onClick={() => {
											setSearchModal(true);
										}}
									>
										Edit/Remove Room
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
									loading={roomData?.loading}
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
												Header: 'room name',
												accessor: 'name',
											},
											{
												Header: 'notes',
												accessor: 'notes',
											},
										],
										rows: filteredRooms,
									}}
									title={'Room Items'}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>
				<AddRoomModal
					title='Add'
					propData={row}
					setPropData={setRow}
					open={openAdd}
					properties={properties}
					onClose={() => {
						setOpenAdd(false);
					}}
					handleClose={() => {
						setOpenAdd(false);
					}}
				/>

				<RoomSearchModal
					open={searchModal}
					title='Add'
					data={row}
					setData={setRow}
					properties={properties}
					rooms={rooms}
					// updateUtility={updateUtility}
					onClose={() => {
						setSearchModal(false);
					}}
					// handleAdd={(d) => {
					// 	console.log(d);
					// 	setRooms([...rooms, d]);
					// }}
					handleClose={() => {
						setSearchModal(false);
					}}
				/>

				<PropertyFilter
					open={propertyFilterModal}
					title='Add'
					data={rooms}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterRooms}
				/>
			</Box>
			<ArchivedEventsModal
				open={archivedEventsModal}
				onClose={() => setArchivedEventsModal(false)}
				rows={archivedEvents}
				columns={[
					{
						Header: 'status',
						accessor: 'status',
					},
					{
						Header: 'Event Type',
						accessor: 'eventType',
					},
					{
						Header: 'Event Date',
						accessor: 'date',
					},
					{
						Header: 'property name',
						accessor: 'property.propertyName',
					},
					{
						Header: 'room name',
						accessor: 'room.name',
					},
					{
						Header: 'event of',
						accessor: 'eventLocation',
					},
					{
						Header: 'name',
						accessor: 'parentName',
					},
				]}
				title={'Archived Events for Systems'}
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
		label: 'Room Name',
	},
	{
		id: 'notes',
		numeric: false,
		disbalePadding: true,
		label: 'Notes',
	},
];
