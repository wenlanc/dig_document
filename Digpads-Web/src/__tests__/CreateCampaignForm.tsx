import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import softUiTheme from 'assets/theme';

import CreateCampaignForm from 'components/ReviewsManagement/CreateCampaignForm';

import { SoftUIControllerProvider } from 'contexts';
import { assert } from 'console';

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui, renderOptions = {}) => {
	return render(
		<SoftUIControllerProvider>
			<MuiThemeProvider theme={softUiTheme}>{ui}</MuiThemeProvider>
		</SoftUIControllerProvider>,
		renderOptions
	);
};

test('user should be able to enter campaign name and description', () => {
	const props = {
		campaign: {
			name: 'super duper campaign',
			description: '',
		},
	};
	customRender(<CreateCampaignForm {...props} />);
	const nameInputEl = screen.getByRole('textbox', { name: /name/i });
});
