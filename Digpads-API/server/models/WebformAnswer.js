const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebformAnswerSchema = new Schema(
	{
		documentId: {
			type: Schema.Types.ObjectId,
			ref: 'Edocument',
			required: true,
		},
		webformId: {
			type: Schema.Types.ObjectId,
			ref: 'Webform',
			required: true,
		},
		userId : {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		formData: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('WebformAnswer', WebformAnswerSchema);
