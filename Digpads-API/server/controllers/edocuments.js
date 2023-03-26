const { uuid } = require('uuidv4');
const path = require("path");
const fs = require('fs');
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit'); 
const isPDF = require('is-pdf-valid');
const signer = require('node-signpdf').default;
const { extractSignature, plainAddPlaceholder } = require("node-signpdf/dist/helpers");
const emails = require('../services/emails');
const { 
	User, 
	Edocument, 
	Signature, 
	Template, 
	Webform, 
	WebformAnswer, 
	TemplateFolder, 
	EdocumentHistory 
} = require('../models/db');
const moment = require('moment');

//const {  SUBFILTER_ETSI_CADES_DETACHED, pdfkitAddPlaceholder,plainAddPlaceholder } = require('node-signpdf');
// const plainAddPlaceholder = require("node-signpdf/dist/helpers/plainAddPlaceholder").default;
// const pdfkitAddPlaceholder = require("node-signpdf/dist/helpers/pdfkitAddPlaceholder").default;

require('dotenv').config();
const docxConverter = require('docx-pdf');

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convertWithOptions);

const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  const pa = 'uploads/edocuments';	
	  //fs.mkdirSync(pa, { recursive: true });
	  if (!fs.existsSync(pa)) {
	     fs.mkdirSync(pa);
	  }
	  cb(null, pa);
	},
	filename: (req, file, cb) => { 
		const ext = path.extname(file.originalname);
		const originalname = `${uuid()}${ext}`;
	  	cb(null, originalname);
	},
  })
  
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } }).single('file');

const saveDocument = async (body) => { 
	try {
		if (!body.originalname || !body.document_path) {
			return { error: 'invalid params' };
		}
		// adding pdf sign , placeholder 
		const p12Buffer = fs.readFileSync(`${__dirname}/../certs/certificate.p12`);
        let pdfBuffer = fs.readFileSync(body.document_path);
		// pdfBuffer = plainAddPlaceholder({
        //     pdfBuffer,
        //     reason: 'I have reviewed it.',  // location: 'test location',
        //     signatureLength: 1612,			// 1592,1612 , p12buffer.length
        // });
        // pdfBuffer = signer.sign(
		// 	pdfBuffer, 
		// 	p12Buffer,
		// 	// { asn1StrictParsing : true },
		// 	// {passphrase: 'node-signpdf'}
		// 	);  
        // const {signature, signedData} = extractSignature(pdfBuffer);

		//console.log(signature);
		//console.log(signedData);

		await fs.writeFileSync(body.document_path , pdfBuffer);
		// 
		let user = await User.findById(body.user.id);

		let isBulkSend = body.isBulkSend=='true'?true:false;
		if(isBulkSend){ 
			let bulkSenderData = JSON.parse(body.bulkSenderData);
			if(bulkSenderData && bulkSenderData.length>0){
				for(let i=0;i<bulkSenderData.length;i++){

					let senderData = bulkSenderData[i];
					let senderDataObj = {};
					for( let m=0; m < senderData.length; m++){
						senderDataObj[senderData[m].role] = senderData[m];
					}

					let fields = JSON.parse(body.fields);
					for( let n=0; n < fields.length; n++){
						fields[n].signerName.value = senderDataObj[fields[n].signerName.value.role];
					}

					let document = await Edocument.create({ 
						sender: body.user.id,
						signers: JSON.stringify(bulkSenderData[i]),
						title:body.originalname,  
						document_path : body.document_path,
						documentUrl : body.document_path,
						envelope_content : JSON.stringify(fields),
						emailSubject : body.emailSubject,
						emailContent: body.emailContent,
						status : body.signerStatus,
						webforms: body.webforms,
						possibleComment: body.possibleComment,
					});
					await user.sentDocuments.push(document);
					await user.save();

					await EdocumentHistory.create({ 
						document: document._id,
						user: user._id,
						email: user.email,  
						action : "sent",
						role : "sender",
					});
			
					if( bulkSenderData[i].length > 0 ){
						// send email to recievers
						bulkSenderData[i].forEach(async (signer) => { 
							await emails.sendDocument({
								email: signer.email,
								documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
									document._id
								)}`, // /landlord-tools/document-detail/,  /sign-document/
								first: signer.name,
								last: '',
							});
							if (signer.email != user.email) {
								await EdocumentHistory.create({ 
									document: document._id,
									//user: signer._id,
									email: signer.email,  
									action : "received",
									role : "receiver",
								});
							}
						});
					}
				}
			}
		} else { 
			let document = await Edocument.create( { 
				sender: body.user.id,
				signers: body.signers,
				title:body.originalname,  
				document_path : body.document_path,
				documentUrl : body.document_path,
				envelope_content : body.fields,
				emailSubject : body.emailSubject,
				emailContent: body.emailContent,
				status : body.signerStatus,
				webforms: body.webforms,
				possibleComment: body.possibleComment,
			});
			await user.sentDocuments.push(document);
			await user.save();
	
			await EdocumentHistory.create({ 
				document: document._id,
				user: user._id,
				email: user.email,  
				action : "sent",
				role : "sender",
			});

			if( body.signers ){
				let signers = JSON.parse(body.signers);
				console.log(signers)
				if (signers) {
					// send email to recievers
					signers.forEach(async (signer) => { console.log(signer)
						await emails.sendDocument({
							email: signer.email,
							documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
								document._id
							)}`, // /landlord-tools/document-detail/,  /sign-document/
							first: signer.name,
							last: '',
						});
						if (signer.email != user.email) {
							await EdocumentHistory.create({ 
								document: document._id,
								//user: signer._id,
								email: signer.email,  
								action : "received",
								role : "receiver",
							});
						}
					});
				}
			}
			
			return { success: true };
		}
		return { success: true };
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
};

