import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectedCampaignRemoved,
	selectedCampaignAdded,
	selectCampaigns,
} from 'components/ReviewsManagement/campaignsSlice';
import Stack from '@mui/material/Stack';

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SearchBar from 'components/ReviewsManagement/UseReviews/SearchBar';
import CampaignsTable from 'components/ReviewsManagement/UseReviews/CampaignsTable';

import { StyledModal, ModalTitle } from 'components/styled/ReviewsManagement';

export default function SelectCampaigns({ onClose }) {
	const selectedCampaigns = useSelector(selectCampaigns);
	const dispatch = useDispatch();

	const [filterText, setFilterText] = useState('');
	const handleFilterTextChange = (filterText) => setFilterText(filterText);

	const handleCampaignSelectedChange = (id, selected) => {
		if (selected) {
			dispatch(selectedCampaignAdded(id));
		} else {
			dispatch(selectedCampaignRemoved(id));
		}
	};

	return (
		<StyledModal style={{ width: '400px' }}>
			<SuiBox shadow='lg' sx={{ p: '0.8em', mb: 2 }}>
				<Stack spacing={1}>
					<ModalTitle size='small'>Campaigns</ModalTitle>

					<SearchBar
						filterText={filterText}
						onFilterTextChange={handleFilterTextChange}
					/>

					<SuiBox sx={{ mb: 2 }}>
						<CampaignsTable
							campaigns={selectedCampaigns}
							onCamapignSelectedChange={handleCampaignSelectedChange}
							filterText={filterText}
						/>
					</SuiBox>
				</Stack>
			</SuiBox>

			<SuiButton
				sx={{ display: 'block', ml: 'auto', alignSelf: 'flex-end' }}
				color='primary'
				onClick={onClose}
			>
				Submit
			</SuiButton>
		</StyledModal>
	);
}
