import React, { useState } from 'react';
import { Snackbar, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import usaStates from '../constants/usaStates';
import usaCities from '../constants/usaCities';
import { instance as axios } from '../controllers/axios';

const USAStates = usaStates.map((state) => state.name);

//#region styles
const StyledFavoriteCommunity = styled.div`
	display: flex;
	margin-bottom: 1em;

	&:last-child {
		margin-bottom: 0;
	}
`;
//#endregion styles

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FavoriteCommunity(props) {
	const [city, setCity] = useState(props.city || '');
	const [state, setState] = useState(props.state || '');
	const [stateCities, setStateCities] = useState(
		props.state ? getStateCities(props.state) : []
	);
	const [alert, setAlert] = useState(false);

	const handleClose = () => {
		setAlert(false);
	};

	const handleStateChange = async (e, value, reason) => {
		const stateName = value;

		if (reason === 'clear') {
			updateCommunity('delete', {
				community: {
					id: props.id,
				},
			});
			setCity('');
			setState('');
			setStateCities([]);
			return;
		}

		if (reason === 'selectOption') {
			updateCommunity('patch', {
				community: {
					id: props.id,
					state: stateName,
				},
			});
			setCity('');
		}

		setStateCities(getStateCities(stateName));

		setState(stateName);
	};

	const handleCityChange = (e, value, reason) => {
		if (reason === 'selectOption') {
			updateCommunity('patch', {
				community: {
					id: props.id,
					city: value,
					state: state,
				},
			});
			setCity(value);
		}

		if (reason === 'clear') {
			updateCommunity('patch', {
				community: {
					id: props.id,
					city: '',
					state: state,
				},
			});
			setCity('');
		}
	};

	const updateCommunity = async (method, data) => {
		const request = method === 'patch' ? axios.patch : axios.delete;

		const url =
			method === 'patch'
				? `favoriteCommunities`
				: `favoriteCommunities/${data.community.id}`;

		const result = await request(url, data);

		if (result.status === 200) {
			props.onChange(props.id);
		} else {
			setAlert(true);
		}
	};

	return (
		<StyledFavoriteCommunity>
			<Autocomplete
				value={state}
				options={USAStates}
				getOptionLabel={(option) => option}
				onChange={handleStateChange}
				style={{
					width: 300,
					marginRight: '1em',
					marginBottom: '0.8em',
				}}
				renderInput={(params) => (
					<TextField {...params} label='State' variant='outlined' />
				)}
			/>
			<Autocomplete
				value={city}
				options={stateCities}
				getOptionLabel={(city) => `${city}`}
				onChange={handleCityChange}
				style={{ width: 300 }}
				renderInput={(params) => (
					<TextField {...params} label='City' variant='outlined' />
				)}
			/>
			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{vertical:'bottom',horizontal:'center'}}
			>
				<Alert onClose={handleClose} severity='error'>
					Woops, something went wrong. Please try again later
				</Alert>
			</Snackbar>
		</StyledFavoriteCommunity>
	);
}

/** gets state cities for the specified state */
const getStateCities = (state) => {
	let stateCities = usaCities.filter((c) => c.state === state);
	stateCities = stateCities.map((c) => c.city);

	// add empty option to remove warning
	stateCities.unshift('');

	return stateCities;
};
