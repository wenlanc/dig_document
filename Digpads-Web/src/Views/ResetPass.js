import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { instance, getCSRF } from '../controllers/axios';
import MyModal from 'components/Modal';
import {
	TextField,
	Grid,
	Typography,
	Button,
	CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';
import { StyledAlert } from 'components/styled/FormStyle';

const StyledRequestStatus = styled.div`
	text-align: center;

	.MuiSvgIcon-root {
		font-size: 3rem;
	}
`;

const StyledHeading = styled(Typography)`
	margin-top: 10px;
	margin-bottom: 15px;
`;

const StyledTextField = styled(TextField)`
	margin-top: 10px;
	margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
	margin-top: 10px;
	margin-bottom: 5px;
	&& {
		font-size: 1rem;
	}
`;

export default function ResetPass() {
	const { token } = useParams();

	const { register, errors, handleSubmit, watch } = useForm({
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});
	const [errorBody, setBody] = useState('');
	const navigate = useNavigate();
	const [awaitingMessage, setAwaitingMessage] = useState('');
	const [timer, setTime] = useState(5);
	const [progressBar, setProgressBar] = useState(false);
	const onSubmit = (data) => resetPass(data);
	const onError = (errors) => {
		console.log(errors);
	};

	function startTimer() {
		let count = timer - 1;
		let interval = setInterval(function () {
			setTime(count);

			if (count === 0) {
				clearInterval(interval);
			}

			count -= 1;
		}, 900);
	}

	async function resetPass(data) {
		data.pToken = token;
		try {
			setProgressBar(true);
			delete data.conf;
			let res = await instance.post(`resetPass`, data, {
				responseType: 'json',
			});
			if (res.status === 200) {
				setAwaitingMessage('Password changed successfully');
				setProgressBar(false);
				console.log(res);

				setTimeout(() => {
					navigate('/');
				}, 5000);

				startTimer();
			}
		} catch (e) {
			setProgressBar(false);
			if (!e.response) {
				setBody(
					<span>
						Uh oh something broke, we're working on fixing it. Please try again
						in 5 minutes
					</span>
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
				case 'link expired':
					setBody(<span>This link is expired.</span>);
					break;
				default:
					setBody(<span>Something went wrong! Please try again later.</span>);
			}
			return data;
		}
	}

	React.useEffect(() => {
		getCSRF();
	}, []);

	return (
		<MyModal display={true} noClose={true}>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				{awaitingMessage ? (
					<StyledRequestStatus>
						<CheckIcon />
						<p>{awaitingMessage}</p>
						<span>
							Redirecting you to the home page in <span>{timer}</span> seconds
						</span>
					</StyledRequestStatus>
				) : (
					<>
						<StyledHeading component='h1' variant='h5'>
							Enter Your New Password
						</StyledHeading>
						<StyledTextField
							label='Password'
							name='psw'
							inputRef={register({
								required: 'You must specify a password',
								minLength: {
									value: 8,
									message: 'Password must have at least 8 characters',
								},
							})}
							error={errors.psw ? true : false}
							variant='outlined'
							helperText={errors.psw ? errors.psw.message || '' : ''}
							type='password'
						/>
						<StyledTextField
							label='Confirm'
							name='conf'
							inputRef={register({
								required: 'Please confirm your password',
								validate: (value) =>
									value === watch('psw') || 'Passwords do not match',
							})}
							error={errors.conf ? true : false}
							variant='outlined'
							helperText={errors.conf ? errors.conf.message || '' : ''}
							type='password'
						/>
						{errorBody && (
							<StyledAlert variant='filled' severity='error'>
								{errorBody}
							</StyledAlert>
						)}
						{!progressBar ? (
							<StyledButton
								onClick={handleSubmit(onSubmit, onError)}
								color='primary'
								variant='contained'
							>
								Update Password
							</StyledButton>
						) : (
							<CircularProgress />
						)}
					</>
				)}
			</Grid>
		</MyModal>
	);
}
