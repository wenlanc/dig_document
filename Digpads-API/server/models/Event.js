const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
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
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
	},
	parentName: {
		type: String,
		required: true,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
	},
	eventNature: {
		type: String,
		default: 'Record',
	},
	eventType: {
		type: String,
		required: true,
	},
	eventRecordedOn: {
		type: Date,
		default: Date.now,
	},
	eventDate: {
		type: Date,
	},
	eventData: {
		type: Object,
	},
	eventTag: {
		type: String,
	},
	eventStatus: {
		type: Boolean,
		default: false,
	},
	eventLocation: {
		type: String,
		default: 'Property',
		required: true,
	},
	scheduleDate: {
		type: Date,
		// default: Date.now,
	},
	secondaryType: {
		type: String,
	},
	archived: {
		type: Boolean,
		default: false,
		required: true,
	},
});

module.exports = mongoose.model('Event', EventSchema);
