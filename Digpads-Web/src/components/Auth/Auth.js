import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';

const StyledEmailStatus = styled.div`
	text-align: center;

	.MuiSvgIcon-root {
		font-size: 3rem;
	}
`;

// props.page should be same as key in home>authState keys
export default function AuthContainer(props) {
	const { redirectURL } = props;
	const [awaitingMessage, setAwaitingMessage] = useState('');
	const [authPage, setAuthPage] = useState(props ? props.page : 'Log In');

	const handleAwaitingEmail = (message) => {
		setAwaitingMessage(message);
	};

	if (awaitingMessage !== '') {
		return <EmailStatus message={awaitingMessage} />;
	}

	switch (authPage) {
		case 'Log In': {
			return (
				<Login
					setAuthPage={setAuthPage}
					redirectURL={redirectURL}
					onLoggedIn={props.onLoggedIn}
				/>
			);
		}
		case 'Sign Up': {
			return (
				<SignUp
					setAuthPage={setAuthPage}
					redirectURL={redirectURL}
					onSignup={handleAwaitingEmail}
				/>
			);
		}
		case 'ForgotPassword': {
			return (
				<ForgotPassword
					setAuthPage={setAuthPage}
					onResetPassword={handleAwaitingEmail}
				/>
			);
		}
		default: {
			return (
				<Login setAuthPage={setAuthPage} redirectURL={redirectURL} />
			);
		}
	}
}

function EmailStatus({ message }) {
	return (
		<StyledEmailStatus>
			<CheckIcon />
			<p>{message}</p>
		</StyledEmailStatus>
	);
}
