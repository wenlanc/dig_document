import React, { useState, useEffect, useCallback } from 'react';
import {
	Box,
	Typography,
	TextField,
	Divider,
	Grid,
	Paper,
	Menu,
	MenuItem,
} from '@mui/material';
import styled from 'styled-components';
import CardListReports from '../CardListReports';
import AddPropertyModal from './AddPropertyModal';
import DeleteModal from './DeleteModal';
import { detailsListReports } from '../../../constants/Rented';
import PropertyFilter from './PropertyFIlter';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventActions from './Events/Utils/EventActions';
import EventTypeModal from './Events/EventTypeModal';
import CustomSnackbar from '../../Utils/CustomSnackbar';
import DataTable from 'components/DataTable';
import moment from 'moment';
import { nwc } from 'utils/NumberUtils';
import { LandlordButton } from 'components/styled/Button';
import PropertySearchModal from './PropertySearchModal';
import EventSecondaryActions from './Events/Utils/EventSecondaryActions';
import ArchivedEventsModal from './Utils/ArchivedEventsModal';
import { useDispatch } from 'react-redux';
import {
	ConvertToRecorded,
	ArchiveEvent,
} from 'store/actions/Property/eventAction';

const Heading = styled(Typography)`
	font-weight: bold;
`;

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-input {
		padding: 8px;
	}
