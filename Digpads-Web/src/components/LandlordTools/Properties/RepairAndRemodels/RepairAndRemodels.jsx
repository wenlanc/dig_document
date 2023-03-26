import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import RepairAndRemodelsSortTable from './RepairAndRemodelsSortTable.jsx';
import AddRepairAndRemodels from './AddRepairAndRemodels.jsx';
import RepairAndRemodelsSearchModal from './RepairAndRemodelsSearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import { LandlordButton, StyledButton } from '../../../styled/Button';
import { useSelector } from 'react-redux';
import EventSortTable from '../EventSortTable';
import CustomSnackbar from '../../../Utils/CustomSnackbar.jsx';
import colors from 'assets/theme/base/colors.js';
import DataTable from 'components/DataTable/index.js';
import EventActions from '../Events/Utils/EventActions.jsx';
import moment from 'moment';
import EventSecondaryActions from '../Events/Utils/EventSecondaryActions.jsx';
import ArchivedEventsModal from '../Utils/ArchivedEventsModal.jsx';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function RepairAndRemodels() {
	const [repairsAndRemodels, setRepairsAndRemodels] = useState([]);
	const [filteredRepairsAndRemodels, setFilteredRepairsAndRemodels] =
		useState(repairsAndRemodels);
	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [populatedEvents, setPopulatedEvents] = useState([]);

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	// Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});

	const [id, setId] = useState('');
	const [row, setRow] = useState({});

	const propertiesData = useSelector((state) => state.PropertiesList);
	const repairData = useSelector((state) => state.RepairList);
	const roomList = useSelector((state) => state.RoomList);

	const fetchData = async () => {
		setProperties([...propertiesData.data]);
		setRooms([...roomList.data]);
		setRepairsAndRemodels([...repairData.data]);
		setFilteredRepairsAndRemodels([...repairData.data]);
		setPropertyFilter(null);
	};
	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];
		console.log('all events', repairData?.events);
		repairData?.events?.forEach((event) => {
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			event.amount = event?.parent?.amount
				? `$ ${nwc(event?.parent?.amount)}`
				: '-';

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
				event?.eventNature === 'Record' &&
				!moment(event?.eventRecordedOn).isBefore(
					moment().add(2, 'weeks').toDate()
				)
			) {
				console.log('archiving');
				console.log(
					'event recorded on ',
					moment(event?.eventRecordedOn).toDate()
				);

				console.log(
					'is it before?',
					moment(event?.eventRecordedOn).isBefore(
						moment().add(2, 'weeks').toDate()
					)
				);
				console.log('show till', moment().add(2, 'weeks').toDate());
				// setArchivedEvents([...archivedEvents, event])
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
		setProperties([...propertiesData.data]);
		setRepairsAndRemodels([...repairData.data]);
		setRooms([...roomList.data]);
	}, [propertiesData.data, repairData.data, roomList.data]);

	const filterRepairsAndRemodels = () => {
		if (propertyFilter !== null) {
			const allRepairsAndRemodels = repairsAndRemodels;
			const filtered = allRepairsAndRemodels.filter(
				(repair) => repair.property._id === propertyFilter._id
			);
			setFilteredRepairsAndRemodels(filtered);
		} else {
			setFilteredRepairsAndRemodels(repairsAndRemodels);
		}
	};

	useEffect(() => {
		fetchData();
		filterRepairsAndRemodels();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterRepairsAndRemodels();
		//eslint-disable-next-line
	}, [repairsAndRemodels]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterRepairsAndRemodels();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(repairData.response);
	}, [repairData.response]);

	useEffect(() => {
		handlePopulateEvents();
	}, [repairData?.data, overDueOnly]);

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
			Header: 'Amount',
			accessor: 'amount',
		},
		{
			Header: 'property name',
			accessor: 'property.propertyName',
		},
		{
			Header: 'R&R name',
			accessor: 'parent.name',
		},
		{
			Header: 'company',
			accessor: 'parent.company',
		},
		{
			Header: 'R&R type',
			accessor: 'parent.type',
		},
	];

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
							Repairs &#38; Remodel
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
									Repairs &#38; Remodel{' '}
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
								loading={repairData?.loading}
								pagination={{
									color: 'primary',
									variant: 'primary',
								}}
								table={{
									columns: columns,
									rows: populatedEvents,
								}}
								title={'Repairs & Remodel Events'}
							/>
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
										Repairs &#38; Remodel Items
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
										Add R&#38;R
									</LandlordButton>
									<LandlordButton
										size={'medium'}
										variant='contained'
										color={'warning'}
										onClick={() => {
											setSearchModal(true);
										}}
									>
										Edit/Remove R&#38;R
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
									loading={repairData?.loading}
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
												Header: 'R&R name',
												accessor: 'name',
											},
											{
												Header: 'R&R type',
												accessor: 'type',
											},
											{
												Header: 'room',
												accessor: 'room.name',
											},
											{
												Header: 'company',
												accessor: 'company',
											},
											{
												Header: 'payor',
												accessor: 'payor',
											},
										],
										rows: filteredRepairsAndRemodels,
									}}
									title={'Repairs & Remodel Items'}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>

				<AddRepairAndRemodels
					title='Add'
					propData={row}
					setPropData={setRow}
					open={openAdd}
					properties={properties}
					rooms={rooms}
					onClose={() => {
						setOpenAdd(false);
					}}
					handleAdd={(d) => {
						console.log(d);
						setRepairsAndRemodels([...repairsAndRemodels, d]);
					}}
					handleClose={() => {
						setOpenAdd(false);
					}}
				/>

				<RepairAndRemodelsSearchModal
					open={searchModal}
					title='Add'
					data={row}
					setData={setRow}
					rooms={rooms}
					properties={properties}
					repairsAndRemodels={repairsAndRemodels}
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
					data={repairsAndRemodels}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterRepairsAndRemodels}
				/>

				<ArchivedEventsModal
					open={archivedEventsModal}
					onClose={() => setArchivedEventsModal(false)}
					rows={archivedEvents}
					columns={columns}
					title={'Archived Events for Systems'}
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
		label: 'R&R Name',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: true,
		label: 'Type',
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
		label: 'Utility Name',
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
		label: 'Utility Type',
	},
	{
		id: 'room',
		numeric: false,
		disablePadding: true,
		label: 'Room',
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
		disablePadding: true,
		label: 'Event Notes',
	},
	{
		id: 'eventAttachments',
		numeric: false,
		disablePadding: true,
		label: 'Event Attachments',
	},
	{
		id: 'actions',
		numeric: true,
		disablePadding: true,
		label: 'Actions',
	},
];
