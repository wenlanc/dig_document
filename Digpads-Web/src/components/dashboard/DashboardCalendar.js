import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
	DashboardContainer,
	Calendartitle,
	CalendarBody,
	StyledTable,
	StyledTableHeader,
	StyledTableCell,
	StyledTableCellContainer,
	StyledTableRow,
} from '../styled/Calendar';
import { Grid } from '@mui/material';

function DashboardCalendar() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(7);

	const emptyRows =
		rowsPerPage -
		Math.min(
			rowsPerPage,
			(callendarData ? callendarData.length : 0) - page * rowsPerPage
		);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}
	return (
		<DashboardContainer>
			<Calendartitle>Content calendar</Calendartitle>
			<CalendarBody>
				<TableContainer>
					<StyledTable
						aria-labelledby='tableTitle'
						aria-label='enhanced table'
						size='small'
					>
						<StyledTableHeader>
							<TableRow>
								<StyledTableCell
									align='left'
									style={{ width: '160px' }}
								>
									Current Compaigns
								</StyledTableCell>
								<StyledTableCell numeric>PM</StyledTableCell>
								<StyledTableCell numeric>
									Content type
								</StyledTableCell>
								<StyledTableCell numeric>
									Content
								</StyledTableCell>
								<StyledTableCell style={{ width: '100px' }}>
									Artwork
								</StyledTableCell>
								<StyledTableCell numeric>
									Proofreading
								</StyledTableCell>
							</TableRow>
						</StyledTableHeader>
						<TableBody>
							{callendarData
								? callendarData
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((row) => {
											return (
												<StyledTableRow
													role='checkbox'
													tabIndex={-1}
													key={row.id}
													padding='checkbox'
													style={{
														cursor: 'pointer',
													}}
												>
													<StyledTableCellContainer
														component='th'
														scope='row'
													>
														{row.campaign}
													</StyledTableCellContainer>
													<StyledTableCellContainer
														component='th'
														scope='row'
													>
														<img
															src={row.PM}
															alt='user avatar'
															height='40px'
															width='40px'
															style={{
																borderRadius:
																	'50%',
															}}
														/>
													</StyledTableCellContainer>

													<StyledTableCellContainer
														component='th'
														scope='row'
													>
														{row.contentType}
													</StyledTableCellContainer>
													<StyledTableCellContainer
														component='th'
														scope='row'
													>
														{row.content}
													</StyledTableCellContainer>
													<StyledTableCellContainer>
														{row.artWork}
													</StyledTableCellContainer>
													<StyledTableCellContainer>
														{row.proofReading}
													</StyledTableCellContainer>
												</StyledTableRow>
											);
										})
								: null}
							{emptyRows > 0 && (
								<TableRow>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</StyledTable>
				</TableContainer>
				<Grid container>
					<Grid item xs={12}>
						<TablePagination
							rowsPerPageOptions={[3, 7, 15]}
							component='div'
							count={callendarData ? callendarData.length : 0}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Grid>
				</Grid>
			</CalendarBody>
		</DashboardContainer>
	);
}

const callendarData = [
	{
		campaign: "Darly's dish washers",
		PM: 'https://randomuser.me/api/portraits/men/46.jpg',
		contentType: 'Brochure',
		content: 'Done',
		artWork: 'Done',
		proofReading: "It's good",
	},
	{
		campaign: 'Our home for aged',
		PM:
			'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
		contentType: 'Webpages',
		content: 'Done',
		artWork: 'working on it',
		proofReading: 'In review',
	},
	{
		campaign: 'Everything & the kitchen',
		PM: 'https://randomuser.me/api/portraits/women/63.jpg',
		contentType: 'Flyer',
		content: 'Done',
		artWork: 'Done',
		proofReading: "It's good",
	},
	{
		campaign: 'Visit africa',
		PM: 'https://randomuser.me/api/portraits/women/26.jpg',
		contentType: 'Video',
		content: 'Done',
		artWork: 'Working on it',
		proofReading: "It's good",
	},
	{
		campaign: "Darly's dish washers",
		PM: 'https://randomuser.me/api/portraits/women/48.jpg',
		contentType: 'Brochure',
		content: 'Done',
		artWork: 'Done',
		proofReading: "It's good",
	},
	{
		campaign: "Darly's dish washers",
		PM:
			'https://images.pexels.com/photos/355164/pexels-photo-355164.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
		contentType: 'Brochure',
		content: 'Done',
		artWork: 'Done',
		proofReading: "It's good",
	},
	{
		campaign: "Darly's dish washers",
		PM: 'https://randomuser.me/api/portraits/men/49.jpg',
		contentType: 'Brochure',
		content: 'Done',
		artWork: 'Done',
		proofReading: "It's good",
	},
];

export default DashboardCalendar;
