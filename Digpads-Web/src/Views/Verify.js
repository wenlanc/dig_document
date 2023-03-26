import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { instance, getCSRF } from '../controllers/axios';
import MyModal from 'components/Modal';

import Auth from 'components/Auth/Auth';
import { Grid } from '@mui/material';

const DEFAULT_MESSAGE = 'Thanks for verifying your email, log in to continue';

export default function Verify(props) {
	getCSRF();
	const params = useParams();
	const token = params.token;
	const [message, setMessage] = useState(DEFAULT_MESSAGE);

	useEffect(() => {
		async function getEmail() {
			try {
				await instance.post('verify', { vToken: token });
			} catch (e) {
				setMessage(
					'Invalid or expired link. Log in if you already verified your account'
				);
			}
		}
		getEmail();
	}, [token]);

	return (
		<MyModal display={true} noClose={true}>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				{message}
				<Auth redirectURL={'/landlordforum'} />
			</Grid>
		</MyModal>
	);
}
