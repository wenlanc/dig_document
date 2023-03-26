import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import timezones from 'constants/timezones';
import UserTypeSetting from 'components/Settings/Profile/UserTypeSetting';
import PasswordValidator from 'components/Auth/PasswordValidator';
import CurrentTime from 'components/Settings/CurrentTime';
import { claimUnclaimedProfile } from 'controllers/marketplaceProfile';
import {
	TextField,
	Typography,
	Grid,
	Radio,
	RadioGroup,
	CircularProgress,
	Checkbox,
	FormControlLabel,
	FormLabel,
	Container,
	FormControl,
	Autocomplete,
	Snackbar,
	Alert,
	AlertColor,
} from '@mui/material';
import { UserType } from 'types';

import {
	StyledButton,
	StyledForm,
	StyledHeading,
	StyledFormControlLabel,
} from 'components/styled/FormStyle';

import { ArrowForward } from '@mui/icons-material';
import Header from 'components/Nav/Header';
import Footer from 'components/Footer';

export default function ClaimProfile() {
	const { profileId } = useParams();
	const [passwordValidity, setPasswordValidity] = useState({
		minChar: null,
		number: null,
	});
	const [alert, setAlert] = useState({
		severity: 'success',
		message: '',
		open: false,
	});
	const { register, errors, handleSubmit, watch, setError } = useForm({
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});
	const [accountType, setAccountType] = useState('individual');
	const [userType, setUserType] = useState<UserType>('landlord');
	const [timezone, setTimezone] = useState({
		offset: -5,
		name: 'Eastern Standard Time (UTC -5)',
		short: 'EST',
	});

	const onChangePassword = (password) => {
		setPasswordValidity({
			minChar: password.length >= 8 ? true : false,
			number: /\d/.test(password) ? true : false,
		});
	};

	const onSubmit = async (data) => {
		const populatedData = { ...data, timezone, userType, accountType };
		const success = await claimUnclaimedProfile(populatedData, profileId);

		let severity = 'success';
		let message = 'You have successfully claim this profile';

		if (!success) {
			severity = 'error';
			message = 'Oops, something went wrong. Please try again later';
		}

		setAlert({
			severity: severity,
			message: message,
			open: true,
		});
	};

	const onError = (errors) => {
		console.log(errors);
	};

	return (
		<div>
			<Header />

			<Typography paragraph align='center' color='text.secondary'>
				digpads has assigned the following profile to you. Please fill in the
				form below to claim it
			</Typography>

			<Container maxWidth={false} sx={{ mb: 2, pt: '3em', maxWidth: '720px' }}>
				<StyledHeading component='h1' variant='h5'>
					Claim profile
				</StyledHeading>

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
								onChange={(e, timezone, reason) => {
									if (typeof timezone !== 'string') {
										if (reason === 'selectOption') {
											setTimezone(timezone);
										}
									}
								}}
								value={timezone}
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
							<CurrentTime timezone={timezone} />
						</Grid>

						<Grid item xs={12} style={{ display: 'flex', marginTop: '10px' }}>
							<UserTypeSetting
								currentUserType={userType}
								onChange={(type) => setUserType(type)}
							/>
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
							<StyledButton
								variant='contained'
								color='primary'
								type='submit'
								sign='sign'
							>
								Sign Up
								<ArrowForward />
							</StyledButton>
						</Grid>
					</Grid>
				</StyledForm>
			</Container>

			<Footer />

			<Snackbar
				open={alert.open}
				autoHideDuration={6000}
				onClose={() => setAlert({ ...alert, open: false })}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					severity={alert.severity as AlertColor}
					elevation={6}
					variant='filled'
					onClose={() => setAlert({ ...alert, open: false })}
				>
					<Typography>{alert.message}</Typography>
				</Alert>
			</Snackbar>
		</div>
	);
}
