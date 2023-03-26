import React, { useState, useCallback, useEffect } from 'react';
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
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PageTitle, Banner } from '../styled/Page';
import MyModal from '../Modal';
import { Alert } from '@mui/material';

const PREFIX = 'HardMoneyCalculatorInput';

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

function HardMoneyCalculatorInput() {
	const [openModal, setOpen] = useState(false);
	const [openApplianceModal, setOpenApplianceModal] = useState(false);
	const [openUtilitiesModal, setOpenUtilitiesModal] = useState(false);
	const [openMiscellaneousModal, setOpenMiscellaneousModal] = useState(false);
	const [estimateRent, setEstimateRent] = useState(0);
	const [turnoverPeriod, setTurnoverPeriod] = useState('1');
	const [totalLostRent, setTotalLostRent] = useState(0);
	const [hoaSelect, setHoaSelect] = useState(10);
	const [hoaAmount, setHoaAmount] = useState(0);
	const [totalHoaAmount, setTotalHoaAmount] = useState(0);
	const [costPerTenantScreening, setCostPerTenantScreening] = useState(0);
	const [
		numberOfPerspectiveTenantsToScreen,
		setNumberOfPerspectiveTenantsToScreen,
	] = useState(0);
	const [totalCostScreen, setTotalCostScreen] = useState(0);
	const [lawnMaintenance, setLawnMaintenance] = useState(0);
	const [totalLawnMaintenance, setTotalLawnMaintenance] =
		useState(lawnMaintenance);

	const [cleaningSelect, setCleaningSelect] = useState('10');
	const [cleaningFlatFee, setCleaningLatFee] = useState(0);
	const [cleaningHours, setCleaningHours] = useState(0);
	const [cleaningHourlyRate, setCleaningHourlyRate] = useState(0);
	const [totalCleaningCost, setTotalCleaningCost] = useState(0);
	const [switchingOutLocksCostPerLock, setSwitchingOutLocksCostPerLock] =
		useState(0);
	const [numberOfLocksToChange, setNumberOfLocksToChange] = useState(0);
	const [totalCostOfChangingOutLocks, setTotalCostOfChangingOutLocks] =
		useState(0);
	const [flooringRepairOrReplacement, setFlooringRepairOrReplacement] =
		useState(0);
	const [paintingAmount, setPaintingAmount] = useState(0);
	const [plumbingAmount, setPlumbingAmount] = useState(0);
	const [wallOrCeilingRepair, setWallOrCeilingRepair] = useState(0);
	const [electrical, setElectrical] = useState(0);
	const [roofRepair, setRoofRepair] = useState(0);
	const [materials, setMaterials] = useState(0);
	const [generalRepairs, setGeneralRepairs] = useState(0);
	const [doorAndDoorHandles, setDoorAndDoorHandles] = useState(0);
	const [kitchenRepair, setKitchenRepair] = useState(0);
	const [bathroomRepair, setBathroomRepair] = useState(0);
	const [hvacRepair, setHvacRepair] = useState(0);
	const [sprinklerSystemRepair, setSprinklerSystemRepair] = useState(0);
	const [others, setOthers] = useState(0);
	const [totalEstimatedRepairCosts, setTotalEstimatedRepairCosts] =
		useState(0);
	const [repairCostExpensesName, setRepairCostExpensesName] = useState('');
	const [repairCostExpensesAmount, setRepairCostExpensesAmount] = useState(0);
	let [
		additionalRepairCostExpensesAmount,
		setAdditionalRepairCostExpensesAmount,
	] = useState([]);

	const [rangeOven, setRangeOven] = useState(0);
	const [dishWasher, setDishWasher] = useState(0);
	const [microWave, setMicroWave] = useState(0);
	const [refrigerator, setRefrigerator] = useState(0);
	const [washMachine, setWashMachine] = useState(0);
	const [dryer, setDryer] = useState(0);
	const [furnace, setFurnace] = useState(0);
	const [acCondenser, setAcCondenser] = useState(0);
	const [hotWaterHeater, setHotWaterHeater] = useState(0);
	const [
		totalEstimatedApplianceReplacements,
		setTotalEstimatedApplianceReplacements,
	] = useState(0);
	const [applianceCostExpensesName, setApplianceCostExpensesName] =
		useState('');

	const [applianceCostExpensesAmount, setApplianceCostExpensesAmount] =
		useState(0);

	let [
		additionalApplianceCostExpensesAmount,
		setAdditionalApplianceCostExpensesAmount,
	] = useState([]);
	const [estimatedNaturalGasCost, setEstimatedNaturalGasCost] = useState(0);
	const [totalNaturalGasCost, setTotalNaturalGasCost] = useState(0);
	const [estimatedElectricityCost, setEstimatedElectricityCost] = useState(0);
	const [totalElectricityCost, setTotalElectricityCost] = useState(0);
	const [waterEstimatedCost, setWaterEstimatedCost] = useState(0);
	const [totalWaterCost, setTotalWaterCost] = useState(0);
	const [estimatedSewerCost, setEstimatedSewerCost] = useState(0);
	const [totalSewerCost, setTotalSewerCost] = useState(0);
	const [estimatedTrashCost, setEstimatedTrashCost] = useState(0);
	const [totalTrashCost, setTotalTrashCost] = useState(0);
	const [estimatedTotalUtilitiesCost, setEstimatedTotalUtilitiesCost] =
		useState(0);

	const [totalTurnoverUtilitiesCost, setTotalTurnoverUtilitiesCost] =
		useState(0);
	const [utilitiesCostName, setUtilitiesCostName] = useState('');
	const [utilitiesEstimatedCost, setUtilitiesEstimatedCost] = useState(0);
	const [utilitiesTurnoverTotalCost, setUtilitiesTurnoverTotalCost] =
		useState(0);
	let [additionalUtilitiesCost, setAdditionalUtilitiesCost] = useState([]);
	const [termiteTreatment, setTermiteTreatment] = useState(0);
	const [misc1Name, setMisc1Name] = useState('');
	const [misc1Cost, setMisc1Cost] = useState(0);
	const [misc2Name, setMisc2Name] = useState('');
	const [misc2Cost, setMisc2Cost] = useState(0);
	const [miscallaneousName, setMiscallaneousName] = useState('');
	const [miscallaneousCost, setMiscallaneousCost] = useState(0);
	const [allMiscellaneousCost, SetAllMiscellaneousCost] = useState([]);
	const [totalMiscellaneousCost, setTotalMiscellaneousCost] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const calculateTotalLostRent = () => {
		const lostRent = estimateRent * turnoverPeriod;
		setTotalLostRent(lostRent);
	};
	const calculateHoaAmount = () => {
		if (hoaSelect === 10) {
			const hoa = hoaAmount * turnoverPeriod;
			setTotalHoaAmount(hoa);
		} else {
			setTotalHoaAmount(0);
		}
	};
	const calculateTotalScreenCost = () => {
		const screenCost =
			costPerTenantScreening * numberOfPerspectiveTenantsToScreen;
		setTotalCostScreen(screenCost);
	};

	const modalControl = () => {
		setOpen(!openModal);
	};
	const applianceModalControl = () => {
		setOpenApplianceModal(!openApplianceModal);
	};
	const utilitiesModalControl = () => {
		setOpenUtilitiesModal(!openUtilitiesModal);
	};
	const miscelaneousControl = () => {
		setOpenMiscellaneousModal(!openMiscellaneousModal);
	};

	const additionalEstimatedRepairCostsHandler = useCallback(() => {
		const additionalExpense = {
			name: repairCostExpensesName,
			amount: repairCostExpensesAmount,
		};
		setAdditionalRepairCostExpensesAmount(
			(additionalRepairCostExpensesAmount) => [
				...additionalRepairCostExpensesAmount,
				additionalExpense,
			]
		);
		setRepairCostExpensesName('');
		setRepairCostExpensesAmount(0);
	}, [repairCostExpensesName, repairCostExpensesAmount]);
	const additionalMiscellaneousCostsHandler = useCallback(() => {
		const additionalExpense = {
			name: miscallaneousName,
			amount: miscallaneousCost,
		};
		SetAllMiscellaneousCost((allMiscellaneousCost) => [
			...allMiscellaneousCost,
			additionalExpense,
		]);
		setMiscallaneousName('');
		setMiscallaneousCost(0);
	}, [miscallaneousName, miscallaneousCost]);
	const additionalUtilitiesCostsHandler = useCallback(() => {
		const additionalExpense = {
			name: utilitiesCostName,
			EstimatedMonthlyCost: utilitiesEstimatedCost,
			turnoverPeriodTotalCost: utilitiesTurnoverTotalCost,
		};
		setAdditionalUtilitiesCost((additionalUtilitiesCost) => [
			...additionalUtilitiesCost,
			additionalExpense,
		]);
		setUtilitiesCostName('');
		setUtilitiesEstimatedCost(0);
		setUtilitiesTurnoverTotalCost(0);
	}, [utilitiesCostName, utilitiesEstimatedCost, utilitiesTurnoverTotalCost]);

	const additionalEstimatedApplianceCostsHandler = useCallback(() => {
		const additionalExpense = {
			name: applianceCostExpensesName,
			amount: applianceCostExpensesAmount,
		};

		setAdditionalApplianceCostExpensesAmount(
			(additionalApplianceCostExpensesAmount) => [
				...additionalApplianceCostExpensesAmount,
				additionalExpense,
			]
		);
		setApplianceCostExpensesName('');
		setApplianceCostExpensesAmount(0);
	}, [applianceCostExpensesName, applianceCostExpensesAmount]);

	useEffect(() => {
		console.log(additionalRepairCostExpensesAmount);
		console.log(additionalApplianceCostExpensesAmount);
		console.log(totalEstimatedRepairCosts);
		console.log(totalEstimatedApplianceReplacements);
		console.log(additionalUtilitiesCost);
		console.log(allMiscellaneousCost);
	}, [
		additionalRepairCostExpensesAmount,
		additionalApplianceCostExpensesAmount,
		totalEstimatedRepairCosts,
		totalEstimatedApplianceReplacements,
		additionalUtilitiesCost,
		allMiscellaneousCost,
	]);

	const calculateEstimatedApplianceCostsHandler = () => {
		let sum = 0;
		if (additionalApplianceCostExpensesAmount.length) {
			additionalApplianceCostExpensesAmount.map((exp) => {
				sum = sum + parseInt(exp.amount);
				return sum;
			});
		}
		const newSum =
			sum +
			parseInt(rangeOven) +
			parseInt(dishWasher) +
			parseInt(microWave) +
			parseInt(refrigerator) +
			parseInt(washMachine) +
			parseInt(dryer) +
			parseInt(furnace) +
			parseInt(acCondenser) +
			parseInt(hotWaterHeater);
		setTotalEstimatedApplianceReplacements(newSum);
	};
	const addMiscallaneousHandler = () => {
		let sum = 0;
		if (allMiscellaneousCost.length) {
			allMiscellaneousCost.map((exp) => {
				sum = sum + parseInt(exp.amount);
				return sum;
			});
		}
		const newSum =
			sum +
			parseInt(termiteTreatment) +
			parseInt(misc1Cost) +
			parseInt(misc2Cost);
		setTotalMiscellaneousCost(newSum);
	};
	const calculateEstimatedRepairCostsHandler = () => {
		let sum = 0;
		if (additionalRepairCostExpensesAmount.length) {
			additionalRepairCostExpensesAmount.map((exp) => {
				sum = sum + parseInt(exp.amount);
				return sum;
			});
		}
		const newSum =
			sum +
			parseInt(switchingOutLocksCostPerLock) +
			parseInt(totalCostOfChangingOutLocks) +
			parseInt(flooringRepairOrReplacement) +
			parseInt(paintingAmount) +
			parseInt(plumbingAmount) +
			parseInt(wallOrCeilingRepair) +
			parseInt(electrical) +
			parseInt(roofRepair) +
			parseInt(materials) +
			parseInt(generalRepairs) +
			parseInt(doorAndDoorHandles) +
			parseInt(kitchenRepair) +
			parseInt(bathroomRepair) +
			parseInt(hvacRepair) +
			parseInt(sprinklerSystemRepair) +
			parseInt(others);
		setTotalEstimatedRepairCosts(newSum);
	};
	const calculateTotalUtilitiesCostsHandler = () => {
		let estimatedUtilitiesSum = 0;
		let turnOverPeriodCostSum = 0;
		if (additionalUtilitiesCost.length) {
			additionalUtilitiesCost.map((exp) => {
				estimatedUtilitiesSum =
					parseInt(estimatedUtilitiesSum) +
					parseInt(exp.EstimatedMonthlyCost);
				turnOverPeriodCostSum =
					turnOverPeriodCostSum +
					parseInt(exp.turnoverPeriodTotalCost);
				return estimatedUtilitiesSum, turnOverPeriodCostSum;
			});
		}
		const newEstimatedUtilitiesSum =
			parseInt(estimatedUtilitiesSum) +
			parseInt(estimatedNaturalGasCost) +
			parseInt(estimatedElectricityCost) +
			parseInt(waterEstimatedCost) +
			parseInt(estimatedSewerCost) +
			parseInt(estimatedTrashCost);
		const newTurnOverPeriodCostSum =
			turnOverPeriodCostSum +
			parseInt(totalNaturalGasCost) +
			parseInt(totalElectricityCost) +
			parseInt(totalWaterCost) +
			parseInt(totalSewerCost) +
			parseInt(totalTrashCost);
		setEstimatedTotalUtilitiesCost(newEstimatedUtilitiesSum);
		setTotalTurnoverUtilitiesCost(newTurnOverPeriodCostSum);
	};
	const totalNaturalGasHandler = () => {
		setTotalNaturalGasCost(estimatedNaturalGasCost * turnoverPeriod);
	};
	const totalElectricityCostHandler = () => {
		setTotalElectricityCost(estimatedElectricityCost * turnoverPeriod);
	};
	const totalWaterCostHandler = () => {
		setTotalWaterCost(waterEstimatedCost * turnoverPeriod);
	};
	const totalSewerCostHandler = () => {
		setTotalSewerCost(estimatedSewerCost * turnoverPeriod);
	};
	const totalTrashCostHandler = () => {
		setTotalTrashCost(estimatedTrashCost * turnoverPeriod);
	};

	const utilitiesTurnoverTotalCostHandler = () => {
		setUtilitiesTurnoverTotalCost(utilitiesEstimatedCost * turnoverPeriod);
	};

	const overAllCostHandler = () => {
		const overallSum =
			parseInt(totalLostRent) +
			parseInt(totalHoaAmount) +
			parseInt(totalEstimatedRepairCosts) +
			parseInt(totalEstimatedApplianceReplacements) +
			parseInt(totalCleaningCost) +
			parseInt(totalTurnoverUtilitiesCost) +
			parseInt(totalLawnMaintenance) +
			parseInt(totalMiscellaneousCost) +
			parseInt(totalCostScreen);
		setTotalCost(overallSum);
	};
	function generatePDF() {
		var doc = new jsPDF('portrait', 'px', 'a4', 'false');
		doc.text(50, 20, 'Turnover Cost Calculator ');
		doc.text(50, 50, `Lost Rent Estimate `);
		doc.text(50, 70, `Estimated Weeks Vacant :${turnoverPeriod} `);
		doc.text(50, 85, `Estimated Rent :${estimateRent} `);
		doc.text(50, 100, `Total Lost Rent:${totalLostRent} `);

		doc.text(50, 130, 'HOA Fees ');
		doc.text(50, 150, `Monthly HOA Fee :${hoaAmount}`);
		doc.text(50, 165, `Estimated Weeks Vacant :${turnoverPeriod} `);
		doc.text(50, 180, `Total HOA Fees :${totalHoaAmount}`);
		doc.text(50, 210, `Cleaning `);
		if (cleaningSelect === 10) {
			doc.text(50, 230, `Flat Fee:${cleaningFlatFee} `);

			doc.text(
				50,
				245,
				`Total Estimated Cleaning Costs:${totalCleaningCost} `
			);
		} else {
			doc.text(50, 230, `Hours:${cleaningHours} `);
			doc.text(50, 245, `Hourly Rate: ${cleaningHourlyRate} `);
			doc.text(
				50,
				260,
				`Total Estimated Cleaning Costs:${totalCleaningCost} `
			);
		}
		doc.text(50, 290, `Tenant Screening Fees`);
		doc.text(
			50,
			310,
			`Cost per Tenant Screening: ${costPerTenantScreening}`
		);
		doc.text(
			50,
			325,
			`Number of Prospective Tenants to Screen: ${numberOfPerspectiveTenantsToScreen}`
		);
		doc.text(50, 340, `Total Tenant Screening Costs: ${totalCostScreen}`);

		doc.text(50, 370, 'Estimated Repairs Needed ');
		doc.text(
			50,
			390,
			`Switching out Locks Cost per Lock:${switchingOutLocksCostPerLock} `
		);
		doc.text(
			50,
			405,
			`Number of Locks to Change:${numberOfLocksToChange} `
		);
		doc.text(
			50,
			420,
			`Total Cost of Changing Out Locks:${totalCostOfChangingOutLocks} `
		);
		doc.text(
			50,
			435,
			`Flooring Repair/Replacement:${flooringRepairOrReplacement} `
		);
		doc.text(50, 450, `Painting:${paintingAmount} `);
		doc.text(50, 465, `Plumbing:${plumbingAmount} `);
		doc.text(50, 480, `Wall/Ceiling Repair:${wallOrCeilingRepair} `);
		doc.text(50, 495, `Electrical:${electrical} `);
		doc.text(50, 510, `Roof Repair:${roofRepair} `);
		doc.text(50, 525, `Materials:${materials} `);
		doc.text(50, 540, `General Repairs:${generalRepairs} `);
		doc.text(50, 555, `Door and Door Handles:${doorAndDoorHandles} `);
		doc.text(50, 570, `Kitchen Repair:${kitchenRepair} `);
		doc.text(50, 585, `Bathroom Repair:${bathroomRepair} `);
		doc.text(50, 600, `HVAC Repair:${hvacRepair} `);
		doc.addPage();
		doc.text(50, 50, `Sprinkler System Repair:${sprinklerSystemRepair} `);
		doc.text(50, 65, `Others:${others} `);
		let i = 80;
		if (additionalRepairCostExpensesAmount.length) {
			additionalRepairCostExpensesAmount.map((expense) => {
				doc.text(50, i, `${expense.name}:${expense.amount} `);
				i = i + 15;
			});
		}
		doc.text(
			50,
			i,
			`Total Estimated Repair Costs:${totalEstimatedRepairCosts} `
		);

		doc.addPage();

		doc.text(50, 50, 'Appliance Replacements ');
		doc.text(50, 70, `Range/Oven: ${rangeOven}`);
		doc.text(50, 85, `Dishwasher:${dishWasher} `);
		doc.text(50, 100, `Microwave:${microWave} `);
		doc.text(50, 115, `Refrigerator:${refrigerator} `);
		doc.text(50, 130, `Dryer :${dryer} `);
		doc.text(50, 145, `Furnace :${furnace} `);
		doc.text(50, 160, `AC Condenser:${acCondenser} `);
		doc.text(50, 175, `Hot Water Heater:${hotWaterHeater} `);
		let j = 190;
		if (additionalApplianceCostExpensesAmount.length) {
			additionalApplianceCostExpensesAmount.map((expense) => {
				doc.text(50, j, `${expense.name}:${expense.amount} `);
				j = j + 15;
			});
		}
		doc.text(
			50,
			j,
			`Total Estimated Appliance Replacements:${totalEstimatedApplianceReplacements} `
		);
		doc.addPage();
		doc.text(50, 50, `Lawn Maintenance`);
		doc.text(50, 70, `Lawn Maintenance: ${lawnMaintenance}`);
		doc.text(50, 85, `Total Lawn Maintenance:${totalLawnMaintenance}`);
		doc.text(50, 115, `Utilities `);
		doc.text(50, 135, `Natural Gas :${totalNaturalGasCost} `);
		doc.text(50, 150, `Electricity :${totalElectricityCost} `);
		doc.text(50, 165, `Water :${totalWaterCost} `);
		doc.text(50, 180, `Sewer :${totalSewerCost}`);
		doc.text(50, 195, `Trash :${totalTrashCost}`);
		let k = 210;
		if (additionalUtilitiesCost.length) {
			additionalUtilitiesCost.map((expense) => {
				doc.text(
					50,
					k,
					`${expense.name}:${expense.turnoverPeriodTotalCost} `
				);

				k = k + 15;
			});
		}
		doc.text(
			50,
			k,
			`Total Estimated Utilities :${totalTurnoverUtilitiesCost}`
		);

		doc.addPage();

		doc.text(50, 50, `Miscellaneous Expenses`);
		doc.text(50, 70, `Termite Treatment: ${termiteTreatment}`);
		if (misc1Cost !== 0) {
			doc.text(50, 85, `${misc1Name}:${misc1Cost}`);
			if (misc2Cost !== 0) {
				doc.text(50, 100, `${misc1Name}:${misc2Cost}`);
			}
		}
		let p = 115;
		if (allMiscellaneousCost.length) {
			allMiscellaneousCost.map((expense) => {
				doc.text(50, p, `${expense.name}:${expense.amount} `);

				p = p + 15;
			});
		}
		doc.text(
			50,
			p,
			`Total Miscellaneous Expenses:${totalMiscellaneousCost}`
		);
		doc.text(50, p + 30, `Total  Expenses:${totalCost}`);

		doc.save('digpads.pdf');
	}

	return (
		<Root>
			<Banner>
				<PageTitle>Turnover cost calculator</PageTitle>
			</Banner>
			<HardMoneyPageTitleContainer></HardMoneyPageTitleContainer>
			<HardMoneyCalculatorContainer>
				<div>Lost Rent Estimate</div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<div>Estimated Weeks Vacant </div>
					<div>
						<FormControl className={classes.formControl}>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={turnoverPeriod}
								onChange={(event) => {
									setTurnoverPeriod(event.target.value);
								}}
							>
								<MenuItem value={0.25}>1 week</MenuItem>
								<MenuItem value={0.5}>2 weeks</MenuItem>
								<MenuItem value={0.75}>3 weeks</MenuItem>
								<MenuItem value={1}>1 month</MenuItem>
								<MenuItem value={1.25}>5 weeks</MenuItem>
								<MenuItem value={1.5}>6 weeks</MenuItem>
								<MenuItem value={1.75}>7 weeks</MenuItem>
								<MenuItem value={2}>2 month</MenuItem>
								<MenuItem value={2.25}>9 weeks</MenuItem>
								<MenuItem value={2.5}>10 weeks</MenuItem>
								<MenuItem value={2.75}>11 weeks</MenuItem>
								<MenuItem value={3}>3 months</MenuItem>
							</Select>
						</FormControl>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Estimated Rent </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimateRent'
							value={estimateRent}
							onChange={(e) => {
								setEstimateRent(e.target.value);
							}}
							onBlur={calculateTotalLostRent}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Lost Rent </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalLostRent'
							value={totalLostRent}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<div>HOA Fees </div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<TextSelectorContainer>
						<div style={{ marginTop: '3%' }}>Monthly HOA Fee</div>
						<div>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={hoaSelect}
									onChange={(event) => {
										setHoaSelect(event.target.value);
									}}
								>
									<MenuItem value={10}>Yes</MenuItem>
									<MenuItem value={20}>No</MenuItem>
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
							name='hoaAmount'
							value={hoaAmount}
							onChange={(e) => {
								setHoaAmount(e.target.value);
							}}
							onBlur={calculateHoaAmount}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Turnover Period (selected above) </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='turnoverPeriod'
							value={turnoverPeriod}
						/>
					</div>
				</CalculatorCardContainer>
				{/* <CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{ height: '40px' }}
						onClick={calculateHoaAmount}
					>
						calculate
					</Button>
				</CalculatorCardContainer> */}
				<CalculatorCardContainer>
					<div>Total HOA Fees</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalHoaAmount'
							value={totalHoaAmount}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<MyModal display={openModal} modalControl={modalControl}>
					<Alert severity='info' style={{ marginBottom: '10px' }}>
						<Typography> Add new expenses</Typography>
					</Alert>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Expense name</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='repairCostExpensesName'
								value={repairCostExpensesName}
								onChange={(e) => {
									setRepairCostExpensesName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Amount</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='repairCostExpensesAmount'
								value={repairCostExpensesAmount}
								onChange={(e) => {
									setRepairCostExpensesAmount(e.target.value);
								}}
							/>
						</div>
					</div>

					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							width: '300px',

							display: 'flex',
							alignItems: 'center',
							margin: '30px auto',
							fontSize: '16px',
							textTransform: 'Capitalize',
						}}
						onClick={additionalEstimatedRepairCostsHandler}
					>
						Add additional expense
					</Button>
				</MyModal>
				<div>Estimated Repairs Needed </div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>

				<CalculatorCardContainer>
					<div>Switching out Locks Cost per Lock</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='switchingOutLocksCostPerLock'
							value={switchingOutLocksCostPerLock}
							onChange={(e) => {
								setSwitchingOutLocksCostPerLock(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Number of Locks to Change</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='numberOfLocksToChange'
							value={numberOfLocksToChange}
							onChange={(e) => {
								setNumberOfLocksToChange(e.target.value);
							}}
							onBlur={() =>
								setTotalCostOfChangingOutLocks(
									numberOfLocksToChange *
										switchingOutLocksCostPerLock
								)
							}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Cost of Changing Out Locks</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalCostOfChangingOutLocks'
							value={totalCostOfChangingOutLocks}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Flooring Repair/Replacement</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='flooringRepairOrReplacement'
							value={flooringRepairOrReplacement}
							onChange={(e) => {
								setFlooringRepairOrReplacement(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Painting</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='paintingAmount'
							value={paintingAmount}
							onChange={(e) => {
								setPaintingAmount(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Plumbing</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='plumbingAmount'
							value={plumbingAmount}
							onChange={(e) => {
								setPlumbingAmount(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Wall/Ceiling Repair</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='wallOrCeilingRepair'
							value={wallOrCeilingRepair}
							onChange={(e) => {
								setWallOrCeilingRepair(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Electrical</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='electrical'
							value={electrical}
							onChange={(e) => {
								setElectrical(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Roof Repair</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='roofRepair'
							value={roofRepair}
							onChange={(e) => {
								setRoofRepair(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Materials</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='materials'
							value={materials}
							onChange={(e) => {
								setMaterials(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>General Repairs</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='generalRepairs'
							value={generalRepairs}
							onChange={(e) => {
								setGeneralRepairs(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Door and Door Handles </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='doorAndDoorHandles'
							value={doorAndDoorHandles}
							onChange={(e) => {
								setDoorAndDoorHandles(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Kitchen Repair </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='kitchenRepair'
							value={kitchenRepair}
							onChange={(e) => {
								setKitchenRepair(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Bathroom Repair </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='bathroomRepair'
							value={bathroomRepair}
							onChange={(e) => {
								setBathroomRepair(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>HVAC Repair</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='hvacRepair'
							value={hvacRepair}
							onChange={(e) => {
								setHvacRepair(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Sprinkler System Repair</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='sprinklerSystemRepair'
							value={sprinklerSystemRepair}
							onChange={(e) => {
								setSprinklerSystemRepair(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Others</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='others'
							value={others}
							onChange={(e) => {
								setOthers(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				{additionalRepairCostExpensesAmount.length
					? additionalRepairCostExpensesAmount.map((expense) => (
							<CalculatorCardContainer key={expense.name}>
								<div>{expense.name}</div>
								<div>
									<StyledField
										autoFocus
										type='text'
										variant='outlined'
										size='small'
										name='others'
										value={expense.amount}
									/>
								</div>
							</CalculatorCardContainer>
					  ))
					: ''}
				<CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={modalControl}
					>
						Add More
					</Button>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={calculateEstimatedRepairCostsHandler}
					>
						Calculate
					</Button>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Estimated Repair Costs </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalEstimatedRepairCosts'
							value={totalEstimatedRepairCosts}
							onChange={(e) => {
								setTotalEstimatedRepairCosts(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<MyModal
					display={openApplianceModal}
					modalControl={applianceModalControl}
				>
					<Alert severity='info' style={{ marginBottom: '10px' }}>
						<Typography> Add new expenses</Typography>
					</Alert>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Expense name</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='repairCostExpensesName'
								value={applianceCostExpensesName}
								onChange={(e) => {
									setApplianceCostExpensesName(
										e.target.value
									);
								}}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Amount</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='repairCostExpensesAmount'
								value={applianceCostExpensesAmount}
								onChange={(e) => {
									setApplianceCostExpensesAmount(
										e.target.value
									);
								}}
							/>
						</div>
					</div>

					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							width: '300px',

							display: 'flex',
							alignItems: 'center',
							margin: '30px auto',
							fontSize: '16px',
							textTransform: 'Capitalize',
						}}
						onClick={additionalEstimatedApplianceCostsHandler}
					>
						Add additional expense
					</Button>
				</MyModal>
				<div>Appliance Replacements</div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<div>Range/Oven</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='rangeOven'
							value={rangeOven}
							onChange={(e) => {
								setRangeOven(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Dishwasher</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={dishWasher}
							onChange={(e) => {
								setDishWasher(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Microwave</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={microWave}
							onChange={(e) => {
								setMicroWave(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>

				<CalculatorCardContainer>
					<div>Refrigerator</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='refrigerator'
							value={refrigerator}
							onChange={(e) => {
								setRefrigerator(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Washing Machine</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='washMachine'
							value={washMachine}
							onChange={(e) => {
								setWashMachine(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Dryer</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='dryer'
							value={dryer}
							onChange={(e) => {
								setDryer(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Furnace</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='furnace'
							value={furnace}
							onChange={(e) => {
								setFurnace(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>AC Condenser</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='acCondenser'
							value={acCondenser}
							onChange={(e) => {
								setAcCondenser(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Hot Water Heater</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='hotWaterHeater'
							value={hotWaterHeater}
							onChange={(e) => {
								setHotWaterHeater(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				{additionalApplianceCostExpensesAmount.length
					? additionalApplianceCostExpensesAmount.map((expense) => (
							<CalculatorCardContainer key={expense.name}>
								<div>{expense.name}</div>
								<div>
									<StyledField
										autoFocus
										type='text'
										variant='outlined'
										size='small'
										name='others'
										value={expense.amount}
									/>
								</div>
							</CalculatorCardContainer>
					  ))
					: ''}
				<CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={applianceModalControl}
					>
						Add More
					</Button>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={calculateEstimatedApplianceCostsHandler}
					>
						Calculate
					</Button>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Estimated Appliance Replacements </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={totalEstimatedApplianceReplacements}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<div>Cleaning</div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<TextSelectorContainer>
						<div style={{ marginTop: '3%' }}>Cleaning</div>
						<div>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={cleaningSelect}
									onChange={(event) => {
										setCleaningSelect(event.target.value);
									}}
								>
									<MenuItem value={10}>Flat Fee</MenuItem>
									<MenuItem value={20}>hourly rate</MenuItem>
								</Select>
							</FormControl>
						</div>
					</TextSelectorContainer>
					{cleaningSelect === 10 || cleaningSelect === '' ? (
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='downpayment'
								value={cleaningFlatFee}
								onChange={(e) => {
									setCleaningLatFee(e.target.value);
								}}
								onBlur={() => {
									setTotalCleaningCost(cleaningFlatFee);
								}}
							/>
						</div>
					) : (
						''
					)}
					{cleaningSelect === 20 ? (
						<React.Fragment>
							<div>
								<StyledField
									autoFocus
									type='text'
									variant='outlined'
									size='small'
									name='downpayment'
									value={cleaningHours}
									onChange={(e) => {
										setCleaningHours(e.target.value);
									}}
								/>
							</div>
							<div>
								<StyledField
									autoFocus
									type='text'
									variant='outlined'
									size='small'
									name='cleaningHourlyRate'
									value={cleaningHourlyRate}
									onChange={(e) => {
										setCleaningHourlyRate(e.target.value);
									}}
									onBlur={() => {
										setTotalCleaningCost(
											cleaningHours * cleaningHourlyRate
										);
									}}
								/>
							</div>
						</React.Fragment>
					) : (
						''
					)}
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Estimated Cleaning Costs </div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalCleaningCost'
							value={totalCleaningCost}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<MyModal
					display={openUtilitiesModal}
					modalControl={utilitiesModalControl}
				>
					<Alert severity='info' style={{ marginBottom: '10px' }}>
						<Typography> Add new utilities expenses</Typography>
					</Alert>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Expense name</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='utilitiesCostName'
								value={utilitiesCostName}
								onChange={(e) => {
									setUtilitiesCostName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Estimated monthly cost</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='utilitiesEstimatedCost'
								value={utilitiesEstimatedCost}
								onChange={(e) => {
									setUtilitiesEstimatedCost(e.target.value);
								}}
								onBlur={utilitiesTurnoverTotalCostHandler}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Turnover period total cost</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='utilitiesTurnoverTotalCost'
								value={utilitiesTurnoverTotalCost}
							/>
						</div>
					</div>

					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							width: '300px',

							display: 'flex',
							alignItems: 'center',
							margin: '30px auto',
							fontSize: '16px',
							textTransform: 'Capitalize',
						}}
						onClick={additionalUtilitiesCostsHandler}
					>
						Add additional expense
					</Button>
				</MyModal>
				<div>Utilities </div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Estimated Monthly cost</div>
					<div>Tutnover Period total Cost</div>
				</HardMoneyTitleContainer>

				<CalculatorCardContainer>
					<div style={{ width: '300px' }}>Natural Gas </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimatedNaturalGasCost'
							value={estimatedNaturalGasCost}
							onChange={(e) => {
								setEstimatedNaturalGasCost(e.target.value);
							}}
							onBlur={totalNaturalGasHandler}
						/>
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalNaturalGasCost'
							value={totalNaturalGasCost}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div style={{ width: '300px' }}>Electricity </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimatedElectricityCost'
							value={estimatedElectricityCost}
							onChange={(e) => {
								setEstimatedElectricityCost(e.target.value);
							}}
							onBlur={totalElectricityCostHandler}
						/>
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalElectricityCost'
							value={totalElectricityCost}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div style={{ width: '300px' }}>Water </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='waterEstimatedCost'
							value={waterEstimatedCost}
							onChange={(e) => {
								setWaterEstimatedCost(e.target.value);
							}}
							onBlur={totalWaterCostHandler}
						/>
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='waterCost'
							value={totalWaterCost}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div style={{ width: '300px' }}>Sewer</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimatedSewercost'
							value={estimatedSewerCost}
							onChange={(e) => {
								setEstimatedSewerCost(e.target.value);
							}}
							onBlur={totalSewerCostHandler}
						/>
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalSewerCost'
							value={totalSewerCost}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div style={{ width: '300px' }}>Trash </div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimatedTrashCost'
							value={estimatedTrashCost}
							onChange={(e) => {
								setEstimatedTrashCost(e.target.value);
							}}
							onBlur={totalTrashCostHandler}
						/>
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalTrashCost'
							value={totalTrashCost}
						/>
					</div>
				</CalculatorCardContainer>
				{additionalUtilitiesCost.length
					? additionalUtilitiesCost.map((expense) => (
							<CalculatorCardContainer key={expense.name}>
								<div style={{ width: '300px' }}>
									{expense.name}
								</div>
								<div>
									<StyledField
										autoFocus
										type='text'
										variant='outlined'
										size='small'
										name='others'
										value={expense.EstimatedMonthlyCost}
									/>
								</div>
								<div>
									<StyledField
										autoFocus
										type='text'
										variant='outlined'
										size='small'
										name='others'
										value={expense.turnoverPeriodTotalCost}
									/>
								</div>
							</CalculatorCardContainer>
					  ))
					: ''}
				<CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={utilitiesModalControl}
					>
						Add More
					</Button>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={calculateTotalUtilitiesCostsHandler}
					>
						Calculate
					</Button>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div style={{ width: '200px' }}>
						Total Estimated Utilities{' '}
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='estimatedTotalUtilitiesCost'
							value={estimatedTotalUtilitiesCost}
						/>
					</div>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalTurnoverUtilitiesCost'
							value={totalTurnoverUtilitiesCost}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<div>Lawncare</div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>

				<CalculatorCardContainer>
					<div>Lawn Maintenance </div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='lawnMaintenance'
							value={lawnMaintenance}
							onChange={(e) => {
								setLawnMaintenance(e.target.value);
							}}
							onBlur={() => {
								setTotalLawnMaintenance(lawnMaintenance);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Lawn Maintenance </div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalLawnMaintenance'
							value={totalLawnMaintenance}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<MyModal
					display={openMiscellaneousModal}
					modalControl={miscelaneousControl}
				>
					<Alert severity='info' style={{ marginBottom: '10px' }}>
						<Typography> Add new miscellaneous expenses</Typography>
					</Alert>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Expense name</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='miscallaneousName'
								value={miscallaneousName}
								onChange={(e) => {
									setMiscallaneousName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '5px auto',
						}}
					>
						<div
							style={{
								width: '150px',
							}}
						>
							<Typography>Amount</Typography>
						</div>
						<div>
							<StyledField
								autoFocus
								type='text'
								variant='outlined'
								size='small'
								name='miscallaneousCost'
								value={miscallaneousCost}
								onChange={(e) => {
									setMiscallaneousCost(e.target.value);
								}}
							/>
						</div>
					</div>

					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							width: '300px',

							display: 'flex',
							alignItems: 'center',
							margin: '30px auto',
							fontSize: '16px',
							textTransform: 'Capitalize',
						}}
						onClick={additionalMiscellaneousCostsHandler}
					>
						Add additional expense
					</Button>
				</MyModal>
				<div>Miscellaneous Expenses</div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>

				<CalculatorCardContainer>
					<div>Termite Treatment</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='termiteTreatment'
							value={termiteTreatment}
							onChange={(e) => {
								setTermiteTreatment(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='misc1Name'
							value={misc1Name}
							onChange={(e) => {
								setMisc1Name(e.target.value);
							}}
						/>
					</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='misc1Cost'
							value={misc1Cost}
							onChange={(e) => {
								setMisc1Cost(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='misc2Name'
							value={misc2Name}
							onChange={(e) => {
								setMisc2Name(e.target.value);
							}}
						/>
					</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='misc1Cost'
							value={misc2Cost}
							onChange={(e) => {
								setMisc2Cost(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				{allMiscellaneousCost.length
					? allMiscellaneousCost.map((expense) => (
							<CalculatorCardContainer key={expense.name}>
								<div>{expense.name}</div>
								<div>
									<StyledField
										autoFocus
										type='text'
										variant='outlined'
										size='small'
										name='others'
										value={expense.amount}
									/>
								</div>
							</CalculatorCardContainer>
					  ))
					: ''}
				<CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={miscelaneousControl}
					>
						Add More
					</Button>
					<Button
						variant='contained'
						color='primary'
						style={{
							height: '40px',
							textTransform: 'capitalize',
							fontSize: '16px',
						}}
						onClick={addMiscallaneousHandler}
					>
						Calculate
					</Button>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total Miscellaneous Expenses</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={totalMiscellaneousCost}
							onChange={(e) => {
								setTotalMiscellaneousCost(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<div>Tenant Screening Fees</div>

				<HardMoneyTitleContainer>
					<div>Calculator information</div>
					<div>Amount</div>
				</HardMoneyTitleContainer>

				<CalculatorCardContainer>
					<div>Cost per Tenant Screening</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={costPerTenantScreening}
							onChange={(e) => {
								setCostPerTenantScreening(e.target.value);
							}}
						/>
					</div>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Number of Prospective Tenants to Screen</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={numberOfPerspectiveTenantsToScreen}
							onChange={(e) => {
								setNumberOfPerspectiveTenantsToScreen(
									e.target.value
								);
							}}
							onBlur={calculateTotalScreenCost}
						/>
					</div>
				</CalculatorCardContainer>
				{/* <CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{ height: '40px' }}
						onClick={calculateTotalScreenCost}
					>
						Calcualte
					</Button>
				</CalculatorCardContainer> */}
				<CalculatorCardContainer>
					<div>Total Tenant Screening Costs </div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='purchasePrice'
							value={totalCostScreen}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
			<HardMoneyCalculatorContainer>
				<HardMoneyTitleContainer>
					<div>Over all cost</div>
				</HardMoneyTitleContainer>
				<CalculatorCardContainer>
					<Button
						variant='contained'
						color='primary'
						style={{ height: '40px' }}
						onClick={overAllCostHandler}
					>
						Calculate
					</Button>
					<Button
						variant='contained'
						color='primary'
						style={{ height: '40px' }}
						onClick={generatePDF}
					>
						Download
					</Button>
				</CalculatorCardContainer>
				<CalculatorCardContainer>
					<div>Total cost</div>

					<div>
						<StyledField
							autoFocus
							type='text'
							variant='outlined'
							size='small'
							name='totalCost'
							value={totalCost}
						/>
					</div>
				</CalculatorCardContainer>
			</HardMoneyCalculatorContainer>
		</Root>
	);
}

export default HardMoneyCalculatorInput;
