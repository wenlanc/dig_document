import { Container, Typography } from '@mui/material';
import styled from 'styled-components';

export const ShareContainer = styled(Container)`
	max-width: 300px;
	height: 350px;
	border-style: dotted;
	border-radius: 6px;
	border-color: steelblue;
	border-width: 1px;
	box-sizing: border-box;
`;

export const SharePostTitle = styled(Typography)`
	color: ${(props) => props.theme.primary};
	font-size: 18px;
	font-weight: bold;
`;

export const TextContainer = styled.div`
	width: 100%;
	border-bottom: 1px steelblue dotted;
`;

export const SharePostContent = styled(Typography)`
	font-size: 13px;
	margin-top: 6%;
`;

export const SocialMediaButtonContainer = styled(Typography)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10%;
`;
