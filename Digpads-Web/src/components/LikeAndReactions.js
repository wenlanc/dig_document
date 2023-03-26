import React, { useState } from 'react';
import { authContext } from '../contexts/AuthContext';
import { Box, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { FavoriteRounded, FavoriteBorder } from '@mui/icons-material';
import { instance } from '../controllers/axios';
import MyModal from './Modal';
import Auth from './Auth/Auth';

export default function LikeAndReactions(props) {
	const { auth } = React.useContext(authContext);
	const [likedCount, setLikedCount] = useState(props.number); // useReducerHook
	const [likeId, setLikeId] = useState(props.likeId);
	const [promptLogin, setPromptLogin] = useState(false);

	const incrementLikes = React.useRef(typeof likeId === 'undefined');

	function LoginModalControl() {
		setPromptLogin(!promptLogin);
	}

	function toogleLikesAndReaction() {
		const data = {
			type: props.type,
			id: props.id,
			likeId: likeId,
			increment: incrementLikes.current,
		};

		if (incrementLikes.current) {
			setLikedCount((likedCount) => likedCount + 1);
		} else {
			setLikedCount((likedCount) => likedCount - 1);
		}

		incrementLikes.current = !incrementLikes.current;

		instance
			.post(`likeAndReaction`, data)
			.then((response) => {
				if (response.data.data.success) {
					setLikeId(response.data.data.likeId);
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
							? toogleLikesAndReaction
							: LoginModalControl
					}
				>
					{incrementLikes.current ? (
						<FavoriteBorder />
					) : (
						<FavoriteRounded />
					)}
				</Typography>
				<Typography>{likedCount}</Typography>
			</Box>
		</div>
	);
}
