import React, { useState, useEffect, useMemo } from 'react';
import {
	Grid,
	Typography,
	Box,
	CircularProgress,
	Paper,
	Menu,
	MenuItem,
} from '@mui/material';
import styled from 'styled-components';
import Overview from './Overview';
import Nontification from './Nontification';
import ContentCalendar from './ContentCalendar';
import Card from './Card';
import colors from 'assets/theme/base/colors';
import { useLocation } from 'react-router-dom';

import moment from 'moment';
import { instance } from '../../controllers/axios';
import EventTypeModal from './Properties/Events/EventTypeModal';
import { authContext } from '../../contexts/AuthContext';
import { getDateWithUTCOffset, getOffsets } from 'utils/TimeUtils';
import NotificationItem from 'components/NotificationItem';
import { Schedule, FilterListOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Pagination from './CustomPagination';

const Root = styled.div`
	margin-top: 48px;
`;
const StyleGridContainer = styled(Grid)``;
const StyledHeadingOurListing = styled(Typography)`
	color: #0063c8;
	text-align: center;
	font-size: 36px;
	:first-letter {
		font-weight: bold;
	}
`;
const Image = styled.img`
	height: 160px;
	width: 160px;
	margin-left: auto;
	margin-right: auto;
	display: block;
`;

const Overviews = ({ nontifications, ourListing }) => {
	let PageSize = 5;
	const location = useLocation();

	const [nontification, setNontification] = useState(nontifications);
	const [dateObj, setDateObj] = useState(null);
	const [recordModal, setRecordModal] = useState(false);
	const [scheduleModal, setScheduleModal] = useState(false);
	const { auth, setAuthData } = React.useContext(authContext);
	const [timezone, setTimezone] = useState({});
	const [eventsToShow, setEventsToShow] = useState([]);
	const [eventFilter, setEventFilter] = useState(null);
	// const timezone = auth?.data?.timezone;
	const [currentPage, setCurrentPage] = useState(1);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const notificationFilters = [
		'Day Of',
		'Day Before',
		'3 Days Before',
		'Week Before',
		'Two Weeks Before',
		'Month Before',
		'Show All',
	];

	const { data: events } = useSelector((state) => state.EventList);

	useEffect(() => {
		let dateToCompare;
		switch (eventFilter) {
			case 'Day Of':
				dateToCompare = moment().toDate();
				break;
			case 'Day Before':
				dateToCompare = moment().add(1, 'days').toDate();
			case 'Month Before':
				dateToCompare = moment().add(1, 'months').toDate();
				break;
			case '3 Days Before':
				dateToCompare = moment().add(3, 'days').toDate();
				break;
			case 'Week Before':
				dateToCompare = moment().add(1, 'weeks').toDate();
				break;
			case 'Two Weeks Before':
				dateToCompare = moment().add(1, 'weeks').toDate();
				break;
			case null:
			default:
				console.log('all');
				dateToCompare = moment().toDate();
				break;
		}
		let toShow;
		if (eventFilter === 'Show All') {
			toShow = events?.filter((e) => e?.eventNature === 'Schedule');
		} else {
			toShow = events?.filter(
				(e) =>
					e?.eventNature === 'Schedule' &&
					moment(dateToCompare).isSameOrBefore(
						e?.scheduleDate || new Date(Date.now())
					)
			);
		}
		setEventsToShow(toShow);
	}, [events, eventFilter]);

	useEffect(() => {
		setEventFilter('Day Before');
	}, []);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return eventsToShow.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, eventsToShow]);

	useEffect(() => {
		// getUserOffset();
		instance
			.get('userProfile')
			.then((res) => setTimezone(res.data.data.data.timezone));
	}, []);

	// const getUserOffset = async () => {
	// 	const data = await instance.get('userProfile');
	// 	// .then((res) => setTimezone(res.data.data.data.timezone));
	// 	setTimezone(data.data.data.data.timezone);
	// 	return data.data.data.data.timezone;
	// };

	useEffect(() => {
		try {
			let interval, zone;
			if (!timezone?.offset) {
				return;
			}

			getOffsets().then((_allOffsets) => {
				interval = setInterval(async () => {
					const timeArray = await getDateWithUTCOffset(
						timezone || zone,
						_allOffsets
					);
					const extracted = {
						day: moment(timeArray).format('DD'),
						month: moment(timeArray).format('MMMM'),
						time: moment(timeArray).format('h:mm'),
						zone: timezone?.short,
					};
					setDateObj(extracted);
				}, 1000);
			});
			return () => clearInterval(interval);
		} catch (error) {
			console.log('catch error', error);
			return () => clearInterval(interval);
		}

		// const interval = setInterval(() => {
		// 	console.log('da day', dateObj?.day);
		// 	if (!timezone?.offset) {
		// 		setDateObj(null);
		// 	}
		// 	const timeArray = getDateWithUTCOffset(timezone?.offset);
		// 	const extracted = {
		// 		day: moment(timeArray).format('DD'),
		// 		month: moment(timeArray).format('MMMM'),
		// 		time: moment(timeArray).format('h:mm'),
		// 		zone: timezone?.short,
		// 	};
		// 	setDateObj(extracted);
		// }, 1000);
		// return () => clearInterval(interval);
	}, [auth?.authenticated, location, timezone]);
	// useEffect(() => {
	// 	console.log('location change');
	// 	let interval;
	// 	if (!timezone?.offset) {
	// 		setDateObj(null);
	// 		console.log('no offset');
	// 		return;
	// 	}

	// 	getOffsets().then((_allOffsets) => {
	// 		interval = setInterval(async () => {
	// 			const timeArray = await getDateWithUTCOffset(
	// 				timezone,
	// 				_allOffsets
	// 			);
	// 			console.log('timeArray got', timeArray);
	// 			const extracted = {
	// 				day: moment(timeArray).format('DD'),
	// 				month: moment(timeArray).format('MMMM'),
	// 				time: moment(timeArray).format('h:mm'),
	// 				zone: timezone?.short,
	// 			};
	// 			setDateObj(extracted);
	// 		}, 1000);
	// 	});
	// 	return () => clearInterval(interval);
	// }, [location]);

	useEffect(() => {
		console.log('path', location?.pathname);
	}, [location?.pathname]);
	return (
		<Root>
			<StyledHeadingOurListing variant='h4' component='h2' gutterBottom>
				Outstanding Items{' '}
			</StyledHeadingOurListing>
			<Box
				display='flex'
				flexWrap='wrap'
				justifyContent='space-between'
				mt={5}
			>
				{' '}
				<Overview
					title='Quick Send'
					img={
						<Image
							style={{ width: '65%', height: '65%' }}
							src='/images/quick_send.png'
							alt='Quick Send'
						/>
					}
				/>{' '}
				{timezone?.offset && (
					<Box
						border={'dotted 1px #000000'}
						display={'grid'}
						justifyContent={'center'}
						alignContent={'center'}
						px={10}
						py={1}
						textAlign={'center'}
						fontWeight={400}
						mb={'48px'}
						style={{
							width: '250px',
						}}
					>
						{dateObj ? (
							<>
								<Typography fontSize={'48px'} fontWeight={600}>
									{dateObj?.day}
								</Typography>
								<Typography fontSize={'20px'} fontWeight={600}>
									{dateObj?.month}
								</Typography>
								<Typography
									fontSize={'20px'}
									color={'#212EA5'}
									fontWeight={600}
								>
									{dateObj?.time} {dateObj?.zone}
								</Typography>
							</>
						) : (
							<CircularProgress />
						)}
					</Box>
				)}
				<Overview
					title='New Rental'
					img={
						<Image
							style={{ width: '65%', height: '65%' }}
							src='/images/new_rental.png'
							alt='New Rental'
						/>
					}
				/>
			</Box>
			<Box display='flex' flexWrap='wrap' justifyContent='space-between'>
				<Overview
					title='Record'
					img={
						<Image
							style={{ width: '65%', height: '65%' }}
							src='/images/record.svg'
							alt='New Rental'
						/>
					}
					onClick={() => setRecordModal(true)}
				/>
				<Overview
					title='Schedule'
					img={
						<Image
							style={{ width: '65%', height: '65%' }}
							src='/images/schedule.svg'
							alt='New Rental'
						/>
					}
					onClick={() => setScheduleModal(true)}
				/>
			</Box>

			<StyleGridContainer
				container
				spacing={4}
				style={{ marginBottom: 48 }}
			>
				<Grid item xs={12} xl={12}>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						width={'100%'}
					>
						<Paper sx={{ p: 2, width: '100%' }}>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
								pb={4}
							>
								<StyledHeadingOurListing
									variant='h6'
									component='h4'
									sx={{
										fontSize: '32px !important',
										ml: '16px',
									}}
									gutterBottom
								>
									Content Calendar{' '}
								</StyledHeadingOurListing>
								<FilterListOutlined
									style={{
										transform: 'scale(2)',
										cursor: 'pointer',
									}}
									onClick={(e) =>
										setAnchorEl(e?.currentTarget)
									}
								/>
								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={() => setAnchorEl(null)}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									{notificationFilters.map((f) => {
										return (
											<MenuItem
												onClick={() => {
													setEventFilter(f);
													setAnchorEl(null);
												}}
											>
												{f}
											</MenuItem>
										);
									})}
								</Menu>
							</Box>
							{currentTableData?.length > 0 ? (
								currentTableData?.map((event) => {
									return (
										<NotificationItem
											image={
												<Schedule
													style={{ color: 'white' }}
												/>
											}
											subtitle={event?.eventType}
											leading={event?.eventType}
											title={[
												'',
												<Box
													display={'flex'}
													flexDirection={'column'}
												>
													<Typography
														component={'h6'}
														variant={'h6'}
													>
														{event?.parentName}
													</Typography>
													<Typography
														component={'small'}
														variant={'small'}
														fontWeight={'bold'}
														color={
															colors?.primary
																?.main
														}
													>
														{event?.eventLocation} -{' '}
														{
															event?.property
																?.propertyName
														}
													</Typography>
													<Typography
														component={'small'}
														variant={'small'}
														fontWeight={'bold'}
														color={
															colors?.error?.main
														}
													>
														Scheduled Event
													</Typography>
												</Box>,
											]}
											color={colors?.primary?.main}
											date={{
												color: 'error',
												text: moment(
													event?.scheduleDate
												).format(
													'HH:mm A on DD/MM/YYYY'
												),
											}}
										/>
									);
								})
							) : (
								<Box py={5}>
									<Typography
										component={'h5'}
										variant={'h5'}
										textAlign={'center'}
									>
										No Notifications to show.
									</Typography>
								</Box>
							)}

							<Pagination
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
								currentPage={currentPage}
								totalCount={eventsToShow.length}
								pageSize={PageSize}
								onPageChange={(page) => setCurrentPage(page)}
							/>
						</Paper>
					</Box>

					{/* <ContentCalendar title='Content Calendar' /> */}
				</Grid>
			</StyleGridContainer>

			<EventTypeModal
				open={recordModal}
				handleClose={() => setRecordModal(false)}
				nature={'Record'}
			/>
			<EventTypeModal
				open={scheduleModal}
				handleClose={() => setScheduleModal(false)}
				nature={'Schedule'}
			/>
		</Root>
	);
};

export default Overviews;
