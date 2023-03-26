/**
 * This component allows you to pick a USA state and/or city from
 * a dropdown and add it to the favorited list
 */

import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
	Checkbox,
	InputLabel,
	TextField,
	FormControlLabel,
	Snackbar,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import usaStates from '../constants/usaStates';
import usaCities from '../constants/usaCities';
import styled from 'styled-components';
import { device } from './MediaSizes';

// #region Styles
const FilterContainer = styled.div`
	:nth-child(1) {
		margin-right: 1em;
	}

	@media screen and ${device.tablet} {
		display: flex;
		flex-direction: column;
	}

	@media screen and ${device.laptop} {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
	}
`;
// #endregion Styles

const ErrorAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CommunityFilter(props) {
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [stateCities, setStateCities] = useState([]);
	const [alert, setAlert] = useState(false);

	const [communityAdded, setCommunityAdded] = useState(false);

	const handleClose = () => {
		setAlert(false);
	};

	function handleStateChange(e, value, reason) {
		if (reason === 'clear') {
			setCity('');
			setState('');
			setStateCities([]);
			props.onChange(null, null, 'clear');
			return;
		}

		const stateName = value.name;

		if (reason === 'selectOption') {
			props.onChange(stateName);
			setCity('');
		}

		// set cities for the selected state
		let stateCities = usaCities.filter((c) => c.state === stateName);
		stateCities = stateCities.map((c) => c.city);
		// add empty option to remove warning
		stateCities.unshift('');

		setState(stateName);
		setStateCities(stateCities);
	}

	function handleCityChange(e, city, reason) {
		if (reason === 'selectOption') {
			setCity(city);
			props.onChange(state, city);
			return;
		}

		if (reason === 'clear') {
			setCity('');
			props.onChange(state, city);
		}
	}

	async function onCommunityAdded() {
		const added = await props.onAddFavoriteCommunity({ state, city });

		// display alert status message
		if (added) {
			setCommunityAdded(true);
			setTimeout(() => {
				setCommunityAdded(false);
				setState('');
			}, 6000);
		} else {
			setAlert(true);
		}
	}

	const defaultStatusLabel = 'Add this to your Favorited Communities?';
	const communityAddedStatusLabel = (
		<Alert severity='success'>Successfully added to favorites</Alert>
	);

	const statusLabel = communityAdded
		? communityAddedStatusLabel
		: defaultStatusLabel;

	const addCommunityPromptLabel = (
		<FormControlLabel
			label={statusLabel}
			labelPlacement='start'
			control={
				<Checkbox
					checked={communityAdded ? true : false}
					name='add-favorite-community'
					onChange={onCommunityAdded}
				/>
			}
		></FormControlLabel>
	);

	return (
		<>
			<InputLabel
				htmlFor='state-autocomplete'
				style={{ marginBottom: '0.5em' }}
			>
				Filter by location:
			</InputLabel>

			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{vertical:'bottom',horizontal:'center'}}
			>
				<ErrorAlert onClose={handleClose} severity='error'>
					Something went wrong, please try again later
				</ErrorAlert>
			</Snackbar>

			<FilterContainer>
				<Autocomplete
					options={usaStates}
					getOptionLabel={(option) => option.name}
					id='state-autocomplete'
					onChange={handleStateChange}
					style={{
						maxWidth: 400,
						marginBottom: '0.8em',
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label='State'
							variant='outlined'
						/>
					)}
				/>
				<Autocomplete
					options={stateCities}
					getOptionLabel={(city) => `${city}`}
					onChange={handleCityChange}
					value={city}
					disabled={stateCities.length === 0}
					style={{ maxWidth: '400px' }}
					renderInput={(params) => (
						<TextField
							{...params}
							label='City'
							variant='outlined'
						/>
					)}
				/>
			</FilterContainer>

			{/* Show if state is selected and the community is not in favorites */}
			{props.renderAddCommunityPrompt &&
				state !== '' &&
				!props.isInFavorites({ state, city }) &&
				addCommunityPromptLabel}
		</>
	);
}
