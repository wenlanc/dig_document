import React from 'react';
import { device } from 'components/MediaSizes';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledExcludedCompany = styled.li`
	display: grid;
	justify-items: center;
	padding: 1em;
	text-align: center;
	background-color: #fff;
	position: relative;
	overflow: hidden;

	@media screen and ${device.tablet} {
		grid-template-columns: 17.5% auto;
		justify-items: normal;
		text-align: left;
		padding: 0 2em;
		gap: 1.5em;
		position: static;
		height: 75px;
		align-items: center;
	}
`;

const CompanyName = styled(Typography).attrs(() => ({ variant: 'body2' }))`
	width: 200px;
	margin-bottom: 1em;

	font-weight: bold;

	position: relative;

	@media screen and ${device.tablet} {
		width: auto;

		padding-right: 2em;
		margin-bottom: 0;

		&::after {
			content: '';
			display: block;
			position: absolute;
			background-color: rgb(0 0 0 / 4%);
			width: 3px;
			top: -100%;
			height: 300%;
			left: 100%;
		}
	}
`;

const CompanyText = styled(Typography).attrs(() => ({ variant: 'body2' }))`
	display: flex;
	align-items: center;
`;

export default function ExcludedCompany(props) {
	return (
		<StyledExcludedCompany>
			<CompanyName>{props.name}</CompanyName>

			<CompanyText>{props.text}</CompanyText>
		</StyledExcludedCompany>
	);
}

ExcludedCompany.propTypes = {
	name: PropTypes.string,
	text: PropTypes.string,
};
