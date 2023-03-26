import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	Box,
	Typography,
	TextField,
	Grid,
	Modal,
	Button,
	Paper,
	Divider,
} from '@mui/material';

import { Close, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { modalBoxStyles } from '../../../../styled/Modal';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import UploadImages from '../../../../../Views/posts/UploadImages';
import {
	NewFixture,
	EditFixture,
	DeleteFixture,
} from '../../../../../store/actions/Property/fixtureAction';
import { useDispatch } from 'react-redux';
import AddRoomButton from '../../Utils/AddRoomButton';
import { nwc } from 'utils/NumberUtils';
import { nwoc } from 'utils/NumberUtils';
import SuiInput from 'components/SuiInput';
import { LandlordButton } from 'components/styled/Button';
import { LandlordLoading } from 'components/styled/Button';
import CustomLabel from '../../Utils/DateLabel';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';
import AttachmentButton from '../../Utils/AttachmentButton';
import ImageDocumentModal from '../../Utils/ImageDocumentModal';

const PREFIX = 'AddFixtureModal';

const classes = {
	modal: `${PREFIX}-modal`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
	[`& .${classes.modal}`]: {
		overflowY: 'auto',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			height: 'auto',
		},
	},
}));

const AddFixtureModal = ({
	propData,
	setPropData,
	title,
	open,
	onClose,
	handleClose,
	property,
	room,
	external,
	properties,
	rooms,
}) => {
	const [images, setImages] = useState([]);
	const [docs, setDocs] = useState([]);
	const [roomModal, setRoomModal] = useState(false);
	const [attachmentModal, setAttachmentModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [cData, setCData] = useState({});
	const dispatch = useDispatch();

	const [propertyRooms, setPropertyRooms] = useState([]);

	let data, setData;
	if (title === 'Add') {
		data = cData;
		setData = setCData;
	} else {
		data = propData;
		setData = setPropData;
	}

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (roomModal) return false;
		setLoading(true);

		data.property = property?._id || data?.property;
		data.room = room?._id || data?.room;
		data.amount = nwoc(data?.amount);
		const item = { ...data, images, attachments: docs };
		if (title === 'Add') {
			await dispatch(NewFixture(item));
		} else {
			await dispatch(EditFixture(item));
		}
		setData({});
		setLoading(false);
		handleClose();
	};
	const getPopertyRooms = () => {
		let pRooms = rooms?.filter(
			(r) => r?.property?._id === (data?.property?._id || data?.property)
		);

		setPropertyRooms(pRooms);
	};

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, [data?.property, rooms]);

	useEffect(() => {
		getPopertyRooms();
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		setImages([]);
		const oldImages = data?.images;
		if (oldImages) {
			setImages([...oldImages]);
		}
		//eslint-disable-next-line
	}, [open]);

	const removeImage = (imageToRemove) => {
		const filteredImages = images.filter((i) => i !== imageToRemove);
		setImages(filteredImages);
	};

	const handleDelete = async () => {
		const _data = {
			_id: data?._id,
		};
		await dispatch(DeleteFixture(_data));
		// handleClose();
	};

	return (
		<Root>
			<StyledMUIModal open={open} onClose={onClose}>
				<ModalBox sx={modalBoxStyles}>
					<ModalPaper>
						<Box component={'form'} onSubmit={handleSubmit}>
							<TitleBox display='flex' justifyContent='space-between'>
								<Typography variant='h5' component='h2' fontWeight='bold'>
									{title} Fixture
								</Typography>
								<CloseBox onClick={onClose}>
									<Close style={{ cursor: 'pointer' }} />
								</CloseBox>
							</TitleBox>
							<Divider />
							<Box sx={{ mt: 2 }}>
								<Grid container columnSpacing={2} rowSpacing={1}>
									<Grid item xs={12} md={4}>
										<TextField
											name='name'
											onChange={handleChange}
											placeholder='Fixture Name'
											variant='outlined'
											fullWidth
											value={data?.name}
											required
										/>
										{data?.name && <CustomLabel label={'Fixture Name'} />}
									</Grid>
									<Grid item xs={12} md={4}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												placeholder='Date New/Remodeled'
												minDate={new Date('1800-01-01')}
												onChange={(value) => {
													setData({
														...data,
														date: String(value),
													});
												}}
												value={data?.date || Date.now()}
												renderInput={(params) => (
													<TextField
														placeholder='Date New/Remodeled'
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
										<Box width={'100%'} display={'flex'}>
											<Typography
												component={'small'}
												variant={'small'}
												textAlign={'center'}
												sx={{
													textAlign: 'center',
													m: 'auto',
													mt: '1px',
												}}
												color={'#c4c4c4'}
											>
												Date New/Remodeled
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} md={4}>
										<Autocomplete
											id='condition-autocomplete'
											options={['New', 'Very Good', 'Good', 'Fair', 'Poor']}
											getOptionLabel={(condition) => `${condition}`}
											onChange={(e, condition, reason) =>
												reason === 'selectOption'
													? setData({
															...data,
															condition,
													  })
													: setData({
															...data,
															condition: '',
													  })
											}
											value={data?.condition}
											renderInput={(params) => {
												return (
													<TextField
														{...params}
														value={data?.condition}
														placeholder='Condition'
														variant='outlined'
														required
													/>
												);
											}}
										/>
										{data?.condition && <CustomLabel label={'Condition'} />}
									</Grid>

									<Grid item xs={12} md={4}>
										<TextField
											name='manufacturer'
											onChange={handleChange}
											placeholder='Manufacturer/Supplier'
											variant='outlined'
											fullWidth
											value={data?.manufacturer}
											required
										/>
										{data?.manufacturer && (
											<CustomLabel label={'Manufacturer/supplier'} />
										)}
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField
											name='contractor'
											onChange={handleChange}
											placeholder='Contractor'
											variant='outlined'
											fullWidth
											value={data?.contractor}
											required
										/>
										{data?.contractor && <CustomLabel label={'contractor'} />}
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
										{data?.amount && <CustomLabel label={'amount'} />}
									</Grid>
									{external && (
										<React.Fragment>
											<Grid item xs={12} md={6}>
												<Autocomplete
													placeholder='Property'
													style={{
														marginBottom: 16,
													}}
													id='property-autocomplete'
													options={properties}
													getOptionLabel={(property) =>
														`${property.propertyName}`
													}
													onChange={(e, property, reason) => {
														reason === 'selectOption'
															? setData({
																	...data,
																	property: property,
																	room: null,
															  })
															: setData({
																	...data,
																	property: null,
																	room: null,
															  });

														console.log('data now', data);
													}}
													value={data?.property}
													renderInput={(params) => {
														return (
															<TextField
																{...params}
																value={data?.property?.propertyName}
																placeholder='Property'
																variant='outlined'
																required
															/>
														);
													}}
												/>
												{data?.property && <CustomLabel label={'property'} />}
											</Grid>
											<Grid item xs={12} md={6}>
												<Autocomplete
													placeholder='Room'
													key={data?.property}
													style={{
														marginBottom: 16,
													}}
													id='room-autocomplete'
													options={propertyRooms}
													getOptionLabel={(room) => `${room.name}`}
													onChange={(e, room, reason) =>
														reason === 'selectOption'
															? setData({
																	...data,
																	room: room,
															  })
															: setData({
																	...data,
																	room: null,
															  })
													}
													value={data?.room}
													renderInput={(params) => {
														return (
															<TextField
																{...params}
																value={data?.room?.name}
																placeholder='Room'
																variant='outlined'
																required
															/>
														);
													}}
												/>
												<AddRoomButton
													onOpen={(_) => setRoomModal(true)}
													onClose={(_) => setRoomModal(false)}
												/>
											</Grid>
										</React.Fragment>
									)}
									<Grid item xs={12} md={12}>
										<AttachmentButton
											images={images}
											docs={docs}
											uploadHandler={(_) => setAttachmentModal(true)}
										/>
									</Grid>
									<Grid item xs={12} md={12}>
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
								</Grid>
							</Box>
							<Grid container justifyContent={'space-around'}>
								<LandlordButton
									variant={'contained'}
									size={'medium'}
									color={'success'}
									type={'submit'}
									sx={{
										minWidth: 160,
										my: 2,
										mx: 5,
									}}
									disabled={loading}
									onClick={handleSubmit}
								>
									{loading ? <LandlordLoading /> : 'Save'}
								</LandlordButton>
								{title === 'Edit' ? (
									<LandlordButton
										variant={'contained'}
										size={'medium'}
										color={'error'}
										sx={{
											minWidth: 160,
											my: 2,
											mx: 5,
										}}
										disabled={loading}
										onClick={() => setDeleteModal(true)}
									>
										{loading ? <LandlordLoading /> : 'Delete'}
									</LandlordButton>
								) : null}
							</Grid>
						</Box>
					</ModalPaper>
				</ModalBox>
			</StyledMUIModal>
			<ImageDocumentModal
				images={images}
				docs={docs}
				setImages={setImages}
				setDocs={setDocs}
				handleClose={(_) => setAttachmentModal(false)}
				open={attachmentModal}
			/>
		</Root>
	);
};

export default AddFixtureModal;
