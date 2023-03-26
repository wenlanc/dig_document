import React from 'react';
import DataTable from 'examples/Tables/DataTable';
import { UserType } from 'types';

type User = {
	name: string;
	first: string;
	last: string;
	accountType: 'business' | 'individual';
	marketplaceType: UserType;
	joinDate: string;
};

type Props = {
	filterText: string;
	users: User[];
};

export default function UsersListTable({ filterText, users }: Props) {
	const filteredUsers = users?.filter((user) =>
		user.name.toLowerCase().includes(filterText)
	);

	const columns = [
		{ Header: 'Name', accessor: 'name', width: '25%' },
		{ Header: 'First Name', accessor: 'first', width: '30%' },
		{ Header: 'Last Name', accessor: 'last' },
		{ Header: 'Account Type', accessor: 'accountType', width: '12%' },
		{ Header: 'Marketplace Type', accessor: 'marketplaceType', width: '12%' },
		{ Header: 'Join Date', accessor: 'joinDate', width: '12%' },
	];

	const rows = filteredUsers?.map((user) => ({
		name: user.name,
		first: user.first,
		last: user.last,
		accountType: user.accountType,
		marketplaceType: user.marketplaceType,
		joinDate: user.joinDate
			? new Date(user.joinDate).toLocaleDateString()
			: 'unknown',
	}));

	return (
		<>
			<DataTable
				table={{
					columns: columns,
					rows: rows,
				}}
				entriesPerPage={false}
			/>
		</>
	);
}

// Soft UI Dashboard PRO React examples
