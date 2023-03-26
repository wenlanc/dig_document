import React from 'react';
import { IconButton, Button, CircularProgress, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';

import { SectionTitle } from '../../styled/EditProfile';

export default function ContactInfo({
	logo,
	onLogoChange,
	name = '',
	address = '',
	city = '',
	state = '',
	zip = '',
	phone = '',
	email = '',
	onChange,
	onSave,
	onCancel,
}) {
	const [isEditing, setIsEditing] = React.useState(false);

	const onImageChange = (event) => {
		if (event.target.files[0]) {
			let file = event.target.files[0];
			onLogoChange(file);
		} else {
			alert(`You haven't selected a logo`);
		}
	};

	return (
		<>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				{onChange && (
					<SuiTypography variant='h2' gutterBottom>
						Contact info
					</SuiTypography>
				)}

				{onChange && !isEditing && (
					<IconButton
						sx={{ mb: '10px', background: '#e4e5e5' }}
						onClick={() => setIsEditing(true)}
						size='small'
						aria-label='edit contact information'
					>
						<EditIcon />
					</IconButton>
				)}
			</Box>

			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
				<Box
					component='label'
					htmlFor={onChange && 'upload-logo-input'}
					sx={{
						width: '150px',
						height: '96px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexShrink: '0',
						border: '1px solid black',
						fontWeight: 'bold',
						cursor: 'pointer',
						'& img': {
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						},
					}}
				>
					{logo ? (
						logo.isUploading ? (
							<CircularProgress
								sx={{ width: '76px', height: '43px' }}
								color='primary'
							/>
						) : (
							<img
								src={typeof logo === 'object' ? logo.src : logo}
								alt='logo'
							/>
						)
					) : (
						<span>{onChange ? 'Upload Logo' : 'No logo'}</span>
					)}
				</Box>

				<Box
					component='input'
					type='file'
					id='upload-logo-input'
					onChange={onImageChange}
					accept='image/*'
					display='none'
				/>

				<Box
					sx={{
						maxWidth: '340px',
						display: 'flex',
						flexWrap: 'wrap',
						gap: '1em',
						mb: '1em',
						'& label': {
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						},
						'& span': {
							fontSize: '14px',
							flexShrink: '0',
							whiteSpace: 'nowrap',
							width: '22ch',
							fontWeight: '500',
							color: 'rgb(52, 71, 103)',
						},
						'& .full': {
							width: '200px',
						},
					}}
				>
					<label htmlFor='name'>
						<span>Company/Person Name:</span>
						<SuiInput
							id='name'
							type='text'
							value={name}
							className='full'
							placeholder='Name'
							disabled={!isEditing}
							onChange={(evt) => onChange('name', evt.target.value)}
						/>
					</label>

					<label htmlFor='address'>
						<span>Company/Person Address:</span>
						<SuiInput
							disabled={!isEditing}
							type='text'
							id='address'
							value={address}
							onChange={(evt) => onChange('address', evt.target.value)}
							placeholder='Address'
							className='full'
						/>
					</label>

					<Box
						sx={{
							display: 'flex',
							gap: '10px',
							'& input': { maxWidth: '107px' },
						}}
					>
						<SuiInput
							disabled={!isEditing}
							type='text'
							value={city}
							onChange={(evt) => onChange('city', evt.target.value)}
							placeholder='City'
						/>
						<SuiInput
							disabled={!isEditing}
							value={state}
							onChange={(evt) => onChange('state', evt.target.value)}
							type='text'
							placeholder='State'
						/>
						<SuiInput
							disabled={!isEditing}
							value={zip}
							onChange={(evt) => onChange('zip', evt.target.value)}
							type='text'
							placeholder='Zip'
						/>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					'& label': { display: 'flex', alignItems: 'center', mb: '1em' },
					'& span': {
						display: 'inline-block',
						flexShrink: '0',
						minWidth: '28ch',
						fontSize: '14px',
						whiteSpace: 'nowrap',
						width: '22ch',
						fontWeight: '500',
						color: 'rgb(52, 71, 103)',
					},
					'& input': {
						width: '160px',
					},
					'& .MuiInputBase-root': {
						width: '260px !important',
					},
				}}
			>
				<label>
					<span>Company/Person Phone:</span>
					<SuiInput
						disabled={!isEditing}
						value={phone}
						onChange={(evt) => onChange('phone', evt.target.value)}
						type='tel'
					/>
				</label>

				<label>
					<span>Company/Person Email Address:</span>
					<SuiInput
						disabled={!isEditing}
						value={email}
						onChange={(evt) => onChange('email', evt.target.value)}
						type='email'
					/>
				</label>
			</Box>

			{isEditing && (
				<Box display='flex' justifyContent='end'>
					<Button
						onClick={() => {
							setIsEditing(false);
							onSave();
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
