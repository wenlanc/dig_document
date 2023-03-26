import {
	Container,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	Grid,
	Checkbox,
	MenuItem,
	ListItemIcon,
	Button,
	TextField,
	Box,
	Menu,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../controllers/axios';
import DocumentCombineModal from './DocumentCombineModal';
import styled from 'styled-components';

// @mui material components
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import { MoreVert } from '@mui/icons-material';

// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiBadge from 'components/SuiBadge';
import SuiAvatar from 'components/SuiAvatar';

import { SaveAsTemplate } from '../../store/actions/Document/templateAction';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';

export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />;
	};
	return Wrapper;
};

const StyledButton = styled(Button)`
	text-transform: capitalize;
	color: #ffffff;
	background: ${(props) =>
		props.status === 'green'
			? 'rgba(46, 199, 61, 1)'
			: props.status === 'black'
			? 'rgba(30, 34, 72, 1)'
			: props.status === 'blue'
			? 'rgba(41, 37, 204, 1)'
			: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
	&:hover {
		background: ${(props) =>
			props.status === 'green'
				? 'rgba(46, 199, 61, 1)'
				: props.status === 'black'
				? 'rgba(30, 34, 72, 1)'
				: props.status === 'blue'
				? 'rgba(41, 37, 204, 1)'
				: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
	}
`;

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-input {
		padding: 8px;
	}
