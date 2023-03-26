import React from 'react';
import { Typography } from '@mui/material';
import { User } from 'types';

export default function UserDetails(props: Partial<User>) {
	let userStatus = `${props.blockedFromCommenting ? 'blocked,' : ''}
     ${props.suspended ? 'suspended,' : ''}
      ${props.onProbation ? 'on probation,' : ''}
       ${props.reinstated ? 'reinstated,' : ''}
        ${props.permanentlyDeleted ? 'permanently deleted' : ''}`;
	userStatus = userStatus.trim() === '' ? 'active' : userStatus;

	const userDetails = {
		name: props.last,
		Type: props.type,
		Status: userStatus,
		'Account Type': props.accountType,
		'Last IP Address': props.lastIpAddress,
		'Email Address': props.email || '',
		'Date Joined': props.dateFirstJoined
			? new Date(props.dateFirstJoined).toDateString()
			: '',
		'Date of Last Password Change': props.dateLastPasswordChange
			? new Date(props.dateLastPasswordChange).toDateString()
			: new Date(props.dateFirstJoined).toDateString(),
		'Admin Actions Taken & Reason List': props.adminActionsTaken?.map(
			(action, i) => (
				<div key={i} style={{ marginLeft: '10px' }}>
					action: <span>{action.action}</span> reason:{' '}
					<span>{action.reason}</span>
				</div>
			)
		),
	};

	return (
		<ul>
			<Typography sx={{ fontWeight: 'bold' }}>User</Typography>

			{Object.keys(userDetails).map((detail, i) => (
				<li key={i}>
					<span key={i} style={{ fontWeight: 'bold' }}>
						{detail}:{' '}
					</span>
					{userDetails[detail]}
				</li>
			))}
		</ul>
	);
}
