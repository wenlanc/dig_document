import React, { useState } from 'react';
import { Modal, Stack, Typography } from '@mui/material';

import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';
import UnclaimedProfilesTable from './UnclaimedProfilesTable';
import AssignUnclaimedProfileForm from './AssignUnclaimedProfileForm';
import { ModalBase } from 'components/styled/Modal';
import { useSelector } from 'react-redux';
import { selectSelectedProfile } from 'features/marketplaceProfile/marketplaceProfileSlice';

import {
	fetchUnclaimedProfiles,
	assignUnclaimedProfile,
} from 'controllers/marketplaceProfile';
import { MarketplaceProfile } from 'types';

export default function UnclaimedProfiles() {
	const [profiles, setProfiles] = useState<Partial<MarketplaceProfile>[]>([]);
	const selectedProfile = useSelector(selectSelectedProfile);

	const [modalOpen, setModalOpen] = useState(false);
	const [filterText, setFilterText] = useState('');

	const handleFilterTextChange = (evt) => setFilterText(evt.target.value);

	const handleUnclaimedProfilesClick = async () => {
		setModalOpen(true);

		try {
			const profiles = await fetchUnclaimedProfiles();
			setProfiles(profiles);
		} catch (error) {
			alert(`Error fetching unclaimed profiles: ${error.message}`);
		}
	};

	const handleAssignUnclaimedProfileFormSubmit = async (profile, email) => {
		try {
			await assignUnclaimedProfile(profile._id, email);

			// remove assigned profile from the list
		} catch (error) {}
	};

	return (
		<>
			<SuiButton
				variant='outlined'
				color='primary'
				onClick={handleUnclaimedProfilesClick}
			>
				Unclaimed Profiles
			</SuiButton>

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<ModalBase sx={{ width: '80%', maxWidth: '800px' }}>
					<SuiTypography
						variant='h4'
						color='secondary'
						component='h3'
						gutterBottom
					>
						Unclaimed Profiles
					</SuiTypography>

					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
						mb={2}
						gap={2}
					>
						{profiles?.length > 0 && (
							<SuiInput
								sx={{ maxWidth: '230px' }}
								placeholder={`Search unclaimed profiles`}
								type='text'
								onChange={handleFilterTextChange}
							/>
						)}

						<AssignUnclaimedProfileForm
							profile={selectedProfile}
							onSubmit={handleAssignUnclaimedProfileFormSubmit}
						/>
					</Stack>

					<UnclaimedProfilesTable profiles={profiles} filterText={filterText} />
				</ModalBase>
			</Modal>
		</>
	);
}
