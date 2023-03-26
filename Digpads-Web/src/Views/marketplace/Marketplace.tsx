import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Container, Typography, Stack } from '@mui/material';

import Header from 'components/Nav/Header';
import Footer from 'components/Footer/Footer';

export default function Marketplace() {
	const location = useLocation();

	return (
		<>
			<Header />

			<Container>
				{location.pathname === '/marketplace' && (
					<>
						<Typography sx={{ fontSize: '2rem' }} align='center'>
							Choose your marketplace
						</Typography>

						<Stack rowGap='0.5em'>
							<Link to='/marketplace/landlords'>Landlords</Link>
							<Link to='/marketplace/landlord-contractors'>
								Landlord-contractors
							</Link>
							<Link to='/marketplace/contractors'>Contractors</Link>
							<Link to='/marketplace/tenants'>Tenants</Link>
						</Stack>
					</>
				)}
				<Outlet />
			</Container>

			<Footer />
		</>
	);
}
