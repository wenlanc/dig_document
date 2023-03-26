import React from 'react';
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
import SuiButton from 'components/SuiButton';

import { endCampaign } from 'controllers/campaigns';

type IProps = {
	campaigns: ICampaign[];
	filter: string;
	onCampaignEnded: (campaignId) => void;
};

type ICampaign = {
	id: string;
	userName: string;
	name: string;
	dateLaunched: string;
	reviewsCollected: number;
	reviewsPublished: number;
	reviewsRejected: number;
	status: string;
};

interface HeadCell {
	label: string;
	title: string;
}

const headCells: readonly HeadCell[] = [
	{
		label: 'userName',
		title: 'User Name',
	},
	{
		label: 'campaignName',
		title: 'Campaign Name',
	},
	{
		label: 'dateLaunched',
		title: 'Date Launched',
	},
	{
		label: 'reviewsCollected',
		title: 'Reviews Collected',
	},
	{
		label: 'reviewsPublished',
		title: 'Reviews Published',
	},
	{
		label: 'reviewsRejected',
		title: 'Reviews Rejected',
	},
	{
		label: 'status',
		title: 'Status',
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
		property: keyof ICampaign
	) => void;
	order: Order;
	orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
	const createSortHandler =
		(property: keyof ICampaign) => (event: React.MouseEvent<unknown>) => {
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
							onClick={createSortHandler(headCell.label as keyof ICampaign)}
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

export default function UserCampaignsByUserTable({
	campaigns,
	filter,
	onCampaignEnded,
}: IProps) {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof ICampaign>(
		'status' as keyof ICampaign
	);
	const [page, setPage] = React.useState(0);
	const rowsPerPage = 4;

	const [selectedCampaignId, setSelectedCampaignId] =
		React.useState<string>(null);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof ICampaign
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - campaigns?.length || 0)
			: 0;

	const comparator = getComparator(order, orderBy);

	const handleEndCampaignClick = async () => {
		try {
			const endedCampaign = await endCampaign(selectedCampaignId);
			onCampaignEnded(endedCampaign._id);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Paper sx={{ pb: 2 }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 500 }} aria-label='reviews table'>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>

					<TableBody>
						{campaigns
							.sort(comparator)
							.filter((campaign) => campaign.name.includes(filter))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((campaign, i) => (
								<TableRow
									key={campaign.id}
									onClick={() => {
										setSelectedCampaignId(campaign.id);
									}}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
										backgroundColor:
											selectedCampaignId === campaign.id
												? 'gray'
												: 'transparent',
									}}
								>
									<TableCell align='center'>{campaign.userName}</TableCell>

									<TableCell align='center'>{campaign.name}</TableCell>

									<TableCell align='center'>{campaign.dateLaunched}</TableCell>

									<TableCell align='center'>
										{campaign.reviewsCollected}
									</TableCell>

									<TableCell align='center'>
										{campaign.reviewsPublished}
									</TableCell>

									<TableCell align='center'>
										{campaign.reviewsRejected}
									</TableCell>
									<TableCell align='center'>{campaign.status}</TableCell>
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
				count={campaigns.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
			/>

			<SuiButton
				sx={{ ml: 'auto', mr: '1em', display: 'block' }}
				disabled={selectedCampaignId === null}
				variant='contained'
				color='warning'
				onClick={handleEndCampaignClick}
			>
				End campaign
			</SuiButton>
		</Paper>
	);
}
