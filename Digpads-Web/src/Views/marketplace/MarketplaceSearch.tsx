import React from 'react';
import { Typography, Container, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from 'components/Marketplace/SearchBar';
import SearchResults from 'components/Marketplace/SearchResults';
import MatchMe from 'components/Marketplace/MatchMe';
import { capitalize } from 'utils/stringUtils';
import { transformProfiles } from 'controllers/marketplaceProfile';
import {
	searchProfiles,
	selectProfiles,
} from 'features/marketplaceProfile/marketplaceProfileSlice';

type Props = {
	filterText: string;
	onFilterTextChange: (text: string) => void;
	profileTypeGroup:
		| 'landlords'
		| 'tenants'
		| 'contractors'
		| 'landlord-contractors'
		| 'properties';
	children: React.ReactNode;
};

export type Profile = {
	starRating: number;
	name: string;
	areasServed: string[];
	numProperties: number;
	desiredRental?: {
		description: string;
		canAffordFrom: number;
		canAffordTo: number;
		neighborhood: string;
		city: string;
		state: string;
		rentalType: string;
		bedrooms: number;
		bathrooms: number;
	};
	city: string;
	state: string;
	zip: string;
	ad: boolean;
	user: { _id: string; type: string };
};

export default function MarketplaceSearch({
	children,
	filterText,
	profileTypeGroup,
	onFilterTextChange,
}: Props) {
	const profiles = useSelector(selectProfiles);
	const displayProfiles = transformProfiles(profiles);

	return (
		<>
			<Typography variant='h1' align='center' sx={{ mb: '1em' }}>
				{profileTypeGroup ? capitalize(profileTypeGroup) : ''}
			</Typography>

			<Stack spacing={3} mb={2} direction='row'>
				<SearchBar
					filterText={filterText}
					onFilterTextChange={onFilterTextChange}
				/>
				<MatchMe />
			</Stack>

			{children}

			<SearchResults
				profiles={displayProfiles}
				featuredProfiles={sampleFeaturedProfiles}
			/>
		</>
	);
}

const sampleProfiles = Array(70)
	.fill({
		user: { _id: '61adf570e4936d42c8ca486a', type: 'landlord' },
		starRating: 5,
		name: 'Carl von dornhorn',
		areasServed: ['loolxr', 'Calfiron', 'Muajrxrr'],
		numProperties: 4,
		city: 'Los Angeles',
		state: 'California',
		zip: '168621',
	})
	.map((profile, i) => ({ ...profile, numProperties: i }));

const sampleFeaturedProfiles = Array(4).fill({
	user: { _id: '61adf570e4936d42c8ca486a', type: 'landlord' },
	starRating: 5,
	name: 'Carl von dornhorn',
	areasServed: ['loolxr', 'Calfiron', 'Muajrxrr'],
	numProperties: 4,
	city: 'Los Angeles',
	state: 'California',
	zip: '168621',
	ad: true,
});
