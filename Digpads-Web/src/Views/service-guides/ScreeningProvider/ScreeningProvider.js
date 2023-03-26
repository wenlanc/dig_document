import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DigpadsReview from './DigpadsReview';
import ProviderPackage from './ProviderPackage';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CompanySummary from './CompanySummary';
import { SectionContainer } from 'components/styled/ScreeningProvider';
import { device } from 'components/MediaSizes';
import Box from '@mui/material/Box';

// #region styles
const StyledScreeningProvider = styled.li`
	margin-bottom: 2em;
`;

const StyledPaper = styled(Paper)`
	padding: 1.5em 1em;
`;

const OrderNowButton = styled(Button)`
	flex-shrink: 0;
	background-color: #008f00;
	color: #fbedec;
	border-radius: 7px;
	text-transform: capitalize;
	font-weight: 600;
	padding: 0.7em 1.2em;

	&.MuiButtonBase-root:hover {
		background-color: rgb(24 168 24);
	}

	span {
		font-size: 1.2rem;
	}

	.MuiButton-label {
		display: flex;
		font-size: 0.9rem;
	}

	.MuiSvgIcon-root {
		font-size: 30px;
	}
`;

const ProviderHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-bottom: 2em;

	.provider-header-box {
		margin-bottom: 1em;
	}

	.provider-name {
		margin-bottom: 0;
	}

	@media screen and ${device.tablet} {
		text-align: left;
		flex-direction: row;
		margin-bottom: 0;

		.provider-header-box {
			margin-bottom: 1.5em;
		}

		a {
			margin-left: auto;
		}
	}

	@media screen and ${device.laptop} {
		margin-bottom: 2em;
	}
`;

const ProviderLogo = styled.div`
	width: 200px;

	@media screen and ${device.tablet} {
		margin-right: 2.5em;
	}
`;

export const Title = styled(Typography)`
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 1em;
	color: ${(props) =>
		props.green === 'true' ? props.theme.colors.green : 'inherit'};
`;

const ProviderPackages = styled.div`
	.package-item:last-child {
		margin-bottom: 0;
	}

	.package-item::before {
		content: '';
		position: absolute;
		top: 0;
		width: 100%;
		border-top: 1px dashed gray;
		display: block;
	}

	.package-item.first-package::before {
		display: none;
	}
