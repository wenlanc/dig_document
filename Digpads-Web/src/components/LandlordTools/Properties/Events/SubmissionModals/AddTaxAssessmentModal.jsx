import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	InputAdornment,
	FormControlLabel,
	RadioGroup,
	Radio,
	Paper,
	Divider,
} from '@mui/material';
import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AttachementModal from './AttachmentModal';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import ScheduleFields from './ScheduleFields';
import colors from 'assets/theme/base/colors';
import SuiInput from 'components/SuiInput';
import { LandlordButton, LandlordTextButton } from 'components/styled/Button';
import { nwoc, nwc } from 'utils/NumberUtils';
import { LandlordLoading } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';
import AttachmentButton from '../../Utils/AttachmentButton';

const AddTaxAssessmentModal = ({
	title,
	open,
	handleClose,
	classes,
	styles,
	selectedData,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [attachmentModal, setAttachmentModal] = useState(false);

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

	const handleAgreement = (images) => {
		setAttachmentModal(false);
		setImages(images);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: selectedData?.data?.property?._id,
			location: selectedData?.parent,
			parentData: selectedData?.data,
			eventTag: 'Bill',
			eventStatus: data?.completed === 'true',
			eventType: selectedData.event,
			eventNature: nature,
			eventData: {
				...data,
				attachments: docs,
				images,
			},
		};

		await dispatch(NewEvent(title, body));
		setLoading(false);
		setData({});
		closeParentModals();
		handleClose();
	};

	return (
		<>
			<StyledMUIModal open={open} onClose={handleClose}>
				<ModalBox>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox display='flex' justifyContent='space-between'>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title} Tax Assessment
								</Typography>
								<CloseBox onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Divider />
							{selectedData?.parent !== 'None' && (
								<Box py={1} px={2} border={'1px solid #ccc'}>
									<Typography variant={'h5'} component={'h2'} fontWeight='bold'>
										{selectedData?.data?.name}
									</Typography>
									<Typography
										variant={'h6'}
										component={'h3'}
										color={colors?.primary?.main}
										fontWeight={'bold'}
									>
										{selectedData?.parent}
									</Typography>
								</Box>
							)}
							<Box sx={{ mt: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Assessment Date'
												onChange={(value) => {
													setData({
														...data,
														incurredDate: String(value),
													});
												}}
												value={data?.dueDate}
												style={{ marginBottom: 16 }}
												renderInput={(params) => (
													<TextField {...params} fullWidth />
												)}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item xs={12} md={4}>
										<SuiInput
											name='assessedValue'
											onChange={handleChange}
											placeholder='Assessed Value'
											fullWidth
											variant='outlined'
											value={nwc(data?.assessedValue)}
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											required
										/>

										{/* <TextField
											name='assessmentValue'
											onChange={handleChange}
											placeholder='Assessment Value'
											variant='outlined'
											fullWidth
											type={'number'}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														$
													</InputAdornment>
												),
											}}
											value={data?.ammountPayed}
											style={{ marginBottom: 16 }}
											required
										/> */}
									</Grid>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Date to challenge'
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
												style={{ marginBottom: 16 }}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item xs={12} md={6}>
										<SuiInput
											name='increaseInAssessedValue'
											onChange={handleChange}
											placeholder='Increase In Assessed Value'
											fullWidth
											variant='outlined'
											value={nwc(data?.increaseInAssessedValue)}
											icon={{
												component: <AttachMoneyIcon />,
												direction: 'left',
											}}
											required
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<AttachmentButton
											uploadHandler={(_) => setAttachmentModal(true)}
											docs={docs}
											images={images}
										/>
									</Grid>
									<ScheduleFields
										data={data}
										setData={setData}
										nature={nature}
									/>

									{nature !== 'Schedule' && (
										<Grid item xs={12} md={12}>
											<Box px={2} mb={1}>
												<RadioGroup
													aria-labelledby='demo-radio-buttons-group-label'
													defaultValue='female'
													name='radio-buttons-group'
												>
													<FormControlLabel
														value={false}
														control={<Radio />}
														label='Mark the Service as a Completed Action.'
													/>
													<FormControlLabel
														value={true}
														control={<Radio />}
														label='Leave the Service as an Uncompleted Action.'
													/>
												</RadioGroup>
											</Box>
										</Grid>
									)}
									<Grid container justifyContent={'space-around'}>
										<LandlordButton
											variant='contained'
											style={{
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
				docs={docs}
				handleClose={(_) => setAttachmentModal(false)}
				open={attachmentModal}
				setDocs={setDocs}
				setImages={setImages}
			/>
		</>
	);
};

export default AddTaxAssessmentModal;
