import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import SearchForm from 'components/Home/SearchForm';
import ExploreServices from 'components/Home/ExploreServices';
import { benefits } from '../constants/Benefits';
import BenefitItem from 'components/Home/BenefitItem';
import Timeline from 'components/Home/Timeline';
import Footer from 'components/Footer';
import MyModal from 'components/Modal';
import Auth from 'components/Auth/Auth';
import { device } from 'components/MediaSizes';
import Header from 'components/Nav/Header';
import { IntroServiceList } from 'components/Home/Services';
import { authContext } from '../contexts/AuthContext';

// ==== Styled Components ====
import { Section, SectionTitle } from 'components/styled/HomePage';
import { Box } from '@mui/material';

const StyledMain = styled.main`
	margin-top: -56px;

	@media (min-width: 0px) and (orientation: landscape) {
		margin-top: -48px;
	}

	@media (min-width: 600px) {
		margin-top: -64px;
	}

	@media (min-width: 1600px) {
		margin-top: -120px;
	}
`;

// ===== Intro section =====
const Intro = styled(Section)`
	background: url('images/decorations/GradientMaskCircles.png');
	background-repeat: no-repeat;
	background-size: contain;
	padding-top: calc(${(props) => props.theme.headerHeight} + 1.5rem);

	@media screen and ${device.laptop} {
		padding-top: 8em;
	}

	@media screen and ${device.laptopXL} {
		padding-bottom: 6em;
	}
`;

const IntroContainer = styled(Container)`
	@media screen and ${device.tablet} {
		display: grid;
		align-items: center;
		grid-template-columns: 60% 40%;
	}

	@media screen and ${device.laptop} {
		margin-bottom: 6em;
		padding-left: 7%;
		max-width: 1785px;
	}
`;

const IntroTitle = styled(Typography).attrs(() => ({
	variant: 'h1',
}))`
	font-size: ${(props) => props.theme.h1FontSize};
	font-family: ${(props) => props.theme.bodyFont};
	font-weight: ${(props) => props.theme.fontBold};
	color: ${(props) => props.theme.primaryColor};

	@media screen and ${device.laptop} {
		font-size: 3.5rem;
	}

	@media screen and ${device.laptopL} {
		font-size: 4rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 4.5rem;
	}
`;

const IntroBenefits = styled.ul`
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: space-evenly;
	li {
		font-weight: ${(props) => props.theme.fontBold};
	}

	@media screen and ${device.laptop} {
		justify-content: flex-start;
		max-width: initial;

		li {
			margin-right: 1.5em;
			font-size: 1rem;
		}
	}

	@media screen and ${device.laptopL} {
		li {
			font-size: 1.3rem;
		}
	}

	@media screen and ${device.laptopXL} {
		li {
			font-size: 1.6rem;
		}
	}
`;

const IntroSearch = styled.div`
	max-width: 700px;

	@media screen and ${device.laptopXL} {
		max-width: initial;
	}
`;

const StyledSearchForm = styled(SearchForm)`
	 {
		font-weight: bold;
		@media screen and ${device.laptop} {
			width: 70%;
		}

		@media screen and ${device.laptopXL} {
			width: 76%;
		}
	}
`;

const IntroContent = styled.div`
	margin-bottom: 1.5em;

	@media screen and ${device.laptop} {
		position: relative;
		top: -5%;
	}
`;

// ====== digpads section ======
const Digpads = styled(Section)`
	background: ${(props) => props.theme.primaryGradient};
	padding-bottom: 0;
	position: relative;
	overflow: visible;
	margin-bottom: 1em;

	@media screen and ${device.laptop} {
		padding-bottom: 5em;
	}
`;

const DigpadsContainer = styled(Container)`
	@media screen and ${device.laptop} {
		display: flex;
		max-width: 1080px;
	}

	@media screen and ${device.laptopXL} {
		max-width: 1280px;
	}
`;

