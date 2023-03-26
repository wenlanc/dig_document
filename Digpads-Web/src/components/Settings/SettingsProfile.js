import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import {
	Typography,
	Grid,
	Box,
	TextField,
	InputLabel,
	Button,
	Autocomplete,
	Divider,
} from '@mui/material';

import { useAuth } from 'contexts/AuthContext';
import CurrentTime from './CurrentTime';
import ProfilePhoto from './ProfilePhoto';
import usaStates from '../../constants/usaStates';
import usaCities from '../../constants/usaCities';
import timezones from 'constants/timezones';
import { updateProfilePhoto } from 'controllers/users';

const PREFIX = 'SettingsProfile';

const classes = {
	title: `${PREFIX}-title`,
	rootInput: `${PREFIX}-rootInput`,
	rootAccount: `${PREFIX}-rootAccount`,
	homeCity: `${PREFIX}-homeCity`,
	input: `${PREFIX}-input`,
};

const Root = styled.section``;

const StyledRoot = muiStyled(Root)(({ theme }) => ({
	[`& .${classes.title}`]: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.75em',
		},
	},

	[`& .${classes.rootInput}`]: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'start',
			'& > label': {
				marginBottom: theme.spacing(1),
			},
			'& > div': {
				maxWidth: '100%',
			},
		},
	},

	[`& .${classes.rootAccount}`]: {
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'start',
		},
	},

	[`& .${classes.homeCity}`]: {
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'start',
			'& > div': {
				width: '100% !important',
			},
			'& > div > .MuiAutocomplete-root': {
				marginRight: '0 !important',
			},
		},
	},

	[`& .${classes.input}`]: {
		display: 'none',
	},
}));

const Input = styled(TextField)`
	max-width: 440px;
	width: 100%;
	background: #fff;
	max-height: 48px;
`;

const LabelInput = styled(InputLabel)`
	min-width: 140px;
`;

