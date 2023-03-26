import React from 'react';
import { FormControlLabel, RadioGroup, Radio, Stack } from '@mui/material';

export default function ReviewsOptions({ onOptionChange }) {
	const handleChange = (evt) => {
		const option = evt.target.value; // 'all reviews' or 'select-reviews'
		onOptionChange(option);
	};

	return (
		<RadioGroup
			aria-label='select reviews'
			name='use-reviews'
			defaultValue='all-reviews'
			onChange={handleChange}
			sx={{ '& .MuiFormControlLabel-root': { marginLeft: 0 } }}
		>
			<Stack
				className='label-group'
				direction='row'
				spacing={2}
				mb={1}
				alignItems='center'
			>
				<FormControlLabel
					value='all-reviews'
					control={<Radio />}
					label='Use all reviews (recommended)'
				/>
				<small>
					<a
						href='https://digpads.com/article/why-perfect-ratings-and-reviews-is-bad'
						target='_blank'
						rel='noreferrer'
					>
						Why?
					</a>
				</small>
			</Stack>

			<FormControlLabel
				value='select-reviews'
				control={<Radio />}
				label='Select Reviews'
			/>
		</RadioGroup>
	);
}
