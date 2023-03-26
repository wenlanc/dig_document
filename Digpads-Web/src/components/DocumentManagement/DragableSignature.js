import React, { useEffect, useState, useContext, useRef } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import MyModal from 'components/Modal';
import CanvasDraw from 'react-canvas-draw';
import SignaturePad from 'react-signature-canvas';
import { default as Upload } from './DocumentsUploadC';
import { Resizable } from 'react-resizable';
import { Rnd } from 'react-rnd';
import {
	TextField,
	Grid,
	Tooltip,
	Select,
	FormControl,
	MenuItem,
} from '@mui/material';
import { authContext } from '../../contexts/AuthContext';

import { useDispatch, useSelector } from 'react-redux';

import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TodayIcon from '@mui/icons-material/Today';
import GestureIcon from '@mui/icons-material/Gesture';
import ImageIcon from '@mui/icons-material/Image';
import CommentIcon from '@mui/icons-material/Comment';
import BookIcon from '@mui/icons-material/Book';
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiInput from 'components/SuiInput';
import SuiDatePicker from 'components/SuiDatePicker';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';

import {
	addField,
	updateField,
	appendField,
	updateFieldProperty,
	removeField,
	removeAllField,
	saveSignature,
	saveCustomField,
	saveWebform,
} from './signatureSlice';
import {
	selectField,
	updateSelectedField,
	removeSelectedField,
	getSelectedField,
} from './selectedSignatureSlice';
import {
	listSavedSignatures,
	updateSavedSignatures,
} from './savedSignaturesSlice';

const Box = styled.div`
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	position: relative;
`; // ? position:absolute

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
export const StyledTextareaAutosize = styled(TextField)`
	width: 80%;
	margin: 10px 0px;
	margin-left: auto;
	margin-right: 5px;
	@media (max-width: 768px) {
		width: 220.03px;
		margin: 5px auto;
	}
`;

const fontStyleOptions = [
	'monospace',
	'Dancing Script',
	'Gloria Hallelujah',
	'Grape Nuts',
	'Permanent Marker',
	'Shadows Into Light',
];

