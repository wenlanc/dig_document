import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import {
	HardMoneyTitleContainer,
	HardMoneyCalculatorContainer,
	CalculatorCardContainer,
	TextSelectorContainer,
} from '../styled/HardMoneyCalculator';
import { StyledField } from '../styled/FormStyle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PageTitle, Banner } from '../styled/Page';

const PREFIX = 'MortageCalculatorInputs';

const classes = {
	formControl: `${PREFIX}-formControl`,
	selectEmpty: `${PREFIX}-selectEmpty`,
};

const Root = muiStyled('div')(({ theme }) => ({
	[`& .${classes.formControl}`]: {
		margin: theme.spacing(1),
		minWidth: 60,
	},

	[`& .${classes.selectEmpty}`]: {
		marginTop: theme.spacing(2),
	},
}));

export const ButtonCardContainer = styled.div`
	width: 900px;
	height: 50px;
	margin-left: auto;
	margin-right: auto;
	background-color: #f9f9fb;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 3% 0 3%;
`;
export const HardMoneyPageTitleContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: black;
	font-size: 36px;
	font-weight: 800;
	padding: 0 3% 0 3%;
`;

function MortageCalculatorInputs() {
	const [downPaymentSelect, SetDownPaymentSelect] = useState('10');
	const [loanTermSelect, SetLoanTermSelect] = useState('10');
	const [originationFeeSelect, SetOriginationFeeSelect] = useState('10');
	const [amortizedFee, setAmortizedFee] = useState('');
	const [balloonPayment, setBalloonPayment] = useState('');
	const [interestOnly, SetInterestOnly] = useState('');
	const [monthlyPayment, setMonthlyPayment] = useState('');
	const [prepaymentPenality, setPrepaymentPenality] = useState('');
	const [prepaymentAmountSelect, setPrepaymentAmountSelect] = useState('10');
	const [purchasePrice, setPurchasePrice] = useState('');
	const [monthlyRent, setMonthlyRent] = useState('');
	const [downpayment, setDownpayment] = useState('');
	const [loanTerm, setLoanTerm] = useState('');
	const [administrativeFee, setAdministrativeFee] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [originationFee, setOriginationFee] = useState('');
	const [prepaymentAmount, setPrepaymentAmount] = useState('');
	const [estimatedMonths, setEstimatedMonths] = useState('');
	const [monthTillBalloon, setMonthTillBalloon] = useState('');

	const [loanPrincipal, setLoanPrincipal] = useState('');
	const [estimatedMonthlyPaymentAmount, setEstimatedMonthlyPaymentAmount] =
		useState('');
	const [totalMonthlyLoanCostAmount, setTotalMonthlyLoanCostAmount] =
		useState('');

	const [
		monthlyProfitAfterLoanCostAmount,
		setMonthlyProfitAfterLoanCostAmount,
	] = useState('');
	const [payOffDueInMonthXAmount, setPayOffDueInMonthXAmount] = useState('');
	const [
		prepaymentPenalityAmountInMonthX,
		setPrepaymentPenalityAmountInMonthX,
	] = useState('');
	const [totalPrincipalRepaidAmount, setTotalPrincipalRepaidAmount] =
		useState('');
	const [totalLoanCostAmount, setTotalLoanCostAmount] = useState('');
	const [regularAmortizationTable, setRegularAmortizationTable] = useState(
		[]
	);

	let interestAccumulatedoverPeriod = 0.0;
	let originationFeeAmount = 0.0;
	const regularAmortization = [];
	let loanPrincipalAmount = 0.0;
	let periodLength = null;
	let estimatedMonthlyPayment = 0.0;
	let totalMonthlyLoanCost = 0.0;
	let monthlyProfitAfterLoanCost = 0.0;
	let beginningLoanAmount = 0.0;
	let accumulatedInterest = 0.0;
	let targetAmount = 0.0;
	let payOffDueInMonthX = 0.0;
	let prepaymentPenalityAmount = 0.0;
	let totalPrincipalRepaid = 0.0;
	let accumulatedInterestInMonthX = 0.0;
	let initialOriginationFee = 0.0;
	let singleMonth = null;
	function simpleCalculationHandler() {
		setLoanPrincipal(purchasePrice);
		let totalPrincipal;
		const r = interestRate / 12 / 100;
		if (originationFeeSelect == 10) {
			let temp = purchasePrice * originationFee * 0.01;
			totalPrincipal = temp + parseInt(purchasePrice);
		} else {
			totalPrincipal = purchasePrice + originationFeeAmount;
		}
		console.log(totalPrincipal);
		let numMonths = loanTerm;
		if (loanTermSelect === 20) {
			numMonths *= 12;
		}
		let monthlyInterestRate = interestRate / 12;
		let firstHalf = Math.pow(1 + r, numMonths) - 1;
		let secondHalf = r * Math.pow(1 + r, numMonths);
		let subTotal = firstHalf / secondHalf;
		let decimalFormMonthly = (totalPrincipal / subTotal).toFixed(2);

		setEstimatedMonthlyPaymentAmount(decimalFormMonthly);
		setTotalMonthlyLoanCostAmount(
			parseFloat(decimalFormMonthly) + parseFloat(administrativeFee)
		);
		console.log(parseFloat(monthlyRent));
		setMonthlyProfitAfterLoanCostAmount(
			(parseFloat(monthlyRent) - parseFloat(decimalFormMonthly)).toFixed(
				2
			)
		);
		let totalTemp = (numMonths * parseFloat(decimalFormMonthly)).toFixed(2);
		setTotalLoanCostAmount(numberWithCommas(totalTemp));
	}
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	}

	const calculationHandler = () => {
		/**
		 * principal amount
		 */
		if (downPaymentSelect === 10) {
			const deduction = purchasePrice * downpayment;
			loanPrincipalAmount = purchasePrice - deduction;
		} else {
			loanPrincipalAmount = purchasePrice - downpayment;
		}
		/**
		 * Estimated Monthly Payment
		 */
		if (amortizedFee === 10) {
			if (originationFeeSelect === 10) {
				originationFeeAmount = originationFee * loanPrincipalAmount;
				initialOriginationFee = originationFee * loanPrincipalAmount;
			} else {
				originationFeeAmount = originationFee;
				initialOriginationFee = originationFee;
			}
			const totalPrincipal = loanPrincipalAmount + originationFeeAmount;

			if (loanTermSelect === 10) {
				periodLength = loanTerm;
			} else {
				periodLength = loanTerm * 12;
			}
			const rate = 0.004166666667;
			beginningLoanAmount = totalPrincipal;

			for (let i = 1; i <= periodLength; i++) {
				if (monthlyPayment === 10) {
					if (interestOnly === 20) {
						if (1 <= periodLength) {
							interestAccumulatedoverPeriod =
								(beginningLoanAmount *
									parseFloat(interestRate)) /
								12;

							estimatedMonthlyPayment =
								totalPrincipal /
								((Math.pow(1 + parseFloat(rate), periodLength) -
									1) /
									(parseFloat(rate) *
										Math.pow(
											1 + parseFloat(rate),
											periodLength
										)));
						} else {
							estimatedMonthlyPayment = 0;
						}
					} else {
						estimatedMonthlyPayment = interestAccumulatedoverPeriod;
					}
				} else {
					estimatedMonthlyPayment = 0;
				}
				totalMonthlyLoanCost =
					parseFloat(administrativeFee) +
					parseFloat(estimatedMonthlyPayment);
				const endingLoanAmount =
					beginningLoanAmount +
					(interestAccumulatedoverPeriod -
						parseFloat(estimatedMonthlyPayment));
				accumulatedInterest =
					accumulatedInterest + interestAccumulatedoverPeriod;
				const accumulatedPrincipalPayDown =
					totalPrincipal - endingLoanAmount;
				if (i === parseInt(estimatedMonths)) {
					targetAmount = endingLoanAmount;
					totalPrincipalRepaid = accumulatedPrincipalPayDown;
					accumulatedInterestInMonthX = accumulatedInterest;
				}

				const month = {
					beginningLoanAmount: beginningLoanAmount.toFixed(3),
					originationFee: originationFeeAmount.toFixed(3),
					interestAccumulatedoverPeriod:
						interestAccumulatedoverPeriod.toFixed(3),
					monthlyPayment: estimatedMonthlyPayment.toFixed(3),
					endingLoanAmount: endingLoanAmount.toFixed(3),
					accumulatedInterest: accumulatedInterest.toFixed(3),
					accumulatedPrincipalPayDown:
						accumulatedPrincipalPayDown.toFixed(3),
				};
				regularAmortization.push(month);
				originationFeeAmount = 0;
				beginningLoanAmount = endingLoanAmount;
			}
			if (balloonPayment === 10) {
				if (estimatedMonths < monthTillBalloon) {
					payOffDueInMonthX = targetAmount;
				}
			}
			if (prepaymentPenality === 20) {
				prepaymentPenalityAmount = 0.0;
			} else {
				if (balloonPayment === 10) {
					if (estimatedMonths < monthTillBalloon) {
						if (prepaymentAmountSelect === 10) {
							prepaymentPenalityAmount =
								prepaymentAmount * targetAmount;
						} else {
							prepaymentPenalityAmount = prepaymentAmount;
						}
					}
				}
				if (estimatedMonths < periodLength) {
					if (prepaymentAmountSelect === 10) {
						prepaymentPenalityAmount =
							prepaymentAmount * targetAmount;
					} else {
						prepaymentPenalityAmount = prepaymentAmount;
					}
				}
			}
			/**
			 * Monthly Profit after Loan Costs
			 */
			monthlyProfitAfterLoanCost = monthlyRent - totalMonthlyLoanCost;
		} else {
			estimatedMonthlyPayment = 0;
		}
		setLoanPrincipal(loanPrincipalAmount.toFixed(3));
		setEstimatedMonthlyPaymentAmount(estimatedMonthlyPayment.toFixed(3));
		setTotalMonthlyLoanCostAmount(totalMonthlyLoanCost.toFixed(3));
		setPayOffDueInMonthXAmount(payOffDueInMonthX.toFixed(3));
		setPrepaymentPenalityAmountInMonthX(
			prepaymentPenalityAmount.toFixed(3)
		);
		setTotalPrincipalRepaidAmount(totalPrincipalRepaid.toFixed(3));
		setTotalLoanCostAmount(
			(
				accumulatedInterestInMonthX +
				initialOriginationFee +
				prepaymentPenalityAmount
			).toFixed(3)
		);
		setMonthlyProfitAfterLoanCostAmount(
			monthlyProfitAfterLoanCost.toFixed(3)
		);
		setRegularAmortizationTable(regularAmortization);
	};
	function generatePDF() {
		var doc = new jsPDF('portrait', 'px', 'a4', 'false');

		if (regularAmortizationTable.length) {
			regularAmortizationTable.map((regularAmort, index) => {
				doc.text(
					50,
					20,
					'Regular Amortization Table - Monthly Payments, No Balloon'
				);
				doc.text(50, 40, `Month-${index + 1} `);
				doc.text(
					50,
					80,
					`Beginning Loan Amount: $${regularAmort.beginningLoanAmount.toString()}`
				);
				doc.text(
					50,
					100,
					`Add: Origination Fee: $${regularAmort.originationFee.toString()}`
				);
				doc.text(
					50,
					120,
					`Add: Interest Accumulated over Period: $${regularAmort.interestAccumulatedoverPeriod.toString()}`
				);
				doc.text(
					50,
					140,
					`Less: Monthly Payment: $${regularAmort.monthlyPayment.toString()}`
				);
				doc.text(
					50,
					160,
					`Ending Loan Amount: $${regularAmort.endingLoanAmount.toString()}`
				);
				doc.text(
					50,
					180,
					`Accumulated Interest : $${regularAmort.accumulatedInterest.toString()}`
				);
				doc.text(
					50,
					200,
					`Accumulated Principal Paydown: $${regularAmort.accumulatedPrincipalPayDown.toString()}`
				);
				doc.addPage();
			});
		}

		doc.save('digpads.pdf');
	}
	const clearHandler = () => {
		setPurchasePrice('');
		setMonthlyRent('');
		setDownpayment('');
		setLoanTerm('');
		setAdministrativeFee('');
		setInterestRate('');
		setOriginationFee('');
		setAmortizedFee('');
		setMonthTillBalloon('');
		setPrepaymentPenality('');
		setPrepaymentAmount('');
		setEstimatedMonths('');
	};
	return (
		<Root>
			<Banner>
				<PageTitle>Mortgage Calculator</PageTitle>
			</Banner>
			<HardMoneyPageTitleContainer></HardMoneyPageTitleContainer>
			<HardMoneyCalculatorContainer>
				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<div>Purchase Price</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={purchasePrice}
							onChange={(e) => {
								setPurchasePrice(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>

				<CalculatorCardContainer>
					<div>Estimated Monthly Rent</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='monthlyRent'
							value={monthlyRent}
							onChange={(e) => {
								setMonthlyRent(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<TextSelectorContainer>
						<div style={{ marginTop: '3%' }}>
							Downpayment % Required/Desired
						</div>
						<div>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={downPaymentSelect}
									onChange={(event) => {
										SetDownPaymentSelect(
											event.target.value
										);
									}}
								>
									<MenuItem value={10}>Percent</MenuItem>
									<MenuItem value={20}>Dollar</MenuItem>
								</Select>
							</FormControl>
						</div>
					</TextSelectorContainer>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='downpayment'
							value={downpayment}
							onChange={(e) => {
								setDownpayment(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<TextSelectorContainer>
						<div style={{ marginTop: '5%' }}>Loan Term Length</div>
						<div>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={loanTermSelect}
									onChange={(event) => {
										SetLoanTermSelect(event.target.value);
									}}
								>
									<MenuItem value={10}>Months</MenuItem>
									<MenuItem value={20}>Years</MenuItem>
								</Select>
							</FormControl>
						</div>
					</TextSelectorContainer>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='loanTerm'
							value={loanTerm}
							onChange={(e) => {
								setLoanTerm(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Monthly Administrative Fee</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='administrativeFee'
							value={administrativeFee}
							onChange={(e) => {
								setAdministrativeFee(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Annual Interest Rate(%)</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='interestRate'
							value={interestRate}
							onChange={(e) => {
								setInterestRate(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<TextSelectorContainer>
						<div style={{ marginTop: '5%' }}>Origination Fees</div>
						<div>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={originationFeeSelect}
									onChange={(event) => {
										SetOriginationFeeSelect(
											event.target.value
										);
									}}
								>
									<MenuItem value={10}>Percent</MenuItem>
									<MenuItem value={20}>Dollar</MenuItem>
								</Select>
							</FormControl>
						</div>
					</TextSelectorContainer>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='originationFee'
							value={originationFee}
							onChange={(e) => {
								setOriginationFee(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				{/* Commented complex features so we are only using simple features */}
				{/* <CalculatorCardContainer>
					<div>Amortized Origination Fees ?</div>
					<div>
						<FormControl className={classes.formControl}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={amortizedFee}
								onChange={(event) => {
									setAmortizedFee(event.target.value);
								}}
							>
								<MenuItem value={10}>Yes</MenuItem>
								<MenuItem value={20}>No</MenuItem>
							</Select>
						</FormControl>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Balloon Payment ?</div>
					<div>
						<FormControl className={classes.formControl}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={balloonPayment}
								onChange={(event) => {
									setBalloonPayment(event.target.value);
								}}
							>
								<MenuItem value={10}>Yes</MenuItem>
								<MenuItem value={20}>No</MenuItem>
							</Select>
						</FormControl>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Months till Balloon Payment Due</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='monthTillBalloon'
							value={monthTillBalloon}
							onChange={(e) => {
								setMonthTillBalloon(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Interest Only ?</div>
					<div>
						<FormControl className={classes.formControl}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={interestOnly}
								onChange={(event) => {
									SetInterestOnly(event.target.value);
								}}
							>
								<MenuItem value={10}>Yes</MenuItem>
								<MenuItem value={20}>No</MenuItem>
							</Select>
						</FormControl>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Monthly Payments ?</div>
					<div>
						<FormControl className={classes.formControl}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={monthlyPayment}
								onChange={(event) => {
									setMonthlyPayment(event.target.value);
								}}
							>
								<MenuItem value={10}>Yes</MenuItem>
								<MenuItem value={20}>No</MenuItem>
							</Select>
						</FormControl>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Prepayment Penalty ?</div>
					<div>
						<FormControl className={classes.formControl}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={prepaymentPenality}
								onChange={(event) => {
									setPrepaymentPenality(event.target.value);
								}}
							>
								<MenuItem value={10}>Yes</MenuItem>
								<MenuItem value={20}>No</MenuItem>
							</Select>
						</FormControl>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<TextSelectorContainer>
						<div style={{ marginTop: '5%' }}>
							Prepayment Amount or % of Balance
						</div>
						<div>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={prepaymentAmountSelect}
									onChange={(event) => {
										setPrepaymentAmountSelect(
											event.target.value
										);
									}}
								>
									<MenuItem value={10}>Percent</MenuItem>
									<MenuItem value={20}>Dollar</MenuItem>
								</Select>
							</FormControl>
						</div>
					</TextSelectorContainer>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='prepaymentAmount'
							value={prepaymentAmount}
							onChange={(e) => {
								setPrepaymentAmount(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Estimated Months Till Payoff Date</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimatedMonths'
							value={estimatedMonths}
							onChange={(e) => {
								setEstimatedMonths(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer> */}

				<ButtonCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{ height: '40px' }}
						onClick={simpleCalculationHandler}
					>
						Calculate
					</Button>
					<Button
						variant='contained'
						color='primary'
						style={{ height: '40px', marginLeft: '20px' }}
						onClick={clearHandler}
					>
						Clear
					</Button>
				</ButtonCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<HardMoneyTitleContainer>
					<div>Outputs</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<div>Loan Principal Amount</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={loanPrincipal}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Estimated Monthly Payment</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={estimatedMonthlyPaymentAmount}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Monthly Loan Cost</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={totalMonthlyLoanCostAmount}
						/>
					</div>
				</CalculatorCardContainer>
				{/* Complex outputs commented */}
				{/* <CalculatorCardContainer>
					<div>Payoff Due in Month X</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={payOffDueInMonthXAmount}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Prepayment Penalty</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={prepaymentPenalityAmountInMonthX}
						/>
					</div>
				</CalculatorCardContainer> */}
				<CalculatorCardContainer>
					<div>Total Loan Cost</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={totalLoanCostAmount}
						/>
					</div>
				</CalculatorCardContainer>
				{/* Commented Complex output field */}
				{/* <CalculatorCardContainer>
					<div>Total Principal Repaid</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={totalPrincipalRepaidAmount}
						/>
					</div>
				</CalculatorCardContainer> */}
				<CalculatorCardContainer>
					<div> Monthly Profit after Loan Costs</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={monthlyProfitAfterLoanCostAmount}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<ButtonCardContainer>
				<Button
					variant='contained'
					color='primary'
					onClick={generatePDF}
					style={{ height: '40px' }}
				>
					Download amortization Data
				</Button>
			</ButtonCardContainer>
		</Root>
	);
}

export default MortageCalculatorInputs;
