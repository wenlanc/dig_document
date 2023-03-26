import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Autocomplete,
	Button,
	InputAdornment,
	Paper,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import usaStates from '../../../constants/usaStates';
import usaCities from '../../../constants/usaCities';
import UploadImages from '../../../Views/posts/UploadImages';
import SuiInput from 'components/SuiInput';
import { NewProperty } from '../../../store/actions/Property/propertiesAction';
import { useDispatch } from 'react-redux';
import { modalBoxStyles } from '../../styled/Modal';

const AddModal = ({
	data,
	setData,
	title = 'Add',
	open,
	onClose,
	handleClose,
}) => {
	const [stateCities, setStateCities] = useState([]);
	const [editAble, setEditAble] = useState(title === 'Info' ? true : false);
	const [errors, setErrors] = useState({});
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	function handleCityChange(e, city, reason) {
		console.log('handleCityChange');
		if (reason === 'selectOption') {
			setData({
				...data,
				city,
			});
			// props.onChange(state, city);
			return;
		}

		if (reason === 'clear') {
			setData({
				...data,
				city: '',
			});
			// props.onChange(state, city);
		}
	}

	function handleStateChange(e, value, reason) {
		console.log('handleStateChange');
		if (reason === 'clear') {
			setData({
				...data,
				city: '',
				state: '',
			});
			setStateCities([]);
			// props.onChange(null, null, 'clear');
			return;
		}

		const stateName = value.name;

		if (reason === 'selectOption') {
			// props.onChange(stateName);
			setData({
				...data,
				city: '',
			});
		}

		// set cities for the selected state
		let stateCities = usaCities.filter((c) => c.state === stateName);
		stateCities = stateCities.map((c) => c.city);
		// add empty option to remove warning
		stateCities.unshift('');

		setData({
			...data,
			city: '',
			state: stateName,
		});
		setStateCities(stateCities);
	}

	const useStyles = makeStyles((theme) => ({
		modal: {
			overflowY: 'auto',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				height: 'auto',
			},
		},
	}));

	const classes = useStyles();

	const handleChange = (e) => {
		console.log('handle change called', e);
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		console.log('data change triggered');
		console.log('data', data);
	}, [data]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		var value = e.target.value;
		var streetAddRegEx = RegExp(/\d{1,}((\s{1}\w{1,})(\s{1}?\w{1,})+)/g);
		if (streetAddRegEx.test(value)) {
			setErrors({ ...errors, streetAddress: false });
		} else {
			setErrors({ ...errors, streetAddress: true });
		}
		if (!Object.keys(errors).find((i) => errors[i] === true)) {
			console.log('no Errors');
			// setLoading(true);
			// e.preventDefault();
			// data.images = images;
			// await dispatch(NewProperty(title, data, images));
			// setLoading(false);
			// handleClose();
		} else {
			console.log('errors', errors);
		}
	};

	useEffect(() => {
		// setData({
		// 	...data,
		// 	images: data?.images,
		// });
		setImages([]);
		setEditAble(title === 'Info' ? true : false);
		const oldImages = data?.images;
		if (oldImages) {
			setImages([...oldImages]);
		}
		console.log(data?.images);
		console.log('open...');
		//eslint-disable-next-line
	}, [open]);

	const removeImage = (imageToRemove) => {
		const filteredImages = images.filter((i) => i !== imageToRemove);
		setImages(filteredImages);
	};

	return (
		<Modal
			open={open}
			onClose={() => {
				onClose();
				setEditAble(true);
			}}
		>
			<Box sx={modalBoxStyles}>
				<Paper sx={{ p: 4 }}>
					<Box component={'form'} onSubmit={handleSubmit}>
						<Box display='flex' justifyContent='space-between'>
							<Typography
								variant='h5'
								component='h2'
								fontWeight='bold'
							>
								{title} a Property
							</Typography>
							<div onClick={onClose}>
								<Close style={{ cursor: 'pointer' }} />
							</div>
						</Box>
						<Box sx={{ mt: 2 }} key={editAble}>
							<Grid container spacing={2}>
								<Grid item md={6}>
									<TextField
										// InputProps={{
										// 	readOnly: editAble,
										// }}
										placeholder='Add Property Nickname'
										variant='outlined'
										fullWidth
										name='propertyName'
										onChange={handleChange}
										style={{ marginBottom: 16 }}
										value={data?.propertyName}
										required
									/>
									<Grid container spacing={2}>
										<Grid item md={12}>
											<SuiInput
												name='livingSquaredFootage'
												// InputProps={{
												// 	readOnly: editAble,
												// }}
												onChange={handleChange}
												placeholder='Living Squared Footage'
												variant='outlined'
												fullWidth
												value={
													data?.livingSquaredFootage
												}
												required
												type='number'
												style={{ marginBottom: 16 }}
											/>
										</Grid>
										<Grid item md={12}>
											<SuiInput
												name='propertySquareFootage'
												onChange={handleChange}
												InputProps={{
													readOnly: editAble,
												}}
												placeholder='Property Square Footage'
												variant='outlined'
												fullWidth
												value={
													data?.propertySquareFootage
												}
												style={{ marginBottom: 16 }}
												required
												type='number'
											/>
										</Grid>
										<Grid item md={8}>
											<TextField
												name='streetAddress'
												InputProps={{
													readOnly: editAble,
												}}
												onChange={handleChange}
												placeholder='Street Address'
												variant='outlined'
												fullWidth
												error={errors?.streetAddress}
												helperText={
													errors?.streetAddress &&
													'Please enter a valid Street Address'
												}
												value={data?.streetAddress}
												required
											/>
										</Grid>
										<Grid item md={4}>
											<SuiInput
												name='units'
												InputProps={{
													readOnly: editAble,
												}}
												onChange={handleChange}
												placeholder='Units'
												type='number'
												variant='outlined'
												fullWidth
												value={data?.units}
												required
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item md={6}>
									<UploadImages
										disabled={editAble}
										onUpload={(uploads) =>
											setImages((prevImages) =>
												prevImages.concat(uploads)
											)
										}
										origin='imgBB'
										removeImage={removeImage}
										previewImages={images}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={2} mt={1}>
								<Grid item xs={12} md={4}>
									<Autocomplete
										getOptionLabel={(option) =>
											typeof option === 'string'
												? option
												: option.name
										}
										options={usaStates}
										id='state-autocomplete'
										onChange={handleStateChange}
										style={{
											marginBottom: 16,
										}}
										value={data?.state}
										disabled={editAble}
										renderInput={(params) => {
											return (
												<TextField
													{...params}
													placeholder='State'
													variant='outlined'
													value={data?.state}
													required
													aria-controls='state-autocomplete-popup'
												/>
											);
										}}
									/>
									<Autocomplete
										style={{ marginBottom: 16 }}
										id='propertyType-autocomplete'
										options={[
											'Single Family Home',
											'Apartment Complex',
											'Townhouse',
											'Apartment',
											'Duplex',
											'Condo',
											'Other',
										]}
										getOptionLabel={(propertyType) =>
											`${propertyType}`
										}
										onChange={(e, propertyType, reason) =>
											reason === 'selectOption'
												? setData({
														...data,
														propertyType,
												  })
												: setData({
														...data,
														propertyType: '',
												  })
										}
										value={data?.propertyType}
										disabled={editAble}
										// disabled={stateCities.length === 0}
										renderInput={(params) => {
											// const param = {
											// 	...params,
											// 	inputProps: {
											// 		...params.inputProps,
											// 		value: data.propertyType,
											// 	},
											// };
											return (
												<TextField
													{...params}
													value={data?.propertyType}
													placeholder='Property Type'
													variant='outlined'
													required
												/>
											);
										}}
									/>
									<Autocomplete
										style={{ marginBottom: 16 }}
										id='occupancy-autocomplete'
										options={['Occupied', 'Vacant']}
										getOptionLabel={(occupancy) =>
											`${occupancy}`
										}
										disabled={editAble}
										onChange={(e, occupancy, reason) =>
											reason === 'selectOption'
												? setData({
														...data,
														occupancy,
												  })
												: setData({
														...data,
														occupancy: '',
												  })
										}
										value={data?.occupancy}
										// disabled={stateCities.length === 0}
										renderInput={(params) => {
											// const param = {
											// 	...params,
											// 	inputProps: {
											// 		...params.inputProps,
											// 		value: data.occupancy,
											// 	},
											// };
											return (
												<TextField
													{...params}
													value={data?.occupancy}
													placeholder='Occupancy'
													variant='outlined'
													required
												/>
											);
										}}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									{' '}
									<Autocomplete
										style={{ marginBottom: 16 }}
										id='city-autocomplete'
										options={stateCities}
										getOptionLabel={(city) => `${city}`}
										onChange={handleCityChange}
										disabled={
											stateCities.length === 0 || editAble
										}
										value={data?.city}
										renderInput={(params) => {
											// const param = {
											// 	...params,
											// 	inputProps: {
											// 		...params.inputProps,
											// 		value: data.city,
											// 	},
											// };

											return (
												<TextField
													{...params}
													value={data?.city}
													placeholder='City'
													variant='outlined'
													required={
														!stateCities.length ===
														0
													}
												/>
											);
										}}
									/>
									<Autocomplete
										style={{ marginBottom: 16 }}
										id='bedrooms-autocomplete'
										options={Array.from(
											{ length: 20 },
											(v, i) => i + 1
										)}
										disabled={editAble}
										getOptionLabel={(bedrooms) =>
											`${bedrooms}`
										}
										value={data?.bedrooms}
										onChange={(e, bedrooms, reason) =>
											reason === 'selectOption'
												? setData({
														...data,
														bedrooms,
												  })
												: setData({
														...data,
														bedrooms: '',
												  })
										}
										// disabled={stateCities.length === 0}
										renderInput={(params) => {
											// const param = {
											// 	...params,
											// 	inputProps: {
											// 		...params.inputProps,
											// 		value: data.bedrooms,
											// 	},
											// };
											return (
												<TextField
													{...params}
													value={data?.bedrooms}
													placeholder='Bedrooms'
													variant='outlined'
													required
												/>
											);
										}}
									/>
									<LocalizationProvider
										dateAdapter={AdapterDateFns}
									>
										<DatePicker
											placeholder='Acquired Date'
											InputProps={{
												readOnly: editAble,
											}}
											onChange={(value) => {
												setData({
													...data,
													acquiredDate: String(value),
												});
											}}
											disabled={editAble}
											value={data?.acquiredDate}
											renderInput={(params) => (
												<TextField
													fullWidth
													{...params}
													required
												/>
											)}
											style={{ marginBottom: 16 }}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										name='zip'
										onChange={handleChange}
										placeholder='Zip'
										InputProps={{
											readOnly: editAble,
										}}
										variant='outlined'
										fullWidth
										style={{ marginBottom: 16 }}
										value={data?.zip}
										required
									/>
									<Autocomplete
										style={{ marginBottom: 16 }}
										id='bathrooms-autocomplete'
										InputProps={{
											readOnly: editAble,
										}}
										options={Array.from(
											{ length: 20 },
											(v, i) => i + 1
										)}
										getOptionLabel={(bathrooms) =>
											`${bathrooms}`
										}
										value={data?.bathrooms}
										onChange={(e, bathrooms, reason) =>
											reason === 'selectOption'
												? setData({
														...data,
														bathrooms,
												  })
												: setData({
														...data,
														bathrooms: '',
												  })
										}
										disabled={editAble}
										renderInput={(params) => {
											// const param = {
											// 	...params,
											// 	inputProps: {
											// 		...params.inputProps,
											// 		value: data.bathrooms,
											// 	},
											// };
											return (
												<TextField
													{...params}
													value={data?.bathrooms}
													placeholder='Bathrooms'
													variant='outlined'
												/>
											);
										}}
									/>
									<SuiInput
										name='lastRentAmount'
										onChange={handleChange}
										placeholder='Last Rent Amount'
										variant='outlined'
										fullWidth
										// style={{ marginBottom: 16 }}
										value={data?.lastRentAmount}
										type='number'
										icon={{
											component: <AttachMoneyIcon />,
											direction: 'left',
										}}
										InputProps={{
											readOnly: editAble,
										}}
										required
									/>
								</Grid>
							</Grid>
						</Box>

						{/* {title !== 'Info' ? (
					<Button
						variant='contained'
						style={{
							marginBottom: 16,
							paddingLeft: 16,
							paddingRight: 16,
							minWidth: 160,
							textAlign: 'center',
						}}
						onClick={handleSubmit}
						// disabled={Object.values(data).length <= 11}
					>
						Save
					</Button>
				) : null} */}

						{editAble && title === 'Info' ? (
							<Button
								variant='contained'
								color='warning'
								style={{
									marginBottom: 16,
									paddingLeft: 16,
									paddingRight: 16,
									minWidth: 160,
									textAlign: 'center',
								}}
								onClick={() => setEditAble(false)}
								type='button'

								// disabled={Object.values(data).length <= 11}
							>
								Edit
							</Button>
						) : (
							<LoadingButton
								variant='contained'
								style={{
									marginBottom: 16,
									paddingLeft: 16,
									paddingRight: 16,
									minWidth: 160,
									textAlign: 'center',
								}}
								type='submit'

								// onClick={handleSubmit}
								// disabled={Object.values(data).length <= 11}
							>
								Save
							</LoadingButton>
						)}
					</Box>
					{title === 'Add' && (
						<Typography
							variant='body1'
							fontSize={16}
							textAlign={'justify'}
						>
							The above is the bare minimum information required
							to Add a Property on digpads. Adding the below
							information will help you better manage your rental
							properties on the digpads platform, but it is
							optional and may be added later if desired as well.
						</Typography>
					)}
				</Paper>
			</Box>
		</Modal>
	);
};

export default AddModal;
