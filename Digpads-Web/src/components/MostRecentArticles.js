import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledContainer, HeadingGrid } from './styled/Feed';
import { Avatar, Grid } from '@mui/material';
import removeMd from 'remove-markdown';

//currently retriving recent posts
export default function PopularPosts(props) {
	const [articles, setArticles] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		try {
			if (props.data !== undefined) {
				setArticles(props.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, [props.data]);

	return (
		<>
			<StyledContainer container>
				<HeadingGrid item container justify='space-between'>
					<Grid item>Most recent articles</Grid>
				</HeadingGrid>
				{articles?.length > 0 ? (
					<Grid item container direction='column' style={{ padding: '1em' }}>
						{articles.slice(0, 5).map((oneArticle, key) => (
							<Post article={oneArticle} key={key} history={props.history} />
						))}
					</Grid>
				) : (
					<div>No recent articles </div>
				)}
			</StyledContainer>
		</>
	);
}

function Post({ article }) {
	return (
		<Grid
			container
			spacing={2}
			style={{ marginBottom: '0.1rem' }}
			onClick={() => {
				navigate(`/article/${article.urlSlug}`);
			}}
		>
			<Grid item>
				<Avatar src={article.image} />
			</Grid>
			<Grid item xs>
				<h4 style={{ padding: 0, margin: 0 }}>{article.title}</h4>
				{article.content && article.content.length > 20
					? `${removeMd(article.content.substring(0, 50))}...`
					: removeMd(article.content)}
			</Grid>
		</Grid>
	);
}
