import React, { createContext, useState, useEffect } from 'react';
import { instance } from '../controllers/axios';

import { UserType } from 'types';

export const authContext = createContext<AuthContext>(null);

interface AuthContext {
	auth: Auth;
	setAuthData: (data) => void;
}

interface Auth {
	loading: boolean;
	authenticated: boolean;
	data: {
		type: UserType;
		timezone: { name: string; offset: number; short: string };
		_id: string;
		username: string;
		email: string;
		displayUsername: boolean;
		name: string;
	};
}

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		loading: true,
		data: null,
		authenticated: false,
	});
	const setAuthData = (data) => {
		setAuth(data);
	};
	useEffect(() => {
		localStorage.removeItem('isAdmin');
		instance
			.get('getAuth')
			.then((res) => {
				setAuth({
					loading: false,
					data: res.data,
					authenticated: true,
				});
				// Is Admin user?
				if (
					res?.data?.email === 'logos.slava@gmail.com' ||
					res?.data?.email === 'andy@digpads.com'
				) {
					localStorage.setItem('isAdmin', 'true');
				}
			})
			.catch(() => {
				console.log('error in getAuth');
				setAuth({
					loading: false,
					data: null,
					authenticated: false,
				});
			});
	}, []);
	return (
		<authContext.Provider value={{ auth, setAuthData }}>
			{children}
		</authContext.Provider>
	);
};

export function useAuth() {
	const context = React.useContext<AuthContext>(authContext);

	if (!context) {
		throw Error(`useAuth must be used within AuthProvider`);
	}

	const { auth, setAuthData } = context;

	return { auth, setAuthData };
}

export default AuthProvider;
