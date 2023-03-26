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

const StyledTableCointer = styled(TableContainer)`
	margin-bottom: 16px;
`;

function createData(
	costToValue,
	productQuality,
	convenience,
	speed,
	customization,
	customerService
) {
	return {
		costToValue,
		productQuality,
		convenience,
		speed,
		customization,
		customerService,
	};
}

const StyledTableHead = styled(TableCell)`
	background: #333333;
	color: #fff;
	border-right: 3px solid #e1eefc;
`;

const StyledTableCell = styled(TableCell)`
	color: rgb(0, 99, 200);
	border-right: 3px solid #e1eefc;
	border-bottom: 3px solid #e1eefc;
`;

const rows = [createData(8, 5, 5, 4, 9, 8)];

function DigpadsRating() {
	return (
		<Box bgcolor='#fff' p={2} borderRadius='8px' mb={2}>
			<Typography
				variant='h5'
				component='h2'
				fontWeight='bold'
				gutterBottom
				color='#008f00'
			>
				Digpads rating inforgraphic table
			</Typography>
			<StyledTableCointer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableHead style={{ minWidth: 80 }}>
								Cost to Value
							</StyledTableHead>
							<StyledTableHead align='center'>
								Product Quality
							</StyledTableHead>
							<StyledTableHead align='center'>
								Convenience
							</StyledTableHead>
							<StyledTableHead align='center'>
								Speed
							</StyledTableHead>
							<StyledTableHead align='center'>
								Customization
							</StyledTableHead>
							<StyledTableHead align='center'>
								Customer Service
							</StyledTableHead>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.costToValue}>
								<StyledTableCell component='th' scope='row'>
									<Typography variant='h3' component='p'>
										{row.costToValue}
									</Typography>
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Typography variant='h3' component='p'>
										{row.productQuality}
									</Typography>
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Typography variant='h3' component='p'>
										{row.convenience}
									</Typography>
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Typography variant='h3' component='p'>
										{row.speed}
									</Typography>
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Typography variant='h3' component='p'>
										{row.customization}
									</Typography>
								</StyledTableCell>
								<StyledTableCell align='center'>
									<Typography variant='h3' component='p'>
										{row.customerService}
									</Typography>
								</StyledTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</StyledTableCointer>
			<Box display='flex' justifyContent='center'>
				<img
					style={{
						width: 20,
						height: 20,
					}}
					src='/digpads_large_shovel_only.png'
					alt='Analysis'
				/>

				<Typography fontWeight='bold' component='p'>
					digpads&nbsp;
				</Typography>
				<Typography
					style={{ textDecoration: 'underline' }}
					marginBottom='16px'
				>
					average score
				</Typography>
			</Box>
			<Box display='flex' justifyContent='center'>
				<Box
					bgcolor='#eef3fd'
					borderRadius='16px'
					border='1px dotted black'
					p={2}
					mb={2}
				>
					<Typography
						color='#0063c8'
						variant='h3'
						component='p'
						fontWeight='bold'
					>
						7.5
					</Typography>
				</Box>
			</Box>
			<Typography align='center'>This score is an average</Typography>
			<Typography align='center'>
				score of the individual scores listed above{' '}
			</Typography>
		</Box>
	);
}

export default DigpadsRating;
