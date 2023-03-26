import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import SuiButton from 'components/SuiButton';
import Spinner from 'components/Spinner';
import Content from 'components/Profiles/Content';
import Review from 'components/Profiles/Review';
import { useMarketplaceProfile, useReviews } from 'hooks';
import TitledSection from 'components/Profiles/TitledSection';
import ContactInfo from 'components/Settings/Profile/ContactInfo';
import PhotosAndVideos from 'components/Profiles/PhotosAndVideos';
import MyRentalHistory from 'components/Settings/Profile/MyRentalHistory';
import MyNeighborhoods from 'components/Settings/Profile/MyNeighborhoods';
import BusinessCategoryTagList from 'components/Profiles/BusinessCategoryTagList';

function Tenant() {
	const { userId } = useParams();
	const { reviews, fetchReviews } = useReviews();
	const [profile] = useMarketplaceProfile(userId);

	const shareText = `Tenant%0A${profile?.contactInfo?.state} ${profile?.contactInfo?.city}`;

	React.useEffect(() => {
		fetchReviews(userId);
	}, []);

	return (
		<>
			{profile === null ? (
				<Box
					sx={{
						marginTop: '10vh',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Spinner type='circular' size={'12rem'} />
				</Box>
			) : (
				<Box bgcolor='#fff' paddingY={2}>
					<Content
						title='TENANT'
						avatar={profile?.logo}
						stars={profile?.starRating}
						sections={tenantSections}
						shareText={shareText}
						profileName={profile?.name}
						about={profile?.aboutYou}
						buttonActions={
							<SuiButton variant='contained' color='success' fullWidth>
								Share my Rental with Tenant
							</SuiButton>
						}
					>
						<TitledSection id='photo&Videos' title='Photos &amp; Videos'>
							<PhotosAndVideos
								images={profile?.portfolio?.images}
								videos={profile?.portfolio?.videos}
							/>
						</TitledSection>

						<TitledSection id='rentalHistory' title='My Rental History'>
							<MyRentalHistory rentals={profile?.rentalHistory} />
						</TitledSection>

						<TitledSection id='neighborhoods' title='My Neighborhoods'>
							<MyNeighborhoods neighborhoods={profile?.neighborhoods} />
						</TitledSection>

						<TitledSection id='reviews' title='Reviews'>
							<Stack spacing={6}>
								{reviews?.map((r) => (
									<Review
										key={r._id}
										starRating={r.ratings.overall}
										createdAt={r.createdAt}
										content={r.content}
										responses={r.responses}
									/>
								))}

								{reviews?.length === 0 && (
									<Typography>User has no reviews</Typography>
								)}
							</Stack>
						</TitledSection>

						<TitledSection id='relevantCategories' title='Relevant Categories'>
							<Stack spacing={2}>
								<BusinessCategoryTagList
									category='social'
									tags={profile?.businessTags}
								/>

								<BusinessCategoryTagList
									category='business'
									tags={profile?.businessTags}
								/>
							</Stack>
						</TitledSection>

						<TitledSection id='contactInformation' title='Contact Information'>
							<ContactInfo {...profile?.contactInfo} logo={profile?.logo} />
						</TitledSection>
					</Content>
				</Box>
			)}
		</>
	);
}

export default Tenant;

export const tenantSections = [
	{
		id: 'rentalHistory',
		title: 'Rental History',
	},
	{
		id: 'neighborhoods',
		title: 'Neighborhoods',
	},
	{
		id: 'desiredAreas',
		title: 'Interested Areas',
	},
	{
		id: 'preferrences',
		title: 'Preferrences',
	},
	{
		id: 'reviews',
		title: 'Reviews',
	},
];
