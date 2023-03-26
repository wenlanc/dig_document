import React from 'react';
import { Title } from './ScreeningProvider';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';

export default function DigpadsReview(props) {
	const { ratings, averageRating } = props;

	return (
		<>
			<Title variant='h3' green='true'>
				digpads’ Review
			</Title>

			<Typography paragraph variant='body2'>
				Based on digpads proprietary research of the brand’s offerings,
				the following ratings have been applied:
			</Typography>

			{/* Ratings table */}
			<Grid
				container
				style={{
					textAlign: 'center',
					rowGap: '2em',
					marginBottom: '2em',
				}}
			>
				{ratings &&
					ratings.map((rating, i) => (
						<Grid item key={i} xs={12} sm={6} md={2}>
							<Grid
								component={Box}
								item
								p={'1.5em 0'}
								bgcolor='black'
								color='white'
								borderRight={ratings.length - 1 === i ? 0 : 2}
								borderLeft={2}
								style={{ borderColor: '#4f4f50' }}
								fontSize={'0.7rem'}
								fontWeight={600}
							>
								{rating.heading}
							</Grid>

							<Grid
								item
								component={Box}
								color='primary.main'
								fontSize={'3rem'}
								border={1}
								borderBottom={4}
								borderRight={ratings.length - 1 === i ? 0 : 2}
								borderLeft={i === 0 ? 0 : 2}
								borderTop={0}
								style={{ borderColor: '#eef3fd' }}
							>
								{rating.value}
							</Grid>
						</Grid>
					))}
			</Grid>

			{/* Average Score */}
			<Box align='center'>
				<Box mb={'1.5em'}>
					<Box
						component='img'
						src='/logo-small.png'
						width='77px'
						mr={'0.4em'}
						style={{ verticalAlign: 'bottom' }}
					/>
					<Typography
						variant='body2'
						style={{
							color: 'gray',
							textDecoration: 'underline',
							display: 'inline',
						}}
					>
						average score
					</Typography>
				</Box>

				<Box
					border={1}
					borderColor='gray'
					borderRadius='25px'
					bgcolor='#eef3fd'
					pl={'0.3em'}
					pr={'0.3em'}
					mb={'0.3em'}
					color='primary.main'
					display='inline-block'
					fontSize={'4rem'}
					style={{
						borderStyle: 'dashed',
					}}
				>
					{averageRating}
				</Box>

				<Typography variant='body2'>
					This score is a average <br></br>score of all six of the
					individual scores listed above
				</Typography>
			</Box>
		</>
	);
}
