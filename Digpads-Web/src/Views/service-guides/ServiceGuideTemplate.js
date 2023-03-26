import React from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Typography,
	Card,
	CardHeader,
	Tooltip,
	CardContent,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from 'styled-components';

import { device } from 'components/MediaSizes';
import Header from 'components/Nav/Header';
import Footer from 'components/Footer/Footer';
import RatedEntry from './RatedEntry';
import TenantScreeningSteps from './TenantScreeningSteps';
import { TenantScreeningReport } from './TenantScreeningSteps';
import ServicesList from './ServicesList';
import ScreeningProvider from './ScreeningProvider/ScreeningProvider';
import ExcludedCompany from './ExcludedCompany';
import FAQuestion from './FAQuestion';
import AuthorInfo from './AuthorInfo';

const green = 'rgb(1,143,1)';

// #region styles
const BorderedContainer = styled(Container)`
	border: 2px dotted gray;
	padding-top: 1em;
	position: relative;
`;

const BorderOverlay = styled.div`
	display: none;
	position: absolute;
	top: -10px;
	left: -1%;
	bottom: -100%;
	width: 102%;
	border-left: 2px solid black;
	border-right: 2px solid black;

	&.border-with-top {
		border-top: 2px solid black;
	}

	&.border-overlay-last {
		border-top: none;
		border-bottom: 2px solid black;
		bottom: -20px;
	}

	@media screen and ${device.laptop} {
		display: block;
	}

	@media screen and (min-width: 1280px) {
		left: -7.5%;
		width: 115%;
	}
`;

const Page = styled.div`
	section {
		padding: 2em 0;
	}

	@media screen and ${device.laptop} {
		#service-intro {
			margin-bottom: 4em;
		}

		section {
			padding: 4em 0;

			header {
				text-align: center;
			}
		}
	}

	#service-intro {
		padding-top: 0;
	}

	#tenant-screening-video video {
		margin-bottom: 1em;
	}

	#education,
	#professionals {
		background-color: #f3f3f3;
	}

	#screening-providers,
	#services-list,
	#excluded-companies {
		background-color: #f1f5fd;
	}

	#research {
		text-align: center;

		ul {
			align-items: center;
		}
	}

	@media screen and ${device.laptop} {
		#research {
			text-align: left;

			ul {
				align-items: flex-start;
			}
		}

		#research header .MuiTypography-root {
			margin-bottom: 2.5em;
		}
	}
`;

const IntroSection = styled.section`
	background: url(/images/decorations/GradientMaskCircles.png);
	background-repeat: no-repeat;
	background-size: cover;

	@media screen and ${device.laptop} {
		&#serviceIntro {
			margin-bottom: 3em;
			padding-bottom: 4em;
		}

		.MuiContainer-root {
			position: relative;
			margin-top: 1.5em;
		}

		#call-to-action {
			position: absolute;
			bottom: 0;
			transform: translateY(100%);
			width: 95%;
		}
	}
`;

const IntroRow = styled.div`
	@media screen and ${device.tablet} {
		display: grid;
		grid-template-columns: 3fr 1fr;
	}
`;

const PageTitle = styled(Typography).attrs(() => ({
	variant: 'h1',
}))`
	color: ${(props) => props.theme.primaryColor};
	font-weight: bold;
	font-size: 2.5rem;
	cursor: default;
`;

const PageSubtitle = styled(Typography)`
	font-size: 1.5rem;
	font-weight: 500;
	margin-bottom: 0.5em;
`;

const FindMyTenantCTA = styled.div`
	a {
        width: 230px;
        display: flex;
        align-items: center;
		border-radius: 7px;
		border: 5px solid yellow;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
		background-color: #29539b;
		background-image: linear-gradient(315deg, #29539b 0%, #1e3b70 74%);
		line-height: 1.4;
		padding: 1.35em 0.7em;
		color: #FFFFF0;
		font-size: 1rem;
        text-transform: uppercase;
		margin-bottom: 1em;
        transition 0.3s background-color;
		
		:hover {
			background-color: rgb(24 168 24);
		}
	}

	@media screen and ${device.tablet} {
		display: flex;

		a {
			flex-shrink: 0;
			margin-right: 1em;
			margin-bottom: -5px;
		}
	}
`;

const CTADescription = styled(Typography).attrs(() => ({
	variant: 'body2',
}))`
	box-shadow: 0px 2px 7px 0px #bdb9b9;
	background-color: #fff;
	padding: 1em;
	border-radius: 7px;
`;

