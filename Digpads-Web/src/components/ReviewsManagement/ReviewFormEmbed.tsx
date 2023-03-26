import React from 'react';
import styled from 'styled-components';
import { Stack, Typography, Box, ButtonBase } from '@mui/material';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

import { BorderedContainer } from 'components/styled/ReviewsManagement';
import { IReview } from 'types';

const EmbedContainer = styled.div`
	border-radius: ${(props) => (props.shape === 'Oval' ? '50%' : '0')};
	border: ${(props) => (props.shape === 'Oval' ? '1px solid black' : 'none')};
	height: ${(props) => (props.shape === 'Oval' ? '250px' : 'auto')};
	position: relative;
`;

const BorderWrapper = styled.div`
	background-color: ${(props) => props.borderColor};
	padding: 0.5em;
`;

const BodyWrapper = styled.div`
	background-color: ${(props) => props.bodyColor};
`;

type ReviewFormEmbedProps = {
	styles: {
		height: number;
		width: number;
		borderColor: string;
		bodyColor: string;
		logo: string | null;
		shape: string;
		location: string;
	};
	showReviewCollectionLink: boolean;
	userName: string;
	overallRating: number;
	reviews: Array<IReview>;
	campaign: string;
	largePreviewOpen?: boolean;
};

export default function ReviewFormEmbed({
	styles,
	showReviewCollectionLink,
	userName,
	overallRating,
	reviews,
	campaign,
	largePreviewOpen,
}: ReviewFormEmbedProps | null) {
	const position = largePreviewOpen ? positionStyles[styles.location] : {};
	let embedContainerStyles;
	embedContainerStyles = largePreviewOpen ? { height: '90%' } : {};

	if (styles?.shape === 'Oval') {
		embedContainerStyles.overflow = 'scroll';
	}

	return (
		<EmbedContainer shape={styles?.shape} style={embedContainerStyles}>
			<Box
				sx={{
					border:
						styles?.shape === 'Oval'
							? 'none'
							: '0.0625rem solid rgb(222, 226, 230)',
					left: styles?.shape === 'Oval' ? '60px' : '0',
					top: styles?.shape === 'Oval' ? '25px' : '0',
					transform:
						styles?.shape === 'Oval'
							? 'scale(0.7) translateY(-70)'
							: 'scale(1)',
					overflowY: 'auto',
					width: styles?.shape === 'Oval' ? 'auto' : '100%',
					height: styles?.shape === 'Oval' ? 'auto' : styles?.height + 'px',
					position: 'absolute',
					boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
					borderRadius: '5px',
					...position,
				}}
			>
				<BorderWrapper borderColor={styles?.borderColor}>
					<BodyWrapper bodyColor={styles?.bodyColor}>
						<Stack spacing={1} direction='row' mb={2}>
							{showReviewCollectionLink && (
								<ButtonBase
									sx={{
										fontWeight: 'bold',
										fontSize: '1rem',
										backgroundColor: '#18BFF3',
										color: '#fff',
										p: '0.5em 2em',
										alignSelf: 'flex-start',
									}}
									onClick={() => {
										// is this form opened on digpads.com?
										if (window.location.href.includes('reviewsDisplayForm')) {
											window.location.replace(
												`http://localhost:3000/collect-review/${campaign}`
											);
										}

										window.parent.postMessage(
											`http://localhost:3000/collect-review/${campaign}`,
											'*'
										);
									}}
								>
									Write a<br></br> Review
								</ButtonBase>
							)}

							{styles?.logo === '' ? (
								<img
									src='/logo-small.png'
									style={{
										width: '107px',
										height: '34px',
										alignSelf: 'center',
										marginLeft: 'auto',
										marginRight: '1em',
									}}
								/>
							) : (
								<img
									src={styles?.logo}
									style={{
										maxWidth: '150px',
										maxHeight: '200px',
										display: 'block',
										margin: '0 0 1em auto',
									}}
								/>
							)}
						</Stack>

						<Box p='10px 10px 0 10px' mb={3}>
							<Typography sx={{ fontSize: '32px' }} variant='h2'>
								{userName}
							</Typography>
							<Box mb={1}>
								<Rating
									sx={{
										color: '#F8E00D',
										fontSize: '3rem',
										display: 'flex',
										justifyContent: 'center',
									}}
									name='half-rating-read'
									value={overallRating}
									precision={0.5}
									size='large'
									readOnly={true}
								/>
							</Box>
						</Box>

						<Box sx={{ p: '10px' }}>
							<Typography
								style={{
									color: 'rgb(52, 71, 103)',
									fontWeight: '500',
								}}
							>
								Reviews
							</Typography>

							<Box
								p='0.5em'
								sx={{
									boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
								}}
							>
								{reviews?.map((review, i) => (
									<div key={review?._id} style={{ marginBottom: '1.5em' }}>
										<Rating
											style={{
												color: '#F8E00D',
												fontSize: '3rem',
												display: 'flex',
												justifyContent: 'center',
											}}
											name='half-rating-read'
											defaultValue={review?.ratings?.overall}
											precision={0.5}
											size='large'
											readOnly={true}
										/>
										<Typography
											variant='h3'
											sx={{
												fontSize: '1rem',
												fontWeight: 'bold',
											}}
										>
											{review?.title}
										</Typography>
										<Typography sx={{ fontSize: '10px' }}>
											{review?.content}
										</Typography>
										<Divider />
									</div>
								))}
							</Box>
						</Box>
					</BodyWrapper>
				</BorderWrapper>
			</Box>
		</EmbedContainer>
	);
}

const positionStyles = {
	'top center': { top: 'auto', left: '50%', transform: 'translate(-50%, 0)' },
	'center center': {
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	'bottom center': {
		bottom: '1em',
		left: '50%',
		transform: 'translate(0, -50%)',
	},
	'top left': { top: 'auto', left: 'auto' },
	'center left': { top: '50%', left: 'auto', transform: 'translate(-50%, 0)' },
	'bottom left': { bottom: '1em', left: 'auto' },
	'top right': { top: '1em', right: '2.5em' },
	'center right': {
		top: '50%',
		right: '2.5em',
		transform: 'translate(-50%, 0)',
	},
	'bottom right': { bottom: '1em', right: '2.5em' },
};
