const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
	{
		categoryName: String,

		created_by: Schema.Types.ObjectId,

		createdAt: Date,

		updatedAt: Date,

		published_at: Date,
		
		updated_by: Schema.Types.ObjectId,

		parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },

		subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Category', CategorySchema);
