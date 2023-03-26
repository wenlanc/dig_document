import React from 'react';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled as MuiStyled } from '@mui/material';

import colors from '../../assets/theme/base/colors';

export function DigpadsButton({ text, imageLeft }) {
	return (
		<DButton imageLeft={imageLeft}>
			{text}
			<RightArrow />
		</DButton>
	);
}
export const RightArrow = styled(ArrowRightAlt)`
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	margin: 1% 10% 1% 10%;
	padding: 0.5% 4% 0.5% 4%;
`;
export const DButton = styled(Link)`
	white-space: nowrap;
	border-radius: 5px;
	background-color: ${(props) => props.theme.primary};
	border: 0px;
	padding: 1% 5% 1% 3%;
	color: white;
	font-family: inherit;
	float: ${(props) =>
		props.imageLeft === true ? 'left' || 'left' : 'right'};
	margin: ${(props) =>
		props.imageLeft === true ? ' 5% 0 5% 10%' : '5% 10% 5% 0% '};
	font-size: 12px;
	font-weight: 600;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-apart;
	cursor: pointer;
	overflow: contain;
	text-decoration: none;
	width: 20%;
`;

export const LandlordTextButton = styled(Button)`
	text-transform: uppercase;
	font-size: 14px;
	background: transparent;
	box-shadow: none;
	color: ${(props) =>
		`${props?.color ? colors[props.color].main : colors.primary.main}`};
	@media screen and (max-width: 576px) {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
	&:hover {
		color: ${(props) =>
			`${
				props?.color ? colors[props.color].focus : colors.primary.focus
			}`};
		box-shadow: none;
	}
	&:focus:not(:hover) {
		color: ${(props) =>
			`${
				props?.color ? colors[props.color].focus : colors.primary.focus
			}`};
		box-shadow: none;
	}
`;
export const LandlordButton = styled(Button)`
	text-transform: uppercase;
	color: #fff;
	@media screen and (max-width: 576px) {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
	background: ${(props) =>
		`${props?.color ? colors[props.color].main : colors.primary.main}`};
	&:hover {
		background: ${(props) =>
			`${
				props?.color ? colors[props.color].focus : colors.primary.focus
			}`};
	}
	&:focus:not(:hover) {
		background: ${(props) =>
			`${
				props?.color ? colors[props.color].focus : colors.primary.focus
			}`};
		box-shadow: none;
	}
`;

export const LandlordOutlineButton = styled(Button)`
	text-transform: uppercase;
	color: ${(props) =>
		`${props?.color ? colors[props.color].focus : colors.primary.focus}`};
	@media screen and (max-width: 576px) {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
	border: 1px solid;
	border-color: ${(props) =>
		`${props?.color ? colors[props.color].main : colors.primary.main}`};
	&:hover {
		background: ${(props) =>
			`${
				props?.color ? colors[props.color].focus : colors.primary.focus
			}`};
		color: #fff;
	}
	&:focus:not(:hover) {
		background: ${(props) =>
			`${
				props?.color ? colors[props.color].focus : colors.primary.focus
			}`};
		color: #fff;
		box-shadow: none;
	}
`;

export const LandlordLoading = MuiStyled(CircularProgress)({
	maxWidth: '20px',
	maxHeight: '20px',
	color: '#fff',
});

export const StyledButton = styled(Button)`
	text-transform: capitalize;
	font-weight: ${(props) => props.size === 'large' && 'bold'};
	height: ${(props) => props.size === 'large' && '64px'};
	font-size: ${(props) => props.size === 'large' && '28px'};
	min-width: ${(props) => props.size === 'large' && '200px'};
	min-width: ${(props) => props.size === 'medium' && '90px'};
	margin-bottom: 16px;
	color: #ffffff;
	@media screen and (max-width: 576px) {
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
	background: ${(props) =>
		props.status === 'green'
			? 'rgba(55, 143, 25, 1)'
			: props.status === 'black'
			? 'rgba(30, 34, 72, 1)'
			: props.status === 'blue'
			? 'rgba(41, 37, 204, 1)'
			: props.status === 'red'
			? 'rgba(163, 45, 45, 1)'
			: props.status === 'yellow'
			? 'rgba(255, 215, 6, 1)'
			: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
	&:hover {
		background: ${(props) =>
			props.status === 'green'
				? 'rgba(55, 143, 25, 1)'
				: props.status === 'black'
				? 'rgba(30, 34, 72, 1)'
				: props.status === 'blue'
				? 'rgba(41, 37, 204, 1)'
				: props.status === 'red'
				? 'rgba(163, 45, 45, 1)'
				: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
	}
`;
