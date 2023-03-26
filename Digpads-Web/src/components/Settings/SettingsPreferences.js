import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const PREFIX = 'SettingsPreferences';

const classes = {
	title: `${PREFIX}-title`,
};

const Root = styled.section`
	margin-bottom: 5em;
	display: block;

	::before {
		content: '';
		display: block;
		height: 75px; /* fixed header height*/
		margin: -75px 0 0; /* negative fixed header height */
	}
`;

const StyledRoot = muiStyled(Root)(({ theme }) => ({
	[`& .${classes.title}`]: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.75em',
		},
	},
}));

export default function SettingsPreferences({ sectionRefs }) {
	return (
		<StyledRoot id='preferences' ref={sectionRefs}>
			<Typography
				color='textSecondary'
				variant='h5'
				component='h3'
				className={classes.title}
				style={{ marginBottom: '1.25em', fontWeight: 'bold' }}
			>
				Preferences
			</Typography>
		</StyledRoot>
	);
}
