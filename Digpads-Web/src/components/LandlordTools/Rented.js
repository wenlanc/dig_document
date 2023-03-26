import React, { useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Divider,
	Grid,
	Button,
	Paper,
} from '@mui/material';
import styled from 'styled-components';
import CardListReports from './CardListReports';
// import SortTable from './SortTable';
import { listReports } from '../../constants/Rented';
import DataTable from 'components/DataTable';
// import { LandlordButton } from 'components/styled/Button';

// const StyledButton = styled(Button)`
// 	text-transform: capitalize;
// 	color: #ffffff;
// 	background: ${(props) =>
// 		props.status === 'green'
// 			? 'rgba(46, 199, 61, 1)'
// 			: props.status === 'black'
// 			? 'rgba(30, 34, 72, 1)'
// 			: props.status === 'blue'
// 			? 'rgba(41, 37, 204, 1)'
// 			: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
// 	&:hover {
// 		background: ${(props) =>
// 			props.status === 'green'
// 				? 'rgba(46, 199, 61, 1)'
// 				: props.status === 'black'
// 				? 'rgba(30, 34, 72, 1)'
// 				: props.status === 'blue'
// 				? 'rgba(41, 37, 204, 1)'
// 				: props.status === 'gray' && 'rgba(196, 196, 196, 1)'};
// 	}
// `;

const Heading = styled(Typography)`
	font-weight: bold;
`;

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-input {
		padding: 8px;
	}
`;

function Rented() {
	const [loading, setLoading] = useState(false);
	const [rentedProperties, setRentedProperties] = useState([]);

	return (
		<Box py={2}>
			<Box width={'100%'} mb={4}>
				<Heading variant='h2' component='h2' textAlign='center'>
					{' '}
					Rented
				</Heading>
			</Box>
			{/* <Paper sx={{ pt: 4, borderRadius: 3 }}>
				<Box display='flex' justifyContent='flex-end' mb={2}>
					<StyledTextField
						style={{ height: 40 }}
						placeholder='Search'
					>
						Search
					</StyledTextField>
				</Box>
				<Box
					display='flex'
					justifyContent='space-between'
					flexWrap='wrap'
					mb={1}
				>
					<Heading variant='h4' component='h2' marginBottom={1}>
						{' '}
						Rented Properties
					</Heading>
					<Box marginBottom={1}>
						<StyledButton
							status='green'
							onClick={() => {
								alert('Sort');
							}}
						>
							Sort
						</StyledButton>
						<StyledButton
							style={{ marginLeft: 16 }}
							status='black'
							onClick={() => {
								alert('Filter');
							}}
						>
							Filter
						</StyledButton>
					</Box>
				</Box>
				<SortTable />
			</Paper> */}

			<Paper sx={{ pt: 4, borderRadius: 3 }}>
				<Box
					display='flex'
					flexDirection='row'
					justifyContent='space-between'
					px={4}
				>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Heading
							sx={{
								fontSize: 22,
							}}
						>
							Rented Properties
						</Heading>
					</Box>
				</Box>
				{/* Information Table */}
				<Box
					my={1}
					style={{
						position: 'relative',
					}}
				>
					<DataTable
						canSearch={true}
						loading={loading}
						pagination={{
							color: 'primary',
						}}
						table={{
							columns: [
								{
									Header: 'Property Name',
									accessor: 'propertyName',
								},
								{
									Header: 'Address',
									accessor: 'streetAddress',
								},
								{
									Header: 'Leased Date',
									accessor: 'leasedDate',
								},
								{
									Header: 'Lease Termination Date',
									accessor: 'leaseTerminationDate',
								},
								{
									Header: 'Tenant',
									accessor: 'tenant',
								},
								{
									Header: 'Deposit',
									accessor: 'deposit',
								},
								{
									Header: 'Monthly Rent',
									accessor: 'monthlyRent',
								},
								{
									Header: 'Status',
									accessor: 'status',
								},
								// {
								// 	Header: '',
								// 	accessor: 'status',
								// },
							],
							rows: rentedProperties,
						}}
						title={'Rented Properties'}
					/>
				</Box>
			</Paper>

			<Box display='inline-block' my={2}>
				<Heading gutterBottom variant='h5' component='h2'>
					{' '}
					Organize &#38; Manage{' '}
				</Heading>
				<Divider />
			</Box>
			<Grid container spacing={2}>
				{listReports.map((report, index) => (
					<CardListReports key={index} index={index}>
						{report}
					</CardListReports>
				))}
			</Grid>
		</Box>
	);
}

export default Rented;
