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
import AddTax from './AddTax.jsx';
import PropertyCard from '../Utils/PropertyCard.jsx';
import DataCard from '../Utils/DataCard.jsx';
import { modalBoxStyles } from 'components/styled/Modal';
import { LandlordButton } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global.js';
import { ModalBox } from 'components/MuiStyled/Global.js';
import { ModalPaper } from 'components/MuiStyled/Global.js';

const TaxSearchModal = ({ open, onClose, handleClose, properties, taxes }) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredTaxes, setFilteredTaxes] = useState([]);
	const [selectedTax, setSelectedTax] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		setSelectedTax(null);
		const allTaxes = taxes;
		const propertyData = allTaxes.filter(
			(r) => r?.property?._id === selectedProperty?._id
		);
		setFilteredTaxes(propertyData);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	useEffect(() => {
		if (open === false) {
			setSelectedProperty(null);
			setSelectedTax(null);
		}
	}, [open]);

	return (
		<>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox>
					<ModalPaper>
						<Box component='form' onSubmit={handleSubmit}>
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
								<Grid container spacing={2}>
									<Grid item xs={12} md={12}>
										<Autocomplete
											placeholder='Property'
											id='property-autocomplete'
											options={properties}
											getOptionLabel={(property) =>
												`${property.propertyName}`
											}
											onChange={(e, property, reason) => {
												setSelectedTax('');
												reason === 'selectOption'
													? setSelectedProperty(
															property
													  )
													: setSelectedProperty(null);
											}}
											// disabled={stateCities.length === 0}
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
									Choose Tax
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={12}>
										<Autocomplete
											key={selectedProperty?._id}
											placeholder='Tax'
											id='tax-autocomplete'
											options={filteredTaxes}
											getOptionLabel={(r) => `${r.name}`}
											onChange={(e, tax, reason) =>
												reason === 'selectOption'
													? setSelectedTax(tax)
													: setSelectedTax(null)
											}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={
															selectedTax?.name
														}
														placeholder='Tax'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>

									<Grid item xs={12} md={12} mb={2}>
										<DataCard
											name={'Tax'}
											data={selectedTax}
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
			<AddTax
				title='Edit'
				propData={selectedTax}
				setPropData={setSelectedTax}
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

export default TaxSearchModal;
