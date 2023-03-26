import React, { useState } from 'react';
import { Modal, Stack, Button } from '@mui/material';
import { ModalBase } from 'components/styled/Modal';
import Attachments from './Attachments';
import ChallengedReviewsTable from './ChallengedReviewsTable';
import ChallengedReviewActions from './ChallengedReviewActions';
import {
	acceptReviewChallenge,
	rejectReviewChallenge,
	editReviewChallenge,
	requestMoreInformation,
} from 'controllers/reviews';
import { IReview } from 'types';

export default function ChallengedReviews({ reviews }) {
	const [selectedReview, setSelectedReview] = useState<Partial<IReview>>(null);
	const [statementModalOpen, setStatementModalOpen] = useState(false);
	const [attachmentsModalOpen, setAttachmentsModalOpen] = useState(false);
	const [actionsModalOpen, setActionsModalOpen] = useState(false);

	const handleReviewSelect = (review) => {
		const _review = reviews.find((r) => r._id === review.id);
		setSelectedReview(_review);
	};

	const handleAdminActionSubmit = (action, actionMessage) => {
		let actionFn;

		switch (action) {
			case 'acceptChallenge':
				actionFn = acceptReviewChallenge;
				break;
			case 'rejectChallenge':
				actionFn = rejectReviewChallenge;
				break;
			case 'requestMoreInfo':
				actionFn = requestMoreInformation;
				break;
			default:
				throw new Error(`invalid action: ${action}`);
		}

		actionFn(selectedReview?.challenge?._id, actionMessage)
			.then(() => {
				setActionsModalOpen(false);
				alert('successfully submitted');
			})
			.catch((error) => {
				alert(`Error: ${error}`);
			});
	};

	const handleStatementClick = () => {
		setStatementModalOpen(true);
		editReviewChallenge(selectedReview.challenge._id, {
			status: 'under review',
		});
	};

	return (
		<>
			<ChallengedReviewsTable
				reviews={transformReviews(reviews)}
				onReviewSelect={handleReviewSelect}
			/>

			<Stack
				direction='row'
				spacing={2}
				sx={{ mt: 1 }}
				justifyContent='flex-end'
			>
				<Button
					variant='contained'
					disabled={!selectedReview}
					color='primary'
					onClick={handleStatementClick}
				>
					Statemment
				</Button>
				<Button
					variant='contained'
					disabled={!selectedReview}
					color='primary'
					onClick={() => setAttachmentsModalOpen(true)}
				>
					Attachments
				</Button>
				<Button
					variant='contained'
					disabled={!selectedReview}
					color='primary'
					onClick={() => setActionsModalOpen(true)}
				>
					Actions
				</Button>
			</Stack>

			<Modal
				open={statementModalOpen}
				onClose={() => setStatementModalOpen(false)}
			>
				<ModalBase>{selectedReview?.challenge?.content}</ModalBase>
			</Modal>

			<Modal
				open={attachmentsModalOpen}
				onClose={() => setAttachmentsModalOpen(false)}
			>
				<ModalBase>
					<Attachments attachments={selectedReview?.challenge?.attachments} />
				</ModalBase>
			</Modal>

			<Modal open={actionsModalOpen} onClose={() => setActionsModalOpen(false)}>
				<ModalBase>
					<ChallengedReviewActions
						onSubmit={handleAdminActionSubmit}
						onCancel={() => setActionsModalOpen(false)}
					/>
				</ModalBase>
			</Modal>
		</>
	);
}

function transformReviews(reviews) {
	return reviews?.map((review) => ({
		id: review._id,
		userReviewed: review.user?.name,
		campaignName: review.campaign?.name,
		title: review.title,
		reviewerEmail: review.reviewer?.email,
		createdAt: review.createdAt
			? new Date(review.createdAt).toLocaleDateString()
			: '',
		dateChallenged: review.challenge?.createdAt
			? new Date(review.challenge?.createdAt).toLocaleDateString()
			: '',
		challengeType: review.challenge?.reason,
	}));
}
