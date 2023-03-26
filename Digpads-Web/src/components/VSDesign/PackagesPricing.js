import React from 'react';
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import styled from 'styled-components';

function createData(packages, price, included) {
	return { packages, price, included };
}

const rows = [
	createData('Standard', 500, 'Lorem ipsum'),
	createData('Silver', 750, 'Lorem ipsum'),
	createData('Gold', 1000, 'Lorem ipsum'),
];

const StyledTableHead = styled(TableCell)`
	color: #fff;
	border-right: 3px solid #fff;
	border-bottom: 3px solid #fff;
`;

const StyledTableCell = styled(TableCell)`
	border-right: 3px solid #fff;
	border-bottom: 3px solid #fff;
`;

function PackagesPricing() {
	return (
		<Box bgcolor='#fff' p={2} borderRadius='8px' mb={2}>
			<Typography
				variant='h5'
				component='h2'
				fontWeight='bold'
				color='#008f00'
				gutterBottom
			>
				Packages & Pricing
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableHead
								style={{
									backgroundColor: '#ffc045',
								}}
							>
								Packages/Report
							</StyledTableHead>
							<StyledTableHead
								style={{
									backgroundColor: '#333333',
								}}
								align='center'
							>
								Price
							</StyledTableHead>
							<StyledTableHead
								style={{
									backgroundColor: '#ffc045',
								}}
								align='center'
							>
								Included
							</StyledTableHead>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={row.packages}>
								<StyledTableCell
									style={{
										background:
											index % 2 === 0
												? '#f6f6f6'
												: '#e8e8e8',
									}}
								>
									{row.packages}
								</StyledTableCell>
								<StyledTableCell
									style={{
										color: '#0063c8',
										fontWeight: 'bold',
										background:
											index % 2 === 0
												? '#f6f6f6'
												: '#e8e8e8',
									}}
									align='center'
								>
									$ {row.price}
								</StyledTableCell>
								<StyledTableCell
									style={{
										background:
											index % 2 === 0
												? '#f6f6f6'
												: '#e8e8e8',
									}}
									align='center'
								>
									{row.included}
								</StyledTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default PackagesPricing;
