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
import PropertyCard from './Utils/PropertyCard';
import { modalBoxStyles } from '../../styled/Modal';
import { LandlordButton } from '../../styled/Button';
const PREFIX = 'PropertyFilter';

const classes = {
	modal: `${PREFIX}-modal`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('sm')]: {
			height: 'auto',
		},
	},
}));

const PropertyFilter = ({
	open,
	onClose,
	handleClose,
	properties,
	setPropertyFilter,
	filterData,
}) => {
	const [selectedProperty, setSelectedProperty] = useState(null);

	const handleSubmit = async () => {
		console.log('setting property filter', selectedProperty?._id);
		setPropertyFilter(selectedProperty);
		filterData();
		handleClose();
	};
	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ p: 4 }}>
						<Box display='flex' justifyContent='space-between'>
							<Typography
								variant='h5'
								component='h2'
								fontWeight='bold'
							>
								Filter By Property
							</Typography>
							<div onClick={onClose}>
								<Close style={{ cursor: 'pointer' }} />
							</div>
						</Box>
						<Box sx={{ mt: 2 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<Autocomplete
										disablePortal
										placeholder='Property'
										options={properties}
										id='property-autocomplete'
										getOptionLabel={(property) =>
											`${property.propertyName}`
										}
										onChange={(e, property, reason) =>
											reason === 'selectOption'
												? setSelectedProperty(property)
												: setSelectedProperty(null)
										}
										value={selectedProperty}
										sx={{ width: 300 }}
										renderInput={(params) => (
											<TextField
												{...params}
												value={
													selectedProperty?.propertyName
												}
												placeholder='Property'
												variant='outlined'
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12} md={12} mb={3}>
									<PropertyCard property={selectedProperty} />
								</Grid>
							</Grid>
						</Box>
						<Box display={'flex'} justifyContent={'flex-end'}>
							<LandlordButton
								variant='contained'
								color={'primary'}
								size={'large'}
								disabled={!selectedProperty}
								onClick={handleSubmit}
							>
								Filter
							</LandlordButton>
						</Box>
					</Paper>
				</Box>
			</Modal>
		</>
	);
};

export default PropertyFilter;
