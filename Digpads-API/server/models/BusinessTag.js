const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessTagSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	category: {
		type: String,
		required: true,
	},

	userType: {
		type: String,
	},

	custom: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('BusinessTag', BusinessTagSchema);
