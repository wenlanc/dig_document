import React from 'react';
import { Rating, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Profile } from 'Views/marketplace/MarketplaceSearch';
import { getUserTypeUrlParameter } from 'utils/urlUtils';

export default function ProfileCard({
	user,
	starRating,
	name,
	areasServed,
	numProperties,
	desiredRental,
	city,
	state,
	zip,
	ad,
}: Profile) {
	return (
		<Link
			to={
				user
					? `/marketplace/${getUserTypeUrlParameter(user.type)}/${user._id}`
					: ''
			}
			style={{ color: '#344767' }}
		>
			<Box
				sx={{
					p: 2,
					width: '210px',
					position: 'relative',
					height: '100%',
					boxShadow:
						'0rem 0.5rem 1.625rem -0.25rem rgb(20 20 20 / 15%), 0rem 0.5rem 0.5625rem -0.3125rem rgb(20 20 20 / 6%)',
				}}
			>
				<Rating
					value={starRating ? starRating : 0}
					readOnly
					sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
				/>

				<Typography paragraph>{name}</Typography>

				<Typography paragraph>
					{areasServed?.slice(0, 3).join(', ')}{' '}
					{areasServed?.length > 3 && (
						<span title={`user has ${areasServed.length} areas`}>...</span>
					)}
				</Typography>

				<Typography>
					{desiredRental?.canAffordFrom && (
						<div>From: ${desiredRental.canAffordFrom}</div>
					)}

					{desiredRental?.canAffordTo && (
						<div>To: ${desiredRental.canAffordTo}</div>
					)}
					{desiredRental?.city && <div>City: ${desiredRental.city}</div>}
					{desiredRental?.state && <div>State: ${desiredRental.state}</div>}
				</Typography>

				<Typography paragraph variant='caption'>
					# of Properties: {numProperties}
				</Typography>

				<Typography paragraph>
					{city}, {state}, {zip}
				</Typography>

				{ad && (
					<Typography sx={{ position: 'absolute', top: '5px', right: '5px' }}>
						Ad
					</Typography>
				)}
			</Box>
		</Link>
	);
}
