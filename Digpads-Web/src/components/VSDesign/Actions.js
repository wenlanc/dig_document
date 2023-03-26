import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from 'styled-components';

const StyledArrowForwardIcon = styled(ArrowForwardIcon)`
	color: #fff;
	height: 64px;
	width: 64px;
	font-weight: bold;
`;

function Actions({ color }) {
	return (
		<Box bgcolor='#fff' px={3} py={2} borderRadius='8px'>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
			>
				<Typography
					color={color}
					variant='h5'
					component='h2'
					fontWeight='bold'
				>
					Order Reports
					<br /> from Company X Now
				</Typography>
				<IconButton
					onClick={() => {
						alert('Order Reports from Company X Now');
					}}
					style={{ background: '#008f00' }}
				>
					<StyledArrowForwardIcon />
				</IconButton>
			</Box>
		</Box>
	);
}

export default Actions;
