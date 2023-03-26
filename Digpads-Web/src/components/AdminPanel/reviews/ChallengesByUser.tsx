import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { SectionSubtitle } from '../../styled/Admin';
import { ModalWindowBase } from 'components/styled/Modal';
import { IReview } from 'types';
import SearchUsers from '../users/SearchUsers';
import useSearchUsers from '../../../hooks/useSearchUsers';
import { fetchChallengedReviews } from 'controllers/reviews';

export default function ChallengesByUser() {
	const [users, selectedUser, setSelectedUser, inputValue, onInputChange] =
		useSearchUsers();
	const [challengesByUserModalOpen, setChallengesByUserModalOpen] =
		useState(false);
	const [reviews, setReviews] = useState<IReview[]>([]);

	const handleSelectUser = (user) => {
		setChallengesByUserModalOpen(true);
		setSelectedUser(user);

		fetchChallengedReviews(user._id)
			.then((reviews) => {
				setReviews(transformChallengedReviews(reviews));
			})
			.catch((error) => alert(error));
	};

	function transformChallengedReviews(reviews) {
		return reviews.map((r) => ({
			id: r._id,
			userReviewed: 'No',
			campaignName: r.campaign?.name || 'unknown',
			title: r.title,
			createdAt: r.createdAt
				? new Date(r.createdAt).toLocaleDateString()
				: 'unknown',
			dateChallenged: r.challenge?.createdAt
				? new Date(r.challenge?.createdAt).toLocaleDateString()
				: 'unknown',
			challengeType: r.challenge?.reason || 'unknown',
		}));
	}

	return (
		<>
			<Stack spacing={4} sx={{ mb: '3em' }}>
				<div>
					<SearchUsers
						selectedUser={selectedUser}
						onSelectUser={handleSelectUser}
						inputValue={inputValue}
						onInputChange={onInputChange}
						users={users}
					/>
				</div>
			</Stack>

			<Modal
				open={challengesByUserModalOpen}
				onClose={() => setChallengesByUserModalOpen(false)}
			>
				<ModalWindowBase
					sx={{
						maxWidth: '80%',
					}}
				>
					<SectionSubtitle>Challenged Reviews by User</SectionSubtitle>

					<IconButton
						sx={{ position: 'absolute', top: '1em', right: '1em' }}
						onClick={() => setChallengesByUserModalOpen(false)}
					>
						<CloseIcon />
					</IconButton>

					<Typography sx={{ mb: '1em', fontWeight: 'bold' }}>
						{selectedUser?.name}
					</Typography>

					{/* divider */}
					<Box sx={{ border: '1px dashed gray', mb: '1em' }} />
				</ModalWindowBase>
			</Modal>
		</>
	);
}
