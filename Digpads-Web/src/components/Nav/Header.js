import React, { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
import styled from 'styled-components';
import Notifications from './Notifications';
import MyModal from '../Modal';
import Auth from '../Auth/Auth';
import {
	fetchNotifications,
	markNotificationsAsRead,
} from 'controllers/Notifications';
import { authContext } from '../../contexts/AuthContext';

import {
	AppBar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	useMediaQuery,
	Toolbar,
	Hidden,
	Stack,
} from '@mui/material';

import { device } from '../MediaSizes';
import { instance } from '../../controllers/axios';
import MiniDrawer from 'components/LandlordTools/MiniDrawer';

const PREFIX = 'Header';

const classes = {
	root: `${PREFIX}-root`,
	menuButton: `${PREFIX}-menuButton`,
	title: `${PREFIX}-title`,
	navLinks: `${PREFIX}-navLinks`,
	offset: `${PREFIX}-offset`,
};

const Root = muiStyled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		flexGrow: 1,
	},

	[`& .${classes.title}`]: {
		[theme.breakpoints.down('sm')]: {
			flexGrow: 1,
		},
	},

	[`& .${classes.navLinks}`]: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
	},

	[`& .${classes.offset}`]: theme.mixins.toolbar,
}));

// #region Styled Components
const StyledAppBar = styled(AppBar)`
	box-shadow: none;

	@media screen and ${device.laptopXL} {
		.MuiToolbar-regular {
			min-height: 120px;
		}
	}
`;

const StyledToolbar = styled(Toolbar)`
	@media screen and ${device.laptop} {
		width: 90%;
		margin: 0 auto;
	}
`;

const StyledLink = styled(Button).attrs(() => ({
	component: NavLink,
}))`
	text-transform: capitalize;
	transition: 0.4s text-shadow;
	color: #0f0f0f;
	transition: 0.4s color;
	position: relative;
	font-weight: 500;

	&:hover {
		background-color: initial;
		text-shadow: 0 0 1px ${(props) => props.theme.primaryColor};
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

const StyledLogo = styled.picture`
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

const Header = ({ handleDrawer, sidebarStatus, setSidebarStatus }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	// Authentication
	const [modalOpen, setModalOpen] = useState(false);
	const [toOpen, setToOpen] = useState('');
	const [openSidebar, setOpenSidebar] = useState(false);

	const { auth, setAuthData } = React.useContext(authContext);

	const [notifications, setNotifications] = useState([]);

	function modalControl() {
		setModalOpen(!modalOpen);
	}

	const handleSignUp = () => {
		setAccountAnchorEl(null);
		setModalOpen(true);
		setToOpen('Sign Up');
	};

	const handleLogout = () => {
		setAccountAnchorEl(null);
		instance.get('logout').then((response) => {
			if (response.status === 200) {
				setAuthData({
					loading: false,
					data: null,
					authenticated: false,
				});
				localStorage.clear();
				console.log('user logged out');
			}
		});
	};

	const handleSettings = () => {
		navigate('/settings');
	};

	const handleProfile = () => {
		navigate('/landlord-tools/my-profile');
	};

	const toggleDrawer = () => {
		setOpenSidebar(!openSidebar);
		handleDrawer();
	};

	const hasUnreadNotifications = (notifications) => {
		return notifications.some((n) => !n.isRead);
	};

	const handleNotificationsOpen = async () => {
		if (hasUnreadNotifications(notifications)) {
			const user = auth.data?._id;
			const readNotifications = await markNotificationsAsRead(
				user,
				notifications
			);

			setNotifications(readNotifications);
		}
	};

	// ===== Account and Navigation menus =====
	const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
	const [navAnchorEl, setNavAnchorEl] = React.useState(null);

	const handleSignIn = () => {
		setAccountAnchorEl(null);
		setModalOpen(!modalOpen);
		setToOpen('Log In');
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

	React.useEffect(() => {
		if (auth.authenticated) {
			fetchNotifications(auth.data?._id).then((data) => {
				setNotifications(data);
			});
		}
	}, [auth.authenticated]);

	return (
		<Root className={classes.root}>
			<MyModal display={modalOpen} modalControl={modalControl}>
				<div>
					<Auth page={toOpen} onLoggedIn={() => setModalOpen(false)} />
				</div>
			</MyModal>

			<StyledAppBar position='fixed' color='inherit'>
				<StyledToolbar>
					{!sidebarStatus &&
						location?.pathname?.split('/')[1] === 'landlord-tools' && (
							<Hidden mdUp>
								<IconButton size='large' onClick={toggleDrawer}>
									<DehazeIcon />
								</IconButton>
							</Hidden>
						)}

					{!sidebarStatus && (
						<Link to='/'>
							<StyledLogo>
								<source srcSet='/Logo.png' media={device.laptop} />
								<img src='/Logo.png' alt='company logo' />
							</StyledLogo>
						</Link>
					)}

					{isMobile ? (
						<>
							<Stack spacing={1} direction='row' ml='auto'>
								<Notifications
									notifications={notifications}
									onOpen={handleNotificationsOpen}
								/>

								<IconButton
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={(evt) => setAccountAnchorEl(evt.currentTarget)}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>

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
							</Stack>

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

								{/* <MenuItem>
									<Link to='/marketplace'>Marketplace</Link>
								</MenuItem> */}

								<MenuItem>
									<Link to='/contactus'>Contact</Link>
								</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<div className={classes.navLinks}>
								<StyledLink to='/'>Home</StyledLink>
								<StyledLink to='/landlordforum'>Forum</StyledLink>
								{/* <StyledLink to='/serviceGuides'>Guides</StyledLink> */}
								<StyledLink to='/knowledge'>Knowledge</StyledLink>
								<StyledLink to='/calculators'>Calculators</StyledLink>
								{/* <StyledLink to='/marketplace'>Marketplace</StyledLink> */}
								<StyledLink to='/contactus'>Contact</StyledLink>
							</div>

							<Stack spacing={2} direction='row' alignItems='center'>
								<Notifications
									notifications={notifications}
									onOpen={handleNotificationsOpen}
								/>

								<IconButton
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={(evt) => setAccountAnchorEl(evt.currentTarget)}
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
							</Stack>

							<AccountMenu />
						</>
					)}
				</StyledToolbar>
			</StyledAppBar>

			{location?.pathname?.split('/')[1] === 'landlord-tools' && (
				<MiniDrawer open={sidebarStatus} setOpen={setSidebarStatus} />
			)}
			<div className={classes.offset} />
		</Root>
	);
};

export default Header;
