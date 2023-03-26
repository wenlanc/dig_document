import React from 'react';
import { Button, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';

import { SectionTitle } from '../../styled/EditProfile';

export default function BusinessDetails({
	yearFounded = '',
	numEmployees = '',
	licenses = '',
	headquarters = '',
	ownership = '',
	trainingEducation = '',
	onSave,
	onCancel,
	onChange,
}) {
	const [isEditing, setIsEditing] = React.useState(false);

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				{onChange && (
					<SuiTypography variant='h2' gutterBottom>
						Business Details
					</SuiTypography>
				)}

				{onChange && !isEditing && (
					<IconButton
						sx={{ mb: '10px', background: '#e4e5e5' }}
						onClick={() => setIsEditing(true)}
						size='small'
						aria-label='edit business details'
					>
						<EditIcon />
					</IconButton>
				)}
			</Box>

			<Box
				sx={{
					pl: '0.5em',
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.5em',
					rowGap: '1em',
					mb: '1.5em',
					'& span': {
						width: '18ch',
						flexShrink: '0',
						display: 'inline-block',
					},
					'& input': {
						width: '120px',
					},
					'& label': {
						display: 'flex',
						alignItems: 'center',
						fontWeight: '500',
						color: 'rgb(52, 71, 103)',
					},
				}}
			>
				<label>
					<span>Year Founded</span>
					<SuiInput
						type='number'
						disabled={!isEditing}
						value={yearFounded}
						onChange={(evt) => onChange('yearFounded', evt.target.value)}
					/>
				</label>
				<label>
					<span>Headquarters</span>
					<SuiInput
						type='text'
						disabled={!isEditing}
						value={headquarters}
						onChange={(evt) => onChange('headquarters', evt.target.value)}
					/>
				</label>
				<label>
					<span># of Employees</span>
					<SuiInput
						type='number'
						disabled={!isEditing}
						value={numEmployees}
						onChange={(evt) => onChange('numEmployees', evt.target.value)}
					/>
				</label>
				<label>
					<span>Ownership</span>
					<SuiInput
						type='text'
						disabled={!isEditing}
						value={ownership}
						onChange={(evt) => onChange('ownership', evt.target.value)}
					/>
				</label>
				<label>
					<span>Licenses</span>
					<SuiInput
						type='text'
						disabled={!isEditing}
						value={licenses}
						onChange={(evt) => onChange('licenses', evt.target.value)}
					/>
				</label>
				<label>
					<span>Training/Education</span>
					<SuiInput
						type='text'
						disabled={!isEditing}
						value={trainingEducation}
						onChange={(evt) => onChange('trainingEducation', evt.target.value)}
					/>
				</label>
			</Box>

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
