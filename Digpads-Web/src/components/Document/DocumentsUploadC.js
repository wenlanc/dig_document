import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Upload(props) {
	const thumbsContainer = {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 16,
	};

	const thumb = {
		display: 'inline-flex',
		borderRadius: 2,
		border: '1px solid #eaeaea',
		marginBottom: 8,
		marginRight: 8,
		width: 100,
		height: 100,
		padding: 4,
		boxSizing: 'border-box',
	};

	const thumbInner = {
		display: 'flex',
		minWidth: 0,
		overflow: 'hidden',
	};

	const img = {
		height: '100%',
		width: 'auto',
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles, rejected) => {
			// handle rejected images
			let newRejectedFiles = rejected.map((file) => {
				return (
					<li key={file.file.lastModified}>
						{file.file.name}
						<ul>
							<li>File type must be image</li>
						</ul>
					</li>
				);
			});
			props.setRejectedFiles([
				...props.rejectedFiles,
				...newRejectedFiles,
			]);

			// handle accepted images
			let newFiles = acceptedFiles.map((file, index) => {
				let newFile = Object.assign(file, {
					preview: URL.createObjectURL(file),
					order: index,
					id: file.name,
				});
				newFile.key = file.name;
				return newFile;
			});
			props.setFiles([...props.files, ...newFiles]);
		},
	});

	const removeImagefromFiles = (order) => {
		console.log(props.files, order);
		window.URL.revokeObjectURL(props.files[order].preview);
		let newFiles = props.files.filter((item) => item.order !== order);
		newFiles.map((file, index) => (file.order = index));
		props.setFiles([...newFiles]);
	};

	const thumbs = props.files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					className='sampleImage'
					src={file.preview}
					onClick={() => removeImagefromFiles(file.order)}
					style={img}
					alt='chosen'
				/>
			</div>
		</div>
	));

	return (
		<div>
			<h3>Image upload</h3>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside style={thumbsContainer}>{thumbs}</aside>
			{props.rejectedFiles.length > 0 && (
				<>
					<p>Following files are rejected</p>
					<ul>{props.rejectedFiles}</ul>
				</>
			)}
		</div>
	);
}
