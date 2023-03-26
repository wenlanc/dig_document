import React from 'react';
import { Grid, Stack, Modal } from '@mui/material';
import UploadLogo from './UploadLogo';
import ChooseShape from './ChooseShape';
import ChooseLocation from './ChooseLocation';
import ChooseBodyColor from './ChooseBodyColor';
import ChooseBorderColor from './ChooseBorderColor';
import ChooseHeight from './ChooseHeight';
import ChooseWidth from './ChooseWidth';

import { StyledButton, StyledModal } from 'components/styled/ReviewsManagement';

export default function ReviewFormConfig({
	reviewFormStyles = {
		bodyColor: '#fff',
		borderColor: '#fff',
		height: 'auto',
		width: 'auto',
		location: 'center center',
		shape: 'square',
		logo: '',
	},
	showLocationButton = false,
	showShapeButton = false,
	onChange,
}) {
	const [locationModalOpen, setLocationModalOpen] = React.useState(false);

	return (
		<Stack spacing={2}>
			<UploadLogo onUpload={(logo) => onChange('logo', logo)} />

			<Stack
				spacing={2}
				justifyContent='space-evenly'
				direction='row'
				alignItems='center'
			>
				{showShapeButton && (
					<ChooseShape onChange={(shape) => onChange('shape', shape)} />
				)}

				{showLocationButton && (
					<StyledButton
						component='label'
						sx={{ display: 'block', textAlign: 'center', mt: '1em' }}
						color='orange'
						circular={true}
						onClick={() => setLocationModalOpen(true)}
					>
						Choose Location
					</StyledButton>
				)}
			</Stack>

			<Grid
				container
				spacing={2}
				justifyContent='center'
				sx={{
					textAlign: 'center',
					lineHeight: '1.2',
					'& label': {
						display: 'flex',
						alignItems: 'center',
						borderRadius: '3px',
						border: 'none',
						boxShadow:
							'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
					},
				}}
			>
				<Grid item>
					<ChooseBodyColor
						bodyColor={reviewFormStyles.bodyColor}
						onChange={(color) => onChange('bodyColor', color)}
					/>
				</Grid>

				<Grid item>
					<ChooseBorderColor
						borderColor={reviewFormStyles.borderColor}
						onChange={(color) => onChange('borderColor', color)}
					/>
				</Grid>

				<Grid item>
					<ChooseHeight
						height={reviewFormStyles.height}
						onChange={(height) => onChange('height', height)}
					/>
				</Grid>

				<Grid item>
					<ChooseWidth
						width={reviewFormStyles.width}
						onChange={(width) => onChange('width', width)}
					/>
				</Grid>
			</Grid>

			<Modal
				open={locationModalOpen}
				onClose={() => setLocationModalOpen(false)}
			>
				<StyledModal padding='0'>
					<ChooseLocation
						onChange={(location) => onChange('location', location)}
						onClose={() => setLocationModalOpen(false)}
					/>
				</StyledModal>
			</Modal>
		</Stack>
	);
}
