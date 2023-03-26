const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageViewSchema = new Schema(
	{
        document:{
            type: Schema.Types.ObjectId
        },

		views: {
			type: Schema.Types.Number,
			default: 0,
		},
	},
);

module.exports = mongoose.model('PageView', PageViewSchema);
