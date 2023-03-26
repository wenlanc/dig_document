import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import styled from 'styled-components';

const StyledUl = styled.ul`
	margin-bottom: 0;

	li {
		color: #0063c8;
		font-weight: 400;
	}
`;

const StyledAvatar = styled(Avatar)`
	height: 96px;
	width: 96px;
	margin-right: 24px;
`;

const StyledCircleIcon = styled(CircleIcon)`
	color: #0063c8;
	margin-right: 12px;
	height: 16px;
	width: 16px;
`;

function ReportsOffered({ lists }) {
	return (
		<Box bgcolor='#fff' p={2} borderRadius='8px' mb={2}>
			<Box display='flex' mb={3}>
				<StyledAvatar variant='rounded' />
				<Box>
					<Typography
						variant='h5'
						component='h2'
						fontWeight='bold'
						color='#008f00'
					>
						Reports Offered
					</Typography>
					<Typography>
						Lorem Ipsum is simply dummy text of the printing and
						typesetting industry Lorem Ipsum has been the.
					</Typography>
				</Box>
			</Box>
			<Box>
				<StyledUl>
					{lists.map((list, index) => (
						<Box
							key={index}
							display='flex'
							alignItems='center'
							mb={index !== lists.length - 1 ? 1 : 0}
						>
							<StyledCircleIcon />
							<li key={index}>{list}</li>
						</Box>
					))}
				</StyledUl>
			</Box>
		</Box>
	);
}

export default ReportsOffered;
