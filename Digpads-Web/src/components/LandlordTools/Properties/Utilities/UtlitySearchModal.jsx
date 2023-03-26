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
import AddUtilitiesModal from './AddUtilitiesModal';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard';
import { modalBoxStyles } from '../../../styled/Modal';
import { LandlordButton } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';

const UtilitySearchModal = ({
	open,
	onClose,
	rooms,
	handleClose,
	properties,
	utilities,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredUtilities, setFilteredUtilities] = useState([]);
	const [selectedUtility, setSelectedUtility] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open === false) {
			setSelectedProperty(null);
			setSelectedUtility(null);
		}
	}, [open]);

	useEffect(() => {
		setSelectedUtility(null);
		const allUtilities = utilities;
		const propertyUtilities = allUtilities.filter(
			(utility) => utility?.property?._id === selectedProperty?._id
		);
		setFilteredUtilities(propertyUtilities);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (properties.find((p) => p._id === selectedProperty?._id)) {
			if (utilities.find((u) => u._id === selectedUtility?._id)) {
				setOpenEdit(true);
			} else {
				setErrors({
					...errors,
					utilities: true,
				});
				console.log('please utility');
			}
		} else {
			setErrors({
				...errors,
				properties: true,
			});
			console.log('please property');
		}
	};

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
								<Box spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Autocomplete
												disablePortal
												placeholder='Property'
												id='property-autocomplete'
												getOptionLabel={(property) =>
													`${property.propertyName}`
												}
												onChange={(
													e,
													property,
													reason
												) => {
													setSelectedUtility('');
													reason === 'selectOption'
														? setSelectedProperty(
																property
														  )
														: setSelectedProperty(
																null
														  );
												}}
												options={properties}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder='Property'
														variant='outlined'
														error={
															errors?.properties
														}
														required
													/>
												)}
											/>
										</Grid>
										<Grid item xs={12} md={12}>
											<PropertyCard
												property={selectedProperty}
											/>
										</Grid>
									</Grid>
								</Box>
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
									Choose Utility
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Box>
									<Grid container>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={selectedProperty?._id}
												disablePortal
												id='utility-autocomplete'
												options={filteredUtilities}
												getOptionLabel={(utility) =>
													`${utility.name}`
												}
												onChange={(
													e,
													utility,
													reason
												) =>
													reason === 'selectOption'
														? setSelectedUtility(
																utility
														  )
														: setSelectedUtility(
																null
														  )
												}
												variant='outlined'
												value={selectedUtility?.name}
												required
												error={errors.utilities}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder='Utility'
														required
													/>
												)}
											/>
										</Grid>
										<Grid item xs={12} md={12} mb={2}>
											<DataCard
												name={'Utility'}
												data={selectedUtility}
											/>
										</Grid>
									</Grid>
								</Box>
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
									Next
								</LandlordButton>
							</Box>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<AddUtilitiesModal
				title='Edit'
				rooms={rooms}
				propData={selectedUtility}
				setPropData={setSelectedUtility}
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

export default UtilitySearchModal;
