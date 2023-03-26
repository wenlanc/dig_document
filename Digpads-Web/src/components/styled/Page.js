import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const Banner = styled.div`
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url(/images/FeedBanner.jpeg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	height: 150px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	@media screen and (max-width: 599px) {
		display: none;
	}
`;

export const NarrowHeader = styled.div`
	position: relative;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;

	.MuiToolbar-root {
		width: 100% !important;
		margin: auto !important;
	}
`;

export const PageTitle = styled(Typography).attrs(() => ({
	variant: 'h1',
}))`
	color: #ffffff;
	font-size: 64px;
	font-weight: 400;

	@media screen and (max-width: 599px) {
		&.MuiTypography-root {
			font-size: 2.5rem;
			text-align: center;
			padding-bottom: 0.1em;
			border-bottom: 1px solid #ccc6c6;
			margin-top: 1rem;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 0.2em;
			width: 75%;
		}
	}
`;

export const PageSubtitle = styled(({ inBanner, ...props }) => (
	<Typography {...props} />
)).attrs(() => ({
	variant: 'h2',
}))`
	&.MuiTypography-root {
		font-size: 1.8rem;
		font-weight: 300;
		text-align: center;
		padding-bottom: 0.1em;
		border-bottom: ${(props) =>
			props.inBanner === 'true' ? 'none' : '1px solid #ccc6c6'};

		border-top: ${(props) =>
			props.inBanner === 'true' ? '1px solid #ccc6c6' : 'none'};

		margin-left: auto;
		margin-right: auto;
		margin-bottom: 0.5em;
		width: 50%;

		${(props) => props.inBanner === 'true' && `padding-top: 0.5em`};
	}
`;

export const SuiPageTitle = styled(Typography)`
	color: rgb(52, 71, 103);
	font-size: 32px;
	font-weight: bold;
	letter-spacing: 0.0075em;
`;
