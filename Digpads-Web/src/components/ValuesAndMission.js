import React from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import Header from 'components/Nav/Header';

const StyledMain = styled.main`
	padding: 2em 0;

	.MuiContainer-root {
		max-width: 730px;
	}
`;

const StyledTypography = styled(Typography).attrs(() => ({
	variant: 'body2',
	gutterBottom: true,
}))`
	margin-bottom: 1em;
	font-weight: ${(props) => (props.bold === 'true' ? 'bold' : 'normal')};
	text-decoration: ${(props) =>
		props.under === 'true' ? 'underline' : 'none'};
`;

const CoreValuesList = styled.ol``;

export default function ValuesAndMission() {
	return (
		<StyledMain>
			<Header />
			<Container>
				<StyledTypography bold='true'>
					Values &amp; Mission
				</StyledTypography>

				<StyledTypography under='true'>Values</StyledTypography>

				<StyledTypography>
					digpads’ core values include:
				</StyledTypography>

				<CoreValuesList>
					<li>
						<StyledTypography bold='true'>
							Honesty is Leadership; Leadership is Humility
						</StyledTypography>

						<StyledTypography>
							Leadership is an action and way of being, not a
							situation or a position - everyone and anyone should
							be a leader. Team members at all levels including
							leadership/executives lead through honesty with each
							other. True leaders are humble in their analysis,
							treatment of others and in their thinking as the
							mission of the company takes precedence.
						</StyledTypography>
					</li>

					<li>
						<StyledTypography bold='true'>
							Follow the data, don't use it to confirm your bias
						</StyledTypography>

						<StyledTypography>
							Nearly all tech/internet companies and many
							companies in other industries say they follow what
							data says and make decisions around it. Reality is a
							bit different. Leadership’s bias can often be the
							problem but the bias of any team member on data
							interpretation and actions taken from interpreting
							that data can negatively affect decision making and
							actions.
						</StyledTypography>
					</li>

					<li>
						<StyledTypography bold='true'>
							Discipline; focus and self-awareness is commitment
						</StyledTypography>

						<StyledTypography>
							Discipline gets things done both in minute instances
							(short run, like a day) and in the long run (long
							term goals, like annual, 5 years, 10 years). Lack of
							discipline leads to balls being dropped and not
							generating the best that anything can be. Focus is a
							part of discipline as is self-awareness. We must be
							honest with ourselves on how good we are doing.
						</StyledTypography>
					</li>

					<li>
						<StyledTypography bold='true'>
							Innovative, growth-focused culture that adapts as
							needed
						</StyledTypography>

						<StyledTypography>
							Companies that stop innovating die. Period.
							Companies that stop growing lose momentum and hope
							and it affects morale. Innovation and growth are
							intricately tied. Companies that grow tend to be in
							a better position to innovate. There is a special
							place digpads wants to find itself in where these
							two situations exist together in perfect harmony.
						</StyledTypography>
					</li>

					<li>
						<StyledTypography bold='true'>
							Commitment to all customers, owners and tenants
							satisfaction
						</StyledTypography>

						<StyledTypography>
							We must ensure that all Users receive what they need
							to the best of our ability at all times when
							engaging with our products.
						</StyledTypography>
					</li>

					<li>
						<StyledTypography bold='true'>
							Missionaries not Mercenaries
						</StyledTypography>

						<StyledTypography>
							This means we are true believers in what we are
							doing, we are not at the Company merely for a check.
							Missionaries believe, care and seek out new
							believers to grow the mission. Mercenaries don’t
							believe or care about the mission, don’t care about
							new believers and are often sabotaging a business’
							growth prospects as they don’t look to solve
							problems and scale, they look to last as long as
							they can and do as little as they can.
						</StyledTypography>
					</li>

					<li>
						<StyledTypography bold='true'>
							Individual Merit Reigns Supreme
						</StyledTypography>

						<StyledTypography>
							digpads strives to be a culture of amazingly
							effective independent contributors who thrive and
							grow around their own successes that aggregate to
							create company-wide and societal successes. An
							individual is judged at digpads based on their
							actions, accomplishments, and net value to the
							Company. An individual is not judged based on things
							that have nothing to do with the work.
						</StyledTypography>
					</li>
				</CoreValuesList>

				<StyledTypography under='true'>Mission</StyledTypography>

				<StyledTypography>
					digpads’ mission is to utilize technology to help
					independent landlords be better informed and operate their
					rental businesses as efficiently and effectively as
					possible. digpads wants to be a valued partner for all of
					our landlord users and any other user who provides value in
					the residential real estate leasing market in the United
					States of America.
				</StyledTypography>
			</Container>
		</StyledMain>
	);
}
