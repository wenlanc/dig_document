import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import AddInsurance from './AddInsurance.jsx';
import InsuranceSearchModal from './InsuranceSearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import { LandlordButton, StyledButton } from '../../../styled/Button';
import { useSelector } from 'react-redux';
import { Alert as MuiAlert } from '@mui/material';
import CustomSnackbar from '../../../Utils/CustomSnackbar.jsx';
import colors from '../../../../assets/theme/base/colors';
import DataTable from 'components/DataTable/index.js';
import EventActions from '../Events/Utils/EventActions.jsx';
import { nwc } from 'utils/NumberUtils.js';
import moment from 'moment';
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

export default function Insurance() {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});
	const [insurances, setInsurances] = useState([]);
	const [filteredInsurances, setFilteredInsurances] = useState(insurances);
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

	// // Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);
	const [populatedEvents, setPopulatedEvents] = useState([]);

	const [row, setRow] = useState({});
	const propertiesData = useSelector((state) => state.PropertiesList);
	const insuranceData = useSelector((state) => state.InsuranceList);

	const fetchData = () => {
		setProperties([...propertiesData.data]);
		setInsurances([...insuranceData.data]);
		setFilteredInsurances([...insuranceData.data]);
		setPropertyFilter(null);
	};

	const filterInsuranceData = () => {
		const filtered = [];
		insuranceData?.data?.forEach((insurance) => {
			insurance.dueDate = moment(insurance?.dueDate).format('DD/MM/YYYY');
			insurance.policyCost = `$ ${nwc(insurance?.policyCost) || 0}`;
			if (propertyFilter) {
				if (propertyFilter?._id === insurance?.property?._id)
					filtered?.push(insurance);
			} else {
				filtered?.push(insurance);
			}
		});
		setFilteredInsurances(filtered);
		handlePopulateEvents();
	};
	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];
		insuranceData?.events?.forEach((event) => {
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			event.dueDate = moment(event?.parent?.dueDate).format('DD/MM/YYYY');
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
		setInsurances([...insuranceData.data]);
	}, [propertiesData.data, insuranceData.data]);

	useEffect(() => {
		fetchData();
		filterInsuranceData();
	}, []);

	useEffect(() => {
		filterInsuranceData();
	}, [insurances]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
	}, [searchModal]);

	useEffect(() => {
		filterInsuranceData();
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(insuranceData.response);
	}, [insuranceData.response]);
	useEffect(() => {
		handlePopulateEvents();
	}, [insuranceData?.data, overDueOnly]);

	const columns = [
		{
			Header: 'status',
			accessor: 'status',
		},
		{
			Header: 'due date',
			accessor: 'dueDate',
		},
		{
			Header: 'type',
			accessor: 'parent.type',
		},
		{
			Header: 'Amount',
			accessor: 'amount',
		},
		{
			Header: 'property',
			accessor: 'property.propertyName',
		},
		{
			Header: 'Event Type',
			accessor: 'eventType',
		},
		{
			Header: 'Event Date',
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
							Insurance
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
									Insurance Events
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
								rowClickHandler={handleEventRow}
								filter={{
									handler: () => setPropertyFilterModal(true),
								}}
								loading={insuranceData?.loading}
								pagination={{
									color: 'primary',
								}}
								table={{
									columns: columns,
									rows: populatedEvents,
								}}
								title={'Insurance Events'}
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
										Insurance Items
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
										Add Insurance
									</LandlordButton>
									<LandlordButton
										size={'medium'}
										variant='contained'
										color={'warning'}
										onClick={() => {
											setSearchModal(true);
										}}
									>
										Edit/Remove Insurance
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
									loading={insuranceData?.loading}
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
											},
											{
												Header: 'insurance name',
												accessor: 'name',
											},
											{
												Header: 'type',
												accessor: 'type',
											},
											{
												Header: 'company',
												accessor: 'company',
											},
											{
												Header: 'payor',
												accessor: 'payor',
											},
											{
												Header: 'Policy Cost',
												accessor: 'policyCost',
											},
											{
												Header: 'duedate',
												accessor: 'dueDate',
											},
										],
										rows: filteredInsurances,
									}}
									title={'Insurance Items'}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>

				<ArchivedEventsModal
					open={archivedEventsModal}
					onClose={() => setArchivedEventsModal(false)}
					rows={archivedEvents}
					columns={columns}
					title={'Archived Events for Maintenance'}
				/>
				<AddInsurance
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
				<InsuranceSearchModal
					open={searchModal}
					title='Add'
					data={row}
					setData={setRow}
					properties={properties}
					insurances={insurances}
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
					data={insurances}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterInsuranceData}
				/>
			</Box>
		</>
	);
}
