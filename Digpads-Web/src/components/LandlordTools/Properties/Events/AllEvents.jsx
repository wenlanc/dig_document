import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledButton } from '../../../styled/Button';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import AddInsurance from './AddInsurance.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import AllEventsTable from './AllEventsTable';
import EventTypeModal from './EventTypeModal';
import CustomSnackbar from '../../../Utils/CustomSnackbar';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function AllEvents() {
	const [events, setEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState(events);
	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});

	// // Modals
	const [recordOpen, setRecordOpen] = useState(false);
	// const [searchModal, setSearchModal] = useState(false);
	const [scheduleModal, setScheduleModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);

	const [id, setId] = useState('');
	const [row, setRow] = useState({});
	const propertiesData = useSelector((state) => state.PropertiesList);
	const eventData = useSelector((state) => state.EventList);

	const fetchData = () => {
		setProperties([...propertiesData.data]);
		setEvents([...eventData.data]);
		setFilteredEvents([...eventData.data]);
		setPropertyFilter(null);
	};
	const filterEventData = () => {
		if (propertyFilter !== null) {
			const allEvents = events;
			const filtered = allEvents.filter(
				(data) => data.property._id === propertyFilter._id
			);
			setFilteredEvents(filtered);
		} else {
			setFilteredEvents(events);
		}
	};
	useEffect(() => {
		setProperties([...propertiesData.data]);
		setEvents([...eventData.data]);
	}, [propertiesData.data, eventData.data]);

	useEffect(() => {
		fetchData();
		filterEventData();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterEventData();
		//eslint-disable-next-line
	}, [events]);

	useEffect(() => {
		filterEventData();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(eventData.response);
	}, [eventData.response]);

	return (
		<>
			<CustomSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
			<Box py={2}>
				<Heading variant='h3' component='h2' textAlign='center' mb={4}>
					{' '}
					Properties
				</Heading>
				<Box display='flex' justifyContent='space-between' mb={1}>
					<Heading variant='h4' component='h2'>
						{' '}
						All Events
					</Heading>
				</Box>
				<Box
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

					<StyledButton
						size='large'
						status='green'
						onClick={() => {
							setRecordOpen(true);
						}}
					>
						Record
					</StyledButton>
					<StyledButton
						size='large'
						status='yellow'
						onClick={() => {
							setScheduleModal(true);
						}}
					>
						Schedule
					</StyledButton>
				</Box>
				<AllEventsTable
					rows={filteredEvents}
					handleSelect={(id) => {
						setId(id);
					}}
					handleSelectEdit={(s) => {
						setRow({ ...s });
					}}
					headCells={headCells}
					tableTitle='Events Information'
					loading={eventData.loading}
				/>

				<EventTypeModal
					open={recordOpen}
					handleClose={() => setRecordOpen(false)}
				/>
				<PropertyFilter
					open={propertyFilterModal}
					title='Add'
					data={events}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterEventData}
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
		label: 'Rental Property',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Item Name',
	},
	{
		id: 'location',
		numeric: false,
		disablePadding: true,
		label: 'Category',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'Type',
	},

	{
		id: 'date',
		numeric: true,
		disablePadding: true,
		label: 'Date',
	},
	{
		id: 'details',
		numeric: false,
		disablePadding: false,
		label: 'Details',
	},
	{
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: 'Actions',
	},
];
