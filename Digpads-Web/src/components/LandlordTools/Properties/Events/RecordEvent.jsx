import React, { useState } from 'react';
import EventTypeModal from './EventTypeModal';

function RecordEvent() {
	const [typeModal, setTypeModal] = useState(true);

	const handleEventModalClose = () => {
		setTypeModal(false);
	};
	return (
		<React.Fragment>
			<EventTypeModal
				open={typeModal}
				handleClose={handleEventModalClose}
				nature={'Record'}
			/>
		</React.Fragment>
	);
}

export default RecordEvent;
