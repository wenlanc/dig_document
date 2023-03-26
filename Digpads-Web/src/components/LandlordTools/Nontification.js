import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
	Box,
	Divider,
	Select,
	MenuItem,
	IconButton,
} from '@mui/material';
import {
	NotificationsNone,
	Warning,
	CheckCircle,
	Close,
	RemoveRedEye,
} from '@mui/icons-material';
import styled from 'styled-components';

const Root = styled.div`
height: 100%:`;

const StyledAvatar = styled(Avatar)`
	background: ${(props) => props.status === 'success' && '#a0e25e'};
	background: ${(props) => props.status === 'warning' && '#fdd696'};
	margin-right: 24px;
	width: 70px;
	height: 70px;
`;

const StyledNotificationsNoneIcon = styled(NotificationsNone)`
	width: 36px;
	height: 36px;
`;

const StyledCardContent = styled(CardContent)`
	display: flex;
	padding: 32px;
	@media screen and (max-width: 600px) {
		padding: 16px;
	}
`;

const StyledWarning = styled(Warning)`
	color: #fdd696;
	margin-right: 16px;
`;

const StyledCheckCircle = styled(CheckCircle)`
	color: #a0e25e;
	margin-right: 16px;
`;

const StyledSelect = styled(Select)`
	.MuiOutlinedInput-input {
		padding-top: 12px !important;
		padding-bottom: 12px !important;
	}
`;

const StyledClose = styled(Close)`
	color: #0063c8;
	width: 16px;
	height: 16px;
`;

const StyledRemoveRedEye = styled(RemoveRedEye)`
	color: #0063c8;
	width: 16px;
	height: 16px;
`;

const StyledIconButton = styled(IconButton)`
	background: #dcdcdc;
	padding: 4px;
	margin-left: 8px;
`;

const Heading = styled(Typography)`
	font-weight: bold;
	font-size: 20px;
`;

const Title = styled(Typography)`
	margin-bottom: 24px;
	line-height: 1.5;
	font-weight: 400;
`;

const Date = styled(Typography)`
	color: #6c757d;
	font-weight: 300;

	@media screen and (max-width: 600px) {
		font-size: 12px;
	}
`;

function Nontification({
	title,
	nontifications,
	setNontifications,
	view,
	setView,
}) {
	const handleDelete = (idx) => {
		const stateNontifications = nontifications.filter(
			(nontification, index) => {
				return index !== idx;
			}
		);

		setNontifications([...stateNontifications]);
	};

	return (
		<Root>
			<Card>
				<CardHeader
					title={
						<Heading variant='body1' component='h2'>
							{title}
						</Heading>
					}
					action={
						<StyledSelect
							variant='outlined'
							value={view}
							onChange={(event) => {
								setView(event.target.value);
							}}
						>
							<MenuItem value='View All'>View All</MenuItem>
						</StyledSelect>
					}
				/>
				<Divider />
				{nontifications.map((nontification, index) => (
					<div key={index}>
						<StyledCardContent>
							<StyledAvatar status={nontification.status}>
								<StyledNotificationsNoneIcon />
							</StyledAvatar>
							<Box width='100%'>
								<Title
									gutterBottom
									variant='body1'
									component='p'
								>
									{nontification.title}
								</Title>
								<Box
									display='flex'
									justifyContent='space-between'
								>
									<Box display='flex' alignItems='center'>
										{nontification.status === 'warning' && (
											<StyledWarning />
										)}
										{nontification.status === 'success' && (
											<StyledCheckCircle />
										)}
										<Date variant='body1' component='p'>
											{nontification.date}
										</Date>
									</Box>
									<Box display='flex' alignItems='center'>
										<StyledIconButton
											onClick={() => {
												alert('Show notification');
											}}
										>
											<StyledRemoveRedEye />
										</StyledIconButton>
										<StyledIconButton
											onClick={() => {
												handleDelete(index);
											}}
										>
											<StyledClose />
										</StyledIconButton>
									</Box>
								</Box>
							</Box>
						</StyledCardContent>
						<Divider />
					</div>
				))}
			</Card>
		</Root>
	);
}

export default Nontification;
