import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';

function EventSecondaryActions({ setOverDueOnly, setArchivedEventsModal }) {
	return (
		<Box
			display={'flex'}
			width={'100%'}
			justifyContent={'flex-end'}
			px={5}
			pt={3}
		>
			<Box display={'flex'} justifyContent={'space-between'}>
				<FormControlLabel
					sx={{ px: 5 }}
					control={
						<Checkbox
							onChange={(e, val) => {
								setOverDueOnly(val);
							}}
						/>
					}
					label={
						<Typography
							component={'small'}
							variant={'small'}
							sx={{
								cursor: 'pointer',
							}}
						>
							Only Show Overdue Items
						</Typography>
					}
				/>

				<Typography
					component={'small'}
					variant={'small'}
					sx={{
						textDecoration: 'underline',
						cursor: 'pointer',
					}}
					color={'primary'}
					onClick={() => {
						setArchivedEventsModal(true);
					}}
				>
					Show Archived Events
				</Typography>
			</Box>
		</Box>
	);
}

export default EventSecondaryActions;
