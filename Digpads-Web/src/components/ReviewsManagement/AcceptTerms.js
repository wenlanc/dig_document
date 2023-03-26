import React from 'react';
import { AcceptTerms as StyledAcceptTerms } from '../styled/ReviewsManagement';
import CollectionRulesAndPolicies from './CollectionRulesAndPolicies';

import { Typography, FormControlLabel, Checkbox } from '@mui/material';

export default function AcceptTerms({
	collectingOutOfState,
	agreedToTerms,
	onChange,
}) {
	return (
		<StyledAcceptTerms className='accept-terms'>
			<FormControlLabel
				sx={{ ml: 0, display: 'flex' }}
				control={
					<Checkbox
						sx={{ mt: 0 }}
						checked={collectingOutOfState}
						onChange={(evt) => {
							onChange(
								'collectingOutOfState',
								evt.target.checked
							);
						}}
					/>
				}
				label={
					<Typography variant='caption' paragraph>
						I will be collecting reviews from Out-of-State
						customers. I understand that an algorithm will be
						applied to whether these reviews are legitimate or not
						and that any findings of fraudulent review pushing will
						result in suspension or termination of reviewcollection
						abilities and/or from the digpads platform.
					</Typography>
				}
			/>
			<FormControlLabel
				sx={{ ml: 0, display: 'flex' }}
				control={
					<Checkbox
						sx={{ mt: 0 }}
						checked={agreedToTerms}
						onChange={(evt) =>
							onChange('agreedToTerms', evt.target.checked)
						}
					/>
				}
				label={
					<Typography variant='caption' paragraph>
						{<CollectionRulesAndPolicies />}
					</Typography>
				}
			/>
		</StyledAcceptTerms>
	);
}
