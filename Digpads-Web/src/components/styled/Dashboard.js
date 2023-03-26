import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

export const DashboardContainer = styled.div`
	display: flex;
`;
export const TopNavBarContainer = styled(Grid)`
	margin-top: 2px;
	width: 100%;
	color: #3c3c50;
	height: 55px;
`;

export const ComingSoonCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 80%;
	height: 470px;
	background-image: url(images/decorations/BlueShapesBg@2x.png);
	background-size: cover;
	margin-left: 7%;
`;

export const StyledTypography = styled(Typography)`
	font-size: 50px;
	text-align: center;
	color: white;
	font-weight: bold;
`;
