import React from 'react';
import { Typography, Box, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTypography = styled(Typography)`
	color: #6c757d;
	margin-bottom: 2px;
`;

const Digpads = styled(Typography)`
	color: #0063c8;
	display: inline-block;
	font-weight: bold;
`;

const StyledBox = styled(Box)`
	width: 100%;
	padding: 24px;
`;

function Footer() {
	return (
		<StyledBox
			display='flex'
			justifyContent='space-between'
			bgcolor='white'
			flexWrap='wrap'
		>
			<StyledTypography>
				&copy; {new Date().getFullYear()} <Digpads>digpads</Digpads> All
				rights reserved.
			</StyledTypography>
			<Breadcrumbs>
				<Link to='/privacypolicy'>
					<StyledTypography style={{ fontWeight: 400 }}>
						Privacy Policy
					</StyledTypography>
				</Link>
				<Link to='/termsOfService'>
					<StyledTypography style={{ fontWeight: 400 }}>
						Terms & Condition
					</StyledTypography>
				</Link>
				<Link>
					{' '}
					<StyledTypography style={{ fontWeight: 400 }}>
						Credits
					</StyledTypography>
				</Link>
			</Breadcrumbs>
		</StyledBox>
	);
}

export default Footer;
