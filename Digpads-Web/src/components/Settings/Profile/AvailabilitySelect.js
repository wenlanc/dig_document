import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const levelsOfAvailabilty = [
	'Same Day',
	'Within Week',
	'Few Weeks Out',
	'Month Out',
	'More than a Month Out',
];

export default function AvailabilitySelect({ currentAvailaility, onChange }) {
	return (
		<Stack
			spacing={3}
			direction='row'
			sx={{ mb: '2em' }}
			alignItems='flex-end'
		>
			<Box
				component='label'
				sx={{ fontSize: '1.5rem' }}
				color='primary.main'
				id='availability-select-label'
				htmlFor='availability-select'
			>
				Level of Avilability
			</Box>

			<FormControl>
				<Select
					sx={{ width: '200px' }}
					id='availability-select'
					value={currentAvailaility || ''}
					onChange={(evt) => {
						onChange?.(evt.target.value);
					}}
				>
					{levelsOfAvailabilty.map((level, i) => (
						<MenuItem value={level} key={i}>
							{level}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
}
