import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import AdminPanel from './AdminPanel';

export default function Admin() {
	const auth = useAuth();
	const isAdmin =
		auth.auth?.data?.email === 'andy@digpads.com' ||
		auth.auth?.data?.email === 'logos.slava@gmail.com';

	return isAdmin ? <AdminPanel /> : null;
}
