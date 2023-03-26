const Joi = require('joi');
const uuid = require('uuid').v4;
const path = require('path');

const validator = require('express-joi-validation').createValidator({});
const { saveDocument } = require('../../controllers/edocuments');

const multer = require('multer');
const { saveLandlordDocument } = require('../../controllers/landlordDocuments');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const path = req?.body?.landlordDocument
			? 'uploads/landlord-documents'
			: 'uploads/edocuments';
		cb(null, path);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const originalname = `${uuid()}${ext}`;
		cb(null, originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: { fieldSize: 25 * 1024 * 1024 },
}).single('file');

// Schema validator
const schema = Joi.object({
	title: Joi.string().required(),
	documentUrl: Joi.string().required(),
	recievers: Joi.array().required(),
});
const validate = validator.body(schema);

/**
 * Succcess
 * @returns {message : success}
 * Fail
 * @returns {res.error}
 */
const ctr = async (req, res, next) => {
	try {
		upload(req, res, async function (err) {
			if (err instanceof multer.MulterError) {
				return res.status(500).json(err);
			} else if (err) {
				console.log(err);
				return res.status(500).json(err);
			}

			req.body.user = req.user;
			req.body.originalname = req.file.originalname;
			req.body.filename = req.file.filename;
			req.body.document_path = req.file.path;

			let data;
			if (req.body.landlordDocument) {
				data = await saveLandlordDocument(JSON.parse(JSON.stringify(req.body)));
			} else {
				data = await saveDocument(JSON.parse(JSON.stringify(req.body)));
			}
			if ((typeof data == 'object' && 'error' in data) || !data)
				res.status(406).json(data);
			else res.status(200).json(data);
			return next();
			return res.status(200).send(req.file);
		});
	} catch (e) {
		console.log(e);
		return next(e);
	}
};

module.exports = { ctr, validate };
