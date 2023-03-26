const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema.ObjectId is type for ID

const PostReply = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		post: {
			type: Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},

		content: {
			type: String,
			required: true,
		},

		parent: {
			type: Schema.Types.ObjectId,
			ref: 'PostReply',
		},

		replies: [{ type: Schema.Types.Array, ref: 'PostReply' }],

		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

		status: {
			type: String,
			required: true,
			default: 'CREATED',
		},

		removed: {
			type: Schema.Types.Boolean,
		},

		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Like',
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('PostReply', PostReply);