const updateDocument = async (body) => {
	try {
		if (!body.document_id) {
			return { error: 'invalid params' };
		}
		let edocument = await Edocument.findById(body.document_id);
		let user = await User.findById(body.user.id);
		if(body.action == 'accept') {
			edocument.envelope_content = body.fields;
			let allSigned = true;
			let signers = JSON.parse(edocument.signers);
			let signerIndex = 0;
			if( signers && signers.length ) {
				for( let i = 0 ; i < signers.length; i++) {
					if(signers[i].email == user.email){
						signers[i].status = 'Signed';
						signers[i].comment = body.comment;
						signerIndex = i;
					}
					if(!signers[i].status || (signers[i].status != "Signed" && signers[i].status != "Sent")){
						allSigned = false;
					}
				}
			}

			await EdocumentHistory.create({ 
				document: body.document_id,
				user: user._id,
				email: user.email,  
				action : "accept",
				role : "receiver",
			});

			if(allSigned){
				await updateDocumentConfirm(body);
				edocument.isConfirmed = true;
			} else {
				if(edocument.isSetSignerOrder && signerIndex < signers.length-1){
					let signer = signers[signerIndex+1];
					await emails.sendDocument({
						email: signer.email,
						documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
							edocument._id
						)}`, // /landlord-tools/document-detail/,  /sign-document/
						first: signer.name,
						last: '',
					});
					if (signer.email != user.email) {
						await EdocumentHistory.create({ 
							document: edocument._id,
							//user: signer._id,
							email: signer.email,  
							action : "received",
							role : "receiver",
						});
					}
				}
			}
			edocument.signers = JSON.stringify(signers);
			await edocument.save();

			if (signers && signers.length) {
				for (let i = 0; i < signers.length; i++) {
					if (signers[i].email != user.email && signers[i].status) {
						await emails.sendDocument({
							email: signers[i].email,
							documentUrl: `${
								process.env.ORIGIN_URL
							}/landlord-tools/document-detail/${String(edocument._id)}`, // /landlord-tools/document-detail/,  /sign-document/
							first: signers[i].name,
							last: '',
						});
					}
				}
			}

		} else if (body.action == 'reject') {
			let signers = JSON.parse(edocument.signers);
			let signerIndex = 0;
			if (signers && signers.length) {
				for (let i = 0; i < signers.length; i++) {
					if (signers[i].email == user.email) {
						signers[i].status = 'Rejected';
						signers[i].comment = body.comment;
						signerIndex = i;
					}
				}
			}
			edocument.signers = JSON.stringify(signers);
			await edocument.save();
			await EdocumentHistory.create({
				document: body.document_id,
				user: user._id,
				email: user.email,
				action: 'reject',
				role: 'receiver',
			});

			if(edocument.isSetSignerOrder && signerIndex < signers.length-1){
				let signer = signers[signerIndex+1];

				await emails.sendDocument({
					email: signer.email,
					documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
						edocument._id
					)}`, // /landlord-tools/document-detail/,  /sign-document/
					first: signer.name,
					last: '',
				});
				
				if (signer.email != user.email) {
					await EdocumentHistory.create({ 
						document: edocument._id,
						//user: signer._id,
						email: signer.email,  
						action : "received",
						role : "receiver",
					});
				}
			}

			if (signers && signers.length) {
				for (let i = 0; i < signers.length; i++) {
					if (signers[i].email != user.email && signers[i].status) {
						await emails.sendDocument({
							email: signers[i].email,
							documentUrl: `${
								process.env.ORIGIN_URL
							}/landlord-tools/document-detail/${String(edocument._id)}`, // /landlord-tools/document-detail/,  /sign-document/
							first: signers[i].name,
							last: '',
						});
					}
				}
			}
			
		} else if (body.action == 'use_template') {
			let template = await Template.findById(body.document_id);

			let pdfBuffer = fs.readFileSync(template.document_path);
			const ext = path.extname(template.document_path);
			const originalname = `${uuid()}${ext}`;
			await fs.writeFileSync('uploads/edocuments/' + originalname, pdfBuffer);

			let document = await Edocument.create({
				sender: body.user.id,
				signers: body.signers,
				title: template.title,
				document_path: 'uploads/edocuments/' + originalname,
				documentUrl: 'uploads/edocuments/' + originalname,
				envelope_content: template.envelope_content,
				emailSubject: body.emailSubject,
				emailContent: body.emailContent,
				status: body.signerStatus,
			});
			await user.sentDocuments.push(document);
			await user.save();

			await EdocumentHistory.create({
				document: document._id,
				user: user._id,
				email: user.email,
				action: 'sent',
				role: 'sender',
			});

			if (body.signers) {
				let signers = JSON.parse(body.signers);
				if (signers) {
					// send email to recievers
					signers.forEach(async (signer) => {
						console.log(signer);
						await emails.sendDocument({
							email: signer.email,
							documentUrl: `${
								process.env.ORIGIN_URL
							}/landlord-tools/document-detail/${String(document._id)}`, // /landlord-tools/document-detail/,  /sign-document/
							first: signer.name,
							last: '',
						});
						if (signer.email != user.email) {
							await EdocumentHistory.create({
								document: document._id,
								//user: signer._id,
								email: signer.email,
								action: 'received',
								role: 'receiver',
							});
						}
					});
				}
			}
		}
		
		return { success: true };
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
}; 

