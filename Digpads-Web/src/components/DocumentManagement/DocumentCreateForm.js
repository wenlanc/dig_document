import React, { useState, useContext, useEffect } from 'react';
// @mui material components
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Card from '@mui/material/Card';
// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';
import 'dropzone/dist/dropzone.css';
import { default as Upload } from './DocumentsUploadC';
import { default as DocumentSignPad } from './DocumentSignPad';
import { default as DocumentSend } from './DocumentSend';
import { default as DocumentSigners } from './DocumentSigners';

import { authContext } from '../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { instance, getCSRF } from '../../controllers/axios';
import { useNavigate } from 'react-router-dom';
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

export default function DocumentCreateForm(props) {
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { auth } = useContext(authContext);

	const [title, setTitle] = useState("");
	const [files, setFiles] = useState([]);
	const [rejectedFiles, setRejectedFiles] = useState([]);
	const [uploadedFileUrl, setUploadedFileUrl] = useState([]);
	const [documentId, setDocumentId] = useState('');
	const [signers, setSigners] = useState([]);
	const [isBulkSend, setIsBulkSend] = useState(false);
	const [isSetSignerOrder, setIsSetSignerOrder] = useState(false);
	const [bulkSenderData, setBulkSenderData] = useState([]);
	const [emailSubject, setEmailSubject] = useState('Sign document');
	const [emailContent, setEmailContent] = useState('');
	const [possibleComment, setPossibleComment] = useState(true);
	const [selectedWebform, setSelectedWebform] = useState([]);
	const [selectedFolder, setSelectedFolder] = useState({});

	const [activeStep, setActiveStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const steps = getSteps();
	const isLastStep = activeStep === steps.length - 1;

	const signature = useSelector(selectSignatures);
	const signedAll = () => {
		let result = true;
		for (let index in signature) {
			if (
				signature[index] &&
				signature[index].signerName.value.email == auth.data.email &&
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

	const handleUpload = async () => {
		if (!signedAll()) {
			alert('Please complete your sign.');
			return;
		}
		try {
			setLoading(true);
			const dataForm = new FormData();
			dataForm.append('fields', JSON.stringify(signature));
			dataForm.append('emailSubject', emailSubject);
			dataForm.append('emailContent', emailContent);
			dataForm.append('signers', JSON.stringify(signers));
			dataForm.append('bulkSenderData', JSON.stringify(bulkSenderData));
			dataForm.append('isBulkSend', isBulkSend);
			dataForm.append('possibleComment', possibleComment);
			dataForm.append(
				'webforms',
				JSON.stringify(selectedWebform.map((item) => item._id))
			);
			dataForm.append('file', files[0]);
			let res = await instance.post(`/edocument/saveRequest`, dataForm);
			if (res.status === 200) {
				console.log(res);
				setLoading(false);
				// Go to list of documents
				//navigate('/landlord-tools/documents');
				props.setTabValue(1);
			}
		} catch (e) {
			setLoading(false);
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	};

	const handleFileUpload = async () => {
		try {
			if(files && files.length > 0){
				setLoading(true);
				const dataForm = new FormData();
				dataForm.append('file', files[0]);
				let res = await instance.post(`/edocument/saveFileRequest`, dataForm);
				if (res.status === 200 && res.data && res.data.document_url) {
					console.log(res);
					setUploadedFileUrl(res.data.document_url);
					setDocumentId(res.data.document_id);
					setTitle(res.data.title);
					setLoading(false);
				}
			}
		} catch (e) {
			setLoading(false);
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	}

	const handleSend = async () => {
		if (!signedAll()) {
			alert('Please complete your sign.');
			return;
		}
		try {
			setLoading(true);
			const dataForm = {
				fields: JSON.stringify(signature),
				emailSubject: emailSubject,
				emailContent: emailContent,
				signers: JSON.stringify(signers),
				bulkSenderData: JSON.stringify(bulkSenderData),
				isBulkSend: isBulkSend,
				possibleComment: possibleComment,
				webforms: JSON.stringify(selectedWebform.map((item) => item._id)),
				documentId: documentId,
				isSetSignerOrder: isSetSignerOrder,
			};
			let res = await instance.post(`/edocument/saveSendRequest`, dataForm);
			if (res.status === 200) {
				setLoading(false);
				console.log(res);
				// Go to list of documents
				//navigate('/landlord-tools/documents');
				props.setTabValue(1);
			}
		} catch (e) {
			setLoading(false);
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	};

	const handleQuickSend_old = async () => {
		try {
			if (signers.length < 2) {
				alert('Please add signer!');
				return;
			}
			setLoading(true);
			const dataForm = new FormData();
			dataForm.append('signers', JSON.stringify(signers));
			dataForm.append('file', files[0]);
			let res = await instance.post(`/edocument/processQuickSend`, dataForm);
			if (res.status === 200) {
				console.log(res);
				setLoading(false);
				// Go to list of documents
				//navigate('/landlord-tools/documents');
				props.setTabValue(1);
			}
		} catch (e) {
			setLoading(false);
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	};

	const handleQuickSend = async () => {
		try {
			if (signers.length < 2) {
				alert('Please add signer!');
				return;
			}
			if (loading) {
				alert('Please wait...!');
				return;
			}
			setLoading(true);
			const dataForm = {
				signers: JSON.stringify(signers),
				documentId: documentId,
			};
			let res = await instance.post(`/edocument/processQuickSend`, dataForm);
			if (res.status === 200) {
				console.log(res);
				setLoading(false);
				// Go to list of documents
				//navigate('/landlord-tools/documents');
				props.setTabValue(1);
			}
		} catch (e) {
			setLoading(false);
			if (!e.response) {
				console.log(e);
				return;
			}
			console.log(e.response.data);
		}
	};

	const handleNext = () => {
		if (activeStep == 2) {
			if (!signedAll()) {
				alert('Please complete your sign!');
				return;
			}
		}
		if (activeStep == 0) {
			if (files.length == 0) {
				alert('Please choose file!');
				return;
			}
			if(documentId == "")
				handleFileUpload();
		}
		if (activeStep == 1) {
			if (signers.length < 2) {
				alert('Please add signer!');
				return;
			}
		}
		setActiveStep(activeStep + 1);
	};
	const handleBack = () => {
		if(activeStep == 0 || activeStep == 1){
			alert("Already file choosed");
			return;
		}

		setActiveStep(activeStep - 1);
	}

	// const
	const [step, setStep] = useState('upload');

	// if (step === 'upload') {
	// 	return (
	// 		<section className='container'>

	// 			<button
	// 				onClick={() => setStep('reorder')}
	// 				disabled={!files.length}
	// 			>
	// 				Next
	// 			</button>
	// 		</section>
	// 	);
	// 	//will route to upload if the files doesnt exists
	// } else if (step === 'reorder' && files.length) {
	// 	return (
	// 		<section className='container'>
	// 			<Reorder files={files} setFiles={setFiles} />
	// 			<button onClick={() => setStep('upload')}>Prev</button>
	// 			<button onClick={() => setStep('sign')}>Next</button>
	// 		</section>
	// 	);
	// }else if (step === 'sign' && files.length) {
	// 	return (
	// 		<SignDocument files={files} history={props.history} />
	// 	);
	// } else if (step === 'verify' && files.length) {
	// 	return (
	// 		<VerifyAndUploadDocument files={files} history={props.history} />
	// 	);
	// }

	function getSteps() {
		return [
			'1. Select Document',
			'2. Add Signers',
			'3. Place Fields',
			'4. Review and Send',
		];
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<section className='container'>
						<Upload
							files={files}
							setFiles={setFiles}
							rejectedFiles={rejectedFiles}
							setRejectedFiles={setRejectedFiles}
							accept_file='.pdf,.docx'
						/>
					</section>
				);
			case 1:
				return (
					<DocumentSigners
						signers={signers}
						setSigners={setSigners}
						handleQuickSend={handleQuickSend}
						isBulkSend={isBulkSend}
						setIsBulkSend={setIsBulkSend}
						bulkSenderData={bulkSenderData}
						setBulkSenderData={setBulkSenderData}
						isSetSignerOrder={isSetSignerOrder}
						setIsSetSignerOrder={setIsSetSignerOrder}
					/>
				);
			case 2:
				return (
					<DocumentSignPad 
						signers={signers} 
						files={files} 
						documentId={documentId}
						uploadedFileUrl={uploadedFileUrl}
					/>
				);
			case 3:
				return (
					<DocumentSend
						signers={signers}
						files={files}
						title={title}
						documentId={documentId}
						uploadedFileUrl={uploadedFileUrl}
						emailSubject={emailSubject}
						emailContent={emailContent}
						setEmailSubject={setEmailSubject}
						setEmailContent={setEmailContent}
						possibleComment={possibleComment}
						setPossibleComment={setPossibleComment}
						selectedWebform={selectedWebform}
						setSelectedWebform={setSelectedWebform}
						selectedFolder={selectedFolder}
						setSelectedFolder={setSelectedFolder}
					/>
				);
			default:
				return null;
		}
	}

	return (
		<SuiBox mt={1} mb={20}>
			<Card sx={{ overflow: 'visible' }}>
				<Grid container justifyContent='center'>
					<Grid item xs={12} lg={12}>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<SuiBox p={2}>
							<SuiBox>
								{getStepContent(activeStep)}
								<SuiBox
									mt={3}
									width='100%'
									display='flex'
									justifyContent='space-between'
								>
									{activeStep === 0 ? (
										<SuiBox />
									) : (
										<SuiButton
											variant='gradient'
											color='secondary'
											onClick={handleBack}
										>
											back
										</SuiButton>
									)}

									{ loading ? (
										<SuiButton
											variant='gradient'
											color='dark'
										>
											Waiting...
										</SuiButton>):(
										<SuiButton
											variant='gradient'
											color='dark'
											onClick={!isLastStep ? handleNext : handleSend}
										>
											{isLastStep ? 'send' : 'next'}
										</SuiButton>
									)}
									
								</SuiBox>
							</SuiBox>
						</SuiBox>
					</Grid>
				</Grid>
			</Card>
		</SuiBox>
	);
}
