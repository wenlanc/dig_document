import React from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import { device } from '../../MediaSizes';
import { Link } from 'react-router-dom';
const StyledServiceItem = styled.div`
	background: url('images/decorations/GrayBanner.png') no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1.8em 1.5em 3em;
	margin: 0.5em;
	height: 300px;
	width: 250px;
	position: relative;
	clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 93%, 50% 93%, 0 100%, 0 0);

	.service__link {
		vertical-align: super;
		font-weight: bold;
		text-decoration: none;
	}

	span {
		font-weight: bold;
	}

	@media screen and ${device.laptopXL} {
		padding-bottom: 4em;
		width: 280px;
		height: 350px;
	}
`;

const Ellipse = styled.span`
	transform: rotate(65deg);
	border-radius: 50%;
	height: 75%;
	width: 75%;
	display: inline-block;
	position: absolute;
	z-index: -1;
	position: absolute;
`;

const EllipseBg = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;

	${Ellipse}:nth-child(1) {
		background-color: #f9f9f8ba;
		top: -55%;
		left: 10%;
	}

	${Ellipse}:nth-child(2) {
		background-color: #f9f9f863;
		top: -55%;
		left: 24%;
	}
`;

const ServiceItemImg = styled.div`
	height: 70px;
	align-self: center;
	margin-bottom: 1em;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	@media screen and ${device.laptopXL} {
		height: 100px;
		margin-bottom: 1.5em;
	}
`;

const ServiceTitle = styled(Typography)`
	@media screen and ${device.laptop} {
		font-size: 1.125rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 1.36rem;
	}
`;

const ServiceText = styled(Typography)`
	margin-bottom: auto;

	@media screen and ${device.laptopXL} {
		font-size: ${(props) => props.theme.fontSizeNormal};
	}
`;

export default function ServiceItem({ image, title, description, href }) {
	return (
		<StyledServiceItem>
			<EllipseBg>
				<Ellipse />
				<Ellipse />
			</EllipseBg>
			<ServiceItemImg>
				<img src={image} className='service__img' alt='Service' />
			</ServiceItemImg>
			<ServiceTitle variant='subtitle1'>{boldifyLastWord(title)}</ServiceTitle>
			<ServiceText variant='body2' className='service__text'>
				{description}
			</ServiceText>
			<div
				style={{
					margin: '5px 0',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<ArrowForwardIosIcon color='primary' />
				<Link to={href} className='service__link'>
					Learn More
				</Link>
			</div>
		</StyledServiceItem>
	);
}

function boldifyLastWord(string) {
	const words = string.split(' ');
	const lastWord = words[words.length - 1];

	// remove last word
	words.pop();

	const result = words.join(' ');
	return (
		<>
			{result} <span>{lastWord}</span>
		</>
	);
}
