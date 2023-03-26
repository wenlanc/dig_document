import React from 'react';
import SuiSelect from 'components/SuiSelect';

type Props = { label: string; options: string[]; onChange: (option) => void };

export default function SearchFilterItem({ label, options, onChange }: Props) {
	const selectOptions = options?.map((option) => ({
		value: option,
		label: option,
	}));

	return (
		<SuiSelect
			placeholder={label}
			options={selectOptions}
			onChange={(opt) => {
				onChange(opt.value);
			}}
			name={label}
		/>
	);
}
