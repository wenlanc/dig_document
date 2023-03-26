import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const OverViewContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledBoxContainer = styled.div`
	position: relative;
	margin-left: 5%;
`;
export const StyledBox1 = styled.div`
	width: 92%;
	height: 150px;
	margin-top: 15px;
	border: 1px dotted blue;
	position: absolute;
	border-radius: 7px;
`;

export const StyledBox2 = styled.div`
	width: 90%;
	height: 180px;
	margin-left: 1%;
	border: 1px dotted blue;
	position: absolute;
	border-radius: 7px;
`;
export const TitleContainer = styled.div`
	margin-left: 4%;
	font-size: 25px;
	color: blue;
	p::first-letter {
		font-weight: bold;
		font-size: 35px;
	}
	@media (max-width: 1280px) {
		font-size: 20px;
	}
`;

export const DescriptionContainer = styled.div`
	margin-left: 4%;
	color: #7a7a7a;
`;

export const Description = styled(Typography)`
	font-weight: 600;
	font-size: 18px;
	@media (max-width: 1280px) {
		font-size: 16px;
	}
`;

export const CardsContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 95%;
	margin-top: 18%;
	margin-left: 2%;
	@media (max-width: 1280px) {
		margin-top: 22%;
	}
`;
