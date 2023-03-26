import React, { useState, useRef } from 'react';
import {
	TextField,
	Autocomplete,
	AutocompleteChangeReason,
} from '@mui/material';

import { instance as axios } from 'controllers/axios';

type Props = {
	onSelectContent: (content) => void;
};

export default function ContentSearchBar({ onSelectContent }: Props) {
	const [inputValue, setInputValue] = useState('');
	const [content, setContent] = useState([]);

	const [loadingContent, setLoadingContent] = useState(false);
	const delayRequestTimeout = useRef(null);

	const searchContent = (query) =>
		axios
			.get(`/search?q=${query}&entity=content`)
			.then((res) => {
				if (res.status === 200) {
					if (res.data) {
						return res.data;
					} else {
						throw 'no content data';
					}
				}
			})
			.catch((reason) => console.log(reason));

	const handleInputChange = (_, value) => {
		if (value === 'undefined') return;
		if (value === '') {
			setInputValue(value);
			return;
		}

		setInputValue(value);

		clearTimeout(delayRequestTimeout.current);
		delayRequestTimeout.current = setTimeout(async () => {
			setLoadingContent(true);

			const content = await searchContent(value);
			setContent(content);
			setLoadingContent(false);
		}, 1000);
	};

	const handleContentChange = (
		_,
		contentItem,
		reason: AutocompleteChangeReason
	) => {
		if (reason === 'selectOption') {
			onSelectContent(contentItem);
		}
	};

	return (
		<Autocomplete
			loading={loadingContent}
			filterOptions={(x) => x}
			onChange={handleContentChange}
			fullWidth
			options={content}
			inputValue={inputValue}
			onInputChange={handleInputChange}
			getOptionLabel={getContentOptionLabel}
			renderOption={(props, option, index) => {
				const key = `listItem-${index}-${option._id}`;
				return (
					<li {...props} key={key}>
						{getContentOptionLabel(option)}
					</li>
				);
			}}
			renderInput={(params) => (
				<TextField {...params} placeholder='Search content' />
			)}
		/>
	);
}

function getContentOptionLabel(content) {
	if (content.type === 'Article Comment' || content.type === 'Post Comment') {
		return content.content;
	} else {
		return content.title;
	}
}
