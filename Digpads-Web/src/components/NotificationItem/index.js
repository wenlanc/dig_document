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

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import { WatchLater } from '@mui/icons-material';
// custom styles for the NotificationItem
import { menuItem, menuImage } from './styles';
import { Typography } from '@mui/material';

const NotificationItem = forwardRef(
	({ color, image, title, date, subtitle, leading, ...rest }, ref) => (
		<MenuItem
			{...rest}
			ref={ref}
			sx={(theme) => menuItem(theme)}
			style={{
				justifyContent: 'space-between',
			}}
		>
			<SuiBox display={'flex'} justifyContent={'space-between'}>
				<SuiBox display={'flex'} alignItems={'center'}>
					<SuiBox
						width='2.25rem'
						height='2.25rem'
						mt={0.25}
						mr={2}
						mb={0.25}
						borderRadius='lg'
						sx={(theme) => menuImage(theme, { color })}
					>
						{image}
					</SuiBox>
				</SuiBox>
				<SuiBox>
					<SuiTypography
						variant='button'
						textTransform='capitalize'
						fontWeight='regular'
					>
						<strong>{title[0]}</strong> {title[1]}
					</SuiTypography>
				</SuiBox>
			</SuiBox>
			<SuiBox>
				<Typography component={'small'} variant={'small'} fontSize={14}>
					{subtitle}
				</Typography>
				<SuiTypography
					variant='caption'
					color={date.color}
					sx={{
						display: 'flex',
						alignItems: 'center',
						mt: 0.5,
					}}
				>
					<SuiTypography variant='button' color={date?.color}>
						<WatchLater
							sx={{
								lineHeight: 1.2,
								mr: 0.5,
								mt: 0.5,
							}}
						/>
					</SuiTypography>
					{date.text}
				</SuiTypography>
			</SuiBox>
		</MenuItem>
	)
);

// Setting default values for the props of NotificationItem
NotificationItem.defaultProps = {
	color: 'dark',
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error',
		'light',
		'dark',
	]),
	image: PropTypes.node.isRequired,
	title: PropTypes.arrayOf(PropTypes.string).isRequired,
	date: PropTypes.string.isRequired,
};

export default NotificationItem;
