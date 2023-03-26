import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

function Credential() {
	return (
		<Box bgcolor='#f9f9f9' p={2} borderRadius='8px' mb={2}>
			<Typography marginBottom='16px'>
				{' '}
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a
				galley.
			</Typography>
			<Box
				bgcolor='#f9f9f9'
				border='1px dotted black'
				pt={2}
				px={2}
				borderRadius='8px'
			>
				<Box mb={2}>
					<Typography component='h3' fontWeight='bold'>
						Headquarters
					</Typography>
					<Typography variant='body1'>
						888 Brannan St, San Francisco, CA 94103, United States
					</Typography>
				</Box>
				<Grid container>
					<Grid item xs={6}>
						<Box mb={2}>
							<Typography component='h3' fontWeight='bold'>
								Founded
							</Typography>
							<Typography variant='body1'>2020</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box mb={2}>
							<Typography component='h3' fontWeight='bold'>
								Ownership
							</Typography>
							<Typography variant='body1'>fitbit.com</Typography>
						</Box>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={6}>
						<Box mb={2}>
							<Typography component='h3' fontWeight='bold'>
								Employees
							</Typography>
							<Typography variant='body1'>500+</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box mb={2}>
							<Typography component='h3' fontWeight='bold'>
								Revenue
							</Typography>
							<Typography variant='body1'>
								Revenue Yearly $3,78,00cr
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default Credential;
