import styled from 'styled-components';
import React from 'react';
import {
	Container,
	Typography,
	Table,
	Box,
	TextField,
	TableCell,
} from '@mui/material';

export const PageContainer = styled(Container)`
	max-width: 767px;
	padding-top: 0.5em;
	padding-bottom: 0.5em;

	&.MuiContainer-root {
		padding-right: 16px;
		padding-left: 16px;
	}
`;

export const BorderedContainer = styled.div`
	border: 1px dotted black;
	border-style: ${(props) => (props.variant === 'solid' ? 'solid' : 'dashed')};
	${({ disableGutters }) =>
		disableGutters === true
			? 'padding: 6px 0 23px 0'
			: 'padding: 6px 10px 23px 10px'};
`;

export const SectionTitle = styled.h2`
	color: rgb(52, 71, 103);
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 0.75em;
`;

export const PageTitle = styled(Typography).attrs(() => ({
	variant: 'h1',
	align: 'center',
}))`
	font-size: 2.25rem;
	font-weight: bold;
	text-decoration: underline;
	margin-bottom: 1.6em;
`;

export const StyledLabel = styled(({ underlined, ...props }) => (
	<Typography {...props} />
)).attrs(() => ({
	component: 'label',
}))`
	display: block;
	font-weight: 700;
	margin-top: 0;
	color: rgb(103, 116, 142);
	font-size: 1rem;
	text-decoration: ${(props) =>
		props.underlined?.toString() === 'true' ? 'underline' : 'none'};
`;

// eslint-disable-next-line
export const StyledButton = styled(({ color, squared, circular, ...props }) => (
	<Box {...props} />
)).attrs((props) => ({
	component: props.component ? props.component : 'button',
}))`
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.5s;
	font-size: ${(props) => (props.fontSize ? props.fontSize : '18px')};

	${({ squared }) =>
		squared &&
		`
        width: 102px;
        height: 79px;
    `}

	${({ circular }) =>
		circular &&
		`
        width: 101px;
        height: 64px;
        border-radius: 50%;
    `}

	// default color for buttons with set background is white
	${({ color }) => color && `color: #fff !important`};

	border: 1px solid black;

	// colors: blue: #3240B9, green: #5DB932, pink: #B632B9,
	//         orange: #E17817, cyan: #32B9B9, yellow: #D4C112, gray: #C4C4C4

	${({ color }) => color === 'blue' && `background-color: #3240B9`};
	${({ color }) => color === 'green' && `background-color: #5DB932`};
	${({ color }) => color === 'yellow' && `background-color: #D4C112`};
	${({ color }) => color === 'pink' && `background-color: #B632B9`};
	${({ color }) => color === 'cyan' && `background-color: #32B9B9`};
	${({ color }) => color === 'gray' && `background-color: #C4C4C4`};
	${({ color }) => color === 'orange' && `background-color: #E17817`};
`;

export const StyledCreateCampaignForm = styled.div`
	.MuiOutlinedInput-root {
		border-radius: 0;
	}

	.MuiFormLabel-root {
		font-size: 12px;
	}

	.MuiOutlinedInput-inputMarginDense {
		padding-top: 7px;
		padding-bottom: 7px;
	}
`;

export const AcceptTerms = styled.div`
	.MuiCheckbox-root {
		align-self: flex-start;
	}
`;

export const StyledModal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	max-height: 90vh;
	overflow-y: auto;
	transform: translate(-50%, -50%);
	background-color: #fff;
	width: 600px;
	border: 1px solid #000;
	border-radius: 3px;
	padding: ${(props) => `${props.padding ? props.padding : '1.5em'}`};
`;

export const StyledTable = styled(Table)`
	.MuiTableCell-root {
		padding: 5px;
		color: #000;
		font-size: 10.5px;
		border-bottom: 0;
		font-size: 12px;
		font-weight: 700;
		text-align: center;
	}

	& thead .MuiTableCell-root {
		border-bottom: 0.0625rem solid #e9ecef;
		color: #c1bbbb;
		font-weight: 700;
		line-height: 1.5;
		font-family: Montserrat;
	}

	.MuiPaper-elevation1 {
		box-shadow: none;
	}
`;

export const StyledTextField = styled(TextField)`
	&.MuiFormControl-root {
		margin-bottom: 19px;
	}

	.MuiFormLabel-root {
		font-size: 12px;
	}

	.MuiOutlinedInput-root {
		border-radius: 0;
	}

	.MuiOutlinedInput-inputMarginDense {
		padding-top: 6.5px;
		padding-bottom: 6.5px;
	}
`;

export const Underlined = styled.div`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 1px;
		background-color: rgb(103, 116, 142);
	}
`;

export const UnderlinedTableCell = styled(TableCell)`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		height: 1px;
		background-color: black;
		width: 250%;
		bottom: 15px;
		left: -70%;
	}
`;

export const UnderlinedReviewDetails = styled(Underlined)`
	color: rgb(103, 116, 142);
	&::after {
		width: 200%;
		left: -50%;
	}
`;

export const ModalTitle = styled.h2`
	font-size: ${(props) => (props.size === 'small' ? '0.875rem' : '2.25rem')};
	margin-bottom: 0.45em;
	margin-top: 0;
	font-weight: bold;
	text-align: ${(props) => (props.align === 'center' ? 'center' : 'left')};
`;

export const ReviewDetailsContet = styled.div`
	width: 190px;
	height: 20px;
	font-size: 12px;
	flex-shrink: 0;
	border: 1px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
`;
