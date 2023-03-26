const ReviewCollectionCampaign = require('../models/ReviewCollectionCampaign');
const User = require('../models/User');
const Review = require('../models/Review');
const ReviewCollectionForm = require('../models/ReviewCollectionForm');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

function validate(handler) {
	switch (handler) {
		case 'createNewCampaign':
			return validator.body(createNewCampaignSchema);
		case 'getReviewCollectionForm':
			return validator.query(getReviewCollectionFormSchema);
		default:
			throw new Exception('invalid validation handler: ', handler);
	}
}

const createNewCampaignSchema = Joi.object({
	name: Joi.string().required(),
	logo: Joi.string().allow('').optional(),
	description: Joi.string().allow('').optional(),
	city: Joi.string().required(),
	state: Joi.string().required(),
	reviewFormStyles: Joi.object().allow({}).optional(),
	collectingOutOfState: Joi.boolean().optional(),
});

async function createNewCampaign(campaignData) {
	try {
		const campaign = new ReviewCollectionCampaign(campaignData);
		await campaign.save();

		// create new ReviewsDisplayForm
		const reviewCollectionForm = new ReviewCollectionForm({
			campaign: campaign,
			styles: campaignData.reviewFormStyles,
		});
		await reviewCollectionForm.save();

		return {
			id: campaign._id,
			name: campaign.name,
			dateLaunched: campaign.dateLaunched,
			reviewFormViews: campaign.reviewFormViews,
			reviews: [],
			form: reviewCollectionForm._id,
		};
	} catch (error) {
		console.log(error);
		throw 'Error creating new campaign';
	}
}

const getReviewCollectionFormSchema = Joi.object({
	campaign: Joi.string().required(),
	form: Joi.string().required(),
});

async function getReviewCollectionForm(campaignId, formId) {
	try {
		const formData = await ReviewCollectionCampaign.findById(
			campaignId,
			'logo description'
		).populate('user', 'first last name -_id');

		let reviewCollectionForm;

		if (formId !== 'null') {
			reviewCollectionForm = await ReviewCollectionForm.findById(formId);
		}

		const result = {
			logo: formData.logo,
			description: formData.description,
			user: formData.user,
		}

		if (reviewCollectionForm) {
			result.reviewFormStyles = reviewCollectionForm.styles;
		}
		
		return result;
	} catch (error) {
		console.log(error);
	}
}

async function getAll(user) {
	const campaigns = await ReviewCollectionCampaign.find(
		{ user: user, deleted: { $ne: true } },
		'name description state city dateLaunched reviewFormViews',
		{ lean: true }
	).populate({
		path: 'reviews',
		populate: [
			{
				path: 'reviewer',
				select: 'first last name',
			},
			{ path: 'campaign', select: 'name' },
		],
	});

	return campaigns;
}

async function getDefault(userId) {
	const campaign = await ReviewCollectionCampaign.findOne(
		{ user: userId, default: true, deleted: { $ne: true } },
		'_id',
		{ lean: true }
	);
	console.log(campaign);

	return campaign;
}

async function createDefaultCampaign(user) {
	const campaign = await ReviewCollectionCampaign.create({
		user: user,
		name: 'Digpads Review Collection',
		default: true,
	});

	return campaign;
}

async function updateCampaign(campaign) {
	return ReviewCollectionCampaign.findOneAndUpdate(
		{ _id: campaign._id },
		campaign,
		{ new: true }
	);
}

module.exports = {
	createNewCampaign,
	getReviewCollectionForm,
	updateCampaign,
	getAll,
	validate,
	getDefault,
	createDefaultCampaign,
};
