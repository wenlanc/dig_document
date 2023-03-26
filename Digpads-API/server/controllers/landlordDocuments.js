const { uuid } = require('uuidv4');
const path = require('path');
const fs = require('fs');
const LandlordDocument = require('../models/LandlordDocument');
const User = require('../models/User');
const saveLandlordDocument = async (body) => {
	try {
		if (!body.originalname || !body.document_path) {
			return { error: 'invalid params' };
		}
		let pdfBuffer = fs.readFileSync(body.document_path);
		await fs.writeFileSync(body.document_path, pdfBuffer);
		let user = await User.findById(body.user.id);
		let isBulkSend = body.isBulkSend;
		if (isBulkSend) {
			let bulkSenderData = JSON.parse(body.bulkSenderData);
			if (bulkSenderData && bulkSenderData.length > 0) {
				for (let i = 0; i < bulkSenderData.length; i++) {
					let document = await Edocument.create({
						sender: body.user.id,
						signers: JSON.stringify(bulkSenderData[i]),
						title: body.originalname,
						document_path: body.document_path,
						documentUrl: body.document_path,
						envelope_content: body.fields,
						emailSubject: body.emailSubject,
						emailContent: body.emailContent,
						status: body.signerStatus,
					});
					await user.sentDocuments.push(document);
					await user.save();
				}
			}
		} else {
			let document = await LandlordDocument.create({
				parent: body.parent,
				parentModel: body?.parentModel,
				user: body.user.id,
				title: body.originalname,
				documentUrl: `${process.env.REACT_APP_API_URL}${body.document_path}`,
			});
			return { success: true, document };
		}
		return { success: true };
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
};
module.exports = { saveLandlordDocument };
