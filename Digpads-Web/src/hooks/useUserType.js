import React, { useEffect } from 'react';
import { instance, getCSRF } from '../controllers/axios';

export default function useUserType(user) {
	const [userType, setUserType] = React.useState('');

	useEffect(() => {
		instance
			.get(`users/${user}`)
			.then((response) => setUserType(response.data));
	}, [user]);

	return userType;
}
