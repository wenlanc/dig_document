const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
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
	sqft: {
		type: Number,
		required: true,
	},
	lastRemodeled: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
	},
	walls: {
		type: Number,
		required: true,
	},
	wallsObj: {
		type: Object,
		required: true,
	},
	wallsLengthInFeet: {
		type: Object,
		required: true,
	},
	wallsLengthInInches: {
		type: Object,
		required: true,
	},
	notes: {
		type: String,
	},
});

module.exports = mongoose.model('Room', RoomSchema);
