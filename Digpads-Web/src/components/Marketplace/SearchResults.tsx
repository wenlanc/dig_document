import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Stack, Typography, Pagination, PaginationItem } from '@mui/material';

import ProfileCard from 'components/Marketplace/ProfileCard';
import ProfileCardRow from 'components/Marketplace/ProfileCardRow';
import SuiBox from 'components/SuiBox';
import { Profile } from 'Views/marketplace/MarketplaceSearch';

function Content() {
	const location = useLocation();
	let userTypeGroup = '';
	if (location.pathname.includes('landlords')) {
		userTypeGroup = 'landlords';
	} else if (location.pathname.includes('tenants')) {
		userTypeGroup = 'tenants';
	} else if (location.pathname.includes('contractors')) {
		userTypeGroup = 'contractors';
	} else if (location.pathname.includes('landlord-contractors')) {
		userTypeGroup = 'landlord-contractors';
	} else if (location.pathname.includes('properties')) {
		userTypeGroup = 'properties';
	}

	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get('page') || '1', 10);

	return (
		<Pagination
			page={page}
			count={10}
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/marketplace/${userTypeGroup}${
						item.page === 1 ? '' : `?page=${item.page}`
					}`}
					{...item}
				/>
			)}
		/>
	);
}

type Props = {
	profiles: Profile[];
	featuredProfiles: Profile[];
};

const profilesPerPage = 12;

export default function SearchResults({ profiles, featuredProfiles }: Props) {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const page = parseInt(query.get('page') || '0', 10);

	const numberOfProfilesVistited = page * profilesPerPage;

	const displayProfiles: Profile[] = profiles?.slice(
		numberOfProfilesVistited,
		numberOfProfilesVistited + profilesPerPage
	);

	return (
		<SuiBox shadow='lg' sx={{ p: '2em 1em' }}>
			<ProfileCardRow title='Featured'>
				{featuredProfiles?.map((profile, i) => (
					<ProfileCard key={i} {...profile} />
				))}
			</ProfileCardRow>

			<hr style={{ margin: '2em 0' }}></hr>

			{displayProfiles?.length === 0 && (
				<Typography align='center'>No profiles found</Typography>
			)}

			{displayProfiles?.length > 0 && (
				<ProfileCardRow>
					{displayProfiles.map((profile, i) => (
						<ProfileCard key={i} {...profile} />
					))}
				</ProfileCardRow>
			)}

			<Stack alignItems='center' sx={{ mt: 2 }}>
				<Routes>
					<Route path='*' element={<Content />} />
				</Routes>
			</Stack>
		</SuiBox>
	);
}
