import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';

// Custom styles for the Sidenav
import SidenavRoot from 'examples/Sidenav/SidenavRoot';
import sidenavLogoLabel from 'examples/Sidenav/styles/sidenav';

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from 'contexts';

function Sidenav({ color, brand, brandName, routes, titleHref, ...rest }) {
	const [controller, dispatch] = useSoftUIController();
	const { miniSidenav, transparentSidenav } = controller;
	const location = useLocation();
	const { pathname } = location;

	const closeSidenav = () => setMiniSidenav(dispatch, true);

	useEffect(() => {
		// A function that sets the mini state of the sidenav.
		function handleMiniSidenav() {
			setMiniSidenav(dispatch, window.innerWidth < 1200);
		}

		/** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
		window.addEventListener('resize', handleMiniSidenav);

		// Call the handleMiniSidenav function to set the state with the initial value.
		handleMiniSidenav();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleMiniSidenav);
	}, [dispatch, location]);

	const renderRoutes = routes.map(({ name, path }) => (
		<li key={path}>
			<SuiBox py={1} px={2} mx={1}>
				<Link to={path} component={RouterLink} color='#67748e'>
					{name}
				</Link>
			</SuiBox>
		</li>
	));

	return (
		<SidenavRoot
			{...rest}
			variant='permanent'
			ownerState={{ transparentSidenav, miniSidenav }}
		>
			<SuiBox pt={3} pb={1} px={4} textAlign='center'>
				<SuiBox
					display={{ xs: 'block', xl: 'none' }}
					position='absolute'
					top={0}
					right={0}
					p={1.625}
					onClick={closeSidenav}
					sx={{ cursor: 'pointer' }}
				>
					<SuiTypography variant='h6' color='secondary'>
						<Icon sx={{ fontWeight: 'bold' }}>close</Icon>
					</SuiTypography>
				</SuiBox>
				<SuiBox
					component={NavLink}
					to={titleHref || '/'}
					display='flex'
					alignItems='center'
				>
					<SuiBox
						width={!brandName && '100%'}
						sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
					>
						<SuiTypography
							sx={{ fontSize: '1.2rem' }}
							component='h6'
							variant='button'
							fontWeight='medium'
						>
							{brandName}
						</SuiTypography>
					</SuiBox>
				</SuiBox>
			</SuiBox>
			<Divider />

			<List>{renderRoutes}</List>
		</SidenavRoot>
	);
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
	color: 'info',
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error',
		'dark',
	]),
	brandName: PropTypes.string.isRequired,
	routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
