import React from 'react';
import { Modal } from '@mui/material';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const top = 50;
const left = 50;
const NoOutline = styled(Modal)`
	outline: none;
	overflow: scroll;
`;

const ModalHeader = styled.div`
	text-align: right;
	cursor: pointer;
`;

const ModalStyle = styled(Paper)`
	top: 50%;
	left: 50%;
	transform: translate(-${top}%, -${left}%);
	margin: auto;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 1.8%;
	outline: 0;
	@media (max-width: 550px) {
		left: 25%;
		transform: translate(-17%, -50%);
	}
`;

/**
 * Required params
 * @param {Component} display Component to display
 *
 * @param {Func} modalControl function to toggle the modal
 * OR
 * @param {Boolean} noClose
 */
export default function MyModal({
	children,
	display,
	fRef,
	noClose,
	modalControl,
}) {
	return (
		<NoOutline
			aria-labelledby='sign-up-modal-error'
			aria-describedby='feedback-for-sign-up-error'
			open={display}
			disableEscapeKeyDown={noClose ? true : false}
			onClose={() => modalControl()}
			ref={fRef}
		>
			<ModalStyle>
				<ModalHeader>
					<CloseIcon onClick={modalControl} />
				</ModalHeader>
				{children}
			</ModalStyle>
		</NoOutline>
	);
}
