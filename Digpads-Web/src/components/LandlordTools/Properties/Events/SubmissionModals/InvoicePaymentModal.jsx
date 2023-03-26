import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	FormControlLabel,
	RadioGroup,
	Radio,
	Divider,
} from '@mui/material';
import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import { LandlordButton } from 'components/styled/Button';
import SuiInput from 'components/SuiInput';
import { nwc, nwoc } from 'utils/NumberUtils';
import { LandlordTextButton } from 'components/styled/Button';
import ScheduleFields from './ScheduleFields';
import { LandlordLoading } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import AttachmentButton from '../../Utils/AttachmentButton';

const InvoicePaymentModal = ({
	title,
	open,
	handleClose,

	selectedData,
	room,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [changeAllowed, setChangeAllowed] = useState(false);
	const [loading, setLoading] = useState(false);
	const [warningModal, setWarningModal] = useState(false);
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [owed, setOwed] = useState(
		selectedData?.data?.amount || selectedData?.data?.policyCost
	);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: selectedData?.data?.property?._id,
			location: selectedData?.parent,
			room,
			parentData: selectedData?.data,
			eventNature: nature,
			eventTag: 'Bill',
			eventStatus: data?.completed === 'true',
			eventType: selectedData?.event,
			eventData: { ...data, images, attachments: docs },
			scheduleDate: data?.scheduleDate,
		};
		// console.log('room =>', room);
		await dispatch(NewEvent(title, body));
		setLoading(false);
		setData({});
		closeParentModals();
		handleClose();
	};

	useEffect(() => {
		console.log('nature', nature);
		if (nature === 'Record')
			setOwed(selectedData?.data?.amount || selectedData?.data?.policyCost);
	}, [selectedData]);

	useEffect(
		() => {
			console.log('owed =>', owed);
			console.log('paid =>', data?.amountPaid);
			if (owed && data?.amountPaid) {
				if (owed <= data?.amountPaid) {
					setData({
						...data,
						amountRemaining: 0,
					});
				} else {
					let remaining = nwoc(owed) - nwoc(data?.amountPaid);
					console.log('remaning...', remaining);
					setData({
						...data,
						amountRemaining: remaining,
					});
				}
			} else {
				setData({
					...data,
					amountRemaining: owed,
				});
			}
		},
		// eslint-disable-next-line
		[data.amountPaid, owed]
	);

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox>
								<Typography variant='h4' component='h2' fontWeight='bold'>
									{title}
								</Typography>
								<CloseBox onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Divider />
							<Box px={2} py={1} border={'1px solid #ccc'}>
								<Typography
									variant={'h6'}
									component={'h5'}
									textTransform={'capitalize'}
								>
									{selectedData?.data?.name}
								</Typography>
								<Typography
									color={'primary'}
									component={'small'}
									variant={'small'}
								>
									{selectedData?.parent}
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Grid spacing={2}>
									<Grid container columnSpacing={2} rowSpacing={1.5}>
										<Grid item xs={12} md={12}>
											{/* <SuiInput
											name='amountOwed'
											onChange={handleChange}
											placeholder='Amount Owed'
											variant='outlined'
											fullWidth
											type='number'
											// value={data?.amountOwed}
											value={}
											disabled
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
											}}
											required
											icon={{}}
										/> */}
											<Box display={'flex'} alignItems={'center'} columnGap={2}>
												<Box
													display={'flex'}
													flexDirection={'column'}
													width={'75%'}
												>
													<Typography
														component={'small'}
														variant={'small'}
														color={'#c4c4c4'}
													>
														Amount Owed
													</Typography>
													<SuiInput
														value={nwc(owed)}
														placeholder='Amount Owed'
														disabled={nature === 'Record' && !changeAllowed}
														name={'amountOwed'}
														onChange={(e) => setOwed(e.target.value)}
														icon={{
															component: <AttachMoneyIcon />,
															direction: 'left',
														}}
														required
													/>
												</Box>
												<LandlordButton
													color={'primary'}
													variant={'contained'}
													size={'small'}
													onClick={(_) => setChangeAllowed(true)}
													sx={{
														alignSelf: 'flex-end',
													}}
													disabled={changeAllowed}
												>
													Change
												</LandlordButton>
											</Box>
										</Grid>
										<Grid item xs={12} md={12}>
											<Typography
												component={'small'}
												variant={'small'}
												color={'#c4c4c4'}
											>
												Amount Paid
											</Typography>

											<SuiInput
												value={nwc(data?.amountPaid) || 0}
												placeholder='Amount Paid'
												name='amountPaid'
												onChange={handleChange}
												onBlur={() => {
													if (data?.amountPaid > owed) {
														setWarningModal(true);
													}
												}}
												icon={{
													component: <AttachMoneyIcon />,
													direction: 'left',
												}}
												required
											/>

											{/* <TextField
											onChange={handleChange}
											label='Amount Payed'
											variant='outlined'
											fullWidth
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
											}}
											required
											type='number'
										/> */}
										</Grid>
										<Grid item xs={12} md={12}>
											<Typography
												component={'small'}
												variant={'small'}
												color={'#c4c4c4'}
											>
												Amount Remaining
											</Typography>
											<SuiInput
												value={nwc(data?.amountRemaining) || 0}
												placeholder='Remaining Amount Owed'
												name='amountRemaining'
												onChange={handleChange}
												icon={{
													component: <AttachMoneyIcon />,
													direction: 'left',
												}}
												required
											/>

											{/* <TextField
											name='amountRemaining'
											onChange={handleChange}
											label='Remaining Amount Owed'
											variant='outlined'
											fullWidth
											value={data?.amountRemaining}
											disabled
											type='number'
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
											}}
											required
										/> */}
										</Grid>
										<ScheduleFields
											data={data}
											setData={setData}
											nature={nature}
										/>
										<Grid item md={12}>
											<AttachmentButton
												uploadHandler={(_) => setAttachmentModal(true)}
												docs={docs}
												images={images}
											/>
										</Grid>
										{nature !== 'Schedule' && (
											<Grid item xs={12} md={12}>
												<Box m={2} mt={0}>
													<RadioGroup
														onChange={handleChange}
														value={data?.completed}
														name='completed'
														sx={{
															display: 'flex',
															justifyContent: 'flex-start',
															rowGap: 2,
															flexDirection: 'column',
														}}
													>
														<FormControlLabel
															value={true}
															control={<Radio />}
															label={
																<Typography
																	component={'span'}
																	variant={'small'}
																>
																	Mark the Service as a Completed Action.
																</Typography>
															}
														/>
														<FormControlLabel
															value={false}
															control={<Radio defaultChecked />}
															label={
																<Typography
																	component={'span'}
																	variant={'small'}
																>
																	Leave the Service as an Uncompleted Action.
																</Typography>
															}
														/>
													</RadioGroup>
												</Box>
											</Grid>
										)}
									</Grid>
									<Grid container justifyContent={'space-around'}>
										<LandlordButton
											variant='contained'
											style={{
												marginTop: 16,
												marginBottom: 16,
												paddingLeft: 16,
												paddingRight: 16,
												minWidth: 160,
												textAlign: 'center',
											}}
											color='success'
											// onClick={handleSubmit}
											type='submit'
											// disabled={Object.values(data).length <= 11}
										>
											{loading ? <LandlordLoading /> : 'Save'}
										</LandlordButton>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>

			<ImageDocumentModal
				images={images}
				setImages={setImages}
				docs={docs}
				setDocs={setDocs}
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
			/>

			<Dialog
				open={warningModal}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Warning'}</DialogTitle>
				<DialogContent sx={{ px: 2 }}>
					<DialogContentText id='alert-dialog-description'>
						{'You have entered more amount than amount owed. '}
						<br />
						{'Are you sure you want to do this?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LandlordTextButton
						onClick={() => {
							setWarningModal(false);
							setData({
								...data,
								amountPaid: owed,
							});
						}}
						color='error'
						variant='text'
					>
						No
					</LandlordTextButton>
					<LandlordTextButton
						onClick={() => {
							setWarningModal(false);
						}}
						autoFocus
						color='primary'
						variant='text'
					>
						Yes
					</LandlordTextButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default InvoicePaymentModal;
