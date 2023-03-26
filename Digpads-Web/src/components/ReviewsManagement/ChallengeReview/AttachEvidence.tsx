import React, { useState, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DoneIcon from '@mui/icons-material/Done';
import styled from 'styled-components';
import { RequestStatus } from 'types';

import { uploadImages } from 'controllers/cloudinary';
import { Attachment } from 'types';

const AttachEvidenceButton = styled(LoadingButton)`
	&.MuiButton-root {
		border: 1px solid black;
		border-radius: 5px;
		font-weight: bold;
		font-size: 12px;
		color: #fff;
		padding: 0.8em;
		cursor: pointer;
		background-color: #5db932;

		.MuiLoadingButton-loadingIndicator {
			color: #fff;
		}

		&:hover {
			background-color: rgb(70 219 0);
		}
	}
`;

type AttachEvidenceProps = {
	onChange: (attachments: Attachment[]) => void;
};

export default function AttachEvidence({ onChange }: AttachEvidenceProps) {
	const [status, setStatus] = useState(RequestStatus.idle);
	const attachEvidenceInputRef = useRef(null);

	const handleAttachEvidenceButtonClick = () => {
		attachEvidenceInputRef.current.click();
	};

	const handleAttachEvidenceChange = async (evt) => {
		const files = evt.target.files;

		try {
			setStatus(RequestStatus.pending);
			const imagesData = await uploadImages(files);

			const attachments = imagesData.map((d) => ({
				format: d.format,
				url: d.secure_url,
			}));

			setStatus(RequestStatus.fulfilled);

			onChange(attachments);
		} catch (error) {
			setStatus(RequestStatus.rejected);
		}
	};

	return (
		<>
			<AttachEvidenceButton
				loading={status === 'pending'}
				loadingIndicator='Loading…'
				variant='outlined'
				endIcon={status === 'fulfilled' ? <DoneIcon /> : null}
				onClick={handleAttachEvidenceButtonClick}
				{...(status === RequestStatus.rejected ? { color: 'error' } : {})}
			>
				<span
					style={{
						display: status === RequestStatus.pending ? 'hidden' : 'visible',
					}}
				>
					Attach Any Documentary Evidence
				</span>
			</AttachEvidenceButton>

			<input
				hidden
				onChange={handleAttachEvidenceChange}
				type='file'
				name='evidence'
				id='attach-evidence'
				multiple
				ref={attachEvidenceInputRef}
			/>
		</>
	);
}
