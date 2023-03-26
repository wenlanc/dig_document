import React from 'react';
import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	FormLabel,
	Typography,
} from '@mui/material';

import { UserType } from 'types';

type Props = {
	currentUserType: UserType;
	onChange: (userType: UserType) => void;
};

export default function UserTypeSetting({ currentUserType, onChange }: Props) {
	const handleChange = (evt) => {
		onChange(evt.target.value as UserType);
	};

	if (!currentUserType) {
		return null;
	}

	return (
		<FormControl component='fieldset'>
			<FormLabel sx={{ fontWeight: 'bold' }}>I am a:</FormLabel>

			<RadioGroup
				row
				value={currentUserType}
				onChange={handleChange}
				sx={{ '.MuiFormControlLabel-root': { marginLeft: 0 } }}
			>
				<FormControlLabel
					value='landlord'
					control={<Radio color='primary' />}
					label='Landlord'
				/>
				<FormControlLabel
					value='contractor'
					control={<Radio color='primary' />}
					label='Contractor'
				/>
				<FormControlLabel
					value='tenant'
					control={<Radio color='primary' />}
					label='Tenant'
				/>
				<FormControlLabel
					value='landlord/contractor'
					control={<Radio color='primary' />}
					label='Landlord & Contractor'
				/>
			</RadioGroup>
		</FormControl>
	);
}
