import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';

export default function AddRentalHistory({ onSubmit }) {
	const [state, setState] = React.useState({
		state: '',
		city: '',
		neighborhood: '',
		type: '',
		monthsLeased: '',
		leasedFrom: new Date(),
		leasedTo: new Date(),
		confirmLease: null,
		landlordEmailAddress: '',
	});

	const handleSubmit = () => {
		if (state.confirmLease === null) {
			alert('Please select Confirm lease with Landlord');
			return;
		}
		onSubmit(state);
	};

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
				Add Rental History
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
							value={state.type}
							onChange={(evt) => setState({ ...state, type: evt.target.value })}
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
							value={getFormattedDate(state.leasedFrom)}
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
							value={getFormattedDate(state.leasedTo)}
							onChange={(evt) =>
								setState({
									...state,
									leasedTo: new Date(evt.target.value),
								})
							}
						/>
					</label>
				</Box>

				<Box
					sx={{
						display: 'flex',
						mb: '1em',
						fontSize: '0.875rem',
						fontWeight: 'bold',
					}}
				>
					<label>Confirm lease with Landlord?</label>

					<FormControl required>
						<RadioGroup
							name='confirm-lease-group'
							value={state.confirmLease?.toString() || ''}
							onChange={(evt) => {
								setState((prevState) => ({
									...prevState,
									confirmLease: evt.target.value === 'true' ? true : false,
								}));
							}}
							sx={{
								flexDirection: 'row',
								flexWrap: 'nowrap',
							}}
						>
							<FormControlLabel value='true' control={<Radio />} label='Yes' />
							<FormControlLabel value='false' control={<Radio />} label='No' />
						</RadioGroup>
					</FormControl>
				</Box>

				<input
					type='email'
					placeholder='Email Address'
					value={state.landlordEmailAddress}
					onChange={(evt) =>
						setState((prevState) => ({
							...prevState,
							landlordEmailAddress: evt.target.value,
						}))
					}
					style={{ marginBottom: '1em', width: '100%' }}
				/>
				<Typography sx={{ fontSize: '12px' }}>
					The landlord will receive an email to confirm the lease.
				</Typography>
			</Box>

			<Button
				onClick={handleSubmit}
				variant='contained'
				sx={{
					textTransform: 'capitalize',
					display: 'block',
					ml: 'auto',
				}}
			>
				Submit
			</Button>
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
