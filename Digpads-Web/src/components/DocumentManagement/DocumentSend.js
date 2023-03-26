import React, { useEffect, useState } from 'react';

import SuiBox from 'components/SuiBox';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';
import PropTypes from "prop-types";
import SuiInput from "components/SuiInput";
import { IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
	FormControlLabel,
	Checkbox,
	Pagination,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	Grid,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../controllers/axios';

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

export default function DocumentSend(props) {

	const [webforms, setWebforms] = useState([]);
	const [sortedWebforms, setSortedWebforms] = useState({});
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	const navigate = useNavigate();
	
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

	const handleCheck = (event, id) => {
		const selectedIndex = props.selectedWebform.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(props.selectedWebform, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(props.selectedWebform.slice(1));
		} else if (selectedIndex === props.selectedWebform.length - 1) {
			newSelected = newSelected.concat(props.selectedWebform.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(props.selectedWebform.slice(0, selectedIndex), props.selectedWebform.slice(selectedIndex + 1));
		}
		props.setSelectedWebform(newSelected);
	}

	useEffect(() => { 
		if(props.title)
			props.setEmailSubject( "Sign Document : " + props.title);
	}, []); 

	return (
		<SuiBox>
			<SuiTypography variant="h5">Send Document</SuiTypography>
			<SuiBox p={2} >
				<Grid container spacing={3}>
					<Grid item xs={12} sm={8}>
						<SuiTypography  variant="h6">Message to recipients:</SuiTypography>
						<Grid container pt={1} spacing={3}>
							<Grid item xs={12} sm={12}>
								<FormField type="text" value={props.emailSubject} onChange={ (event) => props.setEmailSubject(event.target.value ) } label="Email Subject" placeholder="" />
							</Grid>
							<Grid item xs={12} sm={12}>
								<SuiBox ml={2} mt={1}>
									<FormControlLabel
										control={
											<Checkbox
												checked={
													props.possibleComment
												}
												onChange={(e, val) => {
													props.setPossibleComment(val);
												}}
											/>
										}
										label={
											<SuiTypography
												component="label"
												variant="caption"
												fontWeight="medium"
												textTransform="capitalize"
											>
												Will you send comment?
											</SuiTypography>
										}
									/>
								</SuiBox>
							</Grid>
							{ props.possibleComment && (
								<Grid item xs={12} sm={12}>
									<FormField 
										type="text" 
										multiline 
										rows={3}
										value={props.emailContent} 
										onChange={ (event) => props.setEmailContent(event.target.value ) } 
										label="Email Message" 
										placeholder="" 
									/>
								</Grid>
							)}
							
							<Grid item xs={12} sm={12}>
								<SuiTypography  variant="h6">Select webforms to send:</SuiTypography>
								{Object.keys(sortedWebforms).map((date, key) => (
									<DateList
										date={date}
										docs={sortedWebforms[date]}
										key={key}
										navigate={navigate}
										handleCheck={handleCheck}
									/>
								))}
							</Grid>
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
					</Grid>
					<Grid item xs={12} sm={4}>
						<SuiTypography variant="h6">File:</SuiTypography>
						<Grid p={1} container spacing={0.5}>
							<Grid item xs={12} sm={12}> 
								{ props.title } 
							</Grid>
						</Grid>
						<SuiTypography mt={1} variant="h6">Signers:</SuiTypography>
						<Grid p={1} container spacing={0.5}>
						{ props.signers.map((signer, index) => { 
							return (
								signer.isSender ? ( 
									<Grid pt={1} container key = {index} spacing={0.5}>
										<Grid item xs={12} sm={12}> 
											{ signer.name} 
										</Grid>
										<Grid item xs={12} sm={12}> 
											<span style={{ textDecoration:"underline"}}>{ signer.email}</span> ( Sender )
										</Grid>
								</Grid>): ( 
								<Grid pt={1} container key = {index} spacing={0.5}>
									<Grid item xs={12} sm={12}> 
										{ signer.name} 
									</Grid>
									<Grid item xs={12} sm={12}> 
										<span style={{ textDecoration:"underline"}}>{ signer.email}( {signer.role} )</span>
									</Grid>
								</Grid> ) 
							)
						} )}
						</Grid>
					</Grid>
				</Grid>
			</SuiBox>
		</SuiBox>
	);
}

function DateList({ date, docs, navigate, handleCheck }) {

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
								<ListItemIcon>
									<Checkbox color='primary' 
										onChange={
											(e) => {
												console.log(e) 
												//e.preventDefault()
												handleCheck(e, doc);
											} 
										} 
									/>
								</ListItemIcon>
								<ListItem> 
									{doc.title}
								</ListItem> 
							</MenuItem>
						</Grid>
					</Grid>
				</ListItem>
			))}
		</List>
	);
}