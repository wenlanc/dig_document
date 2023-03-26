import React from 'react';
import { authContext } from '../../contexts/AuthContext';

export default function ProtectedComponent(props) {
	const {
		auth: { authenticated },
	} = React.useContext(authContext);
	return <>{authenticated && props.children}</>;
}
