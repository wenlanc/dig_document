import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useMediaQuery } from '@mui/material';
import { device } from '../MediaSizes';
import { exploreServices as services } from './Services';

// ==== Styled Components ====
import { Section, SectionTitle } from '../styled/HomePage';

// ==== Explore Services section ====
const StyledExploreServices = styled(Section)`
	${SectionTitle} {
		text-align: center;
	}
`;

const ExploreContainer = styled(Container)`
	@media screen and ${device.laptop} {
		max-width: 1080px;
	}

	@media screen and ${device.laptopXL} {
		max-width: 1230px;
	}
`;

const ExploreImg = styled.div`
	flex-shrink: 0;
	background: #f6f9fe;
	padding: 2em 0.3em;

	@media screen and ${device.laptop} {
		padding-top: 4em;
		padding-bottom: 4em;
		width: 50%;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
`;

const ExploreContent = styled.div`
	padding: 2em 3em;

	@media screen and ${device.laptop} {
		padding: 0 3em 0 3em;
		align-self: center;
	}
`;

const ExploreItem = styled.li`
	margin-bottom: 2em;
	max-width: 440px;
	margin-left: auto;
	margin-right: auto;

	@media screen and ${device.laptop} {
		display: flex;
		max-width: initial;
		height: 360px;
		margin-bottom: 0;

		&:nth-child(2),
		&:nth-child(4) {
			${ExploreImg} {
				order: 2;
			}

			${ExploreContent} {
				text-align: right;
			}
		}
	}

	@media screen and ${device.laptopXL} {
		height: 480px;
	}
`;

const ExploreItemTitle = styled(Typography).attrs(() => ({
	variant: 'subtitle1',
}))`
	margin-bottom: 0.7em;
	font-weight: bold;

	@media screen and ${device.laptop} {
		font-size: 1.375rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: ${(props) => props.theme.fontSizeLarge};
	}
`;

const ExploreItemDescription = styled(Typography).attrs(() => ({
	variant: 'body2',
}))`
	margin-bottom: 1.5em;

	screen and ${device.laptop} {
		font-size: 1rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: ${(props) => props.theme.fontSizeMedium};
	}
`;

const StyledButton = styled(Button)`
	border-radius: 7px;
	text-transform: lowercase;
	padding: 0.6em 1.5em;
`;

export default function ExploreServices({ registerButton }) {
	const desktopMatch = useMediaQuery(device.laptop);

	return (
		<StyledExploreServices>
			<ExploreContainer>
				<SectionTitle>
					Explore digpads’<br></br> <span>Products & Services</span>
				</SectionTitle>

				<ul className='services'>
					{services.map((service) => {
						return (
							<ExploreItem
								className='service'
								key={service.image}
							>
								<ExploreImg>
									<img
										src={
											desktopMatch
												? getLargeImage(service.image)
												: service.image
										}
										alt='Service'
									/>
								</ExploreImg>
								<ExploreContent>
									<ExploreItemTitle>
										{service.title}
									</ExploreItemTitle>
									<ExploreItemDescription>
										{service.description}
									</ExploreItemDescription>
									<StyledButton
										variant='contained'
										color='primary'
										endIcon={<ArrowRightAltIcon />}
										href={service.href}
									>
										read more
									</StyledButton>
								</ExploreContent>
							</ExploreItem>
						);
					})}
				</ul>
				{registerButton}
			</ExploreContainer>
		</StyledExploreServices>
	);
}

/**
 * @param {String} image - path to image
 * @returns path to large image
 * Eg: images/icons/BlueOutlineTools.png =>
 * images/icons/BlueOutlineTools@2x.png
 */
function getLargeImage(image) {
	const beforeExtension = image.indexOf('.');
	const imgWithoutExtension = image.slice(0, beforeExtension);
	const largeImg =
		imgWithoutExtension +
		'@2x' +
		image.slice(beforeExtension, image.length);

	return largeImg;
}
