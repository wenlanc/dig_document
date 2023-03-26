import { Button, Container } from '@mui/material';
import styled from 'styled-components';

export const SubscribeContainer = styled(Container)`
	text-align: center;
	background-color: ${(props) =>
		props.theme.primary}; //change it to background image
	color: white;
	border-radius: 25px;
	padding: 50px 100px;
`;

export const SubscribeButton = styled(Button)`
	color: ${(props) => props.theme.primary};
	background-color: white;
	:hover {
		background-color: white;
	}
	margin: auto 20px;
`;
