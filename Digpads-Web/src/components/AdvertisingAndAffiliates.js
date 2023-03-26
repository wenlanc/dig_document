import React from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import Header from 'components/Nav/Header';
import { PageTitle, Banner } from 'components/styled/Page';
import Footer from 'components/Footer/Footer';

const Page = styled.div`
	.MuiTypography-root .MuiContainer-root {
		margin-bottom: 1em;
	}

	.MuiContainer-root {
		max-width: 800px;
	}
`;

const Email = styled.a.attrs((props) => ({
	href: `emailto: ${props.to}`,
	children: props.to,
}))`
	color: #1f5ea3;
	font-weight: bold;
`;

export default function AdvertisingAndAffiliates() {
	return (
		<>
			<Page>
				<Header />

				<Banner>
					<PageTitle>Advertising and Affiliates</PageTitle>
				</Banner>

				<Container sx={{ py: 2 }}>
					<Typography variant='body1' sx={{ mb: 2 }}>
						digpads core audience of users includes landlords, real estate
						investors, and all sorts of professional tied to the real estate and
						finance industry. digpads users are an aggregated group for select
						marketers to target with relevant products and services.
					</Typography>

					<Typography variant='body1'>
						To inquire about advertising and affiliate marketing relationships,
						please contact us at <Email to='info@digpads.com' />
					</Typography>
				</Container>
			</Page>
			<Footer />
		</>
	);
}
