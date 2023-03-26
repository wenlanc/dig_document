import React, { useRef } from 'react';
import { instance } from 'controllers/axios';

export default function useMarketplaceProfileName() {
	const timeoutRef = useRef(null);
	const [nameExists, setNameExists] = React.useState(null);

	const onMarketplaceProfileNameChange = (name) => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(async () => {
			const response = await instance.get(`/marketplaceProfiles/?name=${name}`);
			const profiles = response.data;

			if (profiles?.length > 0) {
				setNameExists(true);
			} else {
				setNameExists(false);
			}
		}, 1000);
	};

	return { onChange: onMarketplaceProfileNameChange, nameExists };
}
