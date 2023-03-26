import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { device } from 'components/MediaSizes';

const StyledTenantScreeningSteps = styled.ul`
	text-align: center;
	margin: 0 auto 3em auto;
	max-width: 560px;

	@media screen and ${device.laptop} {
		max-width: initial;
		display: flex;
		gap: 1em;
	}
`;

const ScreeningRow = styled.div`
	display: flex;
	gap: 2em;
	justify-content: space-around;
	position: relative;

	&::before {
		z-index: -1;
		top: 0;
		bottom: -1px;
		width: 100%;
		position: absolute;
		width: calc(100% - 50px);
		content: '';
	}

	&:nth-child(even) {
		&::before {
			right: 0;
			border-top: 2px solid #c9def3;
			border-right: 2px solid #c9def3;
			border-bottom: 2px solid #c9def3;
			border-top-right-radius: 50px;
			border-bottom-right-radius: 50px;
		}
	}

	&:nth-child(odd) {
		&::before {
			left: 0;
			top: -1px;
			border-top: 2px solid #c9def3;
			border-left: 2px solid #c9def3;
			border-bottom: 2px solid #c9def3;
			border-top-left-radius: 50px;
			border-bottom-left-radius: 50px;
		}
	}

	&:nth-child(1)::before {
		border: none;
	}

	&:nth-child(4)::before {
		border-top: none;
		border-bottom: none;
		border-right: none;
		border-top-right-radius: 0;
	}
`;

const ScreeningStepGraphics = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 15px;

	img {
		margin-bottom: 1.5em;
		width: 115px;
	}

	.step-number-wrapper {
		border: 1px solid #abc8f0;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #d6e2fb;
		z-index: 1;
	}

	.step-number {
		font-weight: bold;
		border-radius: 50%;
		background-color: #0063c8;
		color: white;
		width: 20px;
		height: 20px;
	}
`;

const StepText = styled(Typography).attrs(() => ({
	variant: 'caption',
	component: 'div',
	color: 'textSecondary',
}))`
	font-weight: 600;
	max-width: 170px;
	margin-left: auto;
	margin-right: auto;

	ul {
		text-align: left;
		padding-left: 1.5em;
	}

	li {
		position: relative;
		color: rgb(159 154 154);
		font-weight: 500;
		margin-bottom: 0.4em;
	}

	svg {
		position: absolute;
		top: 0;
		left: -20px;
		font-size: 1rem;
		color: ${(props) => props.theme.primaryColor};
		margin-right: 0.3em;
	}
`;

const StyledTenantScreeningReport = styled.div`
	text-align: center;
	margin: auto;

	@media screen and ${device.laptop} {
		margin: 0;

		& ${StepText} {
			max-width: 250px;
		}
	}
