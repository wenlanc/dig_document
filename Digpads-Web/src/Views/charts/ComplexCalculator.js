import React, { useState } from 'react';
import {
	ButtonContainer,
	RatioContainer,
	TextFieldsContainer,
	ComplexCalculatorContainer,
	CalculatorTitle,
	StyledFieldRatio,
} from 'components/styled/charts';
import { StyledButton, StyledField } from 'components/styled/FormStyle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const SwapIconStyle = {
	marginLeft: '10%',
	marginTop: '1%',
	width: '35px',
	height: '35px',
	cursor: 'pointer',
};

function ComplexCalculator() {
	const [incomeValue, setIncomeValue] = useState(0);
	const [rentValue, setRentValue] = useState(0);
	const [swapped, setSwapped] = useState(false);
	const [ratio, setRatio] = useState(30);
	const [amount, setAmount] = useState(0);

	function swapAxis() {
		setSwapped(!swapped);
		setAmount(0);
	}
	function calculateValue() {
		if (swapped === false) {
			setIncomeValue(amount / Number(ratio));
		} else {
			setRentValue(amount * Number(ratio));
		}
	}

	return (
		<ComplexCalculatorContainer>
			<CalculatorTitle>Complex calculator</CalculatorTitle>
			<RatioContainer>
				<StyledFieldRatio
					label='Enter ratio'
					name='ratio'
					type='text'
					variant='outlined'
					size='small'
					onChange={(e) => {
						setRatio(e.target.value);
					}}
				/>
			</RatioContainer>
			<TextFieldsContainer>
				<div style={{ width: '50%', marginLeft: '7%' }}>
					<StyledField
						autoFocus
						label={!swapped ? 'Enter salary' : 'Enter rent'}
						name='amount'
						type='text'
						onChange={(e) => {
							setAmount(e.target.value);
						}}
						variant='outlined'
						size='small'
						value={amount}
					/>
					<SwapHorizIcon style={SwapIconStyle} onClick={swapAxis} />
				</div>
				<div style={{ width: '50%' }}>
					<StyledField
						disabled
						label={
							swapped === false
								? `$${Math.round(incomeValue)}`
								: `$${Math.round(rentValue)}`
						}
						name='income'
						type='text'
						variant='outlined'
						size='small'
					/>
				</div>
			</TextFieldsContainer>
			<ButtonContainer>
				<StyledButton
					variant='contained'
					color='primary'
					type='submit'
					login='login'
					onClick={calculateValue}
				>
					Submit
				</StyledButton>
			</ButtonContainer>
		</ComplexCalculatorContainer>
	);
}

export default ComplexCalculator;
