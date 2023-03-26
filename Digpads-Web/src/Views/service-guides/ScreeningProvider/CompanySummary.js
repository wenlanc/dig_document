import React from 'react';
import styled from 'styled-components';
import { device } from 'components/MediaSizes';
import { Title } from './ScreeningProvider.js';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const SummaryStats = styled.div`
	@media screen and ${device.tablet} {
		display: flex;
		& > * {
			margin-right: 5em;
		}
	}
`;

const SummaryStat = styled.div`
	font-weight: 700;
`;

const SummaryStatLabel = styled(Typography).attrs(() => ({
	variant: 'body2',
	color: 'textSecondary',
	gutterBottom: 'true',
}))`
	text-decoration: underline;
	font-weight: 800;
`;

const SummaryStatText = styled(Typography).attrs(() => ({
	component: 'span',
	color: 'textSecondary',
}))`
	font-size: 1.5rem;
	font-weight: 700;
`;

const SummaryDescription = styled.div`
	@media screen and ${device.laptop} {
		margin-bottom: 2em;
	}
`;

export default function CompanySummary(props) {
	const {
		summaryDescription,
		foundedText,
		revenueText,
		employeesText,
	} = props;

	return (
		<>
			<Title variant='h4' green='true'>
				Company Summary
			</Title>

			<SummaryDescription>
				{summaryDescription.map((description, i) => (
					<Typography variant='body2' key={i} paragraph>
						{description}
					</Typography>
				))}
			</SummaryDescription>

			<SummaryStats>
				<Box>
					<SummaryStat gutterBottom>
						<SummaryStatLabel>
							Company Founded<br></br>
						</SummaryStatLabel>

						<SummaryStatText>{foundedText}</SummaryStatText>
					</SummaryStat>
				</Box>

				<Box>
					<SummaryStat gutterBottom>
						<SummaryStatLabel>
							Revenue<br></br>
						</SummaryStatLabel>

						<SummaryStatText>{revenueText}</SummaryStatText>
					</SummaryStat>
				</Box>

				<Box>
					<SummaryStat gutterBottom>
						<SummaryStatLabel>
							Number of Employees<br></br>
						</SummaryStatLabel>

						<SummaryStatText>{employeesText}</SummaryStatText>
					</SummaryStat>
				</Box>
			</SummaryStats>
		</>
	);
}
