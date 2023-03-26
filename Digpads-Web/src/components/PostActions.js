import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import styled from 'styled-components';

//#region styles
const CommentActionsButton = styled(Button)`
	align-self: flex-start;
	margin: 0 0.5em;
`;
//#endregion styles

export default function PostActions(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Tooltip title='additional actions'>
				<CommentActionsButton
					aria-controls='additional-comment-actions'
					aria-haspopup='true'
					onClick={handleClick}
				>
					<MoreHorizIcon color='action' />
				</CommentActionsButton>
			</Tooltip>

			<Menu
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onClick={handleClose}
				keepMounted
				anchorEl={anchorEl}
			>
				{props.postBelongsToUser && (
					<MenuItem onClick={props.handleEdit}>Edit Post</MenuItem>
				)}

				{props.postBelongsToUser && (
					<MenuItem onClick={props.handleDelete}>
						Delete Post
					</MenuItem>
				)}

				<MenuItem onClick={props.handleReportContent}>
					Report post
				</MenuItem>
			</Menu>
		</>
	);
}
