import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Autocomplete,
	Paper,
} from '@mui/material';
import { Close } from '@mui/icons-material';
// import AddUtilitiesModal from './AddUtilitiesModal';
import PropertyCard from '../../Utils/PropertyCard';
import DataCard from '../../Utils/DataCard';
import { modalBoxStyles } from 'components/styled/Modal';
import { LandlordButton } from 'components/styled/Button';
import AddFixtureModal from './AddFixtureModal';

const FixtureSearchModal = ({ open, onClose, properties, rooms, fixtures }) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [filteredItems, setFilteredItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open === false) {
			setSelectedProperty(null);
			setSelectedItem(null);
		}
	}, [open]);

	useEffect(() => {
		setSelectedItem(null);
		const allFixutes = fixtures;
		const propertyFixtures = allFixutes.filter(
			(fixture) => fixture?.property?._id === selectedProperty?._id
		);
		setFilteredItems(propertyFixtures);
		//eslint-disable-next-line
	}, [selectedProperty]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (properties.find((p) => p._id === selectedProperty?._id)) {
			if (fixtures.find((u) => u._id === selectedItem?._id)) {
				setOpenEdit(true);
			} else {
				setErrors({
					...errors,
					fixtures: true,
				});
				console.log('please fixture');
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
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper
						sx={{
							p: 4,
						}}
					>
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
													setSelectedItem('');
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
								my={5}
							>
								<Typography
									variant='h5'
									component='h2'
									fontWeight='bold'
								>
									Choose Fixture Item
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Box spacing={2}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Autocomplete
												key={selectedProperty?._id}
												disablePortal
												id='fixture-autocomplete'
												options={filteredItems}
												getOptionLabel={(fixture) =>
													`${fixture.name}`
												}
												onChange={(
													e,
													fixture,
													reason
												) =>
													reason === 'selectOption'
														? setSelectedItem(
																fixture
														  )
														: setSelectedItem(null)
												}
												variant='outlined'
												value={selectedItem?.name}
												required
												error={errors.fixtures}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder='Fixture Item'
														required
													/>
												)}
											/>
										</Grid>
										<Grid item xs={12} md={12} mb={5}>
											<DataCard
												name={'Fixture'}
												data={selectedItem}
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
									Submit
								</LandlordButton>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Modal>
			<AddFixtureModal
				title='Edit'
				external={true}
				properties={properties}
				rooms={rooms}
				handleClose={() => {
					setOpenEdit(false);
				}}
				propData={selectedItem}
				setPropData={setSelectedItem}
				open={openEdit}
				onClose={() => {
					setOpenEdit(false);
				}}
			/>
		</>
	);
};

export default FixtureSearchModal;
