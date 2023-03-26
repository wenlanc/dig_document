import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AuthorInfo({ author }) {
	return (
		<Stack
			direction='column'
			spacing={1}
			sx={{
				textAlign: { md: 'right' },
				alignItems: { md: 'flex-end' },
			}}
			mb='0.5em'
		>
			<Avatar
				src={author.avatar}
				alt={author.name}
				variant='rounded'
				sx={{ height: 70, width: 70 }}
			/>

			<Typography itemProp='author' sx={{ fontWeight: 'bold' }}>
				{author.name}
			</Typography>

			<Typography sx={{ color: 'gray' }}>Author</Typography>
		</Stack>
	);
}