const MetaBox = styled.div`
	@media screen and ${device.tablet} {
		display: flex;
	}
`;

const PageMeta = styled.div`
	margin-bottom: 1em;

	time {
		font-weight: 500;
	}

	@media screen and ${device.tablet} {
		display: grid;
		grid-template-columns: max-content max-content;
		gap: 4em;

		div {
			display: grid;
			grid-template-columns: max-content max-content;
			gap: 1em;
		}
	}
`;

const DateLabel = styled(Typography)`
	color: ${(props) => props.theme.primaryColor};
	font-weight: bold;
`;

const JumpToSectionSelect = styled.div`
	display: flex;
	justify-content: flex-end;

	margin-bottom: 1em;

	.MuiSelect-select {
		padding: 0.5em 1em;
	}

	.MuiSvgIcon-root {
		color: ${(props) => props.theme.primaryColor};
	}

	.MuiFilledInput-underline:before {
		display: none;
	}

	.MuiFilledInput-root {
		border-radius: 3px;
	}

	.MuiInputLabel-root {
		color: ${(props) => props.theme.primaryColor};
		letter-spacing: 1px;
	}

	.MuiInputBase-root {
		background-color: #fff;
	}

	@media screen and ${device.tablet} {
		margin-left: auto;
	}
`;

const RatedEntries = styled.ul`
	padding: 1em;
	background-color: #f1f4fa;
	border-radius: 7px;

	max-width: 500px;
	margin: 0 auto;

	@media screen and ${device.laptop} {
		max-width: initial;
	}
`;

const Education = styled.section`
	@media screen and ${device.laptop} {
		.education-subtitle {
			margin-bottom: 3.5em;
		}
	}
`;

const EducationCards = styled.div`
	margin-bottom: 2em;

	.MuiCardHeader-root {
		height: 100px;
	}

	.MuiCardHeader-title {
		color: ${green};
		font-weight: bold;
	}

	.MuiCardContent-root {
		font-size: 1rem;
		line-height: 1.8;
		padding-top: 0;

		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.example-text {
		color: gray;
		margin-top: auto;
	}

	@media screen and ${device.tablet} {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5em;
	}
`;

const EducationCard = styled(Card)`
	margin-bottom: 2em;
	padding: 0 0.5em;
	border-radius: 10px;

	.MuiCardHeader-title {
		font-size: 1.3rem;
	}

	display: flex;
	flex-direction: column;

	.MuiCardHeader-root {
		margin-bottom: auto;
	}

	@media screen and ${device.tablet} {
		margin-bottom: 0;
	}
`;

const SectionTitle = styled(Typography).attrs(() => ({
	variant: 'h2',
}))`
	color: ${(props) => props.theme.primaryColor};
	font-size: 2.2rem;
	font-weight: bold;
	margin-bottom: 0.5em;
`;

const SectionSubtitle = styled(Typography).attrs(() => ({
	className: 'section-subtitle',
}))`
	margin-bottom: 1.5em;
`;

const DigpadsResearch = styled.div`
	ul {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	li {
		margin-bottom: 0.5em;
		color: ${(props) => props.theme.primaryColor};
		padding: 0.5em 1.6em 0.5em 0.5em;
		border-radius: 5px;
		border: 1px solid #d4d2d2;

		span {
			font-weight: 500;
		}
	}

	@media screen and ${device.laptop} {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3.5em;
	}
`;

const StyledCheckCircleIcon = styled(CheckCircleIcon).attrs((props) => ({
	htmlColor: props.theme.primaryColor,
}))`
	vertical-align: middle;
	margin-right: 0.3em;
`;

const DisclaimerTitle = styled(Typography).attrs(() => ({
	variant: 'caption',
	component: 'span',
}))`
	color: orange;
	text-decoration: underline;
	cursor: default;
	display: block;
	margin-bottom: 1em;
	font-weight: bold;
`;

const ScreeningProviders = styled.ul``;
// #endregion styles

