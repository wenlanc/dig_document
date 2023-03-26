import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const navigate = useNavigate();
	const isAdmin = localStorage.getItem('isAdmin');

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isAdmin ? <Component {...props} /> : <Navigate to='/' />
			}
		/>
	);
}

export default ProtectedRoute;
