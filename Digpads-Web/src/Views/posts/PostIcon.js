import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import MessageIcon from '@mui/icons-material/Message';
import Popover from '@mui/material/Popover';
import styled from 'styled-components';

import { authContext } from '../../contexts/AuthContext';
import { DeletePost } from '../../controllers/FeedController';
import MyModal from 'components/Modal';
import { instance } from '../../controllers/axios';
import PostActions from 'components/PostActions';
import { IconsContainer } from 'components/styled/Feed';
import LikeAndReactions from 'components/LikeAndReactions';
import shareIcon from '../../assets/icons/share.png';
import Share from 'components/share';
import EditPost from './EditPost';

const StyledLikeGrid = styled(Grid)`
	padding: 10px;
	margin-top: 10px;
`;

const StyledCommentGrid = styled(Grid)`
	padding: 10px;
	display: flex;
	margin-top: 10px;
`;

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function PostIcons(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const { auth } = React.useContext(authContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const [promptLogin, setPromptLogin] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [openEditModal, setOpenEdit] = useState(false);
	const [replyLength, setReplyLength] = useState(props.post.replies.length);
	const alert = useAlert();
	const [snackAlert, setSnackAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	const handleAlertClose = () => {
		setSnackAlert(false);
	};

	function editModalControl() {
		setOpenEdit(!openEditModal);
	}

	function modalControl() {
		if (!auth.authenticated) {
			setModalOpen(!modalOpen);
		}
	}
	function LoginModalControl() {
		if (!auth.authenticated) {
			setPromptLogin(!promptLogin);
			setModalOpen(false);
		}
	}

	const handleClickPopover = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (props.targetPost === props.post._id) {
			setReplyLength(replyLength + 1);
		}
	}, [props.targetPost, props.post._id, replyLength]);

	async function deletePost() {
		try {
			await DeletePost(props.post._id);
			alert.success('Post deleted successfully');
			navigate(`/`);
			navigate(`/landlordforum`);
		} catch (e) {
			alert.error('Error deleting post: ', e.message);
		}
	}
	const handleReportContent = () => {
		instance
			.post('reportContent', {
				content: props.post.content,
				contentURL: location.href,
			})
			.then((response) => {
				if (response.status === 200) {
					setMessage('You have successfully reported this post');
					setType('info');
					setSnackAlert(true);
				}
			});
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<>
			<MyModal display={openEditModal} modalControl={editModalControl}>
				<div>
					<EditPost
						title={props.post.title}
						content={props.post.content}
						category={props.post.category}
						postId={props.post._id}
						slug={props.post.slug}
					/>
				</div>
			</MyModal>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<div style={{ height: '45px', width: '200px' }}>
					<Share post={props.post} />
				</div>
			</Popover>
			<IconsContainer>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<StyledLikeGrid item>
						<LikeAndReactions
							type='post'
							id={props.post._id}
							number={
								props.post.likes
									? props.post.likes.length
									: 1000
							}
							likeId={props.post.liked}
							// onClick={modalControl}
						/>
					</StyledLikeGrid>
					<a href={props.toLink} style={{ color: 'inherit' }}>
						<StyledCommentGrid item>
							<MessageIcon />
							<Typography style={{ marginLeft: '10%' }}>
								{replyLength}
							</Typography>
						</StyledCommentGrid>
					</a>
				</div>
				<Grid
					item
					style={{
						padding: '10px',
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<PostActions
						style={{ height: '50px' }}
						postBelongsToUser={
							auth.authenticated &&
							auth.data._id === props.post.author._id
						}
						handleEdit={editModalControl}
						handleDelete={deletePost}
						handleReportContent={handleReportContent}
					/>

					<button type='button' onClick={handleClickPopover}>
						<img
							src={shareIcon}
							alt='comment icon'
							height='21'
							width='21'
							style={{ marginTop: '5%' }}
						/>
					</button>
				</Grid>
			</IconsContainer>
			<Snackbar
				open={snackAlert}
				autoHideDuration={6000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleAlertClose} severity={type}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
}

export default PostIcons;
