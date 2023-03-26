import { Grid, Typography, Button } from '@mui/material';

import styled from 'styled-components';

export const Image = styled.img`
	width: 100%;
	height: 300px;
	margin-bottom: 16px;
	border-radius: 3px;
	border: 1px solid rgba(0, 0, 0, 0.23);
`;

export const Input = styled.input`
	border-radius: 2px;
	border: 1px solid #b7b4b4;
	padding: 0.5em;
	width: ${(props) => (props.width ? props.width : '100%')};

	&:disabled {
		background-color: #edecec;
	}
`;

export const StyledHeader = styled(Typography)`
	font-weight: 400;
	margin-bottom: 20px;
	line-height: 0.75;
`;

export const StyledButton = styled(Button)`
	color: rgba(11, 92, 14, 1);
	font-weight: bold;
	height: 100%;
	text-transform: unset;
`;

export const StyledGridContainer = styled(Grid)`
	margin-bottom: 32px;
`;

export const StyledShowContactInformationButton = styled(Button)`
	color: rgba(94, 222, 49, 1);
	font-weight: bold;
	border: 1px solid rgba(0, 0, 0, 0.23);
	padding: 12px;
	max-width: 360px;
	text-transform: capitalize;
`;
