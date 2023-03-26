const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateFolderSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String
		},
		creator : {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('TemplateFolder', TemplateFolderSchema);
