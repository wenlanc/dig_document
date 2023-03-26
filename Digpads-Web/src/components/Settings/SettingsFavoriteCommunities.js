import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import {
	Typography,
	Grid,
	Box,
	TextField,
	InputLabel,
	Button,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import usaStates from '../../constants/usaStates';
import usaCities from '../../constants/usaCities';

const PREFIX = 'SettingsFavoriteCommunities';

const classes = {
	title: `${PREFIX}-title`,
	rootInput: `${PREFIX}-rootInput`,
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
				marginBottom: theme.spacing(2),
			},
		},
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

const Close = styled(CloseIcon)`
	color: red;
	cursor: pointer;
`;

export default function SettingFavoriteCommunities({
	favoritedCommunities,
	handleChange,
	onSubmit,
	handleDelete,
	handleAddNewCommunity,
	sectionRefs,
	setFavoritedCommunities,
}) {
	const [stateCities, setStateCities] = useState([]);

	function handleCityChange(e, city, reason, index) {
		if (reason === 'selectOption') {
			favoritedCommunities[index].city = city;
			setFavoritedCommunities([...favoritedCommunities]);
			// props.onChange(state, city);
			return;
		}

		if (reason === 'clear') {
			favoritedCommunities[index].city = city;
			setFavoritedCommunities([...favoritedCommunities]);

			// props.onChange(state, city);
		}
	}

	function handleStateChange(e, value, reason, index) {
		if (reason === 'clear') {
			favoritedCommunities[index] = {
				...favoritedCommunities[index],
				state: '',
				city: '',
			};
			setFavoritedCommunities([...favoritedCommunities]);
			setStateCities([]);
			// props.onChange(null, null, 'clear');
			return;
		}

		const stateName = value.name;

		if (reason === 'selectOption') {
			favoritedCommunities[index] = {
				...favoritedCommunities[index],
				state: '',
			};
			// props.onChange(stateName);
			setFavoritedCommunities([...favoritedCommunities]);
		}

		// set cities for the selected state
		let stateCities = usaCities.filter((c) => c.state === stateName);
		stateCities = stateCities.map((c) => c.city);
		// add empty option to remove warning
		stateCities.unshift('');
		favoritedCommunities[index].state = stateName;
		setFavoritedCommunities([...favoritedCommunities]);
		setStateCities(stateCities);
	}

	const lastCommunity = () => {
		return favoritedCommunities.length === 1;
	};

	return (
		<StyledRoot id='favorited-communites' ref={sectionRefs}>
			<form onSubmit={onSubmit}>
				<Typography
					color='textSecondary'
					variant='h5'
					component='h3'
					className={classes.title}
					style={{ marginBottom: '1em', fontWeight: 'bold' }}
				>
					Favorited Communities
				</Typography>

				<Typography
					variant='body1'
					component='p'
					style={{ marginBottom: '1.25em' }}
				>
					You can choose up to three favorite Communities at a time in your
					landlord forum feed. Deselect Communities below three with the red X
					to add new ones.
				</Typography>
				<Grid container>
					<Grid item xs={12} sx={{ maxWidth: '767px !important' }}>
						{favoritedCommunities.length > 0 &&
							favoritedCommunities.map(
								(favoritedCommunity, index) =>
									favoritedCommunity !== null && (
										<Box
											key={index}
											mb={5}
											display='flex'
											justifyContent='space-between'
											alignItems='center'
											className={classes.rootInput}
										>
											<LabelInput htmlFor={`favoriteCommunity${index + 1}`}>
												Favorite Community {index + 1}
											</LabelInput>
											<Box
												display='flex'
												className={classes.homeCity}
												style={{ width: 440 }}
											>
												<Box style={{ width: '50%' }}>
													<InputLabel
														htmlFor={`favoriteCommunityState${index + 1}`}
														sx={{ mb: 0 }}
														style={{
															marginBottom: 4,
														}}
													>
														State
													</InputLabel>
													<Autocomplete
														value={favoritedCommunities[index].state}
														defaultValue={{
															name: 'State',
														}}
														getOptionLabel={(option) =>
															option.name ? option.name : ''
														}
														options={usaStates}
														id={`favoriteCommunityState${index + 1}`}
														onChange={(e, state, reason) => {
															handleStateChange(e, state, reason, index);
														}}
														style={{
															marginRight: '1em',
															marginBottom: '0.8em',
														}}
														renderInput={(params) => {
															const param = {
																...params,
																inputProps: {
																	...params.inputProps,
																	value: favoritedCommunities[index].state,
																	['aria-controls']: 'state-autocomplete-popup',
																},
															};

															return (
																<TextField {...param} variant='outlined' />
															);
														}}
													/>
												</Box>
												<Box style={{ width: '50%' }}>
													<InputLabel
														htmlFor={`favoriteCommunityCity${index + 1}`}
														style={{
															marginBottom: 4,
														}}
														sx={{ mb: 0 }}
													>
														City
													</InputLabel>
													<Autocomplete
														id={`favoriteCommunityCity${index + 1}`}
														options={stateCities}
														getOptionLabel={(city) => `${city}`}
														onChange={(e, city, reason) => {
															handleCityChange(e, city, reason, index);
														}}
														disabled={stateCities.length === 0}
														renderInput={(params) => {
															const param = {
																...params,
																inputProps: {
																	...params.inputProps,
																	value: favoritedCommunities[index].city,
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

											{!lastCommunity() && ( // user should have at least one non-removable community
												<Close
													style={{ position: 'relative', top: '5px' }}
													onClick={() => {
														handleDelete(index);
													}}
												/>
											)}

											<Button
												sx={{ ml: '1em', position: 'relative', top: '5px' }}
												size='small'
												variant='contained'
												color='primary'
												type='submit'
											>
												Submit
											</Button>
										</Box>
									)
							)}
					</Grid>
				</Grid>

				<Button
					variant='contained'
					color='primary'
					type='submit'
					onClick={handleAddNewCommunity}
				>
					Add New Community
				</Button>
			</form>
		</StyledRoot>
	);
}
