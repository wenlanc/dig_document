import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Autocomplete,
	Button,
	Card,
	CardContent,
	Paper,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import AddInsurance from './AddInsurance.jsx';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard';
import { modalBoxStyles } from '../../../styled/Modal.js';
import { LandlordButton } from 'components/styled/Button.js';
import { ModalBox } from 'components/MuiStyled/Global.js';
import { ModalPaper } from 'components/MuiStyled/Global.js';
import { StyledMUIModal } from 'components/MuiStyled/Global.js';

const InsuranceSearchModal = ({
	data,
	setData,
	open,
	onClose,
	handleClose,
	properties,
	insurances,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredInsurances, setFilteredInsurances] = useState([]);
	const [selectedInsurance, setSelectedInsurance] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		setSelectedInsurance(null);
		const allInsurances = insurances;
		const propertyData = allInsurances.filter(
			(r) => r?.property?._id === selectedProperty?._id
		);
		setFilteredInsurances(propertyData);
	}, [selectedProperty]);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	useEffect(() => {
		if (open === false) {
			setSelectedInsurance(null);
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
												disableClearable
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
													setSelectedInsurance('');
													reason === 'selectOption'
														? setSelectedProperty(
																property
														  )
														: setSelectedProperty(
																null
														  );
												}}
												// disabled={stateCities.length === 0}
												renderInput={(params) => {
													const param = {
														...params,
														inputProps: {
															...params.inputProps,
															value: selectedProperty?.propertyName,
														},
													};
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
								mt={3}
							>
								<Typography
									variant='h6'
									component='h2'
									fontWeight='bold'
								>
									Choose Insurance
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={12}>
										<Autocomplete
											key={selectedProperty?._id}
											id='insurance-autocomplete'
											options={filteredInsurances}
											getOptionLabel={(r) => `${r.name}`}
											onChange={(e, insurance, reason) =>
												reason === 'selectOption'
													? setSelectedInsurance(
															insurance
													  )
													: setSelectedInsurance(null)
											}
											// disabled={stateCities.length === 0}
											renderInput={(params) => {
												const param = {
													...params,
													inputProps: {
														...params.inputProps,
														value: selectedInsurance?.name,
													},
												};
												return (
													<TextField
														{...params}
														value={
															selectedInsurance?.name
														}
														placeholder='Insurance'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={12} mb={2}>
										<DataCard
											data={selectedInsurance}
											name={'Insurance'}
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
			<AddInsurance
				title='Edit'
				propData={selectedInsurance}
				setPropData={setSelectedInsurance}
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

export default InsuranceSearchModal;
