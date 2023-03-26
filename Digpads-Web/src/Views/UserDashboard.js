import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';
import { instance, getCSRF } from '../controllers/axios';

import {
	Grid,
	RadioGroup,
	Typography,
	FormControlLabel,
	Button,
	Box,
	Radio,
} from '@mui/material';

import Header from 'components/Nav/Header';
import { NarrowHeader } from 'components/styled/Page';
import Feed from './Feed';
import MyModal from 'components/Modal';

export default function UserDashboard() {
	const { auth } = useContext(authContext);

	const [open, setOpen] = useState(false);

	const [name, setName] = useState('forumName');
	const [displayUsername, setDisplayUsername] = useState(true);

	const handleModalControl = () => {
		setOpen(!open);
	};

	const handleChangeName = (event) => {
		if (event.target.value === 'forumName') {
			setDisplayUsername(true);
		} else {
			setDisplayUsername(false);
		}
		setName(event.target.value);
	};

	const handleContinue = async () => {
		await getCSRF();

		try {
			let res = await instance.post('updateProfile', {
				displayUsername,
			});
			if (res.status === 200) {
				setOpen(false);
				return;
			}
		} catch (e) {
			setOpen(false);
			3;
		}
	};

	useEffect(() => {
		if (auth?.data?.displayUsername === null) {
			setOpen(true);
		}
	}, [auth?.data]);

	return (
		<>
			<NarrowHeader>
				<Header />
			</NarrowHeader>

			<Feed />

			<MyModal display={open} modalControl={handleModalControl}>
				<>
					<RadioGroup name='name' value={name} onChange={handleChangeName}>
						<Grid container>
							<Grid item xs={12}>
								<Typography variant='body2'>
									Thanks for registering for digpads Landlord Forum! You are now
									able to make posts and comment on posts. Please choose whether
									you would like to utilize your Forum Name or your Real Name on
									digpads' Landlord Forum.
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<FormControlLabel
									value='forumName'
									control={<Radio color='primary' />}
									label='Forum Name'
								/>
							</Grid>

							<Grid item xs={6}>
								<FormControlLabel
									value='realName'
									control={<Radio color='primary' />}
									label='Real Name'
								/>
							</Grid>
						</Grid>
					</RadioGroup>

					<Box mt={4} display='flex' justifyContent='flex-end'>
						<Button
							variant='contained'
							color='primary'
							onClick={handleContinue}
						>
							Continue
						</Button>
					</Box>
				</>
			</MyModal>
		</>
	);
}
