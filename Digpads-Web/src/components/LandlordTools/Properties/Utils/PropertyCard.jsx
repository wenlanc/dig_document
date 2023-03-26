import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/styles';
import SuiTypography from 'components/SuiTypography';
import SimpleBackgroundCard from '../../../SimpleBackgroundCard';
const PropertyCard = ({ property }) => {
	const TitleTypography = styled(SuiTypography)({
		minWidth: 160,
		fontWeight: 'bold',
		fontSize: 16,
		color: '#000',
	});

	const ValueTypography = styled(SuiTypography)({
		fontSize: 16,
		color: '#000',
	});

	return (
		<React.Fragment>
			{property ? (
				<SimpleBackgroundCard
					action={false}
					image={
						property?.images?.length > 0
							? property?.images[0]
							: 'https://via.placeholder.com/1280?text=No%20Image%20Available'
					}
					// title={property?.propertyName}
					description={
						<Box
							width={'100%'}
							bgcolor={'#ffff'}
							borderRadius={2}
							sx={{ opacity: 0.8 }}
							px={5}
							py={1}
						>
							<Typography
								textAlign={'center'}
								fontWeight={'bold'}
								color={'#000'}
							>
								{property?.propertyName}
							</Typography>
							<Typography py={2} mx={'auto'}>
								<Typography component={'p'} display={'flex'}>
									<TitleTypography
										component={'span'}
										fontWeight={'bold'}
									>
										Type:
									</TitleTypography>{' '}
									<ValueTypography>
										{property.propertyType}
									</ValueTypography>
								</Typography>
								<Typography component={'p'}>
									<Box display={'flex'}>
										<TitleTypography
											component={'span'}
											fontWeight={'bold'}
										>
											Address:
										</TitleTypography>{' '}
										<ValueTypography component={'span'}>
											{property?.streetAddress}
										</ValueTypography>
									</Box>
								</Typography>
								<Typography component={'p'} display={'flex'}>
									<TitleTypography
										component={'span'}
										fontWeight={'bold'}
									>
										City, State, Zip:
									</TitleTypography>{' '}
									<ValueTypography>
										{property.city}, {property.state},{' '}
										{property?.zip}
									</ValueTypography>
								</Typography>
							</Typography>
						</Box>
					}
				/>
			) : (
				// <Card sx={{ minWidth: 275 }} variant='outlined'>
				// 	{property?.images?.length > 0 && (
				// 		<CardMedia
				// 			component='img'
				// 			height='140'
				// 			image={property?.images[0]}
				// 			alt={property?.propertyName}
				// 		/>
				// 	)}
				// 	<CardContent>
				// 		<Typography variant='body2' py={2} mx={'auto'}>
				// 			<Typography component={'div'} variant={'h5'} mb={2}>
				// 				<Box display={'flex'}>
				// 					<TitleTypography variant={'h5'}>
				// 						Property:
				// 					</TitleTypography>{' '}
				// 					<ValueTypography variant={'h5'}>
				// 						{property?.propertyName}
				// 					</ValueTypography>
				// 				</Box>
				// 			</Typography>
				// 			<Typography component={'p'} display={'flex'}>
				// 				<TitleTypography
				// 					component={'span'}
				// 					fontWeight={'bold'}
				// 				>
				// 					Type:
				// 				</TitleTypography>{' '}
				// 				<ValueTypography>
				// 					{property.propertyType}
				// 				</ValueTypography>
				// 			</Typography>
				// 			<Typography component={'p'}>
				// 				<Box display={'flex'}>
				// 					<TitleTypography
				// 						component={'span'}
				// 						fontWeight={'bold'}
				// 					>
				// 						Address:
				// 					</TitleTypography>{' '}
				// 					<ValueTypography component={'span'}>
				// 						{property?.streetAddress}
				// 					</ValueTypography>
				// 				</Box>
				// 			</Typography>
				// 			<Typography component={'p'} display={'flex'}>
				// 				<TitleTypography
				// 					component={'span'}
				// 					fontWeight={'bold'}
				// 				>
				// 					City, State, Zip:
				// 				</TitleTypography>{' '}
				// 				<ValueTypography>
				// 					{property.city}, {property.state},{' '}
				// 					{property?.zip}
				// 				</ValueTypography>
				// 			</Typography>
				// 		</Typography>
				// 	</CardContent>
				// </Card>
				<Card sx={{ minWidth: 275 }} variant='outlined'>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color='red'
							gutterBottom
						>
							Please select a Property above
						</Typography>
					</CardContent>
				</Card>
			)}
		</React.Fragment>
	);
};

export default PropertyCard;
