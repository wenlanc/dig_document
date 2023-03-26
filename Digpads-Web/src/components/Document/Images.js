import React, { useReducer } from 'react';
import DocumentPage from './DocumentPage';
// const imageStyles = {
// 	width: '200px',
// 	height: '200px',
// 	border: '1px solid',
// 	position: 'relative',
// };
// const files = ['ds', 'dsd'];
function Images(props) {
	const [signature, dispatch] = useReducer(signatureReducer, []);
	const files = props.files;
	// const files = ['ds', 'dsd'];

	if (files) {
		return files.map((file, index) => {
			return (
				<div key={index} style={{ backgroundImage: file }}>
					<DocumentPage
						id={index}
						fields={signature}
						dispatch={dispatch}
					/>
				</div>
			);
		});
	} else {
		return <div>no files</div>;
	}
}

export default Images;

function signatureReducer(state, action) {
	switch (action.type) {
		case 'ADD_FIELD': {
			delete action.type;
			action.id = state.length;
			state.push(action);
			return state;
			break;
		}
		case 'UPDATE_FIELD': {
			delete action.type;
			state[action.id].left = action.left;
			state[action.id].top = action.top;
			return state;
			break;
		}
		default: {
			break;
		}
	}
}
