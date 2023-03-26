import React, { useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Campaign } from 'types';
import SuiInput from 'components/SuiInput';
import UserCampaignsByUserTable from './UserCampaignsByUserTable';
import { SectionSubtitle } from 'components/styled/Admin';
import useSearchUsers from 'hooks/useSearchUsers';
import SearchUsers from '../users/SearchUsers';
import { ModalWindowBase } from 'components/styled/Modal';
import { fetchUserCampaigns } from 'controllers/campaigns';

export default function UserCampaignsByUser() {
	const [users, selectedUser, setSelectedUser, inputValue, handleInputChange] =
		useSearchUsers();

	const [userCampaigns, setUserCampaigns] = useState([
		{
			id: '123',
			userName: 'Carl young',
			name: 'Super campa',
			dateLaunched: new Date().toLocaleDateString(),
			reviewsCollected: 5,
			reviewsPublished: 8,
			reviewsRejected: 2,
			status: 'ok',
		},
	]);
	const [campaignsModalOpen, setCampaignsModalOpen] = useState(false);
	const [filter, setFilter] = useState('');

	const handleFilterChange = (evt) => {
		setFilter(evt.target.value);
	};

	const handleSelectUser = (user) => {
		setSelectedUser(user);
		setCampaignsModalOpen(true);

		fetchUserCampaigns(user._id)
			.then((campaigns) => {
				campaigns = transformUserCampaigns(
					campaigns,
					user.first + ' ' + user.last
				);
				setUserCampaigns(campaigns);
			})
			.catch((error) => alert(error));
	};

	function transformUserCampaigns(campaigns: Campaign[], userName: string) {
		console.log(userName);
		return campaigns?.map((c) => ({
			id: c._id,
			userName: userName,
			name: c.name,
			dateLaunched: c.dateLaunched
				? new Date(c.dateLaunched).toLocaleDateString()
				: 'unknown',
			reviewsCollected: c.reviews?.length || 0,
			reviewsPublished: c.reviews?.filter((r) => !r.rejected).length,
			reviewsRejected: c.reviews?.filter((r) => r.rejected).length,
			status: c.deleted === true ? 'deleted' : 'active',
		}));
	}

	const handleCampaignEnded = (campaignId) => {
		const updatedCampaigns = [...userCampaigns];

		const campaignToUpdate = userCampaigns.findIndex(
			(c) => c.id === campaignId
		);

		if (campaignToUpdate !== -1) {
			updatedCampaigns[campaignToUpdate] = {
				...updatedCampaigns[campaignToUpdate],
				status: 'deleted',
			};

			setUserCampaigns(updatedCampaigns);
		} else {
			throw Error('campaign not found');
		}
	};

	return (
		<>
			<SectionSubtitle>User Campaigns by User</SectionSubtitle>
			<SearchUsers
				selectedUser={selectedUser}
				onSelectUser={handleSelectUser}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				users={users}
			/>

			<Modal
				open={campaignsModalOpen}
				onClose={() => setCampaignsModalOpen(false)}
			>
				<ModalWindowBase style={{ width: '980px' }}>
					<IconButton
						sx={{ position: 'absolute', right: '0', top: '0' }}
						onClick={() => setCampaignsModalOpen(false)}
					>
						<CloseIcon />
					</IconButton>

					<SectionSubtitle>User Campaigns by User</SectionSubtitle>

					<Box width='250px' mb={2}>
						<SuiInput
							type='text'
							placeholder='Search review title'
							value={filter}
							onChange={handleFilterChange}
						/>
					</Box>

					<UserCampaignsByUserTable
						campaigns={userCampaigns}
						filter={filter}
						onCampaignEnded={handleCampaignEnded}
					/>
				</ModalWindowBase>
			</Modal>
		</>
	);
}
