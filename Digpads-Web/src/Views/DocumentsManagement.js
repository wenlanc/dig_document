import React, { useState, useContext, useEffect } from 'react';
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
	Box,
} from '@mui/material';
import { BrowserRouter, Link } from 'react-router-dom';
import DocumentList from '../components/DocumentManagement/DocumentList';
import DocumentCreateForm from '../components/DocumentManagement/DocumentCreateForm';
import TemplatesList from '../components/DocumentManagement/TemplatesList';
import TemplateFoldersList from '../components/DocumentManagement/TemplateFoldersList';
import TemplateCreate from '../components/TemplatesManagement/TemplateCreate';
import DocumentWebform from '../components/DocumentManagement/DocumentWebform';

import SuiBox from '../components/SuiBox';
import SuiTypography from '../components/SuiTypography';
import SuiBadge from '../components/SuiBadge';
import SuiSelect from '../components/SuiSelect';
import SuiInput from '../components/SuiInput';
import SuiButton from '../components/SuiButton';
import SuiAvatar from '../components/SuiAvatar';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';

import { authContext } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

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

export default function DocumentsManagement(props) {
	let { auth } = useContext(authContext);
	const [tabValue, setTabValue] = useState(props && props.tab ? props.tab : 0);
	const handleSetTabValue = (event, newValue) => setTabValue(newValue);

	const navigate = useNavigate();

	if( !auth.data || !auth.data.email ) {
		navigate('/landlord-tools');
		return <Root>
		<SuiBox position='relative'>
			<Card
				sx={{
					backdropFilter: `saturate(200%) blur(30px)`,
					backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
						rgba(white.main, 0.8),
					boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
					position: 'relative',
					//mt: -8,
					mx: 3,
					py: 2,
					px: 2,
				}}
			>
			</Card>
		</SuiBox>
		</Root>
	}

	return (
		<Root>
			<SuiBox position='relative'>
				<Card
					sx={{
						backdropFilter: `saturate(200%) blur(30px)`,
						backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
							rgba(white.main, 0.8),
						boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
						position: 'relative',
						//mt: -8,
						mx: 3,
						py: 2,
						px: 2,
					}}
				>
					<Grid container spacing={3} alignItems='center'>
						<Grid item></Grid>
						<Grid item>
							<SuiBox height='100%' mt={0.5} lineHeight={1}>
								<SuiTypography variant='h5' fontWeight='medium'>
									Documents
								</SuiTypography>
								<SuiTypography
									variant='button'
									color='text'
									fontWeight='medium'
								>
									Sign Document
								</SuiTypography>
							</SuiBox>
						</Grid>
						<Grid item xs={12} md={9} lg={6} sx={{ ml: 'auto' }}>
							<AppBar position='static'>
								<Tabs
									orientation={'horizontal'}
									value={tabValue ? tabValue : 0}
									onChange={handleSetTabValue}
									sx={{ backgroundColor: 'transparent' }}
								>
									<Tab label='Send Document' />
									<Tab label='Documents' />
									{/* <Tab label="New Template"  /> */}
									<Tab label='Templates' />
									<Tab label='Folders' />
									<Tab label='Web Form' />
								</Tabs>
							</AppBar>
						</Grid>
					</Grid>
				</Card>
			</SuiBox>

			{/* <Box display='flex' flexWrap='wrap' justifyContent='flex-end'>
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
						to='/landlord-tools/documents/create' 
					>
						New Document
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
					Documents
				</Heading>
			</Box> */}

			{tabValue === 0 && <DocumentCreateForm setTabValue={setTabValue} />}
			{tabValue === 1 && <DocumentList setTabValue={setTabValue} />}
			{/* {
				tabValue == 2 && (<TemplateCreate />)
			} */}
			{tabValue === 2 && <TemplatesList />}
			{tabValue === 3 && <TemplateFoldersList />}
			{tabValue === 4 && <DocumentWebform />}
		</Root>
	);
}
