import React from 'react';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Footer from 'components/Footer/Footer';
import Typography from '@mui/material/Typography';
import Header from 'components/Nav/Header';
import { PageTitle, Banner } from 'components/styled/Page';

const Section = styled.section`
	max-width: 1000px;
	margin: 0 auto;
	text-align: left;

	.MuiTypography-root {
		margin-bottom: 1em;
	}
`;

const Email = styled.a.attrs((props) => ({
	href: `mailto:${props.children}`,
}))`
	color: #1f5ea3;
	font-weight: bold;
`;

export default function Partnerships() {
	return (
		<>
			<Header />

			<Banner>
				<PageTitle>Partnerships</PageTitle>
			</Banner>

			<Section>
				<Container
					sx={{
						'&.MuiContainer-root': {
							maxWidth: '800px',
						},
						pt: '4em',
						pb: '0',
					}}
				>
					<Typography variant='body1'>
						digpads is focused on providing independent landlords with high
						quality news, research, advice, collaboration, property management
						tools, and more business process and project management tools to
						help them run and grow their rental businesses.
					</Typography>

					<Typography variant='body1'>
						We are always open to hearing about new partnership opportunities
						with third parties.
					</Typography>

					<Typography variant='body1'>
						Please email us at <Email>info@digpads.com</Email> for more
						information.
					</Typography>
				</Container>
			</Section>
			<Footer />
		</>
	);
}
