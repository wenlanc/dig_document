import React from 'react';
import { Box, Typography, Grid, Button, Avatar } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Credential from './Credential';
import ReportsOffered from './ReportsOffered';
import SampleReport from './SampleReport';
import PackagesPricing from './PackagesPricing';
import ProcessComparison from './ProcessComparison';
import PropsCons from './PropsCons';
import DigpadsRating from './DigpadsRating';
import Actions from './Actions';
import {
	ProcessComparisons,
	ReportOffered,
	Pros,
	Cons,
	SampleReports,
} from '../../constants/VSdesign';

function FitbitCard({ colorHeader, colorBody, colorActions }) {
	return (
		<Grid item xs={12} md={6}>
			<Box borderRadius='8px'>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					p={1.5}
					borderRadius='8px 8px 0 0'
					bgcolor={colorHeader}
				>
					<img
						style={{ height: 32 }}
						src='/images/Fitbit.png'
						alt='Fitbit'
					/>
					<Button
						variant='contained'
						style={{
							textTransform: 'unset',
							backgroundColor: '#008f00',
						}}
						endIcon={<ArrowForward />}
						onClick={() => {
							alert('Order reports');
						}}
					>
						Order Reports
					</Button>
				</Box>
				<Box bgcolor={colorBody} p={2}>
					<Credential />
					<ReportsOffered lists={ReportOffered} />
					<SampleReport lists={SampleReports} />
					<PackagesPricing />
					<ProcessComparison lists={ProcessComparisons} />
					<PropsCons
						title='Pros'
						header='Pros are digpads view based on digpads properietary research.'
						color='#75c275'
						lists={Pros}
						type='pros'
					/>
					<PropsCons
						title='Cons'
						header='Cons are derives from online reviews from consumers and independent companies.'
						color='#ee7d69'
						lists={Cons}
						type='cons'
					/>
					<DigpadsRating />
					<Actions color={colorActions} />
				</Box>
			</Box>
		</Grid>
	);
}

export default FitbitCard;
