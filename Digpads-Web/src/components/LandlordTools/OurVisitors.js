import React from 'react';
import { Paper, Typography, MenuList, Avatar } from '@mui/material';
import styled from 'styled-components';
import Slider from './Slider';

const StyledPaper = styled(Paper)`
	margin-bottom: 64px;
	margin-left: 8px;
	margin-right: 8px;
	border: 1px dotted #0063c8;
	border-radius: 16px;
	position: relative;
	padding: 36px 12px 12px;
`;

const StyledAvatar = styled(Avatar)`
	background: #0063c8;
	position: absolute;
	top: -28px;
	left: 16px;
	height: 56px;
	width: 56px;
`;

const Heading = styled(Typography)`
	font-weight: 700;
`;

const Description = styled(Typography)``;

const StyledMenuList = styled(MenuList)`
	& > *:not(:last-child) {
		margin-bottom: 16px;
	}
`;

function OurVisitors({ title, description, visitors }) {
	return (
		<StyledPaper>
			<Heading component='h2' variant='h6'>
				{title}
			</Heading>
			<Description gutterBottom variant='body2'>
				{description}
			</Description>
			<StyledMenuList>
				{visitors.map((visitor, index) => (
					<Slider
						key={index}
						devices={visitor.devices}
						percentage={visitor.percentage}
					/>
				))}
			</StyledMenuList>
			<StyledAvatar>
				<OurVisitorIcon style={{ width: 32, height: 32 }} />
			</StyledAvatar>
		</StyledPaper>
	);
}

const OurVisitorIcon = () => {
	return (
		<svg width='35' height='32'>
			<path
				fill='#FFF'
				fillRule='evenodd'
				stroke='#FFF'
				strokeWidth='1'
				d='M30.564 26.596h-5.965a10.33 10.33 0 01-8.349 4.419 10.326 10.326 0 01-8.349-4.419H1.936a.436.436 0 01-.436-.436V1.935c0-.24.195-.435.436-.435h28.628c.241 0 .436.195.436.435V26.16a.436.436 0 01-.436.436zM8.48 25.912l.009.014a9.33 9.33 0 007.761 4.217c3.118 0 5.964-1.563 7.765-4.222l.005-.007c.111-.165.22-.334.323-.508-1.77-2.971-4.776-4.737-8.093-4.737s-6.325 1.766-8.094 4.737c.105.173.213.341.324.506zM30.128 2.371H2.371V5.02h27.757V2.371zm0 3.521H2.371v19.833h4.967c-.02-.036-.043-.069-.063-.105a.435.435 0 010-.428c1.877-3.329 5.318-5.395 8.975-5.395 3.656 0 7.096 2.068 8.975 5.395a.435.435 0 010 .428c-.02.036-.042.069-.063.105h4.966V5.892zm-5.942 6.705H8.313a.435.435 0 01-.435-.435V9.174c0-.24.195-.436.435-.436h15.873c.241 0 .436.196.436.436v2.988c0 .24-.195.435-.436.435zm-.435-2.987H8.749v2.116h15.002V9.61zM8.934 18.022l1.802 1.672a.437.437 0 01-.593.639l-1.802-1.672a.435.435 0 11.593-.639zm3.562-2.309l.983 2.254a.435.435 0 01-.798.348l-.983-2.254a.434.434 0 01.225-.573.434.434 0 01.573.225zm3.754-1.128c.24 0 .436.195.436.436v2.458a.436.436 0 01-.872 0v-2.458c0-.241.195-.436.436-.436zm3.754 1.127a.436.436 0 01.799.348l-.983 2.253a.434.434 0 01-.574.225.436.436 0 01-.225-.573l.983-2.253zm3.562 2.31v-.001a.436.436 0 01.593.639l-1.802 1.673a.437.437 0 01-.593-.639l1.802-1.672zM20.969 2.943a.753.753 0 110 1.506.753.753 0 010-1.506zm2.946 0a.753.753 0 110 1.505.753.753 0 010-1.505zm2.946 0a.753.753 0 110 1.505.753.753 0 010-1.505zM14.909 22.797a2.933 2.933 0 111.345 5.541 2.932 2.932 0 01-1.345-5.541zm-.492 3.552a2.058 2.058 0 002.775.891v-.001a2.06 2.06 0 10-2.775-.89z'
			></path>
		</svg>
	);
};

export default OurVisitors;
