const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostReplyLikesSchema = new Schema(
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
		reply: {
			type: Schema.Types.ObjectId,
			ref: 'PostReply',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('PostReplyLikes', PostReplyLikesSchema);
