import * as React from 'react';
import { useAppSelector } from 'hooks';
import { selectCampaigns } from 'components/ReviewsManagement/campaignsSlice';

import SuiSelect from 'components/SuiSelect';

export default function SelectCampaign({ onSelect }) {
	const campaigns = useAppSelector(selectCampaigns);
	const options = campaigns?.map((campaign) => ({
		value: campaign,
		label: campaign.name,
	}));

	const handleChange = (option, actionType) => {
		if (actionType.action === 'select-option') {
			onSelect(option.value);
		}
	};

	return (
		<SuiSelect
			options={options}
			onChange={handleChange}
			placeholder='Select campaign'
		/>
	);
}
