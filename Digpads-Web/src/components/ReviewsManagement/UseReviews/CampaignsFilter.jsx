import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

import SelectCampaigns from 'components/ReviewsManagement/UseReviews/SelectCampaigns';
import SuiButton from 'components/SuiButton';

export default function CampaignsFilter({ campaigns }) {
	const [campaignsModalOpen, setCampaignsModalOpen] = useState(false);

	return (
		<div>
			<SuiButton onClick={() => setCampaignsModalOpen(true)} color='warning'>
				Campaign
			</SuiButton>

			<Modal
				open={campaignsModalOpen}
				onClose={() => setCampaignsModalOpen(false)}
			>
				<div>
					<SelectCampaigns
						campaigns={campaigns}
						onClose={() => setCampaignsModalOpen(false)}
					/>
				</div>
			</Modal>
		</div>
	);
}
