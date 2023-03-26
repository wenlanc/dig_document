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
	Button,
	Paper,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import styled from 'styled-components';

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

function createData(
	propertyName,
	address,
	leasedDate,
	leaseTerminationDate,
	tenant,
	deposit,
	monthlyRent,
	status,
	action
) {
	return {
		propertyName,
		address,
		leasedDate,
		leaseTerminationDate,
		tenant,
		deposit,
		monthlyRent,
		status,
		action,
	};
}

const rows = [
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	createData(
		'Cleveland 1',
		'618 Cleveland Kirkwood, MO 63122',
		'10/20/2020',
		'10/20/2021',
		'Jonhson Thomas',
		'$3,000',
		'$2,000',
		''
	),
	// createData(
	// 	'Cleveland 1',
	// 	'618 Cleveland Kirkwood, MO 63122',
	// 	'10/20/2020',
	// 	'10/20/2021',
	// 	'Jonhson Thomas',
	// 	'$3,000',
	// 	'$2,000',
	// 	''
	// ),
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
		id: 'propertyName',
		numeric: false,
		disablePadding: true,
		label: 'Property Name',
	},
	{
		id: 'address',
		numeric: true,
		disablePadding: false,
		label: 'Address',
	},
	{
		id: 'leasedDate',
		numeric: true,
		disablePadding: false,
		label: 'Leased Date',
	},
	{
		id: 'leaseTerminationDate',
		numeric: true,
		disablePadding: false,
		label: 'Lease Termination Date',
	},
	{
		id: 'tenant',
		numeric: true,
		disablePadding: false,
		label: 'Tenant',
	},
	{
		id: 'deposit',
		numeric: true,
		disablePadding: false,
		label: 'Deposit',
	},
	{
		id: 'monthlyRent',
		numeric: true,
		disablePadding: false,
		label: 'Monthly Rent',
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'Status',
	},
	{
		id: 'actions',
		numeric: true,
		disablePadding: false,
		label: 'Actions',
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

export default function EnhancedTable() {
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('calories');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
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
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						size={dense ? 'small' : 'medium'}
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
							{stableSort(rows, getComparator(order, orderBy))
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											// onClick={(event) =>
											// 	handleClick(event, row.name)
											// }
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.propertyName}
											selected={isItemSelected}
										>
											<TableCell
												component='th'
												id={labelId}
												scope='row'
												padding='none'
											>
												{row.propertyName}
											</TableCell>
											<TableCell
												align='left'
												style={{ minWidth: 160 }}
											>
												{row.address}
											</TableCell>
											<TableCell align='left'>
												{row.leasedDate}
											</TableCell>
											<TableCell align='left'>
												{row.leaseTerminationDate}
											</TableCell>
											<TableCell align='left'>
												{row.tenant}
											</TableCell>
											<TableCell align='left'>
												{row.deposit}
											</TableCell>
											<TableCell align='left'>
												{row.monthlyRent}
											</TableCell>
											<TableCell align='left'>
												{row.status}
											</TableCell>
											<TableCell align='left'>
												<StyledButton
													status='gray'
													onClick={() => {
														alert('Select');
													}}
												>
													Select
												</StyledButton>
											</TableCell>
										</TableRow>
									);
								})}
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
