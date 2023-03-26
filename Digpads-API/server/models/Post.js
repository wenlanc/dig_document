const mongoose = require('mongoose');
const SlugifyPostTitle = require('../services/SlugifyPostTitle');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		content: {
			type: String,
			required: true,
		},

		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},

		category: {
			type: String,
		},

		status: {
			type: String,
			required: true,
			default: 'CREATED',
		},

		removed: {
			type: Schema.Types.Boolean,
		},

		replies: [
			{
				type: Schema.Types.ObjectId,
				ref: 'PostReply',
			},
		],

		slug: {
			type: Schema.Types.String,
		},

		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Like',
			},
		],

		state: {
			type: Schema.Types.ObjectId,
			ref: 'State',
		},

		city: {
			type: Schema.Types.ObjectId,
			ref: 'City',
		},

		images: [String],

		views: {
			type: Schema.Types.Number,
			default: 0
		},
	},
	{
		timestamps: true,
	}
);

// Generate Post slug before saving
PostSchema.pre('save', function (next) {
	this.slug =
		SlugifyPostTitle(this.title) + '-' + this._id.toString().slice(-6);
	next();
});

module.exports = mongoose.model('Post', PostSchema);
