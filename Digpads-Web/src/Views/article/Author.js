// import React, { useState, useEffect } from 'react';
// import { Grid } from '@mui/material';
// import { Typography, Avatar } from '@mui/material';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// export default function Author({ author, createdAt }) {
// 	const [createDate, setCreateDate] = useState('');

// 	useEffect(() => {
// 		const monthNames = [
// 			'January',
// 			'February',
// 			'March',
// 			'April',
// 			'May',
// 			'June',
// 			'July',
// 			'August',
// 			'September',
// 			'October',
// 			'November',
// 			'December',
// 		];
// 		const d = new Date(createdAt);
// 		setCreateDate(
// 			monthNames[d.getMonth()] +
// 				' ' +
// 				d.getDate() +
// 				', ' +
// 				d.getFullYear()
// 		);
// 	}, [createdAt]);

// 	return (
// 		<Grid container spacing={3}>
// 			<Grid item>
// 				<Avatar
// 					src={author.profilePicUrl}
// 					style={{ width: '80px', height: '80px' }}
// 				>
// 					{author.name[0]}
// 				</Avatar>
// 			</Grid>
// 			<Grid item>
// 				<Typography variant='h4'>{author.name}</Typography>
// 				<Typography variant='caption'>Author</Typography>
// 			</Grid>
// 			<Grid item>
// 				<Typography variant='h4'>{createDate}</Typography>
// 				<Typography variant='caption'>Posted On</Typography>
// 			</Grid>
// 			<Grid item>
// 				<div>
// 					<Grid container spacing={2} alignItems='center'>
// 						<Grid item>
// 							<Typography variant='h4'>Follow</Typography>
// 						</Grid>
// 						<Grid item>
// 							<ArrowRightAltIcon />
// 						</Grid>
// 					</Grid>
// 				</div>
// 			</Grid>
// 		</Grid>
// 	);
// }
