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
import AddMaintenance from './AddMaintenance.jsx';
import PropertyCard from '../Utils/PropertyCard.jsx';
import DataCard from '../Utils/DataCard';
import { modalBoxStyles } from '../../../styled/Modal.js';
import { LandlordButton } from 'components/styled/Button.js';
import { StyledMUIModal } from 'components/MuiStyled/Global.js';
import { ModalBox } from 'components/MuiStyled/Global.js';
import { ModalPaper } from 'components/MuiStyled/Global.js';

const MaintenanceSearchModal = ({
	open,
	onClose,
	handleClose,
	properties,
	maintenances,
	rooms,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredMaintenances, setFilteredMaintenances] = useState([]);
	const [selectedMaintenance, setSelectedMaintenance] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		setSelectedMaintenance(null);
		const allMaintenances = maintenances;
		const propertyData = allMaintenances.filter(
			(r) => r?.property?._id === selectedProperty?._id
		);
		setFilteredMaintenances(propertyData);
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	useEffect(() => {
		if (open === false) {
			setSelectedMaintenance(null);
			setSelectedProperty(null);
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
										<Grid item xs={12} md={12}>
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
													setSelectedMaintenance('');
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
												// disabled={stateCities.length === 0}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															required
															value={
																selectedProperty?.propertyName
															}
															placeholder='Property'
															variant='outlined'
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
									Choose Maintenance
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={12}>
										<Autocomplete
											key={selectedProperty?._id}
											placeholder='Maintenance'
											id='maintenance-autocomplete'
											options={filteredMaintenances}
											getOptionLabel={(r) => `${r.name}`}
											onChange={(
												e,
												maintenance,
												reason
											) =>
												reason === 'selectOption'
													? setSelectedMaintenance(
															maintenance
													  )
													: setSelectedMaintenance(
															null
													  )
											}
											// disabled={stateCities.length === 0}
											renderInput={(params) => {
												const param = {
													...params,
													inputProps: {
														...params.inputProps,
														value: selectedMaintenance?.name,
													},
												};
												return (
													<TextField
														{...params}
														value={
															selectedMaintenance?.name
														}
														placeholder='Maintenance'
														required
														variant='outlined'
													/>
												);
											}}
										/>
									</Grid>

									<Grid item xs={12} md={12} mb={2}>
										<DataCard
											data={selectedMaintenance}
											name={'Maintenance'}
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
			<AddMaintenance
				title='Edit'
				propData={selectedMaintenance}
				setPropData={setSelectedMaintenance}
				open={openEdit}
				rooms={rooms}
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

export default MaintenanceSearchModal;
