import React from 'react';
import styled from 'styled-components';
import { device } from '../MediaSizes';
import Typography from '@mui/material/Typography';

const StyledBenefitItem = styled.li`
	margin: 0 auto 3em;
	display: flex;
	max-width: 420px;

	@media screen and ${device.tablet} {
		margin: auto;
	}

	@media screen and ${device.laptop} {
		margin: 0;
	}

	@media screen and ${device.laptopXL} {
		max-width: initial;
	}
`;

const BenefitImg = styled.div`
	width: 40px;
	height: 40px;
	margin: 5px 1em 0 0;
	text-align: center;
	background: ${(props) => props.theme.primaryColor};
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;

	img {
		vertical-align: middle;
	}

	@media screen and ${device.mobileL} {
		width: 55px;
		height: 55px;

		img {
			width: 75%;
		}
	}

	@media screen and ${device.laptopXL} {
		width: 75px;
		height: 75px;

		img {
			width: 100%;
		}
	}
`;

const BenefitTitle = styled(Typography).attrs(() => ({
	variant: 'subtitle1',
}))`
	font-weight: bold;
`;

const BenefitText = styled(Typography).attrs(() => ({
	variant: 'body2',
}))`
	@media screen and ${device.laptopL} {
		font-size: 1rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 1.25rem;
	}
`;

export default function BenefitItem(props) {
	return (
		<StyledBenefitItem>
			<BenefitImg>
				<picture>
					<source
						media={device.mobileL}
						srcSet={getLargeImage(props.img)}
					/>
					<img src={props.img} alt='Benefit' />
				</picture>
			</BenefitImg>

			<div className='benefit__content'>
				<BenefitTitle>{props.title}</BenefitTitle>

				<BenefitText>{props.text}</BenefitText>
			</div>
		</StyledBenefitItem>
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
