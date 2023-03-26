import React, { useState } from 'react';
import { Typography, IconButton, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import SuiInput from 'components/SuiInput';
import SuiSelect from 'components/SuiSelect';
import { SectionSubtitle } from 'components/styled/Admin';
import ReviewsUsedByUserTable from './ReviewsUsedByUserTable';

export default function ReviewsUsedByUser({ userName, reviews, onClose }) {
	const [filter, setFilter] = useState('');
	const userCampaigns = [...new Set(reviews.map((r) => r.campaign?.name))].map(
		(c) => ({ name: c })
	);
	const [selectedCampaign, setSelectedCampaign] = useState({});
	const [userCampaignsInputValue, setUserCampaignsInputValue] = useState('');

	const handleFilterChange = (evt) => {
		setFilter(evt.target.value);
	};

	const handleCampaignChange = (option, actionType) => {
		if (actionType.action === 'select-option') {
			setSelectedCampaign(option);
		}
	};

	const campaignsSelectOptions = userCampaigns?.map((c) => ({
		value: c.name,
		label: c.name,
	}));

	return (
		<div>
			<SectionSubtitle>Reviews Used By User</SectionSubtitle>

			<Stack direction='row' spacing={5}>
				<Typography>{userName}</Typography>

				<Box sx={{ width: 250, mb: '50px' }}>
					<SuiSelect
						placeholder='Select campaign'
						options={campaignsSelectOptions}
						onChange={handleCampaignChange}
						value={selectedCampaign}
						name='campaigns'
					/>
				</Box>
			</Stack>

			<hr style={{ border: '1px dotted black', margin: '3em 0 0.5em 0' }}></hr>

			<Box width='250px' mb={2}>
				<SuiInput
					type='text'
					placeholder='Search review title'
					value={filter}
					onChange={handleFilterChange}
				/>
			</Box>

			<IconButton
				sx={{ position: 'absolute', right: '0', top: '0' }}
				onClick={onClose}
			>
				<CloseIcon />
			</IconButton>

			<ReviewsUsedByUserTable
				reviews={reviews}
				filter={filter}
				selectedCampaign={selectedCampaign.value}
			/>
		</div>
	);
}
