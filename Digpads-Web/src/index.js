import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Spinner from './components/Spinner';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import Store from './store/index';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SoftUIControllerProvider } from './contexts';

const history = createBrowserHistory();
// Soft UI Context Provider

const options = {
	timeout: 5000,
	position: positions.BOTTOM_CENTER,
	transition: transitions.SCALE,
};

ReactDOM.render(
	<AlertProvider template={AlertTemplate} {...options}>
		<AuthProvider>
			<Suspense
				fallback={
					<Box
						sx={{
							marginTop: '20vh',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Spinner type='circular' size={'12rem'} />
					</Box>
				}
			>
				<Provider store={Store}>
					<BrowserRouter history={history}>
						<SoftUIControllerProvider>
							<App className='global' />
						</SoftUIControllerProvider>
					</BrowserRouter>
				</Provider>
			</Suspense>
		</AuthProvider>
	</AlertProvider>,
	document.getElementById('root')
);
