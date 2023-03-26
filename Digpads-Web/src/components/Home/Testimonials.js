import React from 'react';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Slider from 'react-slick';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { device } from '../MediaSizes';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledTestimonials = styled.section`
	background: linear-gradient(to bottom, #f9f9f9, #f1f1f1);

	padding-top: 2em;

	.MuiContainer-root {
		max-width: 600px;
		margin: 0 auto;
	}

	@media screen and ${device.tablet} {
		padding-top: 3em;
	}

	@media screen and ${device.laptop} {
		padding-top: 7em;

		.MuiContainer-root {
			max-width: 1280px;
			margin-right: 0;
			padding-right: 0;
		}
	}

	@media screen and ${device.laptopXL} {
		.MuiContainer-root {
			max-width: 1550px;
		}
	}
`;

const TestimonialsContainer = styled.div`
	@media screen and ${device.laptop} {
		display: flex;
	}
`;

const TestimonialsTitle = styled(Typography)`
	color: ${(props) => props.theme.primaryColor};
	margin-bottom: 2em;
	text-align: center;

	@media screen and ${device.laptop} {
		font-size: 2.6rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 3.5rem;
	}
`;

const TestimonialsImg = styled.div`
	img {
		vertical-align: middle;
	}
`;

const TestimonialCarousel = styled.div`
	position: relative;
	background-color: white;
	border-radius: 10px;
	padding: 3em 1.5em 1em 1.5em;

	@media screen and ${device.laptop} {
		align-self: center;
	}
`;

const Testimonial = styled(Typography)`
	margin-bottom: 1.5em;

	@media screen and ${device.laptop} {
		font-size: 1.25rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 1.5625rem;
	}
`;

const StyledButton = styled.button`
	border: 0;
	outline: 0;
	font-size: 100%;
	color: inherit;
`;

const SliderContainer = styled.div`
	@media screen and ${device.laptop} {
		width: 450px;
	}

	@media screen and ${device.laptop} {
		width: 550px;
	}

	@media screen and ${device.laptopXL} {
		width: 650px;
	}
`;

const SliderControls = styled.div`
	display: flex;
	justify-content: center;

	position: absolute;
	bottom: -35px;
	left: 35%;
`;

const SlideControlButton = styled(StyledButton)`
	border-radius: 7px;
	padding: 0.3em 1em;

	border-radius: 16px;
	color: white;
	display: block;
	margin: 10px;
	padding: 3px 25px;

	:hover {
		cursor: pointer;
	}

	.MuiSvgIcon-root {
		font-size: 2.5rem;
	}
`;

const PreviousSlide = styled(SlideControlButton)`
	background-color: #434242;

	transform: perspective(300px) rotateY(-40deg);
	transform-origin: right bottom;
`;

const NextSlide = styled(SlideControlButton)`
	background-color: ${(props) => props.theme.primaryColor};

	transform: perspective(300px) rotateY(40deg);
	transform-origin: left bottom;
`;

const PauseButton = styled(StyledButton)`
	width: 70px;
	height: 70px;
	border-radius: 40%;
	position: absolute;
	background-color: ${(props) => props.theme.primaryColor};
	top: -35px;
	left: 30%;

	display: flex;
	align-items: center;
	justify-content: center;

	.MuiSvgIcon-root {
		font-size: 3.5rem;
		color: white;
	}

	:hover {
		cursor: pointer;
	}
`;

const Client = styled.div`
	display: flex;
`;

const ClientImg = styled.div`
	margin-right: 0.5em;

	img {
		border-radius: 50%;
	}
`;

const ClientName = styled.div`
	color: ${(props) => props.theme.primaryColor};
	font-size: 0.9rem;
	font-weight: bold;

	@media screen and ${device.laptopXL} {
		font-size: 1.2rem;
	}
`;

const ClientCity = styled.div`
	color: gray;
	font-size: 0.8rem;
	margin-bottom: 0.3em;

	@media screen and ${device.laptopXL} {
		font-size: 1rem;
	}
`;

