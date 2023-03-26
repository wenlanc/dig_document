import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	List,
	ListItem,
	IconButton,
	ListItemText,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { Close, Edit as EditIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
	DeleteRoom,
	EditRoom,
	NewRoom,
} from '../../../../../store/actions/Property/roomAction';
import { modalStyles } from '../../../../styled/Modal';

const PREFIX = 'RoomsList';

const classes = {
	modal: `${PREFIX}-modal`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			height: 'auto',
		},
	},
}));

const RoomsList = ({ setRooms, rooms, open, onClose, property }) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const [newRoom, setNewRoom] = useState('');
	const [selectedRoom, setSelectedRoom] = useState({});
	// const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		// setSelectedUtility(null);
		// const allData = data;
		// const propertyData = allData.filter(
		// 	(data) => data.property._id === selectedProperty._id
		// );
		// setFilteredData(propertyData);
	}, [selectedProperty]);

	useEffect(() => {
		console.log('rooms [=>', rooms);
	}, []);

	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			name: newRoom,
			property: property._id,
		};
		await dispatch(NewRoom(data));
		setNewRoom('');
		// await getCSRF();
		// instance
		// 	.post('conditions/addRoom', data)
		// 	.then((res) => {
		// 		setRooms([...rooms, res.data]);
		// 		setNewRoom('');
		// 	})
		// 	.catch((err) => console.log(err));
	};

	const handleDelete = async () => {
		const data = {
			roomId: selectedRoom._id,
		};

		await dispatch(DeleteRoom(data));
		setOpenEdit(false);
		// await getCSRF();
		// instance
		// 	.post('conditions/deleteRoom', data)
		// 	.then((res) => {
		// 		setRooms(rooms.filter((room) => room._id !== data.roomId));
		// 		setOpenEdit(false);
		// 		onDelete(data.roomId);
		// 		// setRooms([...rooms, res.data]);
		// 		// setNewRoom('');
		// 	})
		// 	.catch((err) => console.log(err));
	};

	const openEditModal = (room) => {
		setSelectedRoom(room);
		setOpenEdit(true);
		onClose();
	};

	const handleEdit = async () => {
		const data = selectedRoom;
		await dispatch(EditRoom(data));
		setOpenEdit(false);
	};
	return (
		<Root>
			<Modal open={open} onClose={onClose}>
				<Box className={classes.modal} sx={modalStyles}>
					<Box display='flex' justifyContent='space-between'>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							Add or Edit Room
						</Typography>
						<div onClick={onClose}>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>

					<Box sx={{ mt: 2 }}>
						<Grid spacing={2}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={8}>
									<Typography
										align='center'
										variant='h4'
										component={'h2'}
										fontWeight={'bold'}
									>
										Existing Rooms
									</Typography>

									<Box>
										<List dense={true}>
											{rooms.map((room) => (
												<ListItem
													key={room._id}
													secondaryAction={
														<IconButton
															edge='end'
															aria-label='delete'
															onClick={() =>
																openEditModal(
																	room
																)
															}
														>
															<EditIcon />
														</IconButton>
													}
												>
													<ListItemText
														primary={room.name}
														secondary={
															property?.propertyName
														}
													/>
												</ListItem>
											))}
										</List>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<form onSubmit={handleSubmit}>
										<Typography
											align='center'
											variant='h4'
											component={'h2'}
											fontWeight={'bold'}
										>
											Add Room
										</Typography>

										<Box my={5}>
											<TextField
												name='name'
												onChange={(e) =>
													setNewRoom(e.target.value)
												}
												label='Name'
												variant='outlined'
												fullWidth
												value={newRoom}
												style={{ marginBottom: 16 }}
												required
											/>
										</Box>

										<Button
											variant='contained'
											style={{
												marginBottom: 16,
												paddingLeft: 16,
												paddingRight: 16,
												minWidth: 160,
												textAlign: 'center',
											}}
											type='submit'
											// onClick={handleSubmit}
										>
											Confirm
										</Button>
									</form>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>
			{/* Edit/Delete Dialog */}
			<Dialog
				open={openEdit}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
				fullWidth
			>
				<DialogTitle id='alert-dialog-title'>
					{'Rename or Delete Room'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description' my={2}>
						<TextField
							name='name'
							onChange={(e) => {
								setSelectedRoom({
									...selectedRoom,
									name: e.target.value,
								});
							}}
							label='Room Name'
							variant='outlined'
							fullWidth
							value={selectedRoom.name}
							style={{ marginBottom: 16 }}
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Grid container justifyContent={'space-around'}>
						<Button
							onClick={() => setOpenEdit(false)}
							color='info'
							variant='contained'
						>
							Close
						</Button>
						<Button
							color='error'
							variant='contained'
							onClick={handleDelete}
						>
							Delete
						</Button>
						<Button
							onClick={handleEdit}
							autoFocus
							color='success'
							variant='contained'
						>
							Rename
						</Button>
					</Grid>
				</DialogActions>
			</Dialog>
		</Root>
	);
};

export default RoomsList;
