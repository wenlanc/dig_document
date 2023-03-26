import React, { useState, useRef } from 'react';
import { fetchUsers } from '../controllers/users';

export default function useSearchUsers() {
	const [selectedUser, setSelectedUser] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [users, setUsers] = useState([]);
	const delayRequestTimeout = useRef(null);

	const handleInputChange = (evt, value, reason) => {
		if (value === 'undefined') return;

		setInputValue(value);
		if (value === '') return;
		if (reason !== 'input') return;

		clearTimeout(delayRequestTimeout.current);
		delayRequestTimeout.current = setTimeout(() => {
			fetchUsers({ key: 'name', value: value }).then((users) =>
				setUsers(users)
			);
		}, 1000);
	};

	return [users, selectedUser, setSelectedUser, inputValue, handleInputChange];
}
