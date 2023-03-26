import React, { useState, useRef } from 'react';
import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	Snackbar,
	Alert,
} from '@mui/material';
import emailjs from 'emailjs-com';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function ModalFeedback({ open, handleOpen, handleClose }) {
	const [feedback, setFeedback] = useState();

	const [openSnackbar, setOpenSnackbar] = useState(false);

	const form = useRef();

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_7xyqwil',
				'template_lblarr9',
				form.current,
				'user_VC5f4pE92paAenPufKTfj'
			)
			.then(
				(result) => {
					setOpenSnackbar(true);
				},
				(error) => {
					console.log(error.text);
				}
			)
			.finally(() => {
				handleClose();
			});
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<form ref={form} onSubmit={sendEmail}>
					<Box sx={style}>
						<Typography
							variant='h5'
							component='h2'
							marginBottom='16px'
						>
							Please provide feedback regarding the calculator
							below.
						</Typography>
						<TextField
							fullWidth
							name='feedback'
							label='Feedback'
							value={feedback}
							onChange={(event) => {
								setFeedback(event.target.value);
							}}
						/>
						<Box mt={2} display='flex' justifyContent='flex-end'>
							<Button
								disabled={!feedback}
								type='submit'
								variant='contained'
							>
								Send
							</Button>
						</Box>
					</Box>
				</form>
			</Modal>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert severity='success'>Message Send!</Alert>
			</Snackbar>
		</>
	);
}

export default ModalFeedback;
