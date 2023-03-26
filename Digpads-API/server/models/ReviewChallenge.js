const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewChallengeStatus = {
	sent: 'sent',
	underReview: 'under review',
	completed: 'completed',
};

const ReviewChallengeSchema = new Schema(
	{
		review: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Review',
		},

		challenger: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		reason: {
			// qualification, factual, Rules & Policies, Personal Attack
			type: String,
			required: true,
		},

		content: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			default: ReviewChallengeStatus.sent,
		},

		accepted: {
			// admin can either accept a challenge or reject it
			type: Schema.Types.Boolean,
		},

		adminMessage: Schema.Types.String,

		attachments: [{ format: Schema.Types.String, url: Schema.Types.String }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('ReviewChallenge', ReviewChallengeSchema);
