import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DashboardContainer, TopNavBarContainer } from '../styled/Dashboard';
import Header from '../Nav/Header';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DocumentList from '../../Views/DocumentList';
import Document from './Documents';
import Overview from './Oveview';

const PREFIX = 'Dashboard';

const classes = {
    drawer: `${PREFIX}-drawer`,
    appBar: `${PREFIX}-appBar`,
    menuButton: `${PREFIX}-menuButton`,
    toolbar: `${PREFIX}-toolbar`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    content: `${PREFIX}-content`
};

const StyledDashboardContainer = styled(DashboardContainer)((
    {
        theme
    }
) => ({
    [`& .${classes.drawer}`]: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},

    [`& .${classes.appBar}`]: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},

    [`& .${classes.menuButton}`]: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},

    [`& .${classes.toolbar}`]: theme.mixins.toolbar,

    [`& .${classes.drawerPaper}`]: {
		width: drawerWidth,
	},

    [`& .${classes.content}`]: {
		flexGrow: 1,
		padding: theme.spacing(1),
	}
}));

const drawerWidth = 240;

const linkContainer = {
	borderBottom: '1px solid #dcdcdc',
	marginLeft: '20%',
};

const clickedLinkContainer = {
	borderBottom: '2px solid blue',
	marginLeft: '20%',
};

const linkIcon = {
	color: 'none',
};
const clickedLinkIcon = {
	color: 'blue',
};

const linkText = {
	fontSize: '16px',
	color: '#3C3C50',
};

const clickedLinkText = {
	fontSize: '16px',
	color: 'blue',
};

const Dashboard = (props) => {
	const matches = useMediaQuery('(max-width: 767px)');
	const appBarCss = matches ? '1px 1px blue' : '0px 0px white';
	const { container } = props;

	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [page, setPage] = useState('Documents');
	const drawer = (
		<div>
			<Grid
				container
				style={{
					width: '100%',
					backgroundColor: 'white',
					marginTop: '15px',
				}}
			>
				<div>
					{/* Overview */}
					{/* <ListItem
					button
				onClick={()=>{
				setPage('Overview')
					}}
					style={
						page === 'Overview' ? clickedLinkContainer : linkContainer
					}
				>
					<ListItemIcon>
						<DonutSmallIcon
							style={
								page=== 'Overview'
									? clickedLinkIcon
									: { linkIcon }
							}
						/>
					</ListItemIcon>
					<ListItemText >
							<Typography
								style={
									page === 'Overview'
										? clickedLinkText
										: linkText
								}
							>
								Overview
							</Typography>
					</ListItemText>
				</ListItem> */}

					{/*  Documents */}
					<ListItem
						button
						onClick={() => {
							setPage('Documents');
						}}
						style={
							page === 'Documents'
								? clickedLinkContainer
								: linkContainer
						}
					>
						<ListItemIcon>
							<DescriptionIcon
								style={
									page === 'Documents'
										? clickedLinkIcon
										: { linkIcon }
								}
							/>
						</ListItemIcon>
						<ListItemText>
							<Typography
								style={
									page === 'Documents'
										? clickedLinkText
										: linkText
								}
							>
								Documents
							</Typography>
						</ListItemText>
					</ListItem>
					{/* Landlords */}
					<ListItem
						button
						onClick={() => {
							setPage('DocumentList');
						}}
						style={
							page === 'DocumentList'
								? clickedLinkContainer
								: linkContainer
						}
					>
						<ListItemIcon>
							<HomeWorkIcon
								style={
									page === 'DocumentList'
										? clickedLinkIcon
										: { linkIcon }
								}
							/>
						</ListItemIcon>
						<ListItemText>
							<Typography
								style={
									page === 'DocumentList'
										? clickedLinkText
										: linkText
								}
							>
								Document list
							</Typography>
						</ListItemText>
					</ListItem>
				</div>
			</Grid>
		</div>
	);
	return (
        <StyledDashboardContainer>
			<AppBar
				position='fixed'
				style={{ backgroundColor: 'white', boxShadow: `${appBarCss}` }}
				className={classes.appBar}
			>
				<Toolbar>
					<IconButton
						id='IconButton'
						color='primary'
						aria-label='open drawer'
						edge='start'
						onClick={() => {
							setMobileOpen(!mobileOpen);
						}}
						className={classes.menuButton}
						size='large'
					>
						<MenuIcon />
					</IconButton>
					<TopNavBarContainer container>
						<Header />
					</TopNavBarContainer>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label='mailbox folders'>
				<Hidden smUp implementation='css'>
					<Drawer
						id='Drawer'
						container={container}
						variant='temporary'
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={() => {
							setMobileOpen(!mobileOpen);
						}}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content} style={{ paddingTop: '50px' }}>
				<div className={classes.toolbar} />
				{page === 'Documents' ? (
					<Document />
				) : page === 'Overview' ? (
					<Overview />
				) : (
					<DocumentList />
				)}
			</main>
		</StyledDashboardContainer>
    );
};

export default Dashboard;
