import React from 'react';
import { Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { device } from 'components/MediaSizes';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// #region styles
const StyledRatedEntry = styled.li`
	margin-bottom: 1em;
	padding: 1em;
	border-radius: 7px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	a {
		display: block;
	}

	.logo {
		order: -1;
		width: 200px;
	}

	&:last-child {
		margin-bottom: 0;
	}

	.rating {
		text-transform: uppercase;
		text-align: center;
		line-height: 1.2;
		font-size: 1.2rem;
		color: black;
		margin-bottom: 2em;

		span {
			color: ${(props) => props.theme.primaryColor};
			font-size: 2rem;
			font-weight: bold;
		}
	}

	@media screen and ${device.laptop} {
		display: grid;
		grid-template-columns: auto auto 33% 15% auto;
		gap: 1em;
		text-align: left;

		.logo {
			order: initial;
			width: 140px;
		}

		.rating {
			margin-bottom: 0;
		}
	}
`;

const EntryDescription = styled(Typography).attrs(() => ({ variant: 'body2' }))`
	margin-bottom: 1.5em;

	@media screen and ${device.laptop} {
		margin-bottom: 0;
	}
`;

const EntryLabel = styled(Typography).attrs(() => ({ variant: 'body2' }))`
	.best-for-text {
		font-weight: bold;
	}

	margin-bottom: 1.5em;

	@media screen and ${device.laptop} {
		margin-bottom: 0;
	}
`;

const OrderReportsButton = styled(Button)`
	background-color: #008f00;
	color: #fbedec;
	border-radius: 7px;
	text-transform: capitalize;
	font-weight: 600;

	&.MuiButtonBase-root:hover {
		background-color: rgb(24 168 24);
	}

	.MuiButton-label {
		display: flex;
		font-size: 0.9rem;
	}

	.MuiSvgIcon-root {
		font-size: 119px;
		position: absolute;
		top: -12px;
		left: 0;
	}
`;

// #endregion styles

export default function RatedEntry({ rating, logo, description, label, href }) {
	return (
		<StyledRatedEntry>
			<label className='rating'>
				<span>{rating}</span>
				<br></br>rating
			</label>

			<div className='logo'>
				<a href={href}>
					<img src={logo} />
				</a>
			</div>

			<EntryDescription>{description}</EntryDescription>

			<EntryLabel>
				<span className='best-for-text'>Best for:</span>
				<br></br> {label}
			</EntryLabel>

			{/* // TODO add icon */}
			<OrderReportsButton
				style={{ paddingBottom: '3em', position: 'relative' }}
				varinat='contained'
				component='a'
				href={href}
				endIcon={<ArrowRightAltIcon />}
			>
				Order Reports
			</OrderReportsButton>
		</StyledRatedEntry>
	);
}
