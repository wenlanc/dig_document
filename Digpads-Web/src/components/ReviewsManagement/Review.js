import React from 'react';
import { Box, Typography, TextareaAutosize, Modal, Stack } from '@mui/material';

import {
	ModalTitle,
	BorderedContainer,
	StyledButton,
	StyledModal,
} from '../styled/ReviewsManagement';

import RespondToReview from './RespondToReview';
import ChallengeReview from './ChallengeReview/ChallengeReview';

import StarRating from './StarRating';
import ReviewDetails from './ReviewDetails';
import PropTypes from 'prop-types';

export default function Review({ review, onClose }) {
	const [respondingModalOpen, setRespondingModalOpen] = React.useState(false);
	const [challengeModalOpen, setChallengeModalOpen] = React.useState(false);

	const reviewDetails = {
		reviewerInteractionDate: new Date(review.updatedAt).toLocaleDateString(),
		reviewerName: review.reviewer.first + ' ' + review.reviewer.last,
		reviewerDesiresResolution: 'No',
		reviewerContactPreferences: 'Email',
	};

	return (
		<StyledModal>
			<BorderedContainer
				variant='solid'
				style={{ paddingLeft: '20px', paddingRight: '20px' }}
			>
				<Stack spacing={2} mb={3}>
					<ModalTitle align='center'>Review</ModalTitle>
					<StarRating rating={4.5} />
					<ReviewDetails details={reviewDetails} />
					<div className='reviewers-review' style={{ marginBottom: '20px' }}>
						<Typography
							variant='h3'
							style={{
								fontSize: '14px',
								fontWeight: '800',
								marginBottom: '10px',
							}}
						>
							Reviewer's Written Review
						</Typography>

						<TextareaAutosize
							disabled
							placeholder='Write Your Review Here'
							value={review.content}
							minRows={14}
							style={{ width: '100%' }}
						/>
					</div>
				</Stack>

				<Box display='flex' justifyContent='space-around'>
					<StyledButton
						color='blue'
						p='4px 40px'
						fontSize='12px'
						onClick={() => setRespondingModalOpen(true)}
					>
						Respond
					</StyledButton>

					<StyledButton
						color='blue'
						p='4px 40px'
						fontSize='12px'
						onClick={() => setChallengeModalOpen(true)}
					>
						Challenge
					</StyledButton>

					<StyledButton
						color='blue'
						p='4px 40px'
						fontSize='12px'
						onClick={() => onClose()}
					>
						Close
					</StyledButton>
				</Box>
			</BorderedContainer>

			<Modal
				open={respondingModalOpen}
				onClose={() => setRespondingModalOpen(false)}
			>
				<StyledModal>
					<RespondToReview review={review} />
				</StyledModal>
			</Modal>

			<Modal
				open={challengeModalOpen}
				onClose={() => setChallengeModalOpen(false)}
			>
				<div>
					<ChallengeReview review={review} />
				</div>
			</Modal>
		</StyledModal>
	);
}

Review.propTypes = {
	content: PropTypes.string,
	details: PropTypes.object,
	onClose: PropTypes.func,
};
