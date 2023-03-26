const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EdocumentSchema = new Schema(
	{

		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		documentUrl: {
			type: String,
			required: true,
		},
		document_path: {
			type: String,
			required: true,
		},
		receiver: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		signers: {
			type: String,
		},
		envelope_content: {
			type: String
		},
		status : {
			type: String
		},
		emailSubject : {
			type: String
		},
		emailContent : {
			type: String
		},
		webforms : {
			type: String
		},
		possibleComment : {
			type: Boolean
		},
		isSetSignerOrder : {
			type: Boolean
		},
		isConfirmed : {
			type: Boolean
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Edocument', EdocumentSchema);
