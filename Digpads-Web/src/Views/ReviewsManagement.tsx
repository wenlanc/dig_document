import React from 'react';
import { Paper, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import { useAuth } from '../contexts/AuthContext';
import { useReviews } from 'hooks';
import { getCSRF } from 'controllers/axios';
import { updateCampaign } from 'controllers/campaigns';
import {
	fetchCampaigns,
	selectCampaigns,
	campaignAdded,
	campaignUpdated,
} from 'components/ReviewsManagement/campaignsSlice';
import SuiBox from 'components/SuiBox';
import { CollectReviews } from 'components/ReviewsManagement';
import UseReviews from 'components/ReviewsManagement/UseReviews/UseReviews';
import CollectedReviews from 'components/ReviewsManagement/CollectedReviews';
import ChallengedReviews from 'components/ReviewsManagement/ChallengedReviews';
import UsedReviewsCampaigns from 'components/ReviewsManagement/UsedReviewsCampaigns';

import {
	PageContainer,
	SectionTitle,
	PageTitle,
} from 'components/styled/ReviewsManagement';

export default function ReviewsManagement() {
	const dispatch = useDispatch();
	const { auth } = useAuth();

	const campaigns = useSelector(selectCampaigns);
	const { reviews, fetchReviews } = useReviews();

	const handleEditCampaignChange = async (campaign) => {
		const updatedCampaign = await updateCampaign(campaign);
		dispatch(campaignUpdated(updatedCampaign));
	};

	React.useEffect(() => {
		getCSRF();
		fetchReviews();
		dispatch(fetchCampaigns());
	}, [dispatch]);

	return (
		<PageContainer>
			<PageTitle variant='h1'>Reviews Management</PageTitle>

			<Stack spacing={8}>
				<section id='collect-reviews'>
					<SectionTitle>Collect Reviews</SectionTitle>

					<SuiBox borderRadius='md' shadow='lg' p={2}>
						<ErrorBoundary FallbackComponent={ErrorFallback}>
							<CollectReviews
								onCampaignCreated={(campaign) =>
									dispatch(campaignAdded(campaign))
								}
							/>
						</ErrorBoundary>
					</SuiBox>
				</section>

				<section id='user-reviews-campaigns'>
					<UsedReviewsCampaigns
						campaigns={campaigns}
						onEditCampaignChange={handleEditCampaignChange}
					/>
				</section>

				{auth.data?.type !== 'tenant' && (
					<section id='use-reviews'>
						<SectionTitle>Use Reviews</SectionTitle>

						<UseReviews campaigns={campaigns} />
					</section>
				)}

				<section id='manage-reviews'>
					<SectionTitle>Manage Reviews</SectionTitle>

					<Stack spacing={2}>
						<Paper sx={{ p: 2 }}>
							<CollectedReviews reviews={reviews} />
						</Paper>

						<Paper sx={{ p: 2 }}>
							<ChallengedReviews reviews={reviews} />
						</Paper>
					</Stack>
				</section>
			</Stack>
		</PageContainer>
	);
}

function ErrorFallback({ error, resetErrorBoundary }) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<p>Please referesh the page and try again</p>
		</div>
	);
}