`;
// #endregion styles

export default function ScreeningProvider(props) {
	const {
		logo = 'https://www.placekitten.com/200/100',
		companyHref = '#0',
		name = 'undefined',
		bestForText = 'undefined',
		hrefOrderNow = '#0',
		summaryDescription = 'undefined',
		foundedText = 'undefined',
		revenueText = 'undefined',
		employeesText = 'undefined',
		summaryConclusionText = 'undefined',
		packagesDescription = 'undefined',
		packages = [],
		companyPros = 'undefined',
		topComplaints = 'undefined',
		ratings = [],
		averageRating,
	} = props;

	return (
		<StyledScreeningProvider id={name}>
			<StyledPaper elevation={0}>
				<ProviderHeader>
					<ProviderLogo>
						<img src={logo} />
					</ProviderLogo>

					<Box className='provider-header-box'>
						<Title variant='h3' className='provider-name'>
							{name}
						</Title>
						<Typography variant='body2'>{bestForText}</Typography>
					</Box>

					<OrderNowButton
						variant='contained'
						component='a'
						href={hrefOrderNow}
						endIcon={<ArrowForwardIcon />}
					>
						Order Now
					</OrderNowButton>
				</ProviderHeader>

				<SectionContainer variant='solid'>
					<CompanySummary
						logo={logo}
						companyHref={companyHref}
						hrefOrderNow='#0'
						name='undefined'
						bestForText={bestForText}
						summaryDescription={summaryDescription}
						foundedText={foundedText}
						revenueText={revenueText}
						employeesText={employeesText}
						summaryConclusionText={summaryConclusionText}
					/>
				</SectionContainer>

				{/* Provider packages */}
				<ProviderPackages>
					<SectionContainer variant='dashed'>
						<Title variant='h4' green='true'>
							Packages and Prices
						</Title>

						<Typography variant='body2' style={{ marginBottom: '2em' }}>
							{packagesDescription}
						</Typography>

						<Box
							display='grid'
							alignItems='center'
							gridTemplateColumns='2fr 3fr 2fr'
						>
							<div></div>

							<Typography
								variant='body2'
								gutterBottom
								style={{
									textTransform: 'uppercase',
									textDecoration: 'underline',
									fontWeight: 'bold',
								}}
							>
								List of what it includes
							</Typography>

							<Box
								alignSelf='stretch'
								display='flex'
								flexDirection='column'
								alignItems='center'
							>
								<Typography
									variant='body2'
									style={{
										textTransform: 'uppercase',
										marginBottom: 'auto',
										fontWeight: 'bold',
										textDecoration: 'underline',
									}}
								>
									price
								</Typography>
							</Box>
						</Box>
						{packages &&
							packages.map((_package, i) => (
								<ProviderPackage
									key={i}
									{..._package}
									className={
										i === 0 ? 'first-package package-item' : 'package-item'
									}
								/>
							))}
					</SectionContainer>
				</ProviderPackages>

				{/* == Pros to using company X == */}
				<SectionContainer variant='solid'>
					<CompanyPros companyPros={companyPros} />
				</SectionContainer>

				{/* == Top complaints to using company X == */}
				<SectionContainer variant='dashed'>
					<TopComplaints topComplaints={topComplaints} />
				</SectionContainer>

				{/* == Digpads Review == */}
				<SectionContainer variant='solid'>
					<DigpadsReview ratings={ratings} averageRating={averageRating} />
				</SectionContainer>

				{/* == Summary Conclusion == */}
				<Box
					borderRadius='10px'
					p={3}
					mb={2}
					bgcolor={'#e6e6e6'}
					borderColor='#6eb86e'
					style={{ borderStyle: 'dashed' }}
				>
					<Title green='true' variant='h4'>
						Summary Conclusion
					</Title>

					<Typography variant='body2' paragraph>
						{summaryConclusionText}
					</Typography>
				</Box>
			</StyledPaper>
		</StyledScreeningProvider>
	);
}

function CompanyPros({ companyPros }) {
	const {
		title = 'undefined',
		description = 'undefined',
		prosList = [],
	} = companyPros;

	return (
		<>
			<Title variation='h4' green='true'>
				{title}
			</Title>

			<Typography variant='body2' paragraph>
				{description}
			</Typography>

			<Box component='ul'>
				{prosList &&
					prosList.map((pro, i) => (
						<Box component='li' key={i} display='flex' fontWeight={600} mb={1}>
							<Box sx={{ color: 'rgb(1,143,1)' }} clone>
								<ArrowForwardIcon
									style={{
										marginRight: '0.3em',
										position: 'relative',
										bottom: '3px',
									}}
								/>
							</Box>
							<Box component='span' fontWeight={700} color='primary.main'>
								{pro}
							</Box>
						</Box>
					))}
			</Box>
		</>
	);
}

function TopComplaints(props) {
	const { title, description, complaintList } = props.topComplaints;

	return (
		<>
			<Title variant='h3' green='true'>
				{title}
			</Title>

			<Typography variant='body2' paragraph>
				{description}
			</Typography>

			<Box
				component='ul'
				color='primary.main'
				fontWeight={600}
				style={{ listStyle: 'disc' }}
			>
				{complaintList &&
					complaintList.map((complaint, i) => (
						<Box
							component='li'
							display='flex'
							alignItems='center'
							mb={1}
							key={i}
						>
							<FiberManualRecordIcon
								style={{
									fontSize: '0.8rem',
									marginRight: '0.5em',
									position: 'relative',
									bottom: '1px',
								}}
							/>
							<Box component='span' fontSize='0.875rem' fontWeight='700'>
								{complaint}
							</Box>
						</Box>
					))}
			</Box>
		</>
	);
}
