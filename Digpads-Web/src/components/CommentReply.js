import React from 'react';
import { Snackbar, Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { instance } from '../controllers/axios';
import {
	PostContainer,
	StyledPostComment,
	StyledAuthor,
	PostInfo,
	StyledTextareaAutosize,
	StyledButton,
} from './styled/Post';
import CommentLikeAndReactions from 'components/CommentLikeAndReaction';
import Fromnow from 'react-fromnow';
import CommentActions from './CommentActions';
import { authContext } from '../contexts/AuthContext';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function CommentReply(props) {
	const { auth } = React.useContext(authContext);
	const [isEditing, setIsEditing] = React.useState(false);
	const [alert, setAlert] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [type, setType] = React.useState('');
	const editCommentTextAreaRef = React.useRef(null);

	const handleClose = () => {
		setAlert(false);
	};

	function handleSubmitReply(evt) {
		evt.preventDefault();

		instance
			.patch(`editPostComment`, {
				post: props.id,
				content: editCommentTextAreaRef.current.value,
			})
			.then((res) => {
				if (res.status === 200) {
					// Update comment text shown to user
					props.handleReplyUpdate(
						props.id,
						editCommentTextAreaRef.current.value
					);
					setIsEditing(false);
				} else {
					setAlert(true);
					setMessage('Something went wrong, try again later');
					setType('error');
				}
				setIsEditing(false);
			});
	}

	const handleReportContent = () => {
		instance
			.post('reportContent', {
				content: props.content,
				contentURL: location.href,
			})
			.then((response) => {
				if (response.status === 200) {
					setAlert(true);
					setMessage('You have successfully reported a comment.');
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
								height: '36px',
								width: '36px',
							}}
						></Avatar>
					</div>
					<PostInfo>
						<Typography variant='subtitle2' component='p'>
							{`${props.first} ${props.last}`}
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
									style={{
										width: '10%',
										padding: '5px',
										fontSize: '0.8rem',
									}}
									onClick={handleSubmitReply}
								>
									Save
								</StyledButton>
								<StyledButton
									variant='contained'
									color='primary'
									style={{
										width: '10%',
										padding: '5px',
										fontSize: '0.8rem',
									}}
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
											props.handleDeleteReply(props.id)
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

export default CommentReply;
