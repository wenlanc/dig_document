import React, { useState } from 'react';
import { Hidden, Box, Drawer } from '@mui/material';
import Header from 'components/Nav/Header';
import Sidebar from 'components/LandlordTools/Sidebar';
import Content from 'components/LandlordTools/Content';
import {
	landlordToolsSidebar,
	status,
	visitors,
	todoLists,
	nontifications,
	ourListing,
} from '../constants/LandLordToolsSidebar';
import MiniDrawer from 'components/LandlordTools/MiniDrawer';

function LandLordTools() {
	console.log('render landlord tools');
	const [openSidebar, setOpenSidebar] = useState(false);
	const toggleDrawer = () => {
		console.log('toogle sidebar');
		setOpenSidebar(!openSidebar);
	};

	return (
		<>
			<Header
				handleDrawer={() => toggleDrawer()}
				sidebarStatus={openSidebar}
				setSidebarStatus={setOpenSidebar}
			/>
			{/* <Drawer
				variant='persistent'
				open={openSidebar}
				onClose={toggleDrawer}
			>
				<Sidebar
					landlordToolsSidebar={landlordToolsSidebar}
					status={status}
					visitors={visitors}
					todoLists={todoLists}
					toggleDrawer={toggleDrawer}
				/>
			</Drawer> */}
			{/* <Hidden mdDown>
					<Sidebar
						landlordToolsSidebar={landlordToolsSidebar}
						status={status}
						visitors={visitors}
						todoLists={todoLists}
					/>
				</Hidden> */}
			{/* <Drawer
					variant='persistent'
					open={openSidebar}
					onClose={toggleDrawer}
				>
					<Sidebar
						landlordToolsSidebar={landlordToolsSidebar}
						status={status}
						visitors={visitors}
						todoLists={todoLists}
						toggleDrawer={toggleDrawer}
					/>
				</Drawer> */}
			<Box sx={{ display: 'flex' }}>
				{/* <MiniDrawer open={openSidebar} setOpen={setOpenSidebar} /> */}
				<Content
					nontifications={nontifications}
					ourListing={ourListing}
				/>
			</Box>
		</>
	);
}
export default LandLordTools;
