import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Grid,
	Modal,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropertySelectModal from './PropertySelectModal';
import InvoicePaymentModal from './SubmissionModals/InvoicePaymentModal';
import { LandlordButton } from 'components/styled/Button';
import { useLocation } from 'react-router-dom';
import { capitalizeFirstLetter } from 'utils/Misc';

export default function SelectionModal({
	open,
	handleClose,
	eventType,
	setEventType,
	classes,
	styles,
	nature,
	closeTypeModal,
}) {
	const [propertySelectModal, setPropertySelectModal] = useState(false);
	const [selectionType, setSelectionType] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogData, setDialogData] = useState(null);
	const [parent, setParent] = useState(null);
	const [header, setHeader] = useState(null);
	const location = useLocation();

	const serviceTypes = [
		'Utilities',
		'General Expenses',
		'Physical Property',
		'Maintenance',
		'Fixture',
		'Repair & Remodel',
	];

	const selections = () => {
		switch (eventType) {
			case 'Invoice/Expense':
			case 'Payment':
				return [
					'Utilities',
					'General Expenses',
					'Physical Property',
					'Taxes',
					'Insurance',
					'Maintenance',
					'Fixture',
					'Repair & Remodel',
				];
			case 'Service':
				return serviceTypes;
			case 'Damage':
				return ['Tenant', 'Weather', 'No Fault', 'Unknown'];
			case 'Tax Assessment':
			case 'Tax Bill':
				return ['Received', 'Paid'];
			case 'Insurance Claim':
				return [
					'Claim Filed',
					'Adjuster Review',
					'Claim Paid',
					'Claim Rejected',
				];
			case 'Maintenance':
			case 'Repair & Remodel':
				return ['Bid', 'Service'];
			case 'Condition Change':
				return ['Physical Property', 'Fixture'];
			default:
				return [];
		}
	};

	useEffect(() => {
		if (open) {
			const currentUrl =
				location.pathname.split('/')[2]?.toLowerCase() || '';
			let splittedUrl = currentUrl?.split('-');
			splittedUrl = splittedUrl.filter((i) => i !== 'properties');
			splittedUrl = splittedUrl
				.map((i) => capitalizeFirstLetter(i))
				.join(' ');

			if (splittedUrl !== '')
				switch (eventType) {
					case 'Invoice/Expense':
					case 'Payment':
						selectionSelected(splittedUrl);
						break;
					case 'Service':
						console.log(serviceTypes, splittedUrl);
						if (serviceTypes.includes(splittedUrl))
							selectionSelected(splittedUrl);
						break;
					default:
						break;
				}
		}
		// if (open) selectionSelected('Utilities');
	}, [open]);

	const getSingularTitle = (title) => {
		switch (title) {
			case 'Utilities':
				return 'Utility';
			case 'Taxes':
				return 'Tax';
			case 'General Expenses':
				return 'General Expense';
			default:
				return title;
		}
	};

	const selectionSelected = (type) => {
		setSelectionType(type);
		switch (eventType) {
			case 'Invoice/Expense':
			case 'Payment':
			case 'Damage':
			case 'Repair & Remodel':
			case 'Maintenance':
				setHeader(`${nature} a ${getSingularTitle(type)} Event`);
				setParent(type);
				setPropertySelectModal(true);
				break;
			case 'Service':
			case 'Condition Change':
				setParent(type);
				setOpenDialog(true);
				break;
			case 'Tax Assessment':
				setParent('Taxes');
				// setSelectionType('Taxes');
				setPropertySelectModal(true);
				break;
			case 'Insurance Claim':
				setParent('Insurance');
				// console.log(selectionType);
				// setSelectionType('Insurance');
				setPropertySelectModal(true);
				break;
			case 'Tax Bill':
				setParent('Taxes');
				console.log('Tax Bill', type);
				if (type === 'Received') {
					setPropertySelectModal(true);
				} else {
					setEventType('Payment');
					setParent('Taxes');
					setPropertySelectModal(true);
				}
				break;
			default:
				console.log(eventType);
				console.log('no modal for you');
		}
	};

	const getDialogButtons = () => {
		let buttons = [];
		switch (eventType) {
			case 'Service':
				buttons = ['Bid', 'Service'];
				break;
			case 'Condition Change':
				buttons = ['Condition Change', 'Replaced', 'Destroyed'];
				break;
			default:
				buttons = [];
				break;
		}
		return buttons;
	};

	const handleDialogSubmit = (button) => {
		setDialogData(button);
		setPropertySelectModal(true);
		setOpenDialog(false);
	};

	const onInsuranceClaim = () => {
		console.log('insurance claim called');
		setPropertySelectModal(false);
		setEventType('Insurance Claim');
	};

	const vowels = ['a', 'e', 'i', 'o', 'u'];

	return (
		<React.Fragment>
			<Modal open={open} onClose={handleClose}>
				<Box className={classes.modal} sx={styles}>
					<Box display='flex' justifyContent='space-between' mb={3}>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							{eventType === 'Condition Change'
								? 'Is it a Physical Property or Fixture'
								: `${nature} ${
										vowels.includes(
											eventType
												?.toLowerCase()
												.split('')[0]
										)
											? 'an'
											: 'a'
								  } ${eventType} ${
										eventType === 'Maintenance'
											? 'Event'
											: ''
								  }`}
						</Typography>

						<div onClick={() => handleClose()}>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>
					<Typography variant='p' component='p' fontSize={'1.2rem'}>
						{eventType === 'Condition Change'
							? 'Physical Property is larger items that are purchased and not affixed, like a Refrigerator or a Couch. Fixtures are attached components to a Room like baseboards, ceiling fans, or flooring.'
							: eventType === 'Damage'
							? 'Who is responsible for the damage?'
							: eventType === 'Insurance Claim'
							? `What Insurance Claim action do you want to ${nature?.toLowerCase()}?`
							: eventType === 'Maintenance'
							? `Would you like to ${nature} a Bid or a Service event?`
							: `What type of Item would you like to ${nature.toLowerCase()} the event for?`}
					</Typography>
					<Box sx={{ mt: 2 }}>
						<Grid spacing={2} container>
							{selections().map((type, index) => (
								<Grid key={index} item xs={6} md={6}>
									<LandlordButton
										color={'primary'}
										variant={'contained'}
										fullWidth
										onClick={() => {
											selectionSelected(type);
										}}
									>
										{type}
									</LandlordButton>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</Modal>
			{propertySelectModal && (
				<PropertySelectModal
					closeParentModals={() => {
						closeTypeModal();
						handleClose();
					}}
					header={header}
					open={propertySelectModal}
					handleClose={() => setPropertySelectModal(false)}
					nature={nature}
					classes={classes}
					styles={styles}
					eventType={eventType}
					selectionType={selectionType}
					dialogData={dialogData}
					parent={parent}
					onInsuranceClaim={onInsuranceClaim}
				/>
			)}

			<Dialog
				open={openDialog}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{eventType === 'Service'
						? 'Was it a Bid or a Completed Service?'
						: 'Record a Property Condition Change'}
				</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 2 }}>
						<Grid spacing={2} container>
							{getDialogButtons().map((button, index) => (
								<Grid key={index} item xs={6} md={6}>
									<LandlordButton
										variant={'contained'}
										color={'primary'}
										fullWidth
										onClick={() =>
											handleDialogSubmit(button)
										}
									>
										{button}
									</LandlordButton>
								</Grid>
							))}
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setOpenDialog(false)}
						color='error'
						variant='text'
						sx={{
							color: 'red',
							':hover': {
								color: 'darkred',
							},
							':focus': {
								color: 'darkred',
							},
						}}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			{/* <AddTaxBillModal
				open={addTaxBillModal}
				handleClose={() => {
					// handleClose();
					setAddTaxBillModal(false);
				}}
				classes={classes}
				nature={nature}
				styles={styles}
				title={`${nature} a Tax Bill Recieved`}
				eventType={eventType}
			/> */}
		</React.Fragment>
	);
}
