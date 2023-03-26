import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function AreasServedList({ areasServed, onDelete }) {
	return (
		(
			<Stack direction='row' gap='1em' flexWrap='wrap'>
				{areasServed?.map((area, i) => (
					<AreaServed
						key={area.state + area.city}
						label={area?.city}
						onDelete={onDelete ? () => onDelete(i) : undefined}
					/>
				))}
			</Stack>
		) || null
	);
}

function AreaServed({ label, onDelete }) {
	return (
		<Chip
			label={label}
			onDelete={onDelete}
			sx={{
				borderRadius: '100px !important',
				borderLeft: '1px solid rgba(0, 0, 0, 0.12) !important',
				fontSize: '13px !important',
				padding: '7px',
				'& .MuiChip-label': {
					color: 'rgb(52, 71, 103)',
					fontWeight: '700',
				},
			}}
		/>
	);
}
