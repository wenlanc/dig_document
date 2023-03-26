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

function TemplatesList(props) {
	// const { auth } = React.useContext(authContext);
	const [templates, setTemplates] = useState([]);
	const [sortedTemplates, setSortedTemplates] = useState({});
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const navigate = useNavigate();

	const fetchTemplates = (page = 1) => {
		instance
			.get(`getTemplates?page=${page}`)
			.then((res) => { console.log(res)
				setTemplates(res.data.templates);
				setTotalPage(res.data.totalPages);
				setPage(res.data.currentPage);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		fetchTemplates();
	}, []);

	useEffect(() => {
		const sortedTemplates = {};
		templates.forEach((doc) => {
			const date = new Date(doc.createdAt).toDateString();
			sortedTemplates[date]
				? sortedTemplates[date].push(doc)
				: (sortedTemplates[date] = [doc]);
		});
		setSortedTemplates(sortedTemplates);
	}, [templates]);

	useEffect(() => {
		fetchTemplates(page);
	}, [page]);

	return (
		<Container style={{ marginTop:"2rem"}}>
			{Object.keys(sortedTemplates).map((date, key) => (
				<DateList
					date={date}
					docs={sortedTemplates[date]}
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
										color="info"
										marginLeft = {'auto'}
										component="span"
										variant="caption"
										fontWeight="small"
										>
										{doc && doc.folder && doc.folder.title}
									</SuiTypography>
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
											<MenuItem onClick={ () => { navigate(`/landlord-tools/template-detail/${selectedDoc._id}`); }}>View</MenuItem>
											<MenuItem onClick={ () => { navigate(`/landlord-tools/template-detail-use/${selectedDoc._id}`); }}>Use it</MenuItem>
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

export default withRouter(TemplatesList);
