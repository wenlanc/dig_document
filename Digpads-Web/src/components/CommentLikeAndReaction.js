import React, { useState } from 'react';
import { authContext } from '../contexts/AuthContext';
import { Box, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { FavoriteRounded, FavoriteBorder } from '@mui/icons-material';
import { instance } from '../controllers/axios';
import MyModal from './Modal';
import Auth from './Auth/Auth';

export default function CommentLikeAndReactions(props) {
	const { auth } = React.useContext(authContext);
	const [commentLikedCount, setCommentLikedCount] = useState(props.number); // useReducerHook
	const [commentLikeId, setCommentLikeId] = useState(props.likeId);
	const [promptLogin, setPromptLogin] = useState(false);

	const incrementLikes = React.useRef(typeof commentLikeId === 'undefined');

	function LoginModalControl() {
		setPromptLogin(!promptLogin);
	}

	function commentToggleLikesAndReaction() {
		const data = {
			type: props.type,
			id: props.id,
			likeId: commentLikeId,
			increment: incrementLikes.current,
		};
		if (incrementLikes.current) {
			setCommentLikedCount((commentLikedCount) => commentLikedCount + 1);
		} else {
			setCommentLikedCount((commentLikedCount) => commentLikedCount - 1);
		}

		incrementLikes.current = !incrementLikes.current;

		instance
			.post(`postReplyLikeAndReaction`, data)
			.then((response) => {
				if (response.data.data.success) {
					setCommentLikeId(response.data.data.likeId);
				}
			})
			.catch((e) => console.log(e));
	}

	return (
		<div>
			{auth.authenticated ? null : (
				<MyModal display={promptLogin} modalControl={LoginModalControl}>
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
			)}

			<Box style={{ display: 'flex' }}>
				<Typography
					onClick={
						auth.authenticated
							? commentToggleLikesAndReaction
							: LoginModalControl
					}
				>
					{incrementLikes.current ? (
						<FavoriteBorder />
					) : (
						<FavoriteRounded />
					)}
				</Typography>
				<Typography>{commentLikedCount}</Typography>
			</Box>
		</div>
	);
}
