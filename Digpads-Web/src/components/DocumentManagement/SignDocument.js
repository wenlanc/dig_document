import React, { useState } from 'react';
import { TextField, Chip, Grid, Box, InputLabel, Input, IconButton, Button } from '@mui/material';

import { instance, getCloudinarySignature } from '../../controllers/axios';
import { upload } from '../../controllers/cloudinary';
import { default as DocumentSignPad } from './DocumentSignPad';

function SignDocument({ files }) {
	const [loading, setLoading] = useState(false);

	const handleUpload = async () => {
		setLoading(true);
		try {
			var Reader = new FileReader();
			let resp = await getCloudinarySignature();
			Reader.readAsDataURL(files[0]);
			Reader.onload = async () => {
				let cloudinaryRes = await upload(Reader.result, resp.data);
				instance.post('saveDocument', {
					title: cloudinaryRes.data.public_id,
					documentUrl: cloudinaryRes.data.url,
					recievers: [],
				});
			};
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{/* <Button onClick={handleUpload}>Upload</Button> */}
			<DocumentSignPad files={files} />
			
		</div>
	);
}

export default SignDocument;
