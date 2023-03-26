import React from 'react';
import { modalBoxStyles } from 'components/styled/Modal';
import { Close } from '@mui/icons-material';
import { Modal, Box, Paper, Typography, Divider } from '@mui/material';
import DataTable from 'components/DataTable';
import { StyledMUIModal } from 'components/MuiStyled/Global';
import { ModalBox } from 'components/MuiStyled/Global';
import { ModalPaper } from 'components/MuiStyled/Global';
import { TitleBox } from 'components/MuiStyled/Global';
import { CloseBox } from 'components/MuiStyled/Global';

function ArchivedEventsModal({ open, onClose, rows, columns, title }) {
	return (
		<StyledMUIModal open={open} onClose={onClose}>
			<ModalBox style={{ minWidth: '80%' }}>
				<ModalPaper>
					<Box sx={{ position: 'relative' }}>
						<TitleBox display='flex' justifyContent='space-between'>
							<Typography variant='h4'>
								Archived Events
							</Typography>
							<CloseBox onClick={onClose}>
								<Close style={{ cursor: 'pointer' }} />
							</CloseBox>
						</TitleBox>
						<DataTable
							canSearch={true}
							// handleInfoModal={handleInfoModal}
							// filter={{
							// 	handler: () => setPropertyFilterModal(true),
							// }}
							loading={false}
							pagination={{
								color: 'primary',
								variant: 'primary',
							}}
							table={{
								columns: columns,
								rows: rows,
							}}
							title={title}
						/>
					</Box>
				</ModalPaper>
			</ModalBox>
		</StyledMUIModal>
	);
}

export default ArchivedEventsModal;
