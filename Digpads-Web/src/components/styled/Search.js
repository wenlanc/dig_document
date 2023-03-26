import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { device } from '../MediaSizes';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';

export const StyledSearchIcon = styled(SearchIcon)`
	color: ${(props) => props.theme.primaryColor};
	font-size: 1.8rem;
`;

export const StyledInput = styled(Input)`
	background: white;
	padding: 0.3em 0;
	padding-right: 1em;
	border-radius: 3px;
`;

const Section = styled.section`
	padding: 2em 0;
`;

export const SearchResults = styled(Section)`
	background: #f2f4f6;
`;

export const SearchList = styled.ul`
	list-style: none;
	margin: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1.5em;

	@media screen and ${device.mobileL} {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and ${device.laptop} {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media screen and ${device.laptopL} {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`;

export const SearchItem = styled.li`
	margin-bottom: 2em;

	a {
		display: block;
	}
`;

export const SearchImg = styled.div`
	img {
		vertical-align: middle;
		width: 100%;
		object-fit: cover;
		height: 200px;
	}

	@media screen and ${device.laptop} {
		img {
			width: 100%;
			height: 120px;
		}
	}
`;

export const SearchContent = styled.div`
	background: #fff;
	padding: 1em;
`;

export const PublicationDate = styled.time`
	font-size: ${(props) => props.theme.fontSizeSmall};
	display: block;
	margin-bottom: 0.5em;
`;

export const SearchItemTitle = styled(Typography).attrs(() => {})`
	font-weight: ${(props) => props.theme.fontSemiBold};
	line-height: 1.3;
	margin-bottom: 0.5em;
	height: 60px;
	display: flex;
	align-items: center;
`;

export const Contributor = styled.div`
	.contributor__img,
	.contributor__name {
		display: inline-block;
	}

	.contributor__img {
		margin-right: 0.5em;
		vertical-align: middle;
		width: 35px;
		height: 35px;

		img {
			border-radius: 50%;
		}
	}

	.contributor__name {
		font-size: ${(props) => props.theme.fontSizeSmall};
	}
`;

export const SearchBox = styled.section`
	padding: 2em 1em;
	background: url('images/decorations/GradientMaskCircles.png');
	background-size: cover;
	background-repeat: no-repeat;
`;
