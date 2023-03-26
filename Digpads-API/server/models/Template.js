const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		envelope_content: {
			type: String
		},
		creator : {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		folder : {
			type: Schema.Types.ObjectId,
			ref: 'TemplateFolder',
		},
		document_path: {
			type: String,
			required: true,
		},
		documentUrl: {
			type: String,
			required: true,
		},
		signers: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Template', TemplateSchema);
