import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Paper } from '@mui/material';
import { LandlordButton, StyledButton } from '../../../styled/Button';
import styled from 'styled-components';
import CondtionsModal from '../ConditionsModal';
import RoomCard from './Rooms/RoomCard';
import RoomsList from './Rooms/RoomsList';
import { useSelector } from 'react-redux';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import CustomSnackbar from '../../../Utils/CustomSnackbar';
import colors from 'assets/theme/base/colors';
import { Link } from 'react-router-dom';
import AddRoomButton from '../Utils/AddRoomButton';

const Heading = styled(Typography)`
	font-weight: bold;
`;

const Condition = () => {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});
	const [propertyModal, setPropertyModal] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [properties, setProperties] = useState([]);
	// const [condtions, setCondtions] = useState([]);
	const [snackbar, setSnackbar] = useState({
		status: false,
		message: '',
		variant: '',
	});
	// const [row, setRow] = useState({});
	const [openRoomsList, setOpenRoomsList] = useState(false);
	const [currentProperty, setCurrentProperty] = useState(null);

	const propertiesData = useSelector((state) => state.PropertiesList);
	const fixtureData = useSelector((state) => state.FixtureList);
	const roomData = useSelector((state) => state.RoomList);

	// const dispatch = useDispatch();

	const fetchData = async () => {
		// setCondtions([...fixtureData.data]);
		setProperties([...propertiesData.data]);
	};

	useEffect(() => {
		setProperties([...propertiesData?.data]);
	}, [propertiesData.data]);
	useEffect(() => {
		getRooms(currentProperty?._id);
	}, [roomData.data, fixtureData.data, currentProperty?._id]);

	useEffect(() => {
		fetchData().then(() => setPropertyModal(true));
	}, []);

	const onPropertySelect = (property) => {
		console.log('got property', property);
		setCurrentProperty(property);
		setPropertyModal(false);
		getRooms(property?._id);
	};

	useEffect(() => {
		console.log('selectedProperty');
		console.log(currentProperty);
	}, [currentProperty]);

	const getRooms = async (propertyId) => {
		console.log('get rooms', propertyId);
		let rooms = roomData.data.filter(
			(c) => c?.property?._id === propertyId
		);
		console.log('fixture data', fixtureData.data);
		rooms = rooms.map((r) => {
			r.fixtures = fixtureData.data.filter((f) => f?.room?._id === r._id);
			return r;
		});
		setRooms(rooms);
	};

	useEffect(() => {
		setSnackbar(fixtureData.response);
	}, [fixtureData.response]);

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
						Fixture Management
					</Heading>
				</Box>
			</Box>
			<Box py={2}>
				<Grid container spacing={5} my={3}>
					<Grid item md={6}>
						<Box display='flex' justifyContent='space-between'>
							<Heading
								variant='h4'
								component='h2'
								color={'#000'}
								textTransform={'uppercase'}
							>
								{currentProperty?.propertyName}
							</Heading>
						</Box>
					</Grid>
					<Grid item md={6}>
						<Box
							display='flex'
							flexDirection='row'
							justifyContent='space-around'
						>
							<LandlordButton
								variant={'contained'}
								size={'medium'}
								color={'primary'}
								sx={{
									minWidth: 200,
									py: 1,
									fontSize: 15,
								}}
								onClick={() => {
									setPropertyModal(true);
								}}
							>
								{currentProperty ? 'Change' : 'Select'} Property
							</LandlordButton>

							<Link to={'/landlord-tools/properties-rooms'}>
								<LandlordButton
									variant={'contained'}
									size={'medium'}
									color={'success'}
									sx={{
										minWidth: 200,
										py: 1,
										fontSize: 15,
									}}
									// onClick={() => {
									// 	setOpenRoomsList(true);
									// }}
								>
									Manage Rooms
								</LandlordButton>
							</Link>
						</Box>
					</Grid>
				</Grid>
			</Box>

			{currentProperty === null ? (
				<Box>
					<Paper
						sx={{
							p: 4,
							minHeight: 350,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography
							variant={'h4'}
							component={'h2'}
							textAlign={'center'}
						>
							Please select a property to manage Fixtures
						</Typography>
					</Paper>
				</Box>
			) : null}

			{fixtureData.loading ? (
				<Box
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					p={4}
				>
					<CircularProgress />
				</Box>
			) : null}

			{rooms.length === 0 && !roomData.loading && currentProperty ? (
				<Paper
					sx={{
						p: 4,
						minHeight: 350,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant='h4'
						component={'h2'}
						alignContent={'center'}
					>
						No Rooms to show
					</Typography>
					<AddRoomButton />
				</Paper>
			) : null}

			{rooms.map((room) => (
				<Box rowGap={7} display={'flex'} flexDirection={'column'}>
					<RoomCard
						property={currentProperty}
						key={room._id}
						room={room}
					/>
				</Box>
			))}

			<RoomsList
				open={openRoomsList}
				handleClose={() => {
					setOpenRoomsList(false);
				}}
				onClose={() => setOpenRoomsList(false)}
				property={currentProperty}
				rooms={rooms}
				setRooms={setRooms}
			/>

			<CondtionsModal
				open={propertyModal}
				onClose={() => {
					setPropertyModal(false);
				}}
				handleClose={() => {
					setPropertyModal(false);
				}}
				propertySelected={(property) => onPropertySelect(property)}
				properties={properties}
			/>
		</>
	);
};

export default Condition;
