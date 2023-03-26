import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	TextareaAutosize,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Paper,
} from '@mui/material';
import { Close, SquareFoot, Straighten } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import {
	DeleteRoom,
	NewRoom,
	EditRoom,
} from '../../../../store/actions/Property/roomAction';
import { modalBoxStyles } from '../../../styled/Modal';
import SuiInput from 'components/SuiInput';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import SuiSelect from 'components/SuiSelect';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CustomLabel from '../Utils/DateLabel';

const PREFIX = 'AddRoomModal';

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

const AddRoomModal = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	properties,
}) => {
	const [cData, setCData] = useState({});
	const [deleteModal, setDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);
	let data, setData;
	if (title === 'Add') {
		data = cData;
		setData = setCData;
	} else {
		data = propData;
		setData = setPropData;
	}

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (title === 'Add') {
			await dispatch(NewRoom(data));
		} else {
			await dispatch(EditRoom(data));
		}
		setData({});
		setLoading(false);
		handleClose();
	};
	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteRoom({ _id: data?._id }));
		setLoading(false);
		handleClose();
		setDeleteModal(false);
	};

	const renderWalls = () => {
		return Array.from({ length: data?.walls }, (v, i) => {
			return (
				<>
					<Grid item xs={12} md={6}>
						<SuiInput
							type={'number'}
							value={data?.wallsLengthInFeet?.[i + 1]}
							name={`${i + 1}`}
							onChange={(e) => {
								setData({
									...data,
									wallsLengthInFeet: {
										...data?.wallsLengthInFeet,
										[i + 1]: e.target.value,
									},
								});
							}}
							placeholder={`Wall#${i + 1} in Ft.`}
							icon={{
								component: <SquareFoot />,
								direction: 'right',
							}}
							required
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<SuiInput
							type={'number'}
							value={data?.wallsLengthInInches?.[i + 1]}
							name={`${i + 1}`}
							onChange={(e) => {
								setData({
									...data,
									wallsLengthInInches: {
										...data?.wallsLengthInInches,
										[i + 1]: e.target.value,
									},
								});
							}}
							placeholder={`Wall#${i + 1} in Inches`}
							icon={{
								component: <Straighten />,
								direction: 'right',
							}}
							required
						/>
					</Grid>
				</>
			);
		});
	};

	return (
		<Root>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ p: 4 }}>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title} Room
								</Typography>
								<div onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</div>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<TextField
											name='name'
											onChange={handleChange}
											placeholder='Room Name'
											variant='outlined'
											fullWidth
											value={data?.name}
											required
										/>
										{data?.name && <CustomLabel label={'room name'} />}
									</Grid>
									<Grid item xs={12} md={6}>
										<Autocomplete
											placeholder='Property'
											id='property-autocomplete'
											options={properties}
											value={data?.property}
											getOptionLabel={(property) => `${property.propertyName}`}
											onChange={(e, property, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															property,
													  })
													: setData({
															...data,
															property: null,
													  })
											}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.property?.propertyName}
														placeholder='Property'
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.property && <CustomLabel label={'property'} />}
									</Grid>
									<Grid item xs={12} md={6}>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
											style={{ width: '100%' }}
										>
											<DatePicker
												placeholder='Date Last Remodeled'
												onChange={(value) => {
													setData({
														...data,
														lastRemodeled: String(value),
													});
												}}
												style={{
													width: '100%',
												}}
												value={data?.lastRemodeled || Date.now()}
												renderInput={(params) => (
													<TextField
														style={{
															width: '100%',
														}}
														fullWidth
														{...params}
														required
													/>
												)}
											/>
										</LocalizationProvider>

										<CustomLabel label={'Date Last Remodeled'} />
									</Grid>
									<Grid item xs={12} md={6}>
										<SuiInput
											type={'number'}
											value={data?.sqft}
											name={'sqft'}
											onChange={handleChange}
											placeholder='SQFT'
											// icon={{
											// 	component: <AttachMoneyIcon />,
											// 	direction: 'left',
											// }}
											required
										/>
										{data?.sqft && <CustomLabel label={'sqft'} />}
									</Grid>

									<Grid item xs={12} md={6}>
										<Typography variant={'h6'}>Dimensions</Typography>
									</Grid>
									<Grid item xs={12} md={6}>
										<SuiSelect
											placeholder={'Number of Walls'}
											options={Array.from({ length: 10 }, (v, i) => {
												return {
													value: i + 1,
													label: i + 1,
												};
											})}
											onChange={(opt) => {
												setData({
													...data,
													wallsObj: opt,
													walls: opt.value,
												});
											}}
											value={data?.wallsObj}
											name={'walls'}
										/>
										{data?.walls && <CustomLabel label={'Number Of Walls'} />}
									</Grid>
									{data?.walls > 0 && renderWalls()}
									<Grid item xs={12} md={12}>
										<SuiInput
											multiline
											rows={8}
											name='notes'
											minRows={6}
											onChange={handleChange}
											aria-placeholder='notes'
											placeholder='Notes'
											value={data?.notes}
											style={{ width: '100%' }}
										/>
									</Grid>
								</Grid>
							</Box>
							<Grid container justifyContent={'space-around'}>
								<LandlordButton
									variant={'contained'}
									size={'medium'}
									color={'success'}
									type={'submit'}
									sx={{
										minWidth: 160,
										my: 2,
										mx: 5,
									}}
									disabled={loading}
								>
									{loading ? <LandlordLoading /> : 'Save'}
								</LandlordButton>
								{title === 'Edit' ? (
									<LandlordButton
										variant={'contained'}
										size={'medium'}
										color={'error'}
										sx={{
											minWidth: 160,
											my: 2,
											mx: 5,
										}}
										disabled={loading}
										onClick={() => setDeleteModal(true)}
									>
										{loading ? <LandlordLoading /> : 'Delete'}
									</LandlordButton>
								) : null}
							</Grid>
						</Box>
					</Paper>
				</Box>
			</Modal>
			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Remove Room ?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Room. You acknowledge and understand
						that once deleted, the data tied to this Room will be gone forever.
						This will affect the Properties and your overall portfolio's
						financials as well.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordButton
						onClick={() => setDeleteModal(false)}
						variant={'contained'}
						size={'medium'}
						color={'primary'}
					>
						{loading ? <LandlordLoading /> : 'Close'}
					</LandlordButton>
					<LandlordButton
						onClick={handleDelete}
						variant={'contained'}
						size={'medium'}
						color={'error'}
						autoFocus
					>
						{loading ? <LandlordLoading /> : 'Confirm'}
					</LandlordButton>
				</DialogActions>
			</Dialog>
		</Root>
	);
};

export default AddRoomModal;
