import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Box, Typography, Grid, Modal, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import SelectionModal from './SelectionModal';
import AddOtherModal from './SubmissionModals/AddOtherModal';
import { modalStyles } from 'components/styled/Modal';
import { LandlordButton } from 'components/styled/Button';

const EventTypeModal = ({ open, handleClose, nature }) => {
	const useStyles = makeStyles((theme) => ({
		modal: {
			overflowY: 'auto',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				height: 'auto',
			},
		},
	}));
	const classes = useStyles();

	const [selectionModal, setSelectionModal] = useState(false);
	const [otherModal, setOtherModal] = useState(false);
	const [recordType, setRecordType] = useState(null);
	const [events, setEvents] = useState([]);
	const recordClicked = (type) => {
		if (type === 'Other') return setOtherModal(true);
		setRecordType(type);
		// TODO: figure out is it better to close it?
		// handleClose();
		setSelectionModal(true);
	};
	useEffect(() => {
		if (nature === 'Record') {
			setEvents([
				'Invoice/Expense',
				'Payment',
				'Service',
				'Maintenance',
				'Damage',
				'Repair & Remodel',
				'Tax Assessment',
				'Tax Bill',
				'Insurance Claim',
				'Condition Change',
				'Other',
			]);
		} else {
			setEvents([
				'Invoice/Expense',
				'Payment',
				'Service',
				'Maintenance',
				'Tax Assessment',
				'Repair & Remodel',
				'Tax Bill',
				'Other',
			]);
		}
	}, [nature]);

	return (
		<React.Fragment>
			<Modal open={open}>
				<Box className={classes.modal} sx={modalStyles}>
					<Box display='flex' justifyContent='space-between' mb={3}>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							{nature} Event
						</Typography>
						<div onClick={() => handleClose()}>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>
					<Typography variant='p' component='p' fontSize={'1.2rem'}>
						What type of event would you like to{' '}
						{nature?.toLowerCase()}?
					</Typography>
					<Box sx={{ mt: 2 }}>
						<Grid spacing={2} container>
							{events?.map((type, index) => (
								<Grid key={index} item xs={6} md={6}>
									<LandlordButton
										color={'primary'}
										variant={'contained'}
										fullWidth
										onClick={() => recordClicked(type)}
									>
										{type}
									</LandlordButton>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</Modal>
			<SelectionModal
				open={selectionModal}
				handleClose={() => setSelectionModal(false)}
				closeTypeModal={() => handleClose()}
				nature={nature}
				eventType={recordType}
				setEventType={setRecordType}
				classes={classes}
				styles={modalStyles}
			/>
			<AddOtherModal
				nature={nature}
				closeTypeModal={() => handleClose()}
				open={otherModal}
				handleClose={() => setOtherModal(false)}
				eventType={recordType}
				classes={classes}
				styles={modalStyles}
			/>
		</React.Fragment>
	);
};
export default EventTypeModal;
