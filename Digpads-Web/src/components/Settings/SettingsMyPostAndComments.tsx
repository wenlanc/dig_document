import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'contexts/AuthContext';
import { selectPostsByUser, fetchPostsByUser } from 'features/posts/postsSlice';
import {
	selectCommentsByUser,
	fetchCommentsByUser,
} from 'features/comments/commentsSlice';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Typography,
} from '@mui/material';

function createData(
	_id: string,
	date: string,
	comment: string,
	replies: number,
	type: string,
	slug?: string,
	article?: { title: string; urlSlug: string }
) {
	return { _id, date, comment, replies, type, slug, article };
}

export default function SettingMyPostsAndComments({ sectionRefs }) {
	const { auth } = useAuth();
	const userId = auth?.data?._id;
	const dispatch = useDispatch();

	const userPosts = useSelector((state) => selectPostsByUser(userId, state));
	const _posts = userPosts.map((post) =>
		createData(
			post._id,
			post.createdAt ? new Date(post.createdAt).toLocaleString() : 'unknown',
			post.title,
			post.replies?.length || 0,
			'post',
			post.slug
		)
	);

	const userComments = useSelector((state) =>
		selectCommentsByUser(state, userId)
	);
	const _comments = userComments.map((comment) =>
		createData(
			comment._id,
			comment.createdAt
				? new Date(comment.createdAt).toLocaleString()
				: 'unknown',
			comment.content,
			0,
			'comment',
			'',
			comment.article
		)
	);

	const rows = _posts.concat(_comments);

	React.useEffect(() => {
		if (auth.loading) {
			return;
		}

		dispatch(fetchPostsByUser(userId));
		dispatch(fetchCommentsByUser(userId));
	}, [dispatch, userId]);

	return (
		<section id='my-post-&-comments' ref={sectionRefs}>
			<Typography
				color='textSecondary'
				variant='h5'
				component='h3'
				style={{ marginBottom: '1.25em', fontWeight: 'bold' }}
			>
				My Posts & Comments
			</Typography>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow sx={{ '.MuiTableCell-root': { fontWeight: 'bold' } }}>
							<TableCell>ID</TableCell>
							<TableCell>Time / Date</TableCell>
							<TableCell>Comment</TableCell>
							<TableCell>Replies</TableCell>
							<TableCell>View</TableCell>
							<TableCell>Type</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row._id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row._id}
								</TableCell>
								<TableCell align='left'>{row.date}</TableCell>
								<TableCell align='left'>{row.comment}</TableCell>
								<TableCell align='left'>{row.replies}</TableCell>
								<TableCell align='left'>
									<a href={getViewContentHref(row)} target='_blank'>
										View
									</a>
								</TableCell>
								<TableCell align='left'>{row.type}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}

function getViewContentHref(content) {
	if (content.type === 'post') {
		return `/post/${content.slug}`;
	} else if (content.type === 'comment') {
		return `/article/${content.article?.urlSlug}#comments`;
	}
}
