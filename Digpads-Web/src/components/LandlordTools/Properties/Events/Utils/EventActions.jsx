import React, { useState } from 'react';
import EventTypeModal from '../EventTypeModal';

import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Typography,
} from '@mui/material';
import { LandlordButton, StyledButton } from '../../../../styled/Button';
import colors from 'assets/theme/base/colors';

function EventActions() {
	const [recordModal, setRecordModal] = useState(false);
	const [scheduleModal, setScheduleModal] = useState(false);
	return (
		<React.Fragment>
			<Box
				display='flex'
				flexDirection='row'
				justifyContent='flex-end'
				width={'100%'}
				columnGap={4}
			>
				<LandlordButton
					variant={'contained'}
					color={'success'}
					size={'medium'}
					onClick={() => {
						setRecordModal(true);
					}}
				>
					Record an Event
				</LandlordButton>
				<LandlordButton
					variant={'contained'}
					color={'warning'}
					size={'medium'}
					onClick={() => {
						setScheduleModal(true);
					}}
				>
					Schedule an Event
				</LandlordButton>
			</Box>

			<EventTypeModal
				open={recordModal}
				handleClose={() => setRecordModal(false)}
				nature='Record'
			/>
			<EventTypeModal
				open={scheduleModal}
				handleClose={() => setScheduleModal(false)}
				nature='Schedule'
			/>
		</React.Fragment>
	);
}

export default EventActions;
