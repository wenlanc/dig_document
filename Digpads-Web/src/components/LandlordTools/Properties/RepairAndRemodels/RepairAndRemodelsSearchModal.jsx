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
import AddRepairAndRemodels from './AddRepairAndRemodels.jsx';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard.jsx';
import { modalBoxStyles } from '../../../styled/Modal.js';
import { LandlordButton } from 'components/styled/Button.js';
import { StyledMUIModal } from 'components/MuiStyled/Global.js';
import { ModalBox } from 'components/MuiStyled/Global.js';
import { ModalPaper } from 'components/MuiStyled/Global.js';

const RepairAndRemodelsSearchModal = ({
	open,
	onClose,
	handleClose,
	properties,
	repairsAndRemodels,
	rooms,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredRepairsAndRemodels, setFilteRedrepairsAndRemodels] =
		useState([]);
	const [selectedRepairAndRemodel, setSelectedRepairAndRemodel] =
		useState(null);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		setSelectedRepairAndRemodel(null);
		const allReparisAndRemodels = repairsAndRemodels;
		const propertyData = allReparisAndRemodels.filter(
			(r) => r?.property?._id === selectedProperty?._id
		);
		setFilteRedrepairsAndRemodels(propertyData);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	useEffect(() => {
		if (open === false) {
			setSelectedProperty(null);
			setSelectedRepairAndRemodel(null);
		}
	}, [open]);

	return (
		<>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography
									variant='h6'
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
													setSelectedRepairAndRemodel(
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
												value={
													selectedProperty?.propertyName
												}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															placeholder='Property'
															variant='outlined'
															value={
																selectedProperty?.propertyName
															}
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
								mt={3}
							>
								<Typography
									variant='h6'
									component='h2'
									fontWeight='bold'
								>
									Choose Repair And Remodel
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<Autocomplete
											key={selectedProperty?._id}
											placeholder='Repair And Remodel'
											id='repairAndRemodel-autocomplete'
											options={filteredRepairsAndRemodels}
											getOptionLabel={(r) => `${r.name}`}
											onChange={(
												e,
												repairAndRemodel,
												reason
											) =>
												reason === 'selectOption'
													? setSelectedRepairAndRemodel(
															repairAndRemodel
													  )
													: setSelectedRepairAndRemodel(
															null
													  )
											}
											value={
												selectedRepairAndRemodel?.name
											}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														required
														value={
															selectedRepairAndRemodel?.name
														}
														placeholder='Repair And Remodel'
														variant='outlined'
													/>
												);
											}}
										/>
									</Grid>

									<Grid item xs={12} md={12} mb={2}>
										<DataCard
											data={selectedRepairAndRemodel}
											name={'Repair And Remodels'}
										/>
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
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<AddRepairAndRemodels
				title='Edit'
				propData={selectedRepairAndRemodel}
				setPropData={setSelectedRepairAndRemodel}
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
		</>
	);
};

export default RepairAndRemodelsSearchModal;
