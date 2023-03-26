import React from 'react';
import Radio from '@mui/material/Radio';
import EditIcon from '@mui/icons-material/Edit';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Button, IconButton, Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SectionTitle } from 'components/styled/EditProfile';

import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';

import * as S from 'components/Profiles/style';

export default function MapLocationHours({
	sameLocation = true,
	address = '',
	city = '',
	state = '',
	zip = '',
	hours,
	onChange,
	onSave,
	onCancel,
}) {
	const [isEditing, setIsEditing] = React.useState(false);

	if (hours == null) {
		hours = {
			Sunday: { from: '07:30', to: '21:00' },
			Monday: { from: '07:30', to: '21:00' },
			Tuesday: { from: '07:30', to: '21:00' },
			Wednesday: { from: '07:30', to: '21:00' },
			Thirsday: { from: '07:30', to: '21:00' },
			Friday: { from: '07:30', to: '21:00' },
			Saturday: { from: '07:30', to: '21:00' },
		};
	}

	return (
		<>
			<div>
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					{onChange && (
						<SuiTypography variant='h2' gutterBottom>
							Map, Location, & Hours
						</SuiTypography>
					)}

					{onChange && !isEditing && (
						<IconButton
							sx={{ mb: '10px', background: '#e4e5e5' }}
							onClick={() => setIsEditing(true)}
							size='small'
							aria-label='edit about you button'
						>
							<EditIcon />
						</IconButton>
					)}
				</Box>

				{/* === Map === */}
				<FormControl sx={{ mb: 4 }}>
					<RadioGroup
						name='same-location-group'
						value={sameLocation}
						onChange={(evt) =>
							onChange('sameLocation', evt.target.value === 'true')
						}
					>
						<FormControlLabel
							sx={{ ml: '0', mb: 2 }}
							value={true}
							control={<Radio disabled={!isEditing} />}
							label='Office/Shop is same location as entered above.'
						/>
						<FormControlLabel
							sx={{ ml: '0' }}
							value={false}
							control={<Radio disabled={!isEditing} />}
							label='Office/Shop is different than what is entered above (enter below).'
						/>
					</RadioGroup>
				</FormControl>

				{/* === Location ==== */}
				<Box
					align='center'
					sx={{
						maxWidth: '210px',
						display: 'flex',
						flexWrap: 'wrap',
						rowGap: '1em',
						columnGap: '0.5em',
						mb: '2em',
						'& .MuiInputBase-root': {
							width: '270px !important',
						},
					}}
				>
					<SuiInput
						value={address}
						onChange={(evt) => onChange('address', evt.target.value)}
						disabled={!isEditing}
						type='text'
						placeholder='Address'
					/>
					<SuiInput
						value={city}
						onChange={(evt) => onChange('city', evt.target.value)}
						disabled={!isEditing}
						type='text'
						placeholder='City'
						width='90px'
					/>
					<SuiInput
						value={state}
						onChange={(evt) => onChange('state', evt.target.value)}
						disabled={!isEditing}
						type='text'
						placeholder='State'
						width='45px'
					/>
					<SuiInput
						value={zip}
						onChange={(evt) => onChange('zip', evt.target.value)}
						disabled={!isEditing}
						type='text'
						placeholder='Zip'
						width='60px'
					/>
				</Box>
			</div>

			<div>
				<SuiTypography gutterBottom>Hours</SuiTypography>
				<Box
					sx={{
						pl: '0.5em',
						display: 'flex',
						flexWrap: 'wrap',
						gap: '1em',
						mb: '2em',
						'& label': {
							fontWeight: '500',
							color: 'rgb(52, 71, 103)',
						},
					}}
				>
					{Object.keys(hours).map((day, i) => (
						<Box key={i} sx={{ display: 'flex', gap: '0.6em' }}>
							<Box component='label' sx={{ width: '9ch' }}>
								{day}
							</Box>
							<SuiInput
								type='time'
								disabled={!isEditing}
								value={hours[day].from}
								onChange={(evt) =>
									onChange('hours', evt.target.value, day, 'from')
								}
							/>
							<label>to</label>
							<SuiInput
								type='time'
								disabled={!isEditing}
								value={hours[day].to}
								onChange={(evt) =>
									onChange('hours', evt.target.value, day, 'to')
								}
							/>
						</Box>
					))}
				</Box>
			</div>

			{isEditing && (
				<Box display='flex' justifyContent='end'>
					<Button
						onClick={() => {
							onSave();
							setIsEditing(false);
						}}
						size='small'
						variant='contained'
						color='primary'
						sx={{ mr: '1em', textTransform: 'capitalize' }}
					>
						Save
					</Button>
					<Button
						onClick={() => {
							setIsEditing(false);
							onCancel();
						}}
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
			)}
		</>
	);
}
