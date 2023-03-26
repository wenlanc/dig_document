import { Snackbar, Alert as MuiAlert } from '@mui/material';
import React from 'react';

function CustomSnackbar({ snackbar, setSnackbar }) {
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});
	return (
		<Snackbar
			open={snackbar.status}
			autoHideDuration={5000}
			onClose={() => setSnackbar({ ...snackbar, status: false })}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
		>
			<Alert
				severity={snackbar.variant}
				sx={{ width: '100%' }}
				onClose={() => setSnackbar({ ...snackbar, status: false })}
			>
				{snackbar.message}
			</Alert>
		</Snackbar>
	);
}

export default CustomSnackbar;
