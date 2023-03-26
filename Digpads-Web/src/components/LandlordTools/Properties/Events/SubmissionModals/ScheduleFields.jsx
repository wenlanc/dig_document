import { DateTimePicker, LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import CustomLabel from '../../Utils/DateLabel';
import React from 'react';
import { useEffect } from 'react';

function ScheduleFields({ data, setData, nature }) {
	const renderDateTime = () => {
		let render;
		switch (data?.frequency?.toString()) {
			case 'Once':
				render = <></>;
				break;
			case 'Daily':
				render = (
					<>
						<Grid item md={6}>
							<CustomLabel label={'Daily Schedule Time'} />
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<TimePicker
									value={data?.frequencyObj?.time}
									onChange={(val) =>
										setData({
											...data,
											frequencyObj: {
												...data.frequencyObj,
												time: val,
											},
										})
									}
									renderInput={(params) => (
										<TextField fullWidth {...params} />
									)}
								/>
							</LocalizationProvider>
						</Grid>
					</>
				);
				break;
			case 'Weekly':
				render = (
					<>
						<Grid item md={6}>
							<CustomLabel label={'Weekly Schedule Day'} />
							<Autocomplete
								placeholder='Frequency'
								id='frequency-autocomplete'
								options={[
									{ name: 'Every Monday', value: 1 },
									{ name: 'Every Tuesday', value: 2 },
									{ name: 'Every Wednesday', value: 3 },
									{ name: 'Every Thursday', value: 4 },
									{ name: 'Every Friday', value: 5 },
									{ name: 'Every Saturday', value: 6 },
									{ name: 'Every Sunday', value: 7 },
								]}
								getOptionLabel={(frequency) =>
									`${frequency.name}`
								}
								onChange={(e, frequency, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												frequencyObj: {
													...data.frequencyObj,
													day: frequency,
												},
										  })
										: setData({
												...data,
												frequencyObj: {
													...data.frequencyObj,
													day: null,
												},
										  })
								}
								value={data?.frequencyObj?.day}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											required
											value={data?.frequency}
											placeholder='Frequency'
											variant='outlined'
										/>
									);
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<CustomLabel label={'Weekly Schedule Time'} />
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<TimePicker
									value={data?.frequencyObj?.time}
									onChange={(val) =>
										setData({
											...data,
											frequencyObj: {
												...data.frequencyObj,
												time: val,
											},
										})
									}
									renderInput={(params) => (
										<TextField fullWidth {...params} />
									)}
								/>
							</LocalizationProvider>
						</Grid>
					</>
				);
				break;
			case 'Monthly':
				render = (
					<>
						<Grid item md={6}>
							<CustomLabel label={'Montly Schedule Day'} />
							<Autocomplete
								placeholder='Frequency'
								id='frequency-autocomplete'
								options={Array.from(
									{ length: 31 },
									(v, i) => i + 1
								)}
								getOptionLabel={(frequency) => `${frequency}`}
								onChange={(e, frequency, reason) =>
									reason === 'selectOption'
										? setData({
												...data,
												frequencyObj: {
													...data.frequencyObj,
													monthDay: frequency,
												},
										  })
										: setData({
												...data,
												frequencyObj: {
													...data.frequencyObj,
													monthDay: null,
												},
										  })
								}
								value={data?.frequencyObj?.monthDay}
								renderInput={(params) => {
									return (
										<TextField
											{...params}
											required
											value={data?.frequencyObj?.monthDay}
											placeholder='Frequency'
											variant='outlined'
										/>
									);
								}}
							/>
						</Grid>
						<Grid item md={6}>
							<CustomLabel label={'Monthly Schedule Time'} />
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<TimePicker
									value={data?.frequencyObj?.time}
									onChange={(val) =>
										setData({
											...data,
											frequencyObj: {
												...data.frequencyObj,
												time: val,
											},
										})
									}
									renderInput={(params) => (
										<TextField fullWidth {...params} />
									)}
								/>
							</LocalizationProvider>
						</Grid>
					</>
				);
				break;
			case 'Anually':
				render = (
					<Grid item md={6}>
						<CustomLabel label={'Schedule Annual Date & Time'} />
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DateTimePicker
								placeholder='Schedule Annual Date &#38; Time'
								value={data?.frequencyObj?.annualTime}
								onChange={(val) =>
									setData({
										...data,
										frequencyObj: {
											...data.frequencyObj,
											annualTime: String(val),
										},
									})
								}
								renderInput={(params) => (
									<TextField
										value={data?.frequencyObj?.annualTime}
										fullWidth
										{...params}
									/>
								)}
							/>
						</LocalizationProvider>
					</Grid>
				);
				break;
			default:
				console.log('defautl');
				render = <></>;
				break;
		}
		return render;
	};

	useEffect(() => {
		switch (data?.frequency) {
			case 'Daily':
				setData({
					...data,
					frequencyObj: {
						reocur: 'Daily',
					},
				});
				break;
			case 'Once':
				setData({
					...data,
					frequencyObj: {
						reocur: 'Once',
					},
				});
				break;
			case 'Weekly':
				setData({
					...data,
					frequencyObj: {
						reocur: 'Weekly',
					},
				});
				break;
			case 'Monthly':
				setData({
					...data,
					frequencyObj: {
						reocur: 'Monthly',
					},
				});
				break;
			case 'Anually':
				setData({
					...data,
					frequencyObj: {
						reocur: 'Anually',
					},
				});
				break;
		}
	}, [data?.frequency]);

	return nature === 'Schedule' ? (
		<>
			<Grid item md={6}>
				<CustomLabel label={'Frequency'} />
				<Autocomplete
					placeholder='Frequency'
					id='frequency-autocomplete'
					options={['Once', 'Daily', 'Weekly', 'Monthly', 'Anually']}
					getOptionLabel={(frequency) => `${frequency}`}
					onChange={(e, frequency, reason) =>
						reason === 'selectOption'
							? setData({
									...data,
									frequency,
							  })
							: setData({
									...data,
									frequency: '',
							  })
					}
					value={data?.frequency}
					renderInput={(params) => {
						return (
							<TextField
								{...params}
								required
								value={data?.frequency}
								placeholder='Frequency'
								variant='outlined'
							/>
						);
					}}
				/>
			</Grid>
			{renderDateTime()}
			<Grid item md={6}>
				<CustomLabel label={'Incurred'} />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateTimePicker
						placeholder='Incurred'
						value={data?.scheduleDate}
						onChange={(value) =>
							setData({
								...data,
								scheduleDate: String(value),
							})
						}
						renderInput={(params) => (
							<TextField
								value={data?.scheduleDate}
								fullWidth
								{...params}
							/>
						)}
					/>
				</LocalizationProvider>
			</Grid>
		</>
	) : (
		<></>
	);
}

export default ScheduleFields;
