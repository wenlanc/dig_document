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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// @mui material components
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SuiBox from '../SuiBox';

// Soft UI Dashboard PRO React base styles
import colors from 'assets/theme/base/colors';
import borders from 'assets/theme/base/borders';

function DataTableHeadCell({ width, children, sorted, align, ...rest }) {
	const { light } = colors;
	const { borderWidth } = borders;

	return (
		<SuiBox
			component='th'
			width={width}
			borderBottom={`${borderWidth[1]} solid ${light.main}`}
			py={1.5}
			px={3}
			sx={{ verticalAlign: 'bottom' }}
		>
			<SuiBox
				{...rest}
				position='relative'
				textAlign={align}
				color='primary'
				opacity={0.7}
				sx={({ typography: { size, fontWeightBold } }) => ({
					// fontSize: size.xxs,
					fontSize: 12,
					fontWeight: fontWeightBold,
					textTransform: 'uppercase',
					cursor: sorted && 'pointer',
					userSelect: sorted && 'none',
				})}
			>
				{children}
				{sorted && (
					<SuiBox
						position='absolute'
						top={0}
						right={align !== 'right' ? '16px' : 0}
						left={align === 'right' ? '-5px' : 'unset'}
						sx={({ typography: { size } }) => ({
							// fontSize: size.lg,
							fontSize: size.lg,
						})}
					>
						<SuiBox
							position='absolute'
							top={-6}
							ml={2}
							color={sorted === 'asce' ? 'text' : 'primary'}
							opacity={sorted === 'asce' ? 1 : 0.5}
						>
							<ArrowDropUpIcon />
						</SuiBox>
						<SuiBox
							position='absolute'
							ml={2}
							top={0}
							color={sorted === 'desc' ? 'text' : 'primary'}
							opacity={sorted === 'desc' ? 1 : 0.5}
						>
							<ArrowDropDownIcon />
						</SuiBox>
					</SuiBox>
				)}
			</SuiBox>
		</SuiBox>
	);
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
	width: 'auto',
	sorted: 'none',
	align: 'left',
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.node.isRequired,
	sorted: PropTypes.oneOf([false, 'none', 'asce', 'desc']),
	align: PropTypes.oneOf(['left', 'right', 'center']),
};

export default DataTableHeadCell;
