import styled from 'styled-components';
import { Container, Typography, TextField } from '@mui/material';

export const Title = styled(Typography).attrs(() => ({
	variant: 'h2',
}))`
	font-size: 1.2rem;
	margin-bottom: 1em;
	font-weight: bold;
	color: rgb(12, 106, 203);
`;

export const FAQContainer = styled(Container)`
	li {
		margin-bottom: 3.5em;
	}
`;

export const Definitions = styled.ul`
	li {
		margin-bottom: 1em;
	}
`;

export const ChartContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	padding: 0px;
	border: 2px solid #f6f6f6;
	margin-top: 2%;
`;

export const ChartTextContainer = styled.div`
	height: 50px;
	background-color: white;
	width: 100%;
`;

export const TypographyStyle = styled(Typography)`
	font-size: 17px;
`;

export const ButtonContainer = styled.div`
	width: 50%;
	margin-top: 1%;
	margin-left: 54%;
`;

export const RatioContainer = styled.div`
	margin-left: 6%;
`;

export const TextFieldsContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 2%;
`;

export const ComplexCalculatorContainer = styled.div`
	margin-top: 4%;
	min-height: 200px;
	border: 2px solid #f6f6f6;
`;

export const CalculatorTitle = styled.div`
	text-align: center;
	font-size: 23px;
	margin-bottom: 3%;
	font-weight: bold;
`;

export const StyledFieldRatio = styled(TextField)`
	width: 35%;
	margin-left: 1%;
`;

export const ChartPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #f9f9fb;
	text-decoration: none;
`;

export const MenuContainer = styled.div`
	width: 100%;
	border-bottom: 1px solid #d8d8d8;
`;
export const PostChartsCardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 5%;
`;

export const ImageStyles = styled.img`
	height: 100%;
	width: 100%;
`;

export const OnePostChartContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 300px;
	margin-top: 2%;
	width: 100%;
	justify-content: space-between;
`;

export const ComingSoonCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const StyledTypography = styled(Typography)`
	font-size: 20px;
	text-align: center;
	color: black;
	font-weight: bold;
	margin-top: 25%;
`;

export const ChartDataContainer = styled.div`
	width: 480px;
	height: 300px;
	border: 2px solid #d8d8d8;
	border-radius: 10px;
	margin-top: 5%;
`;

export const ChartsCardTitle = styled.div`
	line-height: 26px;
	font-weight: 600;
	margin-top: 5%;
	margin-left: 30%;
`;

export const IncomeCard = styled.div`
	font-size: 25px;
	display: flex;
	flex-direction: column;
	cursor: pointer;
`;

export const ChartIcon = styled.img`
	margin-top: 5%;
	margin-left: 30%;
	width: 160px;
	height: 160px;
`;
