import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Divider, Card } from '@mui/material';
import {
	DashboardContainer,
	HeaderContainer,
	UnreadNotification,
	ReadNotification,
	ReadCloseIconContainer,
	MainContainer,
	DescriptionContainer,
	DescriptionText,
	DescriptionIconsContainer,
	DescriptionIconsLeft,
	DescriptionTime,
	StyledWarningIcon,
	StyledTypography,
	StyledNotificationIcon,
	StyledCorrectIcon,
	StyledVisibilityIcon,
	StyledCloseIcon,
	DescriptionIconsRight,
} from '../styled/Notifications';
import Fromnow from 'react-fromnow';

function DashboardNotification(props) {
	const [notifications, setNotifications] = useState(notificationData);

	return (
		<DashboardContainer>
			<HeaderContainer>
				<StyledTypography>Notifications</StyledTypography>
				<Autocomplete
					id='combo-box-demo'
					options={options}
					getOptionLabel={(option) => option.title}
					style={{ width: 150 }}
					renderInput={(params) => (
						<TextField
							{...params}
							label='view option'
							variant='outlined'
						/>
					)}
				/>
			</HeaderContainer>
			<div>
				{notifications.map((data) => {
					return (
						<>
							<MainContainer key={data.title}>
								{data.isRead ? (
									<UnreadNotification>
										<StyledNotificationIcon />
									</UnreadNotification>
								) : (
									<ReadNotification>
										<StyledNotificationIcon />
									</ReadNotification>
								)}
								<DescriptionContainer>
									<DescriptionText>
										{data.description}
									</DescriptionText>
									<DescriptionIconsContainer>
										<DescriptionIconsLeft>
											<div>
												{data.isRead ? (
													<StyledWarningIcon />
												) : (
													<StyledCorrectIcon />
												)}
											</div>
											<DescriptionTime>
												<Fromnow
													date={data.createdAt}
												/>
											</DescriptionTime>
										</DescriptionIconsLeft>
										<DescriptionIconsRight>
											<ReadCloseIconContainer>
												<StyledVisibilityIcon />
											</ReadCloseIconContainer>
											<ReadCloseIconContainer>
												<StyledCloseIcon />
											</ReadCloseIconContainer>
										</DescriptionIconsRight>
									</DescriptionIconsContainer>
								</DescriptionContainer>
							</MainContainer>
							<Divider />
						</>
					);
				})}
			</div>
		</DashboardContainer>
	);
}

const notificationData = [
	{
		tile: 'Lorem',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		isRead: true,
		createdAt: '2021-03-16T08:28:59.513Z',
	},
	{
		tile: 'Lorem',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		isRead: false,
		createdAt: '2021-03-17T09:20:59.513Z',
	},
	{
		tile: 'Lorem',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		isRead: true,
		createdAt: '2021-03-17T08:28:59.513Z',
	},
	{
		tile: 'Lorem',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis tortor leo.',
		isRead: false,
		createdAt: '2021-03-17T08:28:59.513Z',
	},
];

const options = [
	{
		title: 'View All',
	},
	{
		title: 'Read',
	},
	{
		title: 'Unread',
	},
];

export default DashboardNotification;
