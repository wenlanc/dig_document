const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EdocumentHistorySchema = new Schema(
	{
		document: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Edocument',
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
        email: {
            type: String,
            required: true
        },
		action: {
            type: String,
            required: true
        },
		role: {
            type: String,
            required: true
        }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model(
	'EdocumentHistory',
	EdocumentHistorySchema
);
