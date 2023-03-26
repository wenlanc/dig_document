import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import styledComponents from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { device } from '../MediaSizes';
import { landlordToolsSidebar } from 'constants/LandLordToolsSidebar';
import MenuIcons from './MenuIcons';
import { Tooltip } from '@mui/material';

const drawerWidth = 295;

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
	width: `calc(${theme.spacing(7)} + 20px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 20px)`,
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

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function MiniDrawer({ open, setOpen }) {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const StyledLogo = styledComponents.picture`
		img {
			width: 80px;
			max-width:120px;
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

	const StyledListItemIcon = styled(({ active, ...props }) => (
		<ListItemIcon {...props} />
	))`
		min-width: unset;
		display: flex;
		align-items: center;
		min-height: 45px;
		padding-right: 16px;
		color: ${(props) => props.active && '#0063c8'};
	`;

	return (
		<Drawer
			variant='permanent'
			open={open}
			sx={{
				bgcolor: '#fff',
			}}
		>
			{open && (
				<>
					<DrawerHeader>
						<Box
							display={'flex'}
							width={'100%'}
							alignItems={'center'}
							justifyContent={'space-between'}
							mx={8}
							onClick={handleDrawerClose}
						>
							{/* <Link to='/'> */}
							<StyledLogo>
								<source
									srcSet='/Logo.png'
									media={device.laptop}
								/>
								<img src='/Logo.png' alt='company logo' />
							</StyledLogo>
							{/* </Link> */}
							<IconButton>
								<ChevronLeftIcon
									style={{
										transform: 'scale(1.5)',
									}}
								/>
							</IconButton>
						</Box>
					</DrawerHeader>
					<Divider />
				</>
			)}
			<List
				sx={{
					marginTop: 5,
				}}
			>
				{landlordToolsSidebar.map((menu, index) => {
					const isActive = location?.pathname
						?.split('/')[2]
						?.toLowerCase()
						?.includes(
							menu.title.toLowerCase().split(' ').join('-')
						);
					return (
						<ListItemButton
							key={menu.title}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
								bgcolor: isActive && '#e6e6e6',
							}}
							onClick={() => {
								console.log('listicon clicked');
								navigate(
									`/landlord-tools/${menu.title
										.toLowerCase()
										.split(' ')
										.join('-')}`
								);
								handleDrawerClose();
							}}
						>
							<Tooltip title={menu.title}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<StyledListItemIcon active={isActive}>
										<MenuIcons
											active={isActive}
											menu={menu.title.toLowerCase()}
										/>
									</StyledListItemIcon>
								</ListItemIcon>
							</Tooltip>

							<ListItemText
								primary={menu.title}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					);
				})}
			</List>
			<Divider />
			{/* <List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItemButton
						key={text}
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText
							primary={text}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				))}
			</List> */}
		</Drawer>
	);
}
