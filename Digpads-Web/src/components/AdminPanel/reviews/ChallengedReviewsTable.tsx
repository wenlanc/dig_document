import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type IProps = {
	reviews: Review[];
	onReviewSelect: (review) => void;
};

interface Review {
	id: string;
	userReviewed: string;
	campaignName: string;
	title: string;
	reviewerEmail: string;
	createdAt: string;
	dateChallenged: string;
	challengeType: string;
}

interface HeadCell {
	label: string;
	title: string;
}

const headCells: readonly HeadCell[] = [
	{
		label: 'id',
		title: 'Review ID',
	},
	{
		label: 'userReviewed',
		title: 'User Reviewed',
	},
	{
		label: 'campaignName',
		title: 'Campaign',
	},
	{
		label: 'title',
		title: 'Title',
	},
	{
		label: 'createdAt',
		title: 'Date Collected',
	},
	{
		label: 'dateChallenged',
		title: 'Date Challenged',
	},
	{
		label: 'challengeType',
		title: 'Challenge Type',
	},
] as const;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Review
	) => void;
	order: Order;
	orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler =
		(property: keyof Review) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead sx={{ display: 'table-header-group' }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.label}
						sortDirection={orderBy === headCell.label ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.label}
							direction={orderBy === headCell.label ? order : 'asc'}
							onClick={createSortHandler(headCell.label as keyof Review)}
						>
							{headCell.title}
							{orderBy === headCell.label ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default function ChallengedReviewsTable({
	reviews,
	onReviewSelect,
}: IProps) {
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<keyof Review>(
		'status' as keyof Review
	);
	const [selectedReviewId, setSelectedReviewId] = useState<string>();
	const [page, setPage] = useState(0);
	const rowsPerPage = 4;

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Review
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// Avoid a layout jump when reaching thfree last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reviews?.length || 0) : 0;

	const comparator = getComparator(order, orderBy);

	return (
		<Paper>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 500 }} aria-label='reviews table'>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>

					<TableBody>
						{reviews
							.sort(comparator)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((review, i) => (
								<TableRow
									key={review.id}
									onClick={() => {
										setSelectedReviewId(review.id);
										onReviewSelect(review);
									}}
									sx={{
										backgroundColor:
											selectedReviewId === review.id ? 'gray' : 'transparent',
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell>{review.id}</TableCell>
									<TableCell>{review.userReviewed}</TableCell>
									<TableCell>{review.campaignName}</TableCell>
									<TableCell>{review.title}</TableCell>
									<TableCell>{review.createdAt}</TableCell>
									<TableCell>{review.dateChallenged}</TableCell>
									<TableCell>{review.challengeType}</TableCell>
								</TableRow>
							))}

						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 76 * emptyRows,
								}}
							>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				sx={{
					'& .MuiInputBase-root': {
						display: 'none !important',
					},
					'& .MuiTablePagination-selectLabel': {
						display: 'none !important',
					},
				}}
				component='div'
				count={reviews.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
			/>
		</Paper>
	);
}
