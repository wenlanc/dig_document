import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Stack, Box, Typography } from '@mui/material';

import { useReviews } from 'hooks';
import Spinner from 'components/Spinner';
import Review from 'components/Profiles/Review';
import SuiButton from 'components/SuiButton';
import { useMarketplaceProfile } from 'hooks';
import Content from 'components/Profiles/Content';
import TitledSection from 'components/Profiles/TitledSection';
import ContactInfo from 'components/Settings/Profile/ContactInfo';
import PhotosAndVideos from 'components/Profiles/PhotosAndVideos';
import AreasServedList from 'components/Settings/Profile/AreasServedList';
import BusinessDetails from 'components/Settings/Profile/BusinessDetails';
import MapLocationHours from 'components/Settings/Profile/MapLocationHours';
import BusinessCategoryTagList from 'components/Profiles/BusinessCategoryTagList';

function ButtonActions() {
	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<SuiButton variant='contained' color='success' fullWidth>
						See Available Rentals
					</SuiButton>
				</Grid>

				<Grid item xs={12}>
					<SuiButton fullWidth variant='contained' color='success'>
						Contact Me
					</SuiButton>
				</Grid>

				<Grid item xs={12}>
					<SuiButton
						fullWidth
						sx={{
							backgroundColor: 'rgba(224, 96, 23, 1)',
							color: '#fff',
							transition: '1s background-color',
							'&:hover': { backgroundColor: 'rgb(171 40 6)' },
						}}
						variant='contained'
						color='warning'
					>
						Match Me
					</SuiButton>
				</Grid>
			</Grid>
		</>
	);
}

function Landlord() {
	const { userId } = useParams();
	const [profile] = useMarketplaceProfile(userId);

	const { reviews, fetchReviews } = useReviews();

	React.useEffect(() => {
		fetchReviews(userId, 'responses');
	}, []);

	const shareText = `Landlord%0A${profile?.contactInfo?.state} ${profile?.contactInfo?.city}`;

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
						title='LANDLORD'
						avatar={profile?.logo}
						sections={landlordSections}
						stars={profile?.starRating}
						shareText={shareText}
						profileName={profile?.name}
						about={profile?.aboutYou}
						buttonActions={<ButtonActions />}
					>
						<TitledSection id='photo&Videos' title='Photos &amp; Videos'>
							<PhotosAndVideos
								images={profile?.portfolio?.images}
								videos={profile?.portfolio?.videos}
							/>
						</TitledSection>

						<TitledSection id='areasServed' title='Areas Served'>
							<AreasServedList areasServed={profile?.areasServed} />
						</TitledSection>

						<TitledSection
							id='mapLocationHours'
							title='Map, Location, &amp; Hours'
						>
							<MapLocationHours {...profile?.mapLocationHours} />
						</TitledSection>

						<TitledSection id='businessDetails' title='Business Details'>
							<BusinessDetails {...profile?.businessDetails} />
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

						<TitledSection title='Relevant Categories'>
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

export default Landlord;

export const landlordSections = [
	{
		id: 'properties',
		title: 'Properties',
	},
	{
		id: 'areasServed',
		title: 'Areas Served',
	},
	{
		id: 'mapLocationHours',
		title: 'Location & Hours',
	},
	{
		id: 'businessDetails',
		title: 'Details',
	},
	{
		id: 'reviews',
		title: 'Reviews',
	},
];
