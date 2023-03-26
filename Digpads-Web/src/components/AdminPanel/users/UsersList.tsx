import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';
import { ModalBase } from 'components/styled/Modal';
import UsersListTable from './UsersListTable';

type Props = {
	listName: string;
	users: any;
	onExpand: () => void;
};

export default function UsersList({ listName, users, onExpand }: Props) {
	const [open, setOpen] = useState(false);
	const [filterText, setFilterText] = useState('');

	const handleExapnd = () => {
		setOpen(true);
		onExpand();
	};

	const handleFilterTextChange = (evt) => setFilterText(evt.target.value);

	return (
		<>
			<SuiButton variant='outlined' color='primary' onClick={handleExapnd}>
				{listName}
			</SuiButton>

			<Modal open={open} onClose={() => setOpen(false)}>
				<ModalBase>
					<Typography variant='h3' color='textSecondary' gutterBottom>
						{listName} users
					</Typography>

					{users.length > 0 && (
						<SuiInput
							sx={{ maxWidth: '230px' }}
							placeholder={`Search ${listName} users`}
							type='text'
							onChange={handleFilterTextChange}
						/>
					)}

					{users.length > 0 && (
						<UsersListTable
							filterText={filterText}
							users={transformUsers(users)}
						/>
					)}

					{users.length === 0 && (
						<p style={{ fontWeight: '500' }}>No {`${listName}`} users</p>
					)}
				</ModalBase>
			</Modal>
		</>
	);
}

function transformUsers(users) {
	return users?.map((user) => ({
		name: user.name,
		first: user.first,
		last: user.last,
		accountType: user.accountType,
		marketplaceType: user.type,
		joinDate: user.dateFirstJoined,
	}));
}
