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
import AddCostModal from './AddCostModal.jsx';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard.jsx';
import { modalBoxStyles } from '../../../styled/Modal.js';
import { LandlordButton } from 'components/styled/Button.js';
import { StyledMUIModal } from 'components/MuiStyled/Global.js';
import { ModalBox } from 'components/MuiStyled/Global.js';
import { ModalPaper } from 'components/MuiStyled/Global.js';

const CostSearchModal = ({
	open,
	onClose,
	handleClose,
	properties,
	costs,
	rooms,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredCosts, setFilteredCosts] = useState([]);
	const [selectedCost, setSelectedCost] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		setSelectedCost(null);
		const allCosts = costs;
		const propertyCosts = allCosts.filter(
			(cost) => cost?.property?._id === selectedProperty?._id
		);
		setFilteredCosts(propertyCosts);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setOpenEdit(true);
	};

	useEffect(() => {
		if (open === false) {
			setSelectedCost(null);
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
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<Autocomplete
											placeholder='Property'
											id='property-autocomplete'
											options={properties}
											getOptionLabel={(property) =>
												`${property.propertyName}`
											}
											onChange={(e, property, reason) => {
												setSelectedCost('');
												reason === 'selectOption'
													? setSelectedProperty(
															property
													  )
													: setSelectedProperty(null);
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
									Choose General Expense
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={selectedProperty?._id}
												placeholder='General Expense'
												id='otherCost-autocomplete'
												options={filteredCosts}
												getOptionLabel={(cost) =>
													`${cost.name}`
												}
												onChange={(e, cost, reason) =>
													reason === 'selectOption'
														? setSelectedCost(cost)
														: setSelectedCost(null)
												}
												renderInput={(params) => {
													return (
														<TextField
															{...params}
															value={
																selectedCost?.name
															}
															placeholder='Other Cost'
															variant='outlined'
															required
														/>
													);
												}}
											/>
										</Grid>

										<Grid item xs={12} md={12}>
											<DataCard
												data={selectedCost}
												name={'General Expense'}
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
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<AddCostModal
				rooms={rooms}
				title='Edit'
				propData={selectedCost}
				setPropData={setSelectedCost}
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

export default CostSearchModal;
