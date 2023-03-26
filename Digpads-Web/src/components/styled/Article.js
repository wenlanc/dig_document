import { device } from '../MediaSizes';
import Spinner from '../Spinner';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';

// #region Styled Components
export const Page = styled.div`
	background: url('../images/decorations/GradientMaskCircles.png');
	background-repeat: no-repeat;
	background-size: 100%;

	.MuiTypography-body1 {
		line-height: 2;
	}

	.related-articles .MuiTypography-h5 {
		margin-bottom: 1em;
	}

	@media screen and ${device.tablet} {
		aside .MuiContainer-root {
			padding-left: 12px;
		}
	}
`;

export const Wrapper = styled.div`
	@media screen and ${device.laptop} {
		padding-top: 3rem;
		display: flex;
		max-width: 1280px;
		margin: 0 auto;

		main {
			width: 75%;
			flex-shrink: 0;
			margin-bottom: 5em;
		}

		aside {
			padding: 2em 0;
		}
	}
`;

export const StyledContainer = styled(Container)`
	padding-top: 1.5em;
`;

export const Title = styled(Typography).attrs(() => ({
	gutterBottom: true,
}))`
	color: ${(props) => props.theme.primaryColor};
	font-weight: bold;
`;

export const StyledArticle = styled.article`
	margin-bottom: 2em;

	@media screen and ${device.laptop} {
		margin-bottom: 5em;
	}
`;

export const UpperContainer = styled.div`
	.article-img {
		width: 50%;
	}

	.article-img {
		width: ${(props) =>
			props.textAlongsideImage?.toString() === 'true' ? '50%' : '100%'};
	}

	flex-direction: ${(props) =>
		props.textAlongsideImage?.toString() === 'true' ? 'row' : 'column'};

	@media screen and (max-width: 800px) {
		.article-img {
			width: 100%;
		}
	}
`;

export const ArticleTitle = styled(Title)`
	font-size: 2rem;
	margin-bottom: 0.2em;
`;

export const ArticleContent = styled.div`
	ul {
		list-style: disc;
		padding-left: 1.5em;
	}
`;

export const ArticleMeta = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 1em;
	font-size: 0.8rem;
`;

export const ArticleSocial = styled.div`
	margin-left: auto;

	.social-icons {
		margin: 0;
	}

	.MuiSvgIcon-root {
		color: #757575;
	}

	.MuiSvgIcon-root:hover {
		cursor: pointer;
		color: ${(props) => props.theme.primaryColor};
	}

	ul {
		display: flex;
	}

	li {
		margin: 0 0.5em;
	}
`;

export const ArticleImg = styled.div`
	position: relative;
	flex-shrink: 0;
	align-self: flex-start;
	margin-right: 1em;
	float: left;

	img {
		border: 1px solid ${(props) => props.theme.primaryColor};
	}
`;

export const Styledimg = styled.img`
	vertical-align: middle;
	height: auto;
	width: 100%;
	@media screen and (max-width: 800px) {
		height: auto;
		width: 100%;
	}
`;

export const ThisPublicationDate = styled.div`
	background-color: ${(props) => props.theme.primaryColor};

	time {
		display: flex;
		flex-direction: column;
		width: 100%;
		color: white;
		height: 100%;
		justify-content: center;
		align-items: center;
		line-height: 1.2;
	}

	.day {
		font-size: 4vw;
		font-weight: bold;
	}

	.month {
		text-transform: uppercase;
		font-weight: 300;
		font-size: 2vw;
	}

	position: absolute;
	width: 60px;
	height: 80px;
	top: 0;
	left: 2.6%;
	padding: 28px;

	@media screen and ${device.laptop} {
		.day {
			font-size: 30px;
			font-weight: bold;
		}

		.month {
			text-transform: uppercase;
			font-weight: 300;
			font-size: 14px;
		}
	}
`;

export const PageTitle = styled(Typography).attrs(() => ({
	variant: 'h5',
}))`
	font-weight: ${(props) => props.theme.fontNormal};
	margin-bottom: 0.5em;

	@media screen and ${device.tablet} {
		padding-left: 14px;
	}
`;

export const StyledCircularProgress = styled(Spinner).attrs(() => ({
	type: 'circular',
	size: '15rem',
}))`
	display: block;
	&.MuiCircularProgress-root {
		margin: 0 auto;
	}
`;