`;

export default function TenantScreeningSteps(props) {
	const desktop = useMediaQuery('(min-width:980px)');

	const { steps } = props;

	const stepsDesktop = (
		<div style={{ textAlign: 'center', marginBottom: '3em' }}>
			<ScreeningRow>
				{steps.slice(0, 4).map((step, i) => (
					<ScreeningStepGraphics key={i}>
						<img src={step.image} />
						<div className='step-number-wrapper'>
							<div className='step-number'>{step.number}</div>
						</div>
					</ScreeningStepGraphics>
				))}
			</ScreeningRow>

			<ScreeningRow style={{ padding: '2em 0' }}>
				<StepText>{steps[0].text}</StepText>
				<StepText>{steps[1].text}</StepText>
				<StepText>{steps[2].text}</StepText>
				<StepText>{steps[3].text}</StepText>
			</ScreeningRow>

			<ScreeningRow>
				{steps.slice(4).map((step, i) => (
					<ScreeningStepGraphics key={i}>
						<img src={step.image} />
						<div className='step-number-wrapper'>
							<div className='step-number'>{step.number}</div>
						</div>
					</ScreeningStepGraphics>
				))}
			</ScreeningRow>

			<ScreeningRow style={{ padding: '2em 0' }}>
				<StepText>{steps[4].text}</StepText>
				<StepText>{steps[5].text}</StepText>
				<StepText>{steps[6].text}</StepText>
				<StepText>{steps[7].text}</StepText>
			</ScreeningRow>
		</div>
	);

	return (
		<>
			{desktop && stepsDesktop}

			{!desktop && (
				<StyledTenantScreeningSteps {...props.style}>
					{steps.map((step, i) => {
						return (
							<div key={i} style={{ marginBottom: '3em' }}>
								<ScreeningRow>
									<ScreeningStepGraphics>
										<img src={step.image} />
										<div className='step-number-wrapper'>
											<div className='step-number'>
												{step.number}
											</div>
										</div>
									</ScreeningStepGraphics>
								</ScreeningRow>

								<ScreeningRow style={{ padding: '2em 0' }}>
									<StepText>{step.text}</StepText>
								</ScreeningRow>
							</div>
						);
					})}
				</StyledTenantScreeningSteps>
			)}
		</>
	);
}

export function TenantScreeningReport(props) {
	const desktop = useMediaQuery('(min-width:980px)');
	const { steps2 } = props;

	const stepsDesktop = (
		<StyledTenantScreeningReport>
			<ScreeningRow>
				<ScreeningStepGraphics>
					<img src={steps2[0].image} />
					<div className='step-number-wrapper'>
						<div className='step-number'>{steps2[0].number}</div>
					</div>
				</ScreeningStepGraphics>

				<ScreeningStepGraphics>
					<img src={steps2[1].image} />
					<div className='step-number-wrapper'>
						<div className='step-number'>{steps2[1].number}</div>
					</div>
				</ScreeningStepGraphics>

				<ScreeningStepGraphics>
					<img src={steps2[2].image} />
					<div className='step-number-wrapper'>
						<div className='step-number'>{steps2[2].number}</div>
					</div>
				</ScreeningStepGraphics>
			</ScreeningRow>

			<ScreeningRow style={{ padding: '2em 1em' }}>
				<StepText>{steps2[0].text}</StepText>

				<StepText style={{ textAlign: 'left' }}>
					<Box color='#665757'>{steps2[1].text}</Box>

					<ul>
						{steps2[1].points.map((pt, i) => (
							<li key={i}>
								<CheckIcon />
								{pt}
							</li>
						))}
					</ul>
				</StepText>
				<StepText>{steps2[2].text}</StepText>
			</ScreeningRow>

			<ScreeningRow>
				<ScreeningStepGraphics>
					<img src={steps2[3].image} />
					<div className='step-number-wrapper'>
						<div className='step-number'>{steps2[3].number}</div>
					</div>
				</ScreeningStepGraphics>

				<ScreeningStepGraphics>
					<img src={steps2[4].image} />
					<div className='step-number-wrapper'>
						<div className='step-number'>{steps2[4].number}</div>
					</div>
				</ScreeningStepGraphics>

				<ScreeningStepGraphics>
					<img src={steps2[5].image} />
					<div className='step-number-wrapper'>
						<div className='step-number'>{steps2[5].number}</div>
					</div>
				</ScreeningStepGraphics>
			</ScreeningRow>

			<ScreeningRow style={{ padding: '2em 1em' }}>
				<StepText style={{ textAlign: 'left' }}>
					{steps2[3].text}
					<ul>
						{steps2[3].points.map((pt, i) => (
							<li key={i}>
								<CheckIcon />
								{pt}
							</li>
						))}
					</ul>
				</StepText>
				<StepText>{steps2[4].text}</StepText>
				<StepText>{steps2[5].text}</StepText>
			</ScreeningRow>
		</StyledTenantScreeningReport>
	);

	return (
		<>
			{desktop && stepsDesktop}

			{!desktop && (
				<StyledTenantScreeningReport {...props.style}>
					{steps2.map((step, i) => {
						return (
							<div key={i} style={{ marginBottom: '3em' }}>
								<ScreeningRow>
									<ScreeningStepGraphics>
										<img src={step.image} />
										<div className='step-number-wrapper'>
											<div className='step-number'>
												{step.number}
											</div>
										</div>
									</ScreeningStepGraphics>
								</ScreeningRow>

								<ScreeningRow style={{ padding: '2em 1em' }}>
									<StepText>
										{step.text}
										{step.points && (
											<ul>
												{step.points.map((pt, i) => (
													<li key={i}>
														<CheckIcon />
														{pt}
													</li>
												))}
											</ul>
										)}
									</StepText>
								</ScreeningRow>
							</div>
						);
					})}
				</StyledTenantScreeningReport>
			)}
		</>
	);
}
