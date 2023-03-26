import CanvasDraw from 'react-canvas-draw';
import React from 'react';
export default function Signature() {
	return (
		<>
			<CanvasDraw
				brushRadius={2}
				brushColor='black'
				immediateLoading={true}
			/>
		</>
	);
}
