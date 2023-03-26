import React from 'react';
import { styled } from '@mui/material/styles';
import colors from 'assets/theme/base/colors';
import { LandlordButton } from 'components/styled/Button';
import { modalBoxStyles } from 'components/styled/Modal';
import { Modal, Box, Typography, Paper, Button } from '@mui/material';
import { LandlordOutlineButton } from 'components/styled/Button';

const Root = styled('div')(({ theme }) => ({
	overflowY: 'auto',
	height: '100%',
	[theme.breakpoints.up('md')]: {
		height: 'auto',
	},
}));

function ItemInfoModal({
	open,
	onClose,
	editHandler,
	header,
	type,
	body,
	width = 720,
}) {
	return (
		<Box
			sx={(theme) => {
				return {
					overflowY: 'auto',
					height: '100%',
					[theme.breakpoints.up('md')]: {
						height: 'auto',
					},
				};
			}}
		>
			<Modal open={open} onClose={onClose} tabIndex={0}>
				<Box sx={modalBoxStyles}>
					<Paper sx={{ minWidth: width, minHeight: 500 }}>
						<Box display={'flex'} flexDirection={'column'}>
							<Box
								display={'flex'}
								flexDirection={'column'}
								p={4}
								bgcolor={'#F8F9FA'}
							>
								<Typography
									component={'h3'}
									variant={'h2'}
									sx={{
										textTransform: 'capitalize',
									}}
								>
									{header}
								</Typography>
								<Typography
									variant={'small'}
									sx={{
										color: colors.primary.main,
										fontWeight: 'bold',
									}}
								>
									{type}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'column'}
								p={4}
							>
								{body}
							</Box>
							<Box
								display={'flex'}
								width={'50%'}
								justifyContent={'space-around'}
								alignItems={'center'}
								ml={'50%'}
								px={5}
								pb={5}
							>
								<LandlordOutlineButton
									sx={{
										minWidth: 100,
										color: '#ffbb00 !important',
										':hover': {
											color: '#fff !important',
										},
										':focus': {
											color: '#fff !important',
										},
									}}
									color={'warning'}
									variant={'outline'}
									onClick={editHandler}
								>
									Edit
								</LandlordOutlineButton>
								<LandlordOutlineButton
									sx={{ minWidth: 100 }}
									color={'error'}
									variant={'outline'}
									onClick={onClose}
								>
									Close
								</LandlordOutlineButton>
							</Box>
						</Box>
					</Paper>
				</Box>
			</Modal>
		</Box>
	);
}

export default ItemInfoModal;
