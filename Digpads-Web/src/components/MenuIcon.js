import React from 'react';
import styled from 'styled-components';
import { IconButton, Menu, MenuItem } from '@mui/material/';
const SDiv = styled.div`
	background-color: white;
	border-radius: 50%;
`;
export default function MenuIcon(props) {
	const open = Boolean(props.openMenu);

	const handleMenu = (event) => {
		props.setOpenMenu(event.currentTarget);
	};

	const handleClose = () => {
		props.setOpenMenu(null);
	};
	const menuItems = props.menuItems.map((obj) => (
		<MenuItem
			onClick={() => {
				props.setToOpen(obj.key);
				obj.handler();
			}}
			key={obj.key}
		>
			{obj.key}
		</MenuItem>
	));

	return (
		<SDiv>
			<IconButton
				aria-label='account of current user'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleMenu}
				color='inherit'
				disableFocusRipple
				disableRipple
				size='large'
			>
				{props.children}
			</IconButton>
			<Menu
				autoFocus={false}
				id='menu-appbar'
				anchorEl={props.openMenu}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
				onClose={handleClose}
			>
				{menuItems}
			</Menu>
		</SDiv>
	);
}
