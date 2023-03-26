import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Snackbar, Divider } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import DashboardLayout from 'components/DashboardLayout';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';
import SearchUsers from 'components/AdminPanel/users/SearchUsers';
import useSearchUsers from 'hooks/useSearchUsers';
import CreateProfileForm from './CreateProfileForm';
import UnclaimedProfiles from './UnclaimedProfiles';
import Footer from 'components/Footer';
import {
	deleteUserProfile,
	createProfile,
} from 'controllers/marketplaceProfile';

import { getUserTypeUrlParameter } from 'utils/urlUtils';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function profiles() {
	const [users, selectedUser, setSelectedUser, inputValue, handleInputChange] =
		useSearchUsers();
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const navigate = useNavigate();

	const handleDeleteUserProfile = async () => {
		const deleted = await deleteUserProfile(selectedUser._id);

		if (deleted) {
			setAlertMessage('Profile successfully deleted');
			setAlertOpen(true);
		}
	};

	const handleCreateProfileFormSubmit = async (formData) => {
		const profile = await createProfile(formData);
		navigate(`/settings/edit-profile/${profile.user._id}`);
	};

	return (
		<DashboardLayout sx={{ pb: '3em' }}>
			<SuiTypography variant='h2' component='h2' gutterBottom>
				Marketplace profiles
			</SuiTypography>
			<SearchUsers
				selectedUser={selectedUser}
				onSelectUser={(user) => setSelectedUser(user)}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				users={users}
			/>
			{selectedUser && (
				<Stack direction='row' gap='1em' mb={3}>
					<SuiButton
						component='a'
						color='primary'
						href={`/settings/edit-profile/${selectedUser._id}`}
						target='_blank'
					>
						Edit Profile
					</SuiButton>

					<SuiButton
						onClick={handleDeleteUserProfile}
						disabled={!selectedUser}
						color='warning'
					>
						Delete Profile
					</SuiButton>

					<SuiButton
						component='a'
						target='_blank'
						href={`/marketplace/${getUserTypeUrlParameter(selectedUser.type)}/${
							selectedUser._id
						}`}
						disabled={!selectedUser}
						color='primary'
					>
						See Profile
					</SuiButton>
				</Stack>
			)}
			<Divider sx={{ my: 2 }} />
			<div>
				<SuiTypography variant='h4' component='h3' gutterBottom>
					Create Profile
				</SuiTypography>

				<CreateProfileForm onSubmit={handleCreateProfileFormSubmit} />
			</div>
			<Divider sx={{ my: 2 }} />
			<div>
				<UnclaimedProfiles />
			</div>
			<Footer renderSubscribe={false} />;
			<Snackbar
				open={alertOpen}
				autoHideDuration={6000}
				onClose={() => setAlertOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setAlertOpen(false)} severity='success'>
					{alertMessage}
				</Alert>
			</Snackbar>
		</DashboardLayout>
	);
}
