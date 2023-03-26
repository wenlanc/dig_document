import { jsPDF } from 'jspdf';
import { instance } from '../controllers/axios';

export const generatePDF = (files) => {
	var doc = new jsPDF();
	var width = doc.internal.pageSize.getWidth();
	var height = doc.internal.pageSize.getHeight();
	console.log(height / width);
	for (let i = 0; i < files.length; i++) {
		if (i !== 0) {
			doc.addPage();
		}
		console.log(files[i].type.substring(6));
		doc.addImage(
			files[i].preview,
			files[i].type.substring(6),
			0,
			0,
			width,
			height,
			i,
			'FAST' //should be used to compress images or else file size will be large
		);
	}
	files.forEach((file) => URL.revokeObjectURL(file.preview));
	return doc.output('blob', { filename: 'pdf_file' }); //what is file name
};

export const sendPdf = async (pdfToSend) => {
	let res = await instance.get(`sendPdf`, {
		data: pdfToSend,
	});
	if (res.status === 200) {
		console.log('done');
	} else {
		console.log('error');
	}
};
