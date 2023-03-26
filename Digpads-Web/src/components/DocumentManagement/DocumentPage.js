import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import DraggableBox from './DragableSignature';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignatures, updateField, addField } from './signatureSlice';

const imageStyles = {
	width: '200px',
	height: '200px',
	border: '1px solid',
	position: 'relative',
};

const containerDropStyles = {
	width: '100%',
	height: '100%',
	border: '1px solid',
	position: 'absolute',
	zIndex: 0,
	top: '0px',
	left: '0px',
	//padding : '1px'
	//margin : '1px'
};

export default function DocumentPage(props) {
	const dispatch = useDispatch();
	const signature = useSelector(selectSignatures);
	const [, drop] = useDrop({
		accept: ['field'],
		drop(item, monitor) {
			switch (item.left) {
				/* eslint-disable */
				case undefined:
					const delta2 = monitor.getClientOffset();
					let contCoord = document
						.getElementById(props.id)
						.getBoundingClientRect();
					dispatch(
						addField({
							page: props.id,
							left: delta2.x - contCoord.x, //delta2.x - contCoord.x,
							top: delta2.y - contCoord.y, // delta2.y - contCoord.y,
							element_type: item.element_type,
							title: item.title,
							property: item.property ? item.property : {},
							width: item.width,
							height: item.height,
							signerName: item.signerName,
						})
					);
					break;
				default:
					const delta = monitor.getDifferenceFromInitialOffset();
					let left = Math.round(item.left + delta.x);
					let top = Math.round(item.top + delta.y);
					dispatch(
						updateField({
							page: props.id,
							left: left,
							top: top,
							id: item.id,
							element_type: item.element_type,
							title: item.title,
						})
					);
					return undefined;
			}
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});

	//useEffect(() => {}, [props]);

	return (
		<div
			ref={drop}
			style={containerDropStyles}
			id={props.id}
			onClick={() => {
				/* console.log(props) */
			}}
		>
			{signature
				.filter((x) => x && x.page === props.id)
				.map((x, index) => {
					return <DraggableBox id={index} {...x} key={index} />;
				})}
		</div>
	);
}
