import styled from 'styled-components';
import { Box } from '@mui/material';

export const modalStyles = (theme) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 800,
	width: '100%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	overflowY: 'auto',
	height: '100%',
});

export const modalBoxStyles = (theme) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	overflowY: 'auto',
	height: '95%',
	alignItems: 'center',
	justifyContent: 'center',
	display: 'grid',
	overflowX: 'hidden',
	maxWidth: 1000,
	':focus': {
		outline: 'none !important',
	},
});

export const ModalWindow = styled.div.attrs((props) => ({
	maxWidth: props.maxWidth ? props.maxWidth : 800,
	height: props.height ? props.height : 500,
}))`
	position: absolute;
	top: 40%;
	left: 50%;
	margin: 1em;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border: 2px solid #000;
	padding: 1em;
	overflow: scroll;
`;

export const ModalWindowBase = styled.div.attrs((props) => ({ ...props }))`
	position: absolute;
	top: 50%;
	left: 50%;
	margin: 1em;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border: 1px solid #000;
	border-radius: 3px;
	padding: 1em;
	overflow: scroll;
`;

export const ModalBase = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 10px;
	padding: 1em;
	overflow-y: auto;
`;
