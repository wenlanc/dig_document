import React from 'react';
import { Campaign } from 'types';
import { fetchDefaultCampaign } from 'controllers/campaigns';

const useDefaultCampaign = (userId: string) => {
	const [campaign, setCampaign] = React.useState(null);

	React.useEffect(() => {
		fetchDefaultCampaign(userId).then((data) => setCampaign(data));
	}, []);

	return [campaign, setCampaign];
};

export default useDefaultCampaign;
