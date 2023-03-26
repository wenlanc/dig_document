import React, { useState, useRef } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { instance } from '../controllers/axios';

import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/system/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Typography, Paper } from '@mui/material';

import styled, { keyframes } from 'styled-components';

import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const PREFIX = 'MatchMe';

const classes = {
	root: `${PREFIX}-root`,
	button: `${PREFIX}-button`,
	actionsContainer: `${PREFIX}-actionsContainer`,
	resetContainer: `${PREFIX}-resetContainer`,
};

const StyledBox = muiStyled(Box)(({ theme }) => ({
	[`& .${classes.root}`]: {
		width: '100%',
	},

	[`& .${classes.button}`]: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},

	[`& .${classes.actionsContainer}`]: {
		marginBottom: theme.spacing(2),
	},

	[`& .${classes.resetContainer}`]: {
		padding: theme.spacing(3),
	},
}));

const StyledStepper = styled(Stepper)`
	.MuiStep-root {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.MuiStepLabel-label {
		font-size: 1.2rem;
		color: rgb(29 28 28);
	}

	.MuiStepLabel-root {
		margin-bottom: 2em;
	}

	.MuiStepLabel-iconContainer {
		align-self: flex-start;
	}

	.MuiStepConnector-root {
		display: none;
	}

	.MuiStepContent-root {
		border-left: none;
	}

	.stepper {
		display: flex;
		flex-direction: column;
	}
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
	animation: ${rotate} 2s linear infinite;
	font-size: 10rem;
`;

export default function MatchMe() {
	const [value, setValue] = useState('');
	const [selected, setSelected] = useState([]); // selected answers
	const [activeStep, setActiveStep] = useState(0);
	const [loadingResults, setLoadingResults] = useState(false);
	const [resultsLoaded, setResultsLoaded] = useState(false);
	const [affiliateCompany, setAffiliateCompany] = useState({});

	const loadTimerRef = useRef(null);

	const handleNext = () => {
		if (activeStep === 3) {
			loadTimerRef.current = setTimeout(() => {
				loadResults();
			}, 2000);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
		setSelected([
			...selected.slice(0, activeStep),
			event.target.value,
			...selected.slice(activeStep + 1),
		]);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

		if (loadTimerRef.current !== null) {
			clearTimeout(loadTimerRef.current);
		}
	};

	async function loadResults() {
		setLoadingResults(true);

		let matchMeOutcome = await fetchMatchMeOutcome();
		setAffiliateCompany(matchMeOutcome.affiliate_company);

		setTimeout(() => {
			setLoadingResults(false);
			setResultsLoaded(true);
		}, 10000);
	}

	function fetchMatchMeOutcome() {
		let url = process.env.REACT_APP_STRAPI_API_URL + `/match-me-outcomes`;
		let query = `?Q1=${selected[0]}&Q2=${selected[1]}&Q3=${selected[2]}&Q4=${selected[3]}`;
		url += query;

		return instance.get(url).then((res) => {
			if (res.status === 200) {
				let matchMeOutcomes = res.data;

				console.assert(
					matchMeOutcomes.length === 1,
					'Incorrect number of matching outcomes'
				);

				return matchMeOutcomes[0];
			} else {
				alert('A error happened, please try again later');
			}
		});
	}

	return (
		<StyledBox display='flex' flexDirection='column' p='15px'>
			{loadingResults && (
				<Box textAlign='center' mt={4}>
					<Typography paragraph>
						Calculating the best tenant screening provider for you.
					</Typography>

					<StyledSettingsIcon color='primary' />
				</Box>
			)}

			{resultsLoaded && (
				<Box textAlign='center' mt={4}>
					<Box mb={3}>
						<Typography>
							Thanks for telling digpads more about your needs!
							Based on your responses, digpads recommends:
						</Typography>
					</Box>

					<a
						href={affiliateCompany.link}
						style={{ display: 'block' }}
					>
						<img
							style={{ width: '200px' }}
							src={`${process.env.REACT_APP_STRAPI_API_URL}${affiliateCompany.logo.url}`}
						/>
					</a>
				</Box>
			)}

			{loadingResults || resultsLoaded ? (
				<></>
			) : (
				<div className='stepper'>
					<div className={classes.root}>
						<StyledStepper
							activeStep={activeStep}
							orientation='vertical'
						>
							{questions.map((label, index) => (
								<Step
									key={index}
									style={{
										display:
											index === activeStep
												? 'block'
												: 'none',
									}}
								>
									<StepLabel>{label.title}</StepLabel>
									<StepContent>
										<div
											className={classes.actionsContainer}
										>
											<div>
												<FormControl component='fieldset'>
													<RadioGroup
														aria-label='most-important'
														name='most-important'
														value={value}
														onChange={handleChange}
													>
														{label.options.map(
															(option, i) => (
																<FormControlLabel
																	key={i}
																	value={
																		option.val
																	}
																	control={
																		<Radio />
																	}
																	label={
																		option.ques
																	}
																/>
															)
														)}
													</RadioGroup>
												</FormControl>
											</div>
										</div>
									</StepContent>
								</Step>
							))}
						</StyledStepper>
						{/* Temporary part added */}
						{activeStep === questions.length && (
							<Paper
								square
								elevation={0}
								sx={{ p: 3 }}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<Typography variant='subtitle1'>
									All steps completed !
								</Typography>
							</Paper>
						)}
					</div>

					<MobileStepper
						style={{
							padding: '24px',
							order: 1,
						}}
						variant='progress'
						steps={5}
						position='static'
						activeStep={activeStep}
						className={classes.root}
						nextButton={
							<Button
								size='small'
								onClick={handleNext}
								disabled={activeStep === 4}
							>
								Next
								<KeyboardArrowRight />
							</Button>
						}
						backButton={
							<Button
								size='small'
								onClick={handleBack}
								disabled={activeStep === 0}
							>
								<KeyboardArrowLeft />
								Back
							</Button>
						}
					/>
				</div>
			)}
		</StyledBox>
	);
}

const questions = [
	{
		title: 'Which is the most important to you for tenant screening?',
		options: [
			{ ques: 'Cost', val: 'cost' },
			{ ques: 'Quality', val: 'quality' },
			{ ques: 'Customization', val: 'customization' },
		],
	},
	{
		title: 'What type of tenant screening reports are you looking for?',
		options: [
			{ ques: 'Credit', val: 'credit' },
			{ ques: 'Criminal', val: 'criminal' },
			{ ques: 'Credit + Criminal', val: 'credit&criminal' },
			{ ques: 'Credit, Criminal and More', val: 'credit&more' },
			{ ques: 'Other', val: 'other' },
		],
	},
	{
		title: 'Do you prefer to buy a tenant screening package (includes multiple types of screening) or buy tenant screening à la carte?',
		options: [
			{ ques: 'Package', val: 'package' },
			{ ques: 'À la carte', val: 'alacarte' },
		],
	},
	{
		title: 'Are you running a tenant screen in Massachusetts, Delaware, South Dakota, Wyoming, or Colorado?',
		options: [
			{ ques: 'Yes', val: 'yes' },
			{ ques: 'No', val: 'no' },
		],
	},
];
