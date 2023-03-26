import React from 'react';
import { Button, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

import EditRentalHistory from './EditRentalHistory';
import AddRentalHistory from './AddRentalHistory';

export default function MyRentalHistory({
	rentals = [],
	onAddHistory,
	onEditHistory,
}) {
	const [addingHistory, setAddingHistory] = React.useState(false);
	const [editingHistory, setEditingHistory] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState(-1);

	return (
		<section className='my-rental-history'>
			{onEditHistory && (
				<Box display='flex' justifyContent='space-between' sx={{ mb: '1em' }}>
					<Button
						variant='contained'
						size='small'
						sx={{ textTransform: 'capitalize' }}
						onClick={() => setAddingHistory(true)}
					>
						Add
					</Button>

					<Button
						variant='contained'
						size='small'
						sx={{ textTransform: 'capitalize' }}
						disabled={selectedRow === -1}
						onClick={() => {
							setEditingHistory(true);
						}}
					>
						Edit
					</Button>
				</Box>
			)}

			<TableContainer component={Paper} sx={{ mb: '1em' }}>
				<Table size='small' aria-label='my rental history table'>
					<TableHead sx={{ display: 'table-header-group' }}>
						<TableRow
							sx={{
								'& .MuiTableCell-root': {
									px: '1em',
									lineHeight: '1.4',
									color: '#c1bbbb',
									opacity: '0.7',
									fontSize: '0.65rem',
									fontWeight: '700',
									textTransform: 'uppercase',
								},
								'& .MuiTableCell-root.first': { pl: '0.5em' },
								'& .MuiTableCell-root.last': { pr: '0.5em' },
							}}
						>
							<TableCell className='first' align='left'>
								digpads<br></br>Verified
							</TableCell>

							<TableCell align='left'>Neighborhood</TableCell>

							<TableCell align='left'>
								City,<br></br>State
							</TableCell>

							<TableCell align='left'>
								Rental<br></br>Type
							</TableCell>

							<TableCell align='left'>
								Months/Years<br></br>Leased
							</TableCell>

							<TableCell align='left'>From</TableCell>

							<TableCell className='last' align='left'>
								To
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rentals.map((rental, i) => (
							<TableRow
								selected={i === selectedRow}
								onClick={() => setSelectedRow(i)}
								key={i}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
									'& .MuiTableCell-root': {
										px: '0.5em',
										fontSize: '12px',
									},
									'& input': { fontSize: '12px' },
								}}
							>
								<TableCell>
									{rental.digpadsVerified === true ? 'Yes' : 'No'}
								</TableCell>

								<TableCell>{rental.neighborhood}</TableCell>

								<TableCell
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									{`${rental.city}, ${rental.state}`}
								</TableCell>

								<TableCell>{rental.rentalType}</TableCell>

								<TableCell>
									{rental.yearsLeased > 0 && `${rental.yearsLeased} years, `}
									{`${rental.monthsLeased} months`}
								</TableCell>

								<TableCell>
									{rental.leasedFrom
										? new Date(rental.leasedFrom).toDateString()
										: ''}
								</TableCell>

								<TableCell>
									{rental.leasedTo
										? new Date(rental.leasedTo).toDateString()
										: ''}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal open={addingHistory} onClose={() => setAddingHistory(false)}>
				<>
					<AddRentalHistory onSubmit={(history) => onAddHistory(history)} />
				</>
			</Modal>

			<Modal open={editingHistory} onClose={() => setAddingHistory(false)}>
				<>
					<EditRentalHistory
						rentalHistory={rentals[selectedRow]}
						onSave={(history) => {
							onEditHistory(selectedRow, history);
							setEditingHistory(false);
						}}
						onClose={() => setEditingHistory(false)}
					/>
				</>
			</Modal>
		</section>
	);
}
