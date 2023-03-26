import React from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Header from 'components/Nav/Header';
import Banner from 'components/VSDesign/Banner';
import FitbitCard from 'components/VSDesign/FitbitCard';
import Conclusion from 'components/VSDesign/Conclusion';
import Analysis from 'components/VSDesign/Analysis';
import styled from 'styled-components';

const Root = styled(Box)`
	.css-1s3enko-MuiPaper-root-MuiAppBar-root {
		background-color: #f3f6fe;
	}
`;

function VSdesign() {
	return (
		<div>
			<Root bgcolor='#f3f6fe'>
				<Header />
				<Banner />
			</Root>
			<Container>
				<Box
					display='flex'
					bgcolor='transparent'
					justifyContent='flex-end'
					mb={3}
				>
					<Button
						variant='contained'
						style={{
							textTransform: 'unset',
							background: '#eb6600',
						}}
						endIcon={<ArrowForward />}
						onClick={() => {
							alert('See other comparisons');
						}}
					>
						See other comparisons
					</Button>
				</Box>
				<Grid container spacing={3} marginBottom='80px'>
					<FitbitCard
						colorHeader='#0063c8'
						colorBody='#e1eefc'
						colorActions='#0063c8'
					/>
					<FitbitCard
						colorHeader='#7a7a7a'
						colorBody='#e7e7e7'
						colorActions='#000'
					/>
				</Grid>
			</Container>
			<Conclusion />
			<Analysis />
		</div>
	);
}

export default VSdesign;
