import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Paper,
	IconButton,
	Tooltip,
	CircularProgress,
	Typography,
} from '@mui/material';
import {
	Delete as DeleteIcon,
	// Edit as EditIcon,
	FilterList as FilterListIcon,
	// Add as AddIcon,
} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { StyledButton } from '../../../styled/Button';

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

function EnhancedTableHead(props) {
	const { order, orderBy, onRequestSort, headCells } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={'left'}
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
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
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
			{numSelected > 0 ? (
				<Tooltip title='Delete'>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Filter list'>
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({
	rows,
	headCells,
	actions,
	tableTitle,
	loading,
}) {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('calories');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

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

	// const handleClick = (event, name) => {
	// 	const selectedIndex = selected.indexOf(name);
	// 	let newSelected = [];

	// 	if (selectedIndex === -1) {
	// 		newSelected = newSelected.concat(selected, name);
	// 	} else if (selectedIndex === 0) {
	// 		newSelected = newSelected.concat(selected.slice(1));
	// 	} else if (selectedIndex === selected.length - 1) {
	// 		newSelected = newSelected.concat(selected.slice(0, -1));
	// 	} else if (selectedIndex > 0) {
	// 		newSelected = newSelected.concat(
	// 			selected.slice(0, selectedIndex),
	// 			selected.slice(selectedIndex + 1)
	// 		);
	// 	}

	// 	setSelected(newSelected);
	// };

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	return (
		<Box mb={4} sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<Box
					px={2}
					display='flex'
					justifyContent={'center'}
					alignItems={'center'}
					py={3}
				>
					{loading ? (
						<CircularProgress />
					) : (
						<TableContainer>
							<h3>{tableTitle}</h3>
							<Table sx={{ minWidth: 750 }} size={'medium'}>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={rows.length}
									headCells={headCells}
								/>
								<TableBody>
									{rows.length === 0 ? (
										<TableRow>
											<TableCell colSpan={12}>
												<Typography align={'center'}>
													Other Costs will be shown
													here once added.
												</Typography>
											</TableCell>
										</TableRow>
									) : null}
									{stableSort(
										rows,
										getComparator(order, orderBy)
									)
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((row, index) => {
											const isItemSelected = isSelected(
												row.name
											);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													// onClick={(event) =>
													// 	handleClick(event, row.name)
													// }
													role='checkbox'
													aria-checked={
														isItemSelected
													}
													tabIndex={-1}
													key={row._id}
													selected={isItemSelected}
												>
													<TableCell
														id={labelId}
														style={{
															minWidth: 160,
														}}
													>
														{
															row.property
																?.propertyName
														}
													</TableCell>
													<TableCell
														id={labelId}
														style={{
															minWidth: 160,
														}}
													>
														{row.name}
													</TableCell>
													<TableCell
														id={labelId}
														style={{
															minWidth: 280,
														}}
													>
														{row?.notes}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					)}
					{actions && (
						<Box display='flex' flexDirection='column' ml={4}>
							<StyledButton
								style={{ marginBottom: 32 }}
								size='medium'
								status='yellow'
							>
								Filter
							</StyledButton>
							<StyledButton
								style={{ marginBottom: 32 }}
								size='medium'
								status='blue'
							>
								Actions
							</StyledButton>
							<StyledButton
								style={{ marginBottom: 32 }}
								size='medium'
								status='gray'
							>
								Select
							</StyledButton>
						</Box>
					)}
				</Box>
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
