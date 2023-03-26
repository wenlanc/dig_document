import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Stack, Box, Typography } from '@mui/material';

import Spinner from 'components/Spinner';
import Content from 'components/Profiles/Content';
import { useMarketplaceProfile, useReviews } from 'hooks';
import TitledSection from 'components/Profiles/TitledSection';
import SuiButton from 'components/SuiButton';
import Review from 'components/Profiles/Review';
import PhotosAndVideos from 'components/Profiles/PhotosAndVideos';
import ContactInfo from 'components/Settings/Profile/ContactInfo';
import AreasServedList from 'components/Settings/Profile/AreasServedList';
import BusinessDetails from 'components/Settings/Profile/BusinessDetails';
import ServicesOffered from 'components/Settings/Profile/ServicesOffered';
import MapLocationHours from 'components/Settings/Profile/MapLocationHours';
import BusinessCategoryTagList from 'components/Profiles/BusinessCategoryTagList';

function ButtonActions() {
	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={7}>
					<SuiButton
						variant='contained'
						color='success'
						fullWidth
						onClick={() => {
							alert('See Available Rentals');
						}}
					>
						Request Quote
					</SuiButton>
				</Grid>
				<Grid item xs={12} sm={5}>
					<SuiButton
						variant='contained'
						color='success'
						fullWidth
						onClick={() => {
							alert('Contact Me');
						}}
					>
						Contact Me
					</SuiButton>
				</Grid>
				<Grid item xs={12}>
					<SuiButton
						sx={{
							backgroundColor: 'rgba(224, 96, 23, 1)',
							color: '#fff',
							transition: '1s background-color',
							'&:hover': { backgroundColor: 'rgb(171 40 6)' },
						}}
						fullWidth
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
	const shareText = `Contractor%0A${profile?.contactInfo?.state} ${profile?.contactInfo?.city}`;

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
						title='CONTRACTOR'
						avatar={profile?.logo}
						stars={profile?.starRating}
						sections={contractorSections}
						shareText={shareText}
						profileName={profile?.name}
						about={profile?.aboutYou}
						buttonActions={<ButtonActions />}
						availability={profile?.availability}
					>
						<TitledSection id='photos&Videos' title='Photos &amp; Videos'>
							<PhotosAndVideos
								images={profile?.portfolio?.images}
								videos={profile?.portfolio?.videos}
							/>
						</TitledSection>

						<section id='services'>
							<ServicesOffered servicesOffered={profile?.servicesOffered} />
						</section>

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

export default Landlord;

export const contractorSections = [
	{
		id: 'photos&Videos',
		title: 'Projects, Photos & Videos',
	},
	{
		id: 'services',
		title: 'Services Offered',
	},
	{
		id: 'areasServed',
		title: 'Areas Served',
	},
	{
		id: 'mapLocationHours',
		title: 'Map, Location, & Hours',
	},
	{
		id: 'businessDetails',
		title: 'Business Details',
	},
	{
		id: 'reviews',
		title: 'Reviews',
	},
	{
		id: 'relevantCategories',
		title: 'Relevant Categories',
	},
	{
		id: 'contactInformation',
		title: 'Contact Information',
	},
];
