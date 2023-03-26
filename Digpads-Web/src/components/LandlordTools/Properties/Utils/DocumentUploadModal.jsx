import React, { useState, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import { Upload } from 'components/Document';

export default function DocumentUploadModal({ open, handleClose }) {
	const [files, setFiles] = useState([]);
	const [rejectedFiles, setRejectedFiles] = useState([]);

	useEffect(() => {
		console.log('files', files);
	}, [files]);

	return (
		<Modal
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: center,
				overflow: 'auto',
			}}
			open={open}
			onClose={handleClose}
		>
			<Box>
				<section className='container'>
					<Upload
						files={files}
						setFiles={setFiles}
						rejectedFiles={rejectedFiles}
						setRejectedFiles={setRejectedFiles}
					/>
				</section>
			</Box>
		</Modal>
	);
}
