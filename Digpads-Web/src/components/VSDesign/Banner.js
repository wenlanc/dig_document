import React from 'react';
import {
	Box,
	Typography,
	Avatar,
	Grid,
	Container,
	Paper,
	Hidden,
} from '@mui/material';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
	margin-left: auto;
	height: 80px;
	width: 80px;
	// margin-bottom: 8px;
`;

const Heading = styled(Typography)`
	@media screen and (max-width: 600px) {
		font-size: 24px;
	}
	@media screen and (max-width: 900px) {
		font-size: 30px;
	}
`;

const Description = styled(Typography)`
	@media screen and (max-width: 600px) {
		font-size: 20px;
	}

	@media screen and (max-width: 900px) {
		font-size: 24px;
	}
`;

function Banner() {
	return (
		<Box
			height={300}
			width='100%'
			mb={13}
			borderBottom='0.25px solid #a7bbe2'
		>
			<Container>
				<Box display='flex' justifyContent='space-between' mb={10}>
					<Box>
						<Heading
							variant='h3'
							component='h1'
							color='#0063c8'
							fontWeight='bold'
							marginBottom='4px'
						>
							Company X Vs Company Y<br /> for Tenant Screening
							Services
						</Heading>
						<Description variant='h4' component='p'>
							Company X Vs Company Y
						</Description>
					</Box>
					<Box>
						<StyledAvatar
							src='/images/mv9almji.png'
							variant='rounded'
						/>
						<Typography
							style={{ fontWeight: 'bold' }}
							align='right'
						>
							Andrew Polacek
						</Typography>
						<Typography align='right' variant='body1'>
							Author
						</Typography>
					</Box>
				</Box>
				<Box mb={2}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<Box
								py={3.6}
								bgcolor='#008f00'
								height='100%'
								borderRadius='8px'
								boxShadow='0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
							>
								<Typography
									align='center'
									color='#fff'
									fontWeight='bold'
									fontSize='20px'
								>
									FIND MY TENANT
								</Typography>
								<Typography
									align='center'
									fontSize='20px'
									color='#fff'
								>
									SCREENING PROVIDER
								</Typography>
							</Box>
						</Grid>
						<Hidden mdDown>
							<Grid item xs={12} md={8}>
								<Paper style={{ borderRadius: 8, padding: 24 }}>
									<Typography
										fontWeight='500'
										variant='body1'
									>
										{' '}
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry. Lorem
										Ipsum has been the industry's standard
										dummy printer took a galley of type and
										scrambled it to make a type specimen
										book.
									</Typography>
								</Paper>
							</Grid>
						</Hidden>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
}

export default Banner;
