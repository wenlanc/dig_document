const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepairAndRemodel = new Schema({
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
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date,
	},
	incurredDate: {
		type: Date,
	},
	notes: {
		type: String,
	},
	images: {
		type: Array,
		default: [],
	},
	attachments: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model('RepairAndRemodel', RepairAndRemodel);
