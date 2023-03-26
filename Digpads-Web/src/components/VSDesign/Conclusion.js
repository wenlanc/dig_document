import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';

function Conclusion() {
	return (
		<Box pb={6} bgcolor='#7a7a7a'>
			<Container>
				<Grid container>
					<Grid item xs={12} md={3}>
						<Box
							bgcolor='#0063c8'
							position='relative'
							pb={2}
							px={1}
							mr={4}
							height='100%'
						>
							<SummarizeIcon
								style={{
									paddingLeft: 16,
									paddingRight: 16,
									width: '100%',
									height: 240,
									color: '#fff',
								}}
							/>
							<Typography
								position='absolute'
								bottom='10px'
								left='50%'
								style={{ transform: 'translateX(-50%)' }}
								fontWeight='bold'
								fontSize='24px'
								color='#fff'
								align='center'
							>
								CONCLUSION
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={8}>
						<Box pt={6}>
							<Typography
								fontWeight='500'
								fontSize='20px'
								color='#fff'
							>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry's standard dummy text ever since
								the 1500s, when an unknown printer took a galley
								of type and scrambled it to make a type specimen
								book. It has survived not only five centuries,
								but also the leap into electronic typesetting,
								remaining essentially unchanged. It was
								popularised in the 1960s with the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Conclusion;
