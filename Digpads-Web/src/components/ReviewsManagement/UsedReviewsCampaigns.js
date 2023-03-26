import React, { useState } from 'react';
import { Stack, Button, Modal } from '@mui/material';

import DataTable from 'examples/Tables/DataTable';
import CampaignReviews from './CampaignReviews';
import EditCampaign from './EditCampaign';

import { SectionTitle, StyledModal } from 'components/styled/ReviewsManagement';

export default function UsedReviewsCampaigns({
	campaigns = [],
	onEditCampaignChange,
}) {
	const [selectedCampaign, setSelectedCampaign] = useState(null);
	const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
	const [isEditingCampaign, setIsEditingCampaign] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(null);

	const handleTableRowClick = (row, index) => {
		const campaign = campaigns.find((c) => c.name === row.campaign);
		setSelectedCampaign(campaign);
		setSelectedIndex(index);
	};

	const handleEditButtonClick = () => {
		setIsEditingCampaign(true);
	};

	const handleSeeReviewsButtonClick = () => {
		setReviewsModalOpen(true);
	};

	const handleEditCampaignChange = (campaign) => {
		onEditCampaignChange(campaign);
		setIsEditingCampaign(false);
	};

	const rows = campaigns.map((campaign) => ({
		campaign: campaign.name,
		dateLaunched: new Date(campaign.dateLaunched).toLocaleDateString(),
		timesOpened: campaign.reviewFormViews,
		averageStarRating: getAverageRating(campaign.reviews),
		bestStarRating: getBestRating(campaign.reviews),
		worstStarRating: getWorstRating(campaign.reviews),
		rejectedReviews:
			campaign.reviews.length > 0
				? campaign.reviews.filter((r) => r.rejected).length
				: 'none',
	}));

	return (
		<>
			<SectionTitle>
				Review Collection &amp; Used Reviews Campaigns
			</SectionTitle>

			<DataTable
				onTableRowClick={handleTableRowClick}
				selectedRowIndex={selectedIndex}
				table={{
					columns: [
						{
							Header: 'Campaign',
							accessor: 'campaign',
							width: '20%',
						},
						{
							Header: 'Date Launched',
							accessor: 'dateLaunched',
							width: '20%',
						},
						{
							Header: 'Times Opened',
							accessor: 'timesOpened',
							width: '7%',
						},
						{
							Header: 'Avg Star Rating',
							accessor: 'averageStarRating',
							width: '7%',
						},
						{
							Header: 'Best Star Rating',
							accessor: 'bestStarRating',
							width: '7%',
						},
						{
							Header: 'Worst Star Rating',
							accessor: 'worstStarRating',
							width: '7%',
						},
						{
							Header: 'Rejected reviews',
							accessor: 'rejectedReviews',
							width: '7%',
						},
					],
					rows: rows,
				}}
			/>

			<Stack spacing={2} direction='row' justifyContent='flex-end' mt={2}>
				<Button
					disabled={
						selectedCampaign === null ||
						selectedCampaign.reviews.length === 0
					}
					size='small'
					variant='outlined'
					style={{
						color: '#3240B9',
						textTransform: 'capitalize',
						fontWeight: 'bold',
						borderRadius: '0',
						display: 'block',
						marginRight: '1em',
					}}
					onClick={handleSeeReviewsButtonClick}
				>
					See reviews
				</Button>

				<Button
					disabled={selectedCampaign === null}
					size='small'
					variant='outlined'
					style={{
						color: '#3240B9',
						textTransform: 'capitalize',
						fontWeight: 'bold',
						borderRadius: '0',
						display: 'block',
						marginRight: '1em',
					}}
					onClick={handleEditButtonClick}
				>
					Edit
				</Button>
			</Stack>

			<Modal
				open={reviewsModalOpen}
				onClose={() => setReviewsModalOpen(false)}
				aria-labelledby='campaign reviews'
				aria-describedby='Reviews from selected campaign'
			>
				<StyledModal>
					<CampaignReviews campaign={selectedCampaign} />
				</StyledModal>
			</Modal>

			<Modal
				open={isEditingCampaign}
				onClose={() => setIsEditingCampaign(false)}
			>
				<StyledModal>
					<EditCampaign
						campaign={selectedCampaign}
						onChange={handleEditCampaignChange}
						onCancel={() => setIsEditingCampaign(false)}
					/>
				</StyledModal>
			</Modal>
		</>
	);
}

function getAverageRating(reviews) {
	if (reviews.length === 0) {
		return 'none';
	}

	if (reviews.length === 0) return '';

	let sum = 0;

	reviews.forEach((review) => {
		sum += review.ratings.overall;
	});

	const avg = sum / reviews.length;

	return toFixed(avg, 1);
}

function getBestRating(reviews) {
	return reviews.length > 0
		? Math.max(...reviews.map((r) => r.ratings.overall))
		: 'none';
}

function getWorstRating(reviews) {
	return reviews.length > 0
		? Math.min(...reviews.map((r) => r.ratings.overall))
		: 'none';
}

function toFixed(num, fixed) {
	var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
	return num.toString().match(re)[0];
}
