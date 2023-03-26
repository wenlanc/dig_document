const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebformSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
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

module.exports = mongoose.model('Webform', WebformSchema);