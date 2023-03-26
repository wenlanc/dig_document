import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Autocomplete,
	Button,
	Paper,
	Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import AddRoomModal from './AddRoomModal';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard';
import { modalBoxStyles } from '../../../styled/Modal';
import { LandlordButton } from 'components/styled/Button';

const RoomSearchModal = ({ open, onClose, handleClose, properties, rooms }) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredRooms, setFilteredRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		setSelectedRoom(null);
		const allRooms = rooms;
		const propertyRooms = allRooms.filter(
			(room) => room?.property?._id === selectedProperty?._id
		);
		setFilteredRooms(propertyRooms);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	useEffect(() => {
		if (open === false) {
			setSelectedRoom(null);
			setSelectedProperty(null);
		}
	}, [open]);

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ p: 4, pt: 2 }}>
						<Box
							display={'flex'}
							alignItems={'center'}
							justifyContent={'flex-end'}
						>
							<div onClick={onClose}>
								<Close style={{ cursor: 'pointer' }} />
							</div>
						</Box>
						<Box>
							<Typography
								variant={'h4'}
								fontWeight={'bold'}
								textAlign={'center'}
								mb={2}
							>
								Edit/Remove Room
							</Typography>
						</Box>
						<Divider />
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography
									variant='h5'
									component='h2'
									fontWeight='bold'
								>
									Choose Property
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Autocomplete
												placeholder='Property'
												style={{ marginBottom: 16 }}
												id='property-autocomplete'
												options={properties}
												getOptionLabel={(property) =>
													`${property.propertyName}`
												}
												onChange={(
													e,
													property,
													reason
												) =>
													reason === 'selectOption'
														? setSelectedProperty(
																property
														  )
														: setSelectedProperty(
																null
														  )
												}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																selectedProperty?.propertyName
															}
															placeholder='Property'
															variant='outlined'
															required
														/>
													);
												}}
											/>
										</Grid>
										<Grid item xs={12} md={12}>
											<PropertyCard
												property={selectedProperty}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Box>

							<Box
								display='flex'
								justifyContent='space-between'
								my={5}
							>
								<Typography
									variant='h5'
									component='h2'
									fontWeight='bold'
								>
									Choose a Room
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={selectedProperty?._id}
												placeholder='Room Name'
												style={{ marginBottom: 16 }}
												id='room-autocomplete'
												options={filteredRooms}
												getOptionLabel={(room) =>
													`${room.name}`
												}
												onChange={(e, room, reason) =>
													reason === 'selectOption'
														? setSelectedRoom(room)
														: setSelectedRoom(null)
												}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																selectedRoom?.name
															}
															placeholder='Room'
															variant='outlined'
															required
														/>
													);
												}}
											/>
										</Grid>
										<Grid item xs={12} md={12} mb={5}>
											<DataCard
												name={'Room'}
												data={selectedRoom}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Box>
							<Box display={'flex'} justifyContent={'flex-end'}>
								<LandlordButton
									variant='contained'
									color={'primary'}
									type={'submit'}
									sx={{
										width: 200,
									}}
								>
									Submit
								</LandlordButton>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Modal>
			<AddRoomModal
				title='Edit'
				propData={selectedRoom}
				setPropData={setSelectedRoom}
				open={openEdit}
				properties={properties}
				onClose={() => {
					setOpenEdit(false);
				}}
				handleClose={() => {
					setOpenEdit(false);
					handleClose();
				}}
			/>
		</>
	);
};

export default RoomSearchModal;
