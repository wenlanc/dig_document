import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Nav/Header';
import { StyledAdminPanel } from '../styled/Admin';

import { useSoftUIController, setMiniSidenav } from 'contexts';

import Sidenav from 'examples/Sidenav';

import brand from 'assets/images/logo-ct.png';
import { adminRoutes } from 'routes';

export default function AdminPanel() {
	const [controller, dispatch] = useSoftUIController();
	const { miniSidenav, direction, layout, openConfigurator, sidenavColor } =
		controller;
	const [onMouseEnter, setOnMouseEnter] = useState(false);

	// Open sidenav when mouse enter on mini sidenav
	const handleOnMouseEnter = () => {
		if (miniSidenav && !onMouseEnter) {
			setMiniSidenav(dispatch, false);
			setOnMouseEnter(true);
		}
	};

	// Close sidenav when mouse leave mini sidenav
	const handleOnMouseLeave = () => {
		if (onMouseEnter) {
			setMiniSidenav(dispatch, true);
			setOnMouseEnter(false);
		}
	};

	return (
		<>
			<StyledAdminPanel>
				<Header />
				<Sidenav
					color={sidenavColor}
					brand={brand}
					brandName='Admin Panel'
					routes={adminRoutes}
					onMouseEnter={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
					titleHref='/admin'
				/>
				<Outlet />
			</StyledAdminPanel>
		</>
	);
}
