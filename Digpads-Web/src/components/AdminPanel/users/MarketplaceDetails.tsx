import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	fetchUserProfile,
	selectUserProfile,
} from 'features/marketplaceProfile/marketplaceProfileSlice';
import { Typography } from '@mui/material';
import { MarketplaceProfile, UserType } from 'types';

type Props = {
	userId: string;
	userType: UserType;
	lastLogin: string;
};

export default function MarketplaceDetails({
	userId,
	userType,
	lastLogin,
}: Props) {
	const dispatch = useDispatch();

	const marketplaceProfile: MarketplaceProfile = useSelector((state) =>
		selectUserProfile(userId, state)
	);

	const marketplaceDetails = {
		'Profile name': marketplaceProfile?.name,
		'Company/person name': marketplaceProfile?.contactInfo?.name || 'John Doe',
		'Account Type': userType,
		'# of reviews': marketplaceProfile?.numberOfReviews,
		rating: marketplaceProfile?.starRating
			? marketplaceProfile?.starRating.toFixed(1)
			: 0,
		'Last Login': lastLogin ? new Date(lastLogin).toLocaleString() : '',
		State: marketplaceProfile?.contactInfo?.state || 'Somewhere',
		City: marketplaceProfile?.contactInfo?.city || 'Somewhere else',
		Zip: marketplaceProfile?.contactInfo?.zip || '000000',
	};

	React.useEffect(() => {
		dispatch(fetchUserProfile(userId));
	}, [dispatch, userId]);

	return (
		<ul>
			<Typography sx={{ fontWeight: 'bold' }}>Marketplace</Typography>

			{Object.keys(marketplaceDetails).map((detail, i) => (
				<li key={i}>
					<span key={i} style={{ fontWeight: 'bold' }}>
						{detail}:{' '}
					</span>
					{marketplaceDetails[detail]}
				</li>
			))}
		</ul>
	);
}
