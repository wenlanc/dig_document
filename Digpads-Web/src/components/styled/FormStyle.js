import styled from 'styled-components';
import {
	Button,
	Avatar,
	Container,
	TextField,
	TextareaAutosize,
	Typography,
	FormControlLabel,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';

export const StyledButton = styled(Button)`
	margin: 12px 0px 4px;
	width: ${(props) =>
		props.pageType
			? '100%'
			: props.sign
			? '75%'
			: props.login
			? '65%'
			: '75%'};
	margin-bottom: ${(props) => (props.pageType === 'feed' ? '5%' : '0%')};
	@media (max-width: 550px) {
		font-size: 0.63rem;
	}
`;

export const StyledForm = styled.form`
	margin-top: 8px;
	.MuiFormHelperText-marginDense {
		margin: 1px;
	}
`;

export const StyledAvatar = styled(Avatar)`
	background-color: #d32f2f;
	margin: 5px auto;
`;

export const StyledContainer = styled(Container)`
	max-width: 405px;
`;

export const SyledRegisterContainer = styled(Container)`
	max-width: 720px;
`;

export const StyledField = styled(TextField)`
	width: ${(props) => (props.pagetype === 'feed' ? '100%' : '70%')};
	@media (max-width: 550px) {
		width: 100%;
	} ;
`;

export const StyledAlert = styled(Alert)`
	padding: 0px 2px;
	font-size: 0.78rem;
	.MuiAlert-message {
		padding: 9px 0px;
	}
`;

export const StyledDiv = styled.div`
	text-align: left;
	font-family: 'Roboto', sans-serif;
`;
export const StyledUl = styled.ul`
	padding: 0px 2px;
	font-size: 0.95rem;
	list-style: none;
`;
export const StyledList = styled.li`
	color: ${(props) =>
		props.green ? '#28a745' : props.red ? '#dc3545' : '#000000'};
	display: flex;
	align-items: center;
	.MuiSvgIcon-root {
		font-size: 1rem;
	}
`;

export const StyledTextArea = styled(TextareaAutosize)`
	width: 100%;
	min-height: 150px;
	border: 2px solid #eeeeee;
	resize: none;
	border-radius: 5px;
`;

export const StyledAutocomplete = styled(Autocomplete)`
	width: 100%;
`;

export const StyledHeading = styled(Typography)`
	@media (max-width: 550px) {
		font-size: 1.2rem;
	}
`;

export const StyledOption = styled(Typography)`
	@media (max-width: 550px) {
		font-size: 0.8rem;
	}
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
	@media (max-width: 550px) {
		font-size: 0.8rem;
		.MuiFormControlLabel-label.MuiTypography-body1 {
			font-size: 0.8rem;
		}
	}
`;
