const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketplaceProfile = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	name: {
		type: Schema.Types.String,
		required: true
	},

	type: { // landlord | landlord-contractor | tenant | contractor
		type: String,
		default: 'landlord'
	},

	numberOfReviews: {
		type: Schema.Types.Number,
		default: 0
	},

	socialMediaLinks: [{ label: String, to: String }],

	logo: String,

	contactInfo: {
		name: String,
		address: String,
		city: String,
		state: String,
		zip: String,
		phone: String,
		email: String,
	},

	// this is the total star rating calculated from all reviews received by the user
	starRating: {
		type: Schema.Types.Number,
		default: 0
	},

	aboutYou: String,

	portfolio: {
		videos: [String],
		images: [String],
	},

	servicesOffered: [
		{
			category: String,
			services: [String],
		},
	],

	areasServed: [
		{
			state: String,
			city: String,
		},
	],

	availability: {
		type: String,
		default: 'Same Day',
	},

	mapLocationHours: {
		sameLocation: Boolean,
		address: String,
		city: String,
		state: String,
		zip: Number,
		hours: {
			sunday: { from: String, to: String },
			monday: { from: String, to: String },
			tuesday: { from: String, to: String },
			wednesday: { from: String, to: String },
			thirsday: { from: String, to: String },
			friday: { from: String, to: String },
			saturday: { from: String, to: String },
		},
	},

	businessDetails: {
		yearFounded: Number,
		numEmployees: Number,
		licenses: String,
		headquarters: String,
		ownership: String,
		trainingEducation: String,
	},

	businessTags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'BusinessTag',
		},
	],

	rentalHistory: [
		{
			digpadsVerified: Boolean,
			neighborhood: String,
			city: String,
			state: String,
			rentalType: String,
			monthsLeased: Number,
			leasedFrom: Date,
			leasedTo: Date,
			confirmLease: Boolean,
			landlordEmailAddress: String,
		},
	],

	desiredRental: {
		description: String,
		canAffordFrom: Number,
		canAffordTo: Number,
		neighborhood: String,
		city: String,
		state: String,
		rentalType: String,
		bedrooms: Number,
		bathrooms: Number,
	},

	desiredAmenities: [String],

	neighborhoods: [String],

	deleted: {
		type: Schema.Types.Boolean,
		default: false,
	},
	unclaimed: {
		type: Schema.Types.Boolean
	},
}, {
	timestamps: true
});

module.exports = mongoose.model('MarketplaceProfile', MarketplaceProfile);
