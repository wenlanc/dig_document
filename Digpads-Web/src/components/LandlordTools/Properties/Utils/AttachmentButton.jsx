import { LandlordTextButton } from 'components/styled/Button';
import CustomLabel from './DateLabel';
import React from 'react';
import { Box } from '@mui/material';

export default function AttachmentButton({
	title,
	uploadHandler,
	images,
	docs,
}) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<LandlordTextButton
				color={'primary'}
				variant={'text'}
				onClick={uploadHandler}
			>
				{title || 'Attach Document/Images'}
			</LandlordTextButton>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<CustomLabel
					label={
						<Box
							sx={{
								display: 'flex',
								columnGap: 1.5,
							}}
						>
							<div>
								{images?.length > 0 &&
									'Images: ' + images?.length}
							</div>
							<div>
								{docs?.length > 0 &&
									'Documents: ' + docs?.length}
							</div>
						</Box>
					}
				/>
			</Box>
		</Box>
	);
}
