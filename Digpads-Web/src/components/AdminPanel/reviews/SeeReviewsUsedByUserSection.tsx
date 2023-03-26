import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

import { getUsedReviews } from 'controllers/reviews';

import ReviewsUsedByUser from './ReviewsUsedByUser';
import useSearchUsers from 'hooks/useSearchUsers';
import SearchUsers from '../users/SearchUsers';
import { ModalWindowBase } from 'components/styled/Modal';

export default function SeeReviewsUsedByUserSection() {
	const [users, selectedUser, setSelectedUser, inputValue, handleInputChange] =
		useSearchUsers();
	const [reviews, setReviews] = React.useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const handleSelectUser = (user) => {
		setSelectedUser(user);
		setModalOpen(true);
		getUsedReviews(user._id).then((reviews) => setReviews(reviews));
	};

	return (
		<>
			<SearchUsers
				selectedUser={selectedUser}
				onSelectUser={handleSelectUser}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				users={users}
			/>

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<ModalWindowBase style={{ width: '800px' }}>
					<ReviewsUsedByUser
						userName={selectedUser?.first + selectedUser?.last}
						reviews={reviews}
						onClose={() => setModalOpen(false)}
					/>
				</ModalWindowBase>
			</Modal>
		</>
	);
}
