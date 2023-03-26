import React, { useState, useEffect, useRef } from 'react';
import { Grid, Divider, Paper, Modal, Stack, Box } from '@mui/material';

import Footer from 'components/Footer';
import UsersList from './UsersList';
import TimeTable from '../TimeTable';
import SearchUsers from './SearchUsers';
import UserDetails from './UserDetails';
import SuiTypography from 'components/SuiTypography';
import UserAccountActions from './UserAccountActions';
import DashboardLayout from 'components/DashboardLayout';
import ForumAndKnowledgeDetails from './ForumAndKnowledgeDetails';
import MarketplaceDetails from './MarketplaceDetails';
import { SectionSubtitle } from 'components/styled/Admin';

import { instance as axios } from 'controllers/axios';
import { getUsersStats } from 'controllers/reviews';
import { getCSRF } from 'controllers/axios';
import { getUserTypeUrlParameter } from 'utils/urlUtils';
import { User } from 'types';

const userStates = [
	{
		name: 'Blocked',
		action: 'blockedFromCommenting',
	},
	{
		name: 'Suspended',
		action: 'suspended',
	},
	{
		name: 'On Probation',
		action: 'onProbation',
	},
	{
		name: 'Terminated',
		action: 'terminated',
	},
	{
		name: 'Reinstated',
		action: 'reinstated',
	},
	{ name: 'Unactivated', action: 'unactivated' },
];

