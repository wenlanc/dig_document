import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
	Menu,
	MenuItem,
	Button,
	ListItemButton,
	useMediaQuery,
} from '@mui/material';
import { instance } from '../controllers/axios';

import styledComponent from 'styled-components';
import { device } from 'components/MediaSizes';
import Auth from 'components/Auth/Auth';
import { authContext } from '../contexts/AuthContext';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Content from 'components/LandlordTools/Content';
import LandlordMini from 'components/LandlordTools/MiniDrawer';

import {
	landlordToolsSidebar,
	status,
	visitors,
	todoLists,
	nontifications,
	ourListing,
} from '../constants/LandLordToolsSidebar';
import MyModal from 'components/Modal';
const drawerWidth = 240;
const PREFIX = 'Header';

const classes = {
	root: `${PREFIX}-root`,
	menuButton: `${PREFIX}-menuButton`,
	title: `${PREFIX}-title`,
	navLinks: `${PREFIX}-navLinks`,
	offset: `${PREFIX}-offset`,
};
const StyledLink = styledComponent(Button).attrs(() => ({
	component: NavLink,
}))`
	text-transform: capitalize;
	transition: 0.4s text-shadow;
	color: #0f0f0f;
	transition: 0.4s color;
	position: relative;

	&:hover {
		background-color: initial;
		// text-shadow: 0 0 1px ${(props) => props.theme.primaryColor};
	}

	&:hover {
		color: ${(props) => props.theme.primaryColor};
		text-decoration: none;
	}

	&.active {
		color: #0063c8;
		border-radius: 0;
		margin-bottom: -4px;
		border-bottom: 3px solid #0063c8;
	}

	&.active:hover::after {
		display: none;
	}

	&::after {
		content: '';
		opacity: 0;
		transition: 0.4s opacity;
		height: 3px;
		width: 100%;
		position: absolute;
		bottom: -0.3em;
		background-color: ${(props) => props.theme.primaryColor};
	}

	&:hover::after {
		opacity: 1;
	}

	@media screen and ${device.laptop} {
		margin-right: 1.25rem;
		font-size: 1rem;
	}

	@media screen and ${device.laptopXL} {
		margin-right: 3.3rem;
		font-size: 1.25rem;
	}
`;

const StyledLogo = styledComponent.picture`
	img {
		width: 80px;
	}

	@media screen and ${device.laptop} {
		img {
			width: 7vw;
		}
	}

	@media screen and ${device.laptopXL} {
		img {
			width: 8vw;
		}
	}
`;
const scrolledStyle = {
	position: 'sticky',
	top: '0px',
	left: '0px',
	backgroundColor: 'white',
	width: '100%',
	height: '80px',
	zIndex: '2',
};

