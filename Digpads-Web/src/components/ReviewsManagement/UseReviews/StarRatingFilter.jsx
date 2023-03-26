import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Typography, Checkbox } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SuiButton from 'components/SuiButton';
import SuiBox from 'components/SuiBox';

import { StyledModal } from 'components/styled/ReviewsManagement';

export default function StarRatingFilter({ ratings, onChange }) {
	const [starRatingModalOpen, setStarRatingModalOpen] = useState(false);

	const handleSelectRating = (evt, rating) => {
		const isSelected = evt.target.checked;
		onChange(isSelected, rating);
	};

	return (
		<div>
			<SuiButton onClick={() => setStarRatingModalOpen(true)} color='primary'>
				Star Rating
			</SuiButton>

			<Modal
				open={starRatingModalOpen}
				onClose={() => setStarRatingModalOpen(false)}
			>
				<StyledModal style={{ width: '400px' }}>
					<SuiBox shadow='lg' p={1} mb={2}>
						<Typography
							variant='h2'
							style={{
								fontSize: '14px',
								marginBottom: '15px',
								fontWeight: '800',
							}}
						>
							Star Ratings
						</Typography>

						<Table aria-label='star ratings' sx={{ mb: 2 }}>
							<TableHead>
								<TableRow>
									<TableCell align='left'>Select</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{ratings.map((rating, i) => (
									<TableRow key={i}>
										<TableCell
											style={{
												fontWeight: '800',
												fontSize: '14px',
											}}
										>
											{rating.starsLabel} Stars
										</TableCell>

										<TableCell align='center'>
											<Checkbox
												checked={rating.isSelected}
												onChange={(evt) => handleSelectRating(evt, rating)}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</SuiBox>

					<SuiButton
						onClick={() => setStarRatingModalOpen(false)}
						sx={{ display: 'block', ml: 'auto' }}
						color='primary'
					>
						Submit
					</SuiButton>
				</StyledModal>
			</Modal>
		</div>
	);
}
