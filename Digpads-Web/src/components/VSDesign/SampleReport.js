import React from 'react';
import { Box, Avatar, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledAvatar = styled(Avatar)`
	width: 100%;
	height: 240px;
	border-top: 1px dotted black;
	border-bottom: 1px dotted black;
`;

function SampleReport({ lists }) {
	return (
		<Box bgcolor='#fff' p={2} borderRadius='8px' mb={2}>
			<Typography
				variant='h5'
				component='h2'
				fontWeight='bold'
				color='#008f00'
				gutterBottom
			>
				Sample Report from X company
			</Typography>
			<Grid container spacing={2}>
				{lists.map((list, index) => (
					<Grid item xs={12} sm={6} key={index}>
						<StyledAvatar variant='rounded' src={list} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default SampleReport;
