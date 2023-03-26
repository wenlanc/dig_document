import React from 'react';
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Box,
} from '@mui/material';
import styled from 'styled-components';

const Heading = styled(Typography)`
	font-weight: bold;
	font-size: 16px;
`;

const StyleBadge = styled(Box)`
	background: rgba(0, 99, 200, 0.6);
	position: absolute;
	bottom: 16px;
	left: 24px;
	font-weight: bold;
	color: #fff;
	padding: 8px 12px;
`;

function CardOurListing({ title, description, image, status }) {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card
				style={{ cursor: 'pointer', position: 'relative' }}
				sx={{ maxWidth: 320 }}
			>
				<div style={{ position: 'relative' }}>
					<CardMedia
						component='img'
						height='140'
						width='100%'
						image={`/images/${image}`}
					/>
					<StyleBadge>{status}</StyleBadge>
				</div>
				<CardContent>
					<Heading gutterBottom variant='h6' component='h3'>
						{title}
					</Heading>
					<Typography variant='body2' color='text.secondary'>
						{description}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default CardOurListing;
