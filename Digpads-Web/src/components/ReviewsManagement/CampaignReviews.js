import React, { useState } from 'react';
import {
	SectionTitle,
	BorderedContainer,
	StyledButton,
} from '../styled/ReviewsManagement';

import SuiButton from 'components/SuiButton';

import Review from './Review';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

export default function CampaignReviews({ campaign }) {
	const [readReviewModalOpen, setReadReviewModalOpen] = useState(false);
	const [selectedReview, setSelectedReview] = useState({});

	const handleReadReviewClick = (review) => {
		setSelectedReview(review);
		setReadReviewModalOpen(true);
	};

	return (
		<>
			<SectionTitle>Reviews from {campaign?.name} Campaign</SectionTitle>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 500 }} aria-label='reviews table'>
					<TableHead
						sx={{
							display: 'table-header-group',
							'& .MuiTableCell-root': {
								fontWeight: '600',
								fontSize: '14px',
								color: 'rgb(52, 71, 103)',
							},
						}}
					>
						<TableRow>
							<TableCell>Reviewer Name</TableCell>
							<TableCell align='center'>Date Left</TableCell>
							<TableCell align='center'>Star Rating</TableCell>
							<TableCell align='center'>Read Review</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{campaign?.reviews?.map((review, i) => (
							<TableRow
								key={review._id}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}
							>
								<TableCell align='center'>
									{`${review.reviewer.first} ${review.reviewer.last}`}
								</TableCell>

								<TableCell align='center'>
									{new Date(review.createdAt).toLocaleDateString()}
								</TableCell>

								<TableCell align='center'>{review.ratings.overall}</TableCell>

								<TableCell align='center'>
									<SuiButton
										color='primary'
										variant='contained'
										onClick={() => handleReadReviewClick(review)}
									>
										Read
									</SuiButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal
				open={readReviewModalOpen}
				onClose={() => setReadReviewModalOpen(false)}
			>
				<div>
					<Review
						review={selectedReview}
						onClose={() => setReadReviewModalOpen(false)}
					/>
				</div>
			</Modal>
		</>
	);
}
