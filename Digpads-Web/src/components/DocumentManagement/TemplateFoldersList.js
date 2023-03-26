import {
	Container,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	Grid,
	Checkbox,
	MenuItem,
	ListItemIcon
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { instance } from '../../controllers/axios';
import { useNavigate } from "react-router";
export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />;
	};
	return Wrapper;
};
import { useDispatch, useSelector } from 'react-redux';
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { MoreVert } from '@mui/icons-material';
import { Menu } from '@mui/material';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import { useAlert } from 'react-alert';

function TemplateFoldersList(props) {
	// const { auth } = React.useContext(authContext);
	const [folders, setFolders] = useState([]);
	const [sortedFolders, setsortedFolders] = useState({});
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const navigate = useNavigate();
	const alert = useAlert();
	const [ newFolderName,setNewFolderName ] = useState('');
	const [ newFolderDes,setNewFolderDes ] = useState('');

	const fetchTemplateFolders = (page = 1) => {
		instance
			.get(`getTemplateFolders?page=${page}`)
			.then((res) => { console.log(res)
				setFolders(res.data.folders);
				setTotalPage(res.data.totalPages);
				setPage(res.data.currentPage);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		fetchTemplateFolders();
	}, []);

	useEffect(() => {
		const sortedFolders = {};
		folders.forEach((doc) => {
			const date = new Date(doc.createdAt).toDateString();
			sortedFolders[date]
				? sortedFolders[date].push(doc)
				: (sortedFolders[date] = [doc]);
		});
		setsortedFolders(sortedFolders);
	}, [folders]);

	useEffect(() => {
		fetchTemplateFolders(page);
	}, [page]);

	const saveNewFolder = () => {
		if (newFolderName) {
			instance
				.post(`saveTemplateFolder`, {
					name: newFolderName,
					description: newFolderDes,
				})
				.then((res) => { 
					alert.success("Successfully Saved.");
					setNewFolderName("");
					setNewFolderDes("");
					fetchTemplateFolders();
				})
				.catch((e) => {
					console.log(e);
					alert.error("Failed.");
				});						
		} else {
			alert.error("Please input folder name.");
		}
	}

	return (
		<Container style={{ marginTop: "2rem" }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8}>
					{Object.keys(sortedFolders).map((date, key) => (
						<DateList
							date={date}
							docs={sortedFolders[date]}
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
				</Grid>
				<Grid item xs={12} sm={4}>
					<SuiBox mt={2} mb={2}>
						<SuiBox mt={2} mb={2}>
							<SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
								<SuiTypography
									component="label"
									variant="caption"
									fontWeight="medium"
									textTransform="capitalize"
								>
									Folder Name:
								</SuiTypography>
							</SuiBox>
							<SuiInput
								value={newFolderName}
								placeholder="Folder Name..."
								onChange={(event) => {
									setNewFolderName(event.target.value)
								}}
							/>
						</SuiBox>
						<SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
							<SuiTypography
								component="label"
								variant="caption"
								fontWeight="medium"
								textTransform="capitalize"
							>
								Description:
							</SuiTypography>
						</SuiBox>
						<SuiInput
							value={newFolderDes}
							multiline="true"
							rows={3}
							placeholder="Description..."
							onChange={(event) => {
								setNewFolderDes(event.target.value)
							}}
						/>
					</SuiBox>
					<SuiBox>
						<SuiButton variant="gradient" color="info" size="small" style={{ fontSize: "0.75rem" }}
							onClick={() => {
								saveNewFolder();
							}}
						>
							Save
						</SuiButton>
					</SuiBox>
				</Grid>
			</Grid>
		</Container >
	);
}

function DateList({ date, docs, navigate }) {

	const [designMenu, setDesignMenu] = useState(null);
	const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
  	const closeDesignMenu = () => setDesignMenu(null);
	const [selectedDoc, setSelectedDoc] = useState(null);  
	const dispatch = useDispatch();

	return (
		<List
			subheader={
				<ListSubheader component='div' id='nested-list-subheader'>
					{date}
				</ListSubheader>
			}
		>
			{docs.map((doc, key) => (
				<ListItem
					button
					key={key}
				>
					<Grid container>
						<Grid item xs={12}>
							<MenuItem key={key}>
								{/* <ListItemIcon>
									<Checkbox color='primary' onChange={ (e) => { e.preventDefault()} } defaultChecked />
								</ListItemIcon> */}

								<ListItem> 
									{doc.title}
									<SuiTypography
										color="secondary"
										onClick={ (event) => { setSelectedDoc(doc); openDesignMenu(event); }}
										sx={{
											width: "16px",
											cursor: "pointer",
										}}
										marginLeft = {'auto'}
										>
										<MoreVert />
									</SuiTypography>

									{/* onClick={() => { navigate(`/landlord-tools/document-detail/${doc._id}`) }} */}

									<SuiBox>
										<Menu
											anchorEl={designMenu}
											anchorOrigin={{ vertical: "top", horizontal: "left" }}
											transformOrigin={{ vertical: "top", horizontal: "right" }}
											open={Boolean(designMenu)}
											onClose={closeDesignMenu}
											keepMounted
											>
												{selectedDoc && selectedDoc.description}
											{/* <MenuItem onClick={ () => { navigate(`/landlord-tools/template-detail/${selectedDoc._id}`); }}>View</MenuItem> */}
										</Menu>
									</SuiBox>	
																			
								</ListItem>
							</MenuItem>
						</Grid>
						<Grid item xs={12}>
						</Grid>
					</Grid>
				</ListItem>
			))}
		</List>
	);
}

export default withRouter(TemplateFoldersList);
