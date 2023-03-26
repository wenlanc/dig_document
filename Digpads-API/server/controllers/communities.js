const { State, City, FavoritedCommunity, Post, User } = require('../models/db');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

exports.validate = (method) => {
	switch (method) {
		case 'addFavoriteCommunity':
			{
				return validator.body(
					Joi.object({
						community: {
							state: Joi.string().required(),
							city: Joi.string().allow('').optional(),
						},
					})
				);
			}
			break;
		case 'updateFavoriteCommunity':
			{
				return validator.body(
					Joi.object({
						community: {
							id: Joi.string().required(),
							state: Joi.string().allow('').allow(' ').optional(),
							city: Joi.string().allow('').allow(' ').optional(),
						},
					})
				);
			}
			break;
		case 'deleteFavoriteCommunity':
			{
				return validator.params(
					Joi.object({
						id: Joi.string().alphanum().required(),
					})
				);
			}
			break;

		default:
			throw 'incorrect validation method';
	}
};

exports.deleteFavoriteCommunity = async (communityId) => {
	const result = await FavoritedCommunity.findByIdAndDelete(communityId);

	if (result === null) {
		throw `Couldn't delete community`;
	}
};

exports.addFavoriteCommunity = async (userId, community) => {
	await validateMaxCommunities(userId);

	const state = await State.findOne({ name: community.state });
	const city = await City.findOne({ name: community.city, state: state });

	// check whether community is already favorited
	const _community = await FavoritedCommunity.findOne({
		user: userId,
		state: state,
		city: city,
	});

	if (_community !== null) {
		console.log(_community.toObject());
		throw 'community is already in favorites';
	}

	const newCommunity = await FavoritedCommunity.create({
		user: userId,
		state: state,
		city: city,
	});

	return {
		_id: newCommunity._id,
		state: { name: newCommunity.state.name },
		city: { name: newCommunity.city?.name || '' },
	};
};

exports.getFavoriteCommunities = async (userId) => {
	try {
		const communities = await User.findOne({ _id: userId }).select('favoritedCommunities')

		if (communities) {
			return communities.favoritedCommunities;
		}

		return { error: 'Post not found' };
	}
	catch (error) {
		console.log(err);
		return { error: 'internal server error' };
	}
};

exports.updateFavoriteCommunity = async (community) => {
	const communityId = community.id;

	const result = await FavoritedCommunity.findByIdAndUpdate(communityId, {
		state: await State.findOne({ name: community.state }),
		city: await City.findOne({ name: community.city }),
	});

	if (result) {
		return true;
	} else {
		return false;
	}
};

async function validateMaxCommunities(userId) {
	// Limit max number of favorite communities to 3
	const count = await FavoritedCommunity.find({
		user: userId,
	}).countDocuments();

	if (count === 3) {
		throw 'maximum number of favorited communities reached';
	}
}
