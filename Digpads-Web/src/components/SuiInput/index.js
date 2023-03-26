/**
=========================================================
* Soft UI Dashboard PRO React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for SuiInput
import SuiInputRoot from './SuiInputRoot';
import SuiInputWithIconRoot from './SuiInputWithIconRoot';
import SuiInputIconBoxRoot from './SuiInputIconBoxRoot';
import SuiInputIconRoot from './SuiInputIconRoot';
import { useTheme, useMediaQuery } from '@mui/material';

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from 'contexts';

const SuiInput = forwardRef(
	({ icon, error, success, disabled, ...rest }, ref) => {
		let template;
		const [controller] = useSoftUIController();
		const { direction } = controller;
		const iconDirection = icon.direction;
		const size = useMediaQuery(useTheme().breakpoints.up('xxl'))
			? 'medium'
			: 'small';

		if (icon.component && icon.direction === 'left') {
			template = (
				<SuiInputWithIconRoot
					ref={ref}
					ownerState={{ error, success, disabled }}
				>
					<SuiInputIconBoxRoot ownerState={{ size }}>
						<SuiInputIconRoot
							fontSize='small'
							ownerState={{ size }}
						>
							{icon.component}
						</SuiInputIconRoot>
					</SuiInputIconBoxRoot>
					<SuiInputRoot
						{...rest}
						ownerState={{
							size,
							error,
							success,
							iconDirection,
							direction,
							disabled,
						}}
					/>
				</SuiInputWithIconRoot>
			);
		} else if (icon.component && icon.direction === 'right') {
			template = (
				<SuiInputWithIconRoot
					ref={ref}
					ownerState={{ error, success, disabled }}
				>
					<SuiInputRoot
						{...rest}
						ownerState={{
							size,
							error,
							success,
							iconDirection,
							direction,
							disabled,
						}}
					/>
					<SuiInputIconBoxRoot ownerState={{ size }}>
						<SuiInputIconRoot
							fontSize='small'
							ownerState={{ size }}
						>
							{icon.component}
						</SuiInputIconRoot>
					</SuiInputIconBoxRoot>
				</SuiInputWithIconRoot>
			);
		} else {
			template = (
				<SuiInputRoot
					{...rest}
					ref={ref}
					ownerState={{ size, error, success, disabled }}
				/>
			);
		}

		return template;
	}
);

// Setting default values for the props of SuiInput
SuiInput.defaultProps = {
	size: 'medium',
	icon: {
		component: false,
		direction: 'none',
	},
	error: false,
	success: false,
	disabled: false,
};

// Typechecking props for the SuiInput
SuiInput.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	icon: PropTypes.shape({
		component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
		direction: PropTypes.oneOf(['none', 'left', 'right']),
	}),
	error: PropTypes.bool,
	success: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default SuiInput;