export default function DraggableBox(props) {
	const [{ isDragging }, drag] = useDrag({
		item: {
			type: 'field',
			id: props.id,
			left: props.left,
			top: props.top,
			width: props.width,
			height: props.height,
			title: props.title,
			element_type: props.element_type,
			property: props.property,
			signerName: props.signerName,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	let { auth } = useContext(authContext);
	const yourName = auth.data.email;
	const isYourBox =
		props.signerName && yourName == props.signerName.value.email;

	const isEditPage = !props.isViewPage;
	const isSigned = props.isSigned ? props.isSigned : false;
	const borderColor = props.color ? props.color : 'text';

	const editable =
		isEditPage ||
		(!isEditPage &&
			isYourBox &&
			(!props.property || (props.property && !props.property.source)));
	const editableDate =
		isEditPage ||
		(!isEditPage &&
			isYourBox &&
			(!props.property ||
				(props.property && isNaN(Date.parse(props.property.text)))));

	const [signModalOpen, setSignModalOpen] = useState(false);
	const [imageModalOpen, setImageModalOpen] = useState(false);
	const [brandingModalOpen, setBrandingModalOpen] = useState(false);
	const [commentModalOpen, setCommentModalOpen] = useState(false);
	const [fontModalOpen, setFontModalOpen] = useState(false);
	const [trimmedDataURL, setTrimmedDataURL] = useState(
		props.property && props.property.source ? props.property.source : ''
	); // :

	const sigPad = useRef(null);
	const canvasRef = useRef(null);

	const [files, setFiles] = useState([]);
	const [rejectedFiles, setRejectedFiles] = useState([]);

	const [width, setWidth] = useState(props.width ? props.width : 100);
	const [height, setHeight] = useState(props.height ? props.height : 50);
	const [left, setLeft] = useState(props.left ? props.left : undefined);
	const [top, setTop] = useState(props.top ? props.top : undefined);

	const [textValue, setTextValue] = useState(props.title);
	const [fontSize, setFontSize] = useState('16px');
	const [fontType, setFontType] = useState(fontStyleOptions[0]);
	const [property, setProperty] = useState({});

	const [tabValue, setTabValue] = useState(0);
	const [selectedSigItem, setSelectedSigItem] = useState({});

	const dispatch = useDispatch();
	const selectedField = useSelector(getSelectedField);
	const savedSignatures = useSelector(listSavedSignatures);

	// let fieldReducers = signature.filter( (item) => { return item.id == props.id });
	// useEffect(() => {
	// 	if(fieldReducers && fieldReducers.length){
	// 		//setProperty(fieldReducers[0].property);
	// 		setTextValue(fieldReducers[0].property.text)
	// 	}
	// }, [fieldReducers[0]]);

	useEffect(() => {
		if (props.property) setProperty(props.property);
	}, []);

	useEffect(() => {
		if (props.property) setProperty(props.property);
	}, [props.property, props.id]);

	const fileToBase64 = (file) => {
		return new Promise((resolve) => {
			var reader = new FileReader();
			// Read file content on file loaded event
			reader.onload = function (event) {
				resolve(event.target.result);
			};

			// Convert data to base64
			reader.readAsDataURL(file);
		});
	};

	useEffect(() => {
		if (
			props.element_type == 'image' &&
			property &&
			property.source &&
			canvasRef.current
		) {
			var img = new Image();
			let ctx = canvasRef.current.getContext('2d');
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			img.onload = function () {
				if (canvasRef.current)
					ctx.drawImage(
						img,
						0,
						0,
						canvasRef.current.width,
						canvasRef.current.height
					);
			};
			img.src = property.source; // URL.createObjectURL(props.property.source);
		}

		if (props.element_type == 'date' && property && property.text) {
			setTextValue(property.text);
		}

		if (props.element_type == 'comment' && property && property.text) {
			setTextValue(property.text);
		}

		if (props.element_type == 'label' && property && property.text) {
			setTextValue(property.text);
		}

		if (props.element_type == 'text' && property) {
			setTextValue(property.text);
			if (property.fontSize) setFontSize(property.fontSize);
			if (property.fontType) setFontType(property.fontType);
		}
	}, [property]);

	useEffect(async () => {
		if (files.length > 0) {
			if(props.element_type == 'signature') {

				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext("2d");
				//ctx.clearRect(0, 0, 500, 200);
				var imageObj1 = new Image();
				imageObj1.onload = function () { 
					ctx.canvas.width = imageObj1.width;
					ctx.canvas.height = imageObj1.height;
					ctx.drawImage(imageObj1, 0, 0,imageObj1.width,imageObj1.height);
					var imgData = ctx.canvas.toDataURL('image/png');
					setTrimmedDataURL(imgData);
				};
				imageObj1.src = URL.createObjectURL(files[0]);

			} else {
				if(!canvasRef.current) return;

				const ctx = canvasRef.current.getContext('2d');
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
	
				var imageObj1 = new Image();
				imageObj1.onload = function () {
					ctx.drawImage(
						imageObj1,
						0,
						0,
						canvasRef.current.width,
						canvasRef.current.height
					);
					if (dispatch) {
						dispatch(
							updateFieldProperty({
								id: props.id,
								property: { source: canvasRef.current.toDataURL('image/png') },
							})
						);
					}
				};
				imageObj1.src = URL.createObjectURL(files[0]);
			}
		}
	}, [files]);

	useEffect(() => { 
		if (trimmedDataURL) {
			if (dispatch && props.id != null && props.id != undefined) {
				dispatch(
					updateFieldProperty({
						id: props.id,
						property: { source: trimmedDataURL },
					})
				);
			}
		}
		
	}, [trimmedDataURL]);

	useEffect(() => {
		if (dispatch && props.id != null && props.id != undefined)
			dispatch(
				updateField({
					id: props.id,
					left: left,
					top: top,
					width: width,
					height: height,
				})
			);
	}, [left, top, width, height]);

	useEffect(() => {
		if (selectedField && props && selectedField.id == props.id) {
			setTextValue(selectedField.propertyText);
			setFontSize(selectedField.propertyFontSize);
			setFontType(selectedField.propertyFontType);
		}
	}, [selectedField]);

	// if( element_type == "text" || element_type == "label") {}
	// useEffect(() => {
	// 	if(props.id != null && props.id != undefined)
	// 		dispatch ({
	// 			type:  'UPDATE_FIELD_PROPERTY',
	// 			id:   props.id,
	// 			payload: { text : textValue }
	// 		});
	// }, [textValue]);

	// useEffect(() => {
	// 	if(props.id != null && props.id != undefined)
	// 		dispatch ({
	// 			type:  'UPDATE_FIELD_PROPERTY',
	// 			id:   props.id,
	// 			payload: { fontSize : fontSize }
	// 		});
	// }, [fontSize]);

	// useEffect(() => {
	// 	if(props.id != null && props.id != undefined)
	// 		dispatch ({
	// 			type:  'UPDATE_FIELD_PROPERTY',
	// 			id:   props.id,
	// 			payload: { fontType : fontType }
	// 		});
	// }, [fontType]);

	function editSignModalControl() {
		setSignModalOpen(!signModalOpen);
	}

	function editImageModalControl() {
		setImageModalOpen(!imageModalOpen);
	}

	function editCommentModalControl() {
		setCommentModalOpen(!commentModalOpen);
	}

	function editFontModalControl() {
		setFontModalOpen(!fontModalOpen);
	}

	function editBrandingModalControl() {
		setBrandingModalOpen(!brandingModalOpen);
	}

	const sigClear = () => {
		sigPad.current.clear();
	};
	const sigTrim = () => {
		setTrimmedDataURL(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
	};

	const sigInsert = () => {
		setTrimmedDataURL(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
		setSignModalOpen(false);
		setFiles([]);
	};

	const imageInsert = () => {
		setImageModalOpen(false);
	};

	const saveComment = () => {
		setCommentModalOpen(false);
	};

	const saveFont = () => {
		setFontModalOpen(false);
	};

	const addSigns = () => {
		dispatch(
			saveSignature({
				id: props.id,
			})
		);
	};

	const renderCanvasPanel = () => {
		if (props.element_type == 'image') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={20}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					// lockAspectRatio={isAspectRatioLocked}
					// onResizeStart={onResizeStart}
					// onDragStop={handleDragStop}
					// onResizeStop={handleResizeStop}
					// resizeHandleComponent={createResizeHandles(isInCollision)}
					// dragGrid={grid}
					// resizeGrid={grid}
				>
					<Tooltip
						title={
							isYourBox
								? isSigned
									? 'Already signed'
									: 'Double click to input'
								: 'Other Signer'
						}
						followCursor
						arrow
						placement='top-start'
					>
						<SuiBox
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
							style={{ width: '100%', height: '100%', position: 'relative' }}
							onClick={(e) => {
								dispatch(
									selectField({
										id: props.id,
										element_type: props.element_type,
										signerName: props.signerName,
									})
								);
							}}
							onDoubleClick={(e) => {
								setImageModalOpen(true);
							}}
						>
							<label style={{ position: 'absolute' }}> {props.title} </label>
							<canvas
								style={{ position: 'absolute', width: '100%', height: '100%' }}
								onMouseDown={(e) => {
									e.preventDefault();
								}}
								onClick={(e) => {
									e.preventDefault();
								}}
								ref={canvasRef}
							></canvas>
						</SuiBox>
					</Tooltip>
				</Rnd>
			);
		} else if (props.element_type == 'signature') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={20}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
				>
					<Tooltip
						title={
							isYourBox
								? isSigned
									? 'Already signed'
									: 'Double click to input'
								: 'Other Signer'
						}
						followCursor
						arrow
						placement='top-start'
					>
						<SuiBox
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
							style={{ width: '100%', height: '100%', position: 'relative' }}
							onClick={(e) => {
								dispatch(
									selectField({
										id: props.id,
										element_type: props.element_type,
										signerName: props.signerName,
									})
								);
							}}
							onDoubleClick={() => {
								setSignModalOpen(true);
							}}
						>
							<label style={{ position: 'absolute' }}> {props.title} </label>
							{trimmedDataURL ? (
								<img
									style={{
										position: 'absolute',
										width: '100%',
										height: '100%',
									}}
									onMouseDown={(e) => {
										e.preventDefault();
									}}
									src={trimmedDataURL}
								/>
							) : null}
						</SuiBox>
					</Tooltip>
				</Rnd>
			);
		} else if (props.element_type == 'text') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={20}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
				>
					{isYourBox && (isEditPage || !isSigned) ? (
						<SuiBox
							style={{ width: '100%', height: '100%' }}
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
						>
							<textarea
								multiline='true'
								style={{
									border: 'none',
									position: 'relative',
									width: '100%',
									height: '100%',
									fontFamily:
										selectedField && selectedField.id == props.id
											? selectedField.propertyFontType
											: fontType,
									fontSize: fontSize,
								}}
								placeholder={props.title}
								//onDoubleClick={ (event) => { setFontModalOpen(true)} }
								onChange={(event) => {
									//setTextValue(event.target.value)
									if (props.id != null && props.id != undefined)
										dispatch(
											updateFieldProperty({
												id: props.id,
												property: { text: event.target.value },
											})
										);
									dispatch(
										updateSelectedField({ propertyText: event.target.value })
									);
								}}
								onClick={(event) => {
									dispatch(
										selectField({
											id: props.id,
											element_type: props.element_type,
											signerName: props.signerName,
											propertyText: event.target.value,
											propertyTextEditable: true,
											propertyFontType: fontType,
											propertyFontSize: fontSize,
										})
									);
								}}
								value={
									selectedField && selectedField.id == props.id
										? selectedField.propertyText
										: textValue
								}
							/>
						</SuiBox>
					) : (
						<SuiTypography
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
							style={{
								display: 'flex',
								width: '100%',
								height: '100%',
								fontSize: fontSize,
								fontFamily: fontType,
							}}
							placeholder={props.title}
							onClick={(e) => {
								dispatch(
									selectField({
										id: props.id,
										element_type: props.element_type,
										signerName: props.signerName,
										propertyText: 'Text',
										propertyTextEditable: false,
										propertyFontType: fontType,
										propertyFontSize: fontSize,
									})
								);
							}}
						>
							{'Text'}
						</SuiTypography>
					)}
				</Rnd>
			);
		} else if (props.element_type == 'label') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={20}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
				>
					{isEditPage && isYourBox ? (
						<SuiBox
							style={{ width: '100%', height: '100%' }}
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
						>
							<textarea
								multiline='true'
								style={{
									border: 'none',
									width: '100%',
									height: '100%',
									fontFamily:
										selectedField && selectedField.id == props.id
											? selectedField.propertyFontType
											: fontType,
									fontSize: fontSize,
								}}
								placeholder={props.title}
								onChange={(event) => {
									if (props.id != null && props.id != undefined) {
										dispatch(
											updateFieldProperty({
												id: props.id,
												property: { text: event.target.value },
											})
										);
										dispatch(
											updateSelectedField({ propertyText: event.target.value })
										);
									}
								}}
								onClick={(event) => {
									dispatch(
										selectField({
											id: props.id,
											element_type: props.element_type,
											signerName: props.signerName,
											propertyText: event.target.value,
											propertyTextEditable: true,
											propertyFontType: fontType,
											propertyFontSize: fontSize,
										})
									);
								}}
								value={
									selectedField && selectedField.id == props.id
										? selectedField.propertyText
										: textValue
								}
							/>
						</SuiBox>
					) : (
						<SuiTypography
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
							style={{
								display: 'flex',
								width: '100%',
								height: '100%',
								fontSize: fontSize,
								fontFamily: fontType,
							}}
							placeholder={props.title}
							onClick={(e) => {
								dispatch(
									selectField({
										id: props.id,
										element_type: props.element_type,
										signerName: props.signerName,
										propertyText: textValue,
										propertyTextEditable: false,
										propertyFontType: fontType,
										propertyFontSize: fontSize,
									})
								);
							}}
						>
							{textValue}
						</SuiTypography>
					)}
				</Rnd>
			);
		} else if (props.element_type == 'date') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={20}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
				>
					{isYourBox && (isEditPage || !isSigned) ? (
						<SuiBox
							style={{ width: '100%', height: '100%' }}
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
						>
							<input
								style={{ border: 'none', width: '100%', height: '100%' }}
								type='date'
								placeholder='Date'
								value={textValue}
								onChange={(event) => {
									if (props.id != null && props.id != undefined)
										dispatch(
											updateFieldProperty({
												id: props.id,
												property: { text: event.target.value },
											})
										);
									dispatch(
										updateSelectedField({ propertyText: event.target.value })
									);
								}}
								onClick={(event) => {
									dispatch(
										selectField({
											id: props.id,
											element_type: props.element_type,
											signerName: props.signerName,
											propertyText: event.target.value,
											// propertyTextEditable:false,
											propertyFontType: fontType,
											propertyFontSize: fontSize,
										})
									);
								}}
							/>
						</SuiBox>
					) : (
						<SuiTypography
							sx={{ borderColor: `${borderColor}.main` }}
							border={
								selectedField && selectedField.id == props.id
									? 'dotted 3px'
									: 'solid 1px'
							}
							style={{
								width: '100%',
								height: '100%',
								fontSize: fontSize,
								fontFamily: fontType,
							}}
							type='date'
							placeholder='Date'
							readOnly
							value={textValue}
							onClick={(event) => {
								dispatch(
									selectField({
										id: props.id,
										element_type: props.element_type,
										signerName: props.signerName,
										propertyText: event.target.value,
										// propertyTextEditable:false,
										propertyFontType: fontType,
										propertyFontSize: fontSize,
									})
								);
							}}
						>
							{textValue ? textValue : 'Date'}
						</SuiTypography>
					)}
				</Rnd>
			);
		} else if (props.element_type == 'comment') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={10}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					// lockAspectRatio={isAspectRatioLocked}
					// onResizeStart={onResizeStart}
					// onDragStop={handleDragStop}
					// onResizeStop={handleResizeStop}
					// resizeHandleComponent={createResizeHandles(isInCollision)}
					// dragGrid={grid}
					// resizeGrid={grid}
				>
					<SuiBox
						sx={{ borderColor: `${borderColor}.main` }}
						border={
							selectedField && selectedField.id == props.id
								? 'dotted 3px'
								: 'solid 1px'
						}
						style={{ width: '100%', height: '100%', position: 'relative' }}
						onClick={(e) => {
							dispatch(
								selectField({
									id: props.id,
									element_type: props.element_type,
									signerName: props.signerName,
									propertyText: textValue,
									// propertyTextEditable:false,
									propertyFontType: fontType,
									propertyFontSize: fontSize,
								})
							);
						}}
						onDoubleClick={() => {
							setCommentModalOpen(true);
						}}
					>
						{/* <label style={{ position:"absolute"}} > { props.title } </label> */}
						<Tooltip title={textValue} followCursor arrow placement='top-start'>
							<div
								style={{
									position: 'absolute',
									width: '100%',
									height: '100%',
									background: 'yellow',
									opacity: '0.2',
								}}
								onMouseDown={(e) => {
									e.preventDefault();
								}}
								onClick={(e) => {
									e.preventDefault();
								}}
							></div>
						</Tooltip>
					</SuiBox>
				</Rnd>
			);
		} else if (props.element_type == 'branding') {
			return (
				<Rnd
					default={{
						x: left,
						y: top,
						width: width,
						height: height,
					}}
					minWidth={20}
					minHeight={20}
					bounds='parent'
					size={{ width: width, height: height }}
					position={{ x: left, y: top }}
					onDragStop={(e, d) => {
						setLeft(d.x);
						setTop(d.y);
					}}
					onResize={(e, direction, ref, delta, position) => {
						setWidth(ref.offsetWidth);
						setHeight(ref.offsetHeight);
					}}
					enableResizing={isEditPage}
					disableDragging={!isEditPage}
					// lockAspectRatio={isAspectRatioLocked}
					// onResizeStart={onResizeStart}
					// onDragStop={handleDragStop}
					// onResizeStop={handleResizeStop}
					// resizeHandleComponent={createResizeHandles(isInCollision)}
					// dragGrid={grid}
					// resizeGrid={grid}
				>
					<Tooltip
						title={isYourBox ? 'Double click to input' : 'Other Signer'}
						followCursor
						arrow
						placement='top-start'
					>
						{tabValue == 0 ? (
							<SuiBox
								sx={{ borderColor: `${borderColor}.main` }}
								border={
									selectedField && selectedField.id == props.id
										? 'dotted 3px'
										: 'solid 1px'
								}
								style={{ width: '100%', height: '100%', position: 'relative' }}
								onClick={(e) => {
									dispatch(
										selectField({
											id: props.id,
											element_type: props.element_type,
											signerName: props.signerName,
											branding_type: 'image'
										})
									);
								}}
								onDoubleClick={(e) => {
									setBrandingModalOpen(true);
								}}
							>
								<label style={{ position: 'absolute' }}> {props.title} </label>
								<canvas
									style={{
										position: 'absolute',
										width: '100%',
										height: '100%',
									}}
									onMouseDown={(e) => {
										e.preventDefault();
									}}
									onClick={(e) => {
										e.preventDefault();
									}}
									ref={canvasRef}
								></canvas>
							</SuiBox>
						) : isYourBox && (isEditPage || !isSigned) ? (
							<SuiBox
								style={{ width: '100%', height: '100%' }}
								sx={{ borderColor: `${borderColor}.main` }}
								border={
									selectedField && selectedField.id == props.id
										? 'dotted 3px'
										: 'solid 1px'
								}
							>
								<textarea
									multiline='true'
									style={{
										border: 'none',
										position: 'relative',
										width: '100%',
										height: '100%',
										fontFamily:
											selectedField && selectedField.id == props.id
												? selectedField.propertyFontType
												: fontType,
										fontSize: fontSize,
									}}
									placeholder={props.title}
									//onDoubleClick={ (event) => { setFontModalOpen(true)} }
									onChange={(event) => {
										//setTextValue(event.target.value)
										if (props.id != null && props.id != undefined)
											dispatch(
												updateFieldProperty({
													id: props.id,
													property: { text: event.target.value },
												})
											);
										dispatch(
											updateSelectedField({ propertyText: event.target.value })
										);
									}}
									onClick={(event) => {
										dispatch(
											selectField({
												id: props.id,
												element_type: props.element_type,
												signerName: props.signerName,
												propertyText: event.target.value,
												propertyTextEditable: true,
												propertyFontType: fontType,
												propertyFontSize: fontSize,
												branding_type: 'text',
											})
										);
									}}
									value={
										selectedField && selectedField.id == props.id
											? selectedField.propertyText
											: textValue
									}
									onDoubleClick={(e) => {
										setBrandingModalOpen(true);
									}}
								/>
							</SuiBox>
						) : (
							<SuiTypography
								sx={{ borderColor: `${borderColor}.main` }}
								border={
									selectedField && selectedField.id == props.id
										? 'dotted 3px'
										: 'solid 1px'
								}
								style={{
									display: 'flex',
									width: '100%',
									height: '100%',
									fontSize: fontSize,
									fontFamily: fontType,
								}}
								placeholder={props.title}
								onClick={(e) => {
									dispatch(
										selectField({
											id: props.id,
											element_type: props.element_type,
											signerName: props.signerName,
											propertyText: 'Text',
											propertyTextEditable: false,
											propertyFontType: fontType,
											propertyFontSize: fontSize,
										})
									);
								}}
							>
								{'Text'}
							</SuiTypography>
						)}
					</Tooltip>
				</Rnd>
			);
		}
		return <></>;
	};

	const renderSelectPanel = () => {
		return (
			<div ref={drag} style={getStyles(left, top, isDragging)}>
				<Box top={top} left={left}>
					{/* { element_type == "label" && ( 
						<Typography variant='body2' component='label'>
							{ props.title }
						</Typography>   
					)} */}
					{props.element_type == 'label' && isYourBox && (
						<Typography variant='body2' component='label'>
							<FormatColorTextIcon /> {props.title}
						</Typography>
					)}
					{props.element_type == 'text' && (
						<Typography variant='body2' component='label'>
							<TextFieldsIcon /> {props.title}
						</Typography>
					)}
					{props.element_type == 'date' && (
						<Typography variant='body2' component='label'>
							<TodayIcon /> {props.title}
						</Typography>
					)}
					{props.element_type == 'signature' && (
						<Typography variant='body2' component='label'>
							<GestureIcon /> {props.title}
						</Typography>
					)}
					{props.element_type == 'image' && (
						<Typography variant='body2' component='label'>
							<ImageIcon /> {props.title}
						</Typography>
					)}
					{props.element_type == 'branding' && (
						<Typography variant='body2' component='label'>
							<BookIcon /> {props.title}
						</Typography>
					)}
					{props.element_type == 'comment' && (
						<Typography variant='body2' component='label'>
							<CommentIcon /> {props.title}
						</Typography>
					)}
				</Box>
			</div>
		);
	};

	return (
		<>
			{left != undefined ? renderCanvasPanel() : renderSelectPanel()}

			<MyModal
				display={
					false && isYourBox && (isEditPage || !isSigned) && signModalOpen
				}
				modalControl={editSignModalControl}
			>
				<div>
					<h3>Draw your sign.</h3>
					<div style={{ border: ' 1px dotted grey' }}>
						<SignaturePad canvasProps={{ className: '' }} ref={sigPad} />
					</div>
					<div style={{ marginTop: '10px' }}>
						<button onClick={() => sigClear()}>Clear</button>
						{/* <button onClick={ () => sigTrim() }>
							Trim
						</button> */}
						<button style={{ marginLeft: '15px' }} onClick={() => sigInsert()}>
							OK
						</button>

						{/* <button style={{ marginLeft: '15px' }} onClick={() => addSigns()}>
							Add my signature
						</button> */}
					</div>
					{/* {trimmedDataURL	? <img src={trimmedDataURL} /> : null} */}
				</div>
			</MyModal>

			<MyModal
				display={isYourBox && (isEditPage || !isSigned) && signModalOpen}
				modalControl={editSignModalControl}
			>
				<Grid container justifyContent='center'>
					<Grid item sx={{ minWidth: '500px', minHeight: '320px' }}>
						<AppBar position='static'>
							<Tabs
								orientation={'horizontal'}
								value={tabValue ? tabValue : 0}
								onChange={(event, newValue) => setTabValue(newValue)}
								//sx={{ backgroundColor: 'transparent' }}
							>
								<Tab label=' Drawing ' />
								{/* <Tab label=' Text ' /> */}
								<Tab label=' Image ' />
								<Tab label=' Saved ' />
							</Tabs>
						</AppBar>
						{tabValue === 0 && (
							<div style={{ paddingTop: '10px' }}>
								<h5>Draw your sign.</h5>
								<div style={{ border: ' 1px dotted grey' }}>
									<SignaturePad
										canvasProps={{
											width: 500,
											height: 200,
											className: 'sigCanvas',
										}}
										ref={sigPad}
									/>
								</div>
								<div style={{ marginTop: '10px' }}>
									<button onClick={() => sigClear()}>Clear</button>
									{/* <button onClick={ () => sigTrim() }>
								Trim
							</button> */}
									<button
										style={{ marginLeft: '15px' }}
										onClick={() => sigInsert()}
									>
										OK
									</button>

									{/* <button style={{ marginLeft: '15px' }} onClick={() => addSigns()}>
								Add my signature
							</button> */}
								</div>
								{/* {trimmedDataURL	? <img src={trimmedDataURL} /> : null} */}
							</div>
						)}
						{tabValue === 1 && (
							<div style={{ paddingTop: '10px' }}>
								<div>
									<Upload
										title={'Upload your image'}
										files={files}
										setFiles={setFiles}
										rejectedFiles={rejectedFiles}
										setRejectedFiles={setRejectedFiles}
										accept_file='image/*'
									/>
								</div>

								<div>
									<button
										onClick={() => {
											setSignModalOpen(false);
										}}
									>
										OK
									</button>
									{/* <button style={{ marginLeft: '15px' }} onClick={() => addSigns()}>
								Add my signature
							</button> */}
								</div>
							</div>
						)}
						{tabValue === 2 && (
							<Grid container>
								{savedSignatures &&
									savedSignatures.length > 0 &&
									savedSignatures.map((item, index) => {
										if (item.content) {
											let content = JSON.parse(item.content);
											if (
												content.element_type == 'signature' &&
												content.property &&
												content.property.source
											) {
												return (
													<Grid
														item
														xs={4}
														space={3}
														mt={1}
														key={index}
														style={{
															position: 'relative',
															display: 'flex',
															height: '50px',
														}}
													>
														{content.property && content.property.source && (
															<img
																src={content.property.source}
																style={
																	selectedSigItem._id == item._id
																		? { border: '1px red dotted' }
																		: { border: '1px grey dotted' }
																}
																onClick={() => {
																	setSelectedSigItem(item);
																}}
															/>
														)}
													</Grid>
												);
											} else {
												return null;
											}
										}
									})}
								<Grid item xs={12} space={3} mt={3}>
									<button onClick={() => {
										//console.log(selectedSigItem)
										let content = JSON.parse(selectedSigItem.content);
										// dispatch(
										// 	updateFieldProperty({
										// 		id: props.id,
										// 		property: { source: content.property.source },
										// 	})
										// );
										setTrimmedDataURL(content.property.source);
										setSignModalOpen(false);
									}}>OK</button>
								</Grid>
							</Grid>
						)}
					</Grid>
				</Grid>
			</MyModal>

			<MyModal
				display={isYourBox && isEditPage && brandingModalOpen}
				modalControl={editBrandingModalControl}
			>
				<Grid container justifyContent='center'>
					<Grid item sx={{ minWidth: '500px', minHeight: '320px' }}>
						<AppBar position='static'>
							<Tabs
								orientation={'horizontal'}
								value={tabValue ? tabValue : 0}
								onChange={(event, newValue) => setTabValue(newValue)}
								//sx={{ backgroundColor: 'transparent' }}
							>
								<Tab label=' Image ' />
								<Tab label=' Text ' />
							</Tabs>
						</AppBar>
						{tabValue === 0 && (
							<div style={{ paddingTop: '10px' }}>
								<div>
									<Upload
										title={'Upload your image'}
										files={files}
										setFiles={setFiles}
										rejectedFiles={rejectedFiles}
										setRejectedFiles={setRejectedFiles}
										accept_file='image/*'
									/>
								</div>
								<div>
									<button
										onClick={() => {
											dispatch(
												updateFieldProperty({
													id: props.id,
													property: {brandType: 'image'},
												})
											);
											dispatch(
												updateSelectedField({ branding_type: 'image', })
											);
											setBrandingModalOpen(false);
										}}
									>
										OK
									</button>
								</div>
							</div>
						)}
						{tabValue === 1 && (
							<Grid container>
								<Grid item xs={12} space={3} mt={3}>
									<textarea
										multiline='true'
										style={{
											//border: 'none',
											position: 'relative',
											width: '100%',
											height: '100%',
											fontFamily:
												selectedField && selectedField.id == props.id
													? selectedField.propertyFontType
													: fontType,
											fontSize: fontSize,
										}}
										placeholder={props.title}
										//onDoubleClick={ (event) => { setFontModalOpen(true)} }
										onChange={(event) => {
											//setTextValue(event.target.value)
											if (props.id != null && props.id != undefined)
												dispatch(
													updateFieldProperty({
														id: props.id,
														property: { text: event.target.value },
													})
												);
											dispatch(
												updateSelectedField({ propertyText: event.target.value })
											);
										}}
										value={
											selectedField && selectedField.id == props.id
												? selectedField.propertyText
												: textValue
										}
									/>
									<button onClick={() => {
										dispatch(
											updateFieldProperty({
												id: props.id,
												property: {brandType: 'text'},
											})
										);
										dispatch(
											updateSelectedField({ branding_type: 'text', })
										);
										setBrandingModalOpen(false);
									}}>OK</button>
								</Grid>
							</Grid>
						)}
					</Grid>
				</Grid>
			</MyModal>

			<MyModal
				display={isYourBox && (isEditPage || !isSigned) && imageModalOpen}
				modalControl={editImageModalControl}
			>
				<div>
					<div>
						<Upload
							title={'Upload your image'}
							files={files}
							setFiles={setFiles}
							rejectedFiles={rejectedFiles}
							setRejectedFiles={setRejectedFiles}
							accept_file='image/*'
						/>
					</div>

					<div>
						<button onClick={() => imageInsert()}>OK</button>
						{/* <button style={{ marginLeft: '15px' }} onClick={() => addSigns()}>
							Add my signature
						</button> */}
					</div>
				</div>
			</MyModal>

			<MyModal
				display={isYourBox && (isEditPage || !isSigned) && commentModalOpen}
				modalControl={editCommentModalControl}
			>
				<div>
					<div>
						<StyledTextareaAutosize
							placeholder='Type comment...'
							multiline='true'
							rowsMax={3}
							onChange={(e) => setTextValue(e.target.value)}
							value={textValue}
							type='text'
							name='comment'
						/>
					</div>
					<div>
						<button onClick={() => saveComment()}>Save</button>
					</div>
				</div>
			</MyModal>

			<MyModal
				display={isYourBox && !isEditPage && !isSigned && fontModalOpen}
				modalControl={editFontModalControl}
			>
				<div>
					<div>
						<div>
							<FormControl>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={fontType}
									onChange={(event) => {
										setFontType(event.target.value);
									}}
								>
									{fontStyleOptions.map((item, i) => (
										<MenuItem value={item} key={i}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={fontSize}
									onChange={(event) => {
										setFontSize(event.target.value);
									}}
								>
									{Array.from(Array(60).keys()).map((item, i) => (
										<MenuItem value={item + 8} key={i}>
											{item + 8} px
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</div>
					<div>
						<button onClick={() => saveFont()}>Save</button>
						<button onClick={() => addSigns()}>Add my signature</button>
					</div>
				</div>
			</MyModal>
		</>
	);
}
