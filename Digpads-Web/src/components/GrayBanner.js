import React from 'react';
import {
	SSpan,
	Spacer,
	BannerIcon,
	BannerText,
	BannerTitle,
} from './styled/HomePage';

export default function GrayBanner({ image, text, title }) {
	return (
		<SSpan
			style={{
				backgroundImage: 'url(images/decorations/GrayBanner.png)',
			}}
		>
			<BannerIcon src={image} />
			<BannerTitle>{title}</BannerTitle>
			<BannerText>{text}</BannerText>
			<Spacer mx={2} pb={5} />
		</SSpan>
	);
}
