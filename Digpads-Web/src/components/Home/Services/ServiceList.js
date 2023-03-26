import React from 'react';
import styled from 'styled-components';
import ServiceItem from './ServiceItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { device } from '../MediaSizes';

const StyledServiceList = styled.ul`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.service__title {
		font-weight: normal;
	}

	.service__title span {
		font-weight: bold;
	}
`;

export default function ServiceList({ services }) {
	const desktopMatch = useMediaQuery(device.laptop);

	const serviceItems = services.map((service) => (
		<ServiceItem
			key={service.title}
			image={desktopMatch ? getLargeImage(service.image) : service.image}
			title={service.title}
			description={service.description}
		/>
	));

	return <StyledServiceList>{serviceItems}</StyledServiceList>;
}

/**
 * @param {String} image - path to image
 * @returns path to large image
 * Eg: images/icons/BlueOutlineTools.png =>
 * images/icons/BlueOutlineTools@2x.png
 */
function getLargeImage(image) {
	const beforeExtension = image.indexOf('.');
	const imgWithoutExtension = image.slice(0, beforeExtension);
	const largeImg =
		imgWithoutExtension +
		'@2x' +
		image.slice(beforeExtension, image.length);

	return largeImg;
}
