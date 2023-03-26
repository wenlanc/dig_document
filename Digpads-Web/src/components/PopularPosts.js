import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledContainer, HeadingGrid } from './styled/Feed';
import { Avatar, Grid } from '@mui/material';

//currently retriving recent posts
export default function PopularPosts(props) {
	const [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		try {
			if (props.data) {
				const sorted = props.data.sort(function (a, b) {
					return (
						parseFloat(b.likes.length) - parseFloat(a.likes.length)
					);
				});
				if (sorted === null) {
					setPosts(sorted);
				} else {
					setPosts(props.data);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, [props.data]);

	return (
		<StyledContainer container>
			<HeadingGrid item container justify='space-between'>
				<Grid item>Popular Posts</Grid>
			</HeadingGrid>
			{posts.length !== 0 ? (
				<Grid
					item
					container
					direction='column'
					style={{ padding: '1em' }}
				>
					{posts.slice(0, 5).map((post, key) => (
						<Post post={post} key={key} />
					))}
				</Grid>
			) : (
				<div>No popular post </div>
			)}
		</StyledContainer>
	);
}

function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Grid
			container
			spacing={2}
			style={{ marginBottom: '0.1rem' }}
			onClick={() => {
				navigate(`/post/${post.slug}`);
			}}
		>
			<Grid item>
				<Avatar src={post.author.profilePicUrl} />
			</Grid>
			<Grid item xs>
				<h4 style={{ padding: 0, margin: 0 }}>{post.title}</h4>
				{post.content.length > 20
					? `${post.content.substring(0, 50)}...`
					: post.content}
			</Grid>
		</Grid>
	);
}
