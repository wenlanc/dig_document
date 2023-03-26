const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
	{
		likeType: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Like', LikeSchema);
