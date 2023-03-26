import React from 'react';
import { Container, Typography, Grid, Link } from '@mui/material';
import styled from 'styled-components';
import Header from 'components/Nav/Header';

const StyledContainer = styled(Container)`
	max-width: 650px;
`;

const StyledGrid = styled(Grid)`
	text-align: center;
	margin-top: 100px;
`;
export default function ArticleNotFound() {
	return (
		<StyledContainer>
			<Header />
			<Grid container>
				<StyledGrid item xs={12}>
					<Typography variant='h3'>Article Not Found!</Typography>
				</StyledGrid>
				<StyledGrid item xs={12}>
					<Typography>
						<Link component='button'>
							Click here for other Articles.
						</Link>
					</Typography>
				</StyledGrid>
			</Grid>
		</StyledContainer>
	);
}
