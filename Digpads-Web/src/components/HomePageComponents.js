import React from 'react';
import {
	ServiceImage,
	ServiceImageCont,
	ServiceImageTitle,
	ServiceImageDesc,
	ServiceImageTextCont,
	ServiceRow,
} from './styled/HomePage';

import { DigpadsButton } from './styled/Button';

export function ServicesRow({ imageLeft, image, title, description }) {
	if (imageLeft) {
		return (
			<ServiceRow>
				<ServiceImageCont>
					<ServiceImage src={image} />
				</ServiceImageCont>
				<ServiceImageTextCont imageLeft={imageLeft}>
					<ServiceImageTitle imageLeft={imageLeft}>
						{title}
					</ServiceImageTitle>
					<p />
					<ServiceImageDesc imageLeft={imageLeft}>
						{description}
					</ServiceImageDesc>
					<DigpadsButton text='read more' imageLeft={imageLeft} />
				</ServiceImageTextCont>
			</ServiceRow>
		);
	} else {
		return (
			<ServiceRow>
				<ServiceImageTextCont imageLeft={imageLeft}>
					<ServiceImageTitle imageLeft={imageLeft}>
						{title}
					</ServiceImageTitle>
					<p />
					<ServiceImageDesc imageLeft={imageLeft}>
						{description}
					</ServiceImageDesc>
					<DigpadsButton text='read more' imageLeft={imageLeft} />
				</ServiceImageTextCont>
				<ServiceImageCont>
					<ServiceImage src={image} />
				</ServiceImageCont>
			</ServiceRow>
		);
	}
}
