import React from 'react';
import styled from 'styled-components';

const Dark = styled.div`
	width: 100%;
	filter: brightness(40%);
	background: url(${(props) => props.src});
	height: 100vh;
	background-size: cover;
	overflow: auto;
`;

function Image(props) {
	return <Dark src={props.src}>{props.children}</Dark>;
}
export default Image;