const AccountButton = styledComponent(IconButton)`
	margin-left: auto;
`;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
	const [navAnchorEl, setNavAnchorEl] = React.useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [toOpen, setToOpen] = useState('');

	const navigate = useNavigate();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSignUp = () => {
		setAccountAnchorEl(null);
		setModalOpen(true);
		setToOpen('Sign Up');
	};

	const handleLogout = () => {
		setAccountAnchorEl(null);
		instance.get('logout').then((response) => {
			if (response.status === 200 || response.status === 304) {
				setAuthData({
					loading: false,
					data: null,
					authenticated: false,
				});
				localStorage.clear();
				console.log('user logged out');
				window.location.replace('/');
			}
		});
	};
	const { auth, setAuthData } = React.useContext(authContext);
	function modalControl() {
		setModalOpen(!modalOpen);
	}

	const handleSignIn = () => {
		setAccountAnchorEl(null);
		setModalOpen(!modalOpen);
		setToOpen('Log In');
	};
	const handleSettings = () => {
		navigate('/settings');
	};

	const handleProfile = () => {
		navigate('/landlord-tools/my-profile');
	};

	function AccountMenu() {
		return (
			<Menu
				id='menu-appbar'
				anchorEl={accountAnchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={accountAnchorEl !== null}
				onClose={() => setAccountAnchorEl(null)}
			>
				{auth.authenticated && (
					<MenuItem onClick={handleSettings}>Settings</MenuItem>
				)}

				{auth.authenticated && (
					<MenuItem onClick={handleProfile}>Profile</MenuItem>
				)}

				{JSON.parse(localStorage.getItem('isAdmin') === 'true') && (
					<MenuItem component={Link} to='/admin'>
						Admin Panel
					</MenuItem>
				)}

				{auth.authenticated && (
					<MenuItem onClick={handleLogout}>Logout</MenuItem>
				)}

				{auth.authenticated === false && (
					<MenuItem onClick={handleSignIn}>Login</MenuItem>
				)}

				{auth.authenticated === false && (
					<MenuItem onClick={handleSignUp}>Register</MenuItem>
				)}
			</Menu>
		);
	}

	return (
		<Box sx={{ display: 'flex', width: '100%' }}>
			<MyModal display={modalOpen} modalControl={modalControl}>
				<div>
					<Auth page={toOpen} onLoggedIn={() => setModalOpen(false)} />
				</div>
			</MyModal>
			<AppBar
				position='fixed'
				open={open}
				sx={{
					background: '#fff',
				}}
			>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: 5,
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>

						{isMobile ? (
							<>
								<AccountButton
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={(evt) => setAccountAnchorEl(evt.currentTarget)}
									color='inherit'
								>
									<AccountCircle />
								</AccountButton>

								<IconButton
									edge='start'
									className={classes.menuButton}
									color='inherit'
									aria-label='menu'
									onClick={(evt) => setNavAnchorEl(evt.currentTarget)}
									size='large'
								>
									<MenuIcon />
								</IconButton>

								<AccountMenu />

								{/* Nav Menu */}
								<Menu
									id='nav-menu-appbar'
									anchorEl={navAnchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={navAnchorEl !== null}
									onClose={() => setNavAnchorEl(null)}
								>
									<MenuItem>
										<Link to='/'>Home</Link>
									</MenuItem>

									<MenuItem>
										<Link to='/landlordforum'>Forum</Link>
									</MenuItem>

									{/* <MenuItem>
										<Link to='/serviceGuides'>Guides</Link>
									</MenuItem> */}

									<MenuItem>
										<Link to='/knowledge'>Knowledge</Link>
									</MenuItem>

									<MenuItem>
										<Link to='/calculators'>Calculators</Link>
									</MenuItem>

									<MenuItem>
										<Link to='/contactus'>Contact</Link>
									</MenuItem>
								</Menu>
							</>
						) : (
							<>
								<Box
									display={'flex'}
									alignItems={'center'}
									justifyContent={'space-between'}
									sx={{
										width: '100%',
									}}
								>
									{!open && (
										<Link to='/'>
											<StyledLogo>
												<source srcSet='/Logo.png' media={device.laptop} />
												<img src='/Logo.png' alt='company logo' />
											</StyledLogo>
										</Link>
									)}
									<Box
										display={'flex'}
										sx={{
											alignItems: 'center',
											justifyContent: 'center',
											width: '100%',
										}}
									>
										<StyledLink to='/'>Home</StyledLink>

										<StyledLink to='/landlordforum'>Forum</StyledLink>

										{/* <StyledLink to='/serviceGuides'>Guides</StyledLink> */}

										<StyledLink to='/knowledge'>Knowledge</StyledLink>

										<StyledLink to='/calculators'>Calculators</StyledLink>

										<StyledLink to='/contactus'>Contact</StyledLink>
									</Box>
								</Box>
								<IconButton
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={(evt) => setAccountAnchorEl(evt.currentTarget)}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
								<AccountMenu />
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<LandlordMini open={open} setOpen={setOpen} />
			<Box component='main' sx={{ flexGrow: 1 }}>
				<DrawerHeader />
				<Box sx={{ display: 'flex' }}>
					<Content nontifications={nontifications} ourListing={ourListing} />
				</Box>
			</Box>
		</Box>
	);
}
