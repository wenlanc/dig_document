import React, { useState } from 'react';
import {
	Checkbox,
	FormControlLabel,
	Typography,
	Stack,
	Paper,
	Modal,
	Grid,
	Button,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { authContext } from 'contexts/AuthContext';

import { selectCampaigns } from '../campaignsSlice';
import { createReviewsDisplayForm } from 'controllers/reviews';
import SelectDisplayMethod from './SelectDisplayMethod';
import ReviewFormConfig from '../ReviewForm/ReviewFormConfig';
import ReviewsOptions from './ReviewsOptions';
import ReviewFormEmbed from 'components/ReviewsManagement/ReviewFormEmbed';
import ReviewFormEmbedLargePreview from 'components/ReviewsManagement/UseReviews/ReviewFormEmbedLargePreview';
import SuiInput from 'components/SuiInput';
import SelectCampaign from 'components/ReviewsManagement/UseReviews/SelectCampaign';
import FilterableReviewsTable from 'components/ReviewsManagement/UseReviews/FilterableReviewsTable';
import { useReviews } from 'hooks';
import { ReviewOption } from 'types';

import { StyledModal } from 'components/styled/ReviewsManagement';

export default function UseReviews() {
	const { auth } = React.useContext(authContext);
	const dispatch = useAppDispatch();

	const { reviews, getOverallStarRating, setReviewsOption } = useReviews();
	const selectedReviews = reviews?.filter((r) => r.isSelected);
	const campaigns = useAppSelector(selectCampaigns);

	const [displayMethod, setDisplayMethod] = useState('');
	const [selectedCampaign, setSelectedCampaign] = useState(null);
	const [includeLink, setIncludeLink] = useState(true);
	const [embedInstructions, setEmbedInstructions] = useState({});
	const [selectReviewsModalOpen, setSelectReviewsModalOpen] = useState(false);
	const [embedInstructionsModalOpen, setEmbedInstructionsModalOpen] =
		useState(false);
	const [reviewFormStyles, setReviewFormStyles] = useState({
		bodyColor: '#fff',
		borderColor: '#fff',
		height: 424,
		width: 400,
		location: 'center center',
		shape: 'square',
		logo: '',
	});

	const handleReviewFormConfigChange = (target, value) => {
		setReviewFormStyles({
			...reviewFormStyles,
			[target]: value,
		});
	};

	const handleIncludeLinkChange = () => setIncludeLink(!includeLink);

	const handleSelectDisplayMethod = (method) => setDisplayMethod(method);

	const handleReviewsOptionChange = (option) => {
		if (option === ReviewOption.selectReviews) {
			setSelectReviewsModalOpen(true);
		}

		setReviewsOption(option);
	};

	const handleSelectCampaign = (campaign) => {
		setSelectedCampaign(campaign);
	};

	const handleSubmit = async () => {
		if (selectedCampaign === null) {
			return alert('Please select a campaign');
		}

		const data = {
			campaign: selectedCampaign._id,
			type: displayMethod !== '' ? displayMethod : 'link',
			styles: reviewFormStyles,
			reviews: reviews.filter((r) => r.isSelected),
			showReviewCollectionLink: includeLink,
		};

		const res = await createReviewsDisplayForm(data);

		if (res._id) {
			switch (res.type) {
				case 'link':
					setEmbedInstructions({
						header: 'Awesome! Copy & Share this link:',
						content: `${window.location.host}/reviewsDisplayForm/?user=${res.user}`,
					});
					break;

				case 'pop up':
					setEmbedInstructions({
						header: 'Put the following code at the bottom of your <body> tag',
						content: getEmbedInstructionsScript({
							user: res.user,
							location: res.styles.location,
							width: res.styles.width,
							height: res.styles.height,
							campaign: selectedCampaign._id,
						}),
					});
					break;

				case 'widget':
					setEmbedInstructions({
						header: 'Put the following code at the bottom of your <body> tag',
						content: getEmbedInstructionsScript({
							user: res.user,
							location: res.styles.location,
							width: res.styles.width,
							height: res.styles.height,
							campaign: selectedCampaign._id,
						}),
					});
					break;

				default:
					throw new Error(`invalid display type: ${res.type}`);
			}

			setEmbedInstructionsModalOpen(true);
		}
	};

	return (
		<>
			<Paper sx={{ p: 2 }}>
				<Grid container spacing={2} justifyContent='space-between' mb={2}>
					<Grid
						item
						container
						rowSpacing={1}
						direction='column'
						sx={{ maxWidth: '300px' }}
					>
						<Grid item>
							<SelectDisplayMethod onSelect={handleSelectDisplayMethod} />
						</Grid>

						<Grid item>
							<SelectCampaign onSelect={handleSelectCampaign} />
						</Grid>

						<Grid item>
							<ReviewFormConfig
								formType={displayMethod}
								reviewFormStyles={reviewFormStyles}
								showLocationButton={
									displayMethod === 'modal' || displayMethod === 'pop up'
								}
								showShapeButton={true}
								onChange={handleReviewFormConfigChange}
							/>
						</Grid>
					</Grid>

					<Grid
						item
						className='website-preview-image'
						style={{
							width: '400px',
							maxHeight: '424px',
						}}
					>
						<ReviewFormEmbedLargePreview
							height={reviewFormStyles.height}
							width={reviewFormStyles.width}
						>
							<ReviewFormEmbed
								styles={reviewFormStyles}
								showReviewCollectionLink={includeLink}
								userName={auth.data?.username || 'loading'}
								overallRating={getOverallStarRating()}
								reviews={selectedReviews}
							/>
						</ReviewFormEmbedLargePreview>
					</Grid>

					<Modal
						open={selectReviewsModalOpen}
						onClose={() => setSelectReviewsModalOpen(false)}
					>
						<div>
							<FilterableReviewsTable
								reviews={reviews}
								campaigns={campaigns}
								onClose={() => setSelectReviewsModalOpen(false)}
							/>
						</div>
					</Modal>
				</Grid>

				<Stack
					sx={{
						gridColumnStart: '1',
						gridColumnEnd: '3',
					}}
					spacing={4}
				>
					<ReviewsOptions onOptionChange={handleReviewsOptionChange} />

					<FormControlLabel
						control={<Checkbox checked={includeLink} color='primary' />}
						onChange={handleIncludeLinkChange}
						label='Include review collection link'
					/>
				</Stack>

				<Button
					variant='contained'
					color='primary'
					sx={{
						mt: 2,
						ml: 'auto',
						display: 'block',
						'&:hover': {
							backgroundColor: '#858cc3',
							transition: 'background-color 0.5s',
						},
						width: 200,
					}}
					p='0.33em 2.27em'
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Paper>

			<Modal
				open={embedInstructionsModalOpen}
				onClose={() => setEmbedInstructionsModalOpen(false)}
			>
				<StyledModal>
					<Typography variant='h3'>Embed instructions:</Typography>
					<Typography>{embedInstructions.header}</Typography>
					<SuiInput multiline rows={5} value={embedInstructions.content} />
				</StyledModal>
			</Modal>
		</>
	);
}

function getEmbedInstructionsScript({
	user,
	location,
	width,
	height,
	campaign,
}) {
	return `<script src="http://localhost:3000/embed.js"></script>
        <script>
          const iframeUrl = 'http://localhost:3000/reviewsDisplayForm/?user=${user}&campaign=${campaign}';
          const iframeLocation = '${location}';
          const width = ${width};
          const height = ${height};
          Embed(iframeUrl, iframeLocation, width, height);
        </script>`;
}
