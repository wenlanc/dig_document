import React, { useEffect, useState, useContext, useReducer } from 'react';
import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import DraggableBox from './DragableSignature';
import DocumentPage from './DocumentPage';
import DocumentComment from './DocumentComment';
import {
	Grid,
	Box,
	InputLabel,
	Input,
	IconButton,
	Button,
	TextareaAutosize,
	Modal,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	Checkbox,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
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
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import { SaveAsTemplate } from '../../store/actions/Document/templateAction';
import { useAlert } from 'react-alert';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import { modalStyles } from '../styled/Modal';

import {
	ReactFormBuilder,
	ReactFormGenerator,
	ElementStore,
} from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import Divider from '@mui/material/Divider';
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

export default function DocumentDetail(props) {
	getCSRF();
	let { auth } = useContext(authContext); // auth.data.id, auth.data._id
	const alert = useAlert();
	const useStyles = makeStyles((theme) => ({
		modal: {
			overflowY: 'auto',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				height: 'auto',
			},
		},
	}));
	const classes = useStyles();
	const [document, setDocument] = useState('');
	const [err, setError] = useState('');
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [signers, setSigners] = useState([]);
	const [selectedWebform, setSelectedWebform] = useState({});
	const [sortedAnswers, setSortedAnswers] = useState([]);

	let navigate = useNavigate();
	const dispatch = useDispatch();

	const signature = useSelector(selectSignatures);
	const yourName = auth.data ? auth.data.email : '';

	const [comments, setComments] = useState([]);
	const [replyComment, setReplyComment] = useState('');
	const [signerEmailList, setSignerEmailList] = useState([]);
	const [signerStatusList, setSignerStatusList] = useState([]);

	// useEffect(() => {
	// 	if(document){
	// 		setSigners(JSON.parse(document.signers));
	// 		//setSignerStatusList(JSON.parse(document.status));
	// 	}
	// }, [document]);

	const yourStatus = signerStatusList[signerEmailList.indexOf(yourName)];

	useEffect(() => {
		async function getDocument() {
			try {
				let data = { documentId: props.id };
				let res = await instance.post(`getEdocument`, data);
				if (res.status === 200 && res.data) {
					setDocument(res.data);
					if (
						res.data.webformsAnswerData &&
						res.data.webformsAnswerData.length > 0
					) {
						const sorted = {};
						for (let item of res.data.webformsAnswerData) {
							sorted[item.webformId.title]
								? sorted[item.webformId.title].push(item)
								: (sorted[item.webformId.title] = [item]);
						}
						setSortedAnswers(sorted);
					}
					let signersList = JSON.parse(res.data.signers);
					setSigners(signersList);
					if (!res.data.isConfirmed) {
						let isSigned = false;
						if (
							signersList.filter((item) => {
								return item.email == yourName;
							}).length > 0
						) {
							let signerStatus = signersList.filter((item) => {
								return item.email == yourName;
							})[0].status;
							if (signerStatus) {
								isSigned = true;
							}
						}
						let envelope_data = JSON.parse(res.data.envelope_content);
						for (let i = 0; i < envelope_data.length; i++) {
							envelope_data[i].isViewPage = true;
							envelope_data[i].isSigned =
								isSigned &&
								envelope_data[i].property &&
								(envelope_data[i].property.source ||
									envelope_data[i].property.text);
							dispatch(appendField(envelope_data[i]));
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
			dispatch(removeAllField());
			getDocument();
		}
	}, [props.id, auth.loading, auth.authenticated]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const signedAll = () => {
		let result = true;
		for (let index in signature) {
			console.log(signature[index]);
			if (
				signature[index].signerName.value.email == yourName &&
				(signature[index].element_type == 'signature' ||
					signature[index].element_type == 'image')
			) {
				if (!signature[index].property.source) {
					result = false;
				}
			}
		}
		return result;
	};

	const handleAccept = async () => {
		if (!signedAll()) {
			alert.error('Sign your all signatures.');
			return;
		}
		try {
			let res = await instance.post(`/edocument/update`, {
				action: 'accept',
				fields: JSON.stringify(signature),
				document_id: props.id,
				comment: replyComment,
			});
			if (res.status === 200) {
				console.log(res);
				alert.success('Accepted successfully.');
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

	const handleReject = async () => {
		try {
			let res = await instance.post(`/edocument/update`, {
				action: 'reject',
				document_id: props.id,
				comment: replyComment,
			});
			if (res.status === 200) {
				console.log(res);
				alert.success('Rejected successfully.');
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

	const onModalClose = () => {
		setModalOpen(false);
	};

	const handleWebformSubmit = async (val) => {
		console.log(val);
		let data = {
			documentId: props.id,
			webformId: selectedWebform._id,
			userId: auth.data._id,
			formData: JSON.stringify(val),
		};
		let res = await instance.post(`edocument/answerWebform`, data);
		if (res.status === 200 && res.data) {
			onModalClose();
		}
	};

	if (document !== '') {
		return (
			<DndProvider backend={HTML5Backend}>
				<SuiBox mt={1} mb={20}>
					<Card sx={{ overflow: 'visible' }}>
						<Grid container justifyContent='center'>
							<Grid item xs={12} lg={12}>
								<SuiBox mt={2}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={9}>
											{document && (
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
																	//file={ { url : documentContent.preview} } // reloading page whenever state change
																	file={
																		process.env.REACT_APP_API_URL +
																		document.documentUrl
																	}
																	// file={{
																	// 	url :  process.env.REACT_APP_API_URL + document.documentUrl,
																	// 	withCredentials: true,
																	// 	headers:{'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': true}
																	// }}
																	options={{ withCredentials: true }}
																	onLoadSuccess={onDocumentLoadSuccess}
																>
																	<Page
																		pageNumber={pageNumber}
																		
																	>
																		<DocumentPage
																			id={pageNumber}
																		></DocumentPage>
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
										<Grid item xs={12} style={{ padding: '10px' }} sm={3}>
											<SuiBox
												display='flex'
												justifyContent='space-between'
												alignItems='center'
											>
												<SuiBox>
													<SuiTypography variant='h6' fontWeight='medium'>
														{document.title}
													</SuiTypography>

													<SuiTypography
														variant='span'
														style={{ fontSize: '0.75rem' }}
													>
														{moment(document.createdAt).format('MMMM Do YYYY')}{' '}
														Created
													</SuiTypography>
												</SuiBox>
											</SuiBox>

											<SuiBox
												mb={3}
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
														Status:
													</SuiTypography>
													<SuiBadge
														variant='contained'
														color='secondary'
														size='md'
														badgeContent={'Pending'}
														container
													/>
												</SuiBox>
											</SuiBox>

											{signers &&
												signers.length > 0 &&
												signers.map((item, index) => {
													return (
														<SuiBox
															mt={1}
															key={index}
															component='li'
															display='flex'
															flexDirection='column'
														>
															<SuiBox>
																<SuiTypography variant='body2' color='text'>
																	{item.email}
																</SuiTypography>
																<SuiBadge
																	variant='contained'
																	color='primary'
																	size='md'
																	badgeContent={
																		item.isSender
																			? 'Sent'
																			: item.status
																			? item.status
																			: 'Waiting'
																	}
																	container
																/>
															</SuiBox>
														</SuiBox>
													);
												})}
											{auth.data._id == document.sender._id ? (
												<SuiBox mr={1}>
													{document.isConfirmed ? (
														<SuiBox mt={2} mr={1}>
															<SuiButton
																onClick={() => {}}
																variant='gradient'
																color='info'
																size='small'
															>
																<a
																	href={
																		process.env.REACT_APP_API_URL +
																		document.documentUrl
																	}
																	download
																	target='_new'
																>
																	download
																</a>
															</SuiButton>
														</SuiBox>
													) : (
														<SuiBox mt={2} display='flex'>
															{/* <SuiButton
																onClick={() => {}}
																variant='outlined'
																color='dark'
																size='small'
															>
																Cancel
															</SuiButton> */}
														</SuiBox>
													)}
													<SuiBox mt={2} display='flex'>
														<SuiButton
															onClick={() => {
																dispatch(SaveAsTemplate(document));
																alert.success('Saved template successfully');
															}}
															variant='outlined'
															color='dark'
															size='small'
														>
															Save As Template
														</SuiButton>
													</SuiBox>
												</SuiBox>
											) : signers.filter((item) => {
													return item.email == yourName;
											  }).length > 0 &&
											  signers.filter((item) => {
													return item.email == yourName;
											  })[0].status ? (
												document.isConfirmed ? (
													<SuiBox mt={2} display='flex'>
														<SuiBox mr={1}>
															<SuiButton
																onClick={() => {}}
																variant='gradient'
																color='info'
																size='small'
															>
																<a
																	href={
																		process.env.REACT_APP_API_URL +
																		document.documentUrl
																	}
																	download
																	target='_new'
																>
																	download
																</a>
															</SuiButton>
														</SuiBox>
													</SuiBox>
												) : (
													''
												)
											) : (
												<SuiBox mt={2} display='flex'>
													<Grid container spacing={3}>
														{document.possibleComment && (
															<Grid item xs={12} sm={12}>
																<SuiBox mt={2} display='flex'>
																	<SuiInput
																		placeholder='Comment'
																		multiline
																		value={replyComment}
																		onChange={(event) =>
																			setReplyComment(event.target.value)
																		}
																	/>
																</SuiBox>
															</Grid>
														)}
														<Grid item xs={12} sm={12}>
															<SuiBox>
																<SuiButton
																	onClick={() => {
																		handleAccept();
																	}}
																	variant='gradient'
																	color='info'
																	size='small'
																>
																	Accept
																</SuiButton>
																&nbsp;&nbsp;
																<SuiButton
																	onClick={() => {
																		handleReject();
																	}}
																	variant='outlined'
																	color='dark'
																	size='small'
																>
																	Reject
																</SuiButton>
															</SuiBox>
														</Grid>
													</Grid>
												</SuiBox>
											)}

											{!document.isConfirmed && (
												<SuiBox
													mb={3}
													mt={3}
													component='li'
													display='flex'
													flexDirection='column'
												>
													<SuiTypography variant='body2' color='text'>
														Webforms:
													</SuiTypography>
													{document &&
														document.webformsData &&
														document.webformsData.length > 0 &&
														document.webformsData.map((item, index) => {
															return (
																<SuiBox
																	mt={1}
																	key={index}
																	component='li'
																	display='flex'
																	flexDirection='column'
																>
																	<SuiBox>
																		<span
																			style={{
																				textDecoration: 'underline',
																				cursor: 'pointer',
																			}}
																			onClick={(e) => {
																				item.contentJsonData = JSON.parse(
																					item.content
																				);
																				setSelectedWebform(item);
																				setModalOpen(true);
																			}}
																		>
																			{item.title}
																		</span>
																	</SuiBox>
																</SuiBox>
															);
														})}

													<Modal
														open={modalOpen}
														onClose={() => {
															onModalClose();
														}}
													>
														<Box className={classes.modal} sx={modalStyles}>
															<Box
																display='flex'
																justifyContent='space-between'
															>
																<SuiTypography
																	variant='h5'
																	component='h2'
																	fontWeight='bold'
																>
																	{selectedWebform.title}
																</SuiTypography>
																<div onClick={onModalClose}>
																	<Close style={{ cursor: 'pointer' }} />
																</div>
															</Box>
															<Grid container spacing={2} mt={1}>
																<Grid item xs={12} md={12}>
																	{selectedWebform &&
																		selectedWebform.contentJsonData && (
																			<ReactFormGenerator
																				data={
																					selectedWebform.contentJsonData
																						.task_data
																				}
																				//toolbarItems={items}
																				//onChange={handleUpdate}
																				onSubmit={handleWebformSubmit}
																				//actionName="Set this to change the default submit button text"
																				//submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
																				//backButton={<a href="/" className="btn btn-default btn-cancel btn-big">Back</a>}

																				//form_action="/path/to/form/submit"
																				//form_method="POST"
																				//task_id={12} // Used to submit a hidden variable with the id to the form from the database.
																				//answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
																				//authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
																				//data={JSON_QUESTION_DATA} // Question data

																				//download_path=""
																				//back_action="/"
																				//back_name="Back"
																				//action_name="Save"
																				//read_only={true}
																				//variables={this.props.variables}
																				//hide_actions={true}
																				//display_short={true}
																			/>
																		)}
																</Grid>
															</Grid>
															{/* <LoadingButton
															variant='contained'
															style={{
																marginBottom: 16,
																paddingLeft: 16,
																paddingRight: 16,
																minWidth: 160,
																textAlign: 'center',
															}}
															type='submit'
															onClick={() => {}}
															disabled={!selectedWebform}
														>
															Submit
														</LoadingButton> */}
														</Box>
													</Modal>
												</SuiBox>
											)}

											<SuiBox
												mb={3}
												mt={3}
												component='li'
												display='flex'
												flexDirection='column'
											>
												<SuiTypography variant='body2' color='text'>
													Webform Answers:
												</SuiTypography>
												{Object.keys(sortedAnswers).map((title, key) => (
													<DateList
														title={title}
														docs={sortedAnswers[title]}
														key={key}
													/>
												))}
											</SuiBox>
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

function DateList({ title, docs }) {
	const [designMenu, setDesignMenu] = useState(null);
	const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
	const closeDesignMenu = () => setDesignMenu(null);
	const [selectedDoc, setSelectedDoc] = useState(null);
	const dispatch = useDispatch();
	const alert = useAlert();
	const [selectedWebformData, setSelectedWebformData] = useState(null);
	const [selectedWebformAnswerData, setSelectedWebformAnswerData] =
		useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const useStyles = makeStyles((theme) => ({
		modal: {
			overflowY: 'auto',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				height: 'auto',
			},
		},
	}));
	const classes = useStyles();

	return (
		<>
			<List
				subheader={
					<ListSubheader component='div' id='nested-list-subheader'>
						{title}
					</ListSubheader>
				}
			>
				{docs.map((doc, key) => (
					<ListItem button key={key}>
						<Grid container>
							<Grid item xs={12}>
								<MenuItem key={key}>
									<ListItem
										onClick={(e) => {
											console.log(e);
											setSelectedWebformData(
												JSON.parse(doc.webformId.content).task_data
											);
											setSelectedWebformAnswerData(JSON.parse(doc.formData));
											setModalOpen(true);
										}}
									>
										{doc.userId.email}
									</ListItem>
								</MenuItem>
							</Grid>
						</Grid>
					</ListItem>
				))}
			</List>

			<Modal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
			>
				<Box className={classes.modal} sx={modalStyles}>
					<Box display='flex' justifyContent='space-between'>
						<SuiTypography variant='h5' component='h2' fontWeight='bold'>
							{title}
						</SuiTypography>
						<div
							onClick={(e) => {
								setModalOpen(false);
							}}
						>
							<Close style={{ cursor: 'pointer' }} />
						</div>
					</Box>
					<Grid container spacing={2} mt={1}>
						<Grid item xs={12} md={12}>
							{setSelectedWebformData && (
								<ReactFormGenerator
									data={selectedWebformData}
									//toolbarItems={items}
									//onChange={handleUpdate}
									//onSubmit={handleWebformSubmit}
									//actionName="Set this to change the default submit button text"
									//submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
									//backButton={<a href="/" className="btn btn-default btn-cancel btn-big">Back</a>}

									//form_action="/path/to/form/submit"
									//form_method="POST"
									//task_id={12} // Used to submit a hidden variable with the id to the form from the database.
									answer_data={selectedWebformAnswerData} // Answer data, only used if loading a pre-existing form with values.
									//authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
									//data={JSON_QUESTION_DATA} // Question data

									//download_path=""
									//back_action="/"
									//back_name="Back"
									//action_name="Save"
									//read_only={true}
									//variables={this.props.variables}
									hide_actions={true}
									//display_short={true}
								/>
							)}
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
}
