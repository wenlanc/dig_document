import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material/';

const StyledForm = styled.form`
	width: '100%';
	margintop: 2%;
`;
const MyDi = styled(Grid)`
	display: 'flex';
	flexdirection: 'column';
	alignitems: 'center';
	padding: 5%;
	margin: 5%;
`;

function Paper(props) {
	return (
		<MyDi>
			<StyledForm>{props.children}</StyledForm>
		</MyDi>
	);
}
export default Paper;
