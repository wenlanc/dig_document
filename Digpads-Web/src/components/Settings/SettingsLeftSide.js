import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const settings = [
	{
		title: 'Forum',
	},
	{
		title: 'Favorited Communites',
	},
	{
		title: 'My Post & Comments',
	},
	{
		title: 'Preferences',
	},
];

export default function SettingsLeftSide({ currentElementIndexInViewport }) {
	const Root = styled.ul`
		& > div > li {
			margin-top: 2em;
		}

		& > div > li > a {
			color: rgba(0, 0, 0, 0.54);
		}
		& > div > li > a > .font-weight-bold {
			font-weight: bold !important;
		}
	`;

	return (
		<Root>
			<div>
				{settings.map((setting, i) => (
					<li key={setting.title}>
						<a href={`#${setting.title.toLowerCase().split(' ').join('-')}`}>
							<Typography
								className={
									currentElementIndexInViewport === i ? 'font-weight-bold' : ''
								}
								component='p'
							>
								{setting.title}
							</Typography>
						</a>
					</li>
				))}
			</div>
		</Root>
	);
}
