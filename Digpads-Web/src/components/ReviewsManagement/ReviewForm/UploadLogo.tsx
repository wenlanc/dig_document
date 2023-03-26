import React from 'react';
import { Box } from '@mui/material';

import { LandlordButton } from 'components/styled/Button';
import { getCloudinarySignature } from 'controllers/axios';
import { upload } from 'controllers/cloudinary';
import { toBase64 } from 'utils/fileUtils';

export default function UploadLogo({ onUpload }) {
	function onSelectLogoHandler(files) {
		const logo = files[0];

		try {
			getCloudinarySignature().then((res) => {
				toBase64(logo)
					.then((base64) => upload(base64, res.data))
					.then((result) => {
						onUpload(result.data.secure_url);
					});
			});
		} catch (error) {
			console.log('Error uploading logo', error);
		}
	}

	return (
		<div>
			<LandlordButton
				component='label'
				variant={'contained'}
				color={'success'}
				size={'medium'}
				sx={{ width: '100%' }}
			>
				Upload Logo Image
				<Box
					component='input'
					type='file'
					onChange={(evt) => onSelectLogoHandler(evt.target.files)}
					sx={{
						visibility: 'hidden',
						position: 'absolute',
						left: '-9999px',
					}}
				/>
			</LandlordButton>
		</div>
	);
}
