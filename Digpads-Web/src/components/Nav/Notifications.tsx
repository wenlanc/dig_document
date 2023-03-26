import React from 'react';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
	Badge,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Divider,
} from '@mui/material';

import { Notification } from 'types';

type Props = {
	notifications: Notification[];
	onOpen: () => void;
};

export default function Notifications({ notifications, onOpen }: Props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const unreadNotifications: number = notifications?.filter(
		(n) => !n.isRead
	).length;

	const handleNotificationsButtonClick = (evt) => {
		setAnchorEl(evt.currentTarget);
		onOpen();
	};

	return (
		<>
			<IconButton
				onClick={handleNotificationsButtonClick}
				aria-label={notificationsLabel(4)}
			>
				<Badge badgeContent={unreadNotifications || 0} color='primary'>
					<NotificationsIcon color='inherit' />
				</Badge>
			</IconButton>

			<Menu
				id='notifications-menu'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={anchorEl !== null}
				onClose={() => setAnchorEl(null)}
				sx={{
					'.MuiMenu-paper': {
						width: '400px',
					},
					'.MuiMenuItem-root': {
						whiteSpace: 'normal',
					},
					'a,p': {
						color: 'inherit',
						fontSize: '14px',
					},
				}}
			>
				<Typography
					variant='h2'
					sx={{ fontSize: '1rem', fontWeight: '600', p: 2 }}
				>
					Notifications
				</Typography>

				<Divider />

				{[...notifications].reverse().map((notification, i) => (
					<MenuItem key={i}>
						{notification.to ? (
							<Link to={notification.to}>{notification.message}</Link>
						) : (
							<Typography>{notification.message}</Typography>
						)}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}

function notificationsLabel(count: number) {
	if (count === 0) {
		return 'no notifications';
	}
	if (count > 99) {
		return 'more than 99 notifications';
	}
	return `${count} notifications`;
}

const placeholderNotifications = [
	{ message: 'hello' },
	{
		message:
			'Admin requests you to provide more information on the following review challenge. Please navigate the link.',
		to: 'https://example.com',
	},
];