`;

function Properties() {
	const [openAdd, setOpenAdd] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openRecord, setOpenRecord] = useState(false);
	const [openSchedule, setOpenSchedule] = useState(false);
	const [openPropertyModal, setOpenPropertyModal] = useState(false);
	const [openSearchModal, setOpenSearchModal] = useState(false);

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	const [selectedProperty, setSelectedProperty] = useState(null);
	const [populatedProperties, setPopulatedProperties] = useState([]);
	const [populatedEvents, setPopulatedEvents] = useState([]);
	const [row, setRow] = useState({});
	const [reason, setReason] = useState(undefined);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});
	const [propertyFilter, setPropertyFilter] = useState(null);

	const propertiesData = useSelector((state) => state.PropertiesList);
	const eventsData = useSelector((state) => state.EventList);

	const handlePopulateEvents = () => {
		let _events = [];
		let _archivedEvents = [];
		console.log(eventsData);
		eventsData?.data?.forEach((event) => {
			if (
				event?.eventNature === 'Schedule' &&
				moment(event?.scheduleDate).isBefore(moment().toDate())
			) {
				event.isOverdue = true;
			} else {
				event.isOverdue = false;
			}
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
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
					!moment(event?.eventRecordedOn).isAfter(
						moment().subtract(2, 'weeks').toDate()
					)) ||
				event?.archived
			) {
				_archivedEvents.push(event);
				return;
			}
			if (propertyFilter) {
				if (propertyFilter?._id === event?.property?._id) {
					_events.push(event);
				}
			} else {
				_events.push(event);
			}
		});
		if (overDueOnly) _events = _events?.filter((e) => e.isOverdue === true);
		setPopulatedEvents([..._events]);
		setArchivedEvents([..._archivedEvents]);
	};

	useEffect(() => {
		handlePopulateEvents();
	}, [overDueOnly, eventsData?.loading]);

	const fetchData = useCallback(async () => {
		console.log('fetch data called');
		const _data = propertiesData.data?.map((x) => {
			x.acquiredDate = moment(x?.acquiredDate).format('DD/MM/YYYY');
			x.lastRentAmount = `$ ${nwc(x?.lastRentAmount) || '-'} `;
			return x;
		});
		setPopulatedProperties(_data);
	}, [propertiesData.data]);

	const handleEventOpen = (nature) => {
		if (nature === 'Record') {
			setOpenRecord(true);
		} else {
			setOpenSchedule(true);
		}
	};

	function renderButton(report) {
		if (report === 'Record') {
			return (
				<Typography
					component={'a'}
					variant={'a'}
					onClick={() => handleEventOpen(report)}
					style={{
						cursor: 'pointer',
					}}
				>
					{report}
				</Typography>
			);
		} else if (report === 'Schedule') {
			return (
				<Typography
					component={'a'}
					variant={'a'}
					onClick={() => setOpenSchedule(true)}
					style={{
						cursor: 'pointer',
					}}
				>
					{report}
				</Typography>
			);
		} else {
			return (
				<Link
					to={`/landlord-tools/properties-${report
						.toLowerCase()
						.split(' ')
						.join('-')}`}
					style={{
						color: 'inherit',
					}}
				>
					{report}
				</Link>
			);
		}
	}

	useEffect(() => {
		fetchData();
		handlePopulateEvents();
	}, [fetchData, overDueOnly]);

	useEffect(() => {
		fetchData();
		handlePopulateEvents();
	}, [propertiesData.data, eventsData.data, fetchData, overDueOnly]);

	useEffect(() => {
		handlePopulateEvents();
	}, [setPropertyFilter, overDueOnly]);

	useEffect(() => {
		setSnackbar(propertiesData.response);
	}, [propertiesData.response]);

	const columns = [
		{
			Header: 'status',
			accessor: 'status',
		},
		{
			Header: 'Category',
			accessor: 'eventLocation',
		},
		{
			Header: 'Type',
			accessor: 'eventType',
		},
		{
			Header: 'property name',
			accessor: 'property.propertyName',
		},
		{
			Header: 'Item Name',
			accessor: 'parentName',
		},
		{
			Header: 'Date Entered',
			accessor: 'date',
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
		<React.Fragment>
			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
			<Box py={2}>
				<Box width={'100%'} mb={4}>
					<Heading variant='h2' component='h2' textAlign='center'>
						{' '}
						Properties
					</Heading>
				</Box>
				{/* <Box display='flex' justifyContent='flex-end' mb={2}>
					<StyledTextField
						style={{ height: 40, minWidth: 200 }}
						placeholder='Search Properties Name'
						onChange={(e) => {
							setSearch(e.target.value);
							handleSearch(e.target.value);
						}}
						value={search}
					>
						Search
					</StyledTextField>
				</Box> */}

				{/* NEW */}

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
									All Events
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
								cursor: 'context-menu',
								position: 'relative',
							}}
							key={eventsData?.loading}
						>
							<DataTable
								canSearch={true}
								filter={{
									handler: () => setOpenPropertyModal(true),
								}}
								rowClickHandler={handleEventRow}
								loading={eventsData?.loading}
								pagination={{
									color: 'primary',
									variant: 'primary',
								}}
								table={{
									columns: [
										{
											Header: 'status',
											accessor: 'status',
										},
										{
											Header: 'Category',
											accessor: 'eventLocation',
										},
										{
											Header: 'Type',
											accessor: 'eventType',
										},
										{
											Header: 'property name',
											accessor: 'property.propertyName',
										},
										{
											Header: 'Item Name',
											accessor: 'parentName',
										},
										{
											Header: 'Date Entered',
											accessor: 'date',
										},
									],
									rows: populatedEvents,
								}}
								title={'Events'}
							/>
						</Box>
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
					</Paper>

					{/* Property Information  */}
					<Paper sx={{ pt: 4, borderRadius: 3 }}>
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
									Properties
								</Heading>
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
									Add Property
								</LandlordButton>
								<LandlordButton
									size={'medium'}
									variant='contained'
									color={'warning'}
									onClick={() => {
										setOpenSearchModal(true);
									}}
								>
									Edit/Remove Property
								</LandlordButton>
							</Box>
						</Box>
						{/* Information Table */}
						<Box
							my={1}
							style={{
								position: 'relative',
							}}
						>
							<DataTable
								canSearch={true}
								loading={propertiesData?.loading}
								pagination={{
									color: 'primary',
								}}
								table={{
									columns: [
										{
											Header: 'Property Name',
											accessor: 'propertyName',
										},
										{
											Header: 'Address',
											accessor: 'streetAddress',
										},
										{
											Header: 'Type',
											accessor: 'propertyType',
										},
										{
											Header: 'Monthly Rent',
											accessor: 'lastRentAmount',
										},
										{
											Header: 'Monthly Cost',
											accessor: '0',
										},
										{
											Header: 'Acquired Date',
											accessor: 'acquiredDate',
										},
									],
									rows: populatedProperties,
								}}
								title={'Properties'}
							/>
						</Box>
					</Paper>
				</Box>

				<PropertyFilter
					open={openPropertyModal}
					properties={propertiesData?.data}
					onClose={() => {
						setOpenPropertyModal(false);
					}}
					handleClose={() => {
						setOpenPropertyModal(false);
					}}
					filterData={handlePopulateEvents}
					setPropertyFilter={setPropertyFilter}
				/>
				{/* OLD */}
				<Box display='inline-block' mt={5}>
					<Heading gutterBottom variant='h5' component='h2'>
						{' '}
						Details, Organization, Scheduling, &#38; Recording
					</Heading>
					<Divider />
				</Box>
				<Grid container spacing={2}>
					{detailsListReports.map((report, index) => (
						<CardListReports key={index} index={index}>
							{renderButton(report)}
						</CardListReports>
					))}
				</Grid>

				<AddPropertyModal
					title='Add'
					propData={{}}
					open={openAdd}
					onClose={() => {
						setOpenAdd(false);
					}}
					handleClose={() => {
						setOpenAdd(false);
					}}
				/>
				<AddPropertyModal
					title='Edit'
					propData={selectedProperty}
					open={openEdit}
					onClose={() => {
						setOpenEdit(false);
					}}
					handleClose={() => {
						setOpenEdit(false);
					}}
				/>
				<PropertySearchModal
					title={'Edit or Remove'}
					open={openSearchModal}
					onClose={() => setOpenSearchModal(false)}
					handleClose={() => setOpenSearchModal(false)}
					editHandler={(p) => {
						setSelectedProperty(p);
						setOpenEdit(true);
						setOpenSearchModal(false);
					}}
					properties={propertiesData?.data}
					deleteHandler={(p) => {
						console.log('id got from delete', p);
						setSelectedProperty(p);
						setOpenDelete(true);
						setOpenSearchModal(false);
					}}
				/>
				<DeleteModal
					id={selectedProperty}
					open={openDelete}
					setReason={setReason}
					reason={reason}
					onClose={() => {
						setOpenDelete(false);
					}}
					handleDelete={() => {
						setReason('');
						setOpenSearchModal(false);
						setOpenDelete(false);
					}}
				/>
				<EventTypeModal
					open={openRecord}
					handleClose={() => setOpenRecord(false)}
					nature={'Record'}
				/>
				<EventTypeModal
					open={openSchedule}
					handleClose={() => setOpenSchedule(false)}
					nature={'Schedule'}
				/>
			</Box>
			<ArchivedEventsModal
				open={archivedEventsModal}
				onClose={() => setArchivedEventsModal(false)}
				rows={archivedEvents}
				columns={columns}
				title={'Archived Events'}
			/>
		</React.Fragment>
	);
}

export default Properties;

const headCells = [
	{
		id: 'propertyName',
		numeric: false,
		disablePadding: true,
		label: 'Property Name',
	},
	{
		id: 'address',
		numeric: false,
		disablePadding: true,
		label: 'Address',
	},
	{
		id: 'acquiredDate',
		numeric: false,
		disablePadding: true,
		label: 'Aquired Date',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: true,
		label: 'Type',
	},
	{
		id: 'annualTaxes',
		numeric: false,
		disablePadding: true,
		label: 'Annual Taxes',
	},
	{
		id: 'monthlyCost',
		numeric: true,
		disablePadding: false,
		label: 'Monthly Cost',
	},
	{
		id: 'monthlyRent',
		numeric: true,
		disablePadding: false,
		label: 'Monthly Rent',
	},
	{
		id: 'actions',
		numeric: true,
		disablePadding: false,
		label: 'Actions',
	},
];
