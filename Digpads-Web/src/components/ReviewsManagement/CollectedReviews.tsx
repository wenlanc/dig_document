import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

import { useAuth } from 'contexts/AuthContext';
import { UserType } from 'types';
import { respondToReview } from 'controllers/reviews';
import SearchBar from './UseReviews/SearchBar';
import ChallengeReview from './ChallengeReview/ChallengeReview';
import RespondToReview from './RespondToReview';
import Share from './Share';
import CollectedReviewsTable from './CollectedReviewsTable';
import { StyledLabel, StyledModal } from 'components/styled/ReviewsManagement';

export default function CollectedReviews({ reviews }) {
	const [selectedReview, setSelectedReview] = useState(null);
	const [isRespondingModalOpen, setIsRespondingModalOpen] = useState(false);
	const [isChallengingReview, setIsChallengingReview] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [filterText, setFilterText] = React.useState('');
	const { auth } = useAuth();

	const handleFilterTextChange = (filterText) => {
		setFilterText(filterText);
	};

	const handleRespondToReview = () => {
		setIsRespondingModalOpen(true);
	};

	const handleShareReview = () => {
		setIsSharing(true);
	};

	const handleChallengeReview = () => {
		setIsChallengingReview(true);
	};

	const handleRespondToReviewSubmit = async (reviewId, content) => {
		try {
			console.log(content);
			await respondToReview(reviewId, { content });
			alert('submitted successfully');
			setIsRespondingModalOpen(false);
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	};

	const ReviewActionButton = (props) => (
		<Button
			{...props}
			disabled={selectedReview === null}
			size='small'
			variant='outlined'
			style={{
				color: '#3240B9',
				textTransform: 'capitalize',
				fontWeight: 'bold',
				borderRadius: '0',
			}}
		/>
	);

	return (
		<div style={{ overflowX: 'scroll', paddingBottom: '1em' }}>
			<StyledLabel underlined={true}>Collected Reviews</StyledLabel>

			<SearchBar
				filterText={filterText}
				onFilterTextChange={handleFilterTextChange}
			/>

			<CollectedReviewsTable
				reviews={reviews}
				onSelectReview={(review) => setSelectedReview(review)}
				selectedReview={selectedReview}
				filterText={filterText}
			/>

			<Stack direction='row' justifyContent='flex-end' spacing={4}>
				<ReviewActionButton onClick={handleRespondToReview}>
					Respond
				</ReviewActionButton>

				<ReviewActionButton onClick={handleShareReview}>
					Share
				</ReviewActionButton>

				<ReviewActionButton onClick={handleChallengeReview}>
					Challenge
				</ReviewActionButton>
			</Stack>

			<Modal
				open={isChallengingReview}
				onClose={() => setIsChallengingReview(false)}
				keepMounted
			>
				<div>
					<ChallengeReview
						reviewId={selectedReview?._id}
						onClose={() => setIsChallengingReview(false)}
					/>
				</div>
			</Modal>

			<Modal open={isSharing} onClose={() => setIsSharing(false)}>
				<div>
					<Share
						shareURL={getShareURL(
							auth?.data?.type || 'landlord',
							auth?.data?._id || 123
						)}
					/>
				</div>
			</Modal>

			<Modal
				open={isRespondingModalOpen}
				onClose={() => setIsRespondingModalOpen(false)}
			>
				<StyledModal>
					<RespondToReview
						review={selectedReview}
						onSubmit={handleRespondToReviewSubmit}
					/>
				</StyledModal>
			</Modal>
		</div>
	);
}

function getShareURL(userType: UserType, userId) {
	let url = window.location.host + '/profiles/';
	url += userType;
	url += `/${userId}`;

	return url;
}
