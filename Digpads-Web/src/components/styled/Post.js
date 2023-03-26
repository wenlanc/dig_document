import {
	Box,
	Typography,
	Button,
	TextareaAutosize,
	Divider,
} from '@mui/material';
import styled from 'styled-components';

export const OnePostContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 20%;
	width: 60%;
	margin-bottom: 4em;
`;

export const PostContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 4.2px;
	padding-right: 4.2px;
	flex: 8;
`;

export const PostBodyContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 0px !important;
`;

export const PostContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	border-bottom: 1 dotted green;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const LoadText = styled.p`
	color: #5d56b4;
	font-size: 13px;
	font-weight: bold;
	cursor: pointer;
`;

export const PostStyledHeading = styled.h3`
	color: ${(props) => props.theme.primary};
	padding-bottom: 4px;
	width: 100%;
	font-size: 2em;
	margin: 0;
	margin-top: -0.3em;
`;

export const StyledPostContentBox = styled(Box)`
	line-height: 1.4rem;
	max-height: 200px;
	font-weight: 400;
	font-size: 14px;
	display: -webkit-box;
	-webkit-line-clamp: 9;
	-webkit-box-orient: vertical;
	overflow: hidden;
	width: 100%;
	color: #515151;
	margin-bottom: 2%;
	margin-top: 2em;
	@media (max-width: 768px) {
		width: 90%;
	}
`;
export const StyledPostComment = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: #515151;
	width: 100%;
`;
export const CommentSection = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4%;
`;
export const StyledTypography = styled(Typography)`
	font-weight: bold;
	font-size: 16px;
`;

export const FormSectionContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 3%;
	margin-bottom: 3%;
`;

export const FormContainer = styled.div`
	margin-left: 10%;
	width: 100%;
`;

export const StyledReplyButton = styled(Button)`
	width: 120px;
	padding: 5px;
	&& {
		font-size: 0.89rem;
	}
`;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
	width: 100%;
`;
export const StyledButton = styled(Button)`
	margin: 4% 0px 0px 0px;
	width: 220.03px;
	@media (max-width: 768px) {
		width: 220.03px;
	}
`;
export const StyledContainer = styled.div`
	width: 100%;
	margin-top: 5%;
	@media (max-width: 768px) {
		margin-left: 0%;
	}
`;

export const StyledDivider = styled(Divider)`
	@media (max-width: 768px) {
		width: 203.03px;
	}
`;

export const StyledAuthor = styled(Box)`
	display: flex;
	margin: 1rem 0rem;
	flex-direction: row;
	width: 100%;
`;

export const UserInfo = styled.div`
	border: ${(props) => (props.bordered ? '1px dotted #000' : 'none')};
	border-radius: 3px;
	padding: 0.75em 0.75em 3em;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 2;
	margin-top: 0px;
	margin-left: 0px;
	margin-right: 8px;
	margin-bottom: 16px;
	min-width: 200px;
	max-width: 200px;
	height: 128px;
	@media only screen and (min-width: 1440px) {
		margin-top: 0px;
	}
	@media (max-width: 768px) {
		margin-top: 8px;
	}
`;
export const PostInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 5%;
	white-space: nowrap;
	width: 100%;
`;

export const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const LoginPrompt = styled.div`
	display: flex;
	margin-top: 1em;
	align-items: center;
`;

export const PostActionsButton = styled(Button)`
	align-self: flex-start;
	margin: 0 0.5em;
`;

export const ActionsIconContainer = styled.div`
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

export const UserInfoContainer = styled.div`
	display: flex;
	@media (max-width: 768px) {
		margin-top: 8px;
		flex-wrap: wrap;
	}
`;
