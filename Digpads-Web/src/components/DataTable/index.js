/**
=========================================================
* Soft UI Dashboard PRO React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from 'react';
import ItemInfoModal from 'components/LandlordTools/Properties/Utils/ItemInfoModal';
// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';
// react-table components
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
} from 'react-table';

// @mui material components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SuiBox from '../SuiBox';
import SuiTypography from '../SuiTypography';
import SuiSelect from '../SuiSelect';
import SuiInput from '../SuiInput';
import SuiPagination from '../SuiPagination';

// Soft UI Dashboard PRO React example components
import DataTableHeadCell from './DataTableHeadCell';
import DataTableBodyCell from './DataTableBodyCell';
import { Box, CircularProgress, TableCell, Typography } from '@mui/material';
import colors from 'assets/theme/base/colors';
import { LandlordButton } from 'components/styled/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function DataTable({
	entriesPerPage,
	canSearch,
	showTotalEntries,
	table,
	pagination,
	isSorted,
	noEndBorder,
	title,
	filter = false,
	rowClickHandler,
	loading,
	onRowClick,
	handleInfoModal,
}) {
	const [openInfoModal, setOpenInfoModal] = useState(false);
	const [infoData, setInfoData] = useState(null);
	const defaultValue = entriesPerPage.defaultValue
		? entriesPerPage.defaultValue
		: 10;
	const entries = entriesPerPage.entries
		? entriesPerPage.entries
		: [5, 10, 15, 20, 25];
	const columns = useMemo(() => table.columns, [table]);
	const data = useMemo(() => table.rows, [table]);

	const tableInstance = useTable(
		{ columns, data, initialState: { pageIndex: 0 } },
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
		page,
		pageOptions,
		canPreviousPage,
		canNextPage,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter },
	} = tableInstance;

	// Set the default value for the entries per page when component mounts
	useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

	// Set the entries per page value based on the select value
	const setEntriesPerPage = ({ value }) => setPageSize(value);

	// Render the paginations
	const renderPagination = pageOptions.map((option) => (
		<SuiPagination
			item
			key={option}
			onClick={() => gotoPage(Number(option))}
			active={pageIndex === option}
		>
			{option + 1}
		</SuiPagination>
	));

	// Handler for the input to set the pagination index
	const handleInputPagination = ({ target: { value } }) =>
		value > pageOptions.length || value < 0
			? gotoPage(0)
			: gotoPage(Number(value));

	// Customized page options starting from 1
	const customizedPageOptions = pageOptions.map((option) => option + 1);

	// Setting value for the pagination input
	const handleInputPaginationValue = ({ target: value }) =>
		gotoPage(Number(value.value - 1));

	// Search input value state
	const [search, setSearch] = useState(globalFilter);

	// Search input state handle
	const onSearchChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 100);

	// A function that sets the sorted value for the table
	const setSortedValue = (column) => {
		let sortedValue;

		if (isSorted && column.isSorted) {
			sortedValue = column.isSortedDesc ? 'desc' : 'asce';
		} else if (isSorted) {
			sortedValue = 'none';
		} else {
			sortedValue = false;
		}

		return sortedValue;
	};

	// Setting the entries starting point
	const entriesStart =
		pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

	// Setting the entries ending point
	let entriesEnd;

	if (pageIndex === 0) {
		entriesEnd = pageSize;
	} else if (pageIndex === pageOptions.length - 1) {
		entriesEnd = rows.length;
	} else {
		entriesEnd = pageSize * (pageIndex + 1);
	}

	return (
		<TableContainer sx={{ boxShadow: 'none', pb: 10 }}>
			<SuiBox
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				{filter && (
					<SuiBox px={3} width={'100%'} display={'flex'} alignItems={'center'}>
						<LandlordButton
							color={'primary'}
							variant={'contained'}
							sx={{
								minWidth: '12rem',
							}}
							onClick={() => {
								filter.handler();
							}}
						>
							Filter By Property
						</LandlordButton>
					</SuiBox>
				)}

				{canSearch && (
					<SuiBox
						display='flex'
						justifyContent='flex-start'
						alignItems='center'
						p='24px 24px 24px 0'
						width={'100%'}
					>
						{canSearch && (
							<SuiBox minWidth='35.5rem'>
								<SuiInput
									placeholder='Search...'
									value={search}
									onChange={({ currentTarget }) => {
										setSearch(search);
										onSearchChange(currentTarget.value);
									}}
								/>
							</SuiBox>
						)}
					</SuiBox>
				)}
			</SuiBox>

			<Table {...getTableProps()}>
				<SuiBox component='thead'>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<DataTableHeadCell
									{...column.getHeaderProps(
										isSorted && column.getSortByToggleProps()
									)}
									width={column.width ? column.width : 'auto'}
									align={column.align ? column.align : 'left'}
									sorted={setSortedValue(column)}
								>
									{column.render('Header')}
								</DataTableHeadCell>
							))}
						</TableRow>
					))}
				</SuiBox>

				<TableBody {...getTableBodyProps()}>
					{loading && (
						<TableRow>
							<TableCell colSpan={table?.columns?.length}>
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									width={'100%'}
								>
									<CircularProgress />
								</Box>
							</TableCell>
						</TableRow>
					)}
					{table?.rows?.length < 1 && (
						<TableRow>
							<TableCell colSpan={table?.columns?.length}>
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									width={'100%'}
								>
									<Typography align='center' color={'red'} fontSize={16}>
										{title} will be shown here once added.
									</Typography>
								</Box>
							</TableCell>
						</TableRow>
					)}
					{page.map((row, key) => {
						prepareRow(row);
						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<DataTableBodyCell
										noBorder={noEndBorder && rows.length - 1 === key}
										align={cell.column.align ? cell.column.align : 'left'}
										{...cell.getCellProps()}
									>
										{cell.render('Cell')}
									</DataTableBodyCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			<SuiBox
				display='flex'
				flexDirection={{ xs: 'column', sm: 'row' }}
				justifyContent='space-between'
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
			>
				{showTotalEntries && (
					<SuiBox mb={{ xs: 3, sm: 0 }}>
						<SuiTypography
							variant='button'
							color='primary'
							fontWeight='regular'
						>
							Showing {entriesStart} to {entriesEnd} of {rows.length} entries
						</SuiTypography>
					</SuiBox>
				)}

				<TableBody {...getTableBodyProps()}>
					{loading && (
						<TableRow>
							<TableCell colSpan={table?.columns?.length}>
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									width={'100%'}
								>
									<CircularProgress />
								</Box>
							</TableCell>
						</TableRow>
					)}

					{table?.rows?.length < 0 && (
						<TableRow>
							<TableCell colSpan={table?.columns?.length}>
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									width={'100%'}
								>
									<Typography align='center' color={'red'} fontSize={16}>
										{title} will be shown here once added.
									</Typography>
								</Box>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				{pageOptions.length > 1 && (
					<SuiPagination
						variant={pagination.variant}
						color={pagination.color ? pagination.color : 'info'}
					>
						{canPreviousPage && (
							<SuiPagination item onClick={() => previousPage()}>
								<ChevronLeftIcon />
							</SuiPagination>
						)}
						{renderPagination.length > 6 ? (
							<SuiBox width='5rem' mx={1}>
								<SuiInput
									inputProps={{
										type: 'number',
										min: 1,
										max: customizedPageOptions.length,
									}}
									value={customizedPageOptions[pageIndex]}
									onChange={(handleInputPagination, handleInputPaginationValue)}
								/>
							</SuiBox>
						) : (
							renderPagination
						)}
						{canNextPage && (
							<SuiPagination item onClick={() => nextPage()}>
								<ChevronRightIcon />
							</SuiPagination>
						)}
					</SuiPagination>
				)}
			</SuiBox>
			{entriesPerPage && (
				<SuiBox
					display='flex'
					alignItems='center'
					justifyContent={'flex-end'}
					pb={4}
					px={4}
					sx={{
						position: 'absolute',
						right: 0,
					}}
				>
					<SuiSelect
						defaultValue={{
							value: defaultValue,
							label: defaultValue,
						}}
						options={entries.map((entry) => ({
							value: entry,
							label: entry,
						}))}
						onChange={setEntriesPerPage}
						size='small'
					/>
					<SuiTypography variant='caption' color='primary'>
						&nbsp;&nbsp;entries per page
					</SuiTypography>
				</SuiBox>
			)}
		</TableContainer>
	);
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
	entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
	canSearch: false,
	showTotalEntries: true,
	pagination: { variant: 'gradient', color: 'info' },
	isSorted: true,
	noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
	entriesPerPage: PropTypes.oneOfType([
		PropTypes.shape({
			defaultValue: PropTypes.number,
			entries: PropTypes.arrayOf(PropTypes.number),
		}),
		PropTypes.bool,
	]),
	canSearch: PropTypes.bool,
	showTotalEntries: PropTypes.bool,
	table: PropTypes.objectOf(PropTypes.array).isRequired,
	pagination: PropTypes.shape({
		variant: PropTypes.oneOf(['contained', 'gradient']),
		color: PropTypes.oneOf([
			'primary',
			'secondary',
			'info',
			'success',
			'warning',
			'error',
			'dark',
			'light',
		]),
	}),
	isSorted: PropTypes.bool,
	noEndBorder: PropTypes.bool,
};

export default DataTable;
