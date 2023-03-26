import React, { useState, useEffect } from 'react';
import RoomTable from './RoomTable';
import AddFixtureModal from './AddFixtureModal';
import FixtureSearchModal from './FixutreSearchModal';

const RoomCard = ({ room, property }) => {
	const [roomItems, setRoomItems] = useState([]);
	const [openAddModal, setOpenAddModal] = useState(false);
	const [newItem, setNewItem] = useState({});

	useEffect(() => {
		room.fixtures !== undefined && room.fixtures.length > 0
			? setRoomItems(room.fixtures)
			: setRoomItems([]);
	}, [room]);

	useEffect(() => {
		console.log('uf', roomItems);
	}, [roomItems]);

	return (
		<>
			<RoomTable
				handleSelectEdit={(r) => {
					setEditRoom({ ...r });
				}}
				rows={roomItems}
				onOpenAdd={() => setOpenAddModal(true)}
				roomName={room.name}
				roomId={room?._id}
			/>
			<AddFixtureModal
				title='Add'
				propData={newItem}
				setPropData={setNewItem}
				open={openAddModal}
				property={property}
				room={room}
				onClose={() => {
					setOpenAddModal(false);
				}}
				handleClose={() => {
					setOpenAddModal(false);
				}}
			/>
		</>
	);
};

export default RoomCard;
