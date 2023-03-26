import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

export default function CampaignsTable({
	campaigns,
	filterText,
	onCamapignSelectedChange,
}) {
	const filteredCampaigns = campaigns.filter((campaign) =>
		campaign.name.includes(filterText)
	);
	return (
		<Table aria-label='reviews table'>
			<TableHead sx={{ display: 'table-header-group' }}>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell align='center'>Select</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{filteredCampaigns.map((campaign) => (
					<TableRow key={campaign.name}>
						<TableCell>{campaign.name}</TableCell>

						<TableCell align='center'>
							<Checkbox
								checked={campaign.isSelected}
								onChange={(evt) =>
									onCamapignSelectedChange(
										campaign._id,
										evt.target.checked
									)
								}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