const ClientRating = styled.div`
	position: relative;
	right: 6px;
	display: flex;

	.MuiSvgIcon-root {
		color: #ffd100;
		font-size: 1.3rem;
	}
`;

const Star = styled.span`
	margin: 0 0.3em;
`;

export default function Testimonials() {
	const [slider, setSlider] = React.useState(null);
	const [sliderPaused, setSliderPaused] = React.useState(false);

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		mobileFirst: true,
		pauseOnHover: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 6000,
	};

	const handlePause = () => {
		// Toggle paused/play
		if (sliderPaused) {
			slider.slickPlay();
			setSliderPaused(false);
		} else {
			slider.slickPause();
			setSliderPaused(true);
		}
	};

	return (
		<StyledTestimonials>
			<TestimonialsTitle variant='h4' gutterBottom={true}>
				What says <b>our clients</b>
			</TestimonialsTitle>
			<Container>
				<TestimonialsContainer>
					<TestimonialCarousel>
						<PauseButton onClick={() => handlePause()}>
							{sliderPaused ? <PlayArrowIcon /> : <PauseIcon />}
						</PauseButton>

						<SliderContainer>
							<Slider
								ref={(sl) => setSlider(sl)}
								{...sliderSettings}
							>
								<div>
									<Testimonial
										variant='body1'
										gutterBottom={true}
									>
										I am so proud to part of them, i have
										spent there few years, I supporvt and
										apricate their business system. all are
										Agents was very fantastic. all real
										estate property was very awesome also
										their services. I personally recommend
										their courses.
									</Testimonial>
									<Client>
										<ClientImg>
											<img
												src='https://placekitten.com/50/50'
												alt='client'
											/>
										</ClientImg>
										<div>
											<ClientName>
												Posix Moan, Super sussy
											</ClientName>
											<ClientCity>
												Pheonix City
											</ClientCity>
											<ClientRating>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
											</ClientRating>
										</div>
									</Client>
								</div>
								<div>
									<Testimonial
										variant='body1'
										gutterBottom={true}
									>
										This was a amazing experience learing
										from the best in the industry. Thanks to
										these guys I increased my income and
										have less stress landlording. Highly
										recommend their courses, they open your
										eyes on what really matters in
										landlording.
									</Testimonial>
									<Client>
										<ClientImg>
											<img
												src='https://placekitten.com/50/50'
												alt='Client'
											/>
										</ClientImg>
										<div>
											<ClientName>
												John Doe, VP junior
											</ClientName>
											<ClientCity>
												California City
											</ClientCity>
											<ClientRating>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
											</ClientRating>
										</div>
									</Client>
								</div>
								<div>
									<Testimonial
										variant='body1'
										gutterBottom={true}
									>
										Quite useful resource, makes you rethink
										your business top to bottom. Instructors
										are competent and professional. I
										especially like customer care, shows
										that these guys really care about you.
									</Testimonial>
									<Client>
										<ClientImg>
											<img
												src='https://placekitten.com/50/50'
												alt='Client'
											/>
										</ClientImg>
										<div>
											<ClientName>
												Steve Kafkolchak
											</ClientName>
											<ClientCity>
												Las Vegas City
											</ClientCity>
											<ClientRating>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
												<Star>
													<StarIcon />
												</Star>
											</ClientRating>
										</div>
									</Client>
								</div>
							</Slider>
						</SliderContainer>

						<SliderControls>
							<PreviousSlide onClick={() => slider.slickPrev()}>
								<ChevronLeftIcon />
							</PreviousSlide>
							<NextSlide onClick={() => slider.slickNext()}>
								<ChevronRightIcon />
							</NextSlide>
						</SliderControls>
					</TestimonialCarousel>

					<TestimonialsImg>
						<picture>
							<source
								srcSet='/images/TestimonialFeedback@2x.png'
								media={device.laptop}
							/>
							<img
								src='/images/TestimonialFeedback.png'
								alt='Client'
							/>
						</picture>
					</TestimonialsImg>
				</TestimonialsContainer>
			</Container>
		</StyledTestimonials>
	);
}
