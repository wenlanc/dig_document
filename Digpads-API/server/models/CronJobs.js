const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	status: {
		type: Boolean,
		default: false,
	},
	frequency: {
		type: String,
		// required: true,
	},
	scheduleDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	data: {
		type: Object,
		required: true,
	},
	lastRanAt: {
		type: Date,
	},
	runCount: {
		default: 0,
		required: true,
		type: Number,
	},
});

module.exports = mongoose.model('CronJob', EventSchema);
