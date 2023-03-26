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
	CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropertyCard from './Utils/PropertyCard';
import { modalBoxStyles } from '../../styled/Modal';
import { LandlordButton } from 'components/styled/Button';

const PREFIX = 'CondtionsModal';

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

const CondtionsModal = ({ open, onClose, properties, propertySelected }) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		console.log('setting loading...');
		setLoading(true);
		propertySelected(selectedProperty);
	};
	useEffect(() => {
		setLoading(false);
	}, [open]);

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ p: 4 }}>
						{loading ? (
							<Box>
								<CircularProgress />
							</Box>
						) : (
							<Box component={'form'} onSubmit={handleSubmit}>
								<Box
									display='flex'
									justifyContent='space-between'
								>
									<Typography
										variant='h5'
										component='h2'
										fontWeight='bold'
									>
										Select Property
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
													style={{ marginBottom: 16 }}
													id='property-autocomplete'
													options={properties}
													disableClearable
													getOptionLabel={(
														property
													) =>
														`${property.propertyName}`
													}
													onChange={(
														e,
														property,
														reason
													) =>
														reason ===
														'selectOption'
															? setSelectedProperty(
																	property
															  )
															: setSelectedProperty(
																	null
															  )
													}
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
																{...param}
																placeholder='Property'
																variant='outlined'
																required
															/>
														);
													}}
												/>
											</Grid>
											<Grid item xs={12} md={12} mb={3}>
												<PropertyCard
													property={selectedProperty}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Box>
								<Box
									display={'flex'}
									alignItems={'center'}
									justifyContent={'flex-end'}
								>
									<LandlordButton
										variant='contained'
										color={'primary'}
										size={'large'}
										style={{
											paddingLeft: 16,
											paddingRight: 16,
											minWidth: 160,
											textAlign: 'center',
										}}
										// onClick={handleSubmit}
										type='submit'
									>
										Next
									</LandlordButton>
								</Box>
							</Box>
						)}
					</Paper>
				</Box>
			</Modal>
		</>
	);
};

export default CondtionsModal;
