import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from 'contexts/muiTheme';
import styledComponentsTheme from 'contexts/styledComponentsTheme';

import {
	StyledEngineProvider,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

import softUiTheme from 'assets/theme';
import SignInWrapper from 'components/SignInWrapper';
import { routes, softUIThemedRoutes } from './routes';
import './global.css';

const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

const GlobalStyle = createGlobalStyle`
    ul {
        list-style: none;
        padding: 0;
    }

    img {
        max-width: 100%;
    }

    // ===== Material UI overrides =====
    .MuiTimelineItem-missingOppositeContent:before {
        display: none;
    }

    .MuiButton-containedPrimary {
        font-weight: bold;
        border-radius: 0.45em;
        padding: 0.6em 1.5em 0.6em 1.5em;
    }

    .MuiButton-containedWarning {
        font-weight: bold;
        padding: 0.6em 1.5em 0.6em 1.5em;
    }

    .MuiButton-endIcon {
		background: rgba(255, 255, 255, 0.15);
		border-radius: 0.3em;
		margin-left: 1.25em;
	}
    
    a {
        text-decoration: none;
    }

    body {
        font-family: 'Montserrat';
    }
`;

const App = () => {
	return (
		<>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={styledComponentsTheme}>
					<CssBaseline />
					<GlobalStyle />
					<ScrollToTop />

					{/* Routes that user Soft UI theme */}
					<MuiThemeProvider theme={softUiTheme}>
						<Routes>
							{softUIThemedRoutes.map((route, i) => (
								<Route
									path={route.path}
									element={
										route.private ? (
											<SignInWrapper redirectURL={route.path}>
												<route.component />
											</SignInWrapper>
										) : (
											<route.component />
										)
									}
									key={i}
								>
									{route.children &&
										route.children.map((childRoute, i) => (
											<Route
												path={childRoute.path}
												element={<childRoute.component />}
												key={i}
											/>
										))}
								</Route>
							))}
						</Routes>
					</MuiThemeProvider>

					{/* Routes that use Material UI theme */}
					<MuiThemeProvider theme={muiTheme}>
						<Routes>
							{routes.map((route, i) => (
								<Route
									path={route.path}
									element={<route.component />}
									key={i}
								/>
							))}
						</Routes>
					</MuiThemeProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</>
	);
};

export default App;
