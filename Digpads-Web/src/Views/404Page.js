import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from 'components/Nav/Header';
export default function Page404(props) {
	let [history] = useState(
		new URLSearchParams(props.location.search).get('history')
	);
	return (
		<Grid container style={{ marginTop: '20vh' }} justifyContent='center'>
			<Header />
			<Typography>Sorry but this page is not available</Typography>
			<Typography>
				<Link to={history}>Try again</Link>
			</Typography>
		</Grid>
	);
}