const DigpadsBenefitList = styled.ul`
	text-align: left;

	@media screen and ${device.tablet} {
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 4em;
		column-gap: 2em;
		max-width: 730px;
		margin-left: auto;
		margin-right: auto;
	}

	@media screen and ${device.laptop} {
		grid-template-columns: 1fr;
		margin: 0;
	}

	@media screen and ${device.laptopXL} {
		max-width: 540px;
	}
`;

const DigpadsImg = styled.div`
	bottom: -1.5em;
	position: relative;
	width: 340px;
	margin: 0 auto;

	overflow: hidden;

	img {
		vertical-align: middle;
	}

	@media screen and ${device.tablet} {
		width: 100%;
		bottom: -2.2em;
	}

	@media screen and ${device.laptop} {
		width: initial;
		bottom: -3em;

		position: absolute;
		right: 0;

		img {
			max-width: 700px;
			position: relative;
			right: -80px;
		}
	}

	@media screen and ${device.laptopL} {
		bottom: -3.7em;

		img {
			max-width: 850px;
		}
	}

	@media screen and ${device.laptopXL} {
		bottom: -4.4em;

		img {
			max-width: 1000px;
		}
	}
`;

// ==== Recent works/Timeline =====
const RecentWorks = styled(Section)`
	background: linear-gradient(to right, #fff, #bfd2f8 100%);

	.MuiTimeline-root {
		margin-bottom: 4em;
		text-align: left;
		@media screen and (min-width: 1260px) {
			margin: 20px 0;
		}
	}

	.MuiTimeline-root,
	.more-works {
		max-width: 440px;
		margin-right: auto;
		margin-left: auto;
		font-weight: 800;
	}

	.more-works p {
		margin-bottom: 1.5em;
		font-weight: 800;
	}

	.MuiIcon-root img {
		vertical-align: middle;
	}

	.MuiIcon-root {
		width: 1.8em;
		height: 1.8em;
	}
`;

const RecentWorksContainer = styled(Container)`
	max-width: 1550px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;

	.timeline-wrapper {
		width: 100%;
		order: 2;

		@media screen and (min-width: 1260px) {
			margin: 20px 0;
			margin-top: 20px;
		}
	}

	.more-works {
		margin-bottom: 3em;
		height: 80px;
		font-weight: 800;
		margin-right: 30px;
		margin-top: 30px;
		@media screen and (min-width: 1260px) {
			margin-bottom: 0;
		}
	}
`;

const RecentWorksTitle = styled(SectionTitle)`
	text-align: left;
`;

const RegisterNow = styled(Section)`
	padding: 35px 0 0;

	.MuiButton-root {
		background-color: green;
		color: white;
		border-radius: 10px;
	}
`;

const StyledRegisterContainer = styled(Container)`
	display: flex;
	justify-content: center;
`;

const StyledButton = styled(Button)`
	&& {
		text-transform: none;
		font-size: 1.4rem;
	}
`;

