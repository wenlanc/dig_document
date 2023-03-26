import React, { useState, useEffect } from 'react';
import {
	instance,
	getCSRF,
	getCloudinarySignature,
} from '../../controllers/axios';
import { Image } from 'cloudinary-react';
import { upload } from '../../controllers/cloudinary';

export default function Profile() {
	let [userProfile, setUserProfile] = useState(null);
	const { token } = useParams();

	const [previewSource, setPreviewSource] = useState('');

	const handelFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const handelSubmit = (e) => {
		e.preventDefault();
		if (!previewSource) return;
		uploadImage(previewSource);
	};

	const uploadImage = async (base64) => {
		let res = await instance.post(`updateProfile`, {
			base64: base64,
		});
		if (res.status === 200) {
			if (res.data.data) {
				window.location.reload();
			}
		}
	};

	useEffect(() => {
		getCSRF();
	}, []);

	useEffect(() => {
		async function getArticle() {
			try {
				let res2 = await getCloudinarySignature();
				upload(
					'https://support.cloudinary.com/system/photos/9145/5902/profile.jpg',
					res2.data
				);
				let res = await instance.get(`userProfile`);
				if (res.status === 200) {
					setUserProfile(res.data.data.data);
				}
			} catch (e) {
				if (!e.response) {
					console.log(e);
					return;
				}
				console.log(e.response.data);
				console.log(e.response);
			}
		}
		getArticle();
	}, [token]);

	return (
		<>
			{userProfile && (
				<Image
					cloudName='lovekesh9896'
					publicId={userProfile.profilePicUrl}
					width='200'
					crop='scale'
				/>
			)}
			<form onSubmit={handelSubmit}>
				<input type='file' name='image' onChange={handelFileInputChange} />
				<button type='submit'>Submit</button>
			</form>
			{previewSource && <img src={previewSource} alt='chosen' />}
		</>
	);
}
