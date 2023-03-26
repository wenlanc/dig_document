import React from 'react';
import { authContext } from '../contexts/AuthContext';
import { Grid, Avatar, Typography, IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import styled from 'styled-components';

function UserInfo() {
	const UserInfoContainer = styled(Grid)`
		border-bottom: 3px dotted grey;
		padding-bottom: 3rem;
	`;

	const { auth } = React.useContext(authContext);
	return (
		<>
			<UserInfoContainer container spacing={1}>
				<Grid item>
					<Avatar
						alt='user profile'
						src={auth.data.profilePicUrl}
						style={{
							height: '3em',
							width: '3em',
							background: '#0063C8',
						}}
					>
						{auth.data.first[0].toUpperCase()}
					</Avatar>
				</Grid>
				<Grid item>
					<Typography variant='h5' component='h5' style={{ margin: 0 }}>
						{auth.data.name}{' '}
						<IconButton size='small'>
							<CreateIcon fontSize='small' />
						</IconButton>
					</Typography>
					<Typography variant='subtitle2' component='span'>
						Head of Marketing
					</Typography>
				</Grid>
			</UserInfoContainer>
		</>
	);
}

export default UserInfo;
