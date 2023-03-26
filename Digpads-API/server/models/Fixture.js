const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FixtureSchema = new Schema({
	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Property',
		required: true,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	name: String,
	date: { type: Date, default: Date.now, required: true },
	condition: String,
	manufacturer: String,
	contractor: String,
	cost: Number,
	notes: String,
	images: {
		type: Array,
		default: [],
	},
	attachments: {
		type: Array,
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

module.exports = mongoose.model('Fixture', FixtureSchema);