export default function SettingsProfile({
	profile,
	setProfile,
	handleChange,
	onSubmit,
	sectionRefs,
	handleOpen,
}) {
	const [stateCities, setStateCities] = useState([]);

	const { auth } = useAuth();

	function handleCityChange(e, city, reason) {
		if (reason === 'selectOption') {
			setProfile({
				...profile,
				city,
			});
			return;
		}

		if (reason === 'clear') {
			setProfile({
				...profile,
				city: '',
			});
		}
	}

	function handleStateChange(e, value, reason) {
		if (reason === 'clear') {
			setProfile({
				...profile,
				city: '',
				state: '',
			});
			setStateCities([]);
			// props.onChange(null, null, 'clear');
			return;
		}

		const stateName = value.name;

		if (reason === 'selectOption') {
			// props.onChange(stateName);
			setProfile({
				...profile,
				city: '',
			});
		}

		// set cities for the selected state
		let stateCities = usaCities.filter((c) => c.state === stateName);
		stateCities = stateCities.map((c) => c.city);
		// add empty option to remove warning
		stateCities.unshift('');

		setProfile({
			...profile,
			city: '',
			state: stateName,
		});
		setStateCities(stateCities);
	}

	const handleProfilePhotoChange = async (photo) => {
		const userId = auth?.data?._id;
		const profilePhoto = await updateProfilePhoto(userId, photo);

		setProfile({
			...profile,
			profilePicUrl: profilePhoto,
		});
	};

	return (
		<StyledRoot id='profile' ref={sectionRefs}>
			<form
				encType='multipart/form-data'
				onSubmit={(event) => {
					onSubmit(event, 'Profile');
				}}
			>
				<Typography
					variant='h3'
					component='h2'
					className={classes.title}
					style={{ marginBottom: '0.5em', fontWeight: 'bold' }}
				>
					Forum
				</Typography>

				<Typography
					color='textSecondary'
					variant='h5'
					component='h3'
					className={classes.title}
					style={{ marginBottom: '1.25em', fontWeight: 'bold' }}
				>
					Forum Profile & Settings
				</Typography>

				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<ProfilePhoto
							currentPhoto={profile.profilePicUrl}
							onChange={handleProfilePhotoChange}
						/>
					</Grid>
					<Grid item xs={12} md={8}>
						<Box
							mb={5}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							className={classes.rootInput}
						>
							<LabelInput htmlFor='displayName'>Display Name</LabelInput>
							<Input
								id='displayName'
								name='displayName'
								variant='outlined'
								value={profile.forumName || ''}
								onChange={handleChange}
							/>
						</Box>
						<Box
							mb={5}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							className={classes.rootInput}
						>
							<LabelInput htmlFor='first'>First Name</LabelInput>
							<Input
								id='first'
								name='forumFirstName'
								variant='outlined'
								value={profile.forumFirstName || ''}
								onChange={handleChange}
							/>
						</Box>

						<Box
							mb={5}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							className={classes.rootInput}
						>
							<LabelInput htmlFor='homeCity'>Home City</LabelInput>
							<Box
								display='flex'
								className={classes.homeCity}
								style={{ width: 440 }}
							>
								<Box style={{ width: '50%' }}>
									<InputLabel
										htmlFor='state-autocomplete'
										style={{ marginBottom: 4 }}
									>
										State
									</InputLabel>
									<Autocomplete
										value={profile?.forumState || ''}
										defaultValue={{
											name: 'State',
										}}
										getOptionLabel={(option) => `${option.name}`}
										options={usaStates}
										id='state-autocomplete'
										onChange={handleStateChange}
										style={{
											marginRight: '1em',
											marginBottom: '0.8em',
										}}
										renderInput={(params) => {
											const param = {
												...params,
												inputProps: {
													...params.inputProps,
													value: profile?.forumState || '',
													['aria-controls']: 'state-autocomplete-popup',
												},
											};

											return <TextField {...param} variant='outlined' />;
										}}
									/>
								</Box>
								<Box style={{ width: '50%' }}>
									<InputLabel
										htmlFor='city-autocomplete'
										style={{ marginBottom: 4 }}
									>
										City
									</InputLabel>

									<Autocomplete
										id='city-autocomplete'
										value={profile?.forumCity || ''}
										options={stateCities}
										getOptionLabel={(city) => (city ? `${city}` : '')}
										onChange={handleCityChange}
										disabled={stateCities.length === 0}
										renderInput={(params) => {
											const param = {
												...params,
												inputProps: {
													...params.inputProps,
													value: profile?.forumCity || '',
												},
											};

											return (
												<TextField
													{...param}
													// label='City'
													variant='outlined'
												/>
											);
										}}
									/>
								</Box>
							</Box>
						</Box>
						<Box
							mb={5}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							className={classes.rootInput}
						>
							<LabelInput htmlFor='timezone'>Time Zone</LabelInput>
							<Box
								justifyContent={'center'}
								style={{ width: '100%', marginBottom: 16 }}
							>
								<Autocomplete
									placeholder='Timezone'
									id='timezone-autocomplete'
									options={timezones}
									getOptionLabel={(timezone) => `${timezone.name}`}
									onChange={(e, timezone, reason) =>
										reason === 'selectOption'
											? setProfile({
													...profile,
													timezone,
													timezoneName: timezone?.propertyName,
											  })
											: setProfile({
													...profile,
													timezone: '',
													timezoneName: '',
											  })
									}
									value={profile?.timezone || ''}
									renderInput={(params) => {
										const param = {
											...params,
											inputProps: {
												...params.inputProps,
												value: profile.timezone?.name || '',
											},
										};

										return <TextField {...param} variant='outlined' required />;
									}}
								/>
								<CurrentTime timezone={profile?.timezone} />
							</Box>
						</Box>

						<Button
							variant='contained'
							color='primary'
							type='submit'
							sx={{ display: 'block', ml: 'auto' }}
						>
							Update Profile
						</Button>
					</Grid>
				</Grid>
			</form>

			<Divider sx={{ m: '2em 0' }} />

			<section id='change-password' style={{ marginTop: '2em' }}>
				<Typography
					color='textSecondary'
					variant='h5'
					component='h3'
					className={classes.title}
					style={{ marginBottom: '0.5em', fontWeight: 'bold' }}
				>
					Change Password
				</Typography>
				<Box
					mb={5}
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					className={classes.rootInput}
				>
					<Button variant='outlined' color='primary' onClick={handleOpen}>
						Change Password
					</Button>
				</Box>
			</section>

			<Divider sx={{ m: '2em 0' }} />
		</StyledRoot>
	);
}
