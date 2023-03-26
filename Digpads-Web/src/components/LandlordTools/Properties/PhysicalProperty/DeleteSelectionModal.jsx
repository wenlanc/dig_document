import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const RemoveSelectionModal = ({ open, handleClose }) => {
	const columnX = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'age',
			headerName: 'Age',
			type: 'number',
			width: 90,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			width: 160,
			valueGetter: (params) =>
				`${params.getValue(params.id, 'firstName') || ''} ${
					params.getValue(params.id, 'lastName') || ''
				}`,
		},
	];
	const [rows, setRows] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	const columns = [
		{
			field: 'propertyName',
			headerName: 'Property Name',
			width: 250,
		},
		{
			field: 'streetAddress',
			headerName: 'Street Address',
			width: 500,
		},
		{
			field: 'city',
			headerName: 'Property City',
			width: 250,
		},
	];

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style} style={{ width: '100%', height: 560 }}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Remove Physical Property
				</Typography>
				<Typography id='modal-modal-description' sx={{ mt: 2 }}>
					<div style={{ width: '100%', height: 370 }}>
						<DataGrid
							rows={rows}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							checkboxSelection
							onSelectionModelChange={(ids) => {}}
						/>
					</div>
				</Typography>
			</Box>
		</Modal>
	);
};

export default RemoveSelectionModal;
