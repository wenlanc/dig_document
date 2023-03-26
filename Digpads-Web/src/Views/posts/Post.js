import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { authContext } from '../../contexts/AuthContext';
import {
	Grid,
	Typography,
	Avatar,
	Button,
	Menu,
	MenuItem,
	Breadcrumbs,
	Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { instance, getCSRF } from '../../controllers/axios';
import { Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Spinner from 'components/Spinner';
import LikeAndReactions from 'components/LikeAndReactions';
import OnePostComment from 'components/OnePostComment';
import PageWrapper from 'components/PageWrapper';
import {
	OnePostContainer,
	PostContentContainer,
	PostContainer,
	PostStyledHeading,
	PostBodyContainer,
	StyledPostContentBox,
	StyledDivider,
	CommentSection,
	LoadText,
	FormSectionContainer,
	FormContainer,
	StyledTextareaAutosize,
	StyledButton,
	StyledContainer,
	UserInfo,
	PostInfo,
	ActionContainer,
	LoginPrompt,
	PostActionsButton,
	ActionsIconContainer,
	UserInfoContainer,
} from 'components/styled/Post';
import sortBy from 'array-sort-by';
import MyModal from 'components/Modal';
import Auth from 'components/Auth/Auth';
import { PageBanner } from 'components/styled/Feed';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Post() {
	const { slug } = useParams();
	const [postContent, setPostContent] = useState(null);
	const [comments, setComments] = useState([]);
	const [limit, setLimit] = useState(3);
	const [anchorEl, setAnchorEl] = useState(null);
	const { auth } = React.useContext(authContext);
	const [promptLogin, setPromptLogin] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const commentsRef = useRef(null);

	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState(
		'Woops, something went wrong. Try again later'
	);
	const [type, setType] = useState('');
	const [ads, setAds] = useState([]);

	const currentAdIndex = useRef(0);

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

	function handleLoadMore() {
		setLimit(limit + 3);
	}

	function handleLoadFew() {
		setLimit(limit - 3);
	}

	const handleAlertClose = () => {
		setAlert(false);
	};

	function LoginModalControl() {
		if (!auth.authenticated) {
			setPromptLogin(!promptLogin);
			setModalOpen(false);
		}
	}

	const handleDeleteComment = (commentId) => {
		const commentToDelete = comments.find((c) => c._id === commentId);

		if (!commentToDelete) {
			setAlertMessage('comment already deleted');
			setType('info');
			return setAlert(true);
		}

		instance.patch(`deletePostComment/${commentToDelete._id}`).then((res) => {
			if (res.status === 200) {
				// remove comment to the list
				const updatedComments = comments.filter(
					(c) => c._id !== commentToDelete._id
				);

				setComments(updatedComments);
			}
		});
	};

	const getPost = useCallback(async () => {
		try {
			let res = await instance.get(`getPost`, {
				params: { postId: slug },
			});
			setPostContent(res.data);

			let comments = res.data.replies;
			setComments(sortBy(comments, { prop: 'createdAt' }));

			instance
				.post('pageView', { id: res.data._id, entity: 'post' })
				.then((res) => {
					if (res.status !== 200) {
						console.error(res.statusText);
					}
				});
		} catch (e) {
			console.log(e.response);
		}
	}, [slug]);

	useEffect(() => {
		instance
			.get(process.env.REACT_APP_STRAPI_API_URL + '/post-ads')
			.then((res) => {
				if (res.status === 200) {
					setAds(res.data);
				} else {
					console.error(`couldn't load ads`);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const [comment, setComment] = useState('');

	const postComment = async (e) => {
		e.preventDefault();

		if (comment.length === 0) {
			setAlertMessage('Please enter some text');
			setType('warning');
			return setAlert(true);
		}

		instance
			.post('addPostComment', {
				post: postContent._id,
				content: comment,
			})
			.then((response) => {
				if (response.status === 200) {
					setComments([...comments, response.data.data.reply]);
					setComment(''); // clear input
				} else {
					setAlert(true);
					if (response.status === 202) {
						setAlertMessage(response.data.message);
					} else {
						setAlertMessage('Woops, something went wrong. Try again later');
						setType('error');
					}
				}
			});
	};

	const handleUpdateComment = (id, content) => {
		const comment = comments.find((c) => c._id === id);

		if (comment) {
			comment.content = content;
			setComments([...comments]);
		}
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleReportContent = () => {
		if (auth.authenticated) {
			instance
				.post('reportContent', {
					content: postContent.content,
					contentURL: location.href,
				})
				.then((response) => {
					if (response.status === 200) {
						setAlertMessage('You have successfully reported this post');
						setType('info');
						setAlert(true);
					}
				});
			return;
		}

		setAlertMessage('Please login to do this.');
		setType('warning');
		setAlert(true);
	};

	const setRef = useCallback((node) => {
		commentsRef.current = node;
		const { hash } = window.location;

		if (node && hash !== '') {
			if (hash === '#comments') {
				commentsRef.current.scrollIntoView();
			}
		}
	}, []);

	useEffect(() => {
		getCSRF();
		getPost();
	}, [slug, getPost]);

	if (postContent) {
		return (
			<PageWrapper>
				<PageBanner>
					<Typography variant='h1'>Landlord Forum</Typography>
				</PageBanner>
				<OnePostContainer>
					<StyledContainer>
						<PostContainer>
							<PostContentContainer>
								<Box display='flex' justifyContent='flex-end'>
									<Button
										style={{
											color: 'white',
											height: '40px',
											fontSize: '14px',
											backgroundColor: '#0063c8',
											textTransform: 'capitalize',
											borderRadius: '10px',
											textAlign: 'center',
											textDecoration: 'none',
											width: '180px',
										}}
										color='primary'
										variant='contained'
										component='a'
										href='/landlordforum'
									>
										Return to Forum
									</Button>
								</Box>
								<UserInfoContainer display='flex'>
									<UserInfo bordered>
										<Avatar
											style={{
												height: '50px',
												width: '50px',
											}}
											alt='user profile image'
											src={postContent.author.profilePicUrl}
										></Avatar>
										<PostInfo>
											<Typography variant='subtitle2' component='p'>
												{`${postContent.author.first} ${postContent.author.last}`}
												<br />
											</Typography>
											<Typography
												variant='subtitle2'
												color='textSecondary'
												component='p'
											>
												{postContent.createdAt.substring(0, 10)}
											</Typography>
										</PostInfo>
									</UserInfo>
									<div style={{ marginLeft: '8px' }}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'flex-end',
												borderBottom: '1px solid #ccc6c6',
											}}
										>
											<PostStyledHeading>
												{postContent.title}{' '}
												<Breadcrumbs
													style={{
														paddingTop: '8px',
													}}
													separator={<NavigateNextIcon fontSize='small' />}
												>
													{postContent?.state?.name ? (
														<Typography>{postContent?.state?.name}</Typography>
													) : (
														''
													)}
													{postContent?.city?.name ? (
														<Typography>{postContent?.city?.name}</Typography>
													) : (
														''
													)}
													<Typography> {postContent.category}</Typography>{' '}
												</Breadcrumbs>
											</PostStyledHeading>
										</div>
										<img
											src={postContent?.images && postContent.images[0]}
											alt=''
										/>
										<StyledPostContentBox>
											{postContent.content}
										</StyledPostContentBox>
									</div>
								</UserInfoContainer>
							</PostContentContainer>
						</PostContainer>
						<PostBodyContainer>
							<>
								<Tooltip title='additional actions'>
									<PostActionsButton
										aria-controls='additional-comment-actions'
										aria-haspopup='true'
										onClick={handleClick}
									>
										<ActionsIconContainer>
											<RadioButtonUncheckedIcon className='circle-icon' />
											<MoreHorizIcon color='action' />
										</ActionsIconContainer>
									</PostActionsButton>
								</Tooltip>

								<Menu
									open={Boolean(anchorEl)}
									onClose={handleClose}
									onClick={handleClose}
									keepMounted
									anchorEl={anchorEl}
								>
									<MenuItem onClick={handleReportContent}>Report post</MenuItem>
								</Menu>
							</>
							<ActionContainer ref={setRef}>
								<LikeAndReactions
									type='post'
									id={slug}
									number={postContent.likes.length}
									likeId={postContent.likeId}
								/>
							</ActionContainer>
						</PostBodyContainer>
						<StyledDivider />

						<CommentSection>
							<div id='comments'>
								{comments
									.slice(0, limit)
									.sort(
										(a, b) =>
											new Date(a.createdAt).getTime() -
											new Date(b.createdAt).getTime()
									)
									.map((comment, i) => {
										return (
											<div key={comment._id}>
												<OnePostComment
													id={comment._id}
													authorId={comment.author._id}
													post={comment.post}
													authorProfileUrl={comment.author.profilePicUrl}
													first={comment.author.first}
													last={comment.author.last}
													content={comment.content}
													createdAt={comment.createdAt}
													likes={comment.likes}
													username={comment.author.username}
													displayUsername={comment.author.displayUsername}
													handleDeleteComment={handleDeleteComment}
													handleUpdateComment={(id, content) =>
														handleUpdateComment(id, content)
													}
												/>

												{ads.length !== 0 && (i + 1) % 3 === 0 && (
													<a
														style={{
															display: 'block',
														}}
														href={getCurrentAd()?.link}
													>
														{getCurrentAd().displayTextAd ? (
															<Typography
																style={{
																	padding: '1em',
																}}
															>
																{getCurrentAd().TextAd}
															</Typography>
														) : (
															<div className='ad-image'>
																<img
																	style={{
																		width: '100%',
																	}}
																	src={getCurrentAd()?.image.url}
																/>
															</div>
														)}
														{nextAd()}
													</a>
												)}
											</div>
										);
									})}

								{comments.length <= 3 ? (
									''
								) : (
									<>
										{limit === comments.length ? (
											<LoadText onClick={handleLoadFew}>
												Load few comments
											</LoadText>
										) : (
											<LoadText onClick={handleLoadMore}>
												Load more comments
											</LoadText>
										)}
									</>
								)}
							</div>

							{auth.authenticated ? (
								<FormSectionContainer>
									<div>
										<Avatar
											alt='user profile'
											src={postContent.author.profilePicUrl}
											style={{
												backgroundColor: '#F95838',
												height: '25px',
												width: '25px',
											}}
										/>
									</div>

									<FormContainer>
										<form
											onSubmit={postComment}
											style={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<StyledTextareaAutosize
												minRows={4}
												placeholder='Type comment...'
												onInput={(e) => setComment(e.target.value)}
												value={comment}
												type='text'
												name='comment'
											/>
											<Box display='flex' justifyContent='flex-end'>
												<StyledButton
													variant='contained'
													color='primary'
													type='submit'
													onClick={postComment}
												>
													Submit
												</StyledButton>
											</Box>
										</form>
									</FormContainer>
								</FormSectionContainer>
							) : (
								<div>
									<MyModal
										display={promptLogin}
										modalControl={LoginModalControl}
									>
										<div>
											<Alert severity='info'>
												<Typography>
													{' '}
													Please sign In to use this feature
												</Typography>
											</Alert>
											<Auth
												promptLogin={promptLogin}
												onLoggedIn={() => setPromptLogin(false)}
											/>
										</div>
									</MyModal>

									<LoginPrompt>
										<Button
											style={{
												color: 'white',

												height: '40px',
												fontSize: '16px',
												padding: '8px auto',
												textTransform: 'capitalize',
												backgroundColor: '#0063c8',
												borderRadius: '10px',
												textAlign: 'center',
												textDecoration: 'none',
											}}
											color='primary'
											variant='contained'
											onClick={LoginModalControl}
										>
											Log in to comment
										</Button>
									</LoginPrompt>
								</div>
							)}
						</CommentSection>
					</StyledContainer>
				</OnePostContainer>
				<Snackbar
					open={alert}
					autoHideDuration={6000}
					onClose={handleAlertClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleAlertClose} severity={type}>
						{alertMessage}
					</Alert>
				</Snackbar>
			</PageWrapper>
		);
	} else
		return (
			<Grid container style={{ marginTop: '20vh' }} justifyContent='center'>
				<Spinner type='circular' size={'12rem'} />
			</Grid>
		);
}
