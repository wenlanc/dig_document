import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Images from './Images';
import DraggableBox from './DragableSignature';

// function signatureReducer(state, action) {
// 	switch (action) {
// 		default:
// 			break;
// 	}
// }

export default function DocumentAddSignature(props) {
	return (
		<DndProvider backend={HTML5Backend}>
			<div style={mainDivSignature}>
				<div style={left} id='leftsidebar'>
					<DraggableBox type='field' title='Tester' />
				</div>
				<div id='images' style={right}>
					<Images files={props.files} />
				</div>
			</div>
		</DndProvider>
	);
}

const mainDivSignature = {
	display: 'flex',
	width: '80vw',
	border: '1px solid',
	boxSizing: 'border-box',
};

const left = {
	width: '40vw',
	boxSizing: 'border-box',
	border: '1px solid',
	height: 'max-content',
	position: 'sticky',
	top: '30px',
};
const right = {
	width: '40vw',
	boxSizing: 'border-box',
	border: '1px solid',
	height: '500px',
};
