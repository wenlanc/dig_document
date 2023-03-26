import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 150px;
	background: ${(props) =>
		Boolean(props.iseven)
			? 'rgba(196, 196, 196, 1)'
			: 'rgba(49, 168, 206, 1)'};
	color: ${(props) => (Boolean(props.iseven) ? '#000 !important' : '#fff')};
`;

const StyledTitle = styled(Typography)`
	font-weight: bold;
	font-size: 20px;
`;

function CardListReports({ index, children }) {
	const [increment, setIncrement] = useState(0);

	useEffect(() => {
		if (index > 3 && index < 8) {
			setIncrement(1);
		}
	}, []);

	return (
		<Grid key={index} item xs={12} sm={6} md={6} lg={3}>
			<StyledCard iseven={(index + increment) % 2 === 1}>
				<StyledTitle align='center'>{children}</StyledTitle>
			</StyledCard>
		</Grid>
	);
}

export default CardListReports;
