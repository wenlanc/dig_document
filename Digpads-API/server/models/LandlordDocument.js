const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LandlordDocumentSchema = new Schema(
	{
		parent: {
			type: String,
			required: true,
		},
		user: {
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
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('LandlordDocument', LandlordDocumentSchema);
