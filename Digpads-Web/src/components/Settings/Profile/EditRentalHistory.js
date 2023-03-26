import React from 'react';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';

export default function EditRentalHistory({ rentalHistory, onSave, onClose }) {
	const [state, setState] = React.useState({
		state: rentalHistory.state || '',
		city: rentalHistory.city || '',
		neighborhood: rentalHistory.neighborhood || '',
		rentalType: rentalHistory.rentalType || '',
		monthsLeased: rentalHistory.monthsLeased || '',
		leasedFrom: rentalHistory.leasedFrom || new Date(),
		leasedTo: rentalHistory.leasedTo || new Date(),
		confirmLease: rentalHistory.confirmLease || null,
		landlordEmailAddress: rentalHistory.landlordEmailAddress || '',
	});

	return (
		<Box
			sx={{
				p: '0.8em',
				width: '400px',
				mx: 'auto',
				mt: '5vh',
				maxHeight: '90vh',
				overflowY: 'scroll',
				backgroundColor: '#fff',
			}}
		>
			<Typography
				variant='h3'
				fontWeight='bold'
				sx={{ mb: '1em', fontSize: '0.875rem' }}
			>
				Edit Rental History
			</Typography>

			<Box sx={{ px: '1em', mb: '1em' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1em',
						mb: '2em',
						'& span': {
							fontWeight: 'bold',
							fontSize: '14px',
						},
						'& label': {
							display: 'flex',
							justifyContent: 'space-between',
						},
						'& input': {
							width: '190px',
							flexShrink: '0',
						},
					}}
				>
					<label>
						<span>State:</span>
						<input
							type='text'
							value={state.state}
							onChange={(evt) =>
								setState({ ...state, state: evt.target.value })
							}
						/>
					</label>
					<label>
						<span>City:</span>
						<input
							type='text'
							value={state.city}
							onChange={(evt) => setState({ ...state, city: evt.target.value })}
						/>
					</label>
					<label>
						<span>Neighborhood:</span>
						<input
							type='text'
							value={state.neighborhood}
							onChange={(evt) =>
								setState({
									...state,
									neighborhood: evt.target.value,
								})
							}
						/>
					</label>
					<label>
						<span>Type:</span>
						<input
							type='text'
							value={state.rentalType}
							onChange={(evt) =>
								setState({
									...state,
									rentalType: evt.target.value,
								})
							}
						/>
					</label>
					<label>
						<span>Months Leased:</span>
						<input
							type='number'
							value={state.monthsLeased}
							onChange={(evt) =>
								setState({
									...state,
									monthsLeased: evt.target.value,
								})
							}
						/>
					</label>
					<label>
						<span>Years Leased:</span>
						<input
							type='number'
							value={
								state.monthsLeased ? Math.floor(state.monthsLeased / 12) : 0
							}
							onChange={(evt) => {
								const years = evt.target.value;
								const months = years * 12;
								setState({
									...state,
									yearsLeased: evt.target.value,
									monthsLeased: months,
								});
							}}
						/>
					</label>

					<label>
						<span>Beginning of Lease:</span>
						<input
							type='date'
							value={getFormattedDate(new Date(state.leasedFrom))}
							onChange={(evt) =>
								setState({
									...state,
									leasedFrom: new Date(evt.target.value),
								})
							}
						/>
					</label>

					<label>
						<span>End of Lease:</span>
						<input
							type='date'
							value={getFormattedDate(new Date(state.leasedTo))}
							onChange={(evt) =>
								setState({
									...state,
									leasedTo: new Date(evt.target.value),
								})
							}
						/>
					</label>
				</Box>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'end' }}>
				<Button
					onClick={() => onSave(state)}
					variant='contained'
					size='small'
					sx={{
						textTransform: 'capitalize',
						mr: '1em',
					}}
				>
					Save
				</Button>
				<Button
					onClick={onClose}
					size='small'
					variant='contained'
					color='warning'
					sx={{
						textTransform: 'capitalize',
					}}
				>
					Cancel
				</Button>
			</Box>
		</Box>
	);
}

function getFormattedDate(date) {
	var year = date.getFullYear();

	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;

	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;

	return year + '-' + month + '-' + day;
}
