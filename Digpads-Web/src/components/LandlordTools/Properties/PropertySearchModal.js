import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
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
import AddModal from './AddModal.jsx';
import PropertyCard from './Utils/PropertyCard';
import { modalBoxStyles } from '../../styled/Modal';
import { LandlordButton } from 'components/styled/Button.js';
import AddPropertyModal from './AddPropertyModal.jsx';

const PREFIX = 'PropertySearch';

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

const PropertySearch = ({
	open,
	onClose,
	handleClose,
	properties,
	editHandler,
	deleteHandler,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);

	// useEffect(() => {
	// 	setSelectedUtility(null);
	// 	const allData = data;
	// 	const propertyData = allData.filter(
	// 		(data) => data.property._id === selectedProperty._id
	// 	);
	// 	setFilteredData(propertyData);
	// }, [selectedProperty]);

	useEffect(() => {
		if (!open) setSelectedProperty(null);
	}, [open]);

	const handleSubmit = async () => {
		editHandler(selectedProperty);
		handleClose();
	};

	useEffect(() => {}, []);

	return (
		<Root>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={modalBoxStyles}
					component={'form'}
					onSubmit={handleSubmit}
				>
					<Paper sx={{ p: 4 }}>
						<Box display='flex' justifyContent='space-between'>
							<Typography
								variant='h5'
								component='h2'
								fontWeight='bold'
							>
								Select a Property
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
										style={{ marginBottom: 16 }}
										id='property-autocomplete'
										options={properties}
										getOptionLabel={(property) =>
											`${property.propertyName}`
										}
										onChange={(e, property, reason) =>
											reason === 'selectOption'
												? setSelectedProperty(property)
												: setSelectedProperty(null)
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
								<Grid item xs={12} md={12} mb={3}>
									<PropertyCard property={selectedProperty} />
								</Grid>
							</Grid>
						</Box>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<LandlordButton
								variant={'contained'}
								size={'medium'}
								color={'success'}
								type={'submit'}
								sx={{
									minWidth: 160,
									my: 2,
								}}
								disabled={!selectedProperty}
							>
								Edit
							</LandlordButton>
							<LandlordButton
								variant={'contained'}
								size={'medium'}
								color={'error'}
								sx={{
									minWidth: 160,
									my: 2,
								}}
								onClick={() => {
									deleteHandler(selectedProperty._id);
									onClose();
								}}
								disabled={!selectedProperty}
							>
								Remove
							</LandlordButton>
						</Box>
					</Paper>
				</Box>
			</Modal>
		</Root>
	);
};

export default PropertySearch;
