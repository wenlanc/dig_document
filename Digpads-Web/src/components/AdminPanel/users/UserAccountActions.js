import React, { useState, useRef } from 'react';
import {
	Typography,
	Checkbox,
	FormControlLabel,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Snackbar,
	FormGroup,
	Paper,
	Box,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';

export default function UserAccountActions({ selectedUser, onAction }) {
	const actions = [
		{
			label: 'Block User from Commenting',
			shortName: 'Block user',
			action: 'block',
			timed: true,
			checked: selectedUser.blockedFromCommenting === true ? true : false,
		},
		{
			label: 'Suspend User Account',
			shortName: 'Suspend user',
			action: 'suspend',
			timed: true,
			checked: selectedUser.suspended === true ? true : false,
		},
		{
			label: 'Put User on Probation',
			shortName: 'Put on probation',
			action: 'probation',
			timed: true,
			checked: selectedUser.onProbation === true ? true : false,
		},
		{
			label: 'Terminate User Account',
			shortName: 'Terminate Account',
			action: 'terminate',
			timed: false,
			checked: selectedUser.terminated === true ? true : false,
		},
		{
			label: 'Reinstate Terminated User Account',
			shortName: 'Reinstate account',
			action: 'reinstate',
			timed: false,
			checked: selectedUser.reinstated === true ? true : false,
		},
		{
			label: 'Permanently Delete User Account',
			shortName: 'Delete account',
			action: 'delete',
			timed: false,
			checked: selectedUser.permanentlyDeleted === true ? true : false,
		},
	];

	const [confirmActionDialogOpen, setConfirmActionDialogOpen] = useState(false);
	const [confirmActionAlertOpen, setConfirmActionAlertOpen] = useState(false);
	const [selectedAction, setSelectedAction] = useState(null);
	const [selectedActionDuration, setSelectedActionDuration] = useState({});
	const reasonRef = useRef(null);

	const handleActionCheck = (action) => {
		setSelectedAction(action);
		setConfirmActionDialogOpen(true);
	};

	const handleConfirmAction = async () => {
		setConfirmActionDialogOpen(false);

		const action = {
			action: selectedAction.action,
			reason: reasonRef.current.value,
		};

		if (selectedAction.timed) {
			action.duration = selectedActionDuration;
		}

		const success = await onAction(action);

		if (success) {
			setConfirmActionAlertOpen(true);
		} else {
			alert('something went wrong');
		}
	};

	const handleChangeActionTime = (evt) => {
		setSelectedActionDuration({
			...selectedActionDuration,
			[evt.target.name]: evt.target.value,
		});
	};

	return (
		<div>
			<Paper elevation={3} sx={{ p: '1em 1.5em' }}>
				<FormGroup sx={{ display: 'flex', gap: '0.5em' }}>
					{actions.map((action, i) => (
						<FormControlLabel
							sx={{ display: 'flex', gap: '0.5em' }}
							key={i}
							disabled={selectedUser === ''}
							onChange={() => handleActionCheck(action)}
							label={
								<Typography
									sx={{
										fontSize: (theme) => theme.typography.size.sm,
									}}
								>
									{action.label}
								</Typography>
							}
							control={<Checkbox checked={action.checked} />}
						/>
					))}
				</FormGroup>
			</Paper>

			{/* confirm action dialog */}
			<div>
				<Dialog
					onClose={() => setConfirmActionDialogOpen(false)}
					open={confirmActionDialogOpen}
				>
					<DialogTitle sx={{ pb: '0' }}>Confirm Action:</DialogTitle>

					<DialogContent>
						<DialogContentText sx={{ mb: '1em' }}>
							<Typography
								variant='caption'
								color='error'
								sx={{
									color: '#b30404',
									display: 'block',
								}}
							>
								{selectedAction?.label}{' '}
							</Typography>

							<Typography variant='caption' sx={{ display: 'block' }}>
								User: {selectedUser?.name}
							</Typography>
						</DialogContentText>

						{selectedAction?.timed && (
							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr 1fr',
									gap: '1em',
									mb: '1em',
								}}
							>
								<SuiInput
									type='number'
									name='hours'
									onChange={handleChangeActionTime}
									placeholder='hours'
								/>
								<SuiInput
									type='number'
									name='days'
									onChange={handleChangeActionTime}
									placeholder='days'
								/>
								<SuiInput
									type='number'
									name='weeks'
									onChange={handleChangeActionTime}
									placeholder='weeks'
								/>
							</Box>
						)}

						<SuiInput
							multiline
							style={{ width: '100%' }}
							ref={reasonRef}
							placeholder='reason'
							minRows='4'
						></SuiInput>

						<DialogActions>
							<SuiButton
								variant='contained'
								color='primary'
								onClick={handleConfirmAction}
							>
								Confirm
							</SuiButton>

							<SuiButton
								variant='contained'
								color='warning'
								onClick={() => setConfirmActionDialogOpen(false)}
							>
								Cancel
							</SuiButton>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</div>

			<Snackbar
				open={confirmActionAlertOpen}
				autoHideDuration={6000}
				onClose={() => setConfirmActionAlertOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setConfirmActionAlertOpen(false)} severity='info'>
					Action{' '}
					<Typography variant='caption'>{selectedAction?.shortName}</Typography>{' '}
					successfully submitted
				</Alert>
			</Snackbar>
		</div>
	);
}

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
