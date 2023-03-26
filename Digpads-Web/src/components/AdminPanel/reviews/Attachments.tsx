import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import SuiButton from 'components/SuiButton';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import { Attachment } from 'types';

type Props = {
	attachments: Attachment[];
};

export default function Attachments({ attachments }: Props) {
	const [viewingImages, setViewingImages] = useState<boolean>();
	const [currentImage, setCurrentImage] = useState(0);
	const [images, setImages] = useState(filterImageAttachments(attachments));

	const [viewingPDFs, setViewingPDFs] = useState<boolean>();
	const [pdfs, setPdfs] = useState(filterPDFAttachments(attachments));

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	function gotoNextImage() {
		setCurrentImage(currentImage + 1);
	}

	function gotoPreviousImage() {
		setCurrentImage(currentImage - 1);
	}

	const handleViewImages = () => {
		if (images.length > 0) {
			setViewingImages(true);
			setViewingPDFs(false);
		} else {
			alert('There are no images');
		}
	};

	const handleViewPdfs = () => {
		if (pdfs.length > 0) {
			setViewingPDFs(true);
			setViewingImages(false);
		} else {
			alert('There are no PDFs');
		}
	};

	return (
		<>
			<Stack direction='row' spacing={2} mb={2}>
				<SuiButton color='primary' variant='outlined' onClick={handleViewPdfs}>
					PDFs ({pdfs.length})
				</SuiButton>
				<SuiButton
					color='primary'
					variant='outlined'
					onClick={handleViewImages}
				>
					Images ({images.length})
				</SuiButton>
			</Stack>

			{viewingPDFs && (
				<div>
					{filterPDFAttachments(attachments).map((attachment) => (
						<div key={attachment.url}>
							<Document
								file={attachment.url}
								onLoadSuccess={onDocumentLoadSuccess}
							>
								<Page pageNumber={pageNumber} />
							</Document>
							<p>
								Page {pageNumber} of {numPages}
							</p>

							<Stack direction='row' spacing={3} justifyContent='center'>
								<IconButton
									color='primary'
									component='span'
									onClick={() => {
										setPageNumber(pageNumber - 1 ? pageNumber - 1 : 1);
									}}
									size='large'
								>
									<ArrowLeft />
								</IconButton>

								<IconButton
									color='primary'
									component='span'
									onClick={() => {
										setPageNumber(
											pageNumber + 1 > numPages ? numPages : pageNumber + 1
										);
									}}
									size='large'
								>
									<ArrowRight />
								</IconButton>
							</Stack>
						</div>
					))}
				</div>
			)}

			{viewingImages && <ImageGallery items={images} showBullets={true} />}
		</>
	);
}

function filterImageAttachments(attachments) {
	const imgFormats = ['jpeg', 'jpg', 'png', 'tif', 'tiff', 'gif', 'bmp', 'eps'];
	const imageAttachments = [];

	attachments?.forEach((attachment) => {
		const isImage = imgFormats.some((format) =>
			attachment.format?.includes(format)
		);

		if (isImage) {
			imageAttachments.push({ original: attachment.url });
		}
	});

	return imageAttachments;
}

function filterPDFAttachments(attachments) {
	const pdfAttachments = [];

	attachments?.forEach((attachment) => {
		const isPDF = attachment.format?.includes('pdf');

		if (isPDF) {
			pdfAttachments.push(attachment);
		}
	});

	return pdfAttachments;
}
