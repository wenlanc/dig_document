import { createTheme } from '@mui/material/styles';

let muiTheme = createTheme({
	typography: {
		h1: {
			fontSize: '2rem',
			'@media screen and (min-width: 768px)': {
				fontSize: '3rem',
			},
			'@media screen and (min-width: 1024px)': {
				fontSize: '3.5rem',
			},
		},
	},

	palette: {
		primary: {
			main: '#0063c8',
			light: '#bcd6f0',
		},
		text: {
			secondary: 'rgb(52, 71, 103)',
		},
	},

	mixins: {
		toolbar: {
			minHeight: 56,
			'@media (min-width:0px) and (orientation: landscape)': {
				minHeight: 48,
			},
			'@media (min-width:600px)': {
				minHeight: 64,
			},
			'@media (min-width:1600px)': {
				minHeight: 120,
			},
		},
	},

	components: {
		MuiButton: {
			styleOverrides: {
				containedPrimary: ({ ownerState }) => ({
					...(ownerState.variant === 'contained' &&
						ownerState.color === 'primary' && {
							color: '#fff',
						}),
				}),
			},
		},
	},
});

export default muiTheme;
