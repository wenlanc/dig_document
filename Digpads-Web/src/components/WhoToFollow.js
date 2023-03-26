import React from 'react';
import { Link } from 'react-router-dom';
import { StyledContainer, HeadingGrid } from './styled/Feed';
import { Avatar, Grid } from '@mui/material';
import { FollowButton } from './styled/Feed';

function WhoToFollow() {
	const [users, setusers] = React.useState([
		{
			name: 'sam taylor',
			role: 'manager',
			image: '',
			first: 'sam',
			last: 'taylor',
		},

		{
			name: 'Matt Hodges',
			role: 'Team lead',
			image: '',
			first: 'Matt',
			last: 'Hodges',
		},
		{
			name: 'Joshua Golden',
			role: 'Developer',
			image: '',
			first: 'Joshua',
			last: 'Golden',
		},
		{
			name: 'Jude Flannery',
			role: 'Developer',
			image: '',
			first: 'Jude',
			last: 'Flannery',
		},
	]);

	return (
		<>
			<StyledContainer container spacing={3}>
				<HeadingGrid item container justify='space-between'>
					<Grid item>Who to follow</Grid>
					<Grid item>
						<Link to='/someurl'>see more</Link>
					</Grid>
				</HeadingGrid>
				<Grid item container direction='column'>
					{users.map((user, key) => (
						<User user={user} key={key} />
					))}
				</Grid>
			</StyledContainer>
		</>
	);
}

function User({ user }) {
	return (
		<Grid container spacing={2} style={{ marginBottom: '0.1rem' }}>
			<Grid item>
				<Avatar src={user.image}>{user.first[0]}</Avatar>
			</Grid>
			<Grid item xs>
				<h3 style={{ padding: 0, margin: 0 }}>
					{user.first + ' ' + user.last}
				</h3>
				{user.role}
			</Grid>
			<Grid item>
				<FollowButton onClick={() => console.log('clicked')}>
					Follow
				</FollowButton>
			</Grid>
		</Grid>
	);
}

export default WhoToFollow;
