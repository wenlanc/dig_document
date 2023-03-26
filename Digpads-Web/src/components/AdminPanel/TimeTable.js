import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// rows = [{ name: 'Reviews Collected', content: [15, 52, 929, 195] }]

export default function TimeTable({ rows }) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead sx={{ display: 'table-header-group' }}>
					<TableRow>
						<TableCell />
						<TableCell align='center'>24 Hours</TableCell>
						<TableCell align='center'>Last Week</TableCell>
						<TableCell align='center'>Last Month</TableCell>
						<TableCell align='center'>Last Year</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows?.map((row) => (
						<TableRow
							key={row.name}
							sx={{
								'&:last-child td, &:last-child th': {
									border: 0,
								},
							}}
						>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							{row?.content.map((content, i) => (
								<TableCell key={i} align='center'>
									{content}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
