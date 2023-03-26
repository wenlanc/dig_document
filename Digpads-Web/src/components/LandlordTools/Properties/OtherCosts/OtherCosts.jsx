import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { LandlordButton } from '../../../styled/Button';
import AddCostModal from './AddCostModal.jsx';
import CostSearchModal from './CostSearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import { useSelector } from 'react-redux';
import CustomSnackbar from '../../../Utils/CustomSnackbar';
import DataTable from 'components/DataTable';
import colors from 'assets/theme/base/colors';
import moment from 'moment';
import EventActions from '../Events/Utils/EventActions';
import EventSecondaryActions from '../Events/Utils/EventSecondaryActions';
import ArchivedEventsModal from '../Utils/ArchivedEventsModal';
import {
	ConvertToRecorded,
	ArchiveEvent,
} from 'store/actions/Property/eventAction.js';
import { useDispatch } from 'react-redux';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function OtherCosts() {
	const [costs, setCosts] = useState([]);
	const [filteredCosts, setFilteredCosts] = useState(costs);
	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [populatedEvents, setPopulatedEvents] = useState([]);

	const [rooms, setRooms] = useState([]);

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
	const otherCostData = useSelector((state) => state.OtherCostList);
	const roomList = useSelector((state) => state.RoomList);
	const eventList = useSelector((state) => state.EventList);

	const fetchData = () => {
		setProperties([...propertiesData.data]);
		setCosts([...otherCostData.data]);
		setFilteredCosts([...otherCostData.data]);
		setPropertyFilter(null);
	};

	const filterCosts = () => {
		if (propertyFilter !== null) {
			const allCosts = costs;
			const filtered = allCosts.filter(
				(cost) => cost.property._id === propertyFilter._id
			);
			setFilteredCosts(filtered);
			handlePopulateEvents();
		} else {
			setFilteredCosts(costs);
			handlePopulateEvents();
		}
	};

	useEffect(() => {
		setProperties([...propertiesData.data]);
		setCosts([...otherCostData.data]);
		setRooms(roomList.data);
	}, [otherCostData.data, propertiesData.data, roomList.data]);

	useEffect(() => {
		fetchData();
		filterCosts();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterCosts();
		//eslint-disable-next-line
	}, [costs]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterCosts();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(otherCostData.response);
	}, [otherCostData.response]);

	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];

		otherCostData?.events?.forEach((event) => {
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');

			if (
				event?.eventNature === 'Schedule' &&
				moment(event?.scheduleDate).isBefore(moment().toDate())
			) {
				event.isOverdue = true;
				console.log('is overdue', event?._id);
			} else {
				event.isOverdue = false;
				console.log('is not overdue', event?._id);
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
					!moment(event?.eventRecordedOn).isBefore(
						moment().add(2, 'weeks').toDate()
					))
			) {
				_archivedEvents.push(event);
				setArchivedEvents([...archivedEvents, event]);
				return;
			}
			if (propertyFilter) {
				if (propertyFilter?._id === event?.property?._id)
					events.push(event);
			} else events.push(event);
		});
		if (overDueOnly)
			events = events?.filter((event) => event.isOverdue === true);
		setArchivedEvents([..._archivedEvents]);
		setPopulatedEvents(events);
	};
	useEffect(() => {
		handlePopulateEvents();
	}, [otherCostData?.data, overDueOnly]);

	const columns = [
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
			Header: 'expense name',
			accessor: 'parent.name',
		},
		{
			Header: 'expense type',
			accessor: 'parent.type',
		},
		{
			Header: 'company',
			accessor: 'parent.company',
		},
	];
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
							General Expenses
						</Heading>
					</Box>
				</Box>

				<Box
					display={'flex'}
					justifyContent={'space-between'}
					rowGap={10}
					flexDirection={'column'}
				>
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
									General Expense Events
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
								rowClickHandler={handleEventRow}
								loading={otherCostData?.loading}
								pagination={{
									color: 'primary',
								}}
								table={{
									columns: columns,
									rows: populatedEvents,
								}}
								title={'General Expense Events'}
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
										General Expense Items
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
										Add General Expense
									</LandlordButton>
									<LandlordButton
										size={'medium'}
										variant='contained'
										color={'warning'}
										onClick={() => {
											setSearchModal(true);
										}}
									>
										Edit/Remove General Expense
									</LandlordButton>
								</Box>
							</Box>
							<Box
								my={1}
								sx={{
									position: 'relative',
								}}
							>
								<DataTable
									canSearch={true}
									filter={{
										handler: () =>
											setPropertyFilterModal(true),
									}}
									loading={otherCostData?.loading}
									pagination={{
										color: 'primary',
										variant: 'primary',
									}}
									table={{
										columns: [
											{
												Header: 'property name',
												accessor:
													'property.propertyName',
												width: '10%',
											},
											{
												Header: 'cost name',
												accessor: 'name',
												width: '10%',
											},
											{
												Header: 'cost type',
												accessor: 'type',
												width: '10%',
											},
											{
												Header: 'room',
												accessor: 'room.name',
												width: '10%',
											},
											{
												Header: 'company',
												accessor: 'company',
												width: '10%',
											},
											{
												Header: 'payor',
												accessor: 'payor',
												width: '10%',
											},
										],
										rows: filteredCosts,
									}}
									title={'General Expense Items'}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>

				{/* <Box
					display='flex'
					flexDirection='row'
					justifyContent='space-between'
				>
					<Box display='flex' flexDirection='column'>
						<StyledButton
							size='large'
							status='blue'
							onClick={() => {
								setPropertyFilterModal(true);
							}}
						>
							Filter By Property
						</StyledButton>
						{propertyFilter !== null ? (
							<Typography
								style={{
									cursor: 'pointer',
								}}
								fontWeight='bold'
								onClick={() => setPropertyFilter(null)}
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

					<LandlordButton
						onClick={() => {
							setOpenAdd(true);
						}}
					>
						Add General Exprense
					</LandlordButton>

					<StyledButton
						size='large'
						status='yellow'
						onClick={() => {
							setSearchModal(true);
						}}
					>
						Edit/Remove Cost
					</StyledButton>
				</Box> 

				<OtherCostsSortTable
					rows={filteredCosts}
					handleSelect={(id) => {
						setId(id);
					}}
					handleSelectEdit={(s) => {
						setRow({ ...s });
					}}
					headCells={headCells}
					tableTitle='General Expenses Information'
					loading={otherCostData.loading}
				/>

				<EventSortTable
					rows={otherCostData.events}
					handleSelect={(id) => {
						setId(id);
					}}
					handleSelectEdit={(s) => {
						setRow({ ...s });
					}}
					headCells={eventHeadCells}
					tableTitle='General Expenses Events'
					loading={otherCostData.loading}
				/>
*/}
				<AddCostModal
					title='Add'
					propData={row}
					setPropData={setRow}
					open={openAdd}
					properties={properties}
					onClose={() => {
						setOpenAdd(false);
					}}
					rooms={rooms}
					handleClose={() => {
						setOpenAdd(false);
					}}
				/>
				<CostSearchModal
					open={searchModal}
					title='Add'
					data={row}
					setData={setRow}
					properties={properties}
					costs={costs}
					onClose={() => {
						setSearchModal(false);
					}}
					rooms={rooms}
					handleClose={() => {
						setSearchModal(false);
					}}
				/>

				<PropertyFilter
					open={propertyFilterModal}
					title='Add'
					data={costs}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterCosts}
				/>
				<ArchivedEventsModal
					open={archivedEventsModal}
					onClose={() => setArchivedEventsModal(false)}
					rows={archivedEvents}
					columns={columns}
					title={'Archived Events for General Expenses'}
				/>
			</Box>
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
		label: 'Cost Name',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: true,
		label: 'Cost Type',
	},
	{
		id: 'frequency',
		numeric: false,
		disablePadding: true,
		label: 'Frequency',
	},
	{
		id: 'amount',
		numeric: true,
		disablePadding: true,
		label: 'Amount',
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
	{
		id: 'actions',
		numeric: true,
		disablePadding: false,
		label: 'Actions',
	},
];

const eventHeadCells = [
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
		label: 'Cost Name',
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
		label: 'Cost Type',
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
