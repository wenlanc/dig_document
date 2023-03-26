import React from 'react';
import { Typography, Stack } from '@mui/material';

type Props = {
	title?: string;
	children: React.ReactNode;
};

export default function ProfileCardRow({ title = '', children }: Props) {
	return (
		<>
			{title && (
				<Typography
					sx={{
						fontWeight: '700',
					}}
					gutterBottom
				>
					{title}
				</Typography>
			)}

			<Stack direction='row' gap='1em' flexWrap='wrap'>
				{children}
			</Stack>
		</>
	);
}
