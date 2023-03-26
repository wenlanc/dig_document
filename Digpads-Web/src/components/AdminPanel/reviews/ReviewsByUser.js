import React, { useState } from 'react';
import { Box, Stack, TextField, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ReviewsByUserTable from './ReviewsByUserTable';
import ReviewDetails from './ReviewDetails';
import { ModalBase } from 'components/styled/Modal';

export default function ReviewsByUser({
	reviews,
	userName = '',
	onDeleteReview,
	onEditReview,
	onClose,
}) {
	const [filter, setFilter] = useState('');
	const [selectedReview, setSelectedReview] = useState();
	const [reviewDetailsModalOpen, setReviewDetailsModalOpen] = useState(false);

	const handleFilterChange = (evt) => {
		setFilter(evt.target.value);
	};

	const handleSelectReview = (id) => {
		const review = reviews?.find((review) => review._id === id);
		setSelectedReview(review);
		setReviewDetailsModalOpen(true);
	};

	return (
		<Box sx={{ minWidth: '750px' }}>
			<IconButton
				sx={{ position: 'absolute', right: '0', top: '0' }}
				onClick={onClose}
			>
				<CloseIcon />
			</IconButton>

			<Stack spacing={1} alignItems='flex-start' sx={{ mb: '1em' }}>
				<p>{userName}</p>

				<TextField
					type='text'
					placeholder='Search review title'
					value={filter}
					onChange={handleFilterChange}
				/>

				{reviews?.length === 0 && <p>User has no reviews</p>}
			</Stack>

			{reviews?.length > 0 && (
				<ReviewsByUserTable
					reviews={reviews}
					filter={filter}
					onSelectReview={handleSelectReview}
				/>
			)}

			<Modal
				open={reviewDetailsModalOpen}
				onClose={() => setReviewDetailsModalOpen(false)}
			>
				<ModalBase>
					<IconButton
						sx={{ position: 'absolute', right: '0', top: '0', p: '1em' }}
						onClick={() => setReviewDetailsModalOpen(false)}
					>
						<CloseIcon />
					</IconButton>

					<ReviewDetails
						{...selectedReview}
						reviewerEmail={selectedReview?.reviewer?.email}
						campaignName={selectedReview?.campaign?.name}
						onDeleteReview={onDeleteReview}
						onEditReview={onEditReview}
					/>
				</ModalBase>
			</Modal>
		</Box>
	);
}
