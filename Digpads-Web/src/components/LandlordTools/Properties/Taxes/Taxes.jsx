import React, { useEffect, useState } from 'react';
import { Box, Menu, MenuItem, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import AddTax from './AddTax.jsx';
import TaxSearchModal from './TaxSearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import { LandlordButton } from '../../../styled/Button';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CustomSnackbar from '../../../Utils/CustomSnackbar.jsx';
import colors from 'assets/theme/base/colors.js';
import ArchivedEventsModal from '../Utils/ArchivedEventsModal.jsx';
import DataTable from 'components/DataTable/index.js';
import EventActions from '../Events/Utils/EventActions.jsx';
import { nwc } from 'utils/NumberUtils';
import EventSecondaryActions from '../Events/Utils/EventSecondaryActions.jsx';
import {
	ConvertToRecorded,
	ArchiveEvent,
} from 'store/actions/Property/eventAction.js';
import { useDispatch } from 'react-redux';

const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function Taxes() {
	const [taxes, setTaxes] = useState([]);
	const [filteredTaxes, setFilteredTaxes] = useState(taxes);
	const [populatedEvents, setPopulatedEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const [archivedEventsModal, setArchivedEventsModal] = useState(false);
	const [overDueOnly, setOverDueOnly] = useState(false);
	const [archivedEvents, setArchivedEvents] = useState([]);

	const [propertyFilter, setPropertyFilter] = useState(null);
	const [properties, setProperties] = useState([]);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});
	// const [data, setData] = useState([]);

	// // Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);
	const [row, setRow] = useState({});
	const propertiesData = useSelector((state) => state.PropertiesList);
	const taxData = useSelector((state) => state.TaxList);

	const handlePopulateEvents = () => {
		let events = [];
		let _archivedEvents = [];
		taxData?.events?.forEach((event) => {
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
			event.date = moment(event?.eventRecordedOn).format('DD/MM/YYYY');
			event.dueDate = moment(event?.parent?.dueDate).format('DD/MM/YYYY');
			event.amount = event?.parent?.amount
				? `$ ${nwc(event?.parent?.amount)}`
				: '-';
			event.lateFees = event?.eventData?.lateFees?.model?.name || 'None';
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

	const fetchData = () => {
		setProperties([...propertiesData.data]);
		setTaxes([...taxData.data]);
		setFilteredTaxes([...taxData.data]);
		setPropertyFilter(null);
	};

	useEffect(() => {
		setProperties([...propertiesData.data]);
		setTaxes([...taxData.data]);
	}, [taxData.data, propertiesData.data]);

	const filterTaxesData = () => {
		const filtered = [];
		taxData?.data?.forEach((tax) => {
			tax.year = moment(tax.year).format('YYYY');
			tax.noticeMonth = moment(tax.year).format('MMMM');
			if (propertyFilter) {
				if (propertyFilter?._id === tax?.property?._id)
					filtered?.push(tax);
			} else filtered?.push(tax);
		});
		setFilteredTaxes(filtered);
		handlePopulateEvents();
	};

	useEffect(() => {
		fetchData();
		filterTaxesData();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterTaxesData();
		//eslint-disable-next-line
	}, [taxes]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterTaxesData();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(taxData.response);
	}, [taxData.response]);

	useEffect(() => {
		handlePopulateEvents();
	}, [taxData?.data, overDueOnly]);

	// ARCHIVE EVENT LOGIC
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
							Taxes
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
									Tax Events
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
								loading={taxData?.loading}
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
											Header: 'due date',
											accessor: 'dueDate',
										},
										{
											Header: 'amount',
											accessor: 'amount',
										},
										{
											Header: 'late fees',
											accessor: 'lateFees',
										},
										{
											Header: 'property name',
											accessor: 'property.propertyName',
										},
										{
											Header: 'tax name',
											accessor: 'parent.name',
										},
										{
											Header: 'entity owed to',
											accessor: 'parent.entity',
										},
									],
									rows: populatedEvents,
								}}
								title={'Tax Events'}
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
										Tax Items
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
										Add Tax
									</LandlordButton>
									<LandlordButton
										size={'medium'}
										variant='contained'
										color={'warning'}
										onClick={() => {
											setSearchModal(true);
										}}
									>
										Edit/Remove Tax
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
									loading={taxData?.loading}
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
												Header: 'tax name',
												accessor: 'name',
											},
											{
												Header: 'type',
												accessor: 'type',
											},
											{
												Header: 'entity owed to',
												accessor: 'entity',
											},
											{
												Header: 'tax year',
												accessor: 'year',
											},
											{
												Header: 'notice month',
												accessor: 'noticeMonth',
											},
										],
										rows: filteredTaxes,
									}}
									title={'Tax Items'}
								/>
							</Box>
						</Box>
					</Paper>
				</Box>
				<AddTax
					title='Add'
					propData={row}
					setPropData={setRow}
					open={openAdd}
					properties={properties}
					onClose={() => {
						setOpenAdd(false);
					}}
					// handleAdd={(d) => {
					// 	setTaxes([...taxes, d]);
					// }}
					handleClose={() => {
						setOpenAdd(false);
					}}
				/>
				<TaxSearchModal
					open={searchModal}
					title='Add'
					data={row}
					setData={setRow}
					properties={properties}
					taxes={taxes}
					onClose={() => {
						setSearchModal(false);
					}}
					// handleAdd={(d) => {
					// 	setTaxes([...taxes, d]);
					// }}
					handleClose={() => {
						setSearchModal(false);
					}}
				/>

				<PropertyFilter
					open={propertyFilterModal}
					title='Add'
					data={taxes}
					properties={properties}
					onClose={() => {
						setPropertyFilterModal(false);
					}}
					handleClose={() => {
						setPropertyFilterModal(false);
					}}
					setPropertyFilter={(filter) => setPropertyFilter(filter)}
					filterData={filterTaxesData}
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
						Header: 'due date',
						accessor: 'dueDate',
					},
					{
						Header: 'amount',
						accessor: 'amount',
					},
					{
						Header: 'late fees',
						accessor: 'lateFees',
					},
					{
						Header: 'property name',
						accessor: 'property.propertyName',
					},
					{
						Header: 'tax name',
						accessor: 'parent.name',
					},
					{
						Header: 'entity owed to',
						accessor: 'parent.entity',
					},
				]}
				title={'Archived Events for Taxes'}
			/>
		</>
	);
}
