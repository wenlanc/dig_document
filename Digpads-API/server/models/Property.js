const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
	userId: String,
	propertyName: String,
	livingSquaredFootage: String,
	propertySquareFootage: String,
	streetAddress: String,
	city: String,
	state: String,
	zip: String,
	propertyType: String,
	occupancy: String,
	bedrooms: String,
	bathrooms: String,
	acquiredDate: { type: Date, default: Date.now },
	lastRentAmount: String,
	reason: String,
	images: Array,
	units: Number,
	documents: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				index: true,
				required: true,
				auto: true,
			},
			name: String,
			data: Array,
		},
	],
	isDeleted: {
		type: Boolean,
		default: false,
		required: true,
	},
});

module.exports = mongoose.model('Property', PropertySchema);
