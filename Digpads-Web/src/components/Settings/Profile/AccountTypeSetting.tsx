import React from 'react';
import {
	Typography,
	Checkbox,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';

import SuiTypography from 'components/SuiTypography';

type AccountType = 'individual' | 'company';

type Props = {
	currentAccountType: AccountType;
	onChange: (accountType: AccountType) => void;
};

export default function AccountTypeSetting({
	currentAccountType,
	onChange,
}: Props) {
	const handleChange = (evt) => {
		onChange(evt.target.value as AccountType);
	};

	if (!currentAccountType) {
		return null;
	}

	return (
		<>
			<SuiTypography paragraph sx={{ fontWeight: 'bold' }}>
				Type of Account:
			</SuiTypography>

			<RadioGroup
				row
				defaultValue={currentAccountType}
				onChange={handleChange}
				sx={{ '.MuiFormControlLabel-root': { marginLeft: 0 }, gap: '1em' }}
			>
				<FormControlLabel
					sx={{
						display: 'flex',
						gap: '0.5em',
					}}
					value='individual'
					control={<Radio color='primary' />}
					label={
						<Typography
							variant='body2'
							component='span'
							sx={{
								color: 'rgb(52, 71, 103)',
								fontWeight: '700',
								fontSize: '14px',
							}}
						>
							Individual<br></br>Account
						</Typography>
					}
				/>
				<FormControlLabel
					sx={{
						display: 'flex',
						gap: '0.5em',
					}}
					value='company'
					control={<Radio color='primary' />}
					label={
						<Typography
							variant='body2'
							component='span'
							sx={{
								color: 'rgb(52, 71, 103)',
								fontWeight: '700',
								fontSize: '14px',
							}}
						>
							Company<br></br>Account
						</Typography>
					}
				/>
			</RadioGroup>
		</>
	);
}
