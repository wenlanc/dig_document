import * as React from 'react';
import SuiSelect from 'components/SuiSelect';

export default function SelectDisplayMethod({ onSelect }) {
	const options = [
		{ value: 'widget', label: 'Widget' },
		{ value: 'link', label: 'Link' },
		{ value: 'pop up', label: 'Pop Up' },
	];

	const handleChange = (option, actionType) => {
		if (actionType.action === 'select-option') {
			onSelect(option.value);
		}
	};

	return (
		<SuiSelect
			options={options}
			onChange={handleChange}
			placeholder='Select display method'
			isMulti={false}
		/>
	);
}
