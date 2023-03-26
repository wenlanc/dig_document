import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from 'styled-components';

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)`
	width: 32px;
	height: 32px;
`;

function ProcessComparison({ lists }) {
	return (
		<Box mb={2} bgcolor='#fff' p={2} borderRadius='8px'>
			<Typography
				variant='h5'
				component='h2'
				fontWeight='bold'
				color='#008f00'
				gutterBottom
			>
				Process Comparison{' '}
			</Typography>

			{lists.map((list, index) => (
				<Box key={index}>
					<Box
						borderLeft='4px solid #ebebeb'
						pl={7}
						ml={2}
						position='relative'
					>
						<Avatar
							style={{
								width: '100%',
								height: 'auto',
								zIndex: 1,
								paddingBottom: 4,
							}}
							variant='rounded'
							src={list.image}
						/>
						<Box
							bgcolor='#0063c8'
							height='4px'
							width='100%'
							position='absolute'
							top='50%'
							left='0'
							style={{ transform: 'translateY(-50%)' }}
						/>
						<Box
							bgcolor='#0063c8'
							height='32px'
							width='32px'
							borderRadius='50%'
							position='absolute'
							top='50%'
							left='-18px'
							style={{ transform: 'translateY(-50%)' }}
							display='flex'
							justifyContent='center'
							alignItems='center'
						>
							<Typography
								color='#fff'
								fontSize='24px'
								fontWeight='bold'
							>
								{' '}
								{index + 1}
							</Typography>
						</Box>
					</Box>
					<Box
						borderLeft='4px solid #ebebeb'
						pl={7}
						ml={2}
						pb={4}
						position='relative'
						height={96}
					>
						<Typography>{list.description}</Typography>
						{index !== lists.length - 1 && (
							<>
								<Box
									position='absolute'
									top='20px'
									left='-18px'
									color='#0063c8'
								>
									<StyledKeyboardArrowDownIcon />
								</Box>
								<Box
									position='absolute'
									top='28px'
									left='-18px'
									color='#0063c8'
								>
									<StyledKeyboardArrowDownIcon />
								</Box>
							</>
						)}
					</Box>
				</Box>
			))}
		</Box>
	);
}

export default ProcessComparison;
