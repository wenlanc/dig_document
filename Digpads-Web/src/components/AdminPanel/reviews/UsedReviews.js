import React, { useState } from 'react';
import UsedReviewsTable from './UsedReviewsTable';
import { SectionSubtitle } from 'components/styled/Admin';
import useSearchUsers from 'hooks/useSearchUsers';
import SearchUsers from '../users/SearchUsers';
import { instance } from 'controllers/axios';

export default function UserCampaigns() {
	const [users, selectedUser, setSelectedUser, inputValue, handleInputChange] =
		useSearchUsers();

	const [userCampaigns, setUserCampaigns] = useState([]);
	const [campaignsModalOpen, setCampaignsModalOpen] = useState(false);

	const handleSelectUser = (user) => {
		setSelectedUser(user);
		setCampaignsModalOpen(true);
		fetchUserCampaigns(user._id).then((campaigns) =>
			setUserCampaigns(campaigns)
		);
	};

	async function fetchUserCampaigns() {
		try {
			const response = await instance.get(
				`/campaigns/?user=${selectedUser._id}`
			);

			return response.data;
		} catch (error) {
			alert(`Error fetching user campaigns ${error}`);
		}
	}

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

			<div>
				<SectionSubtitle>Used Reviews</SectionSubtitle>
				<UsedReviewsTable
					reviews={[
						{
							name: 'Widgets',
							content: [15, 52, 929, 195],
						},
						{
							name: 'Modal',
							content: [25, 16, 75, 261],
						},
						{
							name: 'Pop Up',
							content: [11, 212, 616, 261],
						},
						{
							name: 'Reviews Shared',
							content: [19, 167, 126, 273],
						},
						{
							name: 'Reviews Responses',
							content: [19, 167, 126, 273],
						},
					]}
				/>
			</div>
		</>
	);
}
