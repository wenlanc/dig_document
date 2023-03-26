import {
	Container,
	List,
	ListSubheader,
	ListItem,
	ListItemText,
	Grid,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { instance } from '../controllers/axios';

export default function DocumentList(props) {
	const [documents, setDocuments] = useState([]);
	const [sortedDocuments, setSortedDocuments] = useState({});
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	const fetchDocuments = (page = 1) => {
		instance
			.get(`getDocuments?page=${page}`)
			.then((res) => {
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
		documents.forEach((doc) => {
			const date = new Date(doc.createdAt).toDateString();
			sortedDocuments[date]
				? sortedDocuments[date].push(doc)
				: (sortedDocuments[date] = [doc]);
		});
		setSortedDocuments(sortedDocuments);
	}, [documents]);

	useEffect(() => {
		fetchDocuments(page);
	}, [page]);

	return (
		<Container>
			{Object.keys(sortedDocuments).map((date, key) => (
				<DateList
					date={date}
					docs={sortedDocuments[date]}
					key={key}
					history={props.history}
				/>
			))}
			<Grid container justifyContent='center'>
				<Grid item md={12}>
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

function DateList({ date, docs, history }) {
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
					onClick={() => {
						navigate(`/sign-document/${doc._id}`);
					}}
				>
					<Grid container>
						<Grid item xs={12}>
							<ListItemText primary={doc.title} />
						</Grid>
						<Grid item xs={12}>
							<div style={{ float: 'left' }}>
								{' '}
								sender : {doc.sender.email}
							</div>
							<div style={{ float: 'right' }}>
								reciver : {doc.recieverEmail}
							</div>
						</Grid>
					</Grid>
				</ListItem>
			))}
		</List>
	);
}
