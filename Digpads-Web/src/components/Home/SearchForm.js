import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MuiAlert from '@mui/material/Alert';
import { device } from '../MediaSizes';

import {
	FormControl,
	InputAdornment,
	InputLabel,
	Input,
	IconButton,
	Button,
	Snackbar,
} from '@mui/material';

const SubmitButton = styled(Button)`
	text-transform: capitalize;

	@media screen and ${device.laptopXL} {
		font-size: 1.25rem;
		margin-right: 1em;
	}
`;

const ArticleInput = styled(Input)`
	background: #fff;
	border-radius: 8px;
	padding: 1em 0.9em 1em 0;
	&:before {
		display: none;
	}

	@media screen and ${device.laptopXL} {
		padding: 2em 0.5em 2em 0;

		input {
			font-size: 1.25rem;
		}
	}
`;

const StyledSearchIcon = styled(SearchIcon)`
	color: ${(props) => props.theme.primaryColor};

	font-size: 1.8rem;

	@media screen and ${device.laptopXL} {
		font-size: 2.5rem;
	}
`;

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function SearchForm({ className }) {
	const navigate = useNavigate();

	const [searchQuery, setSearchQuery] = React.useState('');
	const [alert, setAlert] = React.useState(false);

	const handleClose = () => {
		setAlert(false);
	};

	function handleSubmit(evt) {
		evt.preventDefault();

		if (searchQuery.length > 0) {
			navigate({
				pathname: '/search',
				search: `q=${searchQuery}`,
			});
		} else {
			setAlert(true);
		}
	}

	return (
		<>
			<form action='/search' onSubmit={handleSubmit}>
				<FormControl variant='outlined' className={className}>
					<InputLabel htmlFor='article-input' />
					<ArticleInput
						id='article-input'
						type='text'
						placeholder='Search articles'
						onChange={(evt) => setSearchQuery(evt.target.value)}
						endAdornment={
							<InputAdornment position='end'>
								<SubmitButton
									type='submit'
									variant='contained'
									color='primary'
									endIcon={
										<ArrowRightAltIcon
											style={{ fontSize: '1.5em' }}
										/>
									}
								>
									Search
								</SubmitButton>
							</InputAdornment>
						}
						startAdornment={
							<InputAdornment
								position='start'
								style={{ marginRight: '0' }}
							>
								<IconButton
									aria-label='search icon'
									size='large'
								>
									<StyledSearchIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
					<Snackbar
						open={alert}
						autoHideDuration={6000}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
					>
						<Alert onClose={handleClose} severity='warning'>
							Please enter a query
						</Alert>
					</Snackbar>
				</FormControl>
			</form>
		</>
	);
}
