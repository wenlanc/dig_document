import React from 'react';
import SuiInput from 'components/SuiInput';

export default function SearchBar({ filterText, onFilterTextChange }) {
	const handleFilterTextChange = (evt) => {
		const text = evt.target.value;
		onFilterTextChange(text);
	};

	return (
		<form style={{ width: '300px', marginBottom: '1em' }}>
			<SuiInput
				type='text'
				placeholder='Search'
				value={filterText}
				onChange={handleFilterTextChange}
			/>
		</form>
	);
}
