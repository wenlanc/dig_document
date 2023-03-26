import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';

function Analysis() {
	return (
		<Container>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<img
						style={{ width: '100%', height: 'auto' }}
						src='/images/Path 3312.png'
						alt='Analysis'
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box py={20}>
						<Typography
							fontWeight='bold'
							color='primary'
							variant='h5'
							component='h2'
							gutterBottom
						>
							About
						</Typography>
						<Box display='flex'>
							<img
								style={{
									width: 24,
									height: 24,
								}}
								src='/digpads_large_shovel_only.png'
								alt='Analysis'
							/>

							<Typography
								fontWeight='bold'
								variant='h5'
								component='p'
								marginBottom='24px'
							>
								digpads&nbsp;
							</Typography>
							<Typography
								fontWeight='bold'
								variant='h5'
								component='p'
								marginBottom='24px'
								color='primary'
							>
								analysis
							</Typography>
						</Box>

						<Typography marginBottom='24px'>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s,
							when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap
							into electronic typesetting, remaining essentially
							unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum
							passages, and more recently with desktop publishing
							software like Aldus PageMaker including versions of
							Lorem Ipsum.
						</Typography>
						<Typography marginBottom='24px'>
							Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s,
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Analysis;
