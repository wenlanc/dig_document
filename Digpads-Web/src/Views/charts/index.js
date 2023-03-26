import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import Header from 'components/Nav/Header';
import { MenuContainer } from 'components/styled/charts.js';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { PageTitle, Banner, NarrowHeader } from 'components/styled/Page';
import styled from 'styled-components';

const CalculatorsContainer = styled.section`
	margin-top: 2em;
	margin-bottom: 5em;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(345px, 1fr));
	gap: 2em;
`;

const StyledCard = styled(Card)`
	max-width: 345px;
	margin-left: auto;
	margin-right: auto;

	.MuiCardMedia-root {
		height: 220px;
	}
`;

const CardTitle = styled(Typography).attrs(() => ({
	variant: 'h6',
	component: 'h2',
}))`
	text-align: center;
	font-weight: bold;
`;

function ChartPage() {
	return (
		<>
			<MenuContainer>
				<NarrowHeader>
					<Header />
				</NarrowHeader>
			</MenuContainer>

			<Banner>
				<PageTitle>Calculators</PageTitle>
			</Banner>
			<Container maxWidth='lg' style={{ marginTop: '2em' }}>
				<CalculatorsContainer>
					{calculators.map((calculator) => (
						<StyledCard key={calculator.href}>
							<Link
								to={calculator.href}
								style={{ color: 'inherit' }}
							>
								<CardHeader
									title={
										<CardTitle>
											{calculator.title}
										</CardTitle>
									}
									disableTypography
								/>

								<CardMedia
									title={calculator.title}
									image={calculator.image}
								/>
								<CardContent>
									<Typography align='center'>
										{calculator.description}
									</Typography>
								</CardContent>
							</Link>
						</StyledCard>
					))}
				</CalculatorsContainer>
			</Container>

			<Footer />
		</>
	);
}

const calculators = [
	{
		title: 'Rent to Income Calculator',
		description: 'Determine if a tenant can afford a rental',
		image: 'images/calculator/Rent_income_calculator_image.jpg',
		href: '/calculators/rentIncome',
	},
	{
		title: 'Hard Money Calculator',
		description: 'Calculate the cost of a hard money loan or any loan',
		image: 'images/calculator/hard_money_loan_calc.jpg',
		href: '/calculators/hard-money-calculator',
	},
	{
		title: ' Turnover Cost Calculator',
		description: 'Calculate the cost of turning over a tenant.',
		image: 'images/calculator/turnover_cost_calculator.jpg',
		href: '/calculators/turn-over-calculator',
	},
	{
		title: ' Mortgage Calculator',
		description:
			'Calculates mortgage loan costs and profitability for a rental property',
		image: 'images/calculator/mortgage_calculator.jpg',
		href: '/calculators/mortgage-calculator',
	},
];

export default ChartPage;
