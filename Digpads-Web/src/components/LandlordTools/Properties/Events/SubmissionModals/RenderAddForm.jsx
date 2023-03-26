import React, { useEffect, useState } from 'react';
import AddUtilitiesModal from '../../Utilities/AddUtilitiesModal';
import AddCostModal from '../../OtherCosts/AddCostModal';
import AddPhysicalPropertyModal from '../../PhysicalProperty/AddPhysicalPropertyModal';
import AddInsurance from '../../Insurance/AddInsurance';
import AddTax from '../../Taxes/AddTax';
import AddMaintenance from '../../Maintenance/AddMaintenance';
import AddRepairAndRemodels from '../../RepairAndRemodels/AddRepairAndRemodels';
import AddFixtureModal from '../../Fixture/Rooms/AddFixtureModal';
import AddSystemModal from '../../Systems/AddSystemModal';

const RenderAddForm = ({
	name,
	properties,
	rooms,
	open,
	setOpen,
	handleClose,
}) => {
	const [addUtility, setAddUtility] = useState(false);
	const [addOtherCost, setAddOtherCost] = useState(false);
	const [addPhysicalProperty, setAddPhysicalProperty] = useState(false);
	const [addTax, setAddTax] = useState(false);
	const [addInsurance, setAddInsurance] = useState(false);
	const [addMaintenance, setAddMaintenance] = useState(false);
	const [addFixture, setAddFixture] = useState(false);
	const [addRNR, setAddRNR] = useState(false);
	const [addSystem, setAddSystem] = useState(false);

	const modalHandler = () => {
		console.log('got name', name);
		if (open === false) return;
		switch (name) {
			case 'Utilities':
				setAddUtility(true);
				break;
			case 'General Expenses':
				setAddOtherCost(true);
				break;
			case 'Physical Property':
				setAddPhysicalProperty(true);
				break;
			case 'Taxes':
				setAddTax(true);
				break;
			case 'Insurance':
				setAddInsurance(true);
				break;
			case 'Maintenance':
				setAddMaintenance(true);
				break;
			case 'Fixture':
				console.log('handle fixture');
				setAddFixture(true);
				break;
			case 'Repair & Remodels':
				setAddRNR(true);
				break;
			case 'Systems':
				setAddSystem(true);
				break;
			default:
				console.log('default name => ', name);
				break;
		}
	};

	useEffect(() => {
		modalHandler();
		//eslint-disable-next-line
	}, [name, open]);
	useEffect(() => {
		modalHandler();
		//eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			<AddSystemModal
				title='Add'
				handleClose={() => setAddSystem(false)}
				open={addSystem}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpen(false);
					setAddSystem(false);
					handleClose();
				}}
			/>

			<AddUtilitiesModal
				title='Add'
				open={addUtility}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpen(false);
					setAddUtility(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddUtility(false);
					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddUtility(false);
					handleClose();
				}}
			/>
			<AddCostModal
				title='Add'
				open={addOtherCost}
				properties={properties}
				onClose={() => {
					setOpen(false);
					setAddOtherCost(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddOtherCost(false);
					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddOtherCost(false);
					handleClose();
				}}
			/>
			<AddPhysicalPropertyModal
				title='Add'
				open={addPhysicalProperty}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpen(false);
					setAddPhysicalProperty(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddPhysicalProperty(false);
					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddPhysicalProperty(false);
					handleClose();
				}}
			/>
			<AddTax
				title='Add'
				open={addTax}
				properties={properties}
				onClose={() => {
					setOpen(false);
					setAddTax(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddTax(false);
					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddTax(false);
					handleClose();
				}}
			/>
			<AddInsurance
				title='Add'
				open={addInsurance}
				properties={properties}
				onClose={() => {
					setOpen(false);
					setAddInsurance(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddInsurance(false);
					handleClose();
				}}
				handleClose={(insurance) => {
					setOpen(false);
					setAddInsurance(false);
					handleClose(insurance);
				}}
			/>
			<AddMaintenance
				title='Add'
				open={addMaintenance}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpen(false);
					setAddMaintenance(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddMaintenance(false);

					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddMaintenance(false);

					handleClose();
				}}
			/>
			<AddRepairAndRemodels
				title='Add'
				open={addRNR}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpen(false);
					setAddRNR(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddRNR(false);
					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddRNR(false);
					handleClose();
				}}
			/>
			<AddFixtureModal
				title='Add'
				open={addFixture}
				properties={properties}
				rooms={rooms}
				onClose={() => {
					setOpen(false);
					setAddFixture(false);
					handleClose();
				}}
				handleAdd={() => {
					setOpen(false);
					setAddFixture(false);
					handleClose();
				}}
				handleClose={() => {
					setOpen(false);
					setAddFixture(false);
					handleClose();
				}}
				external={true}
			/>
		</React.Fragment>
	);
};

export default RenderAddForm;
