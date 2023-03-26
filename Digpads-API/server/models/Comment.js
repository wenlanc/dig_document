const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		content: {
			type: Schema.Types.String,
			require: true,
		},

		status: {
			type: String,
			require: true,
			default: 'CREATED',
		},

		removed: {
			type: Schema.Types.Boolean
		},

		article: {
			type: Schema.Types.ObjectId,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Comment', CommentSchema);
