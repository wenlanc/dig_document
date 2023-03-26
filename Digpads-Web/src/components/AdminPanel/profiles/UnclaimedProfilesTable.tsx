import React from 'react';
import { MarketplaceProfile } from 'types';
import DataTable from 'examples/Tables/DataTable';
import { useDispatch } from 'react-redux';
import { profileSelected } from 'features/marketplaceProfile/marketplaceProfileSlice';

type Props = {
	profiles: Partial<MarketplaceProfile>[];
	filterText: string;
};

export default function UnclaimedProfilesTable({
	profiles,
	filterText,
}: Props) {
	// const filteredProfiles = profiles?.filter((profile) =>
	// 	profile.contactInfo?.name?.toLowerCase()?.includes(filterText)
	// );

	const dispatch = useDispatch();

	const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1);

	const columns = [
		{ Header: 'Profile Name', accessor: 'profileName', width: '30%' },
		{ Header: 'Account Type', accessor: 'accountType', width: '20%' },
		{ Header: 'Marketplace Type', accessor: 'marketplaceType' },
		{ Header: '# of Reviews', accessor: 'numReviews', width: '12%' },
		{ Header: 'Date Created', accessor: 'dateCreated', width: '12%' },
	];

	const rows = profiles?.map((profile) => ({
		_id: profile._id,
		profileName: profile.name,
		accountType: profile.user?.accountType || 'individual',
		marketplaceType: profile.user?.type || 'landlord',
		numReviews: profile.numberOfReviews,
		dateCreated: profile.createdAt
			? new Date(profile.createdAt).toLocaleDateString()
			: 'unknown',
	}));

	const handleTableRowClick = (row, index) => {
		const selectedProfile = profiles?.find((p) => p._id === row._id);
		dispatch(profileSelected(selectedProfile));
		setSelectedRowIndex(index);
	};

	return (
		<>
			<DataTable
				table={{
					columns: columns,
					rows: rows,
				}}
				entriesPerPage={false}
				selectedRowIndex={selectedRowIndex}
				onTableRowClick={handleTableRowClick}
			/>
		</>
	);
}
