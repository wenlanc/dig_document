import React from 'react';
import { Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

export default function StarRating({
	rating,
	showLabel = true,
	readOnly = true,
}) {
	return (
		<div className='star-rating'>
			<Box
				component='label'
				display='flex'
				justifyContent='center'
				alignItems='center'
				mb='17px'
			>
				{showLabel && (
					<Typography
						variant='caption'
						style={{ marginRight: '20px', fontWeight: 'bold' }}
					>
						Star Rating:
					</Typography>
				)}

				<Rating
					style={{ color: '#F8E00D', fontSize: '3rem' }}
					name='half-rating-read'
					defaultValue={rating}
					precision={0.5}
					size='large'
					{...(readOnly ? { readOnly: true } : { readOnly: false })}
				/>
			</Box>
		</div>
	);
}