const updateDocumentConfirm = async (body) => {
	try {

		if (!body.document_id) {
			return { error: 'invalid params' };
		}
		let edocument = await Edocument.findById(body.document_id);
		// Pdf file editing with added fields , sign

		const pdfDoc = await PDFDocument.load(fs.readFileSync(edocument.documentUrl),{ ignoreEncryption: true });
		const pages = pdfDoc.getPages()
		const firstPage = pdfDoc.getPage(0);
		pdfDoc.registerFontkit(fontkit);
		// Get the width and height of the first page
		const { width, height } = firstPage.getSize();
		const courierBoldFont = await pdfDoc.embedFont(StandardFonts.Courier);
		let array = JSON.parse(body.fields);

		for( let i=0;i<array.length;i++){
			let item = array[i];
			if(item.element_type == "signature") {
				if( item.property.source ) {
					const pngImage = await pdfDoc.embedPng(item.property.source)
					//const pngDims = pngImage.scale(1)
					pdfDoc.getPage(item.page-1).drawImage(pngImage, {
						x:  item.left,
						y:  height - item.top - item.height,
						width: item.width,
						height: item.height,
					  })
				}
			} else if( item.element_type == "image" ) {

				if( item.property.source ) {
					const pngImage = await pdfDoc.embedPng(item.property.source)
					//const pngDims = pngImage.scale(0.1)
					pdfDoc.getPage(item.page-1).drawImage(pngImage, {
						x:  item.left,
						y:  height - item.top - item.height,
						width: item.width,
						height: item.height,
					  })
				}

			} else if( item.element_type == "text" ) {

				let textFont = courierBoldFont;
				if(item.property && item.property.fontType)
				{
					const customFont = fs.readFileSync("fonts\\"+item.property.fontType.replace(/\s/g, "") + "-Regular.ttf");
					textFont = await pdfDoc.embedFont(customFont);
				}
				let text = item.property.text || item.title;
				if( text ) {
					pdfDoc.getPage(item.page-1).drawText( text , {
						x: item.left,
						y: height - item.top - item.height,
						size: item.property.fontSize ? item.property.fontSize : 16,
						font: textFont,
						//color: rgb(0.95, 0.1, 0.1),
						//rotate: degrees(-45),
						});
				}
			} else if( item.element_type == "label" ) {
				let text = item.property.text || item.title;
				if( text ) {
					if(item.property.propertyUsingBrand){
						for(let iPage=0;iPage<pages.length;iPage++){
							pdfDoc.getPage(iPage).drawText( text , {
								x: item.left,
								y: height - item.top - item.height,
								size: 18,
								font: courierBoldFont,
								//color: rgb(0.95, 0.1, 0.1),
								//rotate: degrees(-45),
								});
						}
					} else {
						pdfDoc.getPage(item.page-1).drawText( text , {
							x: item.left,
							y: height - item.top - item.height,
							size: 18,
							font: courierBoldFont,
							//color: rgb(0.95, 0.1, 0.1),
							//rotate: degrees(-45),
							});
					}
				}
			} else if( item.element_type == "date" ) {
				var parsedDate = Date.parse(item.property.text);
				if (isNaN(item.property.text) && !isNaN(parsedDate)) {
					pdfDoc.getPage(item.page-1).drawText( item.property.text , {
						x: item.left,
						y: height - item.top - item.height,
						size: 18,
						font: courierBoldFont,
						//color: rgb(0.95, 0.1, 0.1),
						//rotate: degrees(-45),
						});
				}
			} else if(item.element_type == "branding") {
				if(item.property && item.property.brandType == 'text') {
					for(let iPage=0;iPage<pages.length;iPage++){
						pdfDoc.getPage(iPage).drawText( item.property.text , {
							x: item.left,
							y: height - item.top - item.height,
							size: 18,
							font: courierBoldFont,
							//color: rgb(0.95, 0.1, 0.1),
							//rotate: degrees(-45),
							});
					}
				} else {
					if( item.property && item.property.source ) {
						const pngImage = await pdfDoc.embedPng(item.property.source)
						for(let iPage=0;iPage<pages.length;iPage++){
							//const pngDims = pngImage.scale(0.1)
							pdfDoc.getPage(iPage).drawImage(pngImage, {
								x:  item.left,
								y:  height - item.top - item.height,
								width: item.width,
								height: item.height,
							})
						}
					}
				}
			}
		}

		// Audit timestamp... 
		pdfDoc.addPage();
		const lastPage = pages.length;

		//let signers = JSON.parse(edocument.signers);

		const historys = await EdocumentHistory.find({
			$or: [{ document: edocument._id }],
		})
			.populate({
				path : 'document',
				populate : {
					path : 'sender'
				}
			})
			.sort({ createdAt: 1 })
			.exec();


		let fieldsData = [];
		let index = 0;
		let firstLeft = 30;
		let firstWidth = 300;
		let spaceWidth = 20;
		let secondLeft = firstLeft + firstWidth + spaceWidth;
		let secondWidth = 120;
		let thirdLeft = secondLeft + secondWidth + spaceWidth;
		let thirdWidth = 200;
		let spaceHeight = 40;
		let pageHeight = 710;	

		pdfDoc.getPage(lastPage).drawText( "Audits" , {
			x: firstLeft,
			y: pageHeight,
			size: 18,
			font: courierBoldFont,
			//color: rgb(0.95, 0.1, 0.1),
			//rotate: degrees(-45),
			});	

		for (let i=0; i < historys.length; i++) {
			let history = historys[i];
			if(history.createdAt)	
				pdfDoc.getPage(lastPage).drawText( moment(history.createdAt).format('YYYY-MM-DD') , {
					x: secondLeft,
					y: pageHeight - (spaceHeight * i + 20),
					size: 14,
					font: courierBoldFont,
					//color: rgb(0.95, 0.1, 0.1),
					//rotate: degrees(-45),
					});	
			if(history.email)	
				pdfDoc.getPage(lastPage).drawText( history.email , {
					x: firstLeft,
					y: pageHeight - (spaceHeight * i + 20),
					size: 14,
					font: courierBoldFont,
					//color: rgb(0.95, 0.1, 0.1),
					//rotate: degrees(-45),
					});
			if(history.action)	
				pdfDoc.getPage(lastPage).drawText( history.action , {
					x: thirdLeft,
					y: pageHeight - (spaceHeight * i + 20),
					size: 14,
					font: courierBoldFont,
					//color: rgb(0.95, 0.1, 0.1),
					//rotate: degrees(-45),
					});	

		}

		// for (let i=0; i < signers.length; i++) {
		// 	let signer = signers[i];
		// 	if(signer.date)	
		// 		pdfDoc.getPage(lastPage).drawText( signer.date , {
		// 			x: secondLeft,
		// 			y: spaceHeight * 1 + 20,
		// 			size: 18,
		// 			font: courierBoldFont,
		// 			//color: rgb(0.95, 0.1, 0.1),
		// 			//rotate: degrees(-45),
		// 			});	
		// 	if(signer.name)	
		// 		pdfDoc.getPage(lastPage).drawText( signer.name , {
		// 			x: firstLeft,
		// 			y: spaceHeight * 1 + 20,
		// 			size: 18,
		// 			font: courierBoldFont,
		// 			//color: rgb(0.95, 0.1, 0.1),
		// 			//rotate: degrees(-45),
		// 			});
		// 	if(signer.role)	
		// 		pdfDoc.getPage(lastPage).drawText( signer.role , {
		// 			x: secondLeft,
		// 			y: spaceHeight * 1 + 20,
		// 			size: 18,
		// 			font: courierBoldFont,
		// 			//color: rgb(0.95, 0.1, 0.1),
		// 			//rotate: degrees(-45),
		// 			});	

		// }

		let pdfData = await pdfDoc.save({ useObjectStreams: false } );
		await fs.writeFileSync(edocument.documentUrl , pdfData);
		//await fs.writeFileSync(body.document_path , pdfBuffer);

		// adding pdf sign , placeholder 

		const p12Buffer = fs.readFileSync(`${__dirname}/../certs/certificate.p12`);

        let pdfBuffer = fs.readFileSync(edocument.documentUrl);

		// reason: 'Signed Certificate.',
		// contactInfo: 'sign@example.com',
		// name: 'Example',
		// location: 'Jakarta',
		// signatureLength: certBuffer.length,

		pdfBuffer = plainAddPlaceholder({
            pdfBuffer,
            reason: 'Signed Certificate.',  // location: 'test location',
            signatureLength: 1612,			//  1612 1592
			contactInfo: 'andy@digpads.com',
			name: 'Digpads Document Sign',
		    location: 'Unknown'
        });

        pdfBuffer = signer.sign(pdfBuffer, p12Buffer);  // , {passphrase: 'node-signpdf'}

        //const {signature, signedData} = extractSignature(pdfBuffer);
		//console.log(signature, signedData)
		//const signature2 = signer.lastSignature;

		//const {
        //    signature: secondSignature,
        //    signedData: secondSignatureData,
        //} = extractSignature(pdfBuffer, 2);

		await fs.writeFileSync(edocument.documentUrl , pdfBuffer);
		
		//edocument.envelope_content = body.fields;
		//edocument.isConfirmed = true;
		//await edocument.save();
		
		// https://www.npmjs.com/package/@ninja-labs/verify-pdf
		return { success: true };
		
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
};

const getDocument = async (body) => {
	try {
		if (!body.documentId) {
			return { error: 'invalid params' };
		}
		let document = await Edocument.findById(body.documentId).populate(
			'sender',
			'first last'
		).lean();

		if (!document) {
			return { error: 'Document not found' };
		} else {

			if( document.isConfirmed ) {
				let signedPdfBuffer = fs.readFileSync(document.document_path);
				const validPDF = isPDF(signedPdfBuffer);

				if (!validPDF) {
					console.error('Invalid PDF');
				}
			}

			if (document.webforms) {
				let webform_ids = JSON.parse(document.webforms);
				let webformsData = await Webform.find().where('_id').in(webform_ids).exec();
			
				Object.assign(document, {webformsData});
			}

			let webformsAnswerData = await WebformAnswer.find(
				{
					documentId: body.documentId
				}
			).populate([{path: 'userId', select: 'email'}, {path: 'webformId', select: 'title content'}]).exec();
			Object.assign(document, {webformsAnswerData});

			//if (document.sender.id === body.user.id) return document;

			// if (!document.reciever) {
			// 	let user = await User.findById(body.user.id);
			// 	if (user.email !== document.recieverEmail) {
			// 		return { error: 'Unauthorized' };
			// 	}
			// 	document.reciever = body.user.id;
			// 	await document.save();
			// } else {
			// 	if (document.reciever != body.user.id) {
			// 		return { error: 'Unauthorized' };
			// 	}
			// }
			return document;
		}
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return { error: 'internal sever error' };
	}
};

const getDocuments = async ({ page, limit, user, filter }) => {
	try {
		let user1 = await User.findById(user.id);
		if (filter && filter == "received") {
			const documents = await EdocumentHistory.find({
				$and: [{ email: user1.email }, { action: "received" }],
			})
				.populate({
					path : 'document',
					populate : {
						path : 'sender'
					}
				})
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 })
				.exec();
	
			const count = await EdocumentHistory.countDocuments({
				$and: [{ email: user.email }, { action: "received" }],
			});
	
			return {
				documents,
				totalPages: Math.ceil(count / limit),
				currentPage: page,
				limit,
			};
		} else {
			const documents = await Edocument.find({
				$or: [{ sender: user.id }],
			})
				.populate('sender', 'email first last')
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.sort({ createdAt: -1 })
				.exec();
	
			const count = await Edocument.countDocuments({ sender: user.id });
	
			return {
				documents,
				totalPages: Math.ceil(count / limit),
				currentPage: page,
				limit,
			};
		}
	} catch (e) {
		console.log(e);
	}
};

