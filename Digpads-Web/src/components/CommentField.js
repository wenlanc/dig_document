import React, { useState } from 'react';
import { TextField, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import styled from 'styled-components';
import { instance, getCSRF } from '../controllers/axios';

export const StyledTextareaAutosize = styled(TextField)`
	width: 80%;
	margin: 10px 0px;
	margin-left: auto;
	margin-right: 5px;

	height: 50px;
	@media (max-width: 768px) {
		width: 220.03px;
		margin: 5px auto;
	}
`;
export const StyledCommentButton = styled(Grid)`
	border: 1px steelblue dotted;
	background-color: rgba(5, 99, 200, 1);
	border-radius: 6px;
	width: 80px;
	text-align: center;
	padding: 5px;
	font-size: 16px;
	margin-right: 5px;
	text-align: center;
	color: white;
	height: 30px;
`;
export const StyledCommentTextAreaContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const CommentField = (props) => {
	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState(
		'Woops, something went wrong. Try again later'
	);
	const handleClose = () => {
		setAlert(false);
	};

	const postComment = async (e, postId) => {
		await getCSRF();

		instance
			.post('addPostComment', {
				post: postId,
				content: comment,
			})
			.then((response) => {
				if (response.status === 200) {
					setComment(''); // clear input
					props.handleReply(props.id);
				} else {
					setAlert(true);
					if (response.status === 202) {
						setAlertMessage(response.data.message);
					}
				}
			});
	};
	const [comment, setComment] = useState('');
	return (
		<StyledCommentTextAreaContainer>
			<StyledTextareaAutosize
				placeholder='Type comment...'
				multiline={true}
				rowsMax={3}
				onChange={(e) => setComment(e.target.value)}
				value={comment}
				type='text'
				name='comment'
			/>
			<StyledCommentButton onClick={(event) => postComment(event, props.id)}>
				Reply
			</StyledCommentButton>
			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity='error'>
					{alertMessage}
				</Alert>
			</Snackbar>
		</StyledCommentTextAreaContainer>
	);
};
export default CommentField;
