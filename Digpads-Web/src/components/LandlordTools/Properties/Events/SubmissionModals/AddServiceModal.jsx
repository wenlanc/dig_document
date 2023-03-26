import React, { useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	FormControlLabel,
	RadioGroup,
	Radio,
	Autocomplete,
	Paper,
	Divider,
} from '@mui/material';

import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { NewEvent } from '../../../../../store/actions/Property/eventAction';
import ScheduleFields from './ScheduleFields';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import AttachmentButton from '../../Utils/AttachmentButton';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';

const AddServiceModal = ({
	title,
	open,
	handleClose,
	classes,
	styles,
	selectedData,
	dialogData,
	property,
	room,
	nature,
	closeParentModals,
}) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const body = {
			property: property?._id,
			location: selectedData?.parent,
			parentData: selectedData?.data,
			room,
			eventTag: 'Action',
			eventAction: data?.completed === 'true',
			eventType: selectedData.event,
			eventNature: nature,
			eventData: {
				...data,
				serviceType: dialogData,
				images,
				attachment: docs,
			},
		};
		console.log(body);
		await dispatch(NewEvent(title, body));
		setLoading(true);
		// await dispatch(NewInsurance(title, data));
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
							<TitleBox
								display='flex'
								justifyContent='space-between'
							>
								<Typography
									variant='h4'
									component='h2'
									fontWeight='bold'
								>
									{title}
								</Typography>
								<CloseBox onClick={handleClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Divider />
							<Box px={2} py={1} border={'1px solid #ccc'}>
								<Typography
									variant={'h5'}
									component={'h5'}
									fontWeight='bold'
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
								<Grid container spacing={2}>
									<Grid item xs={12} md={4}>
										<Autocomplete
											id='requestedBy-autocomplete'
											options={[
												'Landlord',
												'Tenant',
												'Other',
											]}
											getOptionLabel={(option) =>
												`${option}`
											}
											onChange={(
												e,
												requestedBy,
												reason
											) =>
												reason === 'selectOption'
													? setData({
															...data,
															requestedBy,
													  })
													: setData({
															...data,
															requestedBy: '',
													  })
											}
											value={data?.requestedBy}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={
															data?.requestedBy
														}
														placeholder='Who Requested Service'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<Autocomplete
											id='reason-autocomplete'
											options={[
												'Maintenance',
												'Emergency',
												'Meter Reading',
												'Other',
											]}
											getOptionLabel={(option) =>
												`${option}`
											}
											onChange={(
												e,
												reason,
												selectedOption
											) =>
												selectedOption ===
												'selectOption'
													? setData({
															...data,
															reason,
													  })
													: setData({
															...data,
															reason: '',
													  })
											}
											value={data?.reason}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.reason}
														placeholder='Reason for Service'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<Autocomplete
											id='outcome-autocomplete'
											options={[
												'Completed',
												'Partialy Completed',
												'Unresolved',
												'Unknown',
											]}
											getOptionLabel={(option) =>
												`${option}`
											}
											onChange={(e, outcome, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															outcome,
													  })
													: setData({
															...data,
															outcome: '',
													  })
											}
											value={data?.outcome}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.outcome}
														placeholder='Outcome'
														variant='outlined'
														required
													/>
												);
											}}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												placeholder='Date of service'
												onChange={(value) => {
													setData({
														...data,
														serviceDate:
															String(value),
													});
												}}
												value={data?.serviceDate}
												renderInput={(params) => (
													<TextField
														{...params}
														fullWidth
													/>
												)}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid md={12} item>
										<AttachmentButton
											images={images}
											docs={docs}
											uploadHandler={(_) =>
												setAttachmentModal(true)
											}
										/>
									</Grid>
									{nature !== 'Schedule' && (
										<Grid item xs={12} md={12}>
											<Box px={2}>
												<RadioGroup
													aria-labelledby='demo-radio-buttons-group-label'
													name='completed'
													onChange={handleChange}
												>
													<FormControlLabel
														value={true}
														control={<Radio />}
														label='Mark the Service as a Completed Action.'
													/>
													<FormControlLabel
														value={false}
														control={<Radio />}
														label='Leave the Service as an Uncompleted Action.'
													/>
												</RadioGroup>
											</Box>
										</Grid>
									)}

									<ScheduleFields
										data={data}
										setData={setData}
										nature={nature}
									/>
									<Grid
										container
										justifyContent={'space-around'}
									>
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
											type='submit'
										>
											{loading ? (
												<LandlordLoading />
											) : (
												'Save'
											)}
										</LandlordButton>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<ImageDocumentModal
				open={attachmentModal}
				handleClose={(_) => setAttachmentModal(false)}
				docs={docs}
				images={images}
				setDocs={setDocs}
				setImages={setImages}
			/>
		</>
	);
};

export default AddServiceModal;
