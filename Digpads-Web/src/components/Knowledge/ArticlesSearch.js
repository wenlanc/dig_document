import React, { useState } from 'react';
import { TextField } from '@mui/material';

export default function ArticlesSearch({ onSubmit, page }) {
	const [query, setQuery] = useState('');

	function handleSubmit(evt) {
		evt.preventDefault();
		onSubmit(query);
	}

	const handleChange = (evt) => setQuery(evt.target.value);

	return (
		<>
			<form onSubmit={handleSubmit} style={{ marginLeft: 'auto' }}>
				{page === 'allOurArticles' ? (
					<TextField
						label='Search'
						variant='outlined'
						value={query}
						onChange={handleChange}
						style={{ display: 'block' }}
					/>
				) : (
					<TextField
						label='Search'
						variant='outlined'
						value={query}
						onChange={handleChange}
						style={{
							width: '230px',
							display: 'block',
						}}
					/>
				)}
			</form>
		</>
	);
}
