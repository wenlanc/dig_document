import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import DraggableBox from './DragableSignature';

const imageStyles = {
	width: '200px',
	height: '200px',
	border: '1px solid',
	position: 'relative',
};

export default function DocumentPage(props) {
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
					props.dispatch({
						type: 'ADD_FIELD',
						...item,
						page: props.id,
						left: delta2.x - contCoord.x,
						top: delta2.y - contCoord.y,
					});
					break;
				default:
					const delta = monitor.getDifferenceFromInitialOffset();
					let left = Math.round(item.left + delta.x);
					let top = Math.round(item.top + delta.y);
					props.dispatch({
						type: 'UPDATE_FIELD',
						page: props.id,
						left: left,
						top: top,
						id: item.id,
					});
					return undefined;
			}
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	});
	useEffect(() => {}, [props]);

	return (
		<div
			ref={drop}
			style={imageStyles}
			id={props.id}
			onClick={() => console.log(props)}
		>
			{props.fields
				.filter((x) => x.page === props.id)
				.map((x, index) => {
					return (
						<DraggableBox
							title='Tester2'
							id={index}
							{...x}
							key={index}
						/>
					);
				})}
		</div>
	);
}
