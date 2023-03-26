import React, { useState } from 'react';
import { format } from 'date-fns';
import {
	Modal,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import DataTableBodyCell from 'components/DataTable/DataTableBodyCell';
import SuiButton from 'components/SuiButton';
import { ModalWindowBase } from 'components/styled/Modal';

import { StyledTable } from 'components/styled/ReviewsManagement';

export default function ChallengedReviewsTable({ reviews, filterText }) {
	const filteredReviews = reviews.filter(
		(review) =>
			review.campaign?.name?.includes(filterText) ||
			review.content?.includes(filterText)
	);

	const [adminMessage, setAdminMessage] = useState('');
	const [adminMessageModalOpen, setAdminMessageModalOpen] = useState(false);

	return (
		<>
			<StyledTable
				style={{ minWidth: 500 }}
				aria-label='reviews table'
				sx={{ display: 'block', maxHeight: '500px', overflowY: 'auto' }}
			>
				<TableHead sx={{ display: 'table-header-group' }}>
					<TableRow>
						<TableCell>Reviewer Name</TableCell>
						<TableCell>Date Left</TableCell>
						<TableCell>Star Rating</TableCell>
						<TableCell>Read Review</TableCell>
						<TableCell>Campaign</TableCell>
						<TableCell>Date Challenged</TableCell>
						<TableCell>Challenge Reason</TableCell>
						<TableCell>Challenge Status</TableCell>
						<TableCell>Challenge Outcome</TableCell>
						<TableCell>Admin message</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{filteredReviews.map((review, i) => (
						<TableRow key={i}>
							<DataTableBodyCell align='center'>
								{review.reviewer?.first + review.reviewer?.last}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{format(new Date(review?.createdAt || new Date()), 'MMM-dd')}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{review.ratings.overall}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{review.content}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{review.campaign.name}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{new Date(
									review.challenge?.createdAt || new Date()
								).toLocaleDateString()}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{review.challenge?.reason || 'no reason'}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{review.challenge?.status || 'unknown'}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								{getChallengeOutcome(review.challenge)}
							</DataTableBodyCell>

							<DataTableBodyCell align='center'>
								<SuiButton
									disabled={!review.challenge?.adminMessage}
									variant='contained'
									color='primary'
									onClick={() => {
										setAdminMessageModalOpen(true);
										setAdminMessage(review.challenge?.adminMessage);
									}}
								>
									Admin Message
								</SuiButton>
							</DataTableBodyCell>
						</TableRow>
					))}
				</TableBody>
			</StyledTable>

			<Modal
				open={adminMessageModalOpen}
				onClose={() => setAdminMessageModalOpen(false)}
			>
				<ModalWindowBase>
					<p>
						<span style={{ fontWeight: '600' }}>Admin message:</span>{' '}
						{adminMessage}
					</p>
				</ModalWindowBase>
			</Modal>
		</>
	);
}

function getChallengeOutcome(challenge) {
	if (challenge?.accepted) {
		return 'accepted';
	} else if (typeof challenge?.accepted === 'undefined') {
		return '';
	} else if (!challenge?.accepted) {
		return 'rejected';
	}
}
