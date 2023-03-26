import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { instance, getCSRF } from '../../controllers/axios';
import { authContext } from '../../contexts/AuthContext';
import { Document, Page } from 'react-pdf';
import { Grid, IconButton, Button } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import MyModal from 'components/Modal';
import DocumentUpload from '../DocumentUploadHandler';

export default function GetDocument() {
	getCSRF();
	const { token } = useParams();

	let { auth } = useContext(authContext);
	const [documentContent, setDocumentContent] = useState('');
	const [err, setError] = useState('');
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	useEffect(() => {
		async function getDocument() {
			try {
				let data = { documentId: token };
				let res = await instance.post(`getDocument`, data);
				if (res.status === 200) {
					console.log(res);
					setDocumentContent(res.data);
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
	}, [token, auth.loading, auth.authenticated]);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	if (!auth.loading && auth.authenticated && documentContent !== '') {
		return (
			<>
				<MyModal display={modalOpen}>
					<DocumentUpload />
				</MyModal>
				<Grid direction='row' container>
					<Grid xs={3} direction='column' container item>
						<Button onClick={() => setModalOpen(true)}>test</Button>
					</Grid>

					<Grid xs={9} direction='column' container item>
						<div>
							This document was uploaded by {documentContent.sender.first}{' '}
							{documentContent.sender.last}
						</div>
						<div>
							Click to{' '}
							<a href={documentContent.documentUrl} download>
								download
							</a>
						</div>

						<Grid container justifyContent='center'>
							<Grid item xs={1}>
								<IconButton
									color='primary'
									component='span'
									onClick={() => {
										setPageNumber(pageNumber - 1 ? pageNumber - 1 : 1);
									}}
									size='large'
								>
									<ArrowLeft />
								</IconButton>
							</Grid>
							<Grid item xs={10}>
								<Document
									file={documentContent.documentUrl}
									onLoadSuccess={onDocumentLoadSuccess}
								>
									<Page pageNumber={pageNumber} />
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
											pageNumber + 1 > numPages ? numPages : pageNumber + 1
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
			</>
		);
	} else if (err !== '') {
		return <div>{err}</div>;
	} else {
		return <div>Loading...</div>;
	}
}
