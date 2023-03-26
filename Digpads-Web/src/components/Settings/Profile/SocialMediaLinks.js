import React from 'react';
import { Box } from '@mui/material';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';

import { Fieldset } from '../../styled/EditProfile';

function SocialMediaLink({ disabled, label, to, onChange }) {
	return (
		<Fieldset>
			<label htmlFor={label}>{label}</label>

			<SuiInput
				disabled={disabled}
				onChange={onChange}
				name={label}
				value={to}
				id={label}
				type='url'
			/>
		</Fieldset>
	);
}

export default function SocialMediaLinks({
	links,
	onChange,
	onSave,
	onCancel,
}) {
	const [isEditing, setIsEditing] = React.useState(false);

	// show placeholder links if no links provided
	if (links == null || links.length === 0) {
		links = placeholderLinks;
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onSave();
		setIsEditing(false);
	};

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<SuiTypography variant='h2' gutterBottom>
					Social Media Links
				</SuiTypography>

				{!isEditing && (
					<IconButton
						sx={{ mb: '10px', background: '#e4e5e5', alignSelf: 'center' }}
						onClick={() => setIsEditing(true)}
						size='small'
						aria-label='edit projects, photos &amp; videos'
					>
						<EditIcon />
					</IconButton>
				)}
			</Box>

			<form id='links-form' onSubmit={handleSubmit}>
				{links.map((lnk, i) => (
					<SocialMediaLink
						key={i}
						disabled={!isEditing}
						label={lnk.label}
						to={lnk.to}
						onChange={(evt) => onChange(i, evt.target.value)}
					/>
				))}
			</form>

			{isEditing && (
				<Box display='flex' justifyContent='end'>
					<Button
						type='submit'
						form='links-form'
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

export const placeholderLinks = [
	{
		label: 'Facebook',
		to: '',
	},
	{
		label: 'Twitter',
		to: '',
	},
	{
		label: 'LinkedIn',
		to: '',
	},
	{
		label: 'Gab',
		to: '',
	},
	{
		label: 'Truth Social',
		to: '',
	},
	{
		label: 'Nextdoor',
		to: '',
	},
];
