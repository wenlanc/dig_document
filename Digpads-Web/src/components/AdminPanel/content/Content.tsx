import React, { useState, useRef } from 'react';
import { Modal, Stack, Alert as MuiAlert, Snackbar } from '@mui/material';

import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';
import { ModalBase } from 'components/styled/Modal';
import EditContentForm from './EditContentForm';

import {
	updateArticleComment,
	deleteArticleComment,
} from 'controllers/articles';
import {
	updatePost,
	updatePostComment,
	deletePost,
	deletePostComment,
} from 'controllers/posts';

import ContentSearchBar from './ContentSearchBar';
import DashboardLayout from 'components/DashboardLayout';
import ContentDetails from './ContentDetails';
import Footer from 'components/Footer';

export default function Content() {
	const [selectedContent, setSelectedContent] = useState(null);
	const [editContentModalOpen, setEditContentModalOpen] = useState(false);

	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const handleRemoveContent = async (contentId) => {
		switch (selectedContent.type) {
			case 'Original Post':
				await updatePost(contentId, { removed: true });
				break;
			case 'Article Comment':
				await updateArticleComment(contentId, { removed: true });
				break;
			case 'Post Comment':
				await updatePostComment(contentId, { removed: true });
				break;
		}

		setSelectedContent({ ...selectedContent, removed: true });
		setAlertMessage('Content has been successfully removed');
		setAlertOpen(true);
	};

	const handleEditContent = async (
		contentId,
		content: { title?: string; content?: string }
	) => {
		switch (selectedContent.type) {
			case 'Original Post':
				await updatePost(contentId, content);
				setSelectedContent({
					...selectedContent,
					...content,
				});
				break;
			case 'Article Comment':
				const articleComment = await updateArticleComment(contentId, content);
				setSelectedContent({
					...selectedContent,
					title: articleComment.content,
				});
				break;
			case 'Post Comment':
				const postComment = await updatePostComment(contentId, content);
				setSelectedContent({ ...selectedContent, title: postComment.content });
				break;
		}

		setAlertMessage('Content has been successfully edited');
		setAlertOpen(true);
	};

	const handleDeleteContent = async (contentId) => {
		switch (selectedContent.type) {
			case 'Original Post':
				await deletePost(contentId);
				break;
			case 'Article Comment':
				await deleteArticleComment(contentId);
				break;
			case 'Post Comment':
				await deletePostComment(contentId);
				break;
		}

		setAlertMessage('Content has been successfully deleted');
		setAlertOpen(true);
	};

	const handleRestoreContent = async (contentId) => {
		switch (selectedContent.type) {
			case 'Original Post':
				await updatePost(contentId, { removed: false });
				break;
			case 'Article Comment':
				await updateArticleComment(contentId, { removed: false });
				break;
			case 'Post Comment':
				await updatePostComment(contentId, { removed: false });
				break;
		}

		setSelectedContent({ ...selectedContent, removed: false });
		setAlertMessage('Content has been successfully restored');
		setAlertOpen(true);
	};

	return (
		<DashboardLayout sx={{ pb: '3em' }}>
			<SuiTypography variant='h2'>Content Moderation</SuiTypography>
			<Stack rowGap={2}>
				<ContentSearchBar onSelectContent={setSelectedContent} />

				{selectedContent && (
					<>
						<ContentDetails
							{...selectedContent}
							numberOfViews={selectedContent.views || 0}
							numberOfReplies={selectedContent.replies?.length || 0}
							numberOfComments={selectedContent.comments?.length || 0}
							seeCommentsHref={getCommentsLink(selectedContent)}
						/>

						<Stack className='content-actions' spacing={2} direction='row'>
							<SuiButton
								variant='contained'
								onClick={() => handleRemoveContent(selectedContent._id)}
								color='warning'
								disabled={selectedContent.removed === true}
							>
								Remove
							</SuiButton>

							<SuiButton
								variant='contained'
								onClick={() => setEditContentModalOpen(true)}
								color='primary'
							>
								Edit
							</SuiButton>

							<SuiButton
								variant='contained'
								onClick={() => handleDeleteContent(selectedContent._id)}
								color='error'
							>
								Delete
							</SuiButton>

							<SuiButton
								variant='contained'
								onClick={() => handleRestoreContent(selectedContent._id)}
								color='success'
								disabled={selectedContent.removed !== true}
							>
								Restore
							</SuiButton>
						</Stack>
					</>
				)}
			</Stack>
			<Footer renderSubscribe={false} />;
			<Modal
				open={editContentModalOpen}
				onClose={() => setEditContentModalOpen(false)}
			>
				<ModalBase sx={{ width: '600px' }}>
					<EditContentForm
						content={selectedContent}
						onSubmit={(content) => {
							handleEditContent(selectedContent._id, content);
							setEditContentModalOpen(false);
						}}
						onCancel={() => setEditContentModalOpen(false)}
					/>
				</ModalBase>
			</Modal>
			<Snackbar
				open={alertOpen}
				autoHideDuration={6000}
				onClose={() => setAlertOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<MuiAlert
					elevation={6}
					variant='filled'
					onClose={() => setAlertOpen(false)}
					severity='success'
				>
					{alertMessage}
				</MuiAlert>
			</Snackbar>
		</DashboardLayout>
	);
}

function getCommentsLink(content) {
	if (content.type === 'Original Post') {
		return `/post/${content.slug}#comments`;
	} else if (content.type === 'Article Comment') {
		return `/article/${content.article.urlSlug}#comments`;
	} else if (content.type === 'Post Comment') {
		return `/post/${content.post.slug}#comments`;
	}
}
