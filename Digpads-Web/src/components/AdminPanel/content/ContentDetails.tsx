import React from 'react';
import SuiBox from 'components/SuiBox';

type Props = {
	type: string;
	title: string;
	createdAt: string;
	numberOfComments: number;
	numberOfReplies: number;
	numberOfViews: number;
	seeCommentsHref: string;
	removed?: boolean;
};

export default function ContentDetails({
	type,
	title,
	createdAt,
	numberOfComments,
	numberOfReplies,
	numberOfViews,
	seeCommentsHref,
	removed,
}: Props) {
	return (
		<SuiBox
			shadow='lg'
			component='ul'
			p='1em'
			display='flex'
			flexDirection='column'
			sx={{
				whiteSpace: 'nowrap',
				borderRadius: '1em',
				fontSize: '14px',
				overflowY: 'auto',
				'& span': {
					fontWeight: 600,
				},
			}}
		>
			<li>
				<span>Type:</span> {type || ''}
			</li>

			{title && (
				<li>
					<span>Title:</span> {title}
				</li>
			)}

			<li>
				<span>Date Posted:</span>{' '}
				{createdAt && new Date(createdAt).toDateString()}
			</li>

			{type === 'Original Post' && (
				<li>
					<span>Number of Views:</span> {numberOfViews}
				</li>
			)}

			{type === 'Post Comment' && (
				<li>
					<span>Number of Replies:</span> {numberOfReplies}
				</li>
			)}

			{type === 'Original Post' && (
				<li>
					<span>Number of Comments:</span> {numberOfComments}
				</li>
			)}

			{removed === true && (
				<li>
					<span>Removed:</span> true
				</li>
			)}

			<li>
				<a
					href={seeCommentsHref}
					target='_blank'
					style={{ border: 'none', padding: '0' }}
				>
					See comments
				</a>
			</li>
		</SuiBox>
	);
}
