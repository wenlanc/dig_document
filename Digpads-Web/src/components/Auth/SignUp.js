import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { instance, getCSRF } from 'controllers/axios';
import { useForm } from 'react-hook-form';
import { getDateWithUTCOffset, getOffsets } from 'utils/TimeUtils';
import useMarketplaceProfileName from 'hooks/useMarketplaceProfileName';

import {
	TextField,
	Grid,
	Link,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	Radio,
	FormControl,
	FormLabel,
	RadioGroup,
	Autocomplete,
	Box,
} from '@mui/material';
import { PersonAdd, ArrowForward } from '@mui/icons-material';

import {
	StyledAvatar,
	StyledButton,
	StyledForm,
	StyledAlert,
	StyledDiv,
	StyledUl,
	StyledList,
	StyledHeading,
	StyledOption,
	StyledFormControlLabel,
	SyledRegisterContainer,
} from 'components/styled/FormStyle';
import PasswordValidator from './PasswordValidator';

const isNumber = /\d/;

export default function SignUp(props) {
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [passwordValidity, setPasswordValidity] = useState({
		minChar: null,
		number: null,
	});

	const onChangePassword = (password) => {
		setPasswordValidity({
			minChar: password.length >= 8 ? true : false,
			number: isNumber.test(password) ? true : false,
		});
	};

	const { register, errors, handleSubmit, watch, setError } = useForm({
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});

	const [errorBody, setBody] = useState('');
	const [progressBar, setProgressBar] = useState(false);

	const [userType, setUserType] = useState('landlord');
	const [accountType, setAccountType] = useState('individual');

	const [timezone, setTimezone] = useState({
		offset: -5,
		name: 'Eastern Standard Time (UTC -5)',
		short: 'EST',
	});

	const onSubmit = (data) => {
		const populatedData = { ...data, timezone: timezone };
		signUp({
			...data,
			accountType: accountType,
			type: userType,
		});
	};
	const onError = (errors) => {
		console.log(errors);
	};

	async function signUp(data) {
		try {
			await getCSRF();
			setProgressBar(true);
			delete data.conf;
			let res = await instance.post(`signUp`, data, {
				responseType: 'json',
			});
			console.log(res.status);
			if (res.status === 200) {
				props.onSignup('Please check your email to verify your account');
				setProgressBar(false);
			}
			setBody(
				<StyledAlert variant='filled' severity='success'>
					A confirmation email as been sent to your email. Please verify
					yourself.
				</StyledAlert>
			);
		} catch (e) {
			setProgressBar(false);
			if (!e.response) {
				setBody(
					<StyledAlert variant='filled' severity='error'>
						Uh oh something broke, we're working on fixing it. Please try again
						in 5 minutes
					</StyledAlert>
				);
				// setOpen(true);
				return;
			}
			let err;
			if (e.response.data) {
				err = e.response.data.error;
			} else {
				err = 'Unknown';
			}
			switch (err) {
				case 'not verified':
					setBody(
						<StyledAlert variant='filled' severity='error'>
							You already have an account. Please verify your email or click
							here to recieve another link
						</StyledAlert>
					);
					break;
				case 'email used':
					setError('email', {
						type: 'manual',
						message: 'You already have an account. Please log in',
					});
					break;
				default:
					setBody(
						<StyledAlert variant='filled' severity='error'>
							Some error occured!
						</StyledAlert>
					);
					break;
			}
			return data;
		}
	}

	const { nameExists, onChange: onMarketplaceProfileNameChange } =
		useMarketplaceProfileName();

	const handleMarketplaceProfileNameChange = (evt) => {
		const marketplaceProfileName = evt.target.value;
		onMarketplaceProfileNameChange(marketplaceProfileName);
	};

	if (userType !== 'tenant' && nameExists) {
		errors.profile_name = {
			message: 'This name is already taken. Please choose a different name',
		};
	}

	const timezones = [
		{
			offset: -10,
			name: 'Hawaii Standard Time (UTC -10)',
			short: 'HST',
		},
		{
			offset: -9,
			name: 'Alaska Standard Time (UTC -9)',
			short: 'AKST',
		},
		{
			offset: -8,
			name: 'Pacific Standard Time (UTC -8)',
			short: 'PST',
		},
		{
			offset: -7,
			name: 'Mountain Standard Time (UTC -7)',
			short: 'MST',
		},
		{
			offset: -6,
			name: 'Central Standard Time (UTC -6)',
			short: 'CST',
		},
		{
			offset: -5,
			name: 'Eastern Standard Time (UTC -5)',
			short: 'EST',
		},
	];

	const [currentTime, setCurrentTime] = useState(null);
	useEffect(() => {
		let interval;
		// const _allOffsets = await getOffsets();
		getOffsets().then((_allOffsets) => {
			interval = setInterval(async () => {
				const timeNow = await getDateWithUTCOffset(timezone, _allOffsets).then(
					(t) => t.toLocaleTimeString()
				);
				setCurrentTime(timeNow || 'Please select a Time Zone');
			}, 1000);
		});
		return () => clearInterval(interval);
	}, [timezone]);

	return (
		<SyledRegisterContainer maxWidth='xs' sx={{ mb: 2 }}>
			<Box
				sx={{
					paddingTop: {
						md: 25,
						lg: 18,
					},
				}}
			>
				<StyledAvatar>
					<PersonAdd />
				</StyledAvatar>
			</Box>
			<StyledHeading component='h1' variant='h5'>
				Join digpads{' '}
			</StyledHeading>
			<StyledOption component='h6'>
				Already have an account?{' '}
				<Link component='button' onClick={() => props.setAuthPage('Login')}>
					Log in
				</Link>
			</StyledOption>
			<div>{errorBody}</div>
			<StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
				<Grid container spacing={2} rowSpacing={1}>
					<Grid item sm={6} xs={12}>
						<TextField
							label='First name'
							name='first'
							variant='outlined'
							error={errors.first ? true : false}
							helperText={errors.first ? errors.first.message || '' : ''}
							inputRef={register({
								required: 'This field is required',
							})}
							fullWidth
							size='small'
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						<TextField
							label='Last Name'
							name='last'
							error={errors.last ? true : false}
							variant='outlined'
							helperText={errors.last ? errors.last.message || '' : ''}
							inputRef={register({
								required: 'This field is required',
							})}
							fullWidth
							size='small'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label='Username'
							name='username'
							variant='outlined'
							fullWidth
							inputRef={register({
								required: false,
							})}
							helperText='Username displayed when posting or commenting in the forum'
							size='small'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label='Email'
							name='email'
							type='email'
							inputRef={register({
								required: 'This field is required',
								pattern: {
									value:
										/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									message: 'Invalid email address',
								},
							})}
							fullWidth
							error={errors.email ? true : false}
							helperText={errors.email ? errors.email.message || '' : ''}
							variant='outlined'
							size='small'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label='Password'
							name='psw'
							inputRef={register({
								required: 'You must specify a password',
								minLength: {
									value: 8,
									message: 'Password must have at least 8 characters',
								},
							})}
							fullWidth
							error={errors.psw ? true : false}
							helperText={errors.psw ? errors.psw.message || '' : ''}
							variant='outlined'
							size='small'
							type='password'
							onFocus={() => setPasswordFocused(true)}
							onChange={(e) => onChangePassword(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							label='Confirm Password'
							name='conf'
							inputRef={register({
								required: 'Please confirm your password',
								validate: (value) =>
									value === watch('psw') || 'Passwords do not match',
							})}
							fullWidth
							error={errors.conf ? true : false}
							helperText={errors.conf ? errors.conf.message || '' : ''}
							variant='outlined'
							size='small'
							type='password'
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* {passwordFocused && ( */}
						<PasswordValidator validity={passwordValidity} />
						{/* )} */}
					</Grid>
					<Grid item xs={12} md={6}>
						<Autocomplete
							placeholder='Timezone'
							id='timezone-autocomplete'
							options={timezones}
							getOptionLabel={(timezone) => `${timezone.name}`}
							onChange={(e, timezone, reason) =>
								reason === 'selectOption'
									? setTimezone(timezone)
									: setTimezone({})
							}
							value={timezone}
							// disabled={stateCities.length === 0}
							renderInput={(params) => {
								const param = {
									...params,
									inputProps: {
										...params.inputProps,
										value: timezone?.name,
									},
								};

								return (
									<TextField
										sx={{
											marginTop: '15px',
										}}
										{...param}
										variant='outlined'
										required
										size='small'
									/>
								);
							}}
						/>
						<small>
							{currentTime === 'Invalid Date'
								? 'Select a Timezone'
								: `Current Time: ${currentTime}`}
						</small>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label='Marketplace profile name'
							name='profile_name'
							inputRef={register({
								required: 'Please enter your marketplace profile name',
							})}
							fullWidth
							error={errors.profile_name ? true : false}
							helperText={
								errors.profile_name?.message ||
								'Name is permanent. You cannot change it afterwards'
							}
							onChange={handleMarketplaceProfileNameChange}
							variant='outlined'
							size='small'
							type='text'
						/>
					</Grid>

					<Grid item xs={12} style={{ display: 'flex', marginTop: '10px' }}>
						<FormControl component='fieldset'>
							<FormLabel component='legend' style={{ textAlign: 'start' }}>
								I am a ...
							</FormLabel>
							<RadioGroup
								row
								name='row-radio-buttons-group'
								value={userType}
								onChange={(event) => setUserType(event.target.value)}
								defaultValue='landlord'
							>
								<FormControlLabel
									value='landlord'
									control={<Radio />}
									label='Landlord'
								/>
								<FormControlLabel
									value='tenant'
									control={<Radio />}
									label='Tenant'
								/>
								<FormControlLabel
									value='contractor'
									control={<Radio />}
									label='Contractor'
								/>
								<FormControlLabel
									value='landlordAndContractor'
									control={<Radio />}
									label='Landlord & Contractor'
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					{/* Type of account */}
					{!(userType === 'tenant') && (
						<Grid item xs={12} style={{ display: 'flex', marginTop: '6px' }}>
							<FormControl component='fieldset'>
								<FormLabel component='legend'>
									I want to represent my account as a
								</FormLabel>
								<RadioGroup
									row
									name='row-radio-buttons-group'
									value={accountType}
									onChange={(event) => setAccountType(event.target.value)}
									defaultValue='individual'
								>
									<FormControlLabel
										value='individual'
										control={<Radio />}
										label='Individual'
									/>
									<FormControlLabel
										value='company'
										control={<Radio />}
										label='Company'
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
					)}

					{accountType === 'company' && userType != 'tenant' && (
						<Grid
							item
							xs={12}
							style={{ marginTop: '5px', marginBottom: '5px' }}
						>
							<TextField
								label='Company Name'
								name='companyName'
								variant='outlined'
								fullWidth
								inputRef={register({
									required: true,
								})}
								size='small'
							/>
						</Grid>
					)}

					<Grid item xs={12} md={12}>
						<StyledFormControlLabel
							label={
								<p
									className='tos-text'
									style={{
										textAlign: 'left',
										fontSize: '0.875rem',
										margin: '0',
										color: 'black',
									}}
								>
									I agree to the
									<RouterLink to='/termsOfService' target='_blank'>
										{' Terms of Service '}
									</RouterLink>
									and
									<RouterLink to='privacypolicy' target='_blank'>
										{' Privacy Policy. '}
									</RouterLink>
								</p>
							}
							control={
								<Checkbox
									style={{}}
									name='terms-check'
									required
									inputProps={{
										'aria-label': 'agree checkbox',
									}}
								/>
							}
						/>
					</Grid>
					<Grid item xs={12}>
						{!progressBar ? (
							<StyledButton
								variant='contained'
								color='primary'
								type='submit'
								sign='sign'
							>
								Sign Up
								<ArrowForward />
							</StyledButton>
						) : (
							<CircularProgress />
						)}
					</Grid>
				</Grid>
			</StyledForm>
		</SyledRegisterContainer>
	);
}
