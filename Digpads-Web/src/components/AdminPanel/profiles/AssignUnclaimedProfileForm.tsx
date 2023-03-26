import React from 'react';

import Stack from '@mui/material/Stack';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';
import { MarketplaceProfile } from 'types';

type Props = {
	profile: MarketplaceProfile | null;
	onSubmit: (profile: MarketplaceProfile, email: string) => void;
};

export default function AssignUnclaimedProfileForm({
	profile,
	onSubmit,
}: Props) {
	const handleSubmit = () => {
		onSubmit(profile, email);
	};

	const [email, setEmail] = React.useState('');

	return (
		<Stack direction='row' spacing={2} alignItems='center'>
			<SuiTypography
				variant='body2'
				component='label'
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				Assign&nbsp;to
				<SuiInput
					sx={{ ml: '1em' }}
					value={email}
					type='email'
					name='email'
					onChange={(evt) => setEmail(evt.target.value)}
					placeholder='user email'
				/>
			</SuiTypography>

			<SuiButton
				disabled={profile === null}
				onClick={handleSubmit}
				type='submit'
				color='primary'
				variant='contained'
			>
				Submit
			</SuiButton>
		</Stack>
	);
}
