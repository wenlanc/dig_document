import React, { useState } from 'react';
import useSearchUsers from 'hooks/useSearchUsers';
import Stack from '@mui/material/Stack';

import { SectionSubtitle } from 'components/styled/Admin';

import SearchUsers from '../users/SearchUsers';
import UserCampaignsTable from './UserCampaignsTable';
import { getReviews } from 'controllers/reviews';

export default function UserCampaigns() {
	const [users, selectedUser, setSelectedUser, inputValue, onInputChange] =
		useSearchUsers();

	const [userReviews, setUserReviews] = useState([]);

	const handleSelectUser = (user) => {
		setSelectedUser(user);
		getReviews(user._id).then((reviews) => setUserReviews(reviews));
	};

	return (
		<div>
			<Stack direction='row' spacing={4}>
				<div>
					<SectionSubtitle>User Campaigns</SectionSubtitle>

					<SearchUsers
						selectedUser={selectedUser}
						onSelectUser={handleSelectUser}
						inputValue={inputValue}
						onInputChange={onInputChange}
						users={users}
					/>
				</div>
			</Stack>

			<UserCampaignsTable userReviews={userReviews} />
		</div>
	);
}
