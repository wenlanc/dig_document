import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import SuiInput from 'components/SuiInput';
import SuiSelect from 'components/SuiSelect';
import SuiButton from 'components/SuiButton';
import { Stack } from '@mui/material';

interface Props {
	onSubmit: (formData) => void;
}

export default function CreateProfileForm({ onSubmit }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [profileType, setProfileType] = useState({ value: '', label: '' });
	const [marketplaceType, setMarketplaceType] = useState({
		value: '',
		label: '',
	});

	// react-hook-form doesn't work with SuiSelect. We are adding data manually
	function _handleSubmit(data) {
		const _data = {
			...data,
			profileType: profileType.value,
			marketplaceType: marketplaceType.value,
		};
		onSubmit(_data);
	}

	return (
		<form onSubmit={handleSubmit(_handleSubmit)}>
			<Stack rowGap={2} sx={{ maxWidth: '350px' }}>
				<div>
					<SuiInput
						placeholder='profile name'
						name='name'
						inputRef={register({
							required: 'profile name is required',
						})}
						error={errors.name ? true : false}
						variant='outlined'
						size='small'
						type='text'
					/>
					{errors.name ? (
						<small style={{ color: 'red' }}>{errors.name.message}</small>
					) : (
						''
					)}
				</div>

				<div>
					<SuiInput
						placeholder='first name'
						name='firstName'
						inputRef={register({
							required: 'You must specify a first name',
						})}
						error={errors.firstName ? true : false}
						variant='outlined'
						size='small'
						type='text'
					/>
					{errors.firstName ? (
						<small style={{ color: 'red' }}>{errors.firstName.message}</small>
					) : (
						''
					)}
				</div>

				<div>
					<SuiInput
						placeholder='last name'
						name='lastName'
						inputRef={register({
							required: 'You must specify a last name',
						})}
						error={errors.lastName ? true : false}
						variant='outlined'
						size='small'
						type='text'
					/>
					{errors.lastName ? (
						<small style={{ color: 'red' }}>{errors.lastName.message}</small>
					) : (
						''
					)}
				</div>

				<div>
					<SuiSelect
						value={profileType}
						onChange={(option) => setProfileType(option)}
						placeholder='Profile Type'
						options={[
							{ value: 'individual', label: 'individual' },
							{ value: 'company', label: 'company' },
						]}
						name='profileType'
						size='small'
					/>
				</div>

				<div>
					<SuiSelect
						value={marketplaceType}
						onChange={(option) => setMarketplaceType(option)}
						placeholder='Marketplace Type'
						options={[
							{ value: 'landlord', label: 'landlord' },
							{ value: 'contractor', label: 'contractor' },
							{ value: 'landlord/contractor', label: 'landlord/contractor' },
							{ value: 'tenant', label: 'tenant' },
						]}
						name='marketplaceType'
						size='small'
					/>
				</div>

				<SuiButton type='submit' variant='outlined' color='success'>
					Submit
				</SuiButton>
			</Stack>
		</form>
	);
}
