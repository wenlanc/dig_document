import React from 'react';
import { SectionTitle } from '../../styled/EditProfile';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Box } from '@mui/material';
import SuiTypography from 'components/SuiTypography';

import SuiInput from 'components/SuiInput';

export default function AboutYou({ aboutYouText, onChange, onSave, onCancel }) {
	const [isEditing, setIsEditing] = React.useState(false);

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<SuiTypography variant='h2' gutterBottom>
					About You
				</SuiTypography>

				{!isEditing && (
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

			<SuiInput
				value={aboutYouText}
				multiline
				onChange={(evt) => onChange(evt.target.value)}
				disabled={!isEditing}
				sx={{ pl: '0.5em', width: '100%', mb: '1em' }}
				rows='5'
			/>

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
