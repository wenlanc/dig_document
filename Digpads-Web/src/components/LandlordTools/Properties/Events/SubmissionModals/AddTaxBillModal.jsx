import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	Paper,
	FormControlLabel,
	RadioGroup,
	Radio,
	Divider,
} from '@mui/material';
import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import {
	LandlordTextButton,
	LandlordButton,
	LandlordLoading,
} from 'components/styled/Button';
import { useDispatch } from 'react-redux';
import { NewEvent } from 'store/actions/Property/eventAction';
import { nwc, nwoc } from 'utils/NumberUtils';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AttachementModal from './AttachmentModal';
import LateFeesModal from '../../Taxes/LateFeesModal';
import SuiInput from 'components/SuiInput';
import CustomLabel from '../../Utils/DateLabel';
import AttachmentButton from '../../Utils/AttachmentButton';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { StyledPaper } from 'components/styled/Feed';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

const AddTaxBillModal = ({
	title,
	open,
	handleClose,
	classes,
	styles,
	selectedData,
	nature,
	property,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [lateFeesModal, setLateFeesModal] = useState(false);
	const [feeData, setFeeData] = useState({});
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();

	useEffect(() => {
		setData({
			...data,
			images,
		});
		//eslint-disable-next-line
	}, [images]);

	useEffect(() => {
		if (data?.images) setImages([...data.images]);
		//eslint-disable-next-line
	}, [open]);

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const body = {
			property: property?._id,
			location: selectedData?.parent,
			parentData: selectedData?.data,
			eventTag: 'Bill',
			eventStatus: data?.completed === 'true',
			eventType: selectedData.event,
			eventNature: nature,
			eventData: {
				...data,
				amount: nwoc(data?.amount),
				images,
				attachments: docs,
			},
		};
		await dispatch(NewEvent(title, body));
		setLoading(false);
		setData({});
		closeParentModals();
		handleClose();
	};

	return (
		<React.Fragment>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<StyledPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title}
								</Typography>
								<CloseBox onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Divider />
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={4}>
										<TextField
											name='property'
											placeholder='Property'
											variant='outlined'
											fullWidth
											value={property?.propertyName}
											disabled
										/>
										{property?.propertyName && (
											<CustomLabel label={'Property'} />
										)}
									</Grid>

									<Grid item xs={12} md={4}>
										<TextField
											name='item'
											placeholder='Item Name'
											variant='outlined'
											fullWidth
											value={selectedData?.data?.name}
											disabled
										/>
										{property?.propertyName && (
											<CustomLabel label={'Item Name'} />
										)}
									</Grid>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												views={['month', 'year']}
												placeholder='Tax Year'
												onChange={(value) => {
													setData({
														...data,
														taxYear: String(value),
													});
												}}
												value={data?.taxYear}
												renderInput={(params) => (
													<TextField {...params} fullWidth />
												)}
											/>
										</LocalizationProvider>

										<CustomLabel label={'Tax Year'} />
									</Grid>

									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Date Date'
												onChange={(value) => {
													setData({
														...data,
														incurredDate: String(value),
													});
												}}
												value={data?.dueDate}
												renderInput={(params) => (
													<TextField {...params} fullWidth />
												)}
											/>
										</LocalizationProvider>

										<CustomLabel label={'Due Date'} />
									</Grid>
									<Grid item xs={12} md={4}>
										<SuiInput
											// type={'number'}
											value={nwc(data?.amount)}
											name={'amount'}
											onChange={handleChange}
											placeholder='Amount'
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											required
										/>
										{data?.amount && <CustomLabel label={'Amount'} />}
									</Grid>
									<Grid item xs={12} md={4}>
										<Box display={'flex'} alignItems='center' height={'75%'}>
											<LandlordTextButton
												variant='text'
												fullWidth
												onClick={() => setLateFeesModal(true)}
											>
												Late Fees
											</LandlordTextButton>
										</Box>
									</Grid>
									<Grid item xs={12}>
										<SuiInput
											multiline
											rows={5}
											name='notes'
											onChange={handleChange}
											aria-placeholder='notes'
											placeholder='Notes'
											value={data?.notes}
											style={{ width: '100%' }}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<AttachmentButton
											images={images}
											docs={docs}
											uploadHandler={(_) => setAttachmentModal(true)}
										/>
									</Grid>

									<Grid item xs={12} md={12}>
										<Box px={2} mb={1}>
											<RadioGroup
												aria-labelledby='demo-radio-buttons-group-label'
												defaultValue={true}
												name='radio-buttons-group'
											>
												<FormControlLabel
													value={false}
													control={<Radio />}
													label='Mark the Service as a Completed Action.'
												/>
												<FormControlLabel
													value={true}
													defaultChecked
													control={<Radio />}
													label='Leave the Service as an Uncompleted Action.'
												/>
											</RadioGroup>
										</Box>
									</Grid>
								</Grid>
								<Grid container justifyContent={'space-around'}>
									<LandlordButton
										variant='contained'
										// style={{
										// 	marginBottom: 16,
										// 	paddingLeft: 16,
										// 	paddingRight: 16,
										// 	minWidth: 160,
										// 	textAlign: 'center',
										// }}
										color='success'
										type='submit'
									>
										{loading ? <LandlordLoading /> : 'Save'}
									</LandlordButton>
								</Grid>
							</Box>
						</Box>
					</StyledPaper>
				</ModalBox>
			</StyledMUIModal>
			<ImageDocumentModal
				images={images}
				docs={docs}
				setDocs={setDocs}
				setImages={setImages}
				handleClose={(_) => setAttachmentModal(false)}
				open={attachmentModal}
			/>
			<LateFeesModal
				open={lateFeesModal}
				onClose={() => setLateFeesModal(false)}
				feeData={feeData}
				setFeeData={setFeeData}
				onSave={(lateFees) => {
					setData({ ...data, lateFees });
					setLateFeesModal(false);
				}}
			/>
		</React.Fragment>
	);
};

export default AddTaxBillModal;
