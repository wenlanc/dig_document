import React from 'react';
import styled from 'styled-components';

const Logo = ({ src }) => <img src={src} alt='logo' />;

const StyledLogo = styled(Logo)`
	width: 66px;
	max-width: 100%;
`;

export default StyledLogo;
