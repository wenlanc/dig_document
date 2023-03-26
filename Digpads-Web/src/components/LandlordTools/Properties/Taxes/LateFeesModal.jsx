import React from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Autocomplete,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	InputAdornment,
	Container,
	FormControl,
	Button,
	Checkbox,
	Paper,
	Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { modalBoxStyles } from 'components/styled/Modal';
import SuiInput from 'components/SuiInput';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { nwc, nwoc } from 'utils/NumberUtils';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { LandlordButton } from 'components/styled/Button';
import CustomLabel from '../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const PREFIX = 'LateFeesModal';

const classes = {
	modal: `${PREFIX}-modal`,
};

const StyledModal = styled(Modal)(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			height: 'auto',
		},
	},
}));

export default function AttachementModal({
	open,
	onClose,
	onSave,
	feeData,
	setFeeData,
}) {
	const feeModels = [
		{
			name: 'Fixed $ Amount Each Month',
			value: 1,
		},
		{
			name: 'Fixed % Increase Each Month',
			value: 2,
		},
		{
			name: '% Increase Each Month',
			value: 3,
		},
		{
			name: 'Different Amounts Each Month',
			value: 4,
		},
	];

	const handleChange = (e) => {
		if (e.target.type === 'checkbox')
			setFeeData({ ...feeData, [e.target.name]: e.target.checked });
		else setFeeData({ ...feeData, [e.target.name]: e.target.value });
	};

	const one = () => {
		return (
			<Grid item md={12} sx={{ mb: 3 }} justifyContent={'center'}>
				<SuiInput
					name='basis'
					onChange={handleChange}
					placeholder='Basis'
					fullWidth
					icon={{
						component: <AttachMoneyIcon />,
						direction: 'left',
					}}
					type={'number'}
					value={feeData?.basis}
					defaultValue={0.0}
				/>
				{feeData?.basis && <CustomLabel label={'Basis'} />}
			</Grid>
		);
	};

	const two = () => {
		return (
			<Grid item md={12} sx={{ mb: 3 }} justifyContent={'center'}>
				<SuiInput
					name='basis'
					onChange={handleChange}
					placeholder='Basis'
					fullWidth
					type={'number'}
					icon={{
						component: <PercentIcon />,
						direction: 'left',
					}}
					value={feeData?.basis}
				/>
				{feeData?.basis && <CustomLabel label={'Basis'} />}
			</Grid>
		);
	};

	const three = () => {
		return (
			<Grid item md={12} sx={{ mb: 3 }} justifyContent={'center'}>
				<SuiInput
					name='basis'
					onChange={handleChange}
					placeholder='Basis'
					fullWidth
					type={'number'}
					icon={{
						component: <PercentIcon />,
						direction: 'left',
					}}
					value={feeData?.basis}
				/>
				{feeData?.basis && <CustomLabel label={'Basis'} />}
			</Grid>
		);
	};

	const four = () => {
		return (
			<Grid item md={12} sx={{ mb: 3 }} justifyContent={'center'}>
				<SuiInput
					name='basis'
					onChange={handleChange}
					placeholder='Basis'
					fullWidth
					type={'number'}
					icon={{
						component: <PercentIcon />,
						direction: 'left',
					}}
					value={feeData?.basis}
					disabled={feeData?.sameAsAmount}
				/>
				{feeData?.basis && <CustomLabel label={'Basis'} />}

				<Box
					display={'flex'}
					justifyContent={'flex-end'}
					alignItems={'center'}
				>
					<FormControlLabel
						control={
							<Checkbox
								defaultChecked={false}
								onChange={handleChange}
								value={feeData?.sameAsAmount}
								name='sameAsAmount'
							/>
						}
						label='Same as amount due'
					/>
				</Box>
			</Grid>
		);
	};

	const renderForm = () => {
		switch (feeData?.model?.value) {
			case 1:
				return one();
			case 2:
				return two();
			case 3:
				return three();
			case 4:
				return four();
			default:
				return;
		}
	};

	const months = () => {
		return Array.from({ length: 12 }, (v, i) => {
			return (
				<Grid item md={6} my={1}>
					<SuiInput
						value={
							feeData?.model.value === 3
								? feeData[`month${i + 1}`]
								: nwc(feeData[`month${i + 1}`])
						}
						name={`month${i + 1}`}
						onChange={handleChange}
						placeholder={`Month ${i + 1}`}
						required={feeData?.model?.value > 2}
						icon={{
							component:
								feeData?.model.value === 3 ? (
									<PercentIcon />
								) : (
									<AttachMoneyIcon />
								),
							direction: 'left',
						}}
					/>
					{feeData[`month${i + 1}`] && (
						<CustomLabel label={`Month ${i + 1}`} />
					)}
				</Grid>
			);
		});
	};

	const handleFeeSubmit = (e) => {
		e.preventDefault();
		onSave(feeData);
	};

	return (
		<StyledMUIModal open={open}>
			<ModalBox component={'form'} onSubmit={handleFeeSubmit}>
				<ModalPaper>
					<TitleBox display='flex' justifyContent='space-between'>
						<Typography
							variant='h5'
							component='h2'
							fontWeight='bold'
						>
							Late Fees
						</Typography>
						<CloseBox onClick={onClose}>
							<Close style={{ cursor: 'pointer' }} />
						</CloseBox>
					</TitleBox>
					<Divider />
					<Box sx={{ mt: 2 }}>
						<Grid container columnSpacing={2}>
							<Grid item md={12}>
								<Autocomplete
									fullWidth
									id='model-autocomplete'
									options={feeModels}
									getOptionLabel={(model) => `${model.name}`}
									onChange={(e, model, reason) =>
										reason === 'selectOption'
											? setFeeData({
													...feeData,
													model,
											  })
											: setFeeData({
													...feeData,
													model: null,
											  })
									}
									value={feeData?.model}
									renderInput={(params) => {
										return (
											<TextField
												value={feeData?.model?.name}
												{...params}
												placeholder='Model'
												variant='outlined'
											/>
										);
									}}
								/>
							</Grid>
							<Grid item md={12}>
								<Typography
									variant='p'
									component='p'
									fontWeight={'bold'}
									my={2}
								>
									{feeData?.model?.name}
								</Typography>
							</Grid>
							<Grid item md={12}>
								{renderForm()}
							</Grid>
							{feeData?.model?.value > 2 ? months() : null}
							<Grid item md={12}>
								<Typography
									variant='p'
									component={'p'}
									fontWeight={'bold'}
								>
									Late Fee Applied:
								</Typography>
								<Box display='flex' component={'div'} my={1.5}>
									<RadioGroup
										name='cycle'
										value={feeData?.cycle}
										onChange={handleChange}
										sx={{
											display: 'flex',
											ml: 5,
											flexDirection: 'column',
											rowGap: 1,
										}}
									>
										<FormControlLabel
											sx={{
												display: 'flex',
												justifySelf: 'center',
											}}
											value='end'
											control={<Radio />}
											label='End of Month'
										/>
										<Box
											display={'flex'}
											columnGap={2}
											alignItems={'center'}
											component={'div'}
										>
											<FormControlLabel
												value='day'
												control={<Radio />}
												label='Other Day'
											/>
											{feeData?.cycle === 'day' && (
												<SuiInput
													name='otherDay'
													onChange={handleChange}
													placeholder='Enter Day'
													type={'number'}
													value={feeData?.otherDay}
													disabled={
														feeData?.cycle !== 'day'
													}
													required={
														feeData?.cycle === 'day'
													}
													icon={{
														component: (
															<EventRepeatIcon />
														),
														direction: 'left',
													}}
													// defaultValue={30}
												/>
											)}
										</Box>
									</RadioGroup>
								</Box>
							</Grid>
							<Grid item md={12}>
								<Typography
									component={'p'}
									variant={'p'}
									fontWeight={'bold'}
								>
									Compounding
								</Typography>
								<FormControl>
									<RadioGroup
										name='compounding'
										value={feeData?.compounding}
										onChange={handleChange}
										sx={{
											mt: 2,
											ml: 5,
										}}
										row
									>
										<FormControlLabel
											value={true}
											control={<Radio />}
											label='Yes'
										/>
										<FormControlLabel
											value={false}
											control={<Radio />}
											label='No'
										/>
									</RadioGroup>
								</FormControl>
							</Grid>
							<Grid item md={12}>
								<Box
									display={'flex'}
									justifyContent={'flex-end'}
									alignItems={'center'}
								>
									<LandlordButton
										variant='contained'
										color='success'
										style={{
											paddingLeft: 16,
											paddingRight: 16,
											minWidth: 160,
										}}
										type={'submit'}
										// onClick={() => onSave(feeData)}
									>
										Save
									</LandlordButton>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</ModalPaper>
			</ModalBox>
		</StyledMUIModal>
	);
}
