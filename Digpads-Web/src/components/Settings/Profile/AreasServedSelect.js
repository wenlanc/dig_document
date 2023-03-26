import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import usaCities from '../../../constants/usaCities';
import usaStates from '../../../constants/usaStates';

import SuiSelect from 'components/SuiSelect';

export default function AreasServedSelect({ onSelect }) {
	const [stateCities, setStateCities] = useState([]);
	const [city, setCity] = useState('');
	const [state, setState] = useState('');

	const handleStateChange = (state) => {
		const stateName = state.value;

		setCity('');
		setStateCities(getStateCities(stateName));
		setState(state.value);
	};

	const handleCityChange = (city) => {
		setCity(city.value);
		onSelect({ state: state, city: city.value });
	};

	return (
		<Stack direction='row' spacing={3} mb='1em'>
			<SuiSelect
				placeholder='State'
				options={usaStates.map((state) => ({
					value: state.name,
					label: `${state.name}(${state.abbreviation})`,
				}))}
				onChange={handleStateChange}
				value={{ value: state, label: state }}
				style={{
					maxWidth: 400,
					width: '50%',
				}}
			/>

			<SuiSelect
				placeholder='City'
				options={stateCities.map((city) => ({
					value: city,
					label: city,
				}))}
				onChange={handleCityChange}
				value={{ value: city, label: city }}
				disabled={stateCities?.length === 0}
				style={{ maxWidth: '400px', width: '50%' }}
			/>
		</Stack>
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
