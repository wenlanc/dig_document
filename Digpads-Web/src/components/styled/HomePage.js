import styled, { css } from 'styled-components';
import { space, layout, color, typography } from 'styled-system';
import { Grid, Input } from '@mui/material';
import { device } from '../MediaSizes';
import Typography from '@mui/material/Typography';

export const Section = styled.section`
	padding: 2em 0;
	text-align: center;

	@media screen and ${device.laptop} {
		text-align: left;
	}

	@media screen and ${device.laptop} {
		padding: 5em 0;
	}

	@media screen and ${device.laptopXL} {
		padding: 8em 0;
	}
`;

export const SectionTitle = styled(Typography).attrs(() => ({ variant: 'h4' }))`
	margin-bottom: 1em;
	color: ${(props) => props.theme.primaryColor};
	font-weight: normal;
	span {
		font-weight: bold;
	}

	@media screen and ${device.laptop} {
		font-size: 2.6rem;
	}

	@media screen and ${device.laptopL} {
		font-size: 3rem;
	}

	@media screen and ${device.laptopXL} {
		font-size: 3.75rem;
	}
`;

export const Mask = styled.div`
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	${(props) =>
		css`
			background-image: url('${props.image}');
		`};
`;

export const HeaderText = styled.p`
	color: ${(props) => props.theme.primary};
	font-size: 40px;
	font-weight: bold;
	height: 100%;
`;

export const Spacer = styled.div(space);

export const SGrid = styled(Grid)`
	${space}
	${layout}
	${color}
	display:flex;
	text-align: center;
`;

export const BannerContainer = styled(Grid)`
	${space}
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 5% 10%;
`;

export const SSpan = styled.span`
	${space}
	${layout}
	width:20%;
	display: block;
	text-align: center;
	background-repeat: no-repeat;
	background-size: cover;
	padding: 1%;
`;

export const Banner = styled.img`
	${layout}
	position: relative;
	width: 100%;
`;

export const BannerIcon = styled.img`
	${layout}
	padding-top:10%;
	width: 35%;
`;

export const BannerText = styled.p`
	${layout}
	font-size: 14px;
`;

export const HeroImageContainer = styled.div`
	width: 100%;
	background-image: linear-gradient(
		to right,
		rgba(249, 250, 254, 0),
		#cddaf6
	);
	display: inline-block;
	height: 90%;
`;

export const RightHalfImage = styled.img`
	width: 50%;
	float: right;
	object-fit: cover;
	display: block;
	position: relative;
	height: 100%;
`;

export const ServiceImage = styled.img`
	object-fit: contain;
	height: 30vh;
	width: auto;
`;

export const ServiceImageCont = styled.div`
	background-color: ${(props) => props.theme.lightblue};
	width: 100%;
	height: 40vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export const ServiceImageTitle = styled.p`
	font-weight: 600;
	font-size: 18px;
	margin: ${(props) =>
		props.imageLeft === true ? ' 0 0 0 10%' : '0 10% 0 0 '};
`;

export const ServiceImageDesc = styled.p`
	margin: ${(props) =>
		props.imageLeft === true ? ' 0 0 0 10%' : '0 10% 0 0 '};
	font-size: 14px;
`;

export const ServiceImageTextCont = styled.div`
	font-size: 12px;
	text-align: ${(props) =>
		props.imageLeft === true ? 'left' || 'left' : 'right'};
	width: 100%;
	flex: 1;
	padding-top: 4%;
`;

export const ServiceRow = styled.div`
	display: flex;
	flex-direction: row;
`;

export const CenteredImage = styled.div`
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	${(props) =>
		css`
			background-image: url('${props.imageURL}');
		`};
`;

export const LayoutGrid = styled(Grid)`
	${layout}
	${space}
`;

export const SubBox = styled.div`
	background-repeat: no-repeat;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 60%;
	background-position: center;
	${(props) =>
		css`
			background-image: url('${props.imageURL}');
		`};
`;

export const Text = styled.span`
	${typography}
	${color}
	${layout}
	${space}
`;

export const EmailInput = styled(Input)`
	color: white !important;
	margin: 2%;
	border-bottom: 2px solid white !important;
	width: 30%;
`;

export const SubscribeButton = styled.button`
	height: 80%;
	padding: 1%;
	color: ${(props) => props.theme.primary};
	font-weight: 600;
	font-size: 18px;
	border-radius: 5px;
	border: 0px;
`;

export const BannerTitle = styled.p`
	font-size: 18px;
	font-weight: 600;
`;
