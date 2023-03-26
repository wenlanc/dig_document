import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
	height: 350px;
	margin-top: 24px;
	cursor: pointer;

	@media (max-width: 410px) {
		height: 300px;
	}
`;

const StyledCardMedia = styled(CardMedia)`
	height: 230px;
	@media (max-width: 410px) {
		height: 180px;
	}
`;

const StyledCardHeader = styled(CardHeader)`
	@media (max-width: 410px) {
		.MuiCardHeader-title {
			font-size: 1rem;
		}
	}
`;

export default function ServiceGuidesCard({ title, description, image, href }) {
	const truncate = (source, size) => {
		const index = source.indexOf(' ', size);
		if (source.length < size || index < 0) return source;
		else return source.slice(0, index) + ' ...';
	};

	const navigate = useNavigate();

	return (
		<Grid item xs={12} sm={6} md={4}>
			<StyledCard
				onClick={() => {
					navigate(href);
				}}
			>
				<CardContent>
					{description && (
						<Typography variant='body2' color='textSecondary'>
							{description}
						</Typography>
					)}
				</CardContent>

				<StyledCardMedia image={image} title={title} />

				<StyledCardHeader title={truncate(title, 40)} />
			</StyledCard>
		</Grid>
	);
}
