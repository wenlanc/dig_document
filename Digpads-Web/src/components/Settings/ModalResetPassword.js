import React from 'react';
import { Grid, Box, Modal, TextField, Button } from '@mui/material';
import { Alert } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

function ModalResetPassword({
	open,
	handleClose,
	password,
	setPassword,
	error,
	setError,
	onSubmit,
}) {
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!password.resetPassword || !password.confirmResetPassword) {
			return setError('Password is required');
		} else if (password.resetPassword !== password.confirmResetPassword) {
			return setError('Password do not match');
		}
		setError('');
		await onSubmit(event, 'Password');
	};

	return (
		<Modal
			open={open}
			onClose={() => {
				setError('');
				handleClose();
			}}
		>
			<form onSubmit={handleSubmit}>
				<Box sx={style}>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								style={{ marginBottom: 16 }}
								label='Reset password'
								name='resetPassword'
								fullWidth
								variant='outlined'
								size='small'
								type='password'
								onChange={(e) =>
									setPassword({
										...password,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								style={{ marginBottom: 16 }}
								label='Confirm Reset Password'
								name='confirmResetPassword'
								fullWidth
								variant='outlined'
								size='small'
								type='password'
								onChange={(e) =>
									setPassword({
										...password,
										[e.target.name]: e.target.value,
									})
								}
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
						<Box
							width='100%'
							display='flex'
							justifyContent='flex-end'
						>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								style={{
									textAlign: 'center',
									padding: '8px 16px',
								}}
							>
								Ok
							</Button>
						</Box>
					</Grid>
				</Box>
			</form>
		</Modal>
	);
}

export default ModalResetPassword;
