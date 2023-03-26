import React from 'react';
import { useDropzone } from 'react-dropzone';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton } from '@mui/material';

export default function Upload(props) {
	const thumbsContainer = {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 16,
		alignItems: 'center',
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
		accept: props.accept_file, // accept="image/*,.pdf"
		maxFiles: 1,
		multiple: false,
		onDrop: (acceptedFiles, rejected) => {
			// handle rejected images
			let newRejectedFiles = rejected.map((file) => {
				return (
					<li key={file.file.lastModified}>
						{file.file.name}
						<ul>
							<li>File type must be PDF/DOCX</li>
						</ul>
					</li>
				);
			});
			props.setRejectedFiles([...props.rejectedFiles, ...newRejectedFiles]);

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

			//props.setFiles([...props.files, ...newFiles]);
			props.setFiles([...newFiles]);
		},
	});

	const removeImagefromFiles = (order) => {
		console.log(props.files, order);
		window.URL.revokeObjectURL(props.files[order].preview);
		let newFiles = props.files.filter((item) => item.order !== order);
		newFiles.map((file, index) => (file.order = index));
		props.setFiles([...newFiles]);
	};

	const thumbs = props.files.map((file, index) => (
		<div key={index}>
			{/* <div style={thumb} key={file.name}>
				<div style={thumbInner}>
					<img
						className='sampleImage'
						src={file.preview}
						onClick={() => removeImagefromFiles(file.order)}
						style={img}
						alt='chosen'
					/> 
				</div>
			</div> */}
			<PictureAsPdfIcon style={{ width: '24px' }} />

			{file.name}

			<IconButton
				color='primary'
				component='span'
				onClick={() => {
					removeImagefromFiles(file.order);
				}}
			>
				<RemoveCircleOutlineIcon />
			</IconButton>
		</div>
	));

	return (
		<div>
			<h5>{props.title ? props.title : 'Document Upload'}</h5>
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
