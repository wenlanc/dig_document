import React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function MyNeighborhoods({ neighborhoods, onDelete, onAdd }) {
	const addNeighborhoodRef = React.useRef(null);

	return (
		<section className='my-neighborhoods'>
			{onAdd && (
				<Box sx={{ display: 'flex', gap: '1em', mb: '1em' }}>
					<input
						type='text'
						ref={addNeighborhoodRef}
						placeholder='add neightborhood'
					/>

					<Button
						component='button'
						onClick={() => {
							onAdd(addNeighborhoodRef.current?.value);

							if (addNeighborhoodRef.current) {
								addNeighborhoodRef.current.value = '';
							}
						}}
						variant='contained'
						sx={{ textTransform: 'capitalize' }}
					>
						Add
					</Button>
				</Box>
			)}

			<Paper
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					listStyle: 'none',
					p: 2,
					gap: '5px',
					m: 0,
				}}
				component='ul'
			>
				{neighborhoods?.map((neighborhood, i) => {
					return (
						<li key={i}>
							<Chip
								label={neighborhood}
								onDelete={onDelete ? () => onDelete(i) : undefined}
							/>
						</li>
					);
				})}
			</Paper>
		</section>
	);
}
