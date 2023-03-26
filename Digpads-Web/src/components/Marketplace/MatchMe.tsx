import React from 'react';
import SuiButton from 'components/SuiButton';

type Props = {};

export default function MatchMe({}: Props) {
	return (
		<SuiButton
			onClick={() => {}}
			variant='contained'
			color='warning'
			size='large'
			sx={{
				backgroundColor: '#F38015',
				color: '#fff',
				fontWeight: '800',
			}}
		>
			Match Me
		</SuiButton>
	);
}
