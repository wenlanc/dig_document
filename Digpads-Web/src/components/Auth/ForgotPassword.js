import React, { useState } from 'react';
import { instance, getCSRF } from '../../controllers/axios';
import { useForm } from 'react-hook-form';
import {
	TextField,
	Grid,
	Typography,
	Link,
	Container,
	CircularProgress,
} from '@mui/material';
import { Restore, ArrowForward } from '@mui/icons-material';
import { StyledButton, StyledAvatar } from '../styled/FormStyle';

export default function ForgotPassword(props) {
	const { register, errors, handleSubmit, setError } = useForm({});
	const [message, setMessage] = useState({ error: false, content: '' });
	const [progressBar, setProgressBar] = useState(false);
	const onSubmit = (data) => ForgotPassword(data);

	async function ForgotPassword(data) {
		await getCSRF();
		try {
			setProgressBar(true);
			let res = await instance.post('forgotPass', data);
			if (res.status === 200) {
				props.onResetPassword(
					'We sent a password reset link to your email'
				);
				setProgressBar(false);
				setMessage({ error: false, content: `Email sent` });
			}
		} catch (e) {
			setProgressBar(false);
			if (!e.response) {
				setMessage({
					error: true,
					content: `Uh oh something broke, we're working on fixing it.
							Please try again in 5 minutes`,
				});
				return;
			}
			let err;
			if (e.response.data) {
				err = e.response.data.error;
			} else {
				err = 'Unknown';
			}
			switch (err) {
				case 'User not found':
					setError('email', {
						type: 'manual',
						message: 'No account with that email',
					});
					break;
				default:
					setMessage({
						error: true,
						content: `Something went wrong! Please try again later`,
					});
			}
		}
	}
	return (
		<Container maxWidth='xs'>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<StyledAvatar>
					<Restore />
				</StyledAvatar>
				<Typography component='h1' variant='h5'>
					Reset Password
				</Typography>
				<Typography component='h6'>
					Oh! I just remembered. Let me{' '}
					<Link
						component='button'
						onClick={() => props.setAuthPage('Login')}
					>
						Log In
					</Link>
				</Typography>
				<Grid item xs={12}>
					<TextField
						label='Email'
						name='email'
						type='email'
						error={errors.email ? true : false}
						variant='outlined'
						helperText={
							errors.email ? errors.email.message || '' : ''
						}
						inputRef={register}
						size='small'
					/>
				</Grid>
				{!progressBar ? (
					<StyledButton
						variant='contained'
						color='primary'
						onClick={handleSubmit(onSubmit)}
					>
						Send Reset Link
						<ArrowForward />
					</StyledButton>
				) : (
					<CircularProgress />
				)}
				{message && (
					<Typography
						style={{ marginTop: '0.5em', padding: '0.3em 1em' }}
						color={message.error ? 'error' : 'primary'}
					>
						{message.content}
					</Typography>
				)}
			</Grid>
		</Container>
	);
}
