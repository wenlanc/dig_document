import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { Attachment } from 'types';
import { addReviewChallengeInfo } from 'controllers/reviews';
import AttachEvidence from 'components/ReviewsManagement/ChallengeReview/AttachEvidence';

export default function AddReviewChallengeInfo() {
	const navigate = useNavigate();
	const { id: reviewChallengeId } = useParams();

	const handleAttachEvidenceChange = (evidence) => {
		addReviewChallengeInfo(reviewChallengeId, evidence).then(() => {
			alert('successfully submitted');
			navigate('/');
		});
	};

	return (
		<Stack direction='row' justifyContent='center' mt={4}>
			<AttachEvidence onChange={handleAttachEvidenceChange} />;
		</Stack>
	);
}
