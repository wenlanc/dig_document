import React from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function Preferences() {
	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		navigate(newValue.split(' ').join('-').toLowerCase());
	};

	return (
		<Box>
			{/* <Tabs onChange={handleChange}>
					<Tab label='Reviews' value='Reviews Management' />
					<Tab label='My Profile' value='Profile/1' />
				</Tabs> */}
		</Box>
	);
}

export default Preferences;
