import { Modal, Paper, Box, styled } from '@mui/material';

export const ModalPaper = styled(Paper)(({ theme }) => ({
	padding: '5px 15px',
	[theme.breakpoints.up('xxl')]: {
		padding: '10px 15px',
	},
}));

export const StyledMUIModal = styled(Modal)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'auto',
}));

export const ModalBox = styled(Box)(({ theme }) => ({
	maxHeight: '100%',
	width: 'min(60%, 750px)',
}));

export const TitleBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	position: 'relative',
	'& :nth-child(1)': {
		width: '100%',
		textAlign: 'center',
	},
}));

export const CloseBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	right: 2,
}));
