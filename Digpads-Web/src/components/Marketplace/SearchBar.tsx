import React from 'react';
import SuiInput from 'components/SuiInput';

type Props = {
	filterText: string;
	onFilterTextChange: (text: string) => void;
};

export default function SearchBar({ filterText, onFilterTextChange }: Props) {
	const [state, setState] = React.useState(filterText);
	const timeoutRef = React.useRef(null);

	const handleFilterTextChange = (evt) => {
		setState(evt.target.value);

		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			onFilterTextChange(evt.target.value);
		}, 1000);
	};

	return (
		<form id='search-form' style={{ width: '300px' }}>
			<SuiInput
				sx={{ height: '100% !important' }}
				type='text'
				placeholder='Search'
				value={state}
				onChange={handleFilterTextChange}
				size='large'
			/>
		</form>
	);
}
