const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhysicalPropertySchema = new Schema({
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
		ref: 'Room',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	dateAcquired: {
		type: Date,
	},
	location: {
		type: String,
		required: true,
	},
	condition: {
		type: String,
	},
	images: {
		type: Array,
	},
	estimatedValue: {
		type: Number,
		required: true,
	},
	modelIdentifier: {
		type: String,
	},
	notes: {
		type: String,
	},
	isDeleted: {
		type: Boolean,
		default: false,
		required: true,
	},
});

module.exports = mongoose.model('PhysicalProperty', PhysicalPropertySchema);
