import React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { Box } from '@mui/system';

const StyledContainer = styled(Box)`
	height: ${(props) => (props.isContactInformation ? '64px' : '200px')};
`;

const StyledTypography = styled(Typography)`
	color: black;
	font-size: 20px;
	font-weight: 500;
`;

function Section({ id, key, children }) {
	return (
		<StyledContainer
			id={id}
			isContactInformation={children === 'Contact Information'}
		>
			<StyledTypography key={key}>{children} </StyledTypography>
		</StyledContainer>
	);
}

export default Section;
