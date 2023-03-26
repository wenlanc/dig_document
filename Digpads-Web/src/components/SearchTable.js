import React, { useState } from 'react';
import {
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	TablePagination,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function SearchTable(props) {
	const posts = props.data;
	const [page, setPage] = useState(0);
	const rowsPerPage = 5;

	const truncate = (source, size) => {
		const index = source.indexOf(' ', size);
		if (source.length < size || index < 0) return source;
		else return source.slice(0, index) + ' ...';
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<>
			<Typography
				variant='h6'
				style={{
					backgroundColor: 'white',
					width: '70%',
					textAlign: 'center',
					padding: '10px 0 10px 0',
				}}
			>
				Search Results for "{props.value}"
			</Typography>

			<TableContainer
				component={Paper}
				sx={{ maxHeight: 440 }}
				style={{ width: '70%' }}
			>
				<Table stickyHeader aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Title</TableCell>
							<TableCell align='center'>Posted By</TableCell>
							<TableCell align='center'>City</TableCell>
							<TableCell align='center'>State</TableCell>
							<TableCell align='center'>Date Posted</TableCell>
							<TableCell align='center'>No. of Replies</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{posts
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((post) => (
								<TableRow
									key={post.id}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
									component={Link}
									to={`/post/${post.slug}/`}
								>
									<TableCell
										component='th'
										scope='row'
										align='center'
									>
										{truncate(post.title, 30)}
									</TableCell>
									<TableCell align='center'>
										{post.author.first} {post.author.last}
									</TableCell>
									<TableCell align='center'>
										{post.city ? post.city?.name : '-'}
									</TableCell>
									<TableCell align='center'>
										{post.state ? post.state?.name : '-'}
									</TableCell>
									<TableCell align='center'>
										{post.createdAt.substring(0, 10)}
									</TableCell>
									<TableCell align='center'>
										{post.replies.length}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				style={{ backgroundColor: 'white', width: '70%' }}
				component='div'
				rowsPerPageOptions={[]}
				count={posts.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
			/>
		</>
	);
}
