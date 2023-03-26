import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WarningIcon from '@mui/icons-material/Warning';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const DashboardContainer = styled.div`
	width: 45%;
	min-height: 250px;
	display: flex;
	flex-direction: column;
	padding: 2% 2% 2% 2%;
	border-radius: 30px;
	box-shadow: rgba(0, 0, 0, 0.09) 0px 11px 18px,
		rgba(0, 0, 0, 0.12) 0px 10px 10px;
	@media (max-width: 1280px) {
		width: 40%;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 2%;
	margin-top: 4%;
`;

export const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const DescriptionText = styled.div`
	width: 85%;
	margin-left: 4%;
	color: #7a7a7a;
	font-weight: 500;
`;
export const DescriptionIconsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 4%;
`;

export const DescriptionIconsLeft = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 4%;
	width: 40%;
`;

export const DescriptionTime = styled.div`
	margin-left: 5%;
	margin-top: 2%;
	color: #dcdcdc;
	font-weight: 600;
`;

export const DescriptionIconsRight = styled.div`
	display: flex;
	flex-direction: row;
	width: '15%';
`;

export const UnreadNotification = styled.div`
	height: 40px;
	width: 50px;
	background-color: #fdd696;
	border-radius: 50%;
	@media (max-width: 1280px) {
		height: 35px;
		width: 60px;
	}
`;
export const ReadNotification = styled.div`
	height: 40px;
	width: 50px;
	background-color: #a0e25e;
	border-radius: 50%;
	@media (max-width: 1280px) {
		height: 35px;
		width: 60px;
	}
`;

export const ReadCloseIconContainer = styled.div`
	height: 20px;
	width: 25px;
	background-color: #dcdcdc;
	border-radius: 50%;
	margin-right: 5%;
`;
export const StyledTypography = styled(Typography)`
	font-weight: bold;
`;

export const StyledNotificationIcon = styled(NotificationsNoneIcon)`
	color: white;
	margin-left: 10%;
	margin-top: 10%;
	height: 30px;
	width: 30px;
	@media (max-width: 1280px) {
		height: 25px;
		width: 25px;
	}
`;

export const StyledWarningIcon = styled(WarningIcon)`
	color: #fdd696;
`;

export const StyledCorrectIcon = styled(CheckCircleIcon)`
	color: #a0e25e;
`;
export const StyledVisibilityIcon = styled(VisibilityIcon)`
	height: 18px;
	width: 18px;
	color: #0063c8;
	margin-top: 10%;
	margin-left: 10%;
`;

export const StyledCloseIcon = styled(CloseIcon)`
	height: 18px;
	width: 18px;
	color: #0063c8;
	margin-top: 10%;
	margin-left: 10%;
`;
