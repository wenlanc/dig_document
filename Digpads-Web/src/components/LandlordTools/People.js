import React from 'react';
import { Box, Typography, TextField, Divider, Grid } from '@mui/material';
import styled from 'styled-components';
import CardListReports from './CardListReports';
import SortTable from './SortTablev2';
import { detailsListReports } from '../../constants/People';

const Heading = styled(Typography)`
	font-weight: bold;
`;

const StyledTextField = styled(TextField)`
	.MuiOutlinedInput-input {
		padding: 8px;
	}
`;

function createData(
	propertyName,
	address,
	acquiredDate,
	type,
	annualTaxes,
	monthlyCost,
	monthlyRent,
	status,
	action
) {
	return {
		propertyName,
		address,
		acquiredDate,
		type,
		annualTaxes,
		monthlyCost,
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
];

const headCells = [
	{
		id: 'first',
		numeric: false,
		disablePadding: true,
		label: 'First',
	},
	{
		id: 'middle',
		numeric: true,
		disablePadding: false,
		label: 'Middle',
	},
	{
		id: 'last',
		numeric: true,
		disablePadding: false,
		label: 'Last',
	},
	{
		id: 'usernameProfile',
		numeric: true,
		disablePadding: false,
		label: 'Username/Profile',
	},
	{
		id: 'role',
		numeric: true,
		disablePadding: false,
		label: 'Role',
	},
	{
		id: 'assignedTo',
		numeric: true,
		disablePadding: false,
		label: 'Assigned To',
	},
	{
		id: 'activities',
		numeric: true,
		disablePadding: false,
		label: 'Activities',
	},
	{
		id: 'documents',
		numeric: true,
		disablePadding: false,
		label: 'Documents',
	},
	{
		id: 'details',
		numeric: true,
		disablePadding: false,
		label: 'Details',
	},
];

function People() {
	return (
		<Box py={2}>
			<Heading variant='h3' component='h2' textAlign='center' mb={4}>
				{' '}
				People
			</Heading>
			<Box display='flex' justifyContent='flex-end' mb={2}>
				<StyledTextField style={{ height: 40 }} placeholder='Search'>
					Search
				</StyledTextField>
			</Box>
			<Box display='flex' justifyContent='space-between' mb={1}>
				<Heading variant='h4' component='h2'>
					{' '}
					Contacts
				</Heading>
			</Box>
			<SortTable rows={[]} headCells={headCells} actions />
			<Box display='inline-block' mb={2}>
				<Heading gutterBottom variant='h5' component='h2'>
					{' '}
					Details, Organization, Scheduling &#38; Recording
				</Heading>
				<Divider />
			</Box>
			<Grid container spacing={2}>
				{detailsListReports.map((report, index) => (
					<CardListReports key={index} index={index}>
						{report}
					</CardListReports>
				))}
			</Grid>
		</Box>
	);
}

export default People;
