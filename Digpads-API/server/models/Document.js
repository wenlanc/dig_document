const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
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
		reciever: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		recieverEmail: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Document', DocumentSchema);
