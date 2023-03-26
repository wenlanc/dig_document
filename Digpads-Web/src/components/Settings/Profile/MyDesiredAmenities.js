import React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SectionTitle } from '../../styled/EditProfile';

export default function MyDesiredAmenities({ amenities, onChangeAmenity }) {
	const addAmenityRef = React.useRef(null);

	return (
		<section className='desired-amenities'>
			{/* == Desired Amenities == */}
			<SectionTitle>Desired Amenities</SectionTitle>

			<Box sx={{ display: 'flex', gap: '1em', mb: '1em' }}>
				<input
					type='text'
					ref={addAmenityRef}
					placeholder='Add amenity'
				/>
				<Button
					variant='contained'
					color='primary'
					sx={{ textTransform: 'capitalize' }}
					onClick={() => {
						const amenity = addAmenityRef.current?.value;
						if (amenity === '') alert('Amenity cannot be empty');
						onChangeAmenity('add', amenity);
						addAmenityRef.current.value = '';
					}}
				>
					Add
				</Button>
			</Box>

			<Paper
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					listStyle: 'none',
					border: '1px solid black',
					p: 2,
					m: 0,
					gap: '5px',
					mb: '1em',
				}}
				component='ul'
			>
				{amenities?.map((amenity, i) => {
					return (
						<li key={i}>
							<Chip
								label={amenity}
								onDelete={() =>
									onChangeAmenity('delete', amenity, i)
								}
							/>
						</li>
					);
				})}
			</Paper>
		</section>
	);
}
