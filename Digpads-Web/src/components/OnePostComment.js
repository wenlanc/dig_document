import React, { useEffect } from 'react';
import { Typography, Box, Input, Button, Snackbar } from '@mui/material';
import { Avatar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { instance } from '../controllers/axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {
	PostContainer,
	StyledPostComment,
	StyledAuthor,
	PostInfo,
	ActionContainer,
	FormContainer,
	StyledTextareaAutosize,
	StyledReplyButton,
	StyledButton,
} from './styled/Post';
import CommentLikeAndReactions from 'components/CommentLikeAndReaction';
import Fromnow from 'react-fromnow';
import CommentActions from './CommentActions';
import { authContext } from '../contexts/AuthContext';
import CommentReply from './CommentReply';
import { set } from 'js-cookie';
import { getCommentReplies } from '../controllers/commentController';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function OnePostComment(props) {
	const { auth } = React.useContext(authContext);
	const [isEditing, setIsEditing] = React.useState(false);
	const [isReplying, setIsReplying] = React.useState(false);
	const editCommentTextAreaRef = React.useRef(null);
	const [reply, setReply] = React.useState('');
	const [replies, setReplies] = React.useState([]);
	const [limit, setLimit] = React.useState(3);
	//For alert
	const [alert, setAlert] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [type, setType] = React.useState('');

	const handleClose = () => {
		setAlert(false);
	};

	function handleSubmitComment(evt) {
		evt.preventDefault();

		instance
			.patch(`editPostComment`, {
				post: props.id,
				content: editCommentTextAreaRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					// Update comment text shown to user
					props.handleUpdateComment(
						props.id,
						editCommentTextAreaRef.current.value
					);
					setIsEditing(false);
				} else {
					setAlert(true);
					setMessage('Something went wrong, try again letter');
					setType('error');
				}
				setIsEditing(false);
			});
	}

	const handleReplyUpdate = (id, content) => {
		const reply = replies.find((c) => c._id === id);

		if (reply) {
			reply.content = content;
			setReplies([...replies]);
		}
	};

	const handleDeleteReply = (replyId) => {
		const replyToDelete = replies.find((c) => c._id === replyId);
		if (!replyToDelete) {
			setAlert(true);
			setMessage('Comment already deleted');
			setType('warning');
			return;
		}
		instance.patch(`deletePostComment/${replyToDelete._id}`).then((res) => {
			if (res.status === 200) {
				// remove comment to the list
				const updatedReplies = replies.filter(
					(c) => c._id !== replyToDelete._id
				);
				setReplies(updatedReplies);
			}
		});
	};

	const postCommentReply = async (e) => {
		e.preventDefault();

		if (reply.length === 0) {
			setAlert(true);
			setMessage('Please enter your comment');
			setType('warning');
			return;
		}

		instance
			.post('addCommentReply', {
				post: props.post,
				content: reply,
				parent: props.id,
			})
			.then((response) => {
				if (response.status === 200) {
					setReplies([...replies, response.data.data.reply]);
					//to view all the replies
					let x = Math.ceil((replies.length + 1) / 3);
					setLimit(x * 3);
					setReply(''); // clear input
				} else {
					setAlert(true);
					setType('error');
					if (response.status === 202) {
						setMessage(response.data.message);
					} else {
						setMessage(
							'Woops, something went wrong. Try again later'
						);
					}
				}
			});
	};

	useEffect(() => {
		getCommentReplies(props.id).then((commentReplies) =>
			setReplies(commentReplies)
		);
	}, [props.id]);

	const handleReportContent = () => {
		instance
			.post('reportContent', {
				content: props.content,
				contentURL: location.href,
			})
			.then((response) => {
				if (response.status === 200) {
					setAlert(true);
					setMessage('You have successfully reported a comment');
					setType('info');
				}
			});
	};

	const getCommentBelongsToUser = (authorId) => {
		if (auth.authenticated && auth.data._id === authorId) {
			return true;
		} else {
			return false;
		}
	};

	const handleLoadMore = () => {
		setLimit(limit + 3);
	};

	const handleLoadLess = () => {
		setLimit(limit - 3);
	};

	return (
		<div style={{ borderBottom: '1px dotted grey' }}>
			<PostContainer>
				<StyledAuthor id='styled-author'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'space-between',
						}}
					>
						<Avatar
							alt='user profile'
							src={props.profilePicUrl}
							style={{
								height: '50px',
								width: '50px',
							}}
						></Avatar>
					</div>
					<PostInfo>
						<Typography variant='subtitle2' component='p'>
							{props.displayUsername
								? props.username
								: `${props.first} ${props.last}`}
						</Typography>

						<Typography
							variant='subtitle2'
							color='textSecondary'
							component='p'
						>
							<Fromnow date={props.createdAt} />
						</Typography>

						{isEditing ? (
							<div>
								<StyledTextareaAutosize
									rowsMin={4}
									defaultValue={props.content}
									type='text'
									name='comment'
									ref={editCommentTextAreaRef}
								/>
								<StyledButton
									variant='contained'
									color='primary'
									type='submit'
									onClick={handleSubmitComment}
								>
									Save
								</StyledButton>
								<StyledButton
									variant='contained'
									color='primary'
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</StyledButton>
							</div>
						) : (
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'space-between',
								}}
							>
								<StyledPostComment>
									<div
										style={{
											width: '100%',
											marginTop: '20px',
											whiteSpace: 'normal',
										}}
									>
										{props.content}
									</div>
								</StyledPostComment>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<CommentActions
										commentBelongsToUser={getCommentBelongsToUser(
											props.authorId
										)}
										handleEdit={() => setIsEditing(true)}
										handleDelete={() =>
											props.handleDeleteComment(props.id)
										}
										handleReportContent={
											handleReportContent
										}
									/>
									<CommentLikeAndReactions
										type='postReply'
										id={props.id}
										number={
											props.likes ? props.likes.length : 0
										}
										likeId={props.liked}
									/>
								</div>
							</div>
						)}

						{replies
							.slice(0, limit)
							.sort(
								(a, b) =>
									new Date(a.createdAt).getTime() -
									new Date(b.createdAt).getTime()
							)
							.map((reply) => {
								return (
									<CommentReply
										key={reply._id}
										id={reply._id}
										post={reply.post}
										authorId={reply.author._id}
										authorProfileUrl={
											reply.author.profilePicUrl
										}
										first={reply.author.first}
										last={reply.author.last}
										content={reply.content}
										createdAt={reply.createdAt}
										likes={reply.likes}
										handleDeleteReply={handleDeleteReply}
										handleReplyUpdate={(id, content) =>
											handleReplyUpdate(id, content)
										}
									/>
								);
							})}

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{limit < replies.length && (
								<IconButton
									color='primary'
									onClick={handleLoadMore}
									size='large'
								>
									<Typography style={{ fontSize: '0.8rem' }}>
										See {replies.length - limit} more
									</Typography>
									<AddIcon />
								</IconButton>
							)}

							{limit > 3 && (
								<IconButton
									color='secondary'
									onClick={handleLoadLess}
									size='large'
								>
									<Typography style={{ fontSize: '0.8rem' }}>
										See less
									</Typography>
									<RemoveIcon />
								</IconButton>
							)}
						</div>

						{!isReplying ? (
							<StyledReplyButton
								variant='contained'
								color='primary'
								onClick={() => setIsReplying(true)}
							>
								Reply
							</StyledReplyButton>
						) : (
							<FormContainer>
								<div
									style={{
										width: '72.2%',
										display: 'flex',
										justifyContent: 'flex-end',
									}}
								>
									<IconButton
										onClick={() => setIsReplying(false)}
										size='large'
									>
										<ClearIcon color='primary' />
									</IconButton>
								</div>

								<form
									onSubmit={postCommentReply}
									style={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<StyledTextareaAutosize
										rowsMin={4}
										placeholder='Type reply...'
										onInput={(e) =>
											setReply(e.target.value)
										}
										value={reply}
										style={{ width: '70%' }}
										type='text'
										name='comment'
									/>
									<Box
										display='flex'
										justifyContent='flex-start'
									>
										<StyledButton
											variant='contained'
											color='primary'
											type='submit'
											onClick={postCommentReply}
											style={{
												width: '15%',
												fontSize: '0.89rem',
												padding: '5px',
											}}
										>
											Submit
										</StyledButton>
									</Box>
								</form>
							</FormContainer>
						)}
					</PostInfo>
				</StyledAuthor>
				<Snackbar
					open={alert}
					autoHideDuration={6000}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleClose} severity={type}>
						{message}
					</Alert>
				</Snackbar>
			</PostContainer>
		</div>
	);
}

OnePostComment.defaultProps = {
	displayUsername: false,
};
