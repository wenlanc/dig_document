import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import styled from 'styled-components';
import PhysicalPropertySortTable from './PhysicalPropertySortTable.jsx';
import AddPhysicalPropertyModal from './AddPhysicalPropertyModal.jsx';
import PhysicalPropertySearchModal from './PhysicalPropertySearchModal.jsx';
import PropertyFilter from '../PropertyFIlter.jsx';
import { LandlordButton, StyledButton } from '../../../styled/Button';
import { useSelector } from 'react-redux';
import EventSortTable from '../EventSortTable';
import colors from 'assets/theme/base/colors';

import CustomSnackbar from '../../../Utils/CustomSnackbar.jsx';
import DataTable from 'components/DataTable/index.js';
import EventActions from '../Events/Utils/EventActions.jsx';
const Heading = styled(Typography)`
	font-weight: bold;
`;

export default function PhysicalProperty() {
	const [physicalProperties, setPhysicalProperties] = useState([]);
	const [filteredPhysicalProperties, setFilteredPhysicalProperties] =
		useState(physicalProperties);
	const [rooms, setRooms] = useState([]);
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

	// Modals
	const [openAdd, setOpenAdd] = useState(false);
	const [searchModal, setSearchModal] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [propertyFilterModal, setPropertyFilterModal] = useState(false);

	const [id, setId] = useState('');
	const [row, setRow] = useState({});

	const propertiesData = useSelector((state) => state.PropertiesList);
	const physicalData = useSelector((state) => state.PhysicalList);
	const roomList = useSelector((state) => state.RoomList);

	const fetchData = () => {
		setProperties([...propertiesData.data]);
		setPhysicalProperties([...physicalData.data]);
		setFilteredPhysicalProperties([...physicalData.data]);
		setPropertyFilter(null);
		setRooms(roomList.data);
	};

	useEffect(() => {
		setProperties([...propertiesData.data]);
		setPhysicalProperties([...physicalData.data]);
		setRooms([...roomList.data]);
	}, [propertiesData.data, physicalData.data, roomList.data]);

	const filterPhysicalProperties = () => {
		if (propertyFilter !== null) {
			const allPP = physicalProperties;
			const filtered = allPP.filter(
				(phyiscalProperty) =>
					phyiscalProperty.property._id === propertyFilter._id
			);
			setFilteredPhysicalProperties(filtered);
		} else {
			setFilteredPhysicalProperties(physicalProperties);
		}
	};

	useEffect(() => {
		fetchData();
		filterPhysicalProperties();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterPhysicalProperties();
		//eslint-disable-next-line
	}, [physicalProperties]);

	useEffect(() => {
		if (!searchModal) {
			fetchData();
		}
		//eslint-disable-next-line
	}, [searchModal]);

	useEffect(() => {
		filterPhysicalProperties();
		//eslint-disable-next-line
	}, [propertyFilter]);

	useEffect(() => {
		setSnackbar(physicalData.response);
	}, [physicalData.response]);

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
						Physical Property
					</Heading>
				</Box>
			</Box>
			<Box display={'flex'} flexDirection={'column'} rowGap={7}>
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
								Physical Property Events
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
							loading={physicalData?.loading}
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
										Header: 'property name',
										accessor: 'property.propertyName',
									},
									{
										Header: 'physical property',
										accessor: 'parent.name',
									},
									{
										Header: 'condition',
										accessor: 'parent.condition',
									},
									{
										Header: 'type',
										accessor: 'parent.type',
									},
									{
										Header: 'room',
										accessor: 'room.name',
									},
								],
								rows: [],
							}}
							title={'Physical Property Events'}
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
									Physical Properties
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
									Add Physical Property
								</LandlordButton>
								<LandlordButton
									size={'medium'}
									variant='contained'
									color={'warning'}
									onClick={() => {
										setSearchModal(true);
									}}
								>
									Edit/Remove Physical Property
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
								loading={physicalData?.loading}
								pagination={{
									color: 'primary',
								}}
								table={{
									columns: [
										{
											Header: 'property name',
											accessor: 'property.propertyName',
										},
										{
											Header: 'physical property',
											accessor: 'name',
										},
										{
											Header: 'type',
											accessor: 'type',
										},
										{
											Header: 'room',
											accessor: 'room.name',
										},
										{
											Header: 'location',
											accessor: 'location',
										},
										{
											Header: 'condition',
											accessor: 'condition',
										},
										{
											Header: 'estimated value',
											accessor: 'estimatedValue',
										},
									],
									rows: filteredPhysicalProperties,
								}}
								title={'Physical Properties'}
							/>
						</Box>
					</Box>
				</Paper>
			</Box>

			<AddPhysicalPropertyModal
				title='Add'
				propData={row}
				setPropData={setRow}
				open={openAdd}
				rooms={rooms}
				properties={properties}
				onClose={() => {
					setOpenAdd(false);
				}}
				handleAdd={(d) => {
					console.log(d);
					setPhysicalProperties([...physicalProperties, d]);
				}}
				handleClose={() => {
					setOpenAdd(false);
				}}
			/>
			<PhysicalPropertySearchModal
				open={searchModal}
				data={row}
				setData={setRow}
				properties={properties}
				physicalProperties={physicalProperties}
				rooms={rooms}
				onClose={() => {
					setSearchModal(false);
				}}
				handleAdd={(d) => {
					console.log(d);
					setPhysicalProperties([...physicalProperties, d]);
				}}
				handleClose={() => {
					setSearchModal(false);
				}}
			/>
			<PhysicalPropertySearchModal
				open={openDelete}
				data={row}
				setData={setRow}
				properties={properties}
				physicalProperties={physicalProperties}
				onClose={() => {
					setOpenDelete(false);
				}}
				handleAdd={(d) => {
					console.log(d);
					setPhysicalProperties([...physicalProperties, d]);
				}}
				handleClose={() => {
					setOpenDelete(false);
				}}
				deleteItem={(id) => {
					setPhysicalProperties(
						physicalProperties.filter((p) => p._id !== id)
					);
				}}
				deleteModal={true}
			/>

			<PropertyFilter
				open={propertyFilterModal}
				title='Add'
				data={physicalProperties}
				properties={properties}
				onClose={() => {
					setPropertyFilterModal(false);
				}}
				handleClose={() => {
					setPropertyFilterModal(false);
				}}
				setPropertyFilter={(filter) => setPropertyFilter(filter)}
				filterData={filterPhysicalProperties}
			/>
			{/* <DeleteSelectionModal open={openDelete} /> */}
		</>
	);
}
