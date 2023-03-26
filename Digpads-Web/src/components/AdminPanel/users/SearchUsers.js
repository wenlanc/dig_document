import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import SuiInput from 'components/SuiInput';

export default function SearchUsers({
	selectedUser,
	onSelectUser,
	inputValue,
	onInputChange,
	users,
}) {
	return (
		<Autocomplete
			value={selectedUser}
			onChange={(event, user, reason) => {
				if (reason === 'selectOption') {
					onSelectUser(user);
				}
			}}
			inputValue={inputValue}
			onInputChange={onInputChange}
			options={users}
			getOptionLabel={(user) => user.name || ''}
			sx={{ width: 250, mb: '16px' }}
			renderInput={(params) => (
				<TextField {...params} placeholder='Search Users' />
			)}
			renderOption={(props, user) => (
				<Box component='li' {...props} key={user.email}>
					{`${user.name}\n(${user.email})`}
				</Box>
			)}
		/>
	);
}
