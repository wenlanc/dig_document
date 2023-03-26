import React from 'react';
import { instance, getCSRF } from '../controllers/axios';

export default function useBusinessTags(config) {
	const [businessTags, setBusinessTags] = React.useState([]);

	const userType = config?.userType;

	async function fetchBusinessTags() {
		let url = `businessTags`;
		url = userType ? url + `/?userType=${userType}` : url;

		await getCSRF();
		try {
			instance
				.get(url)
				.then((response) => setBusinessTags(response.data));
		} catch (error) {
			console.error(`Error fetching business categories: ${error}`);
		}
	}

	const updateBusinessTags = (tags) => {
		patchBusinessTags(tags).then((newTags) => setBusinessTags(newTags));
	};

	const createBusinessTag = (tag) => {
		tag.custom = false;
		postBusinessTag(tag).then((newTag) => {
			console.log(newTag);
			console.log([...businessTags, newTag]);
			setBusinessTags([...businessTags, newTag]);
		});
	};

	React.useEffect(() => {
		fetchBusinessTags();
	}, []);

	return [
		businessTags,
		setBusinessTags,
		updateBusinessTags,
		createBusinessTag,
	];
}

async function postBusinessTag(tag) {
	try {
		return instance
			.post(`businessTags`, tag)
			.then((response) => response.data);
	} catch (error) {
		console.error(`Error creating business tag: ${error}`);
	}
}

async function patchBusinessTags(tags) {
	await getCSRF();
	try {
		instance.patch(`businessTags`, tags).then((response) => response.data);
	} catch (error) {
		console.error(`Error fetching business categories: ${error}`);
	}
}
