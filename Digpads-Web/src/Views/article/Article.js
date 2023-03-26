import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
	Typography,
	Container,
	FormControl,
	InputAdornment,
	InputLabel,
	IconButton,
	Snackbar,
	Alert as MuiAlert,
	Box,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { StyledSearchIcon, StyledInput } from 'components/styled/Search';
import Helmet from 'components/Helmet/Helmet';
import Slugify from '../../controllers/Slugify';
import HelmetOg from 'components/Helmet/HelmetOG';
import HelmetTwitter from 'components/Helmet/HelmetTwitter';
import Header from 'components/Nav/Header';
import Comments from './Comments';
import Footer from 'components/Footer';
import RelatedArticle from './RelatedArticle';
import { instance } from '../../controllers/axios';
import { SearchUtils } from '../../utils';

import {
	SearchResults,
	SearchList,
	SearchItem,
	SearchImg,
	SearchContent,
	SearchItemTitle,
	PublicationDate,
} from 'components/styled/Search';

import {
	Page,
	Wrapper,
	StyledContainer,
	Title,
	StyledArticle,
	UpperContainer,
	ArticleTitle,
	ArticleContent,
	ArticleMeta,
	ArticleSocial,
	ArticleImg,
	Styledimg,
	ThisPublicationDate,
	PageTitle,
	StyledCircularProgress,
} from 'components/styled/Article';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Article(props) {
	const shareUrl = `https://digpads.com/article/${props.urlSlug}`;
	const [alert, setAlert] = useState(false);
	const [truncateIndex, setTruncateIndex] = useState(0);
	const [articles, setArticles] = useState([]);
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [ads, setAds] = useState([]);
	const [searchTitle, setSearchTitle] = useState({
		message: '',
		query: query,
	});

	const articleTitleMaxCharacters = 55;

	//truncateIndex set to -1 if content is less than 200
	const truncate = (source) => {
		if (truncateIndex == -1) return source;
		return source.slice(0, truncateIndex + 1);
	};

	async function handleArticleSearchInput(value) {
		setLoading(true);
		setShowSearchResults(false);

		let searchQuery = SearchUtils.unfoldCityAbbreviation(value);

		const res = await instance.get(`search?q=${searchQuery}&entity=articles`);
		if (res.status === 200) {
			const _articles = res.data;
			setArticles(_articles);
			setShowSearchResults(true);
			setLoading(false);
		} else {
			console.error(res.statusText);
			setLoading(false);
		}
	}

	const onCopy = () => {
		setAlert(true);
	};

	const handleClose = () => {
		setAlert(false);
	};

	useEffect(() => {
		//For rendering portion of the content at the right side of the image
		if (props.content.length < 200) {
			setTruncateIndex(-1);
		} else {
			setTruncateIndex(props.content.indexOf('.', 200));
		}
		instance
			.post('pageView', { id: props._id, entity: 'article' })
			.then((res) => {
				if (res.status !== 200) {
					console.error(res.statusText);
				}
			});

		instance
			.get(process.env.REACT_APP_STRAPI_API_URL + '/article-ads')
			.then((res) => {
				if (res.status === 200) {
					setAds(res.data);
				} else {
					console.error(`couldn't load ads`);
				}
			});

		let url = window.location.href.split('#');
		let target = url[url.length - 1].toLowerCase();
		let element = document.getElementById(target);
		element && element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, []);

	return (
		<>
			<Helmet metas={props.metas} />
			<HelmetOg />
			<HelmetTwitter />
			<Page>
				<Header />
				<Wrapper>
					<main>
						{loading && <StyledCircularProgress />}

						{!loading && !showSearchResults && (
							<StyledContainer maxWidth='md'>
								<StyledArticle className='primary-article'>
									<ArticleTitle variant='h5' component='h1'>
										{props.title}
									</ArticleTitle>

									{props.subheader && (
										<Typography
											variant='h5'
											component='p'
											fontStyle='italic'
											paragraph
										>
											{props.subheader}
										</Typography>
									)}

									<ArticleMeta>
										<a href='#comments' style={{ color: 'inherit' }}>
											{props.comments ? props.comments.length : 'No'}
											&nbsp; comments&nbsp;
										</a>{' '}
										|
										<span>
											&nbsp;
											{props.category ? props.category.categoryName : ''}
											&nbsp;
										</span>
										|
										<span>
											&nbsp;Last updated:&nbsp;
											{props.updatedAt
												? new Date(props.updatedAt).toDateString()
												: ''}
										</span>
										<ArticleSocial>
											<ul className='social-icons'>
												<li>
													<TwitterShareButton
														url={shareUrl}
														quote={props.title}
														hashtag={`#${props.category?.categoryName}`}
													>
														<TwitterIcon />
													</TwitterShareButton>
												</li>
												<li>
													<LinkedinShareButton
														url={shareUrl}
														quote={props.title}
														hashtag={`#${props.category?.categoryName}`}
													>
														<LinkedInIcon />
													</LinkedinShareButton>
												</li>
												<li>
													<FacebookShareButton
														url={shareUrl}
														quote={props.title}
														hashtag={`#${props.category?.categoryName}`}
													>
														<FacebookIcon />
													</FacebookShareButton>
												</li>
												<li>
													<CopyToClipboard onCopy={onCopy} text={shareUrl}>
														<BookmarkBorderIcon />
													</CopyToClipboard>
												</li>
											</ul>
										</ArticleSocial>
										<Snackbar
											open={alert}
											autoHideDuration={6000}
											onClose={handleClose}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'center',
											}}
										>
											<Alert onClose={handleClose} severity='success'>
												Link is copied to your clipboard!
											</Alert>
										</Snackbar>
									</ArticleMeta>

									<UpperContainer
										textAlongsideImage={props.displayTextAlongsideImage}
									>
										<ArticleImg className='article-img'>
											<Styledimg
												style={{
													width:
														props.displayTextAlongsideImage?.toString() ===
														'true'
															? '100%'
															: '50%',
												}}
												src={
													props.image
														? props.image
														: '../images/uploads/Toy-house-money.png'
												}
												alt='Article image'
											/>

											<ThisPublicationDate>
												<time>
													<span className='day'>{props.published_at.day}</span>
													<span className='month'>
														{props.published_at.month}
													</span>
													<Box component='span' mt='3px'>
														{props.published_at.year}
													</Box>
												</time>
											</ThisPublicationDate>
										</ArticleImg>
										<ArticleContent style={{ marginTop: '-10px' }}>
											<Typography variant='body1' component='span'>
												<ReactMarkdown>{props.content}</ReactMarkdown>
											</Typography>
										</ArticleContent>
									</UpperContainer>
								</StyledArticle>

								<Box mb={6}>
									<Typography variant='caption'>
										<q style={{ fontStyle: 'italic' }}>
											digpads articles, research, advise, and other information
											is offered “as is'' with no warranties to its accuracy or
											completeness. digpads provides information as best to its
											own knowledge and abilities as possible, but encourages
											readers to perform additional research to confirm the
											information contained herein and/or seek professional
											advice on all topics. digpads is not responsible for any
											losses or damages of any kind arising from the information
											provided herein.
										</q>
									</Typography>
								</Box>

								<div id='comments'>
									<Comments comments={props.comments ? props.comments : []} />
								</div>
							</StyledContainer>
						)}

						{showSearchResults && (
							<SearchResults>
								<Container maxWidth='md'>
									<PageTitle>
										{searchTitle.message}
										{searchTitle.query ? (
											<span style={{ fontWeight: 'bold' }}>
												{searchTitle.query}
											</span>
										) : (
											''
										)}
									</PageTitle>
									<SearchList>
										{articles?.map((article, i) => (
											<SearchItem key={i}>
												<Link
													to={'/article/' + Slugify(article.urlSlug)}
													onClick={() => setShowSearchResults(false)}
												>
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
													<PublicationDate>
														{article.published_at}
													</PublicationDate>
													<Link
														to={'/article/' + Slugify(article.urlSlug)}
														onClick={() => setShowSearchResults(false)}
													>
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
									</SearchList>
								</Container>
							</SearchResults>
						)}
					</main>

					<aside style={{ paddingTop: showSearchResults ? 0 : '2em' }}>
						<Container>
							{/* === Article search ==== */}
							<Box mb={2}>
								<FormControl variant='outlined'>
									<InputLabel htmlFor='query-input' />
									<StyledInput
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										onKeyPress={(e) => {
											e.key === 'Enter' &&
												handleArticleSearchInput(e.target.value);
										}}
										id='query-input'
										type='text'
										fullWidth={true}
										style={{ marginTop: '0' }}
										startAdornment={
											<InputAdornment
												position='start'
												style={{ marginRight: '0' }}
											>
												<IconButton aria-label='search icon' size='large'>
													<StyledSearchIcon />
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Box>

							<section className='related-articles'>
								<Title variant='h5'>Related Articles</Title>

								{props.relatedArticles
									? props.relatedArticles.map((a) => (
											<RelatedArticle
												key={a._id}
												title={a.title}
												published_at={a.updatedAt}
												image={a.image}
												urlSlug={a.urlSlug}
											/>
									  ))
									: null}
							</section>

							<section className='article-ads'>
								{ads.map((ad, i) => (
									<div key={i} style={{ marginBottom: '1em' }}>
										<a href={ad.link}>
											{ad.displayTextAd ? (
												<Typography>{ad.TextAd}</Typography>
											) : (
												<div className='ad-image'>
													<img
														style={{
															width: '100%',
														}}
														src={ad.image.url}
													/>
												</div>
											)}
										</a>
									</div>
								))}
							</section>
						</Container>
					</aside>
				</Wrapper>
				<Footer />
			</Page>
		</>
	);
}
