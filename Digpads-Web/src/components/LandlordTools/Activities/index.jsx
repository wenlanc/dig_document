import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CardListReports from '../CardListReports';

function Activities() {
	const _activitesList = [
		'Listing Creation',
		'Photo Management',
		'Video Management',
		'Market Research',
		'Repairs & Remodels',
		'Maintenance',
		'Junk Hauling',
		'Cleaning',
		'Application',
		'Identifying Documents',
		'Income Verification',
		'Financial Statements',
		'Employment Verification',
		'References',
		'Tenant Screening',
		'Disclose / Compliance',
		'Lease',
		'Lease Extension',
		'Lease Termination',
		'Create Custom',
	];

	return (
		<Grid container spacing={2}>
			{_activitesList.map((activity, index) => (
				<CardListReports key={index} index={index}>
					<Link
						to={`activities-${activity
							.toLowerCase()
							.split(' ')
							.join('-')}`}
						style={{
							color: 'inherit',
						}}
					>
						{activity}
					</Link>
				</CardListReports>
			))}
		</Grid>
	);
}

export default Activities;
