import React, { useState } from 'react';
import _states from 'constants/states.min.json';

type State = {
	name: string;
	code: string;
};

export default function useStates() {
	const [states, setStates] = useState(
		Object.keys(_states).map((stateKey) => ({
			name: _states[stateKey].name,
			code: stateKey,
		}))
	);
	const [cities, setCities] = useState([]);
	const [zipCodes, setZipCodes] = useState([]);
	const [selectedState, setSelectedState] = useState<State>();
	const [selectedCity, setSelectedCity] = useState('');
	const [selectedZipCode, setSelectedZipCode] = useState('');

	function onChange(entity, value) {
		switch (entity) {
			case 'state':
				onSelectedStateChange(value);
				break;
			case 'city':
				onSelectedCityChange(value);
			default:
				break;
		}
	}

	function onSelectedStateChange(state) {
		setSelectedState(state);
		setCities(Object.keys(_states[state.code].cities)); // cities in the selected state
		setSelectedCity('');
	}

	function onSelectedCityChange(city) {
		setSelectedCity(city);
		setZipCodes(_states[selectedState.code].cities[city]); // zip codes in the selected city
	}

	return {
		states,
		cities,
		zipCodes,
		selectedState,
		selectedCity,
		selectedZipCode,
		onChange,
	};
}
