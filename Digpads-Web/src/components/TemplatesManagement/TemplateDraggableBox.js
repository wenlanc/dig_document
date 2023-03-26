import React, { useEffect, useState, useContext, useRef } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Rnd } from 'react-rnd';

const Box = styled.div`
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	position: relative;
`;   // ? position:absolute

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

export default function TemplateDraggableBox(props) {
	const { id, title, type, element_type } = props;
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'field', id, left:props.left, top:props.top,width:props.width, height:props.height, title, element_type },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [width, setWidth] = useState( props.width?props.width: 100);
	const [height, setHeight] = useState( props.height?props.height: 50 );
	const [left, setLeft] = useState( props.left?props.left: 0);
	const [top, setTop] = useState( props.top?props.top: 0 );
	const [textValue, setTextValue] = useState( title );

	const dispatch = props.dispatch;

	useEffect(() => {
		if(dispatch)
			dispatch ({
				type:  'UPDATE_FIELD',
				id:   id,
				left: left,
				top:top,
				width:width,
				height:height
			});

	}, [left, top, width, height]);

	const renderCanvasPanel = () => {
		if( element_type == "image") {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={50}
					minHeight={50}
					bounds="parent"

					size={{ width: width,  height: height }}
					position={{ x: left, y: top }}
					onDragStop={(e, d) => { 
						setLeft(d.x);
						setTop(d.y);
					 }}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
					//enableResizing={ isEditPage }
					//disableDragging={ !isEditPage }
					// lockAspectRatio={isAspectRatioLocked}
					// onResizeStart={onResizeStart}
					// onDragStop={handleDragStop}
					// onResizeStop={handleResizeStop}
					// resizeHandleComponent={createResizeHandles(isInCollision)}
					// dragGrid={grid}
					// resizeGrid={grid}
					>
						
					<div style={{width: "100%", height: "100%", position:'relative' , border: "solid 1px #ddd",}}>
						<input type="button" style={{ position:"absolute", zIndex: "100"}} value= { props.title } />  
					</div>
				</Rnd>
			)
		} else if (element_type == "signature") {
			return (<Rnd
				default={{
					x: left,
					y: top,
					width: width,
					height: height,
				}}
				minWidth={50}
				minHeight={50}
				bounds="parent"
				size={{ width: width,  height: height }}
				position={{ x: left, y: top }}
				//enableResizing={ isEditPage }
				//disableDragging={ !isEditPage }
				onDragStop={(e, d) => { 
					setLeft(d.x);
					setTop(d.y);
					}}
				onResize={(e, direction, ref, delta, position) => {
					setWidth(ref.offsetWidth);
					setHeight(ref.offsetHeight);
				}}
				>
				<div style={{width: "100%", height: "100%", position:'relative' , border: "solid 1px #ddd",}}>
					<input type="button" style={{ position:"absolute", zIndex: "100"}} value= { props.title } /> 
				</div>
			</Rnd>)
		} else if (element_type == "text") {
			return (<Rnd
				default={{
					x: left,
					y: top,
					width: width,
					height: height,
				}}
				minWidth={50}
				minHeight={32}
				bounds="parent"
				size={{ width: width,  height: height }}
				position={{ x: left, y: top }}
				//enableResizing={ isEditPage }
				//disableDragging={ !isEditPage }
				onDragStop={(e, d) => { 
					setLeft(d.x);
					setTop(d.y);
					}}
				onResize={(e, direction, ref, delta, position) => {
					setWidth(ref.offsetWidth);
					setHeight(ref.offsetHeight);
				}}
				>
					<textarea style={{ width:"100%", height:"100%" }} placeholder={props.title} >{textValue}</textarea>	
			</Rnd>)
		} else if (element_type == "label") {
			return (<Rnd
				default={{
					x: left,
					y: top,
					width: width,
					height: height,
				}}
				minWidth={50}
				minHeight={32}
				bounds="parent"
				size={{ width: width,  height: height }}
				position={{ x: left, y: top }}
				//enableResizing={ isEditPage }
				//disableDragging={ !isEditPage }
				onDragStop={(e, d) => { 
					setLeft(d.x);
					setTop(d.y);
					}}
				onResize={(e, direction, ref, delta, position) => {
					setWidth(ref.offsetWidth);
					setHeight(ref.offsetHeight);
				}}
				>
					<textarea style={{ width:"100%", height:"100%" }} placeholder={props.title} >{textValue}</textarea>
			</Rnd>)
		} else if (element_type == "date") {
			return (<Rnd
				default={{
					x: left,
					y: top,
					width: width,
					height: height,
				}}
				minWidth={50}
				minHeight={32}
				bounds="parent"
				size={{ width: width,  height: height }}
				position={{ x: left, y: top }}
				//enableResizing={ isEditPage }
				//disableDragging={ !isEditPage }
				onDragStop={(e, d) => { 
					setLeft(d.x);
					setTop(d.y);
					}}
				onResize={(e, direction, ref, delta, position) => {
					setWidth(ref.offsetWidth);
					setHeight(ref.offsetHeight);
				}}
				>
					<input style={{ width:"100%", height:"100%" }} type="date" /> 

			</Rnd>)
		} 
		return ( <></> )
	}

	const renderSelectPanel = () => {
		return (
			<div ref={drag} style={getStyles(left, top, isDragging)}>
				<Box top={top} left={left}>
					
					{ element_type == "label" && (<Typography variant='body2' component='label'>
							{ props.title }
						</Typography>  
					)} 
					{ element_type == "text" && (<Typography variant='body2' component='label'>
							{ props.title }
						</Typography>  
					)} 
					{ element_type == "date" && (<Typography variant='body2' component='label'>
							{ props.title }
						</Typography>  
					)} 
					{ element_type == "signature" && (<Typography variant='body2' component='label'>
							{ props.title }
						</Typography>  
					)} 
					{ element_type == "image" && (<Typography variant='body2' component='label'>
							{ props.title }
						</Typography>  
					)} 
					
				</Box>
			</div>
		)
	}

	return (
		<>
			{ left ? renderCanvasPanel():renderSelectPanel() }
			
		</>
	);
}
