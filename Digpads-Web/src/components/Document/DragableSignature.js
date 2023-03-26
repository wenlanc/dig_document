import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const Box = styled.div`
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	position: absolute;
`;

function getStyles(left, top, isDragging) {
	const transform = `translate3d(${left}px, ${top}px, 0)`;
	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		// IE fallback: hide the real node using CSS when dragging
		// because IE will ignore our custom "empty image" drag preview.
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	};
}

export default function DraggableBox(props) {
	const { id, title, left, top } = props;
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'field', id, left, top, title },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	return (
		<div ref={drag} style={getStyles(left, top, isDragging)}>
			<Box top={top} left={left}>
				{props.title} {left}, {top}
			</Box>
		</div>
	);
}
