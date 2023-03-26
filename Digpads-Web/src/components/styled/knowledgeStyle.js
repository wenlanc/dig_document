import styled from 'styled-components';
import { Link as Link2, Collapse, Tabs, Container } from '@mui/material';
import Spinner from '../Spinner';
import { Link } from 'react-scroll';
import { Paper } from '@mui/material';

export const MenuContainer = styled.div`
	width: 100%;
	height: 80px;
	border-bottom: 1px solid #d8d8d8;
`;
export const CategoriesContainer = styled.div`
	border: 2px solid black;
	border-radius: 5px;
	align-items: center;
	font-weight: 500;
	position: sticky;
	top: 80px;
	background-color: white;
	width: 100%;
	z-index: 4;
	display: flex;
	margin-bottom: 2em;
`;
export const CardContainer = styled.div`
	@media only screen and (max-width: 425px) {
		margin: 300px 0 0 7%;
	}
`;

export const OneCategoryContainer = styled(Link2)`
	margin-left: 4%;
	margin-top: 1%;
	color: #656565;
	font-size: 15px;
	cursor: pointer;
	:hover {
		text-decoration: none;
	}
`;
export const SelectedCategoryTitle = styled.div`
	text-align: center;
	font-size: 50px;
	font-weight: bold;
	margin-top: 4%;

	@media only screen and (max-width: 425px) {
		font-size: 30px;
	}
`;
export const PostCardsContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-top: 1%;
	@media only screen and (max-width: 425px) {
		display: grid;
		grid-template-columns: auto;
		grid-gap: 20px;
	}
`;

export const ImageStyles = styled.img`
	height: 100%;
	width: 100%;
	padding: 6% 6% 0 6%;
	@media only screen and (min-width: 1024px) {
		width: 70%;
	}
`;

export const OnePostCardContainer = styled(Paper)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 27vw;
	height: 300px;
	background-color: white;
	margin-left: 2%;
	margin-right: 2%;
	border-radius: 10px;
	margin-top: 1%;
	&:visited {
		text-decoration: none;
		color: black;
	}
	@media only screen and (max-width: 425px) {
		width: 90%;
	}
`;

export const PostCategoryTitle = styled.div`
	font-size: 30px;
	line-height: 26px;
	font-weight: 600;
	margin-left: 2%;
	@media only screen and (max-width: 425px) {
		font-size: 24px;
	}
`;

export const PostTitleContainer = styled.div`
	font-size: 20px;
	line-height: 26px;
	font-weight: 600;
	margin: 3% 7% 0 7%;
	@media only screen and (max-width: 425px) {
		font-size: 16px;
	}
`;

export const PostCardCategoryName = styled.div`
	margin-top: 3%;
	margin-left: 5%;
	color: #77787c;
	font-weight: 600;
	cursor: pointer;
	:hover {
		color: #086aff;
	}
`;

export const SmScreenNavBar = styled.div`
	position: sticky;
	z-index: 1000;
	top: 80px;
`;

export const StyledCollapse = styled(Collapse)`
	background-color: white;
	padding-top: 20px;
	margin-bottom: 5px;
`;

export const StyledUl = styled.ul`
	margin-top: -1em;
	margin-bottom: 0;
	display: flex;
	flex-direction: column;
`;

export const StyledTabs = styled(Tabs)`
	.MuiTabs-indicator {
		bottom: 7px;
	}
`;

export const StyledLink = styled(Link)`
	&.active {
		color: ${(props) => props.theme.primaryColor};
		font-weight: bold;
	}

	.MuiButtonBase-root {
		font-weight: inherit;
	}
`;

export const KnowledgePageContainer = styled(Container)`
	background-color: #f9f9fb;
	margin-bottom: 3em;
`;

export const PageTitles = styled.div`
	width: 100%;
`;

export const ArticlesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 345px));
	gap: 1.5em;
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
