import React, { useState } from 'react';
import { Button, TextField, Chip } from '@mui/material';
import { instance, getCloudinarySignature } from '../../controllers/axios';
import { upload } from '../../controllers/cloudinary';
import { generatePDF } from '../../controllers/pdf';

function VerifyAndUploadDocument({ files }) {
	const [inputValue, setInputValue] = useState('');
	const [emails, setEmails] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleUpload = async () => {
		setLoading(true);
		try {
			const docBlob = generatePDF(files);
			var Reader = new FileReader();
			let resp = await getCloudinarySignature();
			Reader.readAsDataURL(docBlob);
			Reader.onload = async () => {
				let cloudinaryRes = await upload(Reader.result, resp.data);
				instance.post('saveDocument', {
					title: cloudinaryRes.data.public_id,
					documentUrl: cloudinaryRes.data.url,
					recievers: emails,
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
			<form
				onSubmit={(e) => {
					e.preventDefault();
					emails.push(inputValue);
					setInputValue('');
				}}
			>
				<TextField
					variant='outlined'
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					type='email'
					value={inputValue}
					disabled={loading}
				/>

				<Button type='submit' disabled={loading}>
					Add
				</Button>
			</form>
			<div>
				{emails.map((email, i) => {
					return (
						<Chip
							variant='outlined'
							label={email}
							onDelete={() => {
								emails.splice(i, 1);
								setEmails([...emails]);
							}}
							key={i}
						/>
					);
				})}
			</div>
			<Button onClick={handleUpload}>upload and send emails</Button>
		</div>
	);
}

export default VerifyAndUploadDocument;
