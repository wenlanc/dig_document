import React, { useEffect, useState, useContext, useReducer, useRef } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DraggableBox from './DragableSignature';
import DocumentPage from './DocumentPage';
import { Document, Page, pdfjs } from 'react-pdf';
import { Grid, Box, InputLabel, Input, IconButton, Button } from '@mui/material';
import {
	TextField,
	Typography,
	Link,
	CircularProgress,
	FormControlLabel,
	Checkbox,
	Radio,
	FormControl,
	FormLabel,
	RadioGroup,
	Autocomplete
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentSignPad(props) {

	getCSRF();
	let { auth } = useContext(authContext);
	let navigate = useNavigate();
	const [documentContent, setDocumentContent] = useState('');
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};
	const [signature, dispatch] = useReducer(signatureReducer, []);
	const [receiverEmails, setReceiverEmails] = useState('');
	const yourName = auth.data.email;
	const [selectedSigner, setSelectedSigner] = useState(yourName);
	const [signerList, setSignerList] = useState([yourName]);
	const [signerStatusList, setSignerStatusList] = useState(["Waiting to sign"]);

	useEffect(() => {
		if(props.files.length > 0)
			setDocumentContent(props.files[0]);
	}, [props.files]);

	const [savedSignatures, setSavedSignatures] = useState([]);
	const fetchSavedSignatures = () => {
		instance
			.get(`edocument/getSavedSignatures`)
			.then((res) => { 
				setSavedSignatures(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useEffect(() => {
		fetchSavedSignatures();
	}, []);

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
			tempStatusList[ signerList.indexOf(yourName) ] = "Sent";
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
	}

	const addSigner = () => {
		let temp = Object.assign([], signerList);
		let tempStatus = Object.assign([], signerStatusList);
		if(temp.indexOf( receiverEmails ) == -1) {

			if(checkIfEmailInString(receiverEmails)){
				temp.push(receiverEmails);
				tempStatus.push("Waiting to sign");
				setSignerList(temp);
				setSignerStatusList(tempStatus);
			} 
			
		}
	}

	function checkIfEmailInString(text) { 
		var re = /(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
		return re.test(text);
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={mainDivSignature}>
				<div style={left} id='leftsidebar'>
					<div style={{ position : 'relative', display: 'flex', height: '30px'}}>
						<DraggableBox type='field' element_type="label" title='Label' width={100} height={30} signerName={selectedSigner} />
					</div>
					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="text" title='Text' width={100} height={30} signerName={selectedSigner} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="signature" title='Signature' width={100} height={50} signerName={selectedSigner} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="date" title='Date' width={100} height={30} signerName={selectedSigner} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="image" title='Image' width={100} height={50} signerName={selectedSigner} />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="comment" title='Comment' width={100} height={50} signerName={selectedSigner} />
					</div>
					
					{/* 
					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="name" title='Name' />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="email" title='Email' />
					</div>

					<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
						<DraggableBox type='field' element_type="checkbox" title='Checkbox' />
					</div> */}

					<hr style={{ width: "100%", marginTop:"15px" }}/>
					<Grid
						item
						xs={12}
						style={{ display: 'flex', marginTop: '6px' }}
					>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>
								Signers
							</FormLabel>
							<RadioGroup
								row
								name='row-radio-buttons-group'
								value={selectedSigner}
								onChange={(event) => {
									setSelectedSigner(event.target.value)
								}}
								defaultValue={yourName}
							>
								{ signerList.map( (item, index) => {
									if( item == auth.data.email){
										return (
											<FormControlLabel
												key={index}
												value={item}
												control={<Radio />}
												label={'You(' + item + ')'}
												style={{ width:"100%", overflow:"hidden"}}
											/>
										);
									} else {
										return (
											<FormControlLabel
												key={index}
												value={item}
												control={<Radio />}
												label={item}
												style={{ width:"100%", overflow:"hidden"}}
											/>
										);
									}
								})}
							</RadioGroup>
						</FormControl>
					</Grid>

					<Box
						mb={5}
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<IconButton
							color='primary'
							component='span'
							onClick={() => {
								addSigner();
							}}
							size='large'
						>
							<AddCircleOutlineIcon />

						</IconButton>

						<Input
							id='receiverEmails'
							name='receiverEmails'
							variant='outlined'
							value={receiverEmails}
							onChange={( event )=> { 
								setReceiverEmails(event.target.value) 
							}}
						/>
					</Box>						
					{ selectedSigner == yourName && (
						<div>
							<div style={{ position : 'relative', display: 'flex', height: '30px' }}>
								My Signatures:
							</div> 
							{ savedSignatures.map ( (item, index) => {
								let content = JSON.parse(item.content);
								return (
									<div key={index} style={{ position : 'relative', display: 'flex', height: '30px' }}>
										<DraggableBox type='field' signerName={yourName} element_type={content.element_type} title={content.title} width={content.width} height={content.height} property={content.property} />
									</div>
								);
							}
							)}
						</div>
					)}			
					<Button style={{ textDecoration:"underline",marginTop:"15px"}} onClick={handleUpload}>Create Document</Button>
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
												//file={ { url : documentContent.preview} } // reloading page whenever state change
												file= { documentContent.preview } 
												//options={{ withCredentials: true }}
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

				</div>							
			</div>
		</DndProvider>
	);
}


function signatureReducer(state, action) { 
	switch (action.type) {
		case 'ADD_FIELD': {
			delete action.type;
			action.id = state.length;
			//action.property = {};
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
			state.push(action);
			return state;
			break;
		}
		case 'UPDATE_FIELD_PROPERTY' : {
			delete action.type;
			state[action.id].property = { ...state[action.id].property, ...action.payload };
			return state;
			break;
		}
		case 'ADD_SIGNATURE' : {
			console.log(state[action.id]);

			let request = instance.post(`/edocument/saveSignature`,
				{ 
					 title: "my_signature",
					 fields : JSON.stringify(state[action.id])
				});	
			request.then((res) => { 
				if (res.status === 200) {
					console.log(res);
					// Go to list of documents
				}
			})
			.catch((e) => {
				console.log(e);
			});
			
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
