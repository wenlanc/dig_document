import React, { useEffect, useState } from 'react';
import { Box, Grid, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AddUtilitiesModal from './AddUtilitiesModal.jsx';
import UtlitySearchModal from './UtlitySearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import EventPropertyFilter from '../PropertyFIlter.jsx';
import CustomSnackbar from '../../../Utils/CustomSnackbar';
import DataTable from '../../../DataTable/index';
import colors from 'assets/theme/base/colors';
import EventActions from '../Events/Utils/EventActions.jsx';
import { LandlordButton } from 'components/styled/Button.js';
import moment from 'moment';
import { nwc } from '../../../../utils/NumberUtils';
import ItemInfoModal from '../Utils/ItemInfoModal';
import { InfoTitle } from 'components/styled/ItemInfoCard';
import { InfoHeader } from 'components/styled/ItemInfoCard.js';
import { unCamelCase, isNumeric } from 'utils/Misc';
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

export default function Utilities() {
	const [utilities, setUtilities] = useState([]);
	const [rooms, setRooms] = useState([]);
	const [filteredUtilities, setFilteredUtilities] = useState(utilities);
	const [populatedEvents, setPopulatedEvents] = useState([]);
	const [archivedEvents, setArchivedEvents] = useState([]);
	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});
	const [data, setData] = useState([]);
	const [infoType, setInfoType] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setEditData] = useState(false);
	const [infoData, setInfoData] = useState(null);
	const [openInfoModal, setOpenInfoModal] = useState(false);
	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	// Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [eventsFilterModal, setEventsFilterModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);
	const [eventFilterModal, setEventFilterModal] = useState(false);
	const [row, setRow] = useState({});

	const propertiesList = useSelector((state) => state.PropertiesList);
	const utilityList = useSelector((state) => state.UtilityList);
	const roomList = useSelector((state) => state.RoomList);

	useEffect(() => {
		setUtilities([...utilityList.data]);
		setProperties(propertiesList.data);
		setRooms(roomList.data);
	}, [utilityList.data, propertiesList.data, roomList.data]);

	const filterUtilities = () => {
		if (propertyFilter !== null) {
			const allUtilities = utilities;
			const filtered = allUtilities.filter(
				(util) => util.property._id === propertyFilter._id
			);
			setFilteredUtilities(filtered);
			handlePopulateEvents();
		} else {
			setFilteredUtilities(utilities);
			handlePopulateEvents();
		}
	};

	const updateUtility = (d) => {
		setUtilities([...utilities, d]);
	};

	const fetchData = async () => {
		setProperties(propertiesList.data);
		setUtilities(utilityList.data);
		setFilteredUtilities(utilityList.data);
		setPropertyFilter(null);
	};
	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];
		utilityList?.events?.forEach((event) => {
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
		filterUtilities();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		fetchData();
		filterUtilities();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterUtilities();
		//eslint-disable-next-line
	}, [utilities]);

	useEffect(() => {
		setSnackbar(utilityList.response);
	}, [utilityList.response]);

	useEffect(() => {
		handlePopulateEvents();
	}, [utilityList?.data, overDueOnly]);

	const handleInfoModal = (_info) => {
		// console.log('got info', _info);
		Object.keys(_info).includes('eventData')
			? setInfoType('event')
			: setInfoType('item');

		setInfoData(_info);
		setOpenInfoModal(true);
	};

	const itemBody = () => {
		return (
			<Grid container rowGap={3}>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Name:
					</InfoHeader>
					<InfoTitle>{infoData?.name}</InfoTitle>
				</Grid>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Company:
					</InfoHeader>
					<InfoTitle>{infoData?.company}</InfoTitle>
				</Grid>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Type:
					</InfoHeader>
					<InfoTitle>{infoData?.type}</InfoTitle>
				</Grid>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Frequency:
					</InfoHeader>
					<InfoTitle>{infoData?.frequency}</InfoTitle>
				</Grid>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Amount:
					</InfoHeader>
					<InfoTitle>$ {nwc(infoData?.amount)}</InfoTitle>
				</Grid>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Cost:
					</InfoHeader>
					<InfoTitle>{infoData?.model}</InfoTitle>
				</Grid>
				<Grid item md={6}>
					<InfoHeader fontWeight={'bold'} fontSize={16}>
						Payor:
					</InfoHeader>
					<InfoTitle>{infoData?.payor}</InfoTitle>
				</Grid>
			</Grid>
		);
	};

	const eventBody = () => {
		if (!infoData) return;
		let cleanedHeads = Object.keys(infoData).filter(
			(head) =>
				head !== '_id' && head !== 'user' && head !== 'eventRecordedOn'
		);
		const eventData = infoData?.eventData;
		let populatedEvents = {};
		Object.keys(eventData).forEach((key) => {
			let _value;
			if (key === 'completed') {
				_value = eventData[key] ? 'Yes' : 'No';
			} else if (isNumeric(eventData[key])) {
				_value = eventData[key] ? `$${nwc(eventData[key])}` : '-';
			} else {
				_value = eventData[key] ? eventData[key] : '-';
			}

			populatedEvents = {
				...populatedEvents,
				[key]: _value,
			};
		});

		// console.log('populatedEvents =>', populatedEvents);
		return (
			<Grid container rowGap={3}>
				{infoData &&
					cleanedHeads.map((head) => {
						return (
							typeof infoData[head] === 'string' && (
								<Grid item md={6}>
									<React.Fragment>
										<InfoHeader
											fontWeight={'bold'}
											fontSize={16}
										>
											{unCamelCase(head)}
										</InfoHeader>
										<InfoTitle>{infoData[head]}</InfoTitle>
									</React.Fragment>
								</Grid>
							)
						);
					})}
				{infoData &&
					Object.keys(populatedEvents).map((head) => {
						return (
							typeof populatedEvents[head] === 'string' && (
								<Grid item md={6}>
									<React.Fragment>
										<InfoHeader
											fontWeight={'bold'}
											fontSize={16}
										>
											{unCamelCase(head)}
										</InfoHeader>
										<InfoTitle>
											{populatedEvents[head]}
										</InfoTitle>
									</React.Fragment>
								</Grid>
							)
						);
					})}
			</Grid>
		);
	};
	// EVENTS CONTEXT MENU
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
						Utilities
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
								Utility Events
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
						<br />
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
							cursor: 'context-menu',
						}}
						// onContextMenu={handleContextMenu}
					>
						<DataTable
							canSearch={true}
							handleInfoModal={handleInfoModal}
							filter={{
								handler: () => setPropertyFilterModal(true),
							}}
							rowClickHandler={handleEventRow}
							loading={utilityList?.loading}
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
										Header: 'utility name',
										accessor: 'parent.name',
									},
									{
										Header: 'company',
										accessor: 'parent.company',
									},
									{
										Header: 'utility type',
										accessor: 'parent.type',
									},
								],
								rows: populatedEvents,
							}}
							title={'Utility Events'}
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
									Utility Items
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
									Add Utility
								</LandlordButton>
								<LandlordButton
									size={'medium'}
									variant='contained'
									color={'warning'}
									onClick={() => {
										setSearchModal(true);
									}}
								>
									Edit/Remove Utility
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
								handleInfoModal={handleInfoModal}
								canSearch={true}
								filter={{
									handler: () => setPropertyFilterModal(true),
								}}
								loading={utilityList?.loading}
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
											Header: 'utility name',
											accessor: 'name',
										},
										{
											Header: 'utility type',
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
									rows: filteredUtilities,
								}}
								title={'Utility Items'}
							/>
						</Box>
					</Box>
				</Paper>
			</Box>
			<AddUtilitiesModal
				title='Add'
				propData={row}
				setPropData={setRow}
				open={openAdd}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpenAdd(false);
				}}
				handleAdd={(utility) => {
					setUtilities([...utilities, utility]);
				}}
				handleClose={() => {
					setOpenAdd(false);
				}}
			/>
			<UtlitySearchModal
				rooms={rooms}
				open={searchModal}
				title='Add'
				data={row}
				setData={setRow}
				properties={properties}
				utilities={utilities}
				updateUtility={updateUtility}
				onClose={() => {
					setSearchModal(false);
				}}
				handleAdd={(d) => {
					setUtilities([...data, d]);
				}}
				handleClose={() => {
					setSearchModal(false);
				}}
			/>
			<PropertyFilter
				open={propertyFilterModal}
				title='Add'
				data={utilities}
				setData={setRow}
				properties={properties}
				// utilities={utilities}
				// updateUtility={updateUtility}
				onClose={() => {
					setPropertyFilterModal(false);
				}}
				handleAdd={(d) => {
					setUtilities([...data, d]);
				}}
				handleClose={() => {
					setPropertyFilterModal(false);
				}}
				filterData={filterUtilities}
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
				filterData={filterUtilities}
				setPropertyFilter={setPropertyFilter}
			/>

			<EventPropertyFilter
				open={eventFilterModal}
				title='Add'
				data={utilities}
				setData={setRow}
				properties={properties}
				onClose={() => {
					setPropertyFilterModal(false);
				}}
				handleAdd={(d) => {
					setUtilities([...data, d]);
				}}
				handleClose={() => {
					setPropertyFilterModal(false);
				}}
				filterData={filterUtilities}
				setPropertyFilter={setPropertyFilter}
			/>

			<AddUtilitiesModal
				title='Edit'
				rooms={rooms}
				propData={editData}
				setPropData={setEditData}
				open={openEdit}
				properties={properties}
				onClose={() => {
					setOpenEdit(false);
				}}
				handleClose={() => {
					setOpenEdit(false);
				}}
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
						Header: 'utility name',
						accessor: 'parent.name',
					},
					{
						Header: 'company',
						accessor: 'parent.company',
					},
					{
						Header: 'utility type',
						accessor: 'parent.type',
					},
				]}
				title={'Archived Events for Utilities'}
			/>

			<ItemInfoModal
				body={infoType === 'item' ? itemBody() : eventBody()}
				editHandler={() => {
					setOpenInfoModal(false);
					setEditData(infoData);
					setOpenEdit(true);
				}}
				header={infoData?.name}
				type={'Utilities'}
				onClose={() => setOpenInfoModal(false)}
				open={openInfoModal}
			/>
		</>
	);
}
