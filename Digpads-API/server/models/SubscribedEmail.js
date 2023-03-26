const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false,
	},
});

module.exports = mongoose.model('SubscribedEmail', EmailSchema);
