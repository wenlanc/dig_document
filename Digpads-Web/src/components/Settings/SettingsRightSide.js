import React, { useState, useEffect } from 'react';
import { Container, Snackbar, Divider } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import SettingsProfile from './SettingsProfile';
import SettingsFavoriteCommunities from './SettingsFavoriteCommunities';
import SettingsMyPostAndComments from './SettingsMyPostAndComments';
import SettingsPreferences from './SettingsPreferences';
import ModalPassword from './ModalPassword';
import ModalResetPassword from './ModalResetPassword';
import { instance, getCSRF } from '../../controllers/axios';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function SettingsRightSide({ sectionRefs }) {
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	const [profile, setProfile] = useState({
		forumName: undefined,
		forumFirstName: undefined,
		forumState: undefined,
		forumCity: undefined,
		password: undefined,
	});

	const [password, setPassword] = useState({
		password: '',
		resetPassword: '',
		confirmResetPassword: '',
	});

	const [favoritedCommunities, setFavoritedCommunities] = useState([
		{
			state: '',
			city: '',
		},
		{
			state: '',
			city: '',
		},
		{
			state: '',
			city: '',
		},
	]);

	const [openPasswordModal, setOpenPasswordModal] = useState(false);
	const [openResetModal, setOpenResetModal] = useState(false);

	const [error, setError] = useState('');

	const handleClose = () => {
		setAlert(false);
	};

	const handleOpenResetModal = () => setOpenResetModal(true);
	const handleCloseResetModal = () => setOpenResetModal(false);

	const handleOpenPasswordModal = () => setOpenPasswordModal(true);
	const handleCloseOpenPasswordModal = () => setOpenPasswordModal(false);

	const handleChangeProfile = (event, type) => {
		setProfile({
			...profile,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeFavoritedCommunities = (event, index) => {
		favoritedCommunities[index] = event.target.value;
		setFavoritedCommunities([...favoritedCommunities]);
	};

	const onSubmitFavoritedCommunities = async (event) => {
		event.preventDefault();

		await getCSRF();

		instance
			.post('updateProfile', { favoritedCommunities })
			.then((response) => {
				setAlert(true);
				setMessage('Update Favorited Communities Successfull');
				setType('success');
				return response;
			})
			.catch((err) => {
				return err;
			});
	};

	const handleDeleteFavoritedCommunities = (index) => {
		favoritedCommunities.splice(index, 1);

		setFavoritedCommunities([...favoritedCommunities]);
	};

	const handleAddNewCommunity = (e) => {
		e.preventDefault();

		if (
			favoritedCommunities.filter((favoritedCommunity) => {
				return favoritedCommunity !== null;
			}).length === 3
		) {
			setAlert(true);
			setMessage(
				'Limit 3 Favorite Communities. Please remove one to add another.'
			);
			setType('warning');
			return;
		}
		setFavoritedCommunities([...favoritedCommunities, '']);
	};

	const onSubmitProfile = async (event, message) => {
		event.preventDefault();

		await getCSRF();
		let body;

		if (message === 'Profile') {
			body = {
				...profile,
				body64: profile.profileImage,
				forumFirstName: profile.forumFirstName,
				last: profile.last,
				username: profile.forumName,
				forumCity: profile.city,
				forumState: profile.state,
				accountType: profile.accountType,
			};
		} else if (message === 'Password') {
			body = {
				hash: password.resetPassword,
			};
		}

		instance
			.post('updateProfile', body)
			.then((response) => {
				setAlert(true);
				setMessage(`Update ${message} Successfull`);
				setType('success');

				if (message === 'Password') {
					handleCloseResetModal();
					setPassword({
						...password,
						resetPassword: '',
						confirmResetPassword: '',
					});
				}
				return response;
			})
			.catch((err) => {
				return err;
			});
	};

	useEffect(() => {
		instance
			.get('userProfile')
			.then((response) => {
				setProfile({
					...response.data.data.data,
					profileImageName: 'Upload',
					forumName: response.data.data.data.username,
					city: response.data.data.data.forumCity,
					state: response.data.data.data.forumState,
					timezone: response.data.data.data.timezone,
				});

				if (response.data.data.data.favoritedCommunities.length > 0) {
					setFavoritedCommunities([
						...response.data.data.data.favoritedCommunities,
					]);
				}
			})
			.catch((err) => {
				return err;
			});
	}, []);

	return (
		<>
			<Container>
				<SettingsProfile
					sectionRefs={sectionRefs[0]}
					profile={profile}
					setProfile={setProfile}
					handleChange={handleChangeProfile}
					onSubmit={onSubmitProfile}
					handleOpen={handleOpenPasswordModal}
				/>

				<SettingsFavoriteCommunities
					sectionRefs={sectionRefs[1]}
					favoritedCommunities={favoritedCommunities}
					handleChange={handleChangeFavoritedCommunities}
					onSubmit={onSubmitFavoritedCommunities}
					handleDelete={handleDeleteFavoritedCommunities}
					handleAddNewCommunity={handleAddNewCommunity}
					setFavoritedCommunities={setFavoritedCommunities}
				/>

				<Divider sx={{ m: '2em 0' }} />

				<SettingsMyPostAndComments sectionRefs={sectionRefs[2]} />

				<Divider sx={{ m: '2em 0' }} />

				<SettingsPreferences sectionRefs={sectionRefs[3]} />

				<ModalPassword
					open={openPasswordModal}
					handleClose={handleCloseOpenPasswordModal}
					handleChange={handleChangeProfile}
					handleOpen={handleOpenResetModal}
					password={password}
					setPassword={setPassword}
					error={error}
					setError={setError}
				/>
				<ModalResetPassword
					open={openResetModal}
					handleClose={handleCloseResetModal}
					password={password}
					setPassword={setPassword}
					error={error}
					setError={setError}
					onSubmit={onSubmitProfile}
				/>
				<Snackbar
					open={alert}
					autoHideDuration={6000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleClose} severity={type}>
						{message}
					</Alert>
				</Snackbar>
			</Container>
		</>
	);
}
