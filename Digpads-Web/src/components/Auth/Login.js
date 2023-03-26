import React, { useState, useContext } from 'react';
import { instance, getCSRF } from '../../controllers/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';
import styled from 'styled-components';

import {
	Grid,
	Typography,
	Link,
	Checkbox,
	CircularProgress,
} from '@mui/material';
import { LockOpen, ArrowForward } from '@mui/icons-material';
import {
	StyledButton,
	StyledAvatar,
	StyledContainer,
	StyledForm,
	StyledField,
	StyledAlert,
	StyledHeading,
	StyledOption,
	StyledFormControlLabel,
} from '../styled/FormStyle';

function Login(props) {
	const navigate = useNavigate();
	const { setAuthData } = useContext(authContext);
	const { redirectURL } = props;

	const { register, errors, handleSubmit } = useForm({
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});

	const [errorBody, setBody] = useState('');
	const [progressBar, setProgressBar] = useState(false);
	const onSubmit = (data) => login(data);
	const onError = (errors) => {
		console.log(errors);
	};

	async function login(data) {
		await getCSRF();
		try {
			setProgressBar(true);
			if (data.rememberMe) data.rememberMe = 14;
			else data.rememberMe = 1;
			let res = await instance.post('login', data);
			setAuthData({
				authenticated: true,
				loading: false,
				data: res.data.userInfo,
			});
			const _email = res.data.userInfo.email;
			localStorage.setItem('access_token', res.data.token);
			if (_email === 'andy@digpads.com' || _email === 'logos.slava@gmail.com') {
				localStorage.setItem('isAdmin', 'true');
			} else {
				localStorage.removeItem('isAdmin');
			}
			setProgressBar(false);
			if (props.onLoggedIn) {
				props.onLoggedIn();
			}
			redirectURL && navigate(redirectURL);
		} catch (e) {
			setProgressBar(false);
			console.log(e);
			if (!e.response) {
				setBody(
					<StyledAlert variant='filled' severity='error'>
						Uh oh something broke, we're working on fixing it. Please try again
						in 5 minutes
					</StyledAlert>
				);
				return;
			}
			let err;
			if (e.response.data) {
				err = e.response.data.error;
			} else {
				err = 'Unknown';
			}
			switch (err) {
				case 'email not found':
					setBody(
						<StyledAlert variant='filled' severity='error'>
							Invalid email or password
						</StyledAlert>
					);
					break;
				case 'email not verified':
					setBody(
						<StyledAlert variant='filled' severity='error'>
							This email is not verified! Please verify it first.
						</StyledAlert>
					);
					break;
				default:
					setBody(
						<StyledAlert variant='filled' severity='error'>
							Some error occured!
						</StyledAlert>
					);
					break;
			}
		}
	}
	return (
		<StyledContainer maxWidth='xs'>
			<StyledAvatar>
				<LockOpen />
			</StyledAvatar>
			<StyledHeading component='h1' variant='h5'>
				Log in
			</StyledHeading>
			<StyledOption component='h6'>
				Don't have an account?
				<Link component='button' onClick={() => props.setAuthPage('Sign Up')}>
					Sign Up
				</Link>
			</StyledOption>
			<StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<StyledField
							autoFocus
							label='Email'
							name='email'
							type='email'
							inputRef={register({
								required: 'This field is required',
							})}
							error={errors.email ? true : false}
							helperText={errors.email ? errors.email.message || '' : ''}
							variant='outlined'
							size='small'
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledField
							label='Password'
							name='psw'
							inputRef={register({
								required: 'You must specify a password',
							})}
							error={errors.title ? true : false}
							helperText={errors.psw ? errors.psw.message || '' : ''}
							type='password'
							variant='outlined'
							size='small'
						/>
					</Grid>
					<div>{errorBody}</div>
					<Grid item xs={12}>
						<StyledFormControlLabel
							control={
								<Checkbox
									inputRef={register}
									name='rememberMe'
									color='primary'
									defaultValue={false}
									size='small'
								/>
							}
							label='Remember me'
						/>
					</Grid>
					<Grid item xs={12}>
						{!progressBar ? (
							<StyledButton
								variant='contained'
								color='primary'
								type='submit'
								login='login'
							>
								Log in
								<ArrowForward />
							</StyledButton>
						) : (
							<CircularProgress />
						)}
					</Grid>
					<Grid item xs={12}>
						<Typography component='h6'>
							<Link
								component='button'
								onClick={() => props.setAuthPage('ForgotPassword')}
							>
								Forgot Password ?
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</StyledForm>
		</StyledContainer>
	);
}
export default Login;
