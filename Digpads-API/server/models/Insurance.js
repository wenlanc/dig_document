const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
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
	deductible: {
		type: String,
		required: true,
	},
	policyCost: {
		type: Number,
		required: true,
	},
	liabilityCoverage: {
		type: Number,
	},
	propertyCoverage: {
		type: Number,
	},
	additionalCoverage: {
		type: Number,
	},
	notes: {
		type: String,
	},
	payor: {
		type: String,
	},
	// incurredDate: {
	// 	type: Date,
	// 	default: Date.now,
	// },
	startDate: {
		type: Date,
		default: Date.now,
	},
	endDate: {
		type: Date,
		default: Date.now,
	},
	onGoing: {
		type: Boolean,
		default: false,
	},
	dueDate: {
		type: Date,
		default: Date.now,
	},
	images: {
		type: Array,
		default: [],
	},
	attachments: {
		type: Array,
		default: [],
	},
	paymentTiming: {
		type: String,
		required: true,
	},
	administrationFee: {
		type: Number,
	},
});

module.exports = mongoose.model('Insurance', InsuranceSchema);
