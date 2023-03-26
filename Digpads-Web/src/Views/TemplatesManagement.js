import React, { useState } from 'react';
import styled from 'styled-components';
import {
	Grid,
	Typography,
	Avatar,
	Button,
	Menu,
	MenuItem,
	Breadcrumbs,
	Snackbar,
	TextField,
	Divider,
	Box
} from '@mui/material';
import { BrowserRouter, Link } from 'react-router-dom';
import TemplatesList from 'components/TemplatesManagement/TemplatesList';

const Root = styled.div`
	margin-top: 48px;
`;

const StyleGridContainer = styled(Grid)``;

const StyledHeadingOurListing = styled(Typography)`
	color: #0063c8;
	:first-letter {
		font-weight: bold;
	}
`;

const Image = styled.img`
	height: 160px;
	width: 160px;
	margin-left: auto;
	margin-right: auto;
	display: block;
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

const StyledButton = styled(Button)`
	text-transform: capitalize;
	color: #ffffff;
	background: ${(props) =>
		props.status === 'green'
			? 'rgba(46, 199, 61, 1)'
			: props.status === 'black'
			? 'rgba(30, 34, 72, 1)'
			: props.status === 'blue'
			? 'rgba(41, 37, 204, 1)'
			: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
	&:hover {
		background: ${(props) =>
			props.status === 'green'
				? 'rgba(46, 199, 61, 1)'
				: props.status === 'black'
				? 'rgba(30, 34, 72, 1)'
				: props.status === 'blue'
				? 'rgba(41, 37, 204, 1)'
				: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
	}
`;

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-input {
		padding: 8px;
	}
`;


export default function TemplatesManagement() {

	return (
		<Root>
			<Box display='flex' flexWrap='wrap' justifyContent='space-between'>
				<Box display='flex' justifyContent='flex-end'>
					<Link
						style={{
							color: 'white',
							padding: '5px 10px',
							fontSize: '14px',
							backgroundColor: '#0063c8',
							textTransform: 'capitalize',
							borderRadius: '10px',
							textAlign: 'center',
							textDecoration: 'none',
							width: '180px',
						}}
						color='primary'
						variant='contained'
						to='/landlord-tools/templates/create' 
					>
						New Template
					</Link>
				</Box>
			</Box>


			<Box
				display='flex'
				justifyContent='space-between'
				flexWrap='wrap'
				mb={1}
				mt={1}
			>
				<Heading variant='h4' component='h2' marginBottom={1}>
					{' '}
					Templates
				</Heading>
				<Box marginBottom={1}>
					<StyledButton
						status='green'
						onClick={() => {
							alert('Sort');
						}}
					>
						Sort
					</StyledButton>
					<StyledButton
						style={{ marginLeft: 16 }}
						status='black'
						onClick={() => {
							alert('Filter');
						}}
					>
						Filter
					</StyledButton>
				</Box>
			</Box>
			
			<TemplatesList />

		</Root>
	);
}
