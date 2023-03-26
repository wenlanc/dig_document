import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddRoomModal from '../Rooms/AddRoomModal';

function AddRoomButton({ onOpen, onClose }) {
	const [addRoomModal, setAddRoomModal] = useState(false);
	const propertiesData = useSelector((state) => state.PropertiesList);

	return (
		<React.Fragment>
			<Box
				display={'flex'}
				justifyContent={'flex-end'}
				alignItems={'center'}
			>
				<Typography
					onClick={() => {
						setAddRoomModal(true);
						onOpen();
					}}
					component={'small'}
					variant={'small'}
					sx={{
						textDecoration: 'underline',
						cursor: 'pointer',
					}}
				>
					Add a New Room
				</Typography>
			</Box>
			<AddRoomModal
				title={'Add'}
				handleClose={() => {
					setAddRoomModal(false);
					onClose();
				}}
				onClose={() => {
					setAddRoomModal(false);
					onClose();
				}}
				open={addRoomModal}
				properties={propertiesData?.data}
			/>
		</React.Fragment>
	);
}

export default AddRoomButton;
