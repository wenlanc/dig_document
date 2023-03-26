import React from 'react';
import { Box, Card, CardContent, Typography, styled } from '@mui/material';
import { nwc } from '../../../../utils/NumberUtils';

const DataCard = ({ data, name = '' }) => {
	const ValueTypography = styled(Typography)(({ theme }) => ({
		fontSize: 14,
		color: '#000',
		[theme.breakpoints.up('xxl')]: {
			fontSize: 16,
		},
	}));
	const TitleTypography = styled(Typography)(({ theme }) => ({
		minWidth: 160,
		fontWeight: 'bold',
		fontSize: 14,
		color: '#000',
		[theme.breakpoints.up('xxl')]: {
			fontSize: 16,
		},
	}));
	return (
		<React.Fragment>
			{data !== null ? (
				<Card sx={{ minWidth: 275 }} variant='outlined'>
					<CardContent>
						<Typography variant='body1' pt={2} mx={'auto'}>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
								width={'100%'}
							>
								<Box display={'flex'} alignItems={'center'}>
									<TitleTypography
										minWidth={200}
										component={'span'}
										fontWeight={'bold'}
										mr={2}
										sx={(theme) => ({
											fontSize: 16,
											[theme.breakpoints.up('xxl')]: {
												fontSize: 18,
											},
										})}
									>
										{name} Name:
									</TitleTypography>{' '}
									<ValueTypography>
										{data?.name}
									</ValueTypography>
								</Box>
								{data?.amount !== undefined &&
									(data?.amount ? (
										<Typography
											component={'p'}
											display={'flex'}
										>
											<ValueTypography>
												$ {nwc(data?.amount) || '0'}
											</ValueTypography>
										</Typography>
									) : (
										<Typography
											component={'p'}
											display={'flex'}
										>
											<ValueTypography>
												$ 0
											</ValueTypography>
										</Typography>
									))}
								{data?.policyCost !== undefined &&
									(data?.policyCost ? (
										<Typography
											component={'p'}
											display={'flex'}
										>
											<ValueTypography>
												$ {nwc(data?.policyCost) || '0'}
											</ValueTypography>
										</Typography>
									) : (
										<Typography
											component={'p'}
											display={'flex'}
										>
											<ValueTypography>
												$ 0
											</ValueTypography>
										</Typography>
									))}
							</Box>
							{data?.type && (
								<Typography component={'p'} display={'flex'}>
									<TitleTypography
										minWidth={200}
										component={'span'}
										fontWeight={'bold'}
										mr={2}
									>
										{name} Type:
									</TitleTypography>{' '}
									<ValueTypography>
										{data?.type}
									</ValueTypography>
								</Typography>
							)}
							{data?.company && (
								<Typography component={'p'}>
									<Box display={'flex'}>
										<TitleTypography
											component={'span'}
											fontWeight={'bold'}
											mr={2}
											minWidth={200}
										>
											{name} Company:
										</TitleTypography>{' '}
										<ValueTypography component={'span'}>
											{data?.company}
										</ValueTypography>
									</Box>
								</Typography>
							)}
							{data?.entity && (
								<Typography component={'p'} display={'flex'}>
									<TitleTypography
										minWidth={200}
										component={'span'}
										fontWeight={'bold'}
										mr={2}
									>
										{name} Entity:
									</TitleTypography>{' '}
									<ValueTypography>
										{data?.entity}
									</ValueTypography>
								</Typography>
							)}

							{data?.notes && (
								<Typography component={'p'} display={'flex'}>
									<TitleTypography
										minWidth={200}
										component={'span'}
										fontWeight={'bold'}
										mr={2}
									>
										{name} Notes:
									</TitleTypography>{' '}
									<ValueTypography>
										{data?.notes}
									</ValueTypography>
								</Typography>
							)}
						</Typography>
					</CardContent>
				</Card>
			) : (
				<Card sx={{ minWidth: 275 }} variant='outlined'>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color='red'
							gutterBottom
						>
							Please select a {name} above and it will populate
							here.
						</Typography>
					</CardContent>
				</Card>
			)}
		</React.Fragment>
	);
};

export default DataCard;