export default function Home() {
	const { auth } = React.useContext(authContext);
	const [promptLogin, setPromptLogin] = useState(false);

	function RegisterModalControl() {
		if (!auth.authenticated) {
			setPromptLogin(!promptLogin);
		}
	}

	return (
		<>
			<Header />

			<StyledMain>
				{/* ====== Intro Section =======*/}
				<Intro>
					<IntroContainer maxWidth='lg'>
						<IntroContent>
							<IntroTitle>
								Dedicated to the
								<br></br>
								Independent Landlord.
							</IntroTitle>
							<IntroBenefits>
								<li>Knowledge.</li>
								<li>Collaboration.</li>
								<li>Research.</li>
								<li>Tools.</li>
							</IntroBenefits>

							<IntroSearch id='search'>
								<StyledSearchForm />
							</IntroSearch>
						</IntroContent>

						<picture>
							<source
								media={device.laptop}
								srcSet='images/FamilyHouse@2x.png'
							/>
							<img src='images/FamilyHouse.png' alt='family house' />
						</picture>
					</IntroContainer>

					<Container>
						<IntroServiceList />
					</Container>
				</Intro>

				{/* ===== digpads Section ===== */}
				<Digpads>
					<DigpadsContainer>
						<div
							style={{
								width: '100%',
							}}
						>
							<Box
								display='flex'
								justifyContent={'center'}
								mb={2}
								alignItems={'flex-start'}
								flexWrap='wrap'
								width={'100%'}
							>
								<SectionTitle>
									Why <span>digpads?</span>
								</SectionTitle>
								<RegisterNow style={{ padding: 0 }}>
									<StyledRegisterContainer maxWidth='lg'>
										<StyledButton
											endIcon={<ArrowRightAltIcon />}
											color='primary'
											variant='contained'
											onClick={RegisterModalControl}
										>
											Join digpads
										</StyledButton>
									</StyledRegisterContainer>
								</RegisterNow>
							</Box>
							<DigpadsBenefitList>
								{benefits.map((bft, i) => (
									<BenefitItem
										key={i}
										img={bft.img}
										title={bft.title}
										text={bft.text}
									/>
								))}
							</DigpadsBenefitList>
						</div>
						<DigpadsImg className='digpads-img'>
							<picture>
								<source
									media={device.laptop}
									srcSet='images/CloudHouseCouple@2x.png'
								/>
								<img src='images/CloudHouseCouple.png' alt='house' />
							</picture>
						</DigpadsImg>
					</DigpadsContainer>
				</Digpads>

				{/* ===== Explore Services section ===== */}
				<ExploreServices
					registerButton={
						<RegisterNow>
							<StyledRegisterContainer maxWidth='lg'>
								<StyledButton
									endIcon={<ArrowRightAltIcon />}
									color='primary'
									variant='contained'
									onClick={RegisterModalControl}
								>
									Join digpads
								</StyledButton>
							</StyledRegisterContainer>
						</RegisterNow>
					}
				/>

				<RecentWorks>
					<RecentWorksContainer>
						<RecentWorksTitle>
							Grow your<br></br>
							<span>Rental Business</span>
							<br />
							{/* <Button
								endIcon={<ArrowRightAltIcon />}
								color='primary'
								variant='contained'
								style={{ textTransform: 'capitalize' }}
								onClick={RegisterModalControl}
							>
								Join digpads
							</Button> */}
							<RegisterNow>
								<StyledButton
									sx={{ marginTop: '-50px' }}
									endIcon={<ArrowRightAltIcon />}
									color='primary'
									variant='contained'
									onClick={RegisterModalControl}
								>
									Join digpads
								</StyledButton>
							</RegisterNow>
							<MyModal
								display={promptLogin}
								modalControl={RegisterModalControl}
							>
								<div>
									<Auth
										page='Sign Up'
										promptLogin={promptLogin}
										onLoggedIn={() => setPromptLogin(false)}
									/>
								</div>
							</MyModal>
						</RecentWorksTitle>

						<div className='timeline-wrapper'>
							<Timeline />
						</div>
						<div className='more-works'>
							<Typography variant='body1'>
								digpads products help landlord no matter where they are along
								the journey of growing their rental business.
							</Typography>
							{/* <Button
								endIcon={<ArrowRightAltIcon />}
								color='primary'
								variant='contained'
							>
								more works
							</Button> */}
						</div>
					</RecentWorksContainer>
				</RecentWorks>
				<RegisterNow>
					<StyledRegisterContainer maxWidth='lg' sx={{ mb: 2 }}>
						<StyledButton
							endIcon={<ArrowRightAltIcon />}
							color='primary'
							variant='contained'
							onClick={RegisterModalControl}
						>
							Join digpads
						</StyledButton>
					</StyledRegisterContainer>
				</RegisterNow>
			</StyledMain>

			<Footer />
		</>
	);
}
