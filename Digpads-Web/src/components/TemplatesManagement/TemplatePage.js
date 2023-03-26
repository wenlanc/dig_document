import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import TemplateDraggableBox from './TemplateDraggableBox';

const imageStyles = {
	width: '200px',
	height: '200px',
	border: '1px solid',
	position: 'relative',
};

const containerDropStyles = {
	width: '100%',
    height: '100%',
	minHeight: "85vh",
    border: '1px solid',
    zIndex: 0,
    top: '0px',
    left: '0px',
};

export default function TemplatePage(props) {
	const [, drop] = useDrop({
		accept: ['field'],
		drop(item, monitor) {  
			switch (item.left) {
				/* eslint-disable */
				case undefined:
					const delta2 = monitor.getClientOffset();
					let contCoord = document
						.getElementById('template_pad')
						.getBoundingClientRect();
						
					props.dispatch({
						type: 'ADD_FIELD',
						left: delta2.x - contCoord.x,  //delta2.x - contCoord.x,
						top:  delta2.y - contCoord.y,  // delta2.y - contCoord.y,
						element_type: item.element_type,
						title: item.title,

						width: item.width,
						height: item.height
					});
					break;
				default:
					const delta = monitor.getDifferenceFromInitialOffset();
					let left = Math.round(item.left + delta.x);
					let top = Math.round(item.top + delta.y);
					props.dispatch({
						type: 'UPDATE_FIELD',
						left: left,
						top:  top,
						id: item.id,
						element_type: item.element_type,
						title: item.title
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
			style={containerDropStyles}
			id={"template_pad"}
			onClick={() => console.log(props)}
		>
			{props.fields
				.map((x, index) => { 
					return (
						<TemplateDraggableBox
							id={index}
							{...x}
							key={index}
							dispatch={props.dispatch}
						/>
					);
				})}
		</div>
	);
}
