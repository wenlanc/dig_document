import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import styled from 'styled-components';

//#region styles
const CommentActionsButton = styled(Button)`
	align-self: flex-start;
	margin: 0 0.5em;
`;

const ActionsIconContainer = styled.div`
	position: relative;

	.circle-icon {
		font-size: 3rem;
	}

	.MuiSvgIcon-colorAction {
		position: absolute;
		left: 0.25em;
		font-size: 2rem;
		top: 0.25em;
	}
`;
//#endregion styles

export default function CommentActions(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isAdmin = localStorage.getItem('isAdmin');

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div style={{ marginLeft: '10%' }}>
			<Tooltip title='additional actions'>
				<CommentActionsButton
					aria-controls='additional-comment-actions'
					aria-haspopup='true'
					onClick={handleClick}
				>
					<ActionsIconContainer>
						<RadioButtonUncheckedIcon className='circle-icon' />
						<MoreHorizIcon color='action' />
					</ActionsIconContainer>
				</CommentActionsButton>
			</Tooltip>

			<Menu
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onClick={handleClose}
				keepMounted
				anchorEl={anchorEl}
			>
				{(props.commentBelongsToUser || isAdmin === 'true') && (
					<MenuItem onClick={props.handleEdit}>Edit comment</MenuItem>
				)}

				{props.commentBelongsToUser && (
					<MenuItem onClick={props.handleDelete}>
						Delete comment
					</MenuItem>
				)}

				<MenuItem onClick={props.handleReportContent}>
					Report comment
				</MenuItem>
			</Menu>
		</div>
	);
}
