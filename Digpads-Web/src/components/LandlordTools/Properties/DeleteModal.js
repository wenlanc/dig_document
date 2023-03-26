import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Modal,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from 'styled-components';
import { getCSRF, instance } from '../../../controllers/axios';
import { useDispatch } from 'react-redux';
import {
	DeleteProperty,
	GetPropertiesList,
} from '../../../store/actions/Property/propertiesAction';
import {
	DeletePhysical,
	GetPhysicalList,
} from '../../../store/actions/Property/physicalPropertyAction';
import { GetUtilityList } from '../../../store/actions/Property/utilityAction';
import { GetMaintenanceList } from '../../../store/actions/Property/maintenanceAction';
import { GetTaxList } from '../../../store/actions/Property/taxAction';
import { GetRepairList } from '../../../store/actions/Property/repairAction';
import { GetInsuranceList } from '../../../store/actions/Property/insuranceAction';
import { GetOtherCostList } from '../../../store/actions/Property/otherCostAction';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import { GetSystemList } from 'store/actions/Property/systemAction';

const PREFIX = 'DeleteModal';

const classes = {
	modal: `${PREFIX}-modal`,
};

const StyledModal = muiStyled(Modal)(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			height: 'auto',
		},
	},
}));

const styles = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 600,
	width: '100%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	overflowY: 'auto',
	height: '100%',
};

const StyledTextField = styled(TextField)`
	input {
		height: 12px;
	}
`;

const arr = [
	undefined,
	'sold',
	'ownerOccupied',
	'tornDownCondemned',
	'lostInSettlement',
];

const DeleteModal = ({
	id,
	open,
	onClose,
	handleDelete,
	dataType = 'property',
}) => {
	const [reason, setReason] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const dispatch = useDispatch();

	const dispatchHandler = async () => {
		dispatch(GetPropertiesList());
		dispatch(GetUtilityList());
		dispatch(GetMaintenanceList());
		dispatch(GetTaxList());
		dispatch(GetRepairList());
		dispatch(GetInsuranceList());
		dispatch(GetPhysicalList());
		dispatch(GetSystemList());
		await dispatch(GetOtherCostList());
	};

	const handleDeleteProperty = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.log('dataType, id');
		console.log(dataType, id);
		if (dataType === 'property') {
			await dispatch(DeleteProperty(id, reason));
		} else {
			await dispatch(DeletePhysical(id, reason));
		}
		setLoading(false);
		await dispatchHandler();
		handleDelete();

		await getCSRF;
		if (dataType === 'property') {
			instance.post('deleteProperty', {
				id,
				reason,
			});
			handleDelete();
		} else {
			instance.post('/physicalProperty/deletePhysicalProperty', {
				id,
				reason,
			});
			handleDelete();
		}
	};

	return (
		<StyledModal
			open={open}
			onClose={() => {
				setReason(undefined);
				onClose();
			}}
		>
			<form onSubmit={handleDeleteProperty}>
				<Box className={classes.modal} sx={styles}>
					<Box display='flex' justifyContent='space-between'>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
							gutterBottom
						>
							Remove Property Confirmation
						</Typography>{' '}
						<div onClick={onClose}>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>
					<Typography
						marginBottom='16px'
						variant='body1'
						component='p'
					>
						Please confirm the removal of the below property or
						properties from the system. You understand that this may
						result in the loss of all data tied to the property or
						properties.
					</Typography>
					<Typography variant='body1' component='p'>
						Please select the reason for removing this property from
						your portfolio of rentalproperties.
					</Typography>
					<RadioGroup
						onChange={(e) => {
							setReason(e.target.value);
						}}
						sx={{
							display: 'flex',
							py: 2,
							px: 1,
						}}
					>
						<FormControlLabel
							value='sold'
							control={<Radio />}
							label='Sold'
						/>{' '}
						<FormControlLabel
							value='ownerOccupied'
							control={<Radio />}
							label='Owner Occupied'
						/>{' '}
						<FormControlLabel
							value='tornDownCondemned'
							control={<Radio />}
							label='Torn Down/Condemned'
						/>
						<FormControlLabel
							value='lostInSettlement'
							control={<Radio />}
							label='Lost in Settlement'
						/>{' '}
						<br />
						<Box display='flex' flexDirection={'column'}>
							<FormControlLabel
								value='other'
								control={<Radio />}
								label='Other'
								sx={{
									width: '100%',
								}}
							/>
							<StyledTextField
								variant='outlined'
								onChange={(e) => {
									setReason(e.target.value);
								}}
								disabled={arr.includes(reason)}
								sx={{
									m: 3,
									mt: 1,
									ml: 1,
									maxHeight: 12,
									width: '50%',
								}}
							/>
						</Box>
					</RadioGroup>

					<Box display='flex' justifyContent='flex-end'>
						<LandlordButton
							variant='contained'
							color={'error'}
							onClick={handleDeleteProperty}
							disabled={loading || !reason}
							type='submit'
						>
							{!loading ? 'Confirm' : <LandlordLoading />}
						</LandlordButton>
					</Box>
				</Box>
			</form>
		</StyledModal>
	);
};

export default DeleteModal;
