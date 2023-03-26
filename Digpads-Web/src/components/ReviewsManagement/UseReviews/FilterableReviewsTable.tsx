import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
	selectReviews,
	toggledReviewSelected,
} from 'components/ReviewsManagement/reviewsSlice';

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import { selectCampaigns } from 'components/ReviewsManagement/campaignsSlice';

import SearchBar from './SearchBar';
import ReviewsTable from './ReviewsTable';
import CampaignsFilter from 'components/ReviewsManagement/UseReviews/CampaignsFilter';
import StarRatingFilter from 'components/ReviewsManagement/UseReviews/StarRatingFilter';
import DateRangeFilter from 'components/ReviewsManagement/UseReviews/DateRangeFilter';
import { IReview } from 'types';
import {
	StyledLabel,
	StyledButton,
	BorderedContainer,
	StyledModal,
	ModalTitle,
} from 'components/styled/ReviewsManagement';

const sampleRatings = [
	{
		starsLabel: '5',
		stars: 5,
	},
	{
		starsLabel: '4-5',
		stars: 4,
	},
	{
		starsLabel: '3-4',
		stars: 3,
	},
	{
		starsLabel: '2-3',
		stars: 2,
	},
	{
		starsLabel: '1-2',
		stars: 1,
	},
];

const FilterableReviewsTable = ({ campaigns, onClose }) => {
	const dispatch = useAppDispatch();
	const [filterText, setFilterText] = useState('');

	const [selectableRatings, setSelectedRatings] = useState(
		sampleRatings.map((r) => ({ ...r, isSelected: true }))
	);

	const reviews: Array<IReview> = useAppSelector(selectReviews);
	const selectedCampaigns = useAppSelector(selectCampaigns);
	const selectedReviews = reviews.filter((r) => {
		const campaign = selectedCampaigns.find((c) => c._id === r.campaign._id);

		if (campaign.isSelected) {
			return true;
		} else {
			return false;
		}
	});

	const [starRatingFilter, setStarRatingFilter] = useState([1, 2, 3, 4, 5]);
	const [dateRangeFilter, setDateRangeFilter] = useState({
		exactDate: null,
		startDate: new Date(2022, 1),
		endDate: new Date(),
	});
	const [dateRangeModalOpen, setDateRangeModalOpen] = useState(false);

	const handleFilterTextChange = (filterText) => {
		setFilterText(filterText);
	};

	const handleStarRatingFilterChange = (isSelected, rating) => {
		if (isSelected) {
			// add rating filter
			rating.isSelected = true;
			setStarRatingFilter([...starRatingFilter, rating.stars]);
		} else {
			// remove rating filter
			rating.isSelected = false;
			const updatedStarRatings = [...starRatingFilter];
			updatedStarRatings.splice(
				updatedStarRatings.findIndex((r) => r === rating.stars),
				1
			);

			const secondRating = updatedStarRatings.findIndex(
				(r) => r === rating.stars
			);

			if (secondRating !== -1) {
				updatedStarRatings.splice(secondRating, 1);
			}

			setStarRatingFilter(updatedStarRatings);
		}
	};

	const handleDateRangeFilterChange = (
		type: 'exact' | 'start' | 'end',
		value
	) => {
		switch (type) {
			case 'exact':
				setDateRangeFilter({
					exactDate: value,
					startDate: null,
					endDate: null,
				});
				break;
			case 'start':
				setDateRangeFilter({
					...dateRangeFilter,
					startDate: value,
					exactDate: null,
				});
				break;
			case 'end':
				setDateRangeFilter({
					...dateRangeFilter,
					endDate: value,
					exactDate: null,
				});
				break;
			default:
				throw `Incorrect date type: ${type}`;
		}
	};

	return (
		<StyledModal>
			<ModalTitle>Select Reviews</ModalTitle>

			<SearchBar
				filterText={filterText}
				onFilterTextChange={handleFilterTextChange}
			/>

			<div>
				<StyledLabel>Filters</StyledLabel>

				<Stack direction='row' justifyContent='space-between' mb={2}>
					<CampaignsFilter campaigns={campaigns} />
					<StarRatingFilter
						ratings={selectableRatings}
						onChange={handleStarRatingFilterChange}
					/>

					<div>
						<SuiButton
							onClick={() => setDateRangeModalOpen(true)}
							color='success'
						>
							Date Range
						</SuiButton>

						<Modal
							open={dateRangeModalOpen}
							onClose={() => setDateRangeModalOpen(false)}
						>
							<div>
								<DateRangeFilter
									exactDate={dateRangeFilter.exactDate}
									startDate={dateRangeFilter.startDate}
									endDate={dateRangeFilter.endDate}
									onChange={handleDateRangeFilterChange}
									onClose={() => setDateRangeModalOpen(false)}
								/>
							</div>
						</Modal>
					</div>
				</Stack>
			</div>

			<SuiBox
				sx={{
					mb: 2,
					p: '1em 0',
					maxHeight: '500px',
					overflowY: 'scroll',
				}}
				shadow='lg'
			>
				<ReviewsTable
					reviews={selectedReviews}
					filterText={filterText}
					starRatingFilter={starRatingFilter}
					dateRangeFilter={dateRangeFilter}
					onSelectReview={(review) =>
						dispatch(toggledReviewSelected(review._id))
					}
				/>
			</SuiBox>

			<SuiButton
				sx={{
					ml: 'auto',
					display: 'block',
				}}
				color='primary'
				p='5px 40px'
				fontSize='12px'
				onClick={onClose}
			>
				Submit
			</SuiButton>
		</StyledModal>
	);
};

export default FilterableReviewsTable;
