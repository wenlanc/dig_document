import React from 'react';

import { StyledList } from 'components/styled/FormStyle';

import { PersonAdd, ArrowForward, Check, Clear } from '@mui/icons-material';

type Props = {
	validity: { minChar: boolean; number: boolean };
};

export default function PasswordValidator({ validity }: Props) {
	return (
		<>
			<p style={{ marginBottom: '0', textAlign: 'left', fontSize: '0.9rem' }}>
				Password must contain:
			</p>
			<div>
				<PasswordStrengthIndicator
					isValid={validity.minChar}
					text='Have at least 8 characters'
				/>
				<PasswordStrengthIndicator
					isValid={validity.number}
					text='Have at least 1 number'
				/>
			</div>
		</>
	);
}

const PasswordStrengthIndicator = ({ isValid, text }) => {
	return isValid ? (
		<StyledList green>
			<Check />
			{text}
		</StyledList>
	) : isValid !== null ? (
		<StyledList red>
			<Clear />
			{text}
		</StyledList>
	) : (
		<StyledList>
			<Clear />
			{text}
		</StyledList>
	);
};