function users() {
	const [usersStats, setUsersStats] = useState([]);
	const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
	const [inputValue, setInputValue] = useState('');
	const [users, setUsers] = useState([]);
	const [userComments, setUserComments] = useState([]);

	const delayRequestTimeout = useRef(null);

	const handleInputChange = (_, value, reason) => {
		if (value === 'undefined') return;

		if (reason === 'clear') {
			setSelectedUser(null);
		}

		setInputValue(value);
		if (value === '') return;

		clearTimeout(delayRequestTimeout.current);
		delayRequestTimeout.current = setTimeout(() => {
			fetchUsers({ key: 'name', value: value }).then((users) =>
				setUsers(users)
			);
		}, 1000);
	};

	const fetchUsers = async (criteria) => {
		const url = `/users?${criteria.key}${
			criteria.value ? `=${criteria.value}` : ''
		}`;

		try {
			const response = await axios.get(url);

			if (response.data) {
				return response.data;
			} else {
				throw 'no user data';
			}
		} catch (error) {
			alert('error fetching users');
		}
	};

	const handleSeeUsersList = (criteria) => {
		fetchUsers({ key: criteria }).then((users) => {
			setUsers(users);
		});
	};

	const handleUserAccountAction = async (action) => {
		await getCSRF();

		try {
			const response = await axios.patch(`/users/${selectedUser._id}`, {
				data: action,
			});

			if (response.status === 200) {
				setSelectedUser({ ...response.data });
				return true;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	const userLists = (
		<Stack rowGap={2}>
			{userStates.map((state) => (
				<UsersList
					key={state.name}
					users={users}
					listName={state.name}
					onExpand={() => {
						handleSeeUsersList(state.action);
					}}
				/>
			))}
			;
		</Stack>
	);

	useEffect(() => {
		getUsersStats().then((stats) => setUsersStats(stats));
	}, []);

	return (
		<DashboardLayout sx={{ pb: '3em' }}>
			<SuiTypography variant='h2'>Users Summary</SuiTypography>

			<TimeTable rows={formatUsersStats(usersStats)} />

			<Divider sx={{ my: 4 }} />

			<SearchUsers
				selectedUser={selectedUser}
				onSelectUser={(user) => setSelectedUser(user)}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				users={users}
			/>

			<Modal open={selectedUser !== null} onClose={() => setSelectedUser(null)}>
				<Box
					sx={{
						maxWidth: '800px',
						width: '100%',
						position: 'absolute',
						top: '50%',
						left: '50%',
						margin: '1em',
						transform: 'translate(-50%, -50%)',
						backgroundColor: '#fff',
						border: '1px solid #000',
						borderRadius: '10px',
						padding: '1em',
						overflow: 'scroll',
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} md={7}>
							<SectionSubtitle>User Details</SectionSubtitle>

							<Paper
								elevation={3}
								sx={{
									overflowY: 'scroll',
									maxHeight: '400px',
									p: '1em 1.5em',
									mt: 0,
									display: 'flex',
									flexDirection: 'column',
									li: { fontSize: '14px' },
								}}
							>
								<UserDetails {...selectedUser} />

								<Divider sx={{ my: 2 }} />

								<ForumAndKnowledgeDetails
									userId={selectedUser?._id}
									username={`${selectedUser?.first} ${selectedUser?.last}`}
									dateFirstComment={selectedUser?.dateFirstComment}
									dateLastComment={selectedUser?.dateLastComment}
									homeState={selectedUser?.homeState}
									homeCity={selectedUser?.homeCity}
									timezone={selectedUser?.timezone}
									favoritedCommunities={selectedUser?.favoritedCommunities}
								/>

								<Divider sx={{ my: 2 }} />

								<div>
									<MarketplaceDetails
										userType={selectedUser?.type}
										lastLogin={selectedUser?.lastLogin}
										userId={selectedUser?._id}
									/>

									<a
										href={`/marketplace/${getUserTypeUrlParameter(
											selectedUser?.type || 'landlord'
										)}/${selectedUser?._id}`}
										target='_blank'
									>
										See Profile
									</a>
								</div>
							</Paper>
						</Grid>

						<Grid item xs={12} md={5}>
							<SectionSubtitle>Actions</SectionSubtitle>
							<UserAccountActions
								selectedUser={selectedUser}
								onAction={handleUserAccountAction}
							/>
						</Grid>
					</Grid>
				</Box>
			</Modal>

			<Divider sx={{ my: 4 }} />

			{userLists}
			<Footer renderSubscribe={false} />
		</DashboardLayout>
	);
}

function formatUsersStats(usersStats) {
	const activeUsersDates = usersStats?.activeUsers?.map(
		(user) => user.lastLogin
	);
	const deletedUsersDates = usersStats?.deletedUsers?.map(
		(user) => user.deletedDate
	);
	const newUsersDates = usersStats?.newUsers?.map(
		(user) => user.dateFirstJoined
	);
	const bannedUsersDates = usersStats?.bannedUsers?.map(
		(user) => user.dateTerminated
	);

	return [
		{ name: 'Active Users', content: sortByTime(activeUsersDates) },
		{ name: 'New Users', content: sortByTime(newUsersDates) },
		{ name: 'Deleted Users', content: sortByTime(deletedUsersDates) },
		{ name: 'Banned Users', content: sortByTime(bannedUsersDates) },
	];
}

function sortByTime(dates) {
	const counts = [0, 0, 0, 0];
	const last = {
		day: 24 * 60 * 60 * 1000,
		week: 7 * 24 * 60 * 60 * 1000,
		month: 30 * 24 * 60 * 60 * 1000,
		year: 12 * 30 * 24 * 60 * 60 * 1000,
	};

	dates?.forEach((date) => {
		// 2022-02-01
		if (fallsWithin(date, last.day)) {
			counts[0]++;
		} else if (fallsWithin(date, last.week)) {
			counts[1]++;
		} else if (fallsWithin(date, last.month)) {
			counts[2]++;
		} else if (fallsWithin(date, last.year)) {
			counts[3]++;
		}
	});

	return counts;
}

function fallsWithin(date, range) {
	const pastTime = new Date(date);
	const now = new Date();

	const timeDiffInMs = now.getTime() - pastTime.getTime();

	if (timeDiffInMs >= range) {
		// Date is older than range
		return false;
	} else {
		// Date is not older than range
		return true;
	}
}

export default users;
