import styled from 'styled-components';
import { Container } from '@mui/material';

export const HardMoneyCalculatorContainer = styled(Container)`
	width: 74%;
	max-width: 900px;
	margin-top: 10px;
	margin-left: auto;
	margin-ligth: auto;
`;

export const HardMoneyTitleContainer = styled.div`
	width: 900px;
	height: 50px;
	background-color: #0063c8;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	color: white;
	font-weight: bold;
	padding: 0 3% 0 3%;
`;
export const CalculatorCardContainer = styled.div`
	width: 900px;
	height: 50px;
	border-right: 1px solid #0063c8;
	border-left: 1px solid #0063c8;
	border-bottom: 1px solid #0063c8;
	background-color: #f9f9fb;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 3% 0 3%;
`;

export const TextSelectorContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
