import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import SuiInput from 'components/SuiInput';
import SuiSelect from 'components/SuiSelect';
import styled from 'styled-components';

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';

import usaStates from 'constants/usaStates';
import usaCities from 'constants/usaCities';

import {
	SectionTitle,
	BorderedContainer,
	StyledButton,
} from 'components/styled/ReviewsManagement';

const StyledForm = styled.form`
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 1em;
	align-items: center;
	margin-bottom: 1.5em;
`;

export default function EditCampaign({ campaign, onChange, onCancel }) {
	const [name, setName] = useState(campaign.name);
	const [description, setDescription] = useState(campaign.description);
	const [city, setCity] = useState(campaign.city);
	const [state, setState] = useState(campaign.state);
	const [stateCities, setStateCities] = useState([]);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const modifiedCampaign = {
			...campaign,
			name,
			description,
			state,
			city,
		};

		onChange(modifiedCampaign);
	};

	const handleCancelButtonClick = () => {
		onCancel();
	};

	function handleStateChange(state) {
		// set cities for the selected state
		let stateCities = usaCities.filter((c) => c.state === state.value);
		stateCities = stateCities.map((c) => c.city);

		setState(state.value);
		setStateCities(stateCities);
	}

	function handleCityChange(city, reason) {
		setCity(city.value);
	}

	const handleDescriptionChange = (evt) => {
		setDescription(evt.target.value);
	};

	const handleNameChange = (evt) => {
		setName(evt.target.value);
	};

	return (
		<>
			<SectionTitle>
				Edit campaign: <span style={{ color: '#5b5fdd' }}>{campaign.name}</span>
			</SectionTitle>

			<SuiBox shadow='lg' sx={{ p: 2 }}>
				<StyledForm onSubmit={handleSubmit} id='edit-campaign-form'>
					<label>Name:</label>
					<SuiInput
						type='text'
						name='name'
						onChange={handleNameChange}
						value={name}
					/>

					<label>Description:</label>
					<SuiInput
						type='text'
						multiline
						rows={5}
						value={description}
						onChange={handleDescriptionChange}
					/>

					<label>State:</label>
					<SuiSelect
						placeholder='State'
						options={usaStates.map((state) => ({
							value: state.name,
							label: `${state.name}(${state.abbreviation})`,
						}))}
						onChange={handleStateChange}
						value={{ value: state, label: state }}
						style={{
							maxWidth: 400,
							width: '50%',
						}}
					/>

					<label>City:</label>
					<SuiSelect
						placeholder='City'
						options={stateCities.map((city) => ({
							value: city,
							label: city,
						}))}
						onChange={handleCityChange}
						value={{ value: city, label: city }}
						disabled={stateCities?.length === 0}
						style={{ maxWidth: '400px', width: '50%' }}
					/>
				</StyledForm>

				<Stack direction='row' spacing={2} justifyContent='flex-end'>
					<SuiButton
						color='warning'
						variant='contained'
						onClick={handleCancelButtonClick}
					>
						Cancel
					</SuiButton>

					<SuiButton
						color='primary'
						variant='contained'
						type='submit'
						form='edit-campaign-form'
					>
						Done
					</SuiButton>
				</Stack>
			</SuiBox>
		</>
	);
}
