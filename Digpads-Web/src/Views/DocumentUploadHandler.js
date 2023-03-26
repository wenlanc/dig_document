import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import {
	VerifyAndUploadDocument,
	Reorder,
	Upload,
} from 'components/Document';

export default function DocumentUpload(props) {
	const [files, setFiles] = useState([]);
	const [rejectedFiles, setRejectedFiles] = useState([]);

	// const
	const [step, setStep] = useState('upload');

	if (step === 'upload') {
		return (
			<section className='container'>
				<Upload
					files={files}
					setFiles={setFiles}
					rejectedFiles={rejectedFiles}
					setRejectedFiles={setRejectedFiles}
				/>
				<button
					onClick={() => setStep('reorder')}
					disabled={!files.length}
				>
					Next
				</button>
			</section>
		);
		//will route to upload if the files doesnt exists
	} else if (step === 'reorder' && files.length) {
		return (
			<section className='container'>
				<Reorder files={files} setFiles={setFiles} />
				<button onClick={() => setStep('upload')}>Prev</button>
				<button onClick={() => setStep('verify')}>Next</button>
			</section>
		);
	} else if (step === 'verify' && files.length) {
		return (
			<VerifyAndUploadDocument files={files} history={props.history} />
		);
	}
}
