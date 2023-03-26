const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
	},
});

module.exports = mongoose.model('State', stateSchema);
