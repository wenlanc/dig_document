import React, { useState } from 'react';
import { Stack, Modal } from '@mui/material';

import ReviewsByUser from './ReviewsByUser';
import ChallengesByUser from './ChallengesByUser';
import SuiTypography from 'components/SuiTypography';
import TimeTable from 'components/AdminPanel/TimeTable';
import DashboardLayout from 'components/DashboardLayout';
import SeeReviewsUsedByUserSection from './SeeReviewsUsedByUserSection';
import { SectionSubtitle } from 'components/styled/Admin';
import { ModalBase } from 'components/styled/Modal';
import SearchUsers from '../users/SearchUsers';
import ReviewModerationTable from './ReviewModerationTable';
import ChallengedReviews from './ChallengedReviews';
import RejectedReviews from './RejectedReviews';
import Footer from 'components/Footer';

import useSearchUsers from 'hooks/useSearchUsers';
import {
	getReviews,
	editReview,
	removeReview,
	getReviewsStats,
	fetchChallengedReviews,
} from 'controllers/reviews';

export default function reviews() {
	const [users, selectedUser, setSelectedUser, inputValue, handleInputChange] =
		useSearchUsers();
	const [reviewsStats, setReviewsStats] = React.useState([]);
	const [userReviews, setUserReviews] = useState([]);
	const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
	const [challengedReviews, setChallengedReviews] = useState([]);

	const handleSelectUser = (user) => {
		setSelectedUser(user);
		setReviewsModalOpen(true);
		getReviews(user._id).then((reviews) => setUserReviews(reviews));
	};

	const handleDeleteReview = (id) => {
		removeReview(id).then((response) => {
			if (response.ok) {
				let updatedReviews = userReviews.map((review) => ({
					...review,
					reviewer: { ...review.reviewer },
					campaign: { ...review.campaign },
				}));

				updatedReviews = updatedReviews.filter((_review) => _review._id !== id);

				setUserReviews(updatedReviews);

				alert('review has been deleted');
			}
		});
	};

	const handleEditReview = async (id, review) => {
		// find user review and update it with response data
		const updatedReview = await editReview(id, review);

		let updatedReviews = userReviews.map((review) => ({
			...review,
			reviewer: { ...review.reviewer },
			campaign: { ...review.campaign },
		}));

		const index = updatedReviews.findIndex((review) => review._id === id);
		updatedReviews[index] = updatedReview;

		setUserReviews(updatedReviews);
	};

	React.useEffect(() => {
		getReviewsStats()
			.then((stats) => setReviewsStats(stats))
			.catch((error) => alert(error));

		fetchChallengedReviews()
			.then((reviews) => setChallengedReviews(reviews))
			.catch((error) => alert(error));
	}, []);

	return (
		<DashboardLayout>
			<SuiTypography variant='h2'>Reviews</SuiTypography>
			<section>
				<SectionSubtitle>Reviews Summary</SectionSubtitle>

				<TimeTable rows={reviewsStats} />
			</section>
			<section>
				<Stack direction='row' spacing={4}>
					<div>
						<SectionSubtitle>Reviews by User</SectionSubtitle>
						<SearchUsers
							selectedUser={selectedUser}
							onSelectUser={handleSelectUser}
							inputValue={inputValue}
							onInputChange={handleInputChange}
							users={users}
						/>
					</div>

					<div>
						<SectionSubtitle>See Reviews Used By User</SectionSubtitle>
						<SeeReviewsUsedByUserSection />
					</div>
				</Stack>
			</section>
			<section>
				<SectionSubtitle>Review Moderation</SectionSubtitle>
				<ReviewModerationTable reviews={challengedReviews} />
			</section>
			<section id='challenges-by-user'>
				<SectionSubtitle>Challanges By User</SectionSubtitle>
				<ChallengesByUser />
			</section>
			<section id='challenged-reviews'>
				<SectionSubtitle>Challenged Reviews</SectionSubtitle>
				<ChallengedReviews reviews={challengedReviews} />
			</section>
			<section id='rejected-reviews'>
				<SectionSubtitle>Rejected Reviews</SectionSubtitle>
				<RejectedReviews />
			</section>
			<Footer renderSubscribe={false} />;
			<Modal open={reviewsModalOpen} onClose={() => setReviewsModalOpen(false)}>
				<ModalBase>
					<ReviewsByUser
						reviews={userReviews}
						userName={selectedUser.name}
						onEditReview={handleEditReview}
						onDeleteReview={handleDeleteReview}
						onClose={() => setReviewsModalOpen(false)}
					/>
				</ModalBase>
			</Modal>
		</DashboardLayout>
	);
}
