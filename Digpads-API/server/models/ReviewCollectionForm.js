const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsCollectionForm = new Schema(
	{
        campaign: {
            type: Schema.Types.ObjectId,
            ref: 'Campaign',
            required: true
        },

		styles: {
			bodyColor: String,
			borderColor: String,
			height: String,
			width: String,
            logo: String,
		},
	},
);

module.exports = mongoose.model('ReviewsCollectionForm', ReviewsCollectionForm);
