import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MyModal from './Modal';
import Auth from './Auth/Auth';
import { authContext } from '../contexts/AuthContext';

const SignInWrapper = ({ children, redirectURL = '/' }) => {
	const { auth } = useContext(authContext);

	if (auth.loading) {
		return <>loading</>;
	}

	return auth.authenticated ? (
		children
	) : (
		<MyModal noClose={true} display={true}>
			<div>
				<Auth redirectURL={redirectURL} />
			</div>
		</MyModal>
	);
};

export default SignInWrapper;
