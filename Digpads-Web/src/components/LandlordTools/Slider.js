import React from 'react';
import styled from 'styled-components';
import { Button, Box, Typography } from '@mui/material';

const ProgressBar = styled.div`
	width: 100%;
	height: 12px;
	border-radius: 16px;
	position: relative;

	color: ${(props) => props.devices === 'mobile' && '#30b1ba'};
	color: ${(props) => props.devices === 'tablet' && '#0063c8'};
	color: ${(props) => props.devices === 'desktop' && '#333333'};
	background-color: ${(props) => props.devices === 'mobile' && '#c3e6e9'};
	background-color: ${(props) => props.devices === 'tablet' && '#b6d1ec'};
	background-color: ${(props) => props.devices === 'desktop' && '#c4c4c4'};

	:: after {
		position: absolute;
		top: 0;
		left: 0;
		content: '';

		border-radius: 16px;
		height: 12px;
		width: ${(props) => props.width}%;
		background-color: ${(props) => props.devices === 'mobile' && '#30b1ba'};
		background-color: ${(props) => props.devices === 'tablet' && '#0063c8'};
		background-color: ${(props) =>
			props.devices === 'desktop' && '#333333'};
	}
`;

const StyledTitle = styled(Typography)`
	text-transform: capitalize;
	color: ${(props) => props.devices === 'mobile' && '#30b1ba'};
	color: ${(props) => props.devices === 'tablet' && '#0063c8'};
	color: ${(props) => props.devices === 'desktop' && '#333333'};
	padding-left: 24px;

	position: relative;
	:: before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;

		border-radius: 50%;
		background-color: ${(props) => props.devices === 'mobile' && '#30b1ba'};
		background-color: ${(props) => props.devices === 'tablet' && '#0063c8'};
		background-color: ${(props) =>
			props.devices === 'desktop' && '#333333'};
		height: 12px;
		width: 12px;
		transform: translateY(-50%);
	}
`;

const StyledButton = styled(Button)`
	max-height: 24px;
	min-width: 48px;
	padding: 0;
	color: #fff;
	margin-bottom: 4px;
	cursor: auto;
	background-color: ${(props) => props.devices === 'mobile' && '#30b1ba'};
	background-color: ${(props) => props.devices === 'tablet' && '#0063c8'};
	background-color: ${(props) => props.devices === 'desktop' && '#333333'};
	&:hover {
		background-color: ${(props) => props.devices === 'mobile' && '#30b1ba'};
		background-color: ${(props) => props.devices === 'tablet' && '#0063c8'};
		background-color: ${(props) =>
			props.devices === 'desktop' && '#333333'};
	}
`;

const StyledMenuItem = styled.li`
	display: block;
`;

function Slider({ index, devices, percentage }) {
	return (
		<StyledMenuItem key={index}>
			<Box
				mb={0.5}
				alignItems='flex-end'
				display='flex'
				justifyContent='space-between'
			>
				<StyledTitle devices={devices} variant='body1'>
					{devices}
				</StyledTitle>
				<StyledButton
					disableFocusRipple
					disableElevation
					disableRipple
					variant='contained'
					devices={devices}
				>
					{percentage}%
				</StyledButton>
			</Box>
			<ProgressBar devices={devices} width={percentage} />
		</StyledMenuItem>
	);
}

export default Slider;
