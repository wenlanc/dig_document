import React from 'react';

import { TextareaAutosize, Stack } from '@mui/material';
import SuiInput from 'components/SuiInput';
import SuiSelect from 'components/SuiSelect';

import { StyledCreateCampaignForm } from 'components/styled/ReviewsManagement';

export default function CreateCampaignForm({
	campaign,
	onChange,
	stateCities = [],
	handleStateChange,
	handleCityChange,
	city,
	usaStates = [],
}) {
	return (
		<StyledCreateCampaignForm>
			<form>
				<Stack spacing={1}>
					<SuiInput
						value={campaign?.name}
						name='name'
						onChange={(evt) => onChange('name', evt.target.value)}
						placeholder='Name Review Collection Campaign'
						variant='outlined'
						type='text'
						size='small'
						fullWidth
					/>
					<SuiInput
						value={campaign?.description}
						name='description'
						onChange={(evt) => onChange('description', evt.target.value)}
						aria-label='description or instructions'
						multiline
						rows={7}
						placeholder='Add whatever description or instructions you want to go before the review collection area of the link.'
						style={{ width: '100%' }}
					/>

					<Stack direction='row' spacing={1}>
						<SuiSelect
							placeholder='State'
							options={usaStates.map((state) => ({
								value: state.name,
								label: `${state.name}(${state.abbreviation})`,
							}))}
							id='state-autocomplete'
							onChange={handleStateChange}
							style={{
								maxWidth: 400,
								width: '50%',
							}}
						/>

						<SuiSelect
							placeholder='City'
							options={stateCities.map((city) => ({
								value: city,
								label: city,
							}))}
							onChange={handleCityChange}
							disabled={stateCities?.length === 0}
							style={{ maxWidth: '400px', width: '50%' }}
						/>
					</Stack>
				</Stack>
			</form>
		</StyledCreateCampaignForm>
	);
}
