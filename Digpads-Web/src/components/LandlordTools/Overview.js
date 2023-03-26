import React from 'react';
import { Typography, Paper } from '@mui/material';
import styled from 'styled-components';

const Root = styled(Paper)`
	background: #fff;
	border: 1px dotted blue;
	border-radius: 16px;
	padding: 16px 24px;
	margin-bottom: 48px;
	width: auto;
	@media screen and (max-width: 578px) {
		width: 100%;
	}
`;
const Heading = styled(Typography)`
	color: #0063c8;
	margin-bottom: 0;
	:first-letter {
		font-weight: bold;
	}
	@media screen and (max-width: 578px) {
		text-align: center;
	}
`;

// const Description = styled(Typography)`
// 	font-weight: 400;
// 	color: #6c757d;
// `;

function Overview({ title, img, onClick = () => {} }) {
	return (
		<Root
			style={{
				height: '150px',
				minWidth: '200px',
				textAlign: 'center',
				cursor: 'pointer',
			}}
			onClick={onClick}
		>
			{img}
			<Heading gutterBottom variant='h5' component='h1'>
				{title}
			</Heading>
		</Root>
	);
}

export default Overview;
