import React from 'react';
import DashboardLayout from 'components/DashboardLayout';
import Divider from '@mui/material/Divider';
import SuiTypography from 'components/SuiTypography';
import UserCampaigns from './UserCampaigns';
import UserCampaignsByUser from './UserCampaignsByUser';
import Footer from 'components/Footer';

export default function index() {
	return (
		<DashboardLayout>
			<SuiTypography variant='h2'>Campaigns</SuiTypography>
			<UserCampaignsByUser />
			<Divider sx={{ mt: 4, mb: 4 }} />
			<UserCampaigns />
			<Footer renderSubscribe={false} />;
		</DashboardLayout>
	);
}

index.displayName = 'Campaigns';
