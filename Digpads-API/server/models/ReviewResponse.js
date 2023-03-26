const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewResponseSchema = new Schema(
	{
		review: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Review',
		},
		
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

        content: {
            type: String,
            required: true
        }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model(
	'ReviewResponse',
	ReviewResponseSchema
);
