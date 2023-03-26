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
import AddSystemModal from './AddSystemModal';
import PropertyCard from '../Utils/PropertyCard';
import DataCard from '../Utils/DataCard';
import { modalBoxStyles } from '../../../styled/Modal';
import { LandlordButton } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';

const SystemSearchModal = ({
	open,
	onClose,
	rooms,
	handleClose,
	properties,
	systems,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredSystems, setFilteredSystems] = useState([]);
	const [selectedSystem, setSelectedSystem] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open === false) {
			setSelectedProperty(null);
			setSelectedSystem(null);
		}
	}, [open]);

	useEffect(() => {
		setSelectedSystem(null);
		const allSystems = systems;
		const propertySystems = allSystems.filter(
			(system) => system?.property?._id === selectedProperty?._id
		);
		setFilteredSystems(propertySystems);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (properties.find((p) => p._id === selectedProperty?._id)) {
			if (systems.find((u) => u._id === selectedSystem?._id)) {
				setOpenEdit(true);
			} else {
				setErrors({
					...errors,
					systems: true,
				});
				console.log('please system');
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
								<Box>
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
													setSelectedSystem('');
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
									Choose System
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={6}>
										<Autocomplete
											key={selectedProperty?._id}
											disablePortal
											id='system-autocomplete'
											options={filteredSystems}
											getOptionLabel={(system) =>
												`${system.name}`
											}
											onChange={(e, system, reason) =>
												reason === 'selectOption'
													? setSelectedSystem(system)
													: setSelectedSystem(null)
											}
											variant='outlined'
											value={selectedSystem?.name}
											required
											error={errors.systems}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder='System'
													required
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={12} mb={2}>
										<DataCard
											name={'System'}
											data={selectedSystem}
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
			<AddSystemModal
				title='Edit'
				rooms={rooms}
				propData={selectedSystem}
				setPropData={setSelectedSystem}
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

export default SystemSearchModal;
