import React, { useEffect, useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';

export default function CropDocument(props) {
	const mainDiv = {
		display: 'flex',
		width: '90vw',
		height: '100vh',
		justifyContent: 'space-between',
		padding: '10vw 10vh',
		boxSizing: 'border-box',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		margin: 'auto',
	};

	const img = {
		maxWidth: '500px',
	};

	const controls = {
		display: 'flex',
		justifyContent: 'space-between',
		margin: 'auto',
		alignItems: 'center',
	};

	const [image, setImage] = useState();
	const [imageIndex, setImageIndex] = useState(0);
	const [currAspect, setCurrAspect] = useState(true);
	const currImage = useRef(null);
	const [crop, setCrop] = useState({
		aspect: 1 / 1,
	});
	const [cropMode, setCropMode] = useState();
	const [imageToCrop, setImageToCrop] = useState();
	const [croppedImageUrl, setCroppedImageUrl] = useState();

	useEffect(() => {
		if (props.files.length > 0) {
			setImage(
				<img
					style={img}
					ref={currImage}
					src={props.files[imageIndex].preview}
					alt='selected'
				/>
			);
		}
		/* eslint-disable */
	}, [imageIndex, props.files]);

	function nextImage() {
		let newImageIndex = (imageIndex + 1) % props.files.length;
		setImageIndex(newImageIndex);
		setImage(
			<img
				style={img}
				ref={currImage}
				src={props.files[imageIndex].preview}
				alt='selected'
			/>
		);
		checkAspectRatio();
	}

	function prevImage() {
		let newImageIndex =
			(imageIndex - 1 + props.files.length) % props.files.length;
		setImageIndex(newImageIndex);
		setImage(
			<img
				style={img}
				ref={currImage}
				src={props.files[imageIndex].preview}
				alt='selected'
			/>
		);
		checkAspectRatio();
	}

	function checkAspectRatio() {
		let ratio = currImage.current.width / currImage.current.height;
		if (ratio > 1.4 && ratio < 1.5) {
			setCurrAspect(true);
		} else {
			setCurrAspect(false);
		}
	}

	const handleImageLoaded = (image) => {
		setImageToCrop(image);
	};

	const handleOnCropChange = (newCrop) => {
		setCrop(newCrop);
	};

	const handleOncropcomplete = async (crop, pixelCrop) => {
		if (imageToCrop) {
			const result = await getCroppedImg(imageToCrop, crop, 'test1');
			setCroppedImageUrl(result.fileUrl);
		}
	};

	const getCroppedImg = (image, crop, fileName) => {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (!blob) {
					//reject(new Error('Canvas is empty'));
					console.error('Canvas is empty');
					return;
				}
				blob.name = fileName;
				// window.URL.revokeObjectURL(this.fileUrl);
				blob.fileUrl = window.URL.createObjectURL(blob);
				resolve(blob);
			}, 'image/jpeg');
		});
	};

	function toogleCropMode() {
		setCropMode(!cropMode);
	}

	function cropCurrentImage() {
		let newFiles = props.files;
		window.URL.revokeObjectURL(props.files[imageIndex].preview); // revoke prev url
		newFiles[imageIndex].preview = croppedImageUrl; // set new url
		props.setFiles([...newFiles]);
		toogleCropMode();
	}

	return (
		<>
			<h3>edit images</h3>
			<div style={mainDiv}>
				<div style={controls}>
					<button onClick={prevImage}>prev</button>
					{!cropMode ? (
						<div>{image}</div>
					) : (
						<div>
							<ReactCrop
								src={props.files[imageIndex].preview}
								ref={currImage}
								crop={crop}
								onImageLoaded={handleImageLoaded}
								onComplete={handleOncropcomplete}
								onChange={handleOnCropChange}
							/>
							<button onClick={cropCurrentImage}>Done</button>
						</div>
					)}
					<button onClick={nextImage}>next</button>
				</div>
				{currAspect ? (
					<p>Aspect ratio is correct</p>
				) : (
					<p>Current aspect ratio is not correct</p>
				)}
			</div>
			<button onClick={toogleCropMode}>Crop</button>
		</>
	);
}
