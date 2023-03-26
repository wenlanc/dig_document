import React, { useContext } from 'react';
import { authContext } from '../contexts/AuthContext';
import MyModal from './Modal';
import Auth from './Auth/Auth';
import { Route } from 'react-router-dom';

export default function PrivateRoute({
	component,
	redirectURL = '/',
	...rest
}) {
	const { auth } = useContext(authContext);
	const Component = component;

	if (auth.loading) {
		return <>loading</>;
	}

	return (
		<Route
			render={(props) =>
				auth.authenticated ? (
					<Component {...props} />
				) : (
					<MyModal noClose={true} display={true}>
						<div>
							<Auth redirectURL={redirectURL} />
						</div>
					</MyModal>
				)
			}
		/>
	);
}
