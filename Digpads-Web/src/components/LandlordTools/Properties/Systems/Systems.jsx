import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AddSystemModal from './AddSystemModal.jsx';
import SystemSearchModal from './SystemSearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import EventPropertyFilter from '../PropertyFIlter.jsx';
import CustomSnackbar from '../../../Utils/CustomSnackbar';
import DataTable from '../../../DataTable/index';
import colors from 'assets/theme/base/colors';
import EventActions from '../Events/Utils/EventActions.jsx';
import { LandlordButton } from 'components/styled/Button.js';
import moment from 'moment';
import { nwc } from '../../../../utils/NumberUtils';
import ArchivedEventsModal from '../Utils/ArchivedEventsModal.jsx';
import EventSecondaryActions from '../Events/Utils/EventSecondaryActions.jsx';
import {
	ConvertToRecorded,
	ArchiveEvent,
} from 'store/actions/Property/eventAction.js';
import { useDispatch } from 'react-redux';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function Systems() {
	const [systems, setSystems] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [filteredSystems, setFilteredSystems] = useState(systems);
	const [populatedEvents, setPopulatedEvents] = useState([]);
	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});
	const [data, setData] = useState([]);

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	// Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [eventsFilterModal, setEventsFilterModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);
	const [eventFilterModal, setEventFilterModal] = useState(false);

	const [row, setRow] = useState({});

	const propertiesList = useSelector((state) => state.PropertiesList);
	const systemList = useSelector((state) => state.SystemList);
	const roomList = useSelector((state) => state.RoomList);

	useEffect(() => {
		setSystems([...systemList.data]);
		setProperties(propertiesList.data);
		setRooms(roomList.data);
	}, [systemList.data, propertiesList.data, roomList.data]);

	const filterSytems = () => {
		const filtered = [];
		systemList?.data?.forEach((s) => {
			s.room = s?.room ? s?.room : { _id: null, name: 'Whole House' };
			s.monthYearUpdated = moment(s.lastUpdated).format('MM / YY');
			if (propertyFilter) {
				if (propertyFilter?._id === s?.property?._id) filtered?.push(s);
			} else filtered?.push(s);
		});
		setFilteredSystems(filtered);
		handlePopulateEvents();
	};

	const fetchData = async () => {
		setProperties(propertiesList.data);
		setSystems(systemList.data);
		setFilteredSystems(systemList.data);
		setPropertyFilter(null);
	};
	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];
		systemList?.events?.forEach((event) => {
			if (
				event?.eventNature === 'Schedule' &&
				moment(event?.scheduleDate).isBefore(moment().toDate())
			) {
				event.isOverdue = true;
			} else {
				event.isOverdue = false;
			}
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			event.amount = event?.parent?.amount
				? `$ ${nwc(event?.parent?.amount)}`
				: '-';
			event.room = event?.parent?.room?.name || 'Whole House';
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
		filterSytems();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		fetchData();
		filterSytems();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterSytems();
		//eslint-disable-next-line
	}, [systems]);

	useEffect(() => {
		setSnackbar(systemList.response);
	}, [systemList.response]);

	useEffect(() => {
		handlePopulateEvents();
	}, [systemList?.data, overDueOnly]);

	// EVENT ROW CLICK
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
						Systems
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
								System Events
								{propertyFilter !== null ? (
									<Typography
										style={{
											cursor: 'pointer',
										}}
										onClick={() => setPropertyFilter(null)}
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
						}}
					>
						<DataTable
							canSearch={true}
							filter={{
								handler: () => setPropertyFilterModal(true),
							}}
							loading={systemList?.loading}
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
										Header: 'property name',
										accessor: 'property.propertyName',
									},
									{
										Header: 'system name',
										accessor: 'parent.name',
									},
									{
										Header: 'system type',
										accessor: 'parent.type',
									},
									{
										Header: 'room',
										accessor: 'room',
									},
									{
										Header: 'condition',
										accessor: 'parent.condition',
									},

									{
										Header: 'Event Type',
										accessor: 'eventType',
									},
									{
										Header: 'Event Date',
										accessor: 'date',
									},
									// {
									// 	Header: 'Event Attachments',
									// 	accessor: 'attachments',
									// },
								],
								rows: populatedEvents,
							}}
							title={'System Events'}
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
									System Items
								</Heading>
								{propertyFilter !== null ? (
									<Typography
										style={{
											cursor: 'pointer',
										}}
										onClick={() => setPropertyFilter(null)}
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
									Add System
								</LandlordButton>
								<LandlordButton
									size={'medium'}
									variant='contained'
									color={'warning'}
									onClick={() => {
										setSearchModal(true);
									}}
								>
									Edit/Remove System
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
									handler: () => setPropertyFilterModal(true),
								}}
								loading={systemList?.loading}
								pagination={{
									color: 'primary',
									variant: 'primary',
								}}
								table={{
									columns: [
										{
											Header: 'property name',
											accessor: 'property.propertyName',
										},
										{
											Header: 'system name',
											accessor: 'name',
										},
										{
											Header: 'system type',
											accessor: 'type',
										},
										{
											Header: 'room',
											accessor: 'room.name',
										},
										{
											Header: 'condition',
											accessor: 'condition',
										},
										{
											Header: 'month/year updated',
											accessor: 'monthYearUpdated',
										},
									],
									rows: filteredSystems,
								}}
								title={'System Items'}
							/>
						</Box>
					</Box>
				</Paper>
			</Box>
			<AddSystemModal
				title='Add'
				propData={row}
				setPropData={setRow}
				open={openAdd}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpenAdd(false);
				}}
				handleAdd={(system) => {
					setSystems([...systems, system]);
				}}
				handleClose={() => {
					setOpenAdd(false);
				}}
			/>

			<SystemSearchModal
				rooms={rooms}
				open={searchModal}
				title='Add'
				data={row}
				setData={setRow}
				properties={properties}
				systems={systems}
				onClose={() => {
					setSearchModal(false);
				}}
				handleAdd={(d) => {
					setSystems([...data, d]);
				}}
				handleClose={() => {
					setSearchModal(false);
				}}
			/>
			<PropertyFilter
				open={propertyFilterModal}
				title='Add'
				data={systems}
				setData={setRow}
				properties={properties}
				onClose={() => {
					setPropertyFilterModal(false);
				}}
				handleAdd={(d) => {
					setSystems([...data, d]);
				}}
				handleClose={() => {
					setPropertyFilterModal(false);
				}}
				filterData={filterSytems}
				setPropertyFilter={setPropertyFilter}
			/>
			<PropertyFilter
				open={eventsFilterModal}
				onClose={() => {
					setEventFilterModal(false);
				}}
				handleClose={() => {
					setEventFilterModal(false);
				}}
				filterData={filterSytems}
				setPropertyFilter={setPropertyFilter}
			/>

			<EventPropertyFilter
				open={eventFilterModal}
				title='Add'
				data={systems}
				setData={setRow}
				properties={properties}
				onClose={() => {
					setPropertyFilterModal(false);
				}}
				handleAdd={(d) => {
					setSystems([...data, d]);
				}}
				handleClose={() => {
					setPropertyFilterModal(false);
				}}
				filterData={filterSytems}
				setPropertyFilter={setPropertyFilter}
			/>
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
						Header: 'property name',
						accessor: 'property.propertyName',
					},
					{
						Header: 'system name',
						accessor: 'parent.name',
					},
					{
						Header: 'system type',
						accessor: 'parent.type',
					},
					{
						Header: 'room',
						accessor: 'room',
					},
					{
						Header: 'condition',
						accessor: 'parent.condition',
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
						Header: 'Event Attachments',
						accessor: 'attachments',
					},
				]}
				title={'Archived Events for Systems'}
			/>
		</>
	);
}
