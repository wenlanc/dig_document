import React, { useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { LandlordButton } from '../../../../styled/Button';
import EventActions from '../../Events/Utils/EventActions';
import DataTable from 'components/DataTable';
import styled from 'styled-components';
import FixtureSearchModal from './FixutreSearchModal';
import EventSecondaryActions from '../../Events/Utils/EventSecondaryActions';
import ArchivedEventsModal from '../../Utils/ArchivedEventsModal';

const Heading = styled(Typography)`
	font-weight: bold;
`;

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function EnhancedTable({ onOpenAdd, rows, roomName, roomId }) {
	const [fixtures, setFixtures] = useState([]);
	const [value, setValue] = React.useState(0);
	const [populatedEvents, setPopulatedEvents] = useState([]);

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	const [openSearchModal, setOpenSearchModal] = useState(false);
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	const { data: rooms } = useSelector((state) => state.RoomList);
	const { data: properties } = useSelector((state) => state.PropertiesList);
	const { data: allFixtures } = useSelector((state) => state.FixtureList);
	const { data: events } = useSelector((state) => state.EventList);

	useEffect(() => {
		const _fixtures = [];
		rows.forEach((row) => {
			row.date = moment(row?.date || Date.now()).format('DD/MM/YYYY');
			row.dateEntered = moment(row?.createdAt).format('DD/MM/YYYY');
			row.remodelData = moment(row?.parent?.date).format('DD/MM/YYYY');
			_fixtures.push(row);
		});
		setFixtures(_fixtures);
	}, [rows]);

	useEffect(() => {
		handlePopulateEvents();
	}, [events, rows]);

	const handlePopulateEvents = () => {
		console.log('populating events');
		const _roomEvents = events.filter(
			(e) => e?.room?._id === roomId && e?.eventLocation === 'Fixture'
		);
		let _events = [];
		let _archivedEvents = [];

		_roomEvents?.forEach((event) => {
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			event.parent = rows.find((f) => f._id === event?.parent);
			event.parent = {
				...event.parent,
				name: event?.parent?.name || 'Destroyed',
			};
			event.remodelDate = moment(event?.parent?.remodelDate).format(
				'DD/MM/YYYY'
			);
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

			_events.push(event);
		});
		if (overDueOnly)
			_events = _events?.filter((event) => event.isOverdue === true);
		setArchivedEvents([..._archivedEvents]);
		console.log('populated', _events);
		setPopulatedEvents([..._events]);
	};

	const columns = [
		{
			Header: 'status',
			accessor: 'status',
		},
		{
			Header: 'fixture name',
			accessor: 'parent.name',
		},
		{
			Header: 'room',
			accessor: 'room.name',
		},
		{
			Header: 'condition',
			accessor: 'parent.condition',
		},
		{
			Header: 'Last Remodel Date',
			accessor: 'remodelDate',
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
	];

	return (
		<>
			<Box display={'flex'} flexDirection={'column'} rowGap={15}>
				<Paper sx={{ pt: 4, borderRadius: 3 }}>
					{/* Event Actions */}
					<Box>
						<Box
							sx={{
								borderColor: 'divider',
								width: '100%',
								maxWidth: 350,
								margin: 'auto',
								marginBottom: 5,
							}}
						>
							<Tabs
								value={value}
								onChange={handleTabChange}
								aria-label='basic tabs example'
								centered
							>
								<Tab label='Events' {...a11yProps(0)} />
								<Tab label='Items' {...a11yProps(1)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
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
										{roomName} Fixture Events
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
									loading={false}
									pagination={{
										color: 'primary',
										variant: 'primary',
									}}
									table={{
										columns: columns,
										rows: populatedEvents,
									}}
									title={'Fixture Events for ' + roomName}
								/>
							</Box>
						</TabPanel>
						<TabPanel value={value} index={1}>
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
											{roomName} Fixture Items
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
												onOpenAdd();
											}}
										>
											Add Fixture
										</LandlordButton>
										<LandlordButton
											size={'medium'}
											variant='contained'
											color={'warning'}
											onClick={() => {
												setSearchModal(true);
											}}
										>
											Edit/Remove Fixture
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
										loading={false}
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
													Header: 'fixture name',
													accessor: 'name',
												},
												{
													Header: 'Date New/Remodeled',
													accessor: 'date',
												},
												{
													Header: 'condition',
													accessor: 'condition',
												},
												{
													Header: 'date entered',
													accessor: 'dateEntered',
												},
											],
											rows: fixtures,
										}}
										title={'Fixture Items for ' + roomName}
									/>
								</Box>
							</Box>
						</TabPanel>
					</Box>
				</Paper>
			</Box>
			<ArchivedEventsModal
				open={archivedEventsModal}
				onClose={() => setArchivedEventsModal(false)}
				rows={archivedEvents}
				columns={columns}
				title={'Archived Events for Fixtures'}
			/>
			<FixtureSearchModal
				properties={properties}
				rooms={rooms}
				open={openSearchModal}
				handleClose={() => setOpenSearchModal(false)}
				onClose={() => setOpenSearchModal(false)}
				fixtures={allFixtures}
			/>
		</>
	);
}
