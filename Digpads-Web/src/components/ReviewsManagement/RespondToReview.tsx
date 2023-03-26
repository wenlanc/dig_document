import React from 'react';
import { Stack } from '@mui/material';

import { ModalTitle, StyledLabel } from '../styled/ReviewsManagement';

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';
import StarRating from './StarRating';
import ReviewDetails from './ReviewDetails';

export default function RespondToReview({ review, onSubmit }) {
	const reviewDetails = {
		reviewerInteractionDate: new Date(
			review.updatedAt ? review.updatedAt : review.createdAt
		).toLocaleDateString(),
		reviewerName: review.reviewer.first + ' ' + review.reviewer.last,
		reviewerDesiresResolution: 'No',
		reviewerContactPreferences: 'Email',
	};

	const [reviewContent, setReviewContent] = React.useState('');

	const handleSubmit = () => {
		onSubmit(review._id, reviewContent);
	};

	const handleContentChange = (evt) => setReviewContent(evt.target.value);

	return (
		<SuiBox shadow='lg'>
			<Stack spacing={3} p='7px 20px 20px 20px'>
				<ModalTitle align='center'>Respond to Review</ModalTitle>

				<StarRating rating={review.ratings.overall} />

				<ReviewDetails details={reviewDetails} />

				<div>
					<StyledLabel>Reviewer's Written Review</StyledLabel>
					<SuiInput
						multiline
						disabled
						defaultValue={review.content}
						rows={14}
					/>
				</div>

				<div>
					<StyledLabel>Reviewed's Written Review</StyledLabel>
					<SuiInput
						multiline
						onChange={handleContentChange}
						placeholder='Your response'
						rows={14}
					/>
				</div>

				<SuiButton
					sx={{ display: 'block', m: 'auto', alignSelf: 'center' }}
					color='primary'
					onClick={handleSubmit}
				>
					Submit
				</SuiButton>
			</Stack>
		</SuiBox>
	);
}