`;

function DocumentList(props) {
	// const { auth } = React.useContext(authContext);
	const [documents, setDocuments] = useState([]);
	const [sortedDocuments, setSortedDocuments] = useState({});
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [filter, setFilter] = useState('sent');

	const [openCombineModal, setOpenCombineModal] = useState(false);
	const [selectedDocument, setSelectedDocument] = useState([]);

	const navigate = useNavigate();
	const alert = useAlert();

	const fetchDocuments = (page = 1, filter = 'sent') => {
		instance
			.get(`getEdocuments?page=${page}&filter=${filter}`)
			.then((res) => {
				console.log(res);
				setDocuments(res.data.documents);
				setTotalPage(res.data.totalPages);
				setPage(res.data.currentPage);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		fetchDocuments();
	}, []);

	useEffect(() => {
		const sortedDocuments = {};
		if (filter == 'sent') {
			documents.forEach((doc) => {
				const date = new Date(doc.createdAt).toDateString();
				sortedDocuments[date]
					? sortedDocuments[date].push(doc)
					: (sortedDocuments[date] = [doc]);
			});
			setSortedDocuments(sortedDocuments);
		} else {
			documents.forEach((doc) => {
				const date = new Date(doc.createdAt).toDateString();
				sortedDocuments[date]
					? sortedDocuments[date].push(doc.document)
					: (sortedDocuments[date] = [doc.document]);
			});
			setSortedDocuments(sortedDocuments);
		}
	}, [documents]);

	useEffect(() => {
		fetchDocuments(page, filter);
	}, [page, filter]);

	function handleCheck(event, id) {
		const selectedIndex = selectedDocument.indexOf(id);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedDocument, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedDocument.slice(1));
		} else if (selectedIndex === selectedDocument.length - 1) {
			newSelected = newSelected.concat(selectedDocument.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedDocument.slice(0, selectedIndex),
				selectedDocument.slice(selectedIndex + 1)
			);
		}
		setSelectedDocument(newSelected);
	}

	const EdocumentCancel = async (documentId) => {
		try {
			const response = await instance.post('/edocument/cancelRequest', {
				documentId,
			});
			if(response) {
				alert.success('Cancelled!');
				fetchDocuments();
			}
		} catch (error) {
			console.log(error);
			alert.error('Failed');
		}
	}

	return (
		<Container>
			<Box
				marginTop={2}
				marginBottom={1}
				marginLeft={'auto'}
				textAlign={'right'}
			>
				<StyledButton
					status={filter == 'sent' ? 'green' : 'black'}
					onClick={() => {
						setFilter('sent');
					}}
				>
					Sent
				</StyledButton>
				<StyledButton
					style={{ marginLeft: 16 }}
					status={filter == 'received' ? 'green' : 'black'}
					onClick={() => {
						setFilter('received');
					}}
				>
					Received
				</StyledButton>

				{ filter == 'sent' && selectedDocument.length > 1 && (
					<StyledButton
						style={{ marginLeft: 16 }}
						status='black'
						onClick={() => {
							if (selectedDocument.length > 0) setOpenCombineModal(true);
						}}
					>
						Combine Document
					</StyledButton>
				)}
				
			</Box>

			{Object.keys(sortedDocuments).map((date, key) => (
				<DateList
					date={date}
					docs={sortedDocuments[date]}
					key={key}
					navigate={navigate}
					handleCheck={handleCheck}
					EdocumentCancel={EdocumentCancel}
				/>
			))}
			<Grid container justifyContent='center'>
				<Grid item>
					<Pagination
						count={totalPage}
						page={page}
						onChange={(e, value) => {
							setPage(value);
						}}
					/>
				</Grid>
			</Grid>

			<DocumentCombineModal
				title='Combine PDFs'
				data={selectedDocument}
				setData={setSelectedDocument}
				open={selectedDocument.length > 0 && openCombineModal}
				onClose={() => {
					setOpenCombineModal(false);
				}}
				handleClose={() => {
					setOpenCombineModal(false);
				}}
			/>
		</Container>
	);
}

function DateList({ date, docs, navigate, handleCheck, EdocumentCancel }) {
	const [designMenu, setDesignMenu] = useState(null);
	const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
	const closeDesignMenu = () => setDesignMenu(null);
	const [selectedDoc, setSelectedDoc] = useState(null);
	const dispatch = useDispatch();
	const alert = useAlert();

	const EdocumentSaveAsTemplate = ( data ) => async (dispatch) => {
		try {
			const response = await instance.post('/template/saveRequest', {
				...data,
			});

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<List
			subheader={
				<ListSubheader component='div' id='nested-list-subheader'>
					{date}
				</ListSubheader>
			}
		>
			{docs.map((doc, key) => (
				<ListItem button key={key}>
					<Grid container>
						<Grid item xs={12}>
							<MenuItem key={key}>
								<ListItemIcon>
									<Checkbox
										color='primary'
										onChange={(e) => {
											console.log(e);
											//e.preventDefault()
											handleCheck(e, doc);
										}}
									/>
								</ListItemIcon>
								<ListItem>
									{doc.title}
									<SuiTypography
										color='secondary'
										onClick={(event) => {
											setSelectedDoc(doc);
											openDesignMenu(event);
										}}
										sx={{
											width: '16px',
											cursor: 'pointer',
										}}
										marginLeft={'auto'}
									>
										<MoreVert />
									</SuiTypography>

									{/* onClick={() => { navigate(`/landlord-tools/document-detail/${doc._id}`) }} */}

									{selectedDoc && selectedDoc.envelope_content ? (
										<SuiBox>
											<Menu
												anchorEl={designMenu}
												anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'right',
												}}
												open={Boolean(designMenu)}
												onClose={closeDesignMenu}
												keepMounted
											>
												<MenuItem
													onClick={() => {
														navigate(
															`/landlord-tools/document-detail/${selectedDoc._id}`
														);
													}}
												>
													View
												</MenuItem>
												<MenuItem
													onClick={() => {
														closeDesignMenu();
														dispatch(SaveAsTemplate(selectedDoc));
														alert.success('Saved template successfully');
													}}
												>
													Save As Template
												</MenuItem>
											</Menu>
										</SuiBox>
									) : (
										<SuiBox>
											<Menu
												anchorEl={designMenu}
												anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'right',
												}}
												open={Boolean(designMenu)}
												onClose={closeDesignMenu}
												keepMounted
											>
												<MenuItem onClick={() => {
														navigate(
															`/landlord-tools/document-edit/${selectedDoc._id}`
														);
												}}>Edit</MenuItem>
												<MenuItem
													onClick={() => {
														closeDesignMenu();
														EdocumentCancel(selectedDoc._id);
													}}
												>
													Cancel
												</MenuItem>
											</Menu>
										</SuiBox>
									)}
								</ListItem>
							</MenuItem>
						</Grid>
						<Grid item xs={12} paddingLeft={7}>
							<div style={{ float: 'left' }}> sender : {doc.sender.email}</div>
							<div style={{ float: 'right', padding: '0.5rem' }}>
								{doc.isConfirmed ? (
									<SuiBadge
										variant='contained'
										color='primary'
										size='md'
										badgeContent={'All Signed'}
										container
									/>
								) : (
									<SuiBadge
										variant='contained'
										color='secondary'
										size='md'
										badgeContent={'Pending'}
										container
									/>
								)}
							</div>
						</Grid>
					</Grid>
				</ListItem>
			))}
		</List>
	);
}

export default withRouter(DocumentList);