export default function ServiceGuideTemplate(props) {
	const {
		author,
		meta,
		callToAction,
		serviceIntro,
		managementPlatforms,
		education,
		backgroundChecks,
		tenantScreeningVideo,
		professionals,
		screeningSteps,
		servicesList,
		screeningProviders,
		research,
		excludedCompanies,
		tenantScreeingFAQS,
	} = props;

	const jumpToSections = [
		{ title: managementPlatforms.title, id: managementPlatforms.id },
		{ title: education.title, id: education.id },
		{ title: backgroundChecks.title, id: backgroundChecks.id },
		{ title: tenantScreeningVideo.title, id: tenantScreeningVideo.id },
		{ title: professionals.title, id: professionals.id },
		{ title: screeningSteps.title, id: screeningSteps.id },
		{ title: screeningSteps.title2, id: screeningSteps.id2 },
		{ title: servicesList.title, id: servicesList.id },
		{ title: screeningProviders.title, id: screeningProviders.id },
		{ title: research.title, id: research.id },
		{ title: excludedCompanies.title, id: excludedCompanies.id },
		{ title: tenantScreeingFAQS.title, id: tenantScreeingFAQS.id },
	];

	return (
		<>
			<Page itemscope itemtype='http://schema.org/Article'>
				<IntroSection id={serviceIntro.id}>
					<Header />
					<Container maxWidth='md'>
						<IntroRow>
							<Box>
								<PageTitle itemProp='name'>
									{serviceIntro.title}
								</PageTitle>

								<PageSubtitle>
									{serviceIntro.subtitle}
								</PageSubtitle>
							</Box>

							<AuthorInfo author={author} />
						</IntroRow>

						<MetaBox>
							<PageMeta>
								<div>
									<DateLabel>Published On: </DateLabel>
									<time
										style={{ fontSize: '1rem' }}
										itemProp='datePublished'
										dateTime={meta.published_on}
									>
										{new Intl.DateTimeFormat('en').format(
											meta.published_on
										)}
									</time>
								</div>

								<div>
									<DateLabel>Last Updated On: </DateLabel>
									<time
										style={{ fontSize: '1rem' }}
										itemProp='dateModified'
										dateTime={meta.last_updated_on}
									>
										{new Intl.DateTimeFormat('en').format(
											meta.last_updated_on
										)}
									</time>
								</div>
							</PageMeta>
						</MetaBox>

						<FindMyTenantCTA id='call-to-action'>
							<Link
								to='/match-me/tenant-screening'
								variant='contained'
								style={{ textAlign: 'center' }}
							>
								<b style={{ fontWeight: '600' }}>
									{callToAction.buttonText}
								</b>
							</Link>
							<Box>
								<CTADescription>
									{callToAction.descriptionText}
								</CTADescription>
							</Box>
						</FindMyTenantCTA>
					</Container>
				</IntroSection>

				{/* == Select tenant screening companies == */}
				<section id={managementPlatforms.id} style={{ paddingTop: '0', marginTop: '-2.8em' }}>
					<Container maxWidth='md'>
						<JumpToSectionSelect>
							<FormControl
								variant='filled'
								size='small'
								style={{
									minWidth: '110px',
									border: '2px solid #0063c8',
								}}
							>
								<InputLabel
									id='jump-to-label'
									shrink={false}
									style={{
										top: '-5px',
									}}
								>
									Jump to
								</InputLabel>

								<Select
									labelId='jump-to-label'
									id='jump-to-section-select'
								>
									{jumpToSections.map((jts, i) => (
										<MenuItem
											value={jts}
											key={i}
											component='a'
											href={`#${jts.id}`}
										>
											{jts.title}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</JumpToSectionSelect>

						<SectionTitle>{managementPlatforms.title}</SectionTitle>

						<Tooltip
							title={managementPlatforms.disclaimer}
							placement='bottom-start'
						>
							<DisclaimerTitle>Legal Disclaimer</DisclaimerTitle>
						</Tooltip>

						<RatedEntries>
							{managementPlatforms.ratedEntries
								.sort((a, b) => b.rating - a.rating)
								.map((entry, i) => (
									<RatedEntry
										key={i}
										rating={entry.rating}
										logo={entry.logo}
										description={entry.description}
										label={entry.label}
										href={`#${entry.name}`}
									/>
								))}
						</RatedEntries>
					</Container>
				</section>

				<Education id={education.id}>
					<Container>
						<SectionTitle
							style={{
								marginBottom: '0.5em',
								textAlign: 'center',
							}}
						>
							{education.title}
						</SectionTitle>

						<BorderedContainer maxWidth='md'>
							<BorderOverlay className='border-with-top' />

							<header>
								<Typography
									variant='h5'
									style={{
										color: '#018f01',
										fontWeight: 'bold',
										fontSize: '1.5rem',
										marginBottom: '1.2em',
									}}
								>
									{education.subtitle2}
								</Typography>
							</header>
							<EducationCards>
								{education.educationCards.map((card, i) => (
									<EducationCard key={i}>
										<CardHeader title={card.title} />
										<CardContent>
											<Typography
												variant='body2'
												style={{ marginBottom: '1em' }}
											>
												{card.text}
											</Typography>
											<Typography
												variant='body2'
												className='example-text'
												style={{ color: 'gray' }}
											>
												<b>Examples:</b>{' '}
												{card.exampleText}
											</Typography>
										</CardContent>
									</EducationCard>
								))}
							</EducationCards>
							{education.description.map((text, i) => (
								<Typography
									key={i}
									variant='body2'
									align='justify'
									paragraph
								>
									{text}
								</Typography>
							))}
						</BorderedContainer>
					</Container>
				</Education>

				{/* Tenant screening Background checks */}
				<section id={backgroundChecks.id}>
					<BorderedContainer maxWidth='md'>
						<BorderOverlay />
						<header>
							<SectionTitle
								style={{
									fontSize: '1.5rem',
									marginBottom: '1.5em',
								}}
							>
								{backgroundChecks.title}
							</SectionTitle>

							<SectionSubtitle
								style={{
									fontWeight: 'bold',
									textAlign: 'left',
									marginBottom: '0.7em',
								}}
							>
								{backgroundChecks.subtitle}
							</SectionSubtitle>
						</header>

						{backgroundChecks.content.map((item, i) => (
							<Box
								key={i}
								mb={
									backgroundChecks.content.length - 1 === i
										? 0
										: 5
								}
							>
								<Typography
									variant='h3'
									style={{
										color: green,
										fontWeight: 'bold',
										fontSize: '1.3rem',
										marginBottom: '0.5em',
									}}
								>
									{item.heading}
								</Typography>

								{item.text.map((_paragraph, i) => (
									<Typography
										variant='body2'
										paragraph
										key={i}
									>
										{_paragraph}
									</Typography>
								))}
							</Box>
						))}
					</BorderedContainer>
				</section>

				{/* Tenant Screening Video */}
				<section id={tenantScreeningVideo.id}>
					<BorderedContainer maxWidth='md'>
						<BorderOverlay />

						<header>
							<SectionTitle style={{ fontSize: '1.5rem' }}>
								{tenantScreeningVideo.title}
							</SectionTitle>
						</header>

						<Typography align='center' variant='body2' gutterBottom>
							{tenantScreeningVideo.description}
						</Typography>

						<video width='100%' controls>
							<source
								src={tenantScreeningVideo.video.src}
								type='video/mp4'
							/>
							Your browser does not support the video tag.
						</video>
					</BorderedContainer>
				</section>

				{/* Professionals */}
				<section id={professionals.id}>
					<BorderedContainer maxWidth='md'>
						<BorderOverlay />

						<header>
							<SectionTitle
								style={{
									color: 'inherit',
									marginBottom: '1.5em',
									fontSize: '1.5rem',
								}}
							>
								{professionals.title}
							</SectionTitle>
						</header>

						{professionals.content.map((item, i) => (
							<Box
								key={i}
								mb={
									backgroundChecks.content.length - 1 === i
										? 0
										: 5
								}
							>
								<Typography
									variant='h3'
									style={{
										fontSize: '1.3rem',
										marginBottom: '0.5em',
										fontWeight: 'bold',
									}}
								>
									{item.title}
								</Typography>
								<Typography variant='body2'>
									{item.text}
								</Typography>
							</Box>
						))}
					</BorderedContainer>
				</section>

				{/* Tenant Screening Steps */}
				<section id={screeningSteps.id}>
					<BorderedContainer
						maxWidth='md'
						style={{ marginBottom: '2em' }}
					>
						<BorderOverlay />
						<header>
							<SectionTitle
								style={{
									marginBottom: '1em',
									fontSize: '1.5rem',
								}}
							>
								{screeningSteps.title}
							</SectionTitle>
						</header>
						{/* "How Tenant screening works" steps */}
						<Box display='flex' flexDirection='column'>
							<Box order='1'>
								<TenantScreeningSteps {...screeningSteps} />
							</Box>
							{screeningSteps.description1.show && (
								<Box
									order={
										screeningSteps.description1.position ===
										'top'
											? 0
											: 2
									}
									m={
										screeningSteps.description1.position ===
										'top'
											? '0 0 1em 0'
											: '0 0 5em 0'
									}
								>
									{screeningSteps.description1.text}
								</Box>
							)}
						</Box>
					</BorderedContainer>

					{/* How to Utilize tenant screening report */}
					<BorderedContainer maxWidth='md'>
						<BorderOverlay className='border-overlay-last' />
						<div id={screeningSteps.id2}>
							<SectionTitle
								style={{
									textAlign: 'center',
									marginBottom: '1em',
									fontSize: '1.5rem',
								}}
							>
								{screeningSteps.title2}
							</SectionTitle>
							<Box display='flex' flexDirection='column'>
								<Box order='1'>
									<TenantScreeningReport
										{...screeningSteps}
									/>
								</Box>
								{screeningSteps.description2.show && (
									<Box
										order={
											screeningSteps.description2
												.position === 'top'
												? 0
												: 2
										}
										m={
											screeningSteps.description2
												.position === 'top'
												? '0 0 1em 0'
												: '0 0 5em 0'
										}
									>
										{screeningSteps.description2.text}
									</Box>
								)}
							</Box>
						</div>
					</BorderedContainer>
				</section>

				{/* Services list */}
				<section id={servicesList.id}>
					<Container
						maxWidth='md'
						sx={{
							padding: { md: '0' },
						}}
					>
						<header>
							<SectionTitle>{servicesList.title}</SectionTitle>
						</header>

						<Box display='flex' flexDirection='column'>
							<Box width='100%' order='1'>
								<ServicesList
									services={servicesList.services}
								/>
							</Box>

							{servicesList.description.show && (
								<Box
									order={
										servicesList.description.position ===
										'top'
											? '0'
											: '2'
									}
								>
									<Typography variant='body2'>
										{servicesList.description.text}
									</Typography>
								</Box>
							)}
						</Box>
					</Container>
				</section>

				{/* Tenant Screening Company Providers */}
				<section id={screeningProviders.id}>
					<Container maxWidth='md'>
						<header>
							<SectionTitle>
								{screeningProviders.title}
							</SectionTitle>
						</header>

						<ScreeningProviders>
							{screeningProviders.content
								.sort(
									(a, b) => b.averageRating - a.averageRating
								)
								.map((item, i) => (
									<ScreeningProvider key={i} {...item} />
								))}
						</ScreeningProviders>
					</Container>
				</section>

				{/* digpads research */}
				<section id={research.id}>
					<Container maxWidth='md'>
						<header>
							<SectionTitle>{research.title}</SectionTitle>
						</header>

						<DigpadsResearch>
							<div>
								<img src='/images/research.png' />
							</div>

							<div>
								<Typography
									style={{
										fontSize: '1.3rem',
										fontWeight: 'bold',
										marginBottom: '0.5em',
									}}
								>
									Landlord receives report on...
								</Typography>
								<Typography variant='body2'>
									digpads spent over 100 hours researching,
									confirming and analyzing the different
									providers of tenant screening products.
									digpads started its research by contacting
									many of the providers and asking questions
									to understand the industry. We then
									aggregated a comprehensive list of the
									providers of tenant screening in the
									industry. We utilized this list to create a
									master data sheet comparing these tenant
									screening providers by the same criteria.
									digpads, as focused on independent landlords
									and those in similar situations as them,
									excluded any provider that was not deemed as
									easy or focused on one-off purchases.
									Lastly, we applied our own subjective scores
									to each of the providers relative to each
									other and generated a weighted score to
									arrive at the overall score for each
									provider.
								</Typography>
							</div>
						</DigpadsResearch>
					</Container>
				</section>

				{/* Reviewed and excluded companies */}
				<section id={excludedCompanies.id}>
					<Container maxWidth='md'>
						<header>
							<SectionTitle style={{ marginBottom: '1.5em' }}>
								{excludedCompanies.title}
							</SectionTitle>
						</header>

						<Box component='ul' display='grid' gap='0.5em'>
							{excludedCompanies.content.map((item, i) => (
								<ExcludedCompany key={i} {...item} />
							))}
						</Box>
					</Container>
				</section>

				<section id={tenantScreeingFAQS.id}>
					<Container maxWidth='md'>
						<SectionTitle style={{ textAlign: 'center' }}>
							Tenant Screening FAQS
						</SectionTitle>

						<Box component='ul'>
							{tenantScreeingFAQS.questionsAndAnswers.map(
								(question, i) => (
									<FAQuestion
										key={i}
										{...question}
										defaultExpanded={i === 0}
									/>
								)
							)}
						</Box>
					</Container>
				</section>
			</Page>

			<Footer />
		</>
	);
}
