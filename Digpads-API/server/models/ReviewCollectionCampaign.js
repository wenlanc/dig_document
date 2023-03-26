const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewCollectionCampaignSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		name: {
			type: String,
			required: true,
		},

		logo: String,

		description: String,

		state: {
			type: String,
		},

		city: {
			type: String,
		},

		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Review',
			},
		],

		default: {
			type: Schema.Types.Boolean,
			default: false
		},

		collectingOutOfState: {
			type: Schema.Types.Boolean,
			default: false,
		},

		// was this campaign deleted by Admin
		deleted: {
			type: Schema.Types.Boolean,
		},
	},
	{
		timestamps: { createdAt: 'dateLaunched' },
	}
);

module.exports = mongoose.model(
	'ReviewCollectionCampaign',
	ReviewCollectionCampaignSchema
);
