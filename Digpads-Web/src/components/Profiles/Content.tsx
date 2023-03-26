import React from 'react';
import { useParams } from 'react-router-dom';
import {
	Container,
	Paper,
	Grid,
	useMediaQuery,
	Stack,
	Box,
	Typography,
	Modal,
} from '@mui/material';

import { useDefaultCampaign } from 'hooks';
import StarsRating from 'stars-rating';
import Share from 'components/Profiles/Share';
import Badge from 'components/Profiles/Badge';
import SuiTypography from 'components/SuiTypography';
import AvailabilityLevel from 'components/Profiles/AvailabilityLevel';
import CollectReviewForm from 'components/ReviewsManagement/CollectReviewForm';

import * as S from './style';

type ContentPropTypes = {
	title: string;
	avatar: string;
	stars: number;
	profileName: string;
	shareText: string;
	sections: Array<{ id: string; title: string; heading?: string }>;
	about: string;
	buttonActions: JSX.Element;
	availability?: string;
	children: React.ReactNode;
};

function Content({
	title,
	avatar,
	stars,
	profileName,
	shareText,
	sections,
	about,
	buttonActions,
	availability,
	children,
}: ContentPropTypes) {
	const [writeReviewModalOpen, setWriteReviewModalOpen] = React.useState(false);
	const handleWriteReviewClick = () => setWriteReviewModalOpen(true);
	const handdleCollectReviewFormSubmit = () => setWriteReviewModalOpen(false);

	const isSmBreakPoint = useMediaQuery('(max-width: 600px)');
	const isMdBreakPoint = useMediaQuery('(max-width: 900px)');

	const { userId } = useParams();
	const [campaign, setCampaign] = useDefaultCampaign(userId);

	return (
		<Container
			sx={{
				'& .MuiInputBase-input': {
					fontWeight: '500',
					color: 'rgb(52, 71, 103)',
				},
			}}
		>
			<S.StyledGridContainer container spacing={4}>
				<Grid item xs={12} md={4}>
					<SuiTypography
						align='center'
						variant='h5'
						component='h1'
						sx={{ fontSize: '2rem' }}
					>
						{title}
					</SuiTypography>

					<S.Image src={avatar || 'https://fakeimg.pl/300/'} />

					{buttonActions}
				</Grid>
				<Grid item xs={12} md={8}>
					<Box mt={4.5} display='flex' justifyContent='space-between'>
						<StarsRating
							count={5}
							value={stars || 5}
							edit={false}
							size={isSmBreakPoint ? 24 : isMdBreakPoint ? 64 : 90}
							color2={'#ffd700'}
						/>

						<S.StyledButton variant='outlined' onClick={handleWriteReviewClick}>
							Write a Review
						</S.StyledButton>

						<Modal
							open={writeReviewModalOpen}
							onClose={() => setWriteReviewModalOpen(false)}
						>
							<Box
								sx={{
									backgroundColor: '#fff',
									margin: 4,
									borderRadius: '10px',
									maxHeight: '90vh',
									overflow: 'scroll',
								}}
							>
								<CollectReviewForm
									campaign={campaign?._id}
									onSubmit={handdleCollectReviewFormSubmit}
								/>
							</Box>
						</Modal>
					</Box>

					<S.StyledHeader
						variant='h3'
						component='h2'
						style={{
							lineHeight: isMdBreakPoint && 1,
							fontSize: isSmBreakPoint && '24px',
						}}
					>
						{profileName || ''}
					</S.StyledHeader>

					<Stack direction='row' flexWrap='wrap'>
						{sections.map((section, index) => (
							<div key={index}>
								<Badge id={section.id}>{section.title}</Badge>
							</div>
						))}
					</Stack>

					<Box mb={2}>
						<Share
							sharer={profileName}
							shareText={shareText}
							shareURL={location.href}
						/>
					</Box>

					<Paper sx={{ borderRadius: '3px', p: 2 }} elevation={2}>
						<Typography sx={{ fontWeight: '500', color: 'rgb(52, 71, 103)' }}>
							{about || ''}
						</Typography>
					</Paper>

					{availability && <AvailabilityLevel availability={availability} />}
				</Grid>
			</S.StyledGridContainer>

			<Stack spacing={6}>
				{children}

				<S.StyledShowContactInformationButton
					fullWidth
					onClick={() => {
						alert('Click to Show Contact Information');
					}}
				>
					Click to Show Contact Information
				</S.StyledShowContactInformationButton>
			</Stack>
		</Container>
	);
}

export default Content;
