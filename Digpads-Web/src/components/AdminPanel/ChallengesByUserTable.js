import React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';

import { SectionSubtitle } from '../styled/Admin';

function createData(
	reviewId,
	userReviewed,
	campaign,
	dateLaunched,
	createdAt,
	dateChallenged,
	challengeType,
	statement,
	attachments
) {
	return {
		reviewId,
		userReviewed,
		campaign,
		dateLaunched,
		createdAt,
		dateChallenged,
		challengeType,
		statement,
		attachments,
	};
}

const rows = [
	createData(
		'12345abc',
		'Yes',
		'Super duper campaign',
		'2021-10-15',
		'2021-10-17',
		'2021-10-19',
		'Fake',
		'12345abc',
		'12345abc'
	),
	createData(
		'12345abc',
		'Yes',
		'Super duper campaign',
		'2021-10-15',
		'2021-10-17',
		'2021-10-19',
		'Fake',
		'12345abc',
		'12345abc'
	),
	createData(
		'12345abc',
		'Yes',
		'Super duper campaign',
		'2021-10-15',
		'2021-10-17',
		'2021-10-19',
		'Fake',
		'12345abc',
		'12345abc'
	),
	createData(
		'12345abc',
		'Yes',
		'Super duper campaign',
		'2021-10-15',
		'2021-10-17',
		'2021-10-19',
		'Fake',
		'12345abc',
		'12345abc'
	),
	createData(
		'12345abc',
		'Yes',
		'Super duper campaign',
		'2021-10-15',
		'2021-10-17',
		'2021-10-19',
		'Fake',
		'12345abc',
		'12345abc'
	),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'review-id',
		numeric: false,
		disablePadding: false,
		label: 'Review ID',
	},
	{
		id: 'user-reviewed',
		numeric: false,
		disablePadding: false,
		label: 'User Reviewed',
	},
	{
		id: 'campaign',
		numeric: false,
		disablePadding: false,
		label: 'Campaign',
	},
	{
		id: 'review-title',
		numeric: false,
		disablePadding: false,
		label: 'Review Title',
	},
	{
		id: 'date-launched',
		numeric: false,
		disablePadding: false,
		label: 'Date Launched',
	},
	{
		id: 'date-collected',
		numeric: false,
		disablePadding: false,
		label: 'Date Collected',
	},
	{
		id: 'date-challenged',
		numeric: false,
		disablePadding: false,
		label: 'Date Challenged',
	},
	{
		id: 'challenge-type',
		numeric: false,
		disablePadding: false,
		label: 'Challenge Type',
	},
];

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
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

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			<SectionSubtitle>Challenged Reviews</SectionSubtitle>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function ChallengesByUserTable() {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size='small'
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.name)}
											tabIndex={-1}
											key={index}
										>
											<TableCell>{row.reviewId}</TableCell>

											<TableCell align='left'>{row.userReviewed}</TableCell>

											<TableCell align='left'>{row.campaign}</TableCell>

											<TableCell align='left'>{row.dateLaunched}</TableCell>

											<TableCell align='left'>{row.createdAt}</TableCell>

											<TableCell align='left'>{row.dateChallenged}</TableCell>

											<TableCell align='left'>{row.challengeType}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 33 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
