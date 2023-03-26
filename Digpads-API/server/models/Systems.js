const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SystemSchema = new Schema({
	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	room: {
		type: 'String',
		default: null,
		ref: 'Room',
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
	location: {
		type: String,
		required: true,
	},
	condition: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	images: {
		type: Array,
		default: [],
	},
	estimatedValue: {
		type: Number,
		required: true,
	},
	attachments: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model('System', SystemSchema);
