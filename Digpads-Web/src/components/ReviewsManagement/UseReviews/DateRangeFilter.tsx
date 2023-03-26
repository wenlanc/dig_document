import React from 'react';
import styled from 'styled-components';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Typography, TextField, Box, Stack } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import SuiButton from 'components/SuiButton';
import SuiBox from 'components/SuiBox';

import {
	StyledButton,
	BorderedContainer,
	StyledLabel,
	StyledModal,
} from 'components/styled/ReviewsManagement';

export default function DateRangeFilter({
	exactDate,
	startDate,
	endDate,
	onChange,
	onClose,
}) {
	const handleDateChange = (type: 'exact' | 'start' | 'end', date: Date) => {
		onChange(type, date);
	};

	return (
		<StyledModal style={{ width: '450px' }}>
			<SuiBox shadow='lg' p='1em 0.5em' mb={2}>
				<Typography variant='h3' sx={{ fontSize: '1.5rem' }} paragraph>
					Date Range
				</Typography>

				<Box mb={2}>
					<StyledLabel>Exact Date</StyledLabel>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							inputFormat='MM/dd/yyyy'
							value={exactDate}
							onChange={(date) => handleDateChange('exact', date)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>

				<StyledLabel style={{ margin: '0' }}>Date Range</StyledLabel>

				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							inputFormat='MM/dd/yyyy'
							renderInput={(params) => <TextField {...params} />}
							value={startDate}
							onChange={(date) => handleDateChange('start', date)}
						/>
					</LocalizationProvider>

					<div style={{ margin: '0 10px', fontWeight: '800' }}>to</div>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							inputFormat='MM/dd/yyyy'
							renderInput={(params) => <TextField {...params} />}
							value={endDate}
							onChange={(date) => handleDateChange('end', date)}
						/>
					</LocalizationProvider>
				</Stack>
			</SuiBox>

			<SuiButton
				onClick={onClose}
				color='primary'
				sx={{ display: 'block', ml: 'auto' }}
			>
				Submit
			</SuiButton>
		</StyledModal>
	);
}
