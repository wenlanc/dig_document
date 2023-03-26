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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import AddPhysicalPropertyModal from './AddPhysicalPropertyModal.jsx';
import DeleteModal from '../DeleteModal';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard.jsx';
import { modalBoxStyles } from 'components/styled/Modal.js';
import { LandlordButton } from 'components/styled/Button.js';

const PhysicalPropertySearchModal = ({
	open,
	onClose,
	handleClose,
	properties,
	rooms,
	physicalProperties,
	deleteModal = false,
	deleteItem,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredPhysicalProperties, setFilteredPhysicalProperties] =
		useState([]);
	const [selectedPhysicalProperty, setSelectedPhysicalProperty] =
		useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const [reason, setReason] = useState('');
	const [openReasonModal, setOpenReasonModal] = useState(false);

	useEffect(() => {
		setSelectedPhysicalProperty(null);
		const allPP = physicalProperties;

		const propertyPP = allPP.filter(
			(pp) => pp.property._id === selectedProperty?._id
		);
		setFilteredPhysicalProperties(propertyPP);
		//eslint-disable-next-line
	}, [selectedProperty]);

	useEffect(() => {
		if (open === true) {
			setSelectedPhysicalProperty(null);
			setSelectedProperty(null);
		}
	}, [open]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	// const handleDelete = () => {};

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ p: 4 }}>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography
									variant='h5'
									component='h2'
									fontWeight='bold'
								>
									Choose Property
								</Typography>
								<div onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</div>
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
												) => {
													setSelectedPhysicalProperty(
														''
													);
													reason === 'selectOption'
														? setSelectedProperty(
																property
														  )
														: setSelectedProperty(
																null
														  );
												}}
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
									Choose A Physical Property
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={selectedProperty?._id}
												style={{ marginBottom: 16 }}
												id='physicalProperty-autocomplete'
												options={
													filteredPhysicalProperties
												}
												getOptionLabel={(pp) =>
													`${pp.name}`
												}
												onChange={(e, pp, reason) =>
													reason === 'selectOption'
														? setSelectedPhysicalProperty(
																pp
														  )
														: setSelectedPhysicalProperty(
																null
														  )
												}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																selectedPhysicalProperty?.name
															}
															placeholder='Physical Property'
															variant='outlined'
															required
														/>
													);
												}}
											/>
										</Grid>

										<Grid item xs={12} md={12} mb={5}>
											<DataCard
												data={selectedPhysicalProperty}
												name={'Physical Property'}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Box>
							{deleteModal ? (
								<Button
									variant='containted'
									color='error'
									style={{
										marginBottom: 16,
										paddingLeft: 16,
										paddingRight: 16,
										minWidth: 160,
										textAlign: 'center',
									}}
									onClick={() => setOpenReasonModal(true)}
									disabled={selectedPhysicalProperty === null}
									// disabled={Object.values(data).length <= 11}
								>
									Delete
								</Button>
							) : (
								<Box
									display={'flex'}
									justifyContent={'flex-end'}
								>
									<LandlordButton
										variant='contained'
										color={'primary'}
										type={'submit'}
										sx={{
											width: 200,
										}}
									>
										Next
									</LandlordButton>
								</Box>
							)}
						</Box>
					</Paper>
				</Box>
			</Modal>
			<AddPhysicalPropertyModal
				title='Edit'
				propData={selectedPhysicalProperty}
				setPropData={setSelectedPhysicalProperty}
				open={openEdit}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpenEdit(false);
				}}
				handleClose={() => {
					setOpenEdit(false);
					handleClose();
				}}
			/>
			<DeleteModal
				id={selectedPhysicalProperty?._id}
				open={openReasonModal}
				setReason={setReason}
				reason={reason}
				dataType='physicalProperty'
				onClose={() => {
					setOpenReasonModal(false);
					handleClose();
				}}
				handleDelete={() => {
					handleClose();
					setOpenReasonModal(false);
					deleteItem(selectedPhysicalProperty._id);
				}}
			/>
		</>
	);
};

export default PhysicalPropertySearchModal;
