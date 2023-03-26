import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { StyledModal } from '../styled/ReviewsManagement';

export default function ReviewCollectionEmbeddedLink({ link = '' }) {
	return (
		<StyledModal>
			<Box mb={4} clone>
				<Typography paragraph>
					Awesome! Your review collection link is pasted in below. You
					can email this to people, include this on your website, or
					use it in person with people on your computer, tablet, or
					smart phone to collect reviews. Be sure to check out how
					touser the reviews on your website and elsewhere in the
					Reviews section of the digpads site!
				</Typography>
			</Box>

			<Box mb={2}>
				<TextField
					value={link ? link : 'Embedded Link Goes Here'}
					fullWidth
				/>
			</Box>

			<Box fontStyle='italic' color='#3240B9' clone>
				<Typography align='right'>
					Instructions on how to embed link
				</Typography>
			</Box>
		</StyledModal>
	);
}