const combineDocuments = async (req, res, next) => {
	let edocuments = req.body.data;
	try {

		if (!edocuments || edocuments.length<2) {
			return res.status(200).json({ error: 'invalid params' }); 
		}
		// Create a new document
		const combineDoc = await PDFDocument.create();
		let tempDoc;
		
		for( let i=0;i<edocuments.length; i++) { 
			let doc = edocuments[i];
			tempDoc = await PDFDocument.load(fs.readFileSync(doc.document_path),{ ignoreEncryption: true });
			const contentPages = await combineDoc.copyPages(tempDoc, tempDoc.getPageIndices());
			for (const page of contentPages) {
				combineDoc.addPage(page);
			}
		}

		let combine_path = `uploads/edocuments/combine${Date.now()}.pdf`;
		// Write the PDF to a file
		fs.writeFileSync( combine_path, await combineDoc.save());
		let user = await User.findById(req.user.id);
		//let receiverEmails = body.receiverEmails.split(',');
		let document = await Edocument.create( { 
			sender: req.user.id,
			recieverEmail: '',
			title:'combined',  
			document_path : combine_path,
			documentUrl : combine_path,
			envelope_content : ''

		});
		await user.sentDocuments.push(document);
		await user.save();
		return res.status(200).json({ success: true });
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const saveSignature = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let signature = await Signature.create( { 
			title: req.body.title,  
			content : req.body.fields,
			creator : req.user.id
		});
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const saveCustomField = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let signature = await Signature.create( { 
			title: req.body.title,  
			content : req.body.fields,
			creator : req.user.id
		});
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const getSavedSignatures = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let signatures = await Signature.find( { 
			creator : req.user.id
		}).sort({ createdAt: -1 })
		.exec();;
		return res.status(200).json(signatures);
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const removeSavedSignature = async (req, res, next) => {
	try {
		let signature = await Signature.findOne( { 
			_id : req.body.id
		});
		await signature.remove();
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const processQuickSend_old = async (req, res, next) => {
	try {

		upload(req, res, async function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err)
			} else if (err) {
				console.log(err)
				return res.status(500).json(err)
			}

			let body = req.body;
			body.user = req.user;
			body.originalname = req.file.originalname;
			body.filename = req.file.filename;
			body.document_path = req.file.path;
			if (!body.originalname || !body.document_path) {
				return { error: 'invalid params' };
			}

			let pdfBuffer = fs.readFileSync(body.document_path);
			let uploadedPdf = await PDFDocument.load(pdfBuffer);
			uploadedPdf.addPage();
			pdfBuffer = await uploadedPdf.save();
			fs.writeFileSync(body.document_path , pdfBuffer);
			const lastPage = uploadedPdf.getPages().length;
			let signers = JSON.parse(body.signers);

			let fieldsData = [];
			let index = 0;
			let firstLeft = 50;
			let firstWidth = 150;
			let spaceWidth = 20;
			let secondLeft = firstLeft + firstWidth + spaceWidth;
			let secondWidth = 150;
			let thirdLeft = secondLeft + secondWidth + spaceWidth;
			let thirdWidth = 200;
			let spaceHeight = 50;

			let user = await User.findById(body.user.id);

			const userSignature = await Signature.find({
				$or: [{ creator: user._id }],
			})
				.limit(1)
				.sort({ createdAt: 1 })
				.exec();
			let userSignatureData = {}; 
			if( userSignature && userSignature.length > 0 ) {
				userSignatureData = JSON.parse(userSignature[0].content).property;
			}

			for (let i=0; i < signers.length; i++) {
				if( signers[i].email == user.email) {
					fieldsData.push(
						{
							page: lastPage,
							left: firstLeft,
							top: i * spaceHeight + 20,
							element_type: "label",
							title: signers[i].name,
							property: {},
							width: firstWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id:index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: secondLeft,
							top: i * spaceHeight + 20,
							element_type: "date",
							title: "",
							property: { text: moment().format('YYYY-MM-DD') },
							width: secondWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: thirdLeft,
							top: i * spaceHeight + 20,
							element_type: "signature",
							title: "",
							property: userSignatureData,
							width: thirdWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
				} else {
					fieldsData.push(
						{
							page: lastPage,
							left: firstLeft,
							top: i * spaceHeight + 20,
							element_type: "label",
							title: signers[i].name,
							property: {},
							width: firstWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id:index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: secondLeft,
							top: i * spaceHeight + 20,
							element_type: "date",
							title: "",
							property: {},
							width: secondWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: thirdLeft,
							top: i * spaceHeight + 20,
							element_type: "signature",
							title: "",
							property: {},
							width: thirdWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
				}
			}

			let document = await Edocument.create( { 
				sender: body.user.id,
				signers: body.signers,
				title:body.originalname,  
				document_path : body.document_path,
				documentUrl : body.document_path,
				envelope_content : JSON.stringify(fieldsData),
				emailSubject : "Sign Document : " + body.originalname,
			});
			await user.sentDocuments.push(document);
			await user.save();
	
			await EdocumentHistory.create({ 
				document: document._id,
				user: user._id,
				email: user.email,  
				action : "sent",
				role : "sender",
			});

			if (signers) {
				// send email to recievers
				signers.forEach(async (signer) => { 
					await emails.sendDocument({
						email: signer.email,
						documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
							document._id
						)}`, // /landlord-tools/document-detail/,  /sign-document/
						first: signer.name,
						last: '',
					});

					if (signer.email != user.email) {
						await EdocumentHistory.create({ 
							document: document._id,
							//user: signer._id,
							email: signer.email,  
							action : "received",
							role : "receiver",
						});
					}
				});
			}

			return res.status(200).json({ success: true });
		})
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const processQuickSend = async (req, res, next) => {
	try {
		let body = req.body;
		body.user = req.user;
		let document = await Edocument.findById(body.documentId);
		if(document) {
			
			let pdfBuffer = fs.readFileSync(document.documentUrl);
			let uploadedPdf = await PDFDocument.load(pdfBuffer);
			uploadedPdf.addPage();
			pdfBuffer = await uploadedPdf.save();
			fs.writeFileSync(document.documentUrl , pdfBuffer);
			const lastPage = uploadedPdf.getPages().length;
			let signers = JSON.parse(body.signers);

			let fieldsData = [];
			let index = 0;
			let firstLeft = 50;
			let firstWidth = 150;
			let spaceWidth = 20;
			let secondLeft = firstLeft + firstWidth + spaceWidth;
			let secondWidth = 150;
			let thirdLeft = secondLeft + secondWidth + spaceWidth;
			let thirdWidth = 200;
			let spaceHeight = 50;

			let user = await User.findById(body.user.id);

			const userSignature = await Signature.find({
				$or: [{ creator: user._id }],
			})
				.limit(1)
				.sort({ createdAt: 1 })
				.exec();
			let userSignatureData = {}; 
			if( userSignature && userSignature.length > 0 ) {
				userSignatureData = JSON.parse(userSignature[0].content).property;
			}

			for (let i=0; i < signers.length; i++) {
				if( signers[i].email == user.email) {
					fieldsData.push(
						{
							page: lastPage,
							left: firstLeft,
							top: i * spaceHeight + 20,
							element_type: "label",
							title: signers[i].name,
							property: {},
							width: firstWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id:index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: secondLeft,
							top: i * spaceHeight + 20,
							element_type: "date",
							title: "",
							property: { text: moment().format('YYYY-MM-DD') },
							width: secondWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: thirdLeft,
							top: i * spaceHeight + 20,
							element_type: "signature",
							title: "",
							property: userSignatureData,
							width: thirdWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
				} else {
					fieldsData.push(
						{
							page: lastPage,
							left: firstLeft,
							top: i * spaceHeight + 20,
							element_type: "label",
							title: signers[i].name,
							property: {},
							width: firstWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id:index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: secondLeft,
							top: i * spaceHeight + 20,
							element_type: "date",
							title: "",
							property: {},
							width: secondWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
					fieldsData.push(
						{
							page: lastPage,
							left: thirdLeft,
							top: i * spaceHeight + 20,
							element_type: "signature",
							title: "",
							property: {},
							width: thirdWidth,
							height: spaceHeight,
							signerName:
								{ 
									value:signers[i],
									label:signers[i].role
								},
							id: index
						}
					);
					index += 1;
				}
			}

			document.signers = body.signers;
			document.envelope_content = JSON.stringify(fieldsData);
			document.emailSubject = "Sign Document : " + document.title;
			document.save();

			await user.sentDocuments.push(document);
			await user.save();
	
			await EdocumentHistory.create({ 
				document: document._id,
				user: user._id,
				email: user.email,  
				action : "sent",
				role : "sender",
			});

			if (signers) {
				// send email to recievers
				signers.forEach(async (signer) => { 
					await emails.sendDocument({
						email: signer.email,
						documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
							document._id
						)}`, // /landlord-tools/document-detail/,  /sign-document/
						first: signer.name,
						last: '',
					});

					if (signer.email != user.email) {
						await EdocumentHistory.create({ 
							document: document._id,
							//user: signer._id,
							email: signer.email,  
							action : "received",
							role : "receiver",
						});
					}
				});
			}

			return res.status(200).json({ success: true });
		} else {
			res.status(406).json({ error: 'Document Not Found' });
		}
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const saveWebForm = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let webform = await Webform.create( { 
			title: req.body.formTitle,  
			content : JSON.stringify(req.body.formData),
			creator : req.user.id
		});
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const getWebforms = async (req, res, next) => {
	try {
		let user = req.user;
		let page = req.query.page ? Number(req.query.page) : 1;
		let limit = req.query.limit ? Number(req.query.limit) : 10;

		const webforms = await Webform.find({
			$or: [{ creator: user.id }],
		})
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await Webform.countDocuments({ creator: user.id });

		let data = {
			webforms,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			limit,
		};

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const getWebform = async (req, res, next) => {
	try {
		req.body.user = req.user;
		let body = JSON.parse(JSON.stringify(req.body));
		if (!body.webformId) {
			return res.status(500).json({ error: 'invalid params' });
		}
		let webform = await Webform.findById(body.webformId).populate(
			'creator',
			'first last'
		);
		let data = { webform };
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const answerWebform = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let answer = await WebformAnswer.create({
			...req.body,
			userId: user._id,
		});
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const getTemplateFolders = async (req, res, next) => {
	try {
		let user = req.user;
		let page = req.query.page ? Number(req.query.page) : 1;
		let limit = req.query.limit ? Number(req.query.limit) : 10;

		const folders = await TemplateFolder.find({
			$or: [{ creator: user.id }],
		})
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await TemplateFolder.countDocuments({ creator: user.id });

		let data = {
			folders,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			limit,
		};

		res.status(200).json(data);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const saveTemplateFolder = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let templateFolder = await TemplateFolder.create( { 
			title: req.body.name,  
			description : req.body.description,
			creator : req.user.id
		});
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const saveSelectTemplateFolder = async (req, res, next) => {
	try {
		// 
		let user = await User.findById(req.user.id);
		let template = await Template.findById(req.body.template_id);
		template.folder = req.body.folder_id;
		template.save();
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};


async function ConvertDocToPdf(inputfile, outputfile) {
	return new Promise((resolve, reject) =>{
			docxConverter(inputfile, outputfile, (err, result) => {
				return err ?
					reject(err) :
					resolve(result)
			})
		})
};

const saveFileRequest = async (req, res, next) => {
	try {

		upload(req, res, async function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err)
			} else if (err) {
				console.log(err)
				return res.status(500).json(err)
			}

			let body = req.body;
			body.user = req.user;
			body.originalname = req.file.originalname;
			body.filename = req.file.filename;
			body.document_path = req.file.path;
			body.document_url = req.file.path;
			if (!body.originalname || !body.document_path) {
				return { error: 'invalid params' };
			}

			const fileExt = path.extname(req.file.originalname);
			if (fileExt == '.pdf') {
			}
			if (fileExt == '.docx') {

				let isLibreOffice = true;
				if (isLibreOffice) {
					
					const docxBuf = await fs.readFileSync(req.file.path);
					// Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
					let pdfBuf = await libre.convertAsync(docxBuf, '.pdf', undefined, { sofficeBinaryPaths: ['/app/vendor/libreoffice/opt/libreoffice7.3/program/soffice'] });
					await fs.writeFileSync(req.file.path + '.pdf', pdfBuf);
					body.document_url = req.file.path + '.pdf';

				} else {

					await ConvertDocToPdf(req.file.path, req.file.path + '.pdf');
					body.document_url = req.file.path + '.pdf';
					// docxConverter(req.file.path, req.file.path + '.pdf', function (
					// 	err,
					// 	result
					// ) {
					// 	if (err) {
					// 		console.log(err);
					// 	}
					// 	body.document_url = req.file.path + '.pdf';
					// 	console.log('result' + result);
					// });
				}
			}

			let user = await User.findById(body.user.id);

			let document = await Edocument.create({
				sender: body.user.id,
				title: body.originalname,
				document_path: body.document_path,
				documentUrl: body.document_url,
			});

			//await user.sentDocuments.push(document);
			//await user.save();
	
			// await EdocumentHistory.create({ 
			// 	document: document._id,
			// 	user: user._id,
			// 	email: user.email,  
			// 	action : "sent",
			// 	role : "sender",
			// });

			return res.status(200).json({ 
				success: true, 
				document_id: document._id, 
				document_url: document.documentUrl,
				title: document.title,
			 });
		})
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

const saveSendRequest = async (req, res, next) => { 
	try {
		let body = req.body; 
		let user = await User.findById(req.user.id);
		let isBulkSend = body.isBulkSend=='true'?true:false;
		let document = await Edocument.findById(body.documentId);
		if(document) {
			if(isBulkSend){ 
				let bulkSenderData = JSON.parse(body.bulkSenderData);
				if(bulkSenderData && bulkSenderData.length>0){
					for(let i=0;i<bulkSenderData.length;i++){
	
						let senderData = bulkSenderData[i];
						let senderDataObj = {};
						for( let m=0; m < senderData.length; m++){
							senderDataObj[senderData[m].role] = senderData[m];
						}
	
						let fields = JSON.parse(body.fields);
						for( let n=0; n < fields.length; n++){
							fields[n].signerName.value = senderDataObj[fields[n].signerName.value.role];
						}
	
						// Document File Copy
						await fs.copyFileSync(document.documentUrl, document.documentUrl + i + ".pdf");

						let document1 = await Edocument.create({ 
							sender: document.sender,
							signers: JSON.stringify(bulkSenderData[i]),
							title: document.title,  
							document_path : document.documentUrl + i + ".pdf",
							documentUrl : document.documentUrl + i + ".pdf",
							envelope_content : JSON.stringify(fields),
							emailSubject : body.emailSubject,
							emailContent: body.emailContent,
							status : body.signerStatus,
							webforms: body.webforms,
							possibleComment: body.possibleComment,
							isSetSignerOrder: body.isSetSignerOrder,
						});

						await user.sentDocuments.push(document1);
						await user.save();
	
						await EdocumentHistory.create({ 
							document: document1._id,
							user: user._id,
							email: user.email,  
							action : "sent",
							role : "sender",
						});
				
						if( bulkSenderData[i].length > 0 ){
							// send email to recievers
							if( body.isSetSignerOrder ) {
								let signer = bulkSenderData[i][1];
								await emails.sendDocument({
									email: signer.email,
									documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
										document1._id
									)}`, // /landlord-tools/document-detail/,  /sign-document/
									first: signer.name,
									last: '',
								});
								await EdocumentHistory.create({ 
									document: document1._id,
									//user: signer._id,
									email: signer.email,  
									action : "received",
									role : "receiver",
								});
								
							} else {
								bulkSenderData[i].forEach(async (signer) => { 
									await emails.sendDocument({
										email: signer.email,
										documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
											document1._id
										)}`, // /landlord-tools/document-detail/,  /sign-document/
										first: signer.name,
										last: '',
									});
									if (signer.email != user.email) {
										await EdocumentHistory.create({ 
											document: document1._id,
											//user: signer._id,
											email: signer.email,  
											action : "received",
											role : "receiver",
										});
									}
								});
							}
						}
					}
				}
				await document.remove();
				res.status(200).json({ success: true });
			} else { 
				document.signers = body.signers;
				document.envelope_content = body.fields;
				document.emailSubject = body.emailSubject;
				document.emailContent = body.emailContent;
				document.status = body.signerStatus;
				document.webforms = body.webforms;
				document.possibleComment = body.possibleComment;
				document.isSetSignerOrder = body.isSetSignerOrder;
				await document.save();

				await user.sentDocuments.push(document);
				await user.save();
		
				await EdocumentHistory.create({ 
					document: document._id,
					user: user._id,
					email: user.email,  
					action : "sent",
					role : "sender",
				});
	
				if( body.signers ){
					let signers = JSON.parse(body.signers);
					console.log(signers)
					if (signers && signers.length > 0) {
						if( body.isSetSignerOrder ) {
							let signer = signers[1];
							await emails.sendDocument({
								email: signer.email,
								documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
									document._id
								)}`, // /landlord-tools/document-detail/,  /sign-document/
								first: signer.name,
								last: '',
							});
							if (signer.email != user.email) {
								await EdocumentHistory.create({ 
									document: document._id,
									//user: signer._id,
									email: signer.email,  
									action : "received",
									role : "receiver",
								});
							}
						} else {
							// send email to recievers
							signers.forEach(async (signer) => { console.log(signer)
								await emails.sendDocument({
									email: signer.email,
									documentUrl: `${process.env.ORIGIN_URL}/landlord-tools/document-detail/${String(
										document._id
									)}`, // /landlord-tools/document-detail/,  /sign-document/
									first: signer.name,
									last: '',
								});
								if (signer.email != user.email) {
									await EdocumentHistory.create({ 
										document: document._id,
										//user: signer._id,
										email: signer.email,  
										action : "received",
										role : "receiver",
									});
								}
							});
						}
					}
				}
				res.status(200).json({ success: true });
			}
		} else
			res.status(406).json({ error: 'Document Not Found' });
	} catch (e) {
		console.log({ error: e, message: 'document saveDocument controller' });
		res.status(500).json({ error: 'internal sever error' });
	}
};


const cancelRequest = async (req, res, next) => {
	try {
		let documentId = req.body.documentId;
		let document = await Edocument.findById(documentId);
		
		//await fs.unlinkSync(document.document_path);
		//await fs.unlinkSync(document.documentUrl);
		
		fs.exists(document.document_path, function(exists) {
			if(exists) {
			  fs.unlink(document.document_path, function(err){
				console.log(err);
			  });
			} 
		  });
		  fs.exists(document.documentUrl, function(exists) {
			if(exists) {
			  fs.unlink(document.documentUrl, function(err){
				console.log(err);
			  });
			} 
		  });
		
		await document.remove();
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(500).json({ error: 'internal sever error' });
	}
};

module.exports = {
	saveDocument,
	updateDocument,
	getDocument,
	getDocuments,
	combineDocuments,
	saveSignature,
	saveCustomField,
	getSavedSignatures,
	processQuickSend,
	saveWebForm,
	getWebforms,
	getWebform,
	answerWebform,
	getTemplateFolders,
	saveTemplateFolder,
	saveSelectTemplateFolder,
	saveFileRequest,
	saveSendRequest,
	cancelRequest,
	removeSavedSignature,
};