const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Maintenance = new Schema({
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
		type: mongoose.Schema.Types.ObjectId,
		required: true,
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
	company: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	payor: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	frequency: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date,
	},
	incurredDate: {
		type: Date,
	},
	attachments: {
		type: Array,
		default: [],
	},
	images: {
		type: Array,
		default: [],
	},
	notes: {
		type: String,
	},
});

module.exports = mongoose.model('Maintenance', Maintenance);
