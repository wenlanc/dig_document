const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitySchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
	},

	state: {
		type: Schema.Types.ObjectId,
		ref: 'State'
	}
});

module.exports = mongoose.model('City', CitySchema);
