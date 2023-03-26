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

export default function DocumentDetail(props) {
	getCSRF();
	let { auth } = useContext(authContext); // auth.data.id, auth.data._id
	const [documentContent, setDocumentContent] = useState('');
	const [err, setError] = useState('');
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [signature, dispatch] = useReducer(signatureReducer, []);
	const [receiverEmails, setReceiverEmails] = useState('');

	let navigate = useNavigate();
	
	const yourName = auth.data?auth.data.email:"";

	const [comments, setComments] = useState([]); 
	const [signerEmailList, setSignerEmailList] = useState([]); 
	const [signerStatusList, setSignerStatusList] = useState([]); 
	useEffect(() => {
		if(documentContent){
			setSignerEmailList(JSON.parse(documentContent.receiverEmail));
			setSignerStatusList(JSON.parse(documentContent.status));
		}
	}, [documentContent]);

	const yourStatus = signerStatusList[signerEmailList.indexOf(yourName)];

	useEffect(() => {
		async function getDocument() { 
			try {
				let data = { documentId: props.id };
				let res = await instance.post(`getEdocument`, data);
				if (res.status === 200) {
					setDocumentContent(res.data);
					if(!res.data.isConfirmed) {
						let envelope_data = JSON.parse(res.data.envelope_content);
						for(let i = 0 ; i < envelope_data.length ; i++){
							envelope_data[i].isViewPage = true;
							dispatch({
								type: 'APPEND_FIELD',
								payload : envelope_data[i]
							});
						}
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
		if (!auth.loading && auth.authenticated) {
			getDocument();
		}
	}, [props.id, auth.loading, auth.authenticated]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const signedAll = () => {
		let result = true;
		for(let index in signature) {
			console.log(signature[index])
			if( signature[index].signerName == yourName && (signature[index].element_type == "signature" || signature[index].element_type == "image")){
				if(!signature[index].property.source){
					result = false;
				}
			}
		}
		 return result;
	}

	const handleUpload = async () => {

		if( ! signedAll() ){
			alert("Sign your all signatures.");
			return;
		}
		
		try {

			let tempStatusList = Object.assign([], signerStatusList); 
			tempStatusList[ signerEmailList.indexOf(yourName) ] = "Signed";
			setSignerStatusList(tempStatusList);

			let res = await instance.post(`/edocument/update`,
			  	{ 
				  'action'   : 'sign',
				  'fields' : JSON.stringify(signature),
				  'document_id' : props.id,
				  'signerStatus' : JSON.stringify(tempStatusList)
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

			let tempStatusList = Object.assign([], signerStatusList); 
			tempStatusList[ signerEmailList.indexOf(yourName) ] = "Rejected";
			setSignerStatusList(tempStatusList);

			let res = await instance.post(`/edocument/update`,
			  	{ 
				  'action'   : 'reject',		
				  'document_id' : props.id,
				  'signerStatus' : JSON.stringify(tempStatusList)
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

	if (!auth.loading && auth.authenticated && documentContent !== '') {
		return (
			<>
			<DndProvider backend={HTML5Backend}>
			<div style={mainDivSignature}>
				<div style={left} >
					<Box>
						This document was uploaded by{' '}
						{documentContent.sender.first}{' '}
						{documentContent.sender.last}
					</Box>

					<Box>
						{' Created At: \n'} { moment(documentContent.createdAt).format('MMMM Do YYYY') }
					</Box>
					<Box>	
						{ ' Updated At: \n' }{ moment(documentContent.updatedAt).format('MMMM Do YYYY') }
					</Box>
					{documentContent.isConfirmed && (
						<div>
							Click to{' '}
							<a href={ process.env.REACT_APP_API_URL + documentContent.documentUrl } download target="_new">
								download
							</a>
						</div>
					)}
					
					{yourStatus == "Waiting to sign" && (
						<div>
							<Button style={{ marginTop:"15px"}} onClick={handleReject}>Reject</Button>
							<Button style={{ marginTop:"15px"}} onClick={handleUpload}>Update</Button>
						</div>
					)}				

				</div>
				<div id='images' style={right}>
				{ documentContent && (
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
									>
										<ArrowLeft />
									</IconButton>
								</Grid>
								<Grid item xs={10}>
									<Document
											file={{ 
												url :  process.env.REACT_APP_API_URL + documentContent.documentUrl,
												withCredentials: true,
												headers:{'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': true}
											}}
											//file={ process.env.REACT_APP_API_URL + documentContent.documentUrl }
											onLoadSuccess={onDocumentLoadSuccess}
										>
										<Page pageNumber={pageNumber}>
											<DocumentPage
												id={pageNumber}
												fields={signature}
												dispatch={dispatch} 
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
									>
										<ArrowRight />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
				</div>

				<div id="actions" style= {{	width: '10vw',boxSizing: 'border-box',border: '1px solid' }} >

					{signerEmailList && signerEmailList.length > 0 && (
						signerEmailList.map((item,index) => {
							return (
								<Box key={index} style={{ marginTop: "10px", wordBreak:"break-all"}}>
									{item} : { signerStatusList[index] }
								</Box>
							);
						})
					)}	

					{documentContent.isConfirmed && (
						<div style={{color:'red'}}>
							This Document is confirmed by all signers.
						</div>
					)}

				</div>
				
			</div>
			</DndProvider>

			</>
		);
	} else if (err !== '') {
		return <div>{err}</div>;
	} else {
		return <div>Loading...</div>;
	}
}



function signatureReducer(state, action) { 
	switch (action.type) {
		case 'ADD_FIELD': {
			delete action.type;
			action.id = state.length;
			action.property = {};
			state.push(action);
			return state;
			break;
		}
		case 'UPDATE_FIELD': {
			delete action.type;
			state[action.id].left = action.left;
			state[action.id].top = action.top;
			state[action.id].width = action.width;
			state[action.id].height = action.height;
			return state;
			break;
		}
		case 'APPEND_FIELD': {
			delete action.type;
			state.push(action.payload);
			return state;
			break;
		}
		case 'UPDATE_FIELD_PROPERTY' : {
			delete action.type;
			state[action.id].property = { ...state[action.id].property, ...action.payload };
			return state;
			break;
		}
		default: {
			break;
		}
	}
}


const mainDivSignature = {
	display: 'flex',
	width: '80vw',
	border: '1px solid',
	boxSizing: 'border-box',
};

const left = {
	width: '10vw',
	boxSizing: 'border-box',
	// border: '1px solid',
	height: 'max-content',
	position: 'sticky',
	top: '10px',
	marginLeft: '20px',
	display: 'flex',
    flexDirection: 'column'
};
const right = {
	width: '40vw',
	boxSizing: 'border-box',
	border: '1px solid',
	// height: '500px',
};
