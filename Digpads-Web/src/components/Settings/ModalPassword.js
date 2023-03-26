import React, { useContext } from 'react';
import { Grid, Box, Modal, TextField, Button } from '@mui/material';
import { Alert } from '@mui/material';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	border: 'none',
	p: 4,
};

function ModalPassword({
	open,
	handleOpen,
	handleClose,
	handleChange,
	password,
	setPassword,
	error,
	setError,
}) {
	const { auth } = React.useContext(authContext);

	const handleOk = async () => {
		if (!password.password) {
			return setError('Password is required');
		}

		await getCSRF();
		instance
			.post('checkPassword', {
				email: auth.data.email,
				password: password.password,
			})
			.then((response) => {
				if (response.status === 200) {
					setError('');
					setPassword({
						...password,
						password: '',
					});
					handleClose();
					handleOpen();
				}
			})
			.catch(() => {
				setError('Invalid password');
			});
	};

	return (
		<Modal
			open={open}
			onClose={() => {
				setError('');
				handleClose();
			}}
		>
			<Box sx={style}>
				<Grid container>
					<Grid item xs={12}>
						<TextField
							style={{ marginBottom: 16 }}
							label='Password'
							name='password'
							onChange={(e) => {
								setPassword({
									...password,
									[e.target.name]: e.target.value,
								});
							}}
							fullWidth
							variant='outlined'
							size='small'
							type='password'
							helperText='Please enter your current password'
						/>
					</Grid>
					{error && (
						<Alert
							style={{ width: '100%', marginBottom: 16 }}
							severity='error'
						>
							{error}
						</Alert>
					)}
					<Box width='100%' display='flex' justifyContent='flex-end'>
						<Button
							variant='contained'
							color='primary'
							style={{
								textAlign: 'center',
								padding: '8px 16px',
							}}
							onClick={() => {
								handleOk();
							}}
						>
							Ok
						</Button>
					</Box>
				</Grid>
			</Box>
		</Modal>
	);
}

export default ModalPassword;
