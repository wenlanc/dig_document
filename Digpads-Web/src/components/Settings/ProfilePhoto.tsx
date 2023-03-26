import React from 'react';
import { Avatar, Box, Button } from '@mui/material';

type Props = {
	currentPhoto?: string | null;
	onChange: (photo: File) => void;
};

export default function ProfilePhoto({ currentPhoto, onChange }: Props) {
	function onPhotoChange(files: FileList) {
		const photo = files[0];
		onChange(photo);
	}

	return (
		<div>
			<Avatar
				src={currentPhoto}
				sx={{
					width: '150px',
					height: '100px',
				}}
				variant='square'
			/>

			{/* Upload profile photo */}
			<Box style={{ marginTop: '1em' }}>
				<div>
					<Box
						component='input'
						accept='image/*'
						type='file'
						id='contained-button-file'
						name='file'
						onChange={(event) => onPhotoChange(event.target.files)}
						sx={{
							visibility: 'hidden',
							position: 'absolute',
							left: '-9999px',
						}}
					/>
					<label htmlFor='contained-button-file'>
						<Button variant='contained' color='primary' component='span'>
							Upload photo
						</Button>
					</label>
				</div>
			</Box>
		</div>
	);
}
