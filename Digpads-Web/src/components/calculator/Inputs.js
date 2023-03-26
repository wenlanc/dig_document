import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import {
	HardMoneyTitleContainer,
	HardMoneyCalculatorContainer,
	CalculatorCardContainer,
	TextSelectorContainer,
} from '../styled/HardMoneyCalculator';
import { StyledButton, StyledField } from '../styled/FormStyle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputAdornment } from '@mui/material';
import Select from '@mui/material/Select';
import { PageTitle, Banner } from '../styled/Page';
import Instruction from './Instruction';
import ModalFeedback from '../ModalFeedback';

import { RateReviewRounded } from '@mui/icons-material';
import XLSX from 'xlsx';
const PREFIX = 'HardMoneyCalculatorInput';

const classes = {
	root: `${PREFIX}-root`,
	input: `${PREFIX}-input`,
	inputPercent: `${PREFIX}-inputPercent`,
	inputMonth: `${PREFIX}-inputMonth`,
	selectorColor: `${PREFIX}-selectorColor`,
	formControl: `${PREFIX}-formControl`,
	selectEmpty: `${PREFIX}-selectEmpty`,
};

const Root = muiStyled('div')(({ theme }) => ({
	[`& .${classes.input}`]: {
		'& input[type=number]': {
			'-moz-appearance': 'textfield',
		},
		'& input[type=number]::-webkit-outer-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},
		'& input[type=number]::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},
	},

	[`& .${classes.inputPercent}`]: {
		'& input': {
			'text-align': 'right',
			'padding-left': '11px',
		},
	},

	[`& .${classes.inputMonth}`]: {
		'& input': {
			'padding-left': '32px',
		},
		'& input[type=number]': {
			'-moz-appearance': 'textfield',
		},
		'& input[type=number]::-webkit-outer-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},
		'& input[type=number]::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0,
		},
	},

	[`& .${classes.selectorColor}`]: {
		color: '#00EE00',
		fontWeight: 'bold',
	},

	[`& .${classes.formControl}`]: {
		margin: theme.spacing(1),
		minWidth: 60,
	},

	[`& .${classes.selectEmpty}`]: {
		marginTop: theme.spacing(2),
	},
}));

const ref = React.createRef();
const GreenTextSelect = Typography;
export const ButtonCardContainer = styled.div`
	width: 900px;
	height: 50px;
	margin-left: auto;
	margin-right: auto;
	background: #fff;
	// background-color: #f9f9fb;
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

const StyledLink = styled.a`
	&:active {
		color: #000;
	}
