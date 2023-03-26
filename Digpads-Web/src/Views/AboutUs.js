import React from 'react';
import { Container, Typography, Stack } from '@mui/material';
import styled from 'styled-components';
import Header from 'components/Nav/Header';
import { PageTitle, Banner, SuiPageTitle } from 'components/styled/Page';
import Footer from 'components/Footer';

const Section = styled.section`
	& .MuiContainer-root {
		max-width: 800px;
	}
`;

const Email = styled.a.attrs((props) => ({
	href: `mailto:${props.children}`,
}))`
	display: block;
	color: #1f5ea3;
	font-weight: bold;
`;

export default function AboutUs() {
	return (
		<>
			<Section>
				<Header />

				<Banner>
					<PageTitle>About Us</PageTitle>
				</Banner>

				<Container>
					<Typography
						variant='h3'
						color='primary'
						align='center'
						sx={{
							fontSize: '40px',
							fontWeight: 600,
							mt: 4,
							mb: 4,
							lineHeight: '1.5',
						}}
					>
						digpads is dedicated to the success of the independent landlord.
					</Typography>

					<SuiPageTitle component='h2' sx={{ mb: '0.3em' }}>
						About Us
					</SuiPageTitle>

					<Stack spacing={2} component='article' mb={6}>
						<Typography variant='body1' component='p'>
							digpads was founded in 2020 during the Covid 19 pandemic to
							provide free and paid knowledge, research, collaboration, property
							management tools, and access to services for independent landlords
							in the United States. Being involved in real estate investing and
							landlords themselves, the founders saw a market that did not
							adequately consider or provide for the needs of independent
							landlords in a rapidly changing residential real estate market
							that increasingly utilizes technology for nearly every business
							transaction need.In addition, the demographic changes of who is a
							landlord continue to drift towards those more inclined to utilize
							technology for all their business needs than the older generations
							typically do or will.
						</Typography>

						<Typography variant='body1' component='p'>
							digpads' goal is to make independent landlord’s lives easier in
							every way at every stage of their business growth and for every
							business engagement and transaction they must engage in while
							operating their business. Part of achieving this goal is to bring
							tenants onboard our system as well to be a partner in creating a
							platform that makes all participants in the rental industry’s
							lives easier.
						</Typography>

						<Typography variant='body1' component='p'>
							digpads’ long-term mission is to evolve to be a one-stop shop for
							all landlord and tenant needs, reducing inefficiencies, increasing
							trust in relationships, and maximizing value for all parties. We
							welcome all input and ideas for new products and services to
							improve your landlord or tenant experience.
						</Typography>

						<Email>info@digpads.com</Email>
					</Stack>

					<article>
						<SuiPageTitle component='h2' sx={{ mb: '0.3em' }}>
							Leadership
						</SuiPageTitle>

						<Typography
							variant='body1'
							component='h2'
							sx={{
								color: 'rgb(52, 71, 103)',
								fontSize: '18px',
								fontWeight: 'bold',
							}}
						>
							Andrew Polacek, Chief Executive Officer and Founder
						</Typography>

						<Stack spacing={2} component='article'>
							<Typography variant='body1' component='p'>
								Prior to founding digpads, Andy was an investment banker, a
								private equity executive, and a top business development
								strategist and executive at an Inc 5000 firm that grew over 300%
								a year during his tenure there as a result of his strategy. Andy
								is a landlord and through the experience came to believe that
								there was an opportunity to assist independent landlords in
								managing and growing their business with technology and that
								much of it can be provided for free or less expensively than it
								has historically been.
							</Typography>
							<Typography variant='body1' component='p'>
								Andy is a graduate of the University of Colorado at Boulder with
								undergraduate degrees in Economics and Business Administration,
								magna cum laude, with distinction. Andy was born and raised in
								Kirkwood, MO, a suburb of St. Louis. Andy’s passion is building
								businesses to help the economy of his hometown and its people.
							</Typography>
						</Stack>
					</article>
				</Container>
			</Section>
			<Footer />
		</>
	);
}
