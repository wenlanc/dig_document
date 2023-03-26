import React, { useState } from 'react';
import {
	StyledThumbContainer,
	StyledThumb,
	StyledThumbInner,
	StyledImage,
} from '../styled/DocumentUpload';

export default function Reorder(props) {
	const [dragId, setDragId] = useState();

	const handleDrag = (ev) => {
		setDragId(ev.currentTarget.id);
	};

	const handleDrop = (ev) => {
		const dragBox = props.files.find((box) => box.id === dragId);
		const dropBox = props.files.find(
			(box) => box.id === ev.currentTarget.id
		);

		const dragBoxOrder = dragBox.order;
		const dropBoxOrder = dropBox.order;

		const newBoxState = props.files.map((box) => {
			if (box.id === dragId) {
				box.order = dropBoxOrder;
			}
			if (box.id === ev.currentTarget.id) {
				box.order = dragBoxOrder;
			}
			return box;
		});
		console.log(newBoxState);
		props.setFiles(newBoxState);
	};

	// if (props.files.length > 0) {
	let thumbs = props.files
		.sort((a, b) => a.order - b.order)
		.map((image) => {
			return (
				<StyledThumb
					draggable={true}
					onDragOver={(ev) => ev.preventDefault()}
					onDragStart={handleDrag}
					onDrop={handleDrop}
					id={image.id}
					key={image.name}
				>
					<StyledThumbInner>
						<StyledImage
							className='sampleImage'
							src={image.preview}
							alt='chosen'
						/>
					</StyledThumbInner>
				</StyledThumb>
			);
		});

	return (
		<div>
			<h3>Reorder</h3>
			<StyledThumbContainer>{thumbs}</StyledThumbContainer>
		</div>
	);
}
