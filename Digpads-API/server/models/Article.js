const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
	{
		elasticId: {
			type: String,
			default: null
		},

		title: String,

		content: String,

		image: String,

		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},

		subcategory: { type: Schema.Types.ObjectId, ref: 'Category' },

		urlSlug: {
			type: Schema.Types.String,
			required: true,
		},

		views: {
			type: Schema.Types.Number,
			default: 0
		},

		published_at: {
			type: Date,
		},

		created_by: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},

		updated_by: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		metas: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Meta',
			},
		],
	},

	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Article', ArticleSchema);