`;

function HardMoneyCalculatorInput() {
	const [downPaymentSelect, SetDownPaymentSelect] = useState('percent');
	const [loanTermSelect, SetLoanTermSelect] = useState('months');
	const [originationFeeSelect, SetOriginationFeeSelect] = useState('percent');
	const [amortizedFee, setAmortizedFee] = useState('yes');
	const [balloonPayment, setBalloonPayment] = useState('yes');
	const [interestOnly, SetInterestOnly] = useState('no');
	const [monthlyPayment, setMonthlyPayment] = useState('yes');
	const [prepaymentPenality, setPrepaymentPenality] = useState('no');
	const [prepaymentAmountSelect, setPrepaymentAmountSelect] =
		useState('percent');
	const [purchasePrice, setPurchasePrice] = useState('');
	const [monthlyRent, setMonthlyRent] = useState('');
	const [downpayment, setDownpayment] = useState('');
	const [loanTerm, setLoanTerm] = useState('');
	const [administrativeFee, setAdministrativeFee] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [originationFee, setOriginationFee] = useState('');
	const [prepaymentAmount, setPrepaymentAmount] = useState('');
	const [estimatedMonthsTillPayoffDate, setEstimatedMonthsTillPayoffDate] =
		useState('');
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
	const [regularAmortizationTable, setRegularAmortizationTable] =
		useState(null);
	const [monthX, setMonthX] = useState(null);
	const [open, setOpen] = useState(false);

	let interestAccumulatedoverPeriod = 0.0;
	let originationFeeAmount = 0.0;
	let estimatedMonths = 0;
	let regularAmortization = [];
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

	function handleOpen() {
		setOpen(true);
	}
	function handleClose() {
		setOpen(false);
	}

	function numberWithCommas(x) {
		if (x == null || isNaN(x) || x == '') {
			return '';
		}
		var parts = x.toString().split('.');
		console.log(parts);
		// if (isNaN(parts[0])) {
		// 	return 0;
		// }
		parts[0] = parseFloat(parts[0]).toLocaleString();
		return parts.join('.');
	}
	function commasToNumber(value) {
		return value.replace(/,/g, '');
	}
	function filterPercent(value, oldValue) {
		var parts = value.toString().split('.');
		if (isNaN(parts[0])) {
			return 0;
		}
		if (value <= 100 && value >= 0) {
			return value;
		}
		return oldValue;
	}
	function filterPeriod(value, oldValue) {
		if (value == null || isNaN(value) || value == '') {
			return '';
		}

		return Math.abs(value);
	}
	function filteringNaN(value) {
		return isNaN(value) ? 0 : value;
	}

	function calculate() {
		// Set 'Loan Term Length'
		periodLength = loanTermSelect == 'years' ? loanTerm * 12 : loanTerm;

		//Set 'Estimated Months Till Payoff Date' to 'Loan Term Length' if not have a Value or 0
		if (
			estimatedMonthsTillPayoffDate == null ||
			!estimatedMonthsTillPayoffDate
		) {
			setEstimatedMonthsTillPayoffDate(periodLength);
			estimatedMonths = periodLength;
		} else {
			estimatedMonths = estimatedMonthsTillPayoffDate;
		}

		//Set 'Loam Principal Amount'
		if (downPaymentSelect === 'percent') {
			const deduction = purchasePrice * (downpayment / 100);
			loanPrincipalAmount = purchasePrice - deduction;
		} else {
			loanPrincipalAmount = purchasePrice - downpayment;
		}
		//set 'Origination Fee'
		if (originationFeeSelect === 'percent') {
			originationFeeAmount =
				amortizedFee == 'yes'
					? (originationFee / 100) * loanPrincipalAmount
					: 0;
			initialOriginationFee =
				amortizedFee == 'yes'
					? (originationFee / 100) * loanPrincipalAmount
					: 0;
		} else {
			originationFeeAmount = amortizedFee == 'yes' ? originationFee : 0;
			initialOriginationFee = amortizedFee == 'yes' ? originationFee : 0;
		}
		//Convert interest rate in percentage per month
		let rate = interestRate / 100 / 12;

		// Set total principal amount
		let totalPrincipal = loanPrincipalAmount + originationFeeAmount;

		// set amount to be paid per month
		let paymentA = Math.pow(1 + rate, periodLength) - 1;
		let paymentB = rate * Math.pow(1 + rate, periodLength);
		let payment = totalPrincipal / (paymentA / paymentB);

		beginningLoanAmount = totalPrincipal;
		let BeginingInterestAccumulatedoverPeriod =
			beginningLoanAmount * (interestRate / 100 / 12);
		estimatedMonthlyPayment =
			monthlyPayment == 'yes'
				? interestOnly == 'no'
					? payment
					: BeginingInterestAccumulatedoverPeriod
				: 0;
		totalMonthlyLoanCost =
			estimatedMonthlyPayment + Number(administrativeFee);

		//set data for Amortisation Table
		for (let i = 0; i < periodLength; i++) {
			let currentBeginningLoanAmount =
				i > 0
					? regularAmortization[i - 1].endingLoanAmount
					: loanPrincipalAmount;
			let currentOriginationFeeAmount = i > 0 ? 0 : originationFeeAmount;
			let currentInterestAccumulatedoverPeriod =
				(currentBeginningLoanAmount + currentOriginationFeeAmount) *
				(interestRate / 100 / 12);
			let currentEstimatedMonthlyPayment =
				monthlyPayment == 'yes'
					? interestOnly == 'no'
						? payment
						: currentInterestAccumulatedoverPeriod
					: 0;
			let currentEndingLoanAmount =
				currentBeginningLoanAmount +
				currentOriginationFeeAmount +
				currentInterestAccumulatedoverPeriod -
				currentEstimatedMonthlyPayment;
			let currentAccumulatedInterest =
				i > 0
					? currentInterestAccumulatedoverPeriod +
					  regularAmortization[i - 1].accumulatedInterest
					: currentInterestAccumulatedoverPeriod;
			let currentAccumulatedPrincipalPayDown =
				(i > 0
					? regularAmortization[0].beginningLoanAmount +
					  regularAmortization[0].originationFee
					: currentBeginningLoanAmount +
					  currentOriginationFeeAmount) - currentEndingLoanAmount;
			let month = {
				month: i + 1,
				beginningLoanAmount: currentBeginningLoanAmount,
				originationFee: currentOriginationFeeAmount,
				interestAccumulatedoverPeriod:
					currentInterestAccumulatedoverPeriod,
				monthlyPayment: currentEstimatedMonthlyPayment,
				endingLoanAmount: currentEndingLoanAmount,
				accumulatedInterest: currentAccumulatedInterest,
				accumulatedPrincipalPayDown: currentAccumulatedPrincipalPayDown,
			};
			regularAmortization.push(month);
		}
		// set condition  for payoff ballon and regular
		let payoffBalloon =
			balloonPayment == 'yes'
				? estimatedMonths <= monthTillBalloon
					? regularAmortization[estimatedMonths - 1].endingLoanAmount
					: 0
				: 0;
		let payoffRegular =
			balloonPayment == 'no'
				? estimatedMonths <= periodLength
					? regularAmortization[estimatedMonths - 1].endingLoanAmount
					: 0
				: 0;
		// set 'Pay Off Due in Month X'
		payOffDueInMonthX = payoffBalloon + payoffRegular;
		let prepaymentAmountData =
			prepaymentAmountSelect == 'dollar'
				? prepaymentAmount
				: (prepaymentAmount / 100) *
				  regularAmortization[estimatedMonths - 1].endingLoanAmount;
		// set ' Prepayment Penalty Amount'
		prepaymentPenalityAmount =
			prepaymentPenality == 'no'
				? 0
				: balloonPayment == 'yes'
				? estimatedMonths < monthTillBalloon
					? prepaymentAmountData
					: 0
				: estimatedMonths < periodLength
				? prepaymentAmountData
				: 0;
		let totalLoanCost =
			regularAmortization[estimatedMonths - 1].accumulatedInterest +
			prepaymentPenalityAmount +
			originationFeeAmount;
		//set 'Total Principal Repaid'
		totalPrincipalRepaid =
			regularAmortization[estimatedMonths - 1]
				.accumulatedPrincipalPayDown;
		//set 'Monthly Profit After Loan Cost'

		monthlyProfitAfterLoanCost = monthlyRent - totalMonthlyLoanCost;

		setMonthX(estimatedMonthsTillPayoffDate);

		setLoanPrincipal(Math.round(loanPrincipalAmount));
		setEstimatedMonthlyPaymentAmount(Math.round(estimatedMonthlyPayment));
		setTotalMonthlyLoanCostAmount(Math.round(totalMonthlyLoanCost));
		setPayOffDueInMonthXAmount(Math.round(payOffDueInMonthX));
		setPrepaymentPenalityAmountInMonthX(
			Math.round(prepaymentPenalityAmount)
		);
		setTotalPrincipalRepaidAmount(Math.round(totalPrincipalRepaid));
		setTotalLoanCostAmount(Math.round(totalLoanCost));
		setMonthlyProfitAfterLoanCostAmount(
			Math.round(monthlyProfitAfterLoanCost)
		);
		setRegularAmortizationTable(regularAmortization);
	}
	function handleBaloonPaymentSelect(value) {
		setBalloonPayment(value);
		value == 'yes'
			? setEstimatedMonthsTillPayoffDate(monthTillBalloon)
			: null;
	}
	function handleEstimatedMonthsTillPayoffDate(value) {
		balloonPayment == 'yes'
			? value > monthTillBalloon
				? setEstimatedMonthsTillPayoffDate(monthTillBalloon)
				: setEstimatedMonthsTillPayoffDate(value)
			: setEstimatedMonthsTillPayoffDate(value);
	}
	function handleMonthTillBalloon(value) {
		setMonthTillBalloon(filterPeriod(value));

		balloonPayment == 'yes'
			? setEstimatedMonthsTillPayoffDate(filterPeriod(value))
			: null;
	}

	function generateXLSX() {
		const headData = [
			'Month',
			'Beginning Loan Amount',
			'Origination Fee',
			'Interest Accumulated over Period',
			'Monthly Payment',
			'Ending Loan Amount',
			'Accumulated Interest',
			'Accumulated Principal Paydown',
		];

		let regularAmortizationTableConverted = [];
		for (let i = 0; i < regularAmortizationTable.length; i++) {
			if (i == 0) {
				regularAmortizationTableConverted.push(headData);
			}
			regularAmortizationTableConverted.push(
				Object.keys(regularAmortizationTable[i]).map((key) =>
					Math.round(regularAmortizationTable[i][key])
				)
			);
		}

		let tableTranposed = transposeArray(
			regularAmortizationTableConverted,
			regularAmortizationTableConverted.length
		);

		const fileName = 'amortisation table';
		let wb = XLSX.utils.book_new();
		wb.Props = {
			Title: fileName,
			Author: 'digpads.com',
			CreatedDate: new Date(),
		};
		wb.SheetNames.push('Sheet 1');
		let ws = XLSX.utils.aoa_to_sheet(tableTranposed);
		let wscols = [
			{ wpx: 250 }, // "pixels"
		];
		ws['!cols'] = wscols;
		wb.Sheets['Sheet 1'] = ws;
		var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
		const computedXLS = new Blob([s2ab(wbout)], {
			type: 'application/octet-stream',
		});
		const xlsLink = window.URL.createObjectURL(computedXLS);
		const link = document.createElement('a');
		document.body.appendChild(link);
		link.download = 'Amortisation Table Data.xlsx';
		link.href = xlsLink;
		link.click();
	}
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
		var view = new Uint8Array(buf); //create uint8array as viewer
		for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
		return buf;
	}
	function generateXls() {
		const TEMPLATE_XLS = `
        <html
        xmlns:v="urn:schemas-microsoft-com:vml"
         xmlns:mv="http://macVmlSchemaUri"
        xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns="http://www.w3.org/TR/REC-html40">
        <meta http-equiv="content-type" content="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml; charset=UTF-8"/>
        <head><!--[if gte mso 9]><xml>
        <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{title}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>
        <![endif]--></head>
        <body>{table}</body></html>`;
		const MIME_XLS =
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml';

		const parameters = {
			title: 'data',
			table: objectToTable(),
		};
		const computeOutput = TEMPLATE_XLS.replace(
			/{(\w+)}/g,
			(x, y) => parameters[y]
		);

		const computedXLS = new Blob([computeOutput], {
			type: 'application/octet-stream',
			// type: MIME_XLS,
		});
		const xlsLink = window.URL.createObjectURL(computedXLS);
		const link = document.createElement('a');
		document.body.appendChild(link);
		link.download = 'amortisation table data.xlsx';
		link.href = xlsLink;
		link.click();
	}
	function objectToTable() {
		const headData = [
			'Month',
			'Beginning Loan Amount',
			'Origination Fee',
			'Interest Accumulated over Period',
			'Monthly Payment',
			'Ending Loan Amount',
			'Accumulated Interest',
			'Accumulated Principal Paydown',
		];

		let regularAmortizationTableConverted = [];
		for (let i = 0; i < regularAmortizationTable.length; i++) {
			if (i == 0) {
				regularAmortizationTableConverted.push(headData);
			}
			regularAmortizationTableConverted.push(
				Object.keys(regularAmortizationTable[i]).map((key) =>
					Math.round(regularAmortizationTable[i][key])
				)
			);
		}
		// let tableTranposed = regularAmortizationTableConverted.map((_, colIndex) =>
		// 	regularAmortizationTableConverted.map((row) => row[colIndex])
		// );
		let tableTranposed = transposeArray(
			regularAmortizationTableConverted,
			regularAmortizationTableConverted.length
		);
		// const colsHead = `<tr>${Object.keys(headData)
		// 	.map((key) => `<td>${headData[key]}</td>`)
		// 	.join('')}</tr>`;

		const colsData = tableTranposed
			.map((obj) => [
				`<tr>
		        ${Object.keys(obj)
					.map((col) => `<td>${obj[col] ? obj[col] : 0}</td>`)
					.join('')}
		    </tr>`,
			])
			.join('');

		// return `<table>${colsHead}${colsData}</table>`.trim(); // remove spaces...
		return `<table>${colsData}</table>`.trim(); // remove spaces...
	}
	function transposeArray(array, arrayLength) {
		var newArray = [];
		for (var i = 0; i < array[0].length; i++) {
			newArray.push([]);
		}

		for (var a = 0; a < array[0].length; a++) {
			for (var j = 0; j < arrayLength; j++) {
				newArray[a].push(array[j][a]);
			}
		}

		return newArray;
	}
	const clearHandler = () => {
		SetDownPaymentSelect('percent');
		SetLoanTermSelect('months');
		SetOriginationFeeSelect('percent');
		setAmortizedFee('yes');
		setBalloonPayment('yes');
		SetInterestOnly('no');
		setMonthlyPayment('yes');
		setPrepaymentPenality('no');
		setPrepaymentAmountSelect('percent');
		setPurchasePrice(0);
		setMonthlyRent(0);
		setDownpayment(0);
		setLoanTerm(0);
		setAdministrativeFee(0);
		setInterestRate(0);
		setOriginationFee(0);
		setPrepaymentAmount(0);
		setEstimatedMonthsTillPayoffDate(0);
		setMonthTillBalloon(0);
		setLoanPrincipal(0);
		setEstimatedMonthlyPaymentAmount(0);
		setTotalMonthlyLoanCostAmount(0);
		setMonthlyProfitAfterLoanCostAmount(0);
		setPrepaymentPenalityAmountInMonthX(0);
		setPayOffDueInMonthXAmount(0);
		setTotalPrincipalRepaidAmount(0);
		setTotalLoanCostAmount(0);
		setRegularAmortizationTable(null);
		setMonthX(null);
		originationFeeAmount = 0.0;
		estimatedMonths = 0;
		regularAmortization = [];
		loanPrincipalAmount = 0.0;
		periodLength = null;
		estimatedMonthlyPayment = 0.0;
		totalMonthlyLoanCost = 0.0;
		monthlyProfitAfterLoanCost = 0.0;
		beginningLoanAmount = 0.0;
		payOffDueInMonthX = 0.0;
		prepaymentPenalityAmount = 0.0;
		totalPrincipalRepaid = 0.0;
	};
	return (
		<Root>
			<Banner>
				<PageTitle>Hard Money Loan Calculator</PageTitle>
			</Banner>
			<Box bgcolor='#fff'>
				<Typography
					variant='h4'
					component='h2'
					align='center'
					style={{ marginTop: 16 }}
				>
					Value
				</Typography>
				<HardMoneyCalculatorContainer>
					<HardMoneyTitleContainer>
						<div>Calculator Variables</div>
						<Button
							style={{
								backgroundColor: 'yellow',
								color: '#000',
							}}
						>
							<StyledLink href='#instructions'>
								Instructions{' '}
							</StyledLink>
						</Button>
						<Box width={160} />
					</HardMoneyTitleContainer>
					<CalculatorCardContainer>
						<div>Purchase Price</div>
						<div>
							<StyledField
								className={classes.input}
								id='purchasePrice'
								variant='outlined'
								size='small'
								name='purchasePrice'
								value={numberWithCommas(purchasePrice)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									console.log(e.target.value);
									setPurchasePrice(
										commasToNumber(e.target.value)
									);
								}}
								onBlur={(e) => {
									setPurchasePrice(
										filteringNaN(+purchasePrice)
									);
									console.log({ data: purchasePrice });
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Estimated Monthly Rent</div>
						<div>
							<StyledField
								className={classes.input}
								id='monthlyRent'
								variant='outlined'
								size='small'
								name='monthlyRent'
								value={numberWithCommas(monthlyRent)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									setMonthlyRent(
										commasToNumber(e.target.value)
									);
								}}
								onBlur={(e) => {
									setMonthlyRent(filteringNaN(+monthlyRent));
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
								<FormControl
									variant='standard'
									className={classes.formControl}
								>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={downPaymentSelect}
										onChange={(event) => {
											SetDownPaymentSelect(
												event.target.value
											);
											setDownpayment(0);
										}}
									>
										<MenuItem value={'percent'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Percent
											</GreenTextSelect>
										</MenuItem>
										<MenuItem value={'dollar'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Dollar
											</GreenTextSelect>
										</MenuItem>
									</Select>
								</FormControl>
							</div>
						</TextSelectorContainer>

						<div>
							<StyledField
								className={classes.input}
								variant='outlined'
								size='small'
								name='downpayment'
								value={numberWithCommas(downpayment)}
								InputProps={
									downPaymentSelect == 'dollar'
										? {
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
										  }
										: {
												endAdornment: (
													<InputAdornment position='end'>
														%
													</InputAdornment>
												),
												className: classes.inputPercent,
										  }
								}
								onChange={(e) => {
									downPaymentSelect == 'dollar'
										? setDownpayment(
												commasToNumber(e.target.value)
										  )
										: setDownpayment(
												filterPercent(
													e.target.value,
													downpayment
												)
										  );
								}}
								onBlur={(e) => {
									setDownpayment(+downpayment);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<TextSelectorContainer>
							<div style={{ marginTop: '5%' }}>
								Loan Term Length
							</div>
							<div>
								<FormControl
									variant='standard'
									className={classes.formControl}
								>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={loanTermSelect}
										onChange={(event) => {
											SetLoanTermSelect(
												event.target.value
											);
										}}
									>
										<MenuItem value={'months'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Months
											</GreenTextSelect>
										</MenuItem>
										<MenuItem value={'years'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Years
											</GreenTextSelect>
										</MenuItem>
									</Select>
								</FormControl>
							</div>
						</TextSelectorContainer>
						<div>
							<StyledField
								className={(classes.input, classes.inputMonth)}
								variant='outlined'
								size='small'
								name='loanTerm'
								value={filterPeriod(loanTerm)}
								onChange={(e) => {
									setLoanTerm(filterPeriod(e.target.value));
								}}
								onBlur={(e) => {
									setLoanTerm(+loanTerm);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Monthly Administrative Fee</div>
						<div>
							<StyledField
								className={classes.input}
								variant='outlined'
								size='small'
								name='administrativeFee'
								value={numberWithCommas(administrativeFee)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								onChange={(e) => {
									setAdministrativeFee(
										commasToNumber(e.target.value)
									);
								}}
								onBlur={(e) => {
									setAdministrativeFee(+administrativeFee);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Annual Interest Rate(%)</div>
						<div>
							<StyledField
								className={classes.input}
								variant='outlined'
								size='small'
								name='interestRate'
								value={numberWithCommas(interestRate)}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											%
										</InputAdornment>
									),
									className: classes.inputPercent,
								}}
								onChange={(e) => {
									setInterestRate(
										filterPercent(
											e.target.value,
											interestRate
										)
									);
								}}
								onBlur={(e) => {
									setInterestRate(+interestRate);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<TextSelectorContainer>
							<div style={{ marginTop: '5%' }}>
								Origination Fees
							</div>
							<div>
								<FormControl
									variant='standard'
									className={classes.formControl}
								>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={originationFeeSelect}
										onChange={(event) => {
											SetOriginationFeeSelect(
												event.target.value
											);
											setOriginationFee(0);
										}}
									>
										<MenuItem value={'percent'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Percent
											</GreenTextSelect>
										</MenuItem>
										<MenuItem value={'dollar'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Dollar
											</GreenTextSelect>
										</MenuItem>
									</Select>
								</FormControl>
							</div>
						</TextSelectorContainer>
						<div>
							<StyledField
								className={classes.input}
								variant='outlined'
								size='small'
								name='originationFee'
								value={numberWithCommas(originationFee)}
								InputProps={
									originationFeeSelect == 'dollar'
										? {
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
										  }
										: {
												endAdornment: (
													<InputAdornment position='end'>
														%
													</InputAdornment>
												),
												className: classes.inputPercent,
										  }
								}
								onChange={(e) => {
									originationFeeSelect == 'dollar'
										? setOriginationFee(
												commasToNumber(e.target.value)
										  )
										: setOriginationFee(
												filterPercent(
													e.target.value,
													originationFee
												)
										  );
								}}
								onBlur={(e) => {
									setOriginationFee(+originationFee);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					{/* Commented complex features so we are only using simple features  */}
					<CalculatorCardContainer>
						<div>Amortized Origination Fees ?</div>
						<div>
							<FormControl
								variant='standard'
								className={classes.formControl}
							>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={amortizedFee}
									onChange={(event) => {
										setAmortizedFee(event.target.value);
									}}
								>
									<MenuItem value={'yes'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											Yes
										</GreenTextSelect>
									</MenuItem>
									<MenuItem value={'no'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											No
										</GreenTextSelect>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Balloon Payment ?</div>
						<div>
							<FormControl
								variant='standard'
								className={classes.formControl}
							>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={balloonPayment}
									onChange={(event) => {
										handleBaloonPaymentSelect(
											event.target.value
										);
									}}
								>
									<MenuItem value={'yes'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											Yes
										</GreenTextSelect>
									</MenuItem>
									<MenuItem value={'no'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											No
										</GreenTextSelect>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Months till Balloon Payment Due</div>
						<div>
							<StyledField
								className={(classes.input, classes.inputMonth)}
								variant='outlined'
								size='small'
								name='monthTillBalloon'
								value={filterPeriod(monthTillBalloon)}
								onChange={(e) => {
									handleMonthTillBalloon(e.target.value);
								}}
								onBlur={(e) => {
									handleMonthTillBalloon(+monthTillBalloon);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Interest Only ?</div>
						<div>
							<FormControl
								variant='standard'
								className={classes.formControl}
							>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={interestOnly}
									onChange={(event) => {
										SetInterestOnly(event.target.value);
									}}
								>
									<MenuItem value={'yes'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											Yes
										</GreenTextSelect>
									</MenuItem>
									<MenuItem value={'no'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											No
										</GreenTextSelect>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Monthly Payments ?</div>
						<div>
							<FormControl
								variant='standard'
								className={classes.formControl}
							>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={monthlyPayment}
									onChange={(event) => {
										setMonthlyPayment(event.target.value);
									}}
								>
									<MenuItem value={'yes'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											Yes
										</GreenTextSelect>
									</MenuItem>
									<MenuItem value={'no'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											No
										</GreenTextSelect>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Prepayment Penalty ?</div>
						<div>
							<FormControl
								variant='standard'
								className={classes.formControl}
							>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={prepaymentPenality}
									onChange={(event) => {
										setPrepaymentPenality(
											event.target.value
										);
									}}
								>
									<MenuItem value={'yes'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											Yes
										</GreenTextSelect>
									</MenuItem>
									<MenuItem value={'no'}>
										<GreenTextSelect
											variant={'inherit'}
											classes={{
												root: classes.root,
											}}
										>
											No
										</GreenTextSelect>
									</MenuItem>
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
								<FormControl
									variant='standard'
									className={classes.formControl}
								>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={prepaymentAmountSelect}
										onChange={(event) => {
											setPrepaymentAmountSelect(
												event.target.value
											);
											setPrepaymentAmount(0);
										}}
									>
										<MenuItem value={'percent'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Percent
											</GreenTextSelect>
										</MenuItem>
										<MenuItem value={'dollar'}>
											<GreenTextSelect
												variant={'inherit'}
												classes={{
													root: classes.root,
												}}
											>
												Dollar
											</GreenTextSelect>
										</MenuItem>
									</Select>
								</FormControl>
							</div>
						</TextSelectorContainer>
						<div>
							<StyledField
								className={classes.input}
								variant='outlined'
								size='small'
								name='prepaymentAmount'
								value={numberWithCommas(prepaymentAmount)}
								InputProps={
									prepaymentAmountSelect == 'dollar'
										? {
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
										  }
										: {
												endAdornment: (
													<InputAdornment position='end'>
														%
													</InputAdornment>
												),
												className: classes.inputPercent,
										  }
								}
								onChange={(e) => {
									prepaymentAmountSelect == 'dollar'
										? setPrepaymentAmount(
												commasToNumber(e.target.value)
										  )
										: setPrepaymentAmount(
												filterPercent(
													e.target.value,
													prepaymentAmount
												)
										  );
								}}
								onBlur={(e) => {
									setPrepaymentAmount(+prepaymentAmount);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>
							<div>Estimated Months Till Payoff Date</div>
							<div style={{ fontSize: 10 + 'px' }}>
								<small>
									May not exceed balloon payment due date if a
									balloon loan is utilized.
								</small>
							</div>
						</div>
						<div>
							<StyledField
								className={(classes.input, classes.inputMonth)}
								variant='outlined'
								size='small'
								name='estimatedMonths'
								value={filterPeriod(
									estimatedMonthsTillPayoffDate
								)}
								onChange={(e) => {
									handleEstimatedMonthsTillPayoffDate(
										filterPeriod(e.target.value)
									);
								}}
								onBlur={(e) => {
									handleEstimatedMonthsTillPayoffDate(
										+estimatedMonthsTillPayoffDate
									);
								}}
							/>
						</div>
					</CalculatorCardContainer>
					<ButtonCardContainer>
						<Button
							variant='contained'
							color='primary'
							style={{ height: '40px' }}
							onClick={calculate}
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
				<Typography
					variant='h4'
					component='h2'
					align='center'
					style={{ marginTop: 16 }}
				>
					Value
				</Typography>
				<HardMoneyCalculatorContainer>
					<HardMoneyTitleContainer>
						<div>Outputs</div>
					</HardMoneyTitleContainer>
					<CalculatorCardContainer>
						<div>Loan Principal Amount</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(loanPrincipal)}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Estimated Monthly Payment</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(
									estimatedMonthlyPaymentAmount
								)}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Total Monthly Loan Cost</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(
									totalMonthlyLoanCostAmount
								)}
							/>
						</div>
					</CalculatorCardContainer>
					{/* Complex outputs commented */}
					<CalculatorCardContainer>
						<div>Payoff Due in Month {monthX}</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(
									payOffDueInMonthXAmount
								)}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Prepayment Penalty</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(
									prepaymentPenalityAmountInMonthX
								)}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div>Total Loan Cost</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(totalLoanCostAmount)}
							/>
						</div>
					</CalculatorCardContainer>
					{/* Commented Complex output field */}
					<CalculatorCardContainer>
						<div>Total Principal Repaid During Term</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(
									totalPrincipalRepaidAmount
								)}
							/>
						</div>
					</CalculatorCardContainer>
					<CalculatorCardContainer>
						<div> Monthly Profit after Loan Costs</div>
						<div>
							<StyledField
								type='text'
								variant='outlined'
								size='small'
								name='purchasePrice'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											$
										</InputAdornment>
									),
								}}
								value={numberWithCommas(
									monthlyProfitAfterLoanCostAmount
								)}
							/>
						</div>
					</CalculatorCardContainer>
				</HardMoneyCalculatorContainer>
				<ButtonCardContainer>
					<Button
						variant='contained'
						color='primary'
						onClick={generateXLSX}
						style={{ height: '40px' }}
					>
						Download amortization Data
					</Button>
				</ButtonCardContainer>
				<Container>
					<Box display='flex' flexDirection='row-reverse' mt={4}>
						<Button onClick={handleOpen} variant='contained'>
							Send Feedback
						</Button>
					</Box>
				</Container>
			</Box>
			<ModalFeedback
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
			/>
			<Instruction />
		</Root>
	);
}

export default HardMoneyCalculatorInput;
