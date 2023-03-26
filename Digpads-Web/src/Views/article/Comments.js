import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Button, TextField, Avatar, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { instance } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import CommentActions from 'components/CommentActions';
import MyModal from 'components/Modal';
import Auth from 'components/Auth/Auth';

//#region styles
const StyledComments = styled.section`
	margin-bottom: 5em;
`;
const CommentsMeta = styled.div`
	margin-bottom: 1em;
`;
const CommentsForm = styled.form`
	margin-bottom: 2.5em;
	.MuiTextField-root {
		margin-right: 1em;
		margin-bottom: 0.5em;
		width: 100%;
	}
`;
const CommentList = styled.ul``;

const Comment = styled.li`
	display: flex;
	margin-bottom: 2em;
`;
const AuthorImg = styled.div`
	margin-right: 1em;
	width: 50px;
	height: 50px;
	img {
		border-radius: 3px;
		vertical-align: middle;
	}
`;
const CommentContent = styled.div``;
const AuthorName = styled.span`
	font-weight: bold;
`;
const CommentDate = styled.span`
	font-size: 93%;
	::before {
		content: '•';
		display: inline;
		font-size: 1.5em;
		padding: 0 3px;
	}
	color: gray;
`;
const CommentMessage = styled(Typography)``;
//#endregion styles

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Comments(props) {
	const { auth } = React.useContext(authContext);

	const [isEditing, setIsEditing] = React.useState(false);
	const [commentToEdit, setCommentToEdit] = React.useState(null);
	//For alerts
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	const commentInputRef = useRef(null);
	const { slug } = useParams();
	const [comments, setComments] = React.useState(props.comments.reverse());
	const [promptLogin, setPromptLogin] = useState(false);

	function RegisterModalControl() {
		if (!auth.authenticated) {
			setPromptLogin(!promptLogin);
		}
	}

	const handleClose = () => {
		setAlert(false);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const inputValue = commentInputRef.current.value;

		if (inputValue.length === 0) {
			setAlert(true);
			setMessage('Please enter your comment');
			setType('warning');
			return;
		}

		const apiUrl = process.env.REACT_APP_API_URL;

		if (isEditing) {
			instance
				.patch(apiUrl + `articles/${slug}/comments`, {
					id: commentToEdit._id,
					message: inputValue,
				})
				.then((res) => {
					if (res.status === 200) {
						// Update comment text shown to user
						const updatedComment = {
							...commentToEdit,
							content: commentInputRef.current.value,
						};

						const updatedComments = comments.filter(
							(c) => c._id !== commentToEdit._id
						);

						setComments([...updatedComments, updatedComment]);

						commentInputRef.current.value = '';
					} else {
						setAlert(true);
						setMessage('Something went wrong, try again later');
						setType('error');
					}
					setIsEditing(false);
				});
		} else {
			instance
				.post(apiUrl + `articles/${slug}/comments`, {
					message: inputValue,
				})
				.then((res) => {
					if (res.status === 200) {
						// add comment to the list
						const comment = res.data;
						setComments([comment, ...comments]);

						commentInputRef.current.value = '';
					}
				});
		}
	};

	const getCommentBelongsToUser = (authorId) => {
		if (auth.authenticated && auth.data._id === authorId) {
			return true;
		} else {
			return false;
		}
	};

	// === Additional comment action handlers ===
	const handleEditComment = (commentIndex) => {
		setIsEditing(true);
		setCommentToEdit(comments[commentIndex]);
		commentInputRef.current.value = comments[commentIndex].content;
	};

	const handleDeleteComment = (commentIndex) => {
		const commentToDelete = comments[commentIndex];
		instance
			.patch(`articles/${slug}/comments/${commentToDelete._id}`)
			.then((res) => {
				if (res.status === 200) {
					// remove comment to the list
					const updatedComments = comments.filter(
						(c) => c._id !== commentToDelete._id
					);

					setComments(updatedComments);
				}
			});
	};

	const handleReportContent = (commentIndex) => {
		const comment = comments[commentIndex];

		instance
			.post('reportContent', {
				content: comment.content,
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

	return (
		<StyledComments>
			<CommentsMeta>
				<Typography variant='subtitle2'>
					{comments.length}
					{comments.length > 1 ? ' Comments' : ' Comment'}
				</Typography>
			</CommentsMeta>
			{React.useContext(authContext).auth.authenticated ? (
				<CommentsForm onSubmit={handleSubmit}>
					<TextField
						id='comment-input'
						variant='outlined'
						type='text'
						inputRef={commentInputRef}
						label='Join the discussion...'
						InputLabelProps={{ shrink: true }}
					/>
					<Button variant='contained' color='primary' type='submit'>
						{isEditing ? 'Edit' : 'Send'}
					</Button>
				</CommentsForm>
			) : (
				<>
					<MyModal display={promptLogin} modalControl={RegisterModalControl}>
						<div>
							<Alert severity='info'>
								<Typography> Please sign Up to use this feature</Typography>
							</Alert>
							<Auth
								page='Sign Up'
								promptLogin={promptLogin}
								onLoggedIn={() => setPromptLogin(false)}
							/>
						</div>
					</MyModal>
					<Button
						endIcon={<ArrowRightAltIcon />}
						color='primary'
						variant='contained'
						style={{ textTransform: 'capitalize' }}
						onClick={RegisterModalControl}
					>
						Log in to add comments
					</Button>
				</>
			)}
			<CommentList>
				{comments
					.sort(
						(a, b) =>
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					)
					.map((comment, i) => (
						<Comment key={i}>
							<AuthorImg>
								<Avatar
									alt='user profile'
									src={
										comment.author.profilePicUrl
											? comment.author.profilePicUrl
											: '/images/user/avatar2.png'
									}
									style={{
										height: '50px',
										width: '50px',
									}}
								></Avatar>
								{/* <img
									src={
										comment.author.profilePicUrl
											? comment.author.profilePicUrl
											: '/images/user/avatar2.png'
									}
								/> */}
							</AuthorImg>

							<CommentContent>
								<AuthorName>{comment.author.name}</AuthorName>

								<CommentDate>
									{getCommentDateString(comment.createdAt)}
								</CommentDate>

								<CommentMessage>{comment.content}</CommentMessage>
							</CommentContent>

							<CommentActions
								commentBelongsToUser={getCommentBelongsToUser(
									comment.author._id
								)}
								handleEdit={() => handleEditComment(i)}
								handleDelete={() => handleDeleteComment(i)}
								handleReportContent={() => handleReportContent(i)}
							/>
						</Comment>
					))}
			</CommentList>
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
		</StyledComments>
	);
}

function getCommentDateString(date) {
	let commentDate = new Date(date);
	let now = new Date();

	let daysAgo = now.getDate() - commentDate.getDate();

	if (daysAgo === 0) {
		return 'today';
	}

	if (daysAgo > 0) {
		return `${daysAgo} days ago`;
	}
}
