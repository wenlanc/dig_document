import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	MenuItem,
	ListItemIcon,
	Divider,
	MenuList,
	ListItemText,
	Box,
} from '@mui/material';
import MenuIcons from './MenuIcons';

const MenuWrapper = styled.div`
	padding-left: 64px;
	margin-bottom: 64px;
`;

const StyledMenuItem = styled(({ active, ...props }) => (
	<MenuItem {...props} />
))`
	color: ${(props) => props.active && '#0063c8'};
	padding: 16px 0;
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

const StyledDivider = styled(({ active, ...props }) => <Divider {...props} />)`
	background: rgba(0, 0, 0, 0.08);
	height: ${(props) => props.active && '3px'};
	background: ${(props) => props.active && '#0063c8'};
`;

function Menu({ landlordToolsSidebar, toggleDrawer }) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<MenuWrapper>
			<MenuList>
				{landlordToolsSidebar.map((landlordToolsSidebar, index) => {
					const isActive =
						landlordToolsSidebar.title
							.toLowerCase()
							.split(' ')
							.join('-') === location.pathname.split('/')[2];

					return (
						<div key={index}>
							<StyledMenuItem
								onClick={() => {
									toggleDrawer();
									navigate(
										`/landlord-tools/${landlordToolsSidebar.title
											.toLowerCase()
											.split(' ')
											.join('-')}`
									);
								}}
								active={isActive}
							>
								{' '}
								<StyledListItemIcon active={isActive}>
									<MenuIcons
										active={isActive}
										menu={landlordToolsSidebar.title.toLowerCase()}
									/>
								</StyledListItemIcon>
								<ListItemText>
									{' '}
									{landlordToolsSidebar.title}
								</ListItemText>
							</StyledMenuItem>
							<StyledDivider active={isActive} />
							{landlordToolsSidebar.submenu &&
								landlordToolsSidebar.submenu.map(
									(menu, index) => {
										const isActiveSubMenu =
											menu
												.toLowerCase()
												.split(' ')
												.join('-') ===
											location.pathname.split('/')[2];
										return (
											<Box
												key={index}
												style={{ paddingLeft: 40 }}
											>
												<StyledMenuItem
													key={index}
													onClick={() => {
														toggleDrawer();
														navigate(
															`/landlord-tools/${menu
																.toLowerCase()
																.split(' ')
																.join('-')}`
														);
													}}
													active={isActiveSubMenu}
												>
													<StyledListItemIcon
														active={isActiveSubMenu}
													>
														<MenuIcons
															active={
																isActiveSubMenu
															}
															menu={menu.toLowerCase()}
														/>
													</StyledListItemIcon>{' '}
													<ListItemText>
														{' '}
														{menu}
													</ListItemText>
												</StyledMenuItem>
												<StyledDivider
													active={isActiveSubMenu}
												/>
											</Box>
										);
									}
								)}
						</div>
					);
				})}
			</MenuList>
		</MenuWrapper>
	);
}

export default Menu;
