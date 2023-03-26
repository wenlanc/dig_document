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
	Modal,
	Box,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />;
	};
	return Wrapper;
};
import { useDispatch, useSelector } from 'react-redux';
// Soft UI Dashboard PRO React components
import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import { MoreVert } from '@mui/icons-material';
import { Menu } from '@mui/material';
import Card from '@mui/material/Card';

import {
	ReactFormBuilder,
	ReactFormGenerator,
	ElementStore,
} from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import { useAlert } from 'react-alert';
import { instance, getCSRF } from '../../controllers/axios';
import { saveWebform } from './signatureSlice';
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import { modalStyles } from '../styled/Modal';

function DocumentWebform(props) {
	// const { auth } = React.useContext(authContext);
	getCSRF();
	const [webforms, setWebforms] = useState([]);
	const [sortedWebforms, setSortedWebforms] = useState({});
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();

	const fetchWebforms = (page = 1) => {
		instance
			.get(`edocument/getWebforms?page=${page}`)
			.then((res) => {
				setWebforms(res.data.webforms);
				setTotalPage(res.data.totalPages);
				setPage(res.data.currentPage);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		fetchWebforms();
	}, []);

	useEffect(() => {
		const sortedWebforms = {};
		webforms.forEach((doc) => {
			const date = new Date(doc.createdAt).toDateString();
			sortedWebforms[date]
				? sortedWebforms[date].push(doc)
				: (sortedWebforms[date] = [doc]);
		});
		setSortedWebforms(sortedWebforms);
	}, [webforms]);

	useEffect(() => {
		fetchWebforms(page);
	}, [page]);

	const [formData, setFormData] = useState([]);
	const [formTitle, setFormTitle] = useState('');

	return (
		<Container style={{ marginTop: '2rem' }}>
			<SuiBox mt={1} mb={3}>
				<Card sx={{ overflow: 'visible' }}>
					<Grid container justifyContent='center'>
						<Grid item xs={12} lg={12}>
							<SuiBox mt={1} mb={20}>
								<ReactFormBuilder
									//url='/'
									//saveUrl='/'
									//data={formData}
									onPost={(val) => {
										console.log(val);
										setFormData(val);
									}}
								/>
							</SuiBox>
						</Grid>
						<Grid item xs={12} lg={12}>
							<SuiBox ml={2} mr={2} mt={2} mb={2}>
								<Divider />
								<SuiBox mt={2} mb={2}>
									<SuiBox mb={1} lineHeight={0} display='inline-block'>
										<SuiTypography
											component='label'
											variant='caption'
											fontWeight='medium'
											textTransform='capitalize'
										>
											Title:
										</SuiTypography>
									</SuiBox>
									<SuiInput
										value={formTitle}
										placeholder='Title...'
										onChange={(event) => {
											setFormTitle(event.target.value);
										}}
									/>
								</SuiBox>
								<SuiButton
									variant='gradient'
									color='info'
									size='small'
									style={{ fontSize: '0.75rem' }}
									onClick={() => {
										if (formTitle && formData) {
											dispatch(
												saveWebform({
													formTitle,
													formData,
												})
											);
											alert.success('Successfully Saved.');
											setFormTitle('');
											//setFormData([]);
											fetchWebforms();
										} else {
											alert.error('Please input field name.');
										}
									}}
								>
									Save Form
								</SuiButton>
							</SuiBox>
						</Grid>
					</Grid>
				</Card>
			</SuiBox>

			<SuiBox mb={1} lineHeight={0} display='inline-block'>
				<SuiTypography
					component='label'
					variant='caption'
					fontWeight='large'
					textTransform='capitalize'
				>
					My Webforms:
				</SuiTypography>
			</SuiBox>

			{Object.keys(sortedWebforms).map((date, key) => (
				<DateList
					date={date}
					docs={sortedWebforms[date]}
					key={key}
					navigate={navigate}
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
		</Container>
	);
}

function DateList({ date, docs, navigate }) {
	const [designMenu, setDesignMenu] = useState(null);
	const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
	const closeDesignMenu = () => setDesignMenu(null);
	const [selectedDoc, setSelectedDoc] = useState(null);
	const dispatch = useDispatch();
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
						{date}
					</ListSubheader>
				}
			>
				{docs.map((doc, key) => (
					<ListItem button key={key}>
						<Grid container>
							<Grid item xs={12}>
								<MenuItem key={key}>
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
														//navigate(`/landlord-tools/webform-detail/${selectedDoc._id}`);
														setModalOpen(true);
													}}
												>
													Preview
												</MenuItem>
												{/* <MenuItem onClick={ () => { navigate(`/landlord-tools/webform-edit/${selectedDoc._id}`); }}>Edit</MenuItem> */}
												{/* <MenuItem onClick={ () => { navigate(`/landlord-tools/webform-delete/${selectedDoc._id}`); }}>Delete</MenuItem> */}
											</Menu>
										</SuiBox>
									</ListItem>
								</MenuItem>
							</Grid>
							<Grid item xs={12}></Grid>
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
							{selectedDoc ? selectedDoc.title : ''}
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
							{selectedDoc && (
								<ReactFormGenerator
									data={JSON.parse(selectedDoc.content).task_data}
									//toolbarItems={items}
									//onChange={handleUpdate}
									//onSubmit={handleWebformSubmit}
									//actionName="Set this to change the default submit button text"
									//submitButton={<button type="submit" className="btn btn-primary">Submit</button>}
									//backButton={<a href="/" className="btn btn-default btn-cancel btn-big">Back</a>}

									//form_action="/path/to/form/submit"
									//form_method="POST"
									//task_id={12} // Used to submit a hidden variable with the id to the form from the database.
									//answer_data={selectedWebformAnswerData} // Answer data, only used if loading a pre-existing form with values.
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

export default withRouter(DocumentWebform);
