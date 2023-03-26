import React from 'react';
import {
	Typography,
	Avatar,
	Grid,
	Breadcrumbs,
	useMediaQuery,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { HeadingGrid, StyledContentBox } from './styled/Feed';
import { deepOrange } from '@mui/material/colors';

export default function OneFeedPost(props) {
	const md = useMediaQuery('(min-width: 960px)');

	const truncate = (source, size) => {
		const index = source.indexOf(' ', size);
		if (source.length < size || index < 0) return source;
		else return source.slice(0, index) + ' ...';
	};

	return (
		<>
			<HeadingGrid container>
				<Grid item>
					<Avatar
						alt='user profile'
						src={props.post.author.profilePicUrl}
						style={{
							backgroundColor: deepOrange[500],
							height: '2.7rem',
							width: '2.7rem',
						}}
					></Avatar>
				</Grid>
				<Grid item xs={9} md={6} style={{ marginLeft: '1em' }}>
					<Typography variant='h5' component='h5'>
						{props.post.title}
					</Typography>
					<Typography
						variant='subtitle2'
						color='textSecondary'
						component='p'
					>
						{`${props.post.author.first} ${props.post.author.last}`}
					</Typography>
				</Grid>

				<Breadcrumbs
					style={{ paddingTop: '8px' }}
					separator={<NavigateNextIcon fontSize='small' />}
				>
					{props.post?.state?.name ? (
						<Typography>{props.post?.state?.name}</Typography>
					) : (
						''
					)}
					{props.post?.city?.name ? (
						<Typography>{props.post?.city?.name}</Typography>
					) : (
						''
					)}
					<Typography> {props.post.category}</Typography>{' '}
				</Breadcrumbs>
			</HeadingGrid>

			<HeadingGrid container>
				<StyledContentBox>
					<Typography
						variant='subtitle2'
						color='textSecondary'
						component='p'
					>
						{truncate(props.post.content, 250)}
					</Typography>
				</StyledContentBox>
				<img src={props.post?.images && props.post.images[0]} alt='' />
			</HeadingGrid>
		</>
	);
}
