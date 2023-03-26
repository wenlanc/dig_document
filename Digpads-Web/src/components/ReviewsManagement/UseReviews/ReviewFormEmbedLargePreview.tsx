import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';

type IProps = {
	height: string;
	width: string;
	children: React.ReactElement;
};

export default function ReviewFormEmbedLargePreview({
	height,
	width,
	children,
}: IProps) {
	const [previewOpen, setPreviewOpen] = useState<boolean>(false);

	return (
		<div onClick={() => setPreviewOpen(!previewOpen)}>
			{React.cloneElement(children, { previewOpen })}

			<Modal open={previewOpen}>
				<Box
					className='webpage-wrapper'
					sx={{
						backgroundColor: '#c0c0c0',
						p: 2,
						height: '90vh',
						width: '80%',
						margin: '1em auto',
					}}
				>
					<p style={{ textAlign: 'center' }}>This is your web page</p>

					<Box
						sx={{
							height: `${height}px`,
							width: `${width}px`,
							mt: '3em',
							mx: 'auto',
						}}
					>
						{React.cloneElement(children, {
							largePreviewOpen: previewOpen,
						})}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
