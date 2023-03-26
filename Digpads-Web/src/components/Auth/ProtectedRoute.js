import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authContext } from '../../contexts/AuthContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
	// const isAuthenticated = localStorage.getItem('isAuthenticated');
	// console.log('this', isAuthenticated);
	const {
		auth: { authenticated },
	} = React.useContext(authContext);
	return (
		<Route
			{...restOfProps}
			render={(props) =>
				authenticated ? (
					<Component {...props} />
				) : (
					<Redirect to='/signin' />
				)
			}
		/>
	);
}

export default ProtectedRoute;
