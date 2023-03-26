import React, { useEffect, useState, useContext, useReducer } from 'react';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import DraggableBox from './DragableSignature';
import DocumentPage from './DocumentPage';
import DocumentComment from './DocumentComment';
import { Grid, Box, InputLabel, Input, IconButton, Button, TextareaAutosize } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiBadge from 'components/SuiBadge';
import SuiSelect from 'components/SuiSelect';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from 'react-redux';
import { SaveAsTemplate } from '../../store/actions/Document/templateAction';
import PropTypes from "prop-types";
import { appendField, removeAllField } from './signatureSlice';
import { useAlert } from 'react-alert';

function FormField({ label, ...rest }) {
	return (
	  <>
		<SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
		  <SuiTypography
			component="label"
			variant="caption"
			fontWeight="bold"
			textTransform="capitalize"
		  >
			{label}
		  </SuiTypography>
		</SuiBox>
		<SuiInput {...rest} />
	  </>
	);
  }
  
  // typechecking props for FormField
  FormField.propTypes = {
	label: PropTypes.string.isRequired,
  };

const colorArray = [ 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark',"text","white"];

export default function DocumentTemplateDetail(props) {
	getCSRF();
	let { auth } = useContext(authContext); // auth.data.id, auth.data._id
	const [document, setDocument] = useState('');
	const [err, setError] = useState('');
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [signers, setSigners] = useState([]);

	const [isUsing, setIsUsing] = useState( props.isUse );
	const [ emailSubject , setEmailSubject] = useState("Sign document");
	const [ emailContent , setEmailContent] = useState("");

	const [templateFolders, setTemplateFolders] = useState([]);
	const [selectedFolder, setSelectedFolder] = useState({});

	let navigate = useNavigate();
	const dispatch = useDispatch();
	const alert = useAlert();

	const signature = useSelector((state) => state.signature);
	const yourName = auth.data?auth.data.email:"";

	useEffect(() => {
		async function getTemplate() { 
			try {
				let data = { templateId: props.id };
				let res = await instance.post(`getTemplate`, data);
				if (res.status === 200 && res.data) {
					setDocument(res.data);
					let signersList = JSON.parse(res.data.signers);
					setSigners(signersList);
					let signerIndex = 0;
					let envelope_data = JSON.parse(res.data.envelope_content);
					for(let i = 0 ; i < envelope_data.length ; i++){
						envelope_data[i].isViewPage = true;
						envelope_data[i].isSigned = true;
						for( let j = 0 ; j < signersList.length ; j++) {
							if ( signersList[j].email == envelope_data[i].signerName.value.email ) {
								signerIndex = j;
							}
						}
						envelope_data[i].color = colorArray[signerIndex];
						dispatch(appendField(envelope_data[i]));
					}
				}
			} catch (e) {
				if (!e.response) {
					console.log(e);
					return;
				}
				console.log(e.response.data);
				setError(e.response.data.error);
			}
		}

		const fetchTemplateFolders = (page = 1) => {
			instance
				.get(`getTemplateFolders?page=${page}`)
				.then((res) => {
					setTemplateFolders(res.data.folders);
				})
				.catch((e) => {
					console.log(e);
				});
		};

		if (!auth.loading && auth.authenticated) {
			dispatch(removeAllField());
			getTemplate();
			fetchTemplateFolders();
		}
	}, [props.id, auth.loading, auth.authenticated]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const signedAll = () => {
		let result = true;
		for(let index in signature) {
			console.log(signature[index])
			if( signature[index].signerName.value.email == yourName && (signature[index].element_type == "signature" || signature[index].element_type == "image")){
				if(!signature[index].property.source){
					result = false;
				}
			}
		}
		return result;
	}

	const handleUpload = async () => {
		if( ! signedAll() ){
			alert.error("Sign your all signatures.");
			return;
		}
		try {
			let res = await instance.post(`/edocument/update`,
			  	{ 
				  'action'   : 'use_template',
				  'document_id' : props.id,
				  'emailSubject' : emailSubject,
				  'emailContent': emailContent,
				  'signers' : JSON.stringify(signers)
				});	
			if (res.status === 200) {
				console.log(res);
				// Go to list of documents
				navigate('/landlord-tools/documents')
			}
		} catch (e) {
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	}

	const handleReject = async () => {
		try {
			let res = await instance.post(`/edocument/update`,
			  	{ 
				  'action'   : 'reject',		
				  'document_id' : props.id
				});	
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
	}

	const saveTemplateFolder = async () => {
		if (selectedFolder) {
			try {
				let res = await instance.post(`saveSelectTemplateFolder`,
					  { 
					  'folder_id'   : selectedFolder._id,		
					  'template_id' : document._id
					});	
				if (res.status === 200) {
					alert.success('Successfully Saved.');
				}
			} catch (e) {
				if (!e.response) {
					console.log(e);
					return;
				}
				console.log(e.response.data);
				alert.error('Failed.');
			}
		} else {
			alert.error('Please select folder.');
		}
	}

	if ( document !== '') {
		return (
			<DndProvider backend={HTML5Backend}>
				<SuiBox mt={1} mb={20}>
					<Card sx={{ overflow: "visible" }}>
						<Grid container justifyContent="center">
							<Grid item xs={12} lg={12}>

								<SuiBox mt={2}>
									<Grid container spacing={3}>
										
										<Grid item xs={12} sm={9}>
										{ document && (
											<Grid direction='row' container>
												<Grid xs={12} direction='column' container item>
													<Grid container justifyContent='center'>
														<Grid item xs={1}>
															<IconButton
																color='primary'
																component='span'
																onClick={() => {
																	setPageNumber(
																		pageNumber - 1 ? pageNumber - 1 : 1
																	);
																}}
																size='large'
																style={{ padding: "5px", display: 'flex', marginLeft: 'auto', width: 'fit-content' }}
															>
																<ArrowLeft />
															</IconButton>
														</Grid>
														<Grid item xs={10}>
																<Document
																	//file={ { url : documentContent.preview} } // reloading page whenever state change
																	file= { process.env.REACT_APP_API_URL + document.documentUrl } 
																	// file={{ 
																	// 	url :  process.env.REACT_APP_API_URL + document.documentUrl,
																	// 	withCredentials: true,
																	// 	headers:{'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': true}
																	// }}
																	options={{ withCredentials: true }}
																	headers = {{'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': true}}
																	onLoadSuccess={onDocumentLoadSuccess}
																>
																	<Page pageNumber={pageNumber}>
																		<DocumentPage
																			id={pageNumber}
																		>
																		</DocumentPage>
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
																style={{ padding: "5px"}}
															>
																<ArrowRight />
															</IconButton>
														</Grid>
													</Grid>
												</Grid>
											</Grid> 
										)}
										</Grid>

										<Grid item xs={12} style={{ padding: "10px"}} sm={3} >
											
											<SuiBox display="flex" justifyContent="space-between" alignItems="center">
												<SuiBox>
													<SuiTypography variant="h6" fontWeight="medium">
														{ document.title }
													</SuiTypography>
												</SuiBox>
											</SuiBox>
										
											<SuiBox mt={3} component="li" display="flex" flexDirection="column">
												<SuiBox display="flex" justifyContent="space-between" alignItems="center">
													<SuiTypography variant="body2" color="text">
													Signers:
													</SuiTypography>
												</SuiBox>
											</SuiBox>

											{ signers && signers.length > 0 && signers.map( (item, index) => {
												return (
													<SuiBox mt={1} key = {index}  component="li" display="flex" flexDirection="column">
														<SuiBox >
															<SuiTypography variant="body2" color= { colorArray[index]}>
															Signer { index+ 1} { item.isSender ? " : Sender": "" }
															</SuiTypography>
															{/* <SuiBadge
																variant="contained"
																color="primary"
																size="md"
																badgeContent={ item.isSender ? "Sender": ( item.status)? item.status : "Waiting" }
																container
															/> */}
															{ isUsing && ( <>
																<SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
																	<SuiTypography
																	component="label"
																	variant="caption"
																	fontWeight="bold"
																	textTransform="capitalize"
																	>
																	Name
																	</SuiTypography>
																</SuiBox>
																<SuiInput placeholder={'Name'} value={item.name} 
																	onChange={ (event) => { 
																		let signers1 = Object.assign([], signers); 
																		signers1[index].name = event.target.value; 
																		setSigners(signers1);  
																}} />
																<SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
																	<SuiTypography
																	component="label"
																	variant="caption"
																	fontWeight="bold"
																	textTransform="capitalize"
																	>
																	Email
																	</SuiTypography>
																</SuiBox>
																<SuiInput placeholder={'Email'} value={item.email} 
																	onChange={ (event) => { 
																		let signers1 = Object.assign([], signers); 
																		signers1[index].email = event.target.value; 
																		setSigners(signers1);  
																}}/>
															</>
															)}
														</SuiBox>
													</SuiBox>
												)
											})}
											{ !isUsing && (
												auth.data._id == document.creator._id ? (
													<SuiBox mr={1}>
														<SuiBox mt={2} display="flex">
															<SuiButton onClick={ () => { setIsUsing(true) } } variant="outlined" color="dark" size="small">
																Use This Template
															</SuiButton>
														</SuiBox>
														<SuiBox mt={2}>
															<SuiBox mt={2} >
																<SuiTypography variant="body2" color="text">
																	Current Folder: {document.folder ? document.folder.title : "Not selected"}
																</SuiTypography>
															</SuiBox>
															<SuiBox mt={2} >
																<SuiTypography variant="body2" color="text">
																	Select Folder:
																</SuiTypography>
															</SuiBox>
															<SuiBox mt={1}>
																<SuiSelect
																	value={ {value: selectedFolder, label: selectedFolder.title} }
																	onChange={(item) => {
																		setSelectedFolder(item.value);
																	}}
																	options={ templateFolders.map( (item) => { return { value: item, label: item.title }; })}
																/>
															</SuiBox>
															<SuiBox mt={1}>
																<SuiButton
																	variant='gradient'
																	color='info'
																	size='small'
																	style={{ fontSize: '0.75rem' }}
																	onClick={() => {
																		saveTemplateFolder();
																	}}
																>
																	Save
																</SuiButton>
															</SuiBox>
														</SuiBox>
													</SuiBox>
												) :(( signers.filter( (item) => { return item.email == yourName }).length > 0 && signers.filter( (item) => { return item.email == yourName })[0].status	) ? (
														document.isConfirmed ? (<SuiBox mt={2} display="flex">
														<SuiBox mr={1}>
															<SuiButton onClick={ () => { } } variant="gradient" color="info" size="small">
																<a href={ process.env.REACT_APP_API_URL + document.documentUrl } download target="_new">
																	download
																</a>
															</SuiButton>
														</SuiBox>
													</SuiBox>) : ""
												):(
													<SuiBox mt={2} display="flex">
														<SuiBox mr={1}>
															<SuiButton onClick={ () => { handleUpload() } } variant="gradient" color="info" size="small">
																Accept
															</SuiButton>
														</SuiBox>
														<SuiButton onClick={ () => { handleReject() } } variant="outlined" color="dark" size="small">
															Decline
														</SuiButton>
													</SuiBox>
												)) 
											)}

											{ isUsing && ( 
												<SuiBox mt={1}>
													<SuiTypography  variant="h6">Message to recipients:</SuiTypography>
													<Grid container pt={1} spacing={3}>
														<Grid item xs={12} sm={12}>
															<FormField type="text" value={emailSubject} onChange={ (event) => setEmailSubject(event.target.value ) } label="Email Subject" placeholder="" />
														</Grid>
														<Grid item xs={12} sm={12}>
															<FormField type="text" multiline rows={3} value={emailContent} onChange={ (event) => setEmailContent(event.target.value ) } label="Email Message" placeholder="" />
														</Grid>
													</Grid>

													<SuiBox mt={2} display="flex">
														<SuiBox mr={1}>
															<SuiButton onClick={() => { handleUpload() }} variant="outlined" color="info" size="small">
																Send
															</SuiButton>
														</SuiBox>
														<SuiButton onClick={() => { setIsUsing(false); }} variant="outlined" color="dark" size="small">
															Cancel
														</SuiButton>
													</SuiBox>
												</SuiBox>
											)}
											
										</Grid>
									</Grid>
								</SuiBox>
							</Grid>
						</Grid>
					</Card>
				</SuiBox>
			</DndProvider>
		);
	} else if (err !== '') {
		return <div>{err}</div>;
	} else {
		return <div>Loading...</div>;
	}
}

