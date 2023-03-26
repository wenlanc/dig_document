import React, { useEffect, useState, useRef } from 'react';
import OneFeedPost from 'components/OneFeedPost';
import Spinner from 'components/Spinner';
import FeedCategory from 'components/LandlordForum/FeedCategory';

import {
	getFeedPosts,
	getMostRecentArticles,
} from '../controllers/FeedController';

import {
	StyledPaper,
	StickySpan,
	CreatePostTextContainer,
	StyledCategoryMessage,
	StyledContainer,
	StyledLink,
} from 'components/styled/Feed';

import { StyledButton } from 'components/styled/FormStyle';
import PopularPosts from 'components/PopularPosts';
import MyModal from 'components/Modal';
import ForumSearch from 'components/ForumSearch';
import CreatePost from './posts/CreatePost';
import Post from './posts/Post';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import HouseIcon from '@mui/icons-material/House';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AppsIcon from '@mui/icons-material/Apps';
import GavelIcon from '@mui/icons-material/Gavel';
import ViewListIcon from '@mui/icons-material/ViewList';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HomeIcon from '@mui/icons-material/Home';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';

import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { authContext } from '../contexts/AuthContext';
import Auth from 'components/Auth/Auth';
import PostIcon from './posts/PostIcon';
import MuiAlert from '@mui/material/Alert';
import { instance } from '../controllers/axios';
import MostRecentArticles from 'components/MostRecentArticles';
import CommunityFilter from 'components/CommunityFilter';
import FavoriteCommunity from 'components/FavoriteCommunity';
import CommentField from 'components/CommentField';
import { PageTitle, Banner } from 'components/styled/Page';
import {
	Grid,
	Container,
	useMediaQuery,
	Hidden,
	Box,
	Snackbar,
	Modal,
	Button,
} from '@mui/material';
import SearchTable from 'components/SearchTable';
import FavCommunityButtons from 'components/FavCommunityButtons';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Feed() {
	const [latestPosts, setLatestPosts] = useState('');
	const [popularPosts, setPopularPosts] = useState('');
	const [searchedPosts, setSearchedPosts] = useState([]);
	const [mostRecentArticles, setMostRecentArticles] = useState('');
	const [openModal, setOpen] = useState(false);
	const [onePostDisplay, setOnePostDisplay] = useState(false);
	const { auth } = React.useContext(authContext);
	const [openAuthModal, setOpenAuthModal] = useState(false);
	const [multipleCategories, setMultipleCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [favoriteCommunities, setFavoriteCommunities] = useState([]);
	const matches = useMediaQuery('(min-width:960px)');
	const [error, setError] = useState({});
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchedValue, setSearchedValue] = useState('');
	const [categoriesExpanded, setCategoriesExpanded] = useState(false);
	const [popularPostsExpanded, setPopularPostsExpanded] = useState(false);
	const [targetPost, setTargetPost] = useState('');
	const [ads, setAds] = useState([]);
	const [favChosen, setFavChosen] = useState(false);
	const [selectedComm, setSelectedComm] = useState([]);
	const currentAdIndex = useRef(0);

	let myArray = [];

	function getCurrentAd() {
		return ads[currentAdIndex.current];
	}

	function nextAd() {
		if (currentAdIndex.current === ads.length - 1) {
			currentAdIndex.current = 0;
		} else {
			currentAdIndex.current++;
		}
	}

	const [mostRecentArticlesExpanded, setMostRecentArticlesExpanded] =
		useState(false);

	const xsUp = useMediaQuery('(min-width: 600px)');
	const mdUp = useMediaQuery('(min-width: 960px)');

	function modalControl() {
		setOpen(!openModal);
	}

	function authModalControl() {
		setOpenAuthModal(!openAuthModal);
	}

	function changeDisplay() {
		setOnePostDisplay(false);
	}

	async function setPosts() {
		let recentPosts = await getFeedPosts();
		setLatestPosts(recentPosts);
		setPopularPosts(recentPosts);
		setIsLoading(false);
		setFavChosen(false);
		setSelectedComm([]);
		myArray = [];
	}

	async function setRecentArticles() {
		let recentArticles = await getMostRecentArticles();

		setMostRecentArticles(recentArticles);

		setIsLoading(false);
	}

	const handleReply = (id) => {
		setTargetPost(id);
	};

	const handleSearchClose = () => {
		setSearchOpen(false);
	};

	useEffect(() => {
		setPosts();
		setRecentArticles();

		// fetch and set ads
		instance
			.get(process.env.REACT_APP_STRAPI_API_URL + '/landlord-forum-ads')
			.then((response) => {
				if (response.status === 200) {
					setAds(response.data);
				} else {
					console.error(`couldn't load ads`);
				}
			});
	}, []);

	async function handleMultipleCategories(name) {
		let recentPosts = await getFeedPosts();
		let categories;
		if (name === 'Home') {
			setLatestPosts(recentPosts);
			setMultipleCategories([]);
		} else {
			categories = multipleCategories;

			if (categories.includes(name) === false) {
				categories.push(name);
				setMultipleCategories(categories);
				filterPosts(recentPosts, multipleCategories);
			}
		}
	}

	function filterPosts(recentPosts, categories) {
		let filteredPosts = [];
		categories.map((values) => {
			const filteredPost = recentPosts.filter(
				(item) => item.category === `${values}`
			);

			if (filteredPost.length !== 0) {
				filteredPost.map((value) => {
					filteredPosts.push(value);
				});
			}
		});
		setLatestPosts(filteredPosts);
	}

	function handleClose() {
		setError({});
	}

	async function unselectCategory(name) {
		let recentPosts = await getFeedPosts();
		const filteredCategories = multipleCategories.filter(
			(category) => category !== name
		);
		if (filteredCategories.length === 0) {
			setMultipleCategories(filteredCategories);
			setLatestPosts(recentPosts);
		} else {
			setMultipleCategories(filteredCategories);
			filterPosts(recentPosts, filteredCategories);
		}
	}

	async function pushIntoLatestPosts(state, city, index) {
		let arr = await getPostsByLocation(state, city);
		if (index === 0) {
			myArray = [...arr];
		} else {
			myArray = myArray.concat(arr);
		}
		myArray = myArray.filter(
			(element, index, self) =>
				index === self.findIndex((t) => t._id === element._id)
		);
		setLatestPosts(myArray);
	}

	async function handleFilterChange(state, city, identity, reason) {
		if (reason === 'favoriteCommunity') {
			if (favChosen) {
				let indexFound = selectedComm.findIndex(
					(comm) => comm.identity === identity
				);
				let community = selectedComm;

				if (indexFound === -1) {
					let oneFavCommunity = {
						state: state,
					};
					if (city) {
						oneFavCommunity.city = city;
					}
					oneFavCommunity.identity = identity;
					setSelectedComm([...selectedComm, oneFavCommunity]);
					community = [...community, oneFavCommunity];
					community.forEach((element, index) =>
						pushIntoLatestPosts(element.state, element.city, index)
					);
				} else {
					community = selectedComm.filter(
						(element, index) => index != indexFound
					);
					setSelectedComm(community);

					if (community.length > 0) {
						community.forEach((element, index) =>
							pushIntoLatestPosts(
								element.state,
								element.city,
								index
							)
						);
					} else {
						setPosts();
					}
				}
			} else {
				setLatestPosts(await getPostsByLocation(state, city));
				const oneFavCommunity = {
					state: state,
				};
				if (city) {
					oneFavCommunity.city = city;
				}
				oneFavCommunity.identity = identity;
				setSelectedComm([...selectedComm, oneFavCommunity]);
			}
			setFavChosen(true);
		} else {
			setLatestPosts(await getPostsByLocation(state, city));
			setFavChosen(false);
		}
	}

	function getPostsByLocation(state, city) {
		let url = '/posts?';

		if (state) {
			url = url + `state=${state}`;
		}
		if (city) {
			url = url + `&city=${city}`;
		}

		return instance.get(url).then((res) => {
			if (res.status === 200) {
				return res.data;
			} else {
				console.log(res.statusText);
				return [];
			}
		});
	}

	function isInFavorites(community) {
		const stateOnly = community.city === '';
		let inFavorites;

		const predicate = stateOnly
			? (c) => c.state === community.state && c.city === ''
			: (c) => c.state === community.state && c.city === community.city;

		inFavorites = favoriteCommunities.findIndex(predicate) !== -1;

		return inFavorites;
	}

	function fetchFavoritedCommunities() {
		if (auth.authenticated) {
			instance.get('favoriteCommunities').then((response) => {
				if (response.status === 200) {
					const favCommunities = response.data;
					console.log(favCommunities);
					if (favCommunities.length > 0) {
						setFavoriteCommunities(favCommunities);
					} else {
						// 	setFavoriteCommunities([]);
						// 	setPosts();
					}
				} else {
					console.log(response.statusText);
				}
			});
		} else {
			setFavoriteCommunities([]);
		}
	}

	async function handleArticleSearchInput(value) {
		// setLoading(true);
		setSearchedValue(value);
		const res = await instance.get(`search?q=${value}`);

		if (res.status === 200) {
			const { posts } = res.data;
			setSearchedPosts(posts);
			setSearchOpen(true);
		} else {
			console.error(res.statusText);
		}
	}

	return isLoading ? (
		<Grid container style={{ marginTop: '20vh' }} justifyContent='center'>
			<Spinner type='circular' size={'12rem'} />
		</Grid>
	) : (
		<>
			<MyModal display={openModal} modalControl={modalControl}>
				<div>
					<CreatePost setError={setError} />
				</div>
			</MyModal>

			<Banner>
				<PageTitle>Landlord Forum</PageTitle>
			</Banner>

			{/* == Second app bar (visible on mobile only) == */}
			<AppBar position='static' component={Box} display={{ md: 'none' }}>
				<Toolbar>
					<Hidden mdUp>
						<IconButton
							edge='start'
							aria-label='feed-categories'
							size='large'
							onClick={() => {
								setCategoriesExpanded(false);
								setMostRecentArticlesExpanded(false);
								setPopularPostsExpanded(false);
							}}
						>
							<HomeIcon
								color={
									categoriesExpanded ||
									mostRecentArticlesExpanded ||
									popularPostsExpanded
										? 'inherit'
										: 'primary'
								}
								fontSize='large'
							/>
						</IconButton>
					</Hidden>

					<Hidden smUp>
						<IconButton
							edge='start'
							aria-label='feed-categories'
							size='large'
							onClick={() => {
								setCategoriesExpanded((expanded) => !expanded);
								setMostRecentArticlesExpanded(false);
								setPopularPostsExpanded(false);
							}}
						>
							<AppsIcon
								color={
									categoriesExpanded ? 'primary' : 'inherit'
								}
								fontSize='large'
							/>
						</IconButton>
					</Hidden>

					<Hidden mdUp>
						<IconButton
							style={{ marginRight: '0.5em' }}
							edge='start'
							onClick={() => {
								setPopularPostsExpanded(
									(expanded) => !expanded
								);
								setMostRecentArticlesExpanded(false);
								setCategoriesExpanded(false);
							}}
							aria-label='popular-posts'
							size='large'
						>
							<ChatIcon
								color={
									popularPostsExpanded ? 'primary' : 'inherit'
								}
								fontSize='large'
							/>
						</IconButton>
					</Hidden>

					<Hidden mdUp>
						<IconButton
							style={{ marginRight: '0.5em' }}
							edge='start'
							onClick={() => {
								setMostRecentArticlesExpanded(
									(expanded) => !expanded
								);
								setPopularPostsExpanded(false);
								setCategoriesExpanded(false);
							}}
							aria-label='recent-articles'
							size='large'
						>
							<DescriptionIcon
								color={
									mostRecentArticlesExpanded
										? 'primary'
										: 'inherit'
								}
								fontSize='large'
							/>
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>
			{!auth.authenticated && !matches && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						height: '70px',
					}}
				>
					<StyledButton
						style={{ cursor: 'pointer', width: '150px' }}
						onClick={authModalControl}
						variant='contained'
						color='primary'
						type='submit'
						login='login'
					>
						Login
					</StyledButton>

					<MyModal
						display={openAuthModal}
						modalControl={authModalControl}
					>
						<div>
							<Auth />
						</div>
					</MyModal>
				</div>
			)}

			{/* == Container for categories, feed, popular posts and recent articles == */}
			<Container
				maxWidth='lg'
				style={{ padding: '12px', overflow: 'hidden' }}
			>
				<Grid container spacing={3}>
					{/* == Categories container (column #1) == */}
					<Grid
						style={{ paddingTop: '0', paddingBottom: '0' }}
						md={3}
						sm={4}
						item
						container
						direction='column'
					>
						<StickySpan>
							{/* User info if User logged in, Login prompt otherwise */}
							{/* User info if User logged in, Login prompt otherwise */}
							{/* Feed categories */}
							<Collapse
								in={xsUp ? true : categoriesExpanded}
								timeout={{ enter: 800, exit: 200 }}
							>
								<ul
									className='feed-categories'
									style={{ marginTop: '-1em' }}
								>
									{feedCategories.map((category, key) => (
										<FeedCategory
											key={key}
											name={category.name}
											icon={category.icon}
											handleMultipleCategories={
												handleMultipleCategories
											}
											unselectCategory={unselectCategory}
											isSelected={
												multipleCategories.length ===
													0 &&
												category.name === 'Home'
													? true
													: multipleCategories.includes(
															category.name
													  ) &&
													  category.name !== 'Home'
											}
										/>
									))}
								</ul>
							</Collapse>
						</StickySpan>
					</Grid>

					{/* Filter and post feed container (column #2) */}
					<Grid item md={6} sm={8}>
						<StyledPaper elevation={3}>
							{!onePostDisplay ? (
								''
							) : (
								<ArrowBackIcon
									style={{ cursor: 'pointer' }}
									onClick={changeDisplay}
								/>
							)}

							{/* Comminity/Location filter */}
							<div>
								{auth.authenticated ? (
									<CreatePostTextContainer
										onClick={modalControl}
										color='primary'
										variant='contained'
									>
										Create a Post
									</CreatePostTextContainer>
								) : (
									''
								)}

								{/* === Favorited Communities === */}
								{auth.authenticated && (
									<>
										<FavCommunityButtons
											handleFilterChange={
												handleFilterChange
											}
											setPosts={setPosts}
											favChosen={favChosen}
										/>
									</>
								)}

								<Box mb={2}>
									<CommunityFilter
										onChange={handleFilterChange}
										isInFavorites={isInFavorites}
										renderAddCommunityPrompt={
											favoriteCommunities.length !== 3
										}
									/>
								</Box>
							</div>

							{/* Post feed */}
							{!onePostDisplay ? (
								latestPosts.length !== 0 && ads.length !== 0 ? (
									latestPosts.map((data, i) => {
										return (
											<div key={i}>
												<StyledContainer>
													<StyledLink
														to={`/post/${data.slug}`}
														key={i}
													>
														<OneFeedPost
															post={data}
															key={i}
														/>
													</StyledLink>

													<PostIcon
														post={data}
														toLink={`/post/${data.slug}#comments`}
														targetPost={targetPost}
													/>
													{auth.authenticated && (
														<CommentField
															id={data._id}
															handleReply={(id) =>
																handleReply(id)
															}
														/>
													)}
												</StyledContainer>

												{(i + 1) % 3 === 0 && (
													<StyledContainer>
														<a
															style={{
																display:
																	'block',
															}}
															href={
																getCurrentAd()
																	?.link
															}
														>
															{getCurrentAd()
																.displayTextAd ? (
																<Typography
																	style={{
																		padding:
																			'1em',
																	}}
																>
																	{
																		getCurrentAd()
																			.TextAd
																	}
																</Typography>
															) : (
																<div className='ad-image'>
																	<img
																		style={{
																			width: '100%',
																		}}
																		src={
																			getCurrentAd()
																				?.image
																				.url
																		}
																	/>
																</div>
															)}
														</a>

														{nextAd()}
													</StyledContainer>
												)}
											</div>
										);
									})
								) : (
									<StyledCategoryMessage>
										No post found
									</StyledCategoryMessage>
								)
							) : (
								<Post />
							)}
						</StyledPaper>
					</Grid>

					{/* Popular posts and Most recent articles  (column #3) */}
					<Box
						component={Grid}
						order={mdUp ? 0 : -1}
						item
						md={3}
						spacing={1}
						container
						alignContent='flex-start'
						alignItems='flex-start'
						direction='column'
					>
						{!auth.authenticated && matches && (
							<div
								style={{
									height: '70px',
									marginBottom: '2em',
								}}
							>
								<StyledButton
									style={{
										cursor: 'pointer',
										fontSize: '1.3rem',
										width: '160px',
										padding: '5px',
										fontFamily: 'Montserrat',
										fontWeight: '600',
									}}
									onClick={authModalControl}
									variant='contained'
									color='primary'
									type='submit'
									login='login'
								>
									Login
								</StyledButton>

								<MyModal
									display={openAuthModal}
									modalControl={authModalControl}
								>
									<div>
										<Auth />
									</div>
								</MyModal>
							</div>
						)}

						<Collapse in={mdUp ? true : popularPostsExpanded}>
							<Grid item xs={12} style={{ marginBottom: 16 }}>
								<ForumSearch
									onSubmit={(value) =>
										handleArticleSearchInput(value)
									}
								/>
								<Modal
									open={searchOpen}
									onClose={handleSearchClose}
									aria-labelledby='modal-modal-title'
									aria-describedby='modal-modal-description'
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div>
										<SearchTable
											data={searchedPosts}
											value={searchedValue}
										/>
									</div>
								</Modal>
							</Grid>
							<Grid item>
								<PopularPosts data={popularPosts} />
							</Grid>
						</Collapse>
						<Collapse in={mdUp ? true : mostRecentArticlesExpanded}>
							<Grid item>
								<MostRecentArticles data={mostRecentArticles} />
							</Grid>
						</Collapse>
					</Box>
				</Grid>

				<Snackbar
					open={error?.category}
					autoHideDuration={6000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleClose} severity='error'>
						Must include a Category in post.
					</Alert>
				</Snackbar>
			</Container>
		</>
	);
}

const feedCategories = [
	{
		name: 'Home',
		icon: <HouseIcon />,
		key: 'home',
	},
	{
		name: 'Business & Economy',
		icon: <BusinessCenterIcon />,
		key: 'business',
	},
	{
		name: 'Laws and Regulations',
		icon: <GavelIcon />,
		key: 'laws',
	},
	{
		name: 'Service Recommendations',
		icon: <ViewListIcon />,
		key: 'service',
	},
	{
		name: 'Tenant Management',
		icon: <PermIdentityIcon />,
		key: 'tenant',
	},
	{
		name: 'Financing',
		icon: <MonetizationOnIcon />,
		key: 'financing',
	},
	{
		name: 'Property Management',
		icon: <HomeWorkIcon />,
	},
	{
		name: 'Innovation',
		icon: <TurnedInNotIcon />,
		key: 'innovation',
	},
	{
		name: 'Strategies',
		icon: <SettingsIcon />,
		key: 'strategies',
	},
	{
		name: 'Miscellaneous',
		icon: <BusinessIcon />,
		key: 'Miscellaneous',
	},
];
