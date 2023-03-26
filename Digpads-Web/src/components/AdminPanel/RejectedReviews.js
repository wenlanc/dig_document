import React from 'react';
import { Box } from '@mui/material';
import { instance } from '../../controllers/axios';

export default function RejectedReviews() {
	const [reviews, setReviews] = React.useState([]);

	React.useEffect(() => {
		async function fetchCampaigns() {
			try {
				const response = await instance.get('reviews?rejected');

				setReviews(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchCampaigns();
	}, []);

	return (
		<Box
			border={1}
			borderColor='black'
			p='10px'
			mb='26px'
			fontSize='12px'
			display='flex'
			flexDirection='column'
			gridGap='10px'
			sx={{
				whiteSpace: 'nowrap',
				overflow: 'scroll',
				maxHeight: '280px',
				'& span': {
					fontWeight: 600,
					ml: '10px',
				},
			}}
		>
			{/* // Campaign Name, Email, Reviewer Name, Date Received, Date Rejected, Why Rejected */}
			{reviews.map((review, i) => (
				<Box key={i} sx={{ mb: '1em' }}>
					<div>
						Campaign name:{' '}
						<span>{review.campaign?.name || ''}</span>
					</div>

					<div>
						Reviewer name: <span>{review.reviewer.name || ''}</span>
					</div>

					<div>
						Reviewer email:{' '}
						<span>{review.reviewer.email || ''}</span>
					</div>

					<div>
						Date created:{' '}
						<span>
							{review.createdAt
								? new Date(
										review.createdAt
								  ).toLocaleDateString()
								: ''}
						</span>
					</div>

					<div>
						Why rejected: <span>{review.rejectedReason || ''}</span>
					</div>
				</Box>
			))}
		</Box>
	);
}
