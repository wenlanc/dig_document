import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Paper,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { Close } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {
	NewProperty,
	DeleteProperty,
} from 'store/actions/Property/propertiesAction';
import { useDispatch } from 'react-redux';

import { modalBoxStyles } from 'components/styled/Modal';
import SuiInput from 'components/SuiInput';
import { LandlordButton, LandlordLoading } from 'components/styled/Button';
import { nwc, nwoc } from 'utils/NumberUtils';
import usaStates from 'constants/usaStates';
import usaCities from 'constants/usaCities';
import CustomLabel from './Utils/DateLabel';
import UploadImages from '../../../Views/posts/UploadImages';

const PREFIX = 'AddPropertyModal';

const classes = {
	modal: `${PREFIX}-modal`,
};
const filter = createFilterOptions();

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

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
}));

const AddPropertyModal = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
}) => {
	const [data, setData] = useState({});
	const [errors, setErrors] = useState({});
	const [images, setImages] = useState([]);
	const [stateCities, setStateCities] = useState([]);
	const [deleteModal, setDeleteModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formSubmit, setFormSubmit] = useState(false);
	const dispatch = useDispatch();

	// let data,
	// 	setData = {};

	// if (title === 'Add') {
	// 	data = cData;
	// 	setData = setCData;
	// } else {
	// 	data = propData;
	// 	setData = setPropData;
	// }

	useEffect(() => {
		setData(propData);
	}, [propData]);

	useEffect(() => {
		if (open && propData?.images?.length > 0) setImages([...propData?.images]);
		else setImages([]);
		setFormSubmit(false);
	}, [open]);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		console.log('submitting form');
		let _errors = {};
		e.preventDefault();
		// return;
		var streetAddRegEx = RegExp(/\d{1,}((\s{1}\w{1,})(\s{1}?\w{1,})+)/g);
		var zipRegEx = RegExp(/^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/);

		if (streetAddRegEx.test(data?.streetAddress)) {
			_errors = { ...errors, streetAddress: false };
			setErrors(_errors);
		} else {
			_errors = { ...errors, streetAddress: true };
			setErrors(_errors);
		}

		if (zipRegEx.test(data?.zip)) {
			_errors = { ..._errors, zip: false };
			setErrors(_errors);
		} else {
			_errors = { ..._errors, zip: true };
			setErrors(_errors);
		}

		if (!Object.keys(_errors).find((i) => _errors[i] === true)) {
			const _data = {
				...data,

				images,
				livingSquaredFootage: nwc(data?.livingSquaredFootage),
				propertySquareFootage: nwc(data?.propertySquareFootage),
				amount: nwoc(data?.lastRentAmount),
			};
			await dispatch(NewProperty(title, _data, images));

			console.log('submitted succesfully');
			setLoading(false);
			handleClose();
		} else {
			setLoading(false);
			console.log('some error', _errors);
			setFormSubmit(false);
		}
	};

	const handleDelete = async () => {
		setLoading(true);
		await dispatch(DeleteProperty(data));
		setLoading(false);
		setDeleteModal(false);
		handleClose();
	};

	const handleCityChange = (e, city, reason) => {
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
	};

	const handleStateChange = (e, value, reason) => {
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
	};

	const removeImage = (imageToRemove) => {
		console.log(imageToRemove);
		const filteredImages = images.filter((i) => i !== imageToRemove);
		setImages(filteredImages);
	};

	return (
		<Root>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						overflowY: 'auto',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						display: 'grid',
						overflowX: 'hidden',
						width: 900,
					}}
				>
					<Paper sx={{ p: 4 }}>
						<Box component={'form'} onSubmit={handleSubmit}>
							<Box display='flex' justifyContent='space-between'>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title} a Property
								</Typography>
								<div onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</div>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={12}>
										<Box
											display={'flex'}
											alignItems={'center'}
											justifyContent={'space-between'}
											columnGap={3}
										>
											<Box
												width={'75%'}
												gap={2}
												justifyContent={'center'}
												alignItems={'flex-start'}
												flexDirection={'column'}
												display={'flex'}
											>
												<StyledBox>
													<TextField
														required
														name='propertyName'
														value={data?.propertyName}
														onChange={handleChange}
														placeholder='Property Name'
														variant='outlined'
														fullWidth
													/>
													{data?.propertyName && (
														<CustomLabel label={'Property Name'} />
													)}
												</StyledBox>
												<StyledBox>
													<SuiInput
														name='livingSquaredFootage'
														onChange={handleChange}
														placeholder='Living Squared Footage'
														variant='outlined'
														fullWidth
														value={nwc(data?.livingSquaredFootage)}
														required
													/>
													{data?.livingSquaredFootage && (
														<CustomLabel label={'Living Squared Footage'} />
													)}
												</StyledBox>

												<StyledBox>
													<SuiInput
														name='propertySquareFootage'
														onChange={handleChange}
														placeholder='Property Square Footage'
														variant='outlined'
														fullWidth
														value={nwc(data?.propertySquareFootage)}
														required
													/>
													{data?.propertySquareFootage && (
														<CustomLabel label={'Property Square Footage'} />
													)}
												</StyledBox>

												<Box display={'flex'} columnGap={2} width={'100%'}>
													<StyledBox>
														<Autocomplete
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
															renderInput={(params) => {
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
														{data?.propertyType && (
															<CustomLabel label={'Property Type'} />
														)}
													</StyledBox>
													<StyledBox>
														<SuiInput
															fullWidth
															name='units'
															value={data?.units}
															onChange={handleChange}
															placeholder='Units'
															variant='outlined'
															required
															type={'number'}
														/>
														{data?.units && <CustomLabel label={'Units'} />}
													</StyledBox>
												</Box>
												<Box display={'flex'} columnGap={2}>
													<StyledBox>
														<Autocomplete
															id='bedrooms-autocomplete'
															options={Array.from(
																{ length: 20 },
																(v, i) => i + 1
															)}
															getOptionLabel={(bedrooms) => `${bedrooms}`}
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
															renderInput={(params) => {
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
														{data?.bedrooms && (
															<CustomLabel label={'Bedrooms'} />
														)}
													</StyledBox>
													<StyledBox>
														<Autocomplete
															id='bathrooms-autocomplete'
															options={Array.from(
																{ length: 20 },
																(v, i) => i + 1
															)}
															getOptionLabel={(bathrooms) => `${bathrooms}`}
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
															renderInput={(params) => {
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
														{data?.bathrooms && (
															<CustomLabel label={'Bathrooms'} />
														)}
													</StyledBox>
												</Box>
												<Box display={'flex'} columnGap={2}>
													<StyledBox>
														<TextField
															name='streetAddress'
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
														{data?.streetAddress && (
															<CustomLabel label={'Bathrooms'} />
														)}
													</StyledBox>
													<StyledBox>
														<TextField
															required
															name='zip'
															value={data?.zip}
															error={errors?.zip}
															helperText={
																errors?.zip && 'Please enter a valid Zip Code'
															}
															onChange={handleChange}
															placeholder='Zip'
															variant='outlined'
															fullWidth
														/>
														{data?.zip && <CustomLabel label={'Bathrooms'} />}
													</StyledBox>
												</Box>
												{/* <Box
													display={'flex'}
													columnGap={2}
												>
													
													
												</Box> */}
											</Box>
											<Box
												width={'100%'}
												justifyContent={'center'}
												alignItems={'flex-start'}
											>
												<UploadImages
													onUpload={(uploads) =>
														setImages((prevImages) =>
															prevImages.concat(uploads)
														)
													}
													origin='imgBB'
													removeImage={removeImage}
													previewImages={images}
												/>
											</Box>
										</Box>
									</Grid>
									<Grid item xs={12} md={4}>
										<Autocomplete
											placeholder='State'
											id='state-autocomplete'
											options={usaStates}
											getOptionLabel={(option) =>
												typeof option === 'string' ? option : option.name
											}
											onChange={handleStateChange}
											value={data?.state}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.state}
														placeholder='State'
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.state && <CustomLabel label={'State'} />}
									</Grid>
									<Grid item xs={12} md={4}>
										<Autocomplete
											placeholder='City'
											id='city-autocomplete'
											options={stateCities}
											getOptionLabel={(option) =>
												typeof option === 'string' ? option : option.name
											}
											onChange={handleCityChange}
											value={data?.city}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.city}
														placeholder='City'
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.city && <CustomLabel label={'City'} />}
									</Grid>
									<Grid item md={4}>
										<Autocomplete
											id='occupancy-autocomplete'
											options={['Occupied', 'Vacant']}
											getOptionLabel={(occupancy) => `${occupancy}`}
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
											renderInput={(params) => {
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
										{data?.occupancy && <CustomLabel label={'Occupancy'} />}
									</Grid>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Acquired Date'
												onChange={(value) => {
													setData({
														...data,
														acquiredDate: String(value),
													});
												}}
												value={data?.acquiredDate}
												renderInput={(params) => (
													<TextField fullWidth {...params} required />
												)}
											/>
										</LocalizationProvider>
										<CustomLabel label={'Acquired Date'} />
									</Grid>
									<Grid item xs={12} md={4}>
										<SuiInput
											// type={'number'}
											value={nwc(data?.lastRentAmount)}
											name={'lastRentAmount'}
											onChange={handleChange}
											placeholder='Last Rent Amount'
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											required
										/>
										{data?.lastRentAmount && (
											<CustomLabel label={'Last Rent Amount'} />
										)}
									</Grid>
									<Grid item md={12} justifyContent={'flex-start'}>
										<LandlordButton
											key={'submit_key'}
											variant={'contained'}
											size={'medium'}
											color={'success'}
											type={'submit'}
											onClick={() => setFormSubmit(true)}
											sx={{
												minWidth: 160,
												my: 2,
											}}
											disabled={loading}
										>
											{loading ? <LandlordLoading /> : 'Save'}
										</LandlordButton>
										{/* {title === 'Edit' ? (
											<LandlordButton
												variant={'contained'}
												size={'medium'}
												color={'error'}
												onClick={() =>
													setFormSubmit(true)
												}
												sx={{
													minWidth: 160,
													my: 2,
													mx: 5,
												}}
												disabled={loading}
											>
												{loading ? (
													<LandlordLoading />
												) : (
													'Delete'
												)}
											</LandlordButton>
										) : null} */}
									</Grid>
								</Grid>
							</Box>
						</Box>
						{title === 'Add' && (
							<Typography variant='body1' fontSize={16} textAlign={'justify'}>
								The above is the bare minimum information required to Add a
								Property on digpads. Adding the below information will help you
								better manage your rental properties on the digpads platform,
								but it is optional and may be added later if desired as well.
							</Typography>
						)}
					</Paper>
				</Box>
			</Modal>

			<Dialog
				open={deleteModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Remove Utility'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Please confirm removal of this Utility item. You acknowledge and
						understandthat once deleted, the data tied to this item will be gone
						forever.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordButton
						onClick={() => setDeleteModal(false)}
						variant={'contained'}
						size={'medium'}
						color={'primary'}
					>
						{loading ? <LandlordLoading /> : 'Close'}
					</LandlordButton>
					<LandlordButton
						onClick={handleDelete}
						variant={'contained'}
						size={'medium'}
						color={'error'}
						autoFocus
					>
						{loading ? <LandlordLoading /> : 'Confirm'}
					</LandlordButton>
				</DialogActions>
			</Dialog>
		</Root>
	);
};

export default AddPropertyModal;
