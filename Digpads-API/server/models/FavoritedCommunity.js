const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoritedCommunitySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},

	state: {
		type: Schema.Types.ObjectId,
		ref: 'State',
		required: true,
	},

	city: {
		type: Schema.Types.ObjectId,
		ref: 'City',
	},
});

const FavoritedCommunity = mongoose.model(
	'FavoritedCommunity',
	FavoritedCommunitySchema
);

module.exports = FavoritedCommunity;
