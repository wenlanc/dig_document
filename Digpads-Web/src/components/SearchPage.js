import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { instance } from '../controllers/axios';

import { device } from './MediaSizes';
import Header from './Nav/Header';
import Spinner from './Spinner';
import { SearchUtils } from '../utils';
import Footer from './Footer';
import ProfileCard from 'components/Marketplace/ProfileCard';
import { transformProfiles } from 'controllers/marketplaceProfile';

import {
	FormControl,
	InputAdornment,
	InputLabel,
	Input,
	IconButton,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Container,
	Typography,
	Box,
} from '@mui/material';

import {
	SearchResults,
	SearchList,
	SearchItem,
	SearchImg,
	SearchContent,
	SearchItemTitle,
	PublicationDate,
	Contributor,
	SearchBox,
	StyledSearchIcon,
} from './styled/Search';

// #region StyledComponents
const StyledFormControl = styled(FormControl)`
	display: block;
	text-align: center;
`;

const SubmitButton = styled(Button)`
	text-transform: capitalize;
	margin-bottom: 1em;
`;

const Filter = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 1em;
`;

const PageTitle = styled(Typography).attrs(() => ({
	variant: 'h5',
}))`
	font-weight: ${(props) => props.theme.fontNormal};
	margin-bottom: 0.5em;

	@media screen and ${device.tablet} {
		padding-left: 14px;
	}
`;

// #endregion StyledComponents

export default function Search() {
	const [results, setResults] = useState({ articles: [], posts: [] });
	const [isLoading, setIsLoading] = useState(false);

	const articleTitleMaxCharacters = 55;

	const search = useLocation().search;
	const [query, setQuery] = useState(new URLSearchParams(search).get('q'));
	const [searchTitle, setSearchTitle] = useState({
		message: '',
		query: query,
	});

	const [filter, setFilter] = React.useState({
		all: true,
		posts: false,
		articles: false,
		profiles: false,
	});

	const handleChange = (event) => {
		switch (event.target.name) {
			case 'all':
				setFilter({
					all: true,
					posts: false,
					articles: false,
					profiles: false,
				});
				break;
			case 'posts':
				setFilter({ ...filter, all: false, posts: !filter.posts });
				break;
			case 'articles':
				setFilter({ ...filter, all: false, articles: !filter.articles });
				break;
			case 'profiles':
				setFilter({ ...filter, all: false, profiles: !filter.profiles });
				break;
			default:
				console.error(`Invalid filter: ${event.target.name}`);
				break;
		}
	};

	const getArticles = React.useCallback(async () => {
		setIsLoading(true);

		let searchQuery = SearchUtils.unfoldCityAbbreviation(query);

		const response = await instance.get('search', {
			params: {
				q: searchQuery,
				entity: getSearchEntity(filter),
			},
		});

		if (response.status === 200) {
			if (
				response.data.articles.length > 0 ||
				response.data.posts.length > 0 ||
				response.data.profiles.length > 0
			) {
				setSearchTitle({ message: 'Search results:' });
			} else {
				setSearchTitle({
					message: `Sorry, we coudn't find anything for `,
					query: searchQuery,
				});
			}

			setResults(response.data);
		}

		setIsLoading(false);
	}, [query, filter]);

	React.useEffect(() => {
		getArticles();
	}, [getArticles]);

	return (
		<>
			<Header />

			<SearchBox maxWidth='md'>
				<StyledFormControl variant='outlined'>
					<InputLabel htmlFor='query-input' />
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						id='query-input'
						type='text'
						endAdornment={
							<InputAdornment position='end'>
								<SubmitButton
									type='submit'
									onClick={() => getArticles()}
									variant='contained'
									color='primary'
									endIcon={<ArrowRightAltIcon style={{ fontSize: '1.5em' }} />}
								>
									Search
								</SubmitButton>
							</InputAdornment>
						}
						startAdornment={
							<InputAdornment position='start' style={{ marginRight: '0' }}>
								<IconButton aria-label='search icon' size='large'>
									<StyledSearchIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
				</StyledFormControl>
			</SearchBox>

			<Filter>
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								checked={filter.all}
								onChange={handleChange}
								name='all'
								color='primary'
							/>
						}
						label='All'
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={filter.posts}
								onChange={handleChange}
								name='posts'
								color='primary'
							/>
						}
						label='Posts'
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={filter.articles}
								onChange={handleChange}
								name='articles'
								color='primary'
							/>
						}
						label='Articles'
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={filter.profiles}
								onChange={handleChange}
								name='profiles'
								color='primary'
							/>
						}
						label='Profiles'
					/>
				</FormGroup>
			</Filter>

			{isLoading ? (
				<Box
					sx={{
						marginTop: '20vh',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Spinner type='circular' size={'12rem'} />
				</Box>
			) : (
				<SearchResults>
					<Container maxWidth='md'>
						<PageTitle>
							{searchTitle.message}
							{searchTitle.query ? (
								<span style={{ fontWeight: 'bold' }}>{searchTitle.query}</span>
							) : (
								''
							)}
						</PageTitle>

						<SearchList>
							{(filter.all || filter.articles) &&
								results?.articles?.map((article, i) => (
									<SearchItem key={i}>
										<Link to={'/article/' + article.urlSlug}>
											<SearchImg>
												<img
													src={
														article.image
															? article.image
															: 'https://placekitten.com/625/330'
													}
													alt='Search image'
												/>
											</SearchImg>
										</Link>
										<SearchContent>
											<PublicationDate>{article.published_at}</PublicationDate>
											<Link to={'/article/' + article.urlSlug}>
												<SearchItemTitle>
													<span
														dangerouslySetInnerHTML={{
															__html: truncate(
																article.title,
																articleTitleMaxCharacters
															),
														}}
													></span>
												</SearchItemTitle>
											</Link>
										</SearchContent>
									</SearchItem>
								))}

							{(filter.all || filter.posts) &&
								results?.posts?.map((post, i) => (
									<SearchItem key={i}>
										<SearchContent>
											<PublicationDate>
												{new Date(post.createdAt).toDateString()}
											</PublicationDate>
											<Link to={`/post/${post.slug}`}>
												<SearchItemTitle>{post.title}</SearchItemTitle>
											</Link>

											<Contributor>
												<div className='contributor__img'>
													<img
														src={
															post.author.profilePicUrl
																? post.author.profilePicUrl
																: 'https://placekitten.com/50/50'
														}
														alt='Contributor image'
													/>
												</div>
												<p className='contributor__name'>
													By {`${post.author.first} ${post.author.last}`}
												</p>
											</Contributor>
										</SearchContent>
									</SearchItem>
								))}

							{(filter.all || filter.profiles) &&
								transformProfiles(results?.profiles)?.map((profile, i) => (
									<SearchItem key={i}>
										<SearchContent>
											<ProfileCard key={i} {...profile} />
										</SearchContent>
									</SearchItem>
								))}
						</SearchList>
					</Container>
				</SearchResults>
			)}
			<Footer />
		</>
	);
}

function truncate(str, n) {
	return str.length > n ? str.substr(0, n - 1) + '&hellip;' : str;
}

function getSearchEntity(filter) {
	let entity = '';
	const entities = [];

	if (filter.all) {
		entities.push('all');
	}

	if (filter.posts) {
		entities.push('posts');
	}

	if (filter.articles) {
		entities.push('articles');
	}

	if (filter.profiles) {
		entities.push('profiles');
	}

	return entities.join(',');
}
