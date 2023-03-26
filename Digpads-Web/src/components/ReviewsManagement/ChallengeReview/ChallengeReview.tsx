import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import SuiInput from 'components/SuiInput';
import { Attachment } from 'types';

import ChallengeReason from './ChallengeReason';
import AttachEvidence from './AttachEvidence';
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import { challengeReview } from 'controllers/reviews';

import { StyledModal, ModalTitle } from '../../styled/ReviewsManagement';

const ChallengeReasons = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1em;
	justify-items: center;
	margin-bottom: 30px;
`;

export default function ChallengeReview({ reviewId, onClose }) {
	const [selectedReason, setSelectedReason] = useState(null);
	const [challengeContent, setChallengeContent] = useState('');
	const [attachedEvidence, setAttachedEvidence] = useState<Attachment[]>([]);
	const [acceptTerms, setAcceptTerms] = useState({
		supresssionPolicy: false,
		truthfulPolicy: false,
	});
	const handleChallengeReasonClick = (reason) => setSelectedReason(reason);

	const handleChallengeContentChange = (evt) => {
		setChallengeContent(evt.target.value);
	};

	const handleAttachEvidenceChange = (evidence) => {
		setAttachedEvidence(evidence);
	};

	const handleAcceptTermsChange = (evt) => {
		const updatedTerms = { ...acceptTerms };
		updatedTerms[evt.currentTarget.name] = evt.currentTarget.checked;
		setAcceptTerms(updatedTerms);
	};

	const handleSubmitClick = async () => {
		if (selectedReason === null) {
			return alert('please select a reason');
		}

		if (!acceptTerms.supresssionPolicy || !acceptTerms.truthfulPolicy) {
			return alert('please accept the terms & conditions');
		}

		const data = {
			reason: selectedReason.name,
			content: challengeContent,
			attachments: attachedEvidence,
		};

		try {
			await challengeReview(reviewId, data);
			onClose();
			alert('successfully submitted');
		} catch (error) {
			alert('Eror. Please try again later');
		}
		// TODO send to server
	};

	return (
		<StyledModal style={{ width: '550px' }}>
			<SuiBox borderRadius='md' shadow='lg' p={2}>
				<ModalTitle variant='h2'>Challenge Review</ModalTitle>

				<Typography style={{ fontSize: '12px', marginBottom: '22px' }}>
					For what reason are you challenging this review?
				</Typography>

				<ChallengeReasons>
					{challengeReasons.map((reason, i) => (
						<ChallengeReason
							key={i}
							name={reason.name}
							description={reason.description}
							bgColor={reason.bgColor}
							onClick={() => handleChallengeReasonClick(reason)}
							isSelected={selectedReason === reason}
						/>
					))}
				</ChallengeReasons>

				<SuiInput
					value={challengeContent}
					onChange={handleChallengeContentChange}
					sx={{ fontSize: '12px', mb: '1em' }}
					placeholder='Type your side of the story here. Please include any links here that may prove your case. You can provide up to five document attachments below as well.'
					multiline
					rows={10}
				/>

				<Box mb={2} display='flex' justifyContent='center'>
					<AttachEvidence onChange={handleAttachEvidenceChange} />
				</Box>

				<div className='accept-terms' style={{ marginBottom: '30px' }}>
					<FormControlLabel
						sx={{ mb: '20px', display: 'flex' }}
						control={
							<Checkbox
								onChange={handleAcceptTermsChange}
								name='supresssionPolicy'
								style={{
									alignSelf: 'flex-start',
								}}
							/>
						}
						label={
							<Typography style={{ fontSize: '12px' }}>
								I understand that challenging a review for suppression purposes
								is against{' '}
								<a href='#0' style={{ fontWeight: '500' }}>
									digpads ‘ Review Collection Rules &amp; Policies
								</a>{' '}
								and that if I or my company am found to be materially or
								repeatedly challening reviews for suppression purposes that I
								may lose the ability to challenge reviews and/or access to the
								entire digpads platform.
							</Typography>
						}
					/>

					<FormControlLabel
						sx={{ display: 'flex' }}
						control={
							<Checkbox
								onChange={handleAcceptTermsChange}
								name='truthfulPolicy'
								style={{
									alignSelf: 'flex-start',
								}}
							/>
						}
						label={
							<Typography style={{ fontSize: '12px' }}>
								I attest that all statements I made herein are truthful to the
								best of my knowledge.
							</Typography>
						}
					/>
				</div>

				<SuiButton
					variant='contained'
					color='primary'
					shadow='lg'
					sx={{ display: 'block', margin: '0 auto' }}
					onClick={handleSubmitClick}
					fontSize='12px'
				>
					Submit
				</SuiButton>
			</SuiBox>
		</StyledModal>
	);
}

const challengeReasons = [
	{
		name: 'Qualification',
		description: [
			'Reviewer did not actually do business with or interact with the reviewed company, landlord, or person.',
			'Fake reviews come under this qualification.',
		],
		bgColor: '#378E7f',
	},
	{
		name: 'Factual',
		description: [
			'The person reviewed is able to prove definitively that what the reviewer is saying is not true',
			'There is a high bar of evidence required for this challenge type to be approved.',
		],
		bgColor: '#7CD25E',
	},
	{
		name: 'Rules & Policies Violation',
		description: [
			`Reviewer did not actually do business with or interact with the reviewed company, landlord, or person.`,
			`The review has violated the digpads’ <a href='#0'>Review Collection Rules and Policies</a>.`,
		],
		bgColor: '#A5C253',
	},
	{
		name: 'Personal Attack',
		description: [
			'The review is primarily a personal attack on the reviewed.',
			`The review is not reviewing the reviewed’s products quality, service or actions, but instead attacking their personal character.`,
		],
		bgColor: '#39B9E1',
	},
];
