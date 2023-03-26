import React from 'react';
import { SectionTitle } from '../../styled/EditProfile';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

export default function MyDesiredRental({
	desiredRental,
	onChange,
	onSave,
	onCancel,
}) {
	const [isEditing, setIsEditing] = React.useState(false);

	return (
		<section className='my-desired-rental'>
			<Box display='flex' justifyContent='space-between'>
				<SectionTitle>My Desired Rental</SectionTitle>

				{!isEditing && (
					<IconButton
						sx={{ mb: '10px', background: '#e4e5e5' }}
						onClick={() => setIsEditing(true)}
						size='small'
						aria-label='edit projects, photos &amp; videos'
					>
						<EditIcon />
					</IconButton>
				)}
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '0.5em',
					mb: '2em',
					'& .col-4': { width: '32%' },
					'& .w-full': { width: '100%' },
				}}
			>
				<input
					disabled={!isEditing}
					value={desiredRental?.description || ''}
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					name='description'
					type='text'
					className='w-full'
					placeholder='Description'
				/>

				<label htmlFor='can-afford-from'>I can afford:</label>
				<input
					disabled={!isEditing}
					id='can-afford-from'
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					value={desiredRental?.canAffordFrom || 0}
					name='canAffordFrom'
					type='number'
					placeholder='$0,000.00'
					min='1'
					step='any'
				/>

				<Box component='span' sx={{ mx: '1rem' }}>
					to
				</Box>

				<input
					disabled={!isEditing}
					id='can-afford-to'
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					value={desiredRental?.canAffordTo || 0}
					name='canAffordTo'
					type='number'
					placeholder='$0,000.00'
					min='1'
					step='any'
				/>
				<input
					type='text'
					value={desiredRental?.neighborhood || ''}
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					name='neighborhood'
					disabled={!isEditing}
					className='col-4'
					placeholder='Neighborhood'
				/>
				<input
					type='text'
					value={desiredRental?.city || ''}
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					name='city'
					disabled={!isEditing}
					className='col-4'
					placeholder='City'
				/>
				<input
					disabled={!isEditing}
					value={desiredRental?.state || ''}
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					name='state'
					type='text'
					className='col-4'
					placeholder='State'
				/>
				<input
					type='text'
					value={desiredRental?.rentalType || ''}
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					name='rentalType'
					disabled={!isEditing}
					className='col-4'
					placeholder='Rental Type'
				/>
				<input
					disabled={!isEditing}
					min='1'
					name='bedroms'
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					placeholder='Bedrooms'
					type='number'
					value={desiredRental?.bedroms || 0}
					className='col-4'
				/>
				<input
					disabled={!isEditing}
					min='1'
					name='bathrooms'
					onChange={(evt) =>
						onChange(evt.target.name, evt.target.value)
					}
					placeholder='Bathrooms'
					type='number'
					value={desiredRental?.bathrooms || 0}
					className='col-4'
				/>
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
		</section>
	);
}
