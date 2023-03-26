const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		reviewer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		campaign: {
			type: Schema.Types.ObjectId,
			ref: 'ReviewCollectionCampaign',
			required: true,
		},

		title: {
			type: String,
			required: true,
		},

		source: { // campaign | widget | link | popup
			type: String,
		},

		content: {
			type: String,
			required: true,
		},

		ratings: {
			overall: Schema.Types.Number,
			communication: Schema.Types.Number,
			quality: Schema.Types.Number,
			delivery: Schema.Types.Number,
			value: Schema.Types.Number,
		},

		rejected: Boolean,
		rejectedReason: String,

		responses: [
			{
				type: Schema.Types.ObjectId,
				ref: 'ReviewResponse',
			},
		],

		challenge: {
			type: Schema.Types.ObjectId,
			ref: 'ReviewChallenge',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Review', ReviewSchema);
