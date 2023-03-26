import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 130px;
	width: 100%;
	background-color: #f5f5f5;
	@media (max-width: 768px) {
		height: 50px;
		flex-direction: row;
	}
`;
export const UpNavBarRightSection = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 20%;
`;

export const UpBarSetionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	@media (max-width: 768px) {
		display: none;
	}
`;
export const StyledSelect = styled.select`
	border: none;
	background-color: #f5f5f5;
	outline: none;
	scroll-behavior: smooth;
	color: #484848;
	font-size: 15px;
	font-weight: bold;
	cursor: pointer;
`;

export const StyledTypography = styled(Typography)`
	color: #484848;
	font-weight: 600;
	font-size: 15px;
`;
export const LogoutContainer = styled.div`
	display: flex;
	flex-direction: row;
	cursor: pointer;
	margin-top: 2%;
`;

export const ProfileContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const StyledNameText = styled(Typography)`
	color: black;
	font-weight: 600;
`;

export const MenuContainer = styled.div`
	width: 100%;
	height: 80px;
	background-color: white;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 1%;
	box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
		rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const StyledButton = styled.button`
	width: 150px;
	height: 45px;
	border-radius: 150px;
	font-size: 12px;
	font-weight: bold;
	background-color: #0063c8;
	box-shadow: 0 0 10px 10px #e5f2ff;
	border: none;
	color: white;
	cursor: pointer;
	:hover {
		background-color: #0257ae;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
export const StyleMenuButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-right: 5%;
	margin-top: 1%;
`;

export const NavLinksContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;
