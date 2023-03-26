import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function ProsCons({ color, type, title, header, lists }) {
	return (
		<Box>
			<Box bgcolor={color} borderRadius='8px 8px 0 0' py={1} px={2}>
				{' '}
				<Typography
					color='#fff'
					variant='h5'
					component='h2'
					fontWeight='bold'
				>
					{' '}
					{title}
				</Typography>
			</Box>
			<Box
				bgcolor='#fff'
				px={2}
				pt={2}
				pb={3}
				borderRadius='0 0 8px 8px'
				mb={2}
			>
				<Typography
					variant='h6'
					component='h3'
					fontWeight='bold'
					gutterBottom
					marginBottom='16px'
				>
					{' '}
					{header}
				</Typography>
				{lists.map((list, index) => (
					<Box
						display='flex'
						key={index}
						mb={index !== lists.length - 1 && 2}
					>
						<IconButton
							disableFocusRipple
							disableRipple
							disableTouchRipple
							disabled
							style={{
								padding: 4,
								background:
									type === 'pros' ? '#008f00' : '#ea5d43',
								marginRight: 8,
								height: '100%',
							}}
						>
							{title.toLowerCase() === 'pros' ? (
								<CheckIcon
									style={{
										height: 16,
										width: 16,
										color: '#fff',
									}}
								/>
							) : (
								<ClearIcon
									style={{
										height: 16,
										width: 16,
										color: '#fff',
									}}
								/>
							)}
						</IconButton>
						<Typography variant='body1'>{list}</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
}

export default ProsCons;
