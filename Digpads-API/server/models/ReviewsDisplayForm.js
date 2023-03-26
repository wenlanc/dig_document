const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsDisplayForm = new Schema(
	{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        campaign: {
            type: Schema.Types.ObjectId,
            ref: 'Campaign',
            required: true
        },

        type: {
            type: String,
            default: 'link' // link, widget, modal, pop up
        },

		styles: {
			bodyColor: String,
			borderColor: String,
			height: String,
			width: String,
            shape: String, // "oval" || "square"
            logo: String,
            location: String,
		},

	    views: { // number of times the form was viewed
			type: Schema.Types.Number,
			default: 0,
		},

        reviews: [ // reviews user selected to display on the form
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],

        showReviewCollectionLink: { // whether to show a link allowing user to leave a review
            type: Schema.Types.Boolean,
            default: false
        },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('ReviewsDisplayForm', ReviewsDisplayForm);
