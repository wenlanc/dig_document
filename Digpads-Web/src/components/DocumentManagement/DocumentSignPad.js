import React, {
	useEffect,
	useState,
	useContext,
	useReducer,
	useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DraggableBox from './DragableSignature';
import DocumentPage from './DocumentPage';
import { Document, Page, pdfjs } from 'react-pdf';
import {
	Grid,
	Box,
	InputLabel,
	Input,
	IconButton,
	Button,
} from '@mui/material';
import {
	TextField,
	Typography,
	Link,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	Radio,
	FormControl,
	Select,
	FormLabel,
	RadioGroup,
	Autocomplete,
	MenuItem,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiBadge from 'components/SuiBadge';
import SuiSelect from 'components/SuiSelect';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import { useAlert } from 'react-alert';

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
	selectSignatures,
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

const fontStyleOptions = [
	'monospace',
	'Dancing Script',
	'Gloria Hallelujah',
	'Grape Nuts',
	'Permanent Marker',
	'Shadows Into Light',
];

export default function DocumentSignPad(props) {
	getCSRF();
	let { auth } = useContext(authContext);
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const alert = useAlert();

	const [documentContent, setDocumentContent] = useState('');
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const signature = useSelector(selectSignatures);
	const selectedField = useSelector(getSelectedField);

	const [receiverEmails, setReceiverEmails] = useState('');
	const yourName = auth.data.email;
	const [selectedSigner, setSelectedSigner] = useState(null);
	const [signerList, setSignerList] = useState([yourName]);
	const [signerStatusList, setSignerStatusList] = useState(['Waiting to sign']);

	const [propertyText, setPropertyText] = useState('');
	const [propertyFontSize, setPropertyFontSize] = useState('');
	const [propertyFontType, setPropertyFontType] = useState('');

	const [newCustomFieldName, setNewCustomFieldName] = useState('');

	useEffect(() => {
		//console.log(selectedField);
		//console.log(signature);
		setNewCustomFieldName('');
	}, [selectedField]);

	useEffect(() => {
		if (auth.data)
			setSelectedSigner({
				value: { email: auth.data.email, role: 'Sender' },
				label: 'Sender(You)',
			});
	}, [auth.data]);

	useEffect(() => {
		if (props.files.length > 0) setDocumentContent(props.files[0]);
	}, [props.files]);

	const [savedSignatures, setSavedSignatures] = useState([]);
	const fetchSavedSignatures = () => {
		instance
			.get(`edocument/getSavedSignatures`)
			.then((res) => {
				setSavedSignatures(res.data);
				dispatch(updateSavedSignatures(res.data));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const removeSavedSignature = (item) => {
		instance
		.post(`edocument/removeSavedSignature`, { id: item._id })
		.then((res) => {
			fetchSavedSignatures();
		})
		.catch((e) => {
			console.log(e);
		});
	}

	useEffect(() => {
		fetchSavedSignatures();
		dispatch(removeAllField());
		dispatch(removeSelectedField());
	}, []);

	const signedAll = () => {
		let result = true;
		for (let index in signature) {
			console.log(signature[index]);
			if (
				signature[index].signerName.email == yourName &&
				signature[index].element_type == 'signature'
			) {
				if (!signature[index].property.source) {
					result = false;
				}
			}
		}
		return result;
	};

	const handleUpload = async () => {
		if (!signedAll()) {
			alert('Sign your all signatures.');
			return;
		}
		try {
			let tempStatusList = Object.assign([], signerStatusList);
			tempStatusList[signerList.indexOf(yourName)] = 'Sent';
			setSignerStatusList(tempStatusList);

			const dataForm = new FormData();
			dataForm.append('fields', JSON.stringify(signature));
			dataForm.append('receiverEmails', JSON.stringify(signerList));
			dataForm.append('signerStatus', JSON.stringify(tempStatusList));
			dataForm.append('file', documentContent);
			let res = await instance.post(`/edocument/saveRequest`, dataForm);
			if (res.status === 200) {
				console.log(res);
				// Go to list of documents
				navigate('/landlord-tools/documents');
			}
		} catch (e) {
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	};

	const addSigner = () => {
		let temp = Object.assign([], signerList);
		let tempStatus = Object.assign([], signerStatusList);
		if (temp.indexOf(receiverEmails) == -1) {
			if (checkIfEmailInString(receiverEmails)) {
				temp.push(receiverEmails);
				tempStatus.push('Waiting to sign');
				setSignerList(temp);
				setSignerStatusList(tempStatus);
			}
		}
	};

	function checkIfEmailInString(text) {
		var re =
			/(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
		return re.test(text);
	}

	// useEffect(() => {
	// 	if(propertyText)
	// 		if(selectedFieldId != null && selectedFieldId != undefined )
	// 			dispatch ({
	// 				type:  'UPDATE_FIELD_PROPERTY',
	// 				id:   selectedFieldId,
	// 				payload: { text : propertyText }
	// 			});
	// }, [propertyText]);

	return (
		<DndProvider backend={HTML5Backend}>
			<SuiBox mt={2}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={2}>
						<Grid container>
							<Grid item xs={12} sm={12}>
								<SuiBox mb={3}>
									<SuiBox mb={1} ml={0.5} lineHeight={0} display='inline-block'>
										<SuiTypography
											component='label'
											variant='caption'
											fontWeight='bold'
											textTransform='capitalize'
										>
											Signers
										</SuiTypography>
									</SuiBox>
									<SuiSelect
										value={selectedSigner}
										defaultValue={{
											value: { email: auth.data.email, role: 'Sender' },
											label: 'Sender(You)',
										}}
										onChange={(item) => {
											setSelectedSigner(item);
										}}
										options={props.signers.map((item) => {
											return { value: item, label: item.role };
										})}
									/>
								</SuiBox>
							</Grid>
						</Grid>

						<SuiBox mb={2} ml={0.5} lineHeight={0} display='inline-block'>
							<SuiTypography
								component='label'
								variant='caption'
								fontWeight='bold'
								textTransform='capitalize'
							>
								Fields
							</SuiTypography>
						</SuiBox>

						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='signature'
								title='Signature'
								width={100}
								height={50}
								signerName={selectedSigner}
							/>
						</div>

						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='label'
								title='Label'
								width={100}
								height={30}
								signerName={selectedSigner}
							/>
						</div>
						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='text'
								title='Text'
								width={100}
								height={30}
								signerName={selectedSigner}
							/>
						</div>

						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='date'
								title='Date'
								width={100}
								height={30}
								signerName={selectedSigner}
							/>
						</div>

						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='image'
								title='Image'
								width={100}
								height={50}
								signerName={selectedSigner}
							/>
						</div>

						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='branding'
								title='Branding'
								width={100}
								height={50}
								signerName={selectedSigner}
							/>
						</div>

						<div
							style={{ position: 'relative', display: 'flex', height: '30px' }}
						>
							<DraggableBox
								type='field'
								element_type='comment'
								title='Comment'
								width={100}
								height={50}
								signerName={selectedSigner}
							/>
						</div>
						<hr style={{ width: '100%', marginTop: '15px' }} />

						{savedSignatures && savedSignatures.length > 0 && (
							<div>
								<div
									style={{
										position: 'relative',
										display: 'flex',
										height: '30px',
									}}
								>
									My Custom Fields:
								</div>
								{savedSignatures.map((item, index) => {
									if(item.content) {
										let content = JSON.parse(item.content);
										return (
											<div
												key={index}
												style={{
													position: 'relative',
													display: 'flex',
													height: '30px',
												}}
											>
												<DraggableBox
													type='field'
													signerName={content.signerName}
													element_type={content.element_type}
													title={item.title}
													width={content.width}
													height={content.height}
													property={content.property}
												/>
												<IconButton
													style = {{marginLeft:'auto'}}
													color='primary'
													component='span'
													variant='gradient'
													onClick={() => {
														removeSavedSignature(item);
													}}
												>
													<DeleteIcon />
												</IconButton>
											</div>
										);
									}
								})}
							</div>
						)}
					</Grid>

					<Grid item xs={12} sm={8} style={{ paddingLeft: '0px' }}>
						{props.uploadedFileUrl && (
							<Grid direction='row' container>
								<Grid xs={12} direction='column' container item>
									<Grid container justifyContent='center'>
										<Grid item xs={1}>
											<IconButton
												color='primary'
												component='span'
												onClick={() => {
													setPageNumber(pageNumber - 1 ? pageNumber - 1 : 1);
												}}
												size='large'
												style={{
													padding: '5px',
													display: 'flex',
													marginLeft: 'auto',
													width: 'fit-content',
												}}
											>
												<ArrowLeft />
											</IconButton>
										</Grid>
										<Grid item xs={10}>
											<Document
												file={
													process.env.REACT_APP_API_URL + props.uploadedFileUrl
												}
												options={{ withCredentials: true }}
												onLoadSuccess={onDocumentLoadSuccess}
											>
												<Page pageNumber={pageNumber}>
													<DocumentPage id={pageNumber}></DocumentPage>
												</Page>
											</Document>
											<p>
												Page {pageNumber} of {numPages}
											</p>
										</Grid>
										<Grid item xs={1}>
											<IconButton
												color='primary'
												component='span'
												onClick={() => {
													setPageNumber(
														pageNumber + 1 > numPages
															? numPages
															: pageNumber + 1
													);
												}}
												size='large'
												style={{ padding: '5px' }}
											>
												<ArrowRight />
											</IconButton>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						)}
					</Grid>

					<Grid item xs={12} sm={2} style={{ paddingLeft: '0px' }}>
						{selectedField && selectedField.element_type && (
							<>
								<SuiBox
									display='flex'
									justifyContent='space-between'
									alignItems='center'
								>
									<SuiBox>
										<SuiTypography variant='h6' fontWeight='medium'>
											Field Details
										</SuiTypography>
									</SuiBox>
									<IconButton
										color='primary'
										component='span'
										variant='gradient'
										onClick={() => {
											if (selectedField) {
												dispatch(removeSelectedField());
												dispatch(removeField({ id: selectedField.id }));
											}
										}}
									>
										<DeleteIcon />
									</IconButton>
								</SuiBox>

								<SuiBox
									mt={3}
									component='li'
									display='flex'
									flexDirection='column'
								>
									<SuiBox
										display='flex'
										justifyContent='space-between'
										alignItems='center'
									>
										<SuiTypography variant='body2' color='text'>
											Type:
										</SuiTypography>
										<SuiBadge
											variant='contained'
											color='secondary'
											size='md'
											badgeContent={selectedField.element_type}
											container
										/>
									</SuiBox>
									<Divider />
								</SuiBox>

								<SuiBox component='li' display='flex' flexDirection='column'>
									<SuiTypography variant='h6' color='text'>
										Assigned To:
									</SuiTypography>
									<SuiTypography variant='body2' color='text'>
										{selectedField.signerName &&
											selectedField.signerName.value.role +
												'-' +
												selectedField.signerName.value.email}
									</SuiTypography>
									<Divider />
								</SuiBox>

								{Array('text', 'label', 'comment').indexOf(
									selectedField.element_type
								) != -1 && (
									<SuiBox>
										<SuiBox mb={2}>
											<SuiTypography variant='h6'>Properties</SuiTypography>
										</SuiBox>
										<SuiBox mt={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Text Value:
												</SuiTypography>
											</SuiBox>
											<SuiInput
												multiline
												value={selectedField.propertyText}
												placeholder='Type here...'
												disabled={!selectedField.propertyTextEditable}
												onChange={(event) => {
													if (
														selectedField.id != null &&
														selectedField.id != undefined
													) {
														dispatch(
															updateFieldProperty({
																id: selectedField.id,
																property: { text: event.target.value },
															})
														);
														dispatch(
															updateSelectedField({
																propertyText: event.target.value,
															})
														);
													}
												}}
											/>
										</SuiBox>
										<SuiBox mt={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Font Family:
												</SuiTypography>
											</SuiBox>
											<SuiSelect
												value={{
													value: selectedField.propertyFontType,
													label: selectedField.propertyFontType,
												}}
												onChange={(item) => {
													dispatch(
														updateFieldProperty({
															id: selectedField.id,
															property: { fontType: item.value },
														})
													);
													dispatch(
														updateSelectedField({
															propertyFontType: item.value,
														})
													);
												}}
												options={fontStyleOptions.map((item) => {
													return { value: item, label: item };
												})}
											/>
										</SuiBox>
										<SuiBox mt={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Font Size:
												</SuiTypography>
											</SuiBox>
											<SuiSelect
												value={{
													value: selectedField.propertyFontSize,
													label: selectedField.propertyFontSize,
												}}
												onChange={(item) => {
													dispatch(
														updateFieldProperty({
															id: selectedField.id,
															property: { fontSize: item.value },
														})
													);
													dispatch(
														updateSelectedField({
															propertyFontSize: item.value,
														})
													);
												}}
												options={Array.from(Array(60).keys()).map((item) => {
													return {
														value: item + 8 + 'px',
														label: item + 8 + 'px',
													};
												})}
											/>
										</SuiBox>

										{/* <SuiBox ml={{ xs: 0, sm: "auto" }} mt={{ xs: 2, sm: 2 }}>
											<SuiButton variant="gradient" color="info" size="small" style={{ fontSize: "0.75rem"}}>
												Save
											</SuiButton>
										</SuiBox> */}
									</SuiBox>
								)}

								{selectedField.element_type == 'branding' && 
								 selectedField.branding_type == 'text' && (
									<SuiBox>
										<SuiBox mb={2}>
											<SuiTypography variant='h6'>Properties</SuiTypography>
										</SuiBox>
										<SuiBox mt={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Text Value:
												</SuiTypography>
											</SuiBox>
											<SuiInput
												multiline
												value={selectedField.propertyText}
												placeholder='Type here...'
												//disabled={!selectedField.propertyTextEditable}
												onChange={(event) => {
													if (
														selectedField.id != null &&
														selectedField.id != undefined
													) {
														dispatch(
															updateFieldProperty({
																id: selectedField.id,
																property: { text: event.target.value },
															})
														);
														dispatch(
															updateSelectedField({
																propertyText: event.target.value,
															})
														);
													}
												}}
											/>
										</SuiBox>
										<SuiBox mt={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Font Family:
												</SuiTypography>
											</SuiBox>
											<SuiSelect
												value={{
													value: selectedField.propertyFontType,
													label: selectedField.propertyFontType,
												}}
												onChange={(item) => {
													dispatch(
														updateFieldProperty({
															id: selectedField.id,
															property: { fontType: item.value },
														})
													);
													dispatch(
														updateSelectedField({
															propertyFontType: item.value,
														})
													);
												}}
												options={fontStyleOptions.map((item) => {
													return { value: item, label: item };
												})}
											/>
										</SuiBox>
										<SuiBox mt={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Font Size:
												</SuiTypography>
											</SuiBox>
											<SuiSelect
												value={{
													value: selectedField.propertyFontSize,
													label: selectedField.propertyFontSize,
												}}
												onChange={(item) => {
													dispatch(
														updateFieldProperty({
															id: selectedField.id,
															property: { fontSize: item.value },
														})
													);
													dispatch(
														updateSelectedField({
															propertyFontSize: item.value,
														})
													);
												}}
												options={Array.from(Array(60).keys()).map((item) => {
													return {
														value: item + 8 + 'px',
														label: item + 8 + 'px',
													};
												})}
											/>
										</SuiBox>

										{/* <SuiBox ml={{ xs: 0, sm: "auto" }} mt={{ xs: 2, sm: 2 }}>
											<SuiButton variant="gradient" color="info" size="small" style={{ fontSize: "0.75rem"}}>
												Save
											</SuiButton>
										</SuiBox> */}
									</SuiBox>
								)}

								{Array('label', 'image').indexOf(selectedField.element_type) !=
									-1 && false && (
									<SuiBox>
										<SuiBox mt={2}>
											<FormControlLabel
												control={
													<Checkbox
														checked={selectedField.propertyUsingBrand}
														onChange={(e, val) => {
															if (
																selectedField.id != null &&
																selectedField.id != undefined
															) {
																dispatch(
																	updateFieldProperty({
																		id: selectedField.id,
																		property: { propertyUsingBrand: val },
																	})
																);
																dispatch(
																	updateSelectedField({
																		propertyUsingBrand: val,
																	})
																);
															}
														}}
													/>
												}
												label={
													<SuiTypography
														component='label'
														variant='caption'
														fontWeight='medium'
														textTransform='capitalize'
													>
														Using As Brand(Header&Footer)
													</SuiTypography>
												}
											/>
										</SuiBox>

										{/* <SuiBox ml={{ xs: 0, sm: "auto" }} mt={{ xs: 2, sm: 2 }}>
											<SuiButton variant="gradient" color="info" size="small" style={{ fontSize: "0.75rem"}}>
												Apply To All Pages
											</SuiButton>
										</SuiBox> */}
									</SuiBox>
								)}

								{
									signature[selectedField.id] && 
									signature[selectedField.id].id == selectedField.id && 
									signature[selectedField.id].property && 
									(signature[selectedField.id].property.source || 
										signature[selectedField.id].property.text
									) && (
									<SuiBox mt={2} mb={2}>
										<Divider />
										<SuiBox mt={2} mb={2}>
											<SuiBox
												mb={1}
												ml={0.5}
												lineHeight={0}
												display='inline-block'
											>
												<SuiTypography
													component='label'
													variant='caption'
													fontWeight='medium'
													textTransform='capitalize'
												>
													Custom Field Name:
												</SuiTypography>
											</SuiBox>
											<SuiInput
												value={newCustomFieldName}
												placeholder='Field Name...'
												onChange={(event) => {
													setNewCustomFieldName(event.target.value);
												}}
											/>
										</SuiBox>
										<SuiButton
											variant='gradient'
											color='info'
											size='small'
											style={{ fontSize: '0.75rem' }}
											onClick={() => {
												if (
													selectedField != null &&
													selectedField != undefined &&
													newCustomFieldName
												) {
													dispatch(
														saveCustomField({
															id: selectedField.id,
															newCustomFieldName,
														})
													);
													alert.success('Successfully Saved.');
													setNewCustomFieldName('');
													fetchSavedSignatures();
												} else {
													alert.error('Please input field name.');
												}
											}}
										>
											Save as Custom Field
										</SuiButton>
									</SuiBox>
								)}
							</>
						)}
					</Grid>
				</Grid>
			</SuiBox>
		</DndProvider>
	);
}
