import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../MediaSizes';

export const StyledContainer = styled(Grid)`
	margin-bottom: 1rem;
	font-family: 'Roboto', sans-serif;
	padding: 0 0;
	border-style: dotted;
	border-radius: 6px;
	border-color: steelblue;
	border-width: 1px;
	box-sizing: border-box;
	cursor: pointer;
`;

export const HeadingGrid = styled(Grid)`
	border-bottom: 1px steelblue dotted;
	padding: 10px;
`;

export const StyledHeading = styled(Typography)`
	font-size: 34px;
	letter-spacing: -0.011em;
	line-height: 60px;
	margin-top: 0.55em;
	color: #003665;
	margin-top: 0;
`;

export const StyledBox = styled(Box)`
	position: fixed;
	top: 40vh;
	left: 5vw;
`;

export const StyledContentBox = styled(Box)`
	line-height: 1.4rem;
	max-height: 200px;
	margin-bottom: 0.5em;
	display: -webkit-box;
	-webkit-line-clamp: 9;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const StyledName = styled(Typography)`
	margin-left: 0.8rem;
	display: flex;
	flex-direction: column;
	height: 70px;
	justify-content: space-between;
`;

export const StyledAuthorContainer = styled(Container)`
	margin-bottom: 2rem;
`;

export const StyledAuthor = styled(Box)`
	display: flex;
	margin: 1rem 0rem;
`;

export const StyledType = styled(Grid)`
	border: 1px steelblue dotted;
	background-color: rgba(70, 130, 180, 0.3);
	padding: 0.5rem;
	border-radius: 6px;
	text-align: center;
`;

export const StyledPaper = styled(Paper)`
	box-shadow: none;

	@media screen and ${device.laptop} {
		padding: 1rem;
		box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
			0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
	}
`;

export const FollowButton = styled.button`
	border: 1px steelblue dotted;
	background-color: rgba(70, 130, 180, 0.3);
	padding: 0.5rem;
	border-radius: 9999px;
	margin: 50;
	text-align: center;
	padding: 0.3rem 1rem;
`;

export const StickySpan = styled.span`
	position: sticky;
	left: 0;
	top: 0;
`;

export const AllCategoryContainer = styled.div`
	margin-top: 10%;
	margin-right: 5px;
`;

export const CreatePostTextContainer = styled(Button)`
	&& {
		font-size: 0.96rem;
		padding-left: 14px;
		margin-bottom: 1em;
	}
`;

export const PostTypeContainer = styled.div`
	width: 120px;
	height: 35px;
	border: 1px dotted #7a7a7a;
	margin-left: 2%;
	text-align: center;
	border-radius: 50px;
	cursor: pointer;
	@media (max-width: 768px) {
		display: none;
	}
`;

export const StyledTypeText = styled(Typography)`
	margin-top: 7%;
	font-size: 13px;
	color: #8f9aa9;
	font-weight: bold;
`;
export const IconsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-bottom: 1px steelblue dotted;
`;

export const StyledCategoryMessage = styled.div`
	text-align: center;
	margin-top: 10%;
	font-size: 20px;
	font-weight: bold;
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
`;

export const StyledFavoriteCommunities = styled(Paper).attrs(() => ({
	elevation: 1,
	style: { padding: '0.5em', marginBottom: '2em' },
}))``;

export const PageBanner = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url(images/FeedBanner.jpeg);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	height: 110px;
	color: #ffffff;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media screen and ${device.mobileL} {
		height: 140px;
	}

	@media screen and ${device.tablet} {
		height: 200px;
	}

	@media screen and (min-width: 960px) {
		margin-bottom: 1em;
		height: 300px;
	}
`;
