import {
	Button,
	IconButton,
	Tooltip,
	Snackbar,
	Modal,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { instance, getCSRF } from '../controllers/axios';
import MuiAlert from '@mui/material/Alert';
import MyModal from './Modal';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import usaStates from '../constants/usaStates';
import EditFavoriteCommunity from './EditFavoriteCommunity';
import styled from 'styled-components';

const StyledButton = styled(Button)`
	border-radius: 20px;
	padding-left: 15px;
	padding-right: 15px;
	font-weight: 600;
	&& {
		font-size: 0.82rem;
	}
`;

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function FavCommunityButtons(props) {
	const [flag, setFlag] = useState([false, false, false]);
	const [openModal, setOpen] = useState(false);
	const [favoritedCommunities, setFavoritedCommunities] = useState([]);
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');

	const handleClose = () => {
		setAlert(false);
	};

	function modalControl() {
		setOpen(!openModal);
	}

	const handleChangeFavoritedCommunities = (event, index) => {
		favoritedCommunities[index] = event.target.value;
		setFavoritedCommunities([...favoritedCommunities]);
	};

	const handleColorChange = (index) => {
		let x = flag;
		x[index] = !x[index];
		setFlag(x);
	};

	const getAbbrev = (state) => {
		if (state) {
			const x = usaStates.find((element) => element.name === state);
			return x.abbreviation;
		} else {
			return '';
		}
	};

	const onSubmitFavoritedCommunities = async (event) => {
		event.preventDefault();
		props.setPosts();
		setFlag([false, false, false]);

		const IDs = new Set(
			favoritedCommunities.map((item) =>
				item.city ? item.state && item.city : item.state
			)
		);

		if ([...IDs].length === favoritedCommunities.length) {
			await getCSRF();

			instance
				.post('updateProfile', { favoritedCommunities })
				.then((response) => {
					setAlert(true);
					setMessage('Update Favorited Communities Successfull');
					setType('success');
					return response;
				})
				.catch((err) => {
					return err;
				});
		} else {
			setAlert(true);
			setMessage(
				'You have one or more pairs of favorite communities with the same combination. Please change and try again!'
			);
			setType('warning');
		}
	};

	const handleDeleteFavoritedCommunities = (index) => {
		favoritedCommunities.splice(index, 1);

		setFavoritedCommunities([...favoritedCommunities]);
	};

	const handleAddNewCommunity = (e) => {
		e.preventDefault();

		if (
			favoritedCommunities.filter((favoritedCommunity) => {
				return favoritedCommunity !== null;
			}).length === 3
		) {
			setAlert(true);
			setMessage(
				'Limit 3 Favorite Communities. Please remove one to add another.'
			);
			setType('warning');
			return;
		}
		setFavoritedCommunities([...favoritedCommunities, {}]);
	};

	useEffect(() => {
		if (!props.favChosen) {
			setFlag([false, false, false]);
		}
		instance.get('favoriteCommunities').then((response) => {
			if (response.status === 200) {
				const favCommunities = response.data;

				if (favCommunities.length > 0) {
					setFavoritedCommunities(favCommunities);
				}
			} else {
				console.log(response.statusText);
			}
		});
	}, [props.favChosen]);

	return (
		<div style={{ marginBottom: '15px' }}>
			<StyledButton
				variant='contained'
				color={props.favChosen ? 'info' : 'success'}
				onClick={() => {
					props.setPosts();
					setFlag([false, false, false]);
				}}
			>
				Show All
			</StyledButton>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginBottom: '0.8em',
					fontWeight: '600',
					marginTop: '1.25em',
				}}
			>
				<Typography gutterBottom>Favorite communities:</Typography>

				<Tooltip title={'EDIT'} placement='top' arrow>
					<IconButton
						onClick={modalControl}
						color='primary'
						variant=''
					>
						<EditIcon />
					</IconButton>
				</Tooltip>
			</div>

			{favoritedCommunities.map((community, i) => (
				<Tooltip
					title={
						community.city
							? community.city + ', ' + community.state
							: community.state
					}
					key={i}
				>
					<StyledButton
						variant='contained'
						style={{ marginRight: '5px', fontSize: '0.8rem' }}
						color={flag[i] ? 'success' : 'info'}
						onClick={() => {
							handleColorChange(i);
							props.handleFilterChange(
								community.state,
								community.city,
								i,
								'favoriteCommunity'
							);
						}}
					>
						{community.city
							? community.city + ', ' + getAbbrev(community.state)
							: getAbbrev(community.state)}
					</StyledButton>
				</Tooltip>
			))}

			{favoritedCommunities.length < 3 && (
				<IconButton onClick={modalControl} size='large'>
					<AddIcon />
				</IconButton>
			)}

			{favoritedCommunities.length < 2 && (
				<IconButton onClick={modalControl} size='large'>
					<AddIcon />
				</IconButton>
			)}

			{favoritedCommunities.length < 1 && (
				<IconButton onClick={modalControl} size='large'>
					<AddIcon />
				</IconButton>
			)}

			<MyModal display={openModal} modalControl={modalControl}>
				<div>
					<EditFavoriteCommunity
						favoritedCommunities={favoritedCommunities}
						handleChange={handleChangeFavoritedCommunities}
						onSubmit={onSubmitFavoritedCommunities}
						handleDelete={handleDeleteFavoritedCommunities}
						handleAddNewCommunity={handleAddNewCommunity}
						setFavoritedCommunities={setFavoritedCommunities}
						calledFromFeed={true}
					/>
				</div>
			</MyModal>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={alert}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={type}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
}
