import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCommentsByUser,
	fetchCommentsByUser,
} from 'features/comments/commentsSlice';
import { Typography, Box, Modal } from '@mui/material';

import UserComments from 'components/AdminPanel/UserComments';

type Props = {
	userId: string;
	username?: string;
	dateFirstComment: Date;
	dateLastComment: Date;
	homeCity?: string;
	homeState?: string;
	timezone?: { short: string; name: string; offset: number };
	favoritedCommunities;
};

export default function ForumAndKnowledgeDetails({
	userId,
	username,
	dateFirstComment,
	dateLastComment,
	homeCity,
	homeState,
	timezone,
	favoritedCommunities,
}: Props) {
	const [userCommentsModalOpen, setUserCommentsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const userComments = useSelector((state) =>
		selectCommentsByUser(state, userId)
	);

	const handleSeeUserComments = () => {
		dispatch(fetchCommentsByUser(userId));
		setUserCommentsModalOpen(true);
	};

	const forumDetails = {
		'Display name': username || 'unset',
		'Date First Comment': dateFirstComment
			? new Date(dateFirstComment).toLocaleDateString()
			: '',
		'Date Last Comment': dateLastComment
			? new Date(dateLastComment).toLocaleDateString()
			: 'none',
		'Home City': homeCity || 'unset',
		'Home State': homeState || 'unset',
		'Time Zone': timezone ? `${timezone?.short} ${timezone?.offset}` : 'unset',
		'Favorite Community 1': getFavoritedCommunityString(
			favoritedCommunities?.at(0)
		),
		'Favorite Community 2': getFavoritedCommunityString(
			favoritedCommunities?.at(1)
		),
		'Favorite Community 3': getFavoritedCommunityString(
			favoritedCommunities?.at(2)
		),
	};

	return (
		<ul>
			<Typography sx={{ fontWeight: 'bold' }}>Forum & Knowledge</Typography>

			{Object.keys(forumDetails).map((detail, i) => (
				<li key={i}>
					<span key={i} style={{ fontWeight: 'bold' }}>
						{detail}:{' '}
					</span>
					{forumDetails[detail]}
				</li>
			))}

			<button
				onClick={() => handleSeeUserComments()}
				style={{ border: 'none', padding: '0' }}
			>
				See comments
			</button>

			<Modal
				open={userCommentsModalOpen}
				onClose={() => setUserCommentsModalOpen(false)}
			>
				<Box m='1em 0'>
					<UserComments comments={userComments || []} />
				</Box>
			</Modal>
		</ul>
	);
}

function getFavoritedCommunityString(favoritedCommunityObject) {
	if (favoritedCommunityObject) {
		let state = favoritedCommunityObject?.state;
		let city = favoritedCommunityObject?.city;

		if (state && city) {
			return `${state}, ${city}`;
		} else {
			return 'unset';
		}
	} else {
		return 'unset';
	}
}
